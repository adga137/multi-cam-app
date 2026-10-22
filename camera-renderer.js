const video = document.getElementById('video');
const panel = document.getElementById('panel');
const camContainer = document.getElementById('camContainer');
const camTitle = document.getElementById('camTitle');
const btnFlash = document.getElementById('btnFlash');

let stream = null;
let cameraId = null;
let videoTrack = null;
let torchSupported = false;
let flashState = false;

const state = {
    zoom: 1,
    panX: 0,
    panY: 0,
    crop: 0
};

window.electronAPI.onInitCamera(async (info) => {
    cameraId = info.id;
    camTitle.textContent = '📹 ' + info.label;
    document.title = info.label;

    document.querySelectorAll('.titlebar-buttons .tb-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.electronAPI.windowControl(btn.dataset.action, cameraId);
        });
    });

    await startCamera(info.id);
    setupControls();
});

async function startCamera(deviceId) {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: deviceId }, width: 1280, height: 720 },
            audio: false
        });
        video.srcObject = stream;

        // Verificar soporte de flash/torch
        videoTrack = stream.getVideoTracks()[0];
        const capabilities = videoTrack.getCapabilities();
        torchSupported = !!capabilities.torch;

        if (!torchSupported) {
            btnFlash.style.display = 'none'; // Ocultar si la cámara no tiene flash
        }
    } catch (e) {
        alert('Error al abrir cámara: ' + e.message);
    }
}

function setupControls() {
    function updateVideo() {
        const transform = `translate(${state.panX}px, ${state.panY}px) scale(${state.zoom})`;
        video.style.transform = transform;
        camContainer.style.padding = state.crop + 'px';
    }

    // Flash / Torch
    btnFlash.onclick = async () => {
        if (!torchSupported) return;
        flashState = !flashState;
        try {
            await videoTrack.applyConstraints({
                advanced: [{ torch: flashState }]
            });
            btnFlash.classList.toggle('active', flashState);
            btnFlash.title = flashState ? t('flashOn') : t('flash');
        } catch (e) {
            console.error("Error al activar flash:", e);
        }
    };

    // Ajustes (Panel)
    document.getElementById('btnSettings').onclick = (e) => {
        panel.classList.toggle('show');
        e.target.classList.toggle('active');
    };

    // Centrar
    document.getElementById('btnCenter').onclick = () => {
        Object.assign(state, { panX: 0, panY: 0, zoom: 1, crop: 0 });
        document.getElementById('zoom').value = 1;
        document.getElementById('crop').value = 0;
        document.getElementById('zoomVal').textContent = '1.0';
        document.getElementById('cropVal').textContent = '0';
        updateVideo();
    };

    // Zoom
    document.getElementById('zoom').oninput = (e) => {
        state.zoom = parseFloat(e.target.value);
        document.getElementById('zoomVal').textContent = state.zoom.toFixed(1);
        updateVideo();
    };

    // Recorte
    document.getElementById('crop').oninput = (e) => {
        state.crop = parseInt(e.target.value);
        document.getElementById('cropVal').textContent = state.crop;
        updateVideo();
    };

    // Pad direccional
    document.querySelectorAll('.pad button[data-dir]').forEach(btn => {
        btn.onclick = () => {
            const step = 15;
            switch (btn.dataset.dir) {
                case 'up': state.panY += step; break;
                case 'down': state.panY -= step; break;
                case 'left': state.panX += step; break;
                case 'right': state.panX -= step; break;
                case 'reset': state.panX = 0; state.panY = 0; break;
            }
            updateVideo();
        };
    });
}

window.addEventListener('beforeunload', () => {
    if (stream) stream.getTracks().forEach(t => t.stop());
});
