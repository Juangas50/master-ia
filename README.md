# Máster IA · Autoguiado con Claude

Dashboard personal de seguimiento del máster de IA.

## 🚀 Cómo desplegarlo en GitHub Pages (5 pasos)

### Paso 1 — Instala Git en tu Mac
Abre Terminal (Cmd+Espacio → "Terminal") y ejecuta:
```bash
git --version
```
Si no está instalado, el Mac te ofrecerá instalarlo automáticamente. Acepta.

---

### Paso 2 — Crea el repo en GitHub
1. Ve a **github.com** → inicia sesión (o crea cuenta si no tienes)
2. Haz clic en **"New repository"** (botón verde arriba a la derecha)
3. Nombre del repo: `master-ia` (exactamente así, en minúsculas)
4. Selecciona **Public**
5. **NO** marques "Add a README" (ya tenemos uno)
6. Haz clic en **"Create repository"**

---

### Paso 3 — Sube los ficheros desde Terminal
Con la carpeta `master-ia` descargada en tu Mac, ejecuta estos comandos uno a uno:

```bash
# Entra en la carpeta del proyecto
cd ~/Downloads/master-ia

# Inicializa Git
git init

# Añade todos los ficheros
git add .

# Primer commit
git commit -m "primer commit: máster IA dashboard"

# Conecta con tu repo en GitHub (sustituye TU_USUARIO por tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/master-ia.git

# Sube el código
git branch -M main
git push -u origin main
```

---

### Paso 4 — Activa GitHub Pages
1. En tu repo de GitHub → pestaña **Settings**
2. En el menú lateral → **Pages**
3. En "Source" selecciona **"GitHub Actions"**
4. Guarda

GitHub ejecutará el workflow automáticamente. Tarda 1-2 minutos.

---

### Paso 5 — Accede a tu dashboard
Tu URL será:
```
https://TU_USUARIO.github.io/master-ia/
```

Guárdala como marcador en Chrome. Cada vez que hagas `git push`, el dashboard se actualiza solo.

---

## 💾 Sobre el progreso guardado
El progreso, las notas y el diario se guardan en el **localStorage de tu navegador**.
Esto significa:
- Se mantiene entre sesiones en el mismo navegador ✅
- No se sincroniza entre dispositivos ⚠️
- Si limpias el caché del navegador, se borra ⚠️

Para hacer backup de tu progreso: abre la consola del navegador (F12) y ejecuta:
```javascript
console.log(JSON.stringify(localStorage.getItem('master-progress')))
```

---

## 🛠 Desarrollo local (opcional)
```bash
npm install
npm run dev
```
Abre http://localhost:5173
