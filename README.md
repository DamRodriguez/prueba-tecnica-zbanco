# Zeta Banco - Sistema de transferencias con Mercado Crypto y Dashboard 🏦

Sistema de transferencias gestionado principalmente con Redux Toolkit para una eficiente manipulación de los datos. Incluye un módulo de visualización de los mismos con un historial y sus filtros, además de un dashboard con gráficas integradas.

## 🚀 Demo en Vivo
Se puede acceder a la versión desplegada y funcional aquí:
👉 **[Zeta Banco - GitHub Pages](https://damrodriguez.github.io/prueba-tecnica-zbanco/)**

---

## 🛠️ Tecnologías y Stack

* **React + TypeScript**
* **Vite**
* **Tailwind CSS**
* **Redux Toolkit**
* **React Hook Form + Zod**
* **WebSockets (Finnhub API)**
* **Framer Motion**
* **React Toastify**
* **i18n**

---

## 💻 Instrucciones para Ejecución Local

Si deseas ejecutar el proyecto en tu máquina local, sigue estos pasos:

### 1. Requisitos Previos
* **Node.js** (v18.0 o superior)
* **npm** o **yarn**

### 2. Clonar, Instalar y Correr
```bash
# 1. Clonar el repositorio
git clone https://github.com/DamRodriguez/prueba-tecnica-zbanco

# 2. Entrar a la carpeta del proyecto (Ruta completa)
cd prueba-tecnica-zbanco/zbanco-project

# 3. Instalar dependencias
npm install

# 4. Correr el proyecto
npm run dev
```
### 3. Configuración de Variables de Entorno (Importante)

Para que el monitor de Criptomonedas funcione en tiempo real mediante WebSockets (localmente), debe crear un archivo llamado `.env` en la raíz de la carpeta `zbanco-project` (ubicado al mismo nivel que el archivo `package.json`):

```env
VITE_FINNHUB_KEY=tu_api_key_aquí
