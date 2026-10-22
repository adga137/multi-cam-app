# 📷 Cámaras App (Multi-Cam Desktop)

Una aplicación de escritorio multiplataforma construida con **Electron** que permite gestionar múltiples cámaras web en ventanas independientes, sin bordes del sistema operativo, con controles de zoom, recorte, paneo y activación de flash (torch) si el hardware lo soporta. Incluye soporte multi-idioma y una interfaz limpia y optimizada.

---

## 🤝 Créditos y Desarrollo

Este proyecto es el resultado de una colaboración entre inteligencia artificial y desarrollo humano:

- **Desarrollo Principal y Arquitectura**: Desarrollado por **Qwen3.7** (Modelo de IA de Alibaba Cloud).
- **Co-Desarrollador y Ajustes Finos**: Alejandro García Github: **adga137** (Encargado de la supervisión, ajustes finos de UI/UX, pruebas de hardware y optimización visual).

---

## ⚖️ Licencia

Este software está protegido bajo la **Licencia Pública General de GNU v3.0 (GPLv3)**.  
Esto significa que eres libre de usar, modificar y distribuir el software, siempre y cuando cualquier trabajo derivado se distribuya bajo la misma licencia y se mantenga el código abierto.  
Consulta el archivo `LICENSE` para más detalles o visita: [https://www.gnu.org/licenses/gpl-3.0.html](https://www.gnu.org/licenses/gpl-3.0.html)

---

## ☕ Apoya el Desarrollo

Si esta aplicación te resulta útil y deseas apoyar su mantenimiento, la corrección de errores y el desarrollo de nuevas funciones en el futuro, puedes hacer una donación a través de los siguientes medios:

- **Binance ID**: `[60122342]`
- **Bitcoin (BTC)**: `[1PFp17P2fHH1kwywHsuR84XDU9jZfXR6gU]`
- **Litecoin (LTC)**: `[LRqgbivRfHTqk3S2iU5QKN5Hsfnqufzikj]`

*Cualquier aporte, por pequeño que sea, es profundamente apreciado y se destina directamente a la mejora continua del proyecto.*

---

## 🚀 Características Principales

- 🪟 **Ventanas Independientes**: Cada cámara se abre en una ventana nativa del sistema operativo sin barra de título (`frame: false`).
- 💡 **Soporte de Flash/Torch**: Botón dedicado para activar la luz de la cámara (se oculta automáticamente si el hardware no lo soporta).
- 🔍 **Controles de Imagen**: Zoom digital, recorte (crop) y paneo (movimiento de la imagen) en tiempo real.
- 🌍 **Multi-idioma**: Soporte nativo para Español, Inglés y Portugués (fácilmente extensible), con persistencia de la preferencia del usuario.
- 🖥️ **Multiplataforma**: Compilable para Windows, macOS y Linux.

---

## 🛠️ Requisitos de Software y Código

Para compilar y ejecutar este proyecto, necesitas tener instalado en tu sistema:

1. **Node.js**: Versión LTS (recomendada v20.x o superior). [Descargar aquí](https://nodejs.org/)
2. **npm**: Viene incluido con Node.js.
3. **Git**: Para clonar el repositorio.
4. **Dependencias de compilación por Sistema Operativo**:
   - **Windows**: Python 3.x y "Visual Studio Build Tools" (con el workload de C++).
   - **macOS**: Xcode y las herramientas de línea de comandos de Xcode (`xcode-select --install`).
   - **Linux**: `build-essential`, `fakeroot`, `dpkg`, `rpm` (dependiendo de si compilas `.deb` o `.rpm`). En Ubuntu/Debian: `sudo apt install build-essential fakeroot dpkg`.

---

## 📦 Instalación y Configuración

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/TU_USUARIO/camaras-app.git
   cd camaras-app
   ```
   
2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```
3. (Opcional pero recomendado): Coloca un icono personalizado de 512x512 píxeles en formato PNG dentro de la carpeta assets/ con el nombre icon.png.


## 💻 Ejecución en Modo Desarrollo

Para probar la aplicación en tiempo real con herramientas de desarrollo (DevTools) habilitadas:

    ```bash
    npm run dev
    ```

O simplemente usa **npm** start para ejecutarla sin las herramientas de desarrollo.


## 🏗️ Compilación y Distribución (Build)

El proyecto utiliza electron-builder para empaquetar la aplicación en instaladores nativos. Asegúrate de ejecutar estos comandos en el sistema operativo para el que deseas compilar (ej. compilar para macOS requiere estar en una Mac).

### Compilar para todas las plataformas (si estás en macOS)

    ```bash
    npm run build:all
    ```

### Compilar solo para Windows (.exe / NSIS)

    ```bash
    npm run build:win
    ```

El instalador se generará en la carpeta dist/.


### Compilar solo para macOS (.dmg)

    ```bash
    npm run build:mac
    ```

**Nota:** Para distribuir públicamente en macOS, necesitarás configurar certificados de Apple y notarización en el package.json.
Compilar solo para Linux (.AppImage y .deb)

## 📂 Estructura del Proyecto

```text
camaras-app/
├── assets/                 # Iconos y recursos estáticos
├── .github/                # Workflows de GitHub Actions (CI/CD)
├── main.js                 # Proceso principal de Electron
├── preload.js              # Puente seguro entre el backend y el frontend
├── index.html              # Interfaz de la ventana principal
├── camera-window.html      # Interfaz de las ventanas de cámara
├── renderer.js             # Lógica de la ventana principal
├── camera-renderer.js      # Lógica de las ventanas de cámara (WebRTC, controles)
├── i18n.js                 # Sistema de traducción y localización
├── styles.css              # Hoja de estilos global
└── package.json            # Configuración del proyecto y de electron-builder
```

## ⚠️ Notas Importantes

- Permisos de Cámara: La primera vez que ejecutes la app, el sistema operativo (especialmente macOS y Windows 11) solicitará permiso para acceder a la cámara. Debes concederlo.
- Wayland en Linux: Si usas una distribución Linux con Wayland, asegúrate de que las variables de entorno de PipeWire estén habilitadas para la captura de WebRTC (ya incluido en los flags de main.js).
- Flash/Torch: La función de flash solo aparecerá si la API del navegador detecta la capacidad torch en el track de video de la cámara.

## 📬 Contacto y Contribuciones

Las contribuciones, reportes de bugs y solicitudes de funciones son bienvenidas. Por favor, abre un Issue o un Pull Request en este repositorio.
¡Gracias por usar Cámaras App!
