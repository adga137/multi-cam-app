const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Crear ventana de cámara
    createCameraWindow: (info) => ipcRenderer.invoke('create-camera-window', info),
                                closeCameraWindow: (id) => ipcRenderer.invoke('close-camera-window', id),

                                // Control de ventana
                                windowControl: (action, windowId) => ipcRenderer.send('window-control', { action, windowId }),

                                // Eventos
                                onInitCamera: (callback) => ipcRenderer.on('init-camera', (e, info) => callback(info)),
                                onCameraWindowClosed: (callback) => ipcRenderer.on('camera-window-closed', (e, id) => callback(id)),

                                // Plataforma
                                platform: process.platform
});
