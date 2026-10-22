const statusEl = document.getElementById('status');
const camList = document.getElementById('camList');
const activeList = document.getElementById('activeList');
const refreshBtn = document.getElementById('refreshBtn');

let devices = [];
let activeCams = new Map();

function setStatus(msg, type = 'ok') {
    statusEl.className = 'status ' + type;
    statusEl.innerHTML = msg;
}

document.querySelectorAll('.titlebar-buttons .tb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        window.electronAPI.windowControl(btn.dataset.action, 'main');
    });
});

async function loadCameras() {
    try {
        setStatus(t('initializing'));
        const tempStream = await navigator.mediaDevices.getUserMedia({ video: true });
        tempStream.getTracks().forEach(t => t.stop());

        const all = await navigator.mediaDevices.enumerateDevices();
        devices = all.filter(d => d.kind === 'videoinput');
        renderCamList();

        if (devices.length === 0) {
            setStatus('⚠️ ' + t('noCams'), 'warn');
        } else {
            setStatus(`✅ ${devices.length} cámara(s) detectada(s)`, 'ok');
        }
    } catch (e) {
        setStatus('❌ Error: ' + e.message, 'err');
    }
}

function renderCamList() {
    camList.innerHTML = '';
    if (devices.length === 0) {
        camList.innerHTML = `<p class="empty">${t('noCams')}</p>`;
        return;
    }
    devices.forEach((dev, i) => {
        const btn = document.createElement('button');
        btn.textContent = dev.label || `Cámara ${i+1}`;
        if (activeCams.has(dev.deviceId)) btn.classList.add('active');
        btn.onclick = () => toggleCamera(dev);
        camList.appendChild(btn);
    });
}

async function toggleCamera(dev) {
    if (activeCams.has(dev.deviceId)) {
        await window.electronAPI.closeCameraWindow(dev.deviceId);
        activeCams.delete(dev.deviceId);
    } else {
        const result = await window.electronAPI.createCameraWindow({
            id: dev.deviceId,
            label: dev.label || `Cámara ${devices.indexOf(dev) + 1}`
        });
        if (result.success) {
            activeCams.set(dev.deviceId, { dev });
        }
    }
    renderCamList();
    renderActiveList();
}

function renderActiveList() {
    if (activeCams.size === 0) {
        activeList.innerHTML = `<em>${t('noneActive')}</em>`;
        return;
    }
    activeList.innerHTML = '';
    activeCams.forEach((cam, id) => {
        const btn = document.createElement('button');
        btn.textContent = '⏹ ' + cam.dev.label;
        btn.classList.add('active-btn');
        btn.onclick = () => toggleCamera(cam.dev);
        activeList.appendChild(btn);
    });
}

window.electronAPI.onCameraWindowClosed((id) => {
    activeCams.delete(id);
    renderCamList();
    renderActiveList();
});

refreshBtn.onclick = loadCameras;
loadCameras();
