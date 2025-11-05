# 📘 Guía de Configuración: GitHub y Cloudflare Pages

## 📋 Requisitos previos

- Cuenta de GitHub
- Cuenta de Cloudflare (gratuita)
- Git instalado en tu computadora

---

## 🔧 Parte 1: Configurar Git Local (YA HECHO)

✅ El repositorio local ya está inicializado con:
- Git configurado
- Rama `main` creada
- Commit inicial realizado

---

## 🌐 Parte 2: Crear Repositorio en GitHub

### Opción A: Desde la Web de GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** (esquina superior derecha) → **"New repository"**
3. Configura el repositorio:
   - **Repository name:** `nutriplan`
   - **Description:** `Planificador de comidas estacional con Next.js`
   - **Visibilidad:** Público o Privado (tu elección)
   - ⚠️ **NO marques:** "Add a README file" (ya lo tenemos)
   - ⚠️ **NO marques:** "Add .gitignore" (ya lo tenemos)
4. Haz clic en **"Create repository"**

### Conectar el Repositorio Local con GitHub

Después de crear el repositorio, GitHub te mostrará instrucciones. Usa estas:

```bash
# Ve al directorio del proyecto
cd /ruta/a/nutriplan

# Configura tu email y nombre (usa tus datos reales)
git config user.email "tu-email@gmail.com"
git config user.name "Tu Nombre"

# Conecta con GitHub (reemplaza TU-USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU-USUARIO/nutriplan.git

# Sube el código
git push -u origin main
```

### Opción B: Usando GitHub CLI (gh)

```bash
cd /ruta/a/nutriplan
gh repo create nutriplan --public --source=. --push
```

---

## ☁️ Parte 3: Configurar Cloudflare Pages

### 1. Acceder a Cloudflare Pages

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Inicia sesión en tu cuenta
3. En el menú lateral, selecciona **"Workers & Pages"**
4. Haz clic en **"Create application"**
5. Selecciona la pestaña **"Pages"**
6. Haz clic en **"Connect to Git"**

### 2. Conectar con GitHub

1. Haz clic en **"Connect GitHub"**
2. Autoriza a Cloudflare a acceder a tu cuenta de GitHub
3. Selecciona el repositorio **"nutriplan"**
4. Haz clic en **"Begin setup"**

### 3. Configurar el Build

Usa la siguiente configuración:

- **Project name:** `nutriplan` (o el nombre que prefieras)
- **Production branch:** `main`
- **Framework preset:** `Next.js (Static HTML Export)`
- **Build command:** `npm run build`
- **Build output directory:** `out`
- **Root directory:** `/` (dejar vacío)

### Variables de entorno (opcional)
Por ahora no necesitas ninguna, pero aquí puedes agregar claves API en el futuro.

### 4. Desplegar

1. Haz clic en **"Save and Deploy"**
2. Cloudflare comenzará a construir tu aplicación (tarda 2-5 minutos)
3. Una vez completado, te dará una URL tipo: `https://nutriplan-xxx.pages.dev`

---

## 🔄 Flujo de Trabajo Continuo

### Cada vez que hagas cambios:

```bash
# 1. Guarda tus cambios
git add .
git commit -m "Descripción de los cambios"
git push

# 2. Cloudflare detectará automáticamente los cambios
#    y desplegará la nueva versión en 2-5 minutos
```

### Ver el estado del despliegue:

1. Ve a tu [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Workers & Pages** → Tu proyecto **nutriplan**
3. Verás el historial de despliegues y su estado

---

## 🎨 Configurar Dominio Personalizado (Opcional)

Si tienes un dominio propio:

1. En Cloudflare Pages, ve a tu proyecto **nutriplan**
2. Pestaña **"Custom domains"**
3. Haz clic en **"Set up a custom domain"**
4. Sigue las instrucciones para configurar los registros DNS

---

## 🔍 URLs Importantes

- **Repositorio GitHub:** `https://github.com/TU-USUARIO/nutriplan`
- **Sitio en Cloudflare:** `https://nutriplan-xxx.pages.dev`
- **Dashboard Cloudflare:** `https://dash.cloudflare.com`

---

## 🚨 Solución de Problemas

### Error: "Git remote already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/nutriplan.git
```

### Error en el build de Cloudflare
- Verifica que el **Build command** sea exactamente: `npm run build`
- Verifica que el **Build output directory** sea: `out`

### La página no carga correctamente
- Asegúrate de que `next.config.js` tenga `output: 'export'`
- Revisa los logs del build en Cloudflare

---

## 📝 Comandos de Referencia Rápida

```bash
# Ver estado del repositorio
git status

# Ver cambios
git diff

# Crear un nuevo commit
git add .
git commit -m "mensaje"
git push

# Ver el historial
git log --oneline

# Cambiar configuración de Git
git config user.email "tu-email@example.com"
git config user.name "Tu Nombre"
```

---

## ✅ Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Código local subido a GitHub
- [ ] Proyecto conectado en Cloudflare Pages
- [ ] Configuración de build correcta
- [ ] Primera versión desplegada exitosamente
- [ ] URL funcionando correctamente

---

## 🎉 ¡Listo!

Tu proyecto Nutriplan ahora está:
- ✅ Versionado en GitHub
- ✅ Desplegado en Cloudflare Pages
- ✅ Con despliegue continuo automático
