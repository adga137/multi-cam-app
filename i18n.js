const i18nData = {
    es: {
        appTitle: "📷 Cámaras App",
        refreshBtn: "🔄 Actualizar cámaras",
        availableCams: "Cámaras disponibles",
        activeWindows: "Ventanas activas",
        noneActive: "Ninguna activa",
        flash: "💡 Flash",
        flashOn: "💡 Flash (ON)",
        settings: "⚙ Ajustes",
        center: "⊹ Centrar",
        zoom: "Zoom",
        crop: "Recorte",
        noCams: "No se detectaron cámaras",
        language: "Idioma",
        initializing: "Inicializando..."
    },
    en: {
        appTitle: "📷 Cameras App",
        refreshBtn: "🔄 Refresh cameras",
        availableCams: "Available cameras",
        activeWindows: "Active windows",
        noneActive: "None active",
        flash: "💡 Flash",
        flashOn: "💡 Flash (ON)",
        settings: "⚙ Settings",
        center: "⊹ Center",
        zoom: "Zoom",
        crop: "Crop",
        noCams: "No cameras detected",
        language: "Language",
        initializing: "Initializing..."
    },
    pt: {
        appTitle: "📷 App de Câmeras",
        refreshBtn: "🔄 Atualizar câmeras",
        availableCams: "Câmeras disponíveis",
        activeWindows: "Janelas ativas",
        noneActive: "Nenhuma ativa",
        flash: "💡 Flash",
        flashOn: "💡 Flash (ON)",
        settings: "⚙ Configurações",
        center: "⊹ Centralizar",
        zoom: "Zoom",
        crop: "Recorte",
        noCams: "Nenhuma câmera detectada",
        language: "Idioma",
        initializing: "Inicializando..."
    }
};

let currentLang = localStorage.getItem('appLang') || 'es';

function setLanguage(lang) {
    if (i18nData[lang]) {
        currentLang = lang;
        localStorage.setItem('appLang', lang);
        applyTranslations();
    }
}

function t(key) {
    return i18nData[currentLang][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (el.tagName === 'INPUT' && el.type === 'button') {
            el.value = t(key);
        } else {
            el.textContent = t(key);
        }
    });
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = currentLang;
}

document.addEventListener('DOMContentLoaded', applyTranslations);
