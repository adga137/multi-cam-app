const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');

// Permitir cámaras/micrófono
app.commandLine.appendSwitch('enable-features', 'WebRTCPipeWireCapturer');
app.commandLine.appendSwitch('use-fake-ui-for-media-stream');

let mainWindow = null;
const cameraWindows = new Map(); // cameraId -> BrowserWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 450,
        height: 700,
        minWidth: 380,
        minHeight: 500,
        title: 'Cámaras App',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
                                   contextIsolation: true,
                                   nodeIntegration: false
        }
    });

    mainWindow.loadFile('index.html');

    // En desarrollo abrir DevTools
    if (process.argv.includes('--dev')) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        // Cerrar todas las ventanas de cámaras al cerrar la principal
        cameraWindows.forEach((win, id) => {
            win.close();
        });
        cameraWindows.clear();
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// ============================================
// IPC: Gestión de ventanas de cámaras
// ============================================

// Crear una ventana independiente para una cámara
ipcMain.handle('create-camera-window', async (event, cameraInfo) => {
    const { id, label } = cameraInfo;

    // Si ya existe, enfocar la existente
    if (cameraWindows.has(id)) {
        const existing = cameraWindows.get(id);
        existing.focus();
        return { success: true, exists: true };
    }

    const camWin = new BrowserWindow({
        width: 640,
        height: 480,
        minWidth: 320,
        minHeight: 240,
        title: `📹 ${label}`,
        frame: false, // ❌ Sin barra de título del SO
        transparent: false,
        resizable: true,
        alwaysOnTop: false,
        skipTaskbar: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
                                     contextIsolation: true,
                                     nodeIntegration: false
        }
    });

    camWin.loadFile('camera-window.html');

    // Pasar info de la cámara cuando la ventana esté lista
    camWin.webContents.once('did-finish-load', () => {
        camWin.webContents.send('init-camera', cameraInfo);
    });

    // Cuando se cierra, notificar a la ventana principal
    camWin.on('closed', () => {
        cameraWindows.delete(id);
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('camera-window-closed', id);
        }
    });

    cameraWindows.set(id, camWin);
    return { success: true, exists: false };
});

// Cerrar una ventana de cámara
ipcMain.handle('close-camera-window', async (event, cameraId) => {
    const win = cameraWindows.get(cameraId);
    if (win) {
        win.close();
        cameraWindows.delete(cameraId);
        return true;
    }
    return false;
});

// Control de ventana (minimizar, maximizar, cerrar) - para ventana sin frame
ipcMain.on('window-control', (event, { action, windowId }) => {
    const win = windowId === 'main' ? mainWindow : cameraWindows.get(windowId);
    if (!win) return;

    switch (action) {
        case 'minimize': win.minimize(); break;
        case 'maximize': win.isMaximized() ? win.unmaximize() : win.maximize(); break;
        case 'close': win.close(); break;
    }
});

// Traer ventana al frente
ipcMain.on('focus-camera', (event, cameraId) => {
    const win = cameraWindows.get(cameraId);
    if (win) win.focus();
});
