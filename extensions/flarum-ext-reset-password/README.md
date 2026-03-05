# Reset Password Redesign — Extensión para Flarum

Rediseño completo de la página de restablecimiento de contraseña con:
- Diseño oscuro elegante con efectos de fondo animados
- Cuadro de requisitos de seguridad
- Medidor de fortaleza de contraseña en tiempo real
- Indicador de coincidencia entre ambos campos
- Botón para mostrar/ocultar contraseña
- Botón deshabilitado hasta que todo sea válido
- Compatibilidad con Flarum 1.8.x, PHP 8.3, MariaDB

---

## Instalación paso a paso

### 1. Subir la extensión al servidor

Copia la carpeta `miforums/reset-password-redesign` completa a:

```
/ruta-de-tu-flarum/packages/
```

Si no existe la carpeta `packages`, créala:

```bash
mkdir -p /var/www/flarum/packages
```

Sube la carpeta de modo que quede así:
```
/var/www/flarum/packages/reset-password-redesign/
    composer.json
    extend.php
    js/
    less/
    locale/
```

---

### 2. Registrar el repositorio local en composer.json

Abre el archivo `composer.json` **principal de Flarum** (en la raíz de tu foro) y agrega dentro de `"repositories"`:

```json
{
    "repositories": [
        {
            "type": "path",
            "url": "./packages/reset-password-redesign"
        }
    ]
}
```

Si `"repositories"` no existe, agrégalo como clave nueva antes de `"require"`.

---

### 3. Instalar con Composer

Desde la raíz de tu instalación de Flarum:

```bash
composer require miforums/reset-password-redesign:*@dev
```

---

### 4. Compilar el JavaScript

```bash
cd packages/reset-password-redesign/js
npm install
npm run build
```

---

### 5. Activar y limpiar caché

```bash
cd /var/www/flarum          # raíz de flarum
php flarum extension:enable miforums-reset-password-redesign
php flarum cache:clear
```

---

### 6. Verificar

Visita la URL de restablecimiento de contraseña de tu foro. Deberías ver el nuevo diseño.

---

## Desinstalar

```bash
composer remove miforums/reset-password-redesign
php flarum cache:clear
```

---

## Personalizar colores

Edita `less/forum.less` y cambia las variables al inicio del archivo:

```less
@rp-accent:  #8b5cf6;   // color morado principal
@rp-accent2: #06b6d4;   // color secundario cyan
@rp-bg:      #0b0d14;   // fondo de página
@rp-surface: #13151f;   // fondo de la tarjeta
```

Luego recompila el JS/CSS:
```bash
cd packages/reset-password-redesign/js && npm run build
php flarum cache:clear
```

---

## Estructura de archivos

```
reset-password-redesign/
├── composer.json          ← metadata de la extensión
├── extend.php             ← punto de entrada PHP
├── js/
│   ├── package.json
│   ├── webpack.config.js
│   ├── src/
│   │   └── forum.js       ← lógica del componente (JSX/Mithril)
│   └── dist/
│       └── forum.js       ← generado por npm run build
├── less/
│   └── forum.less         ← todos los estilos
└── locale/
    ├── es.yml             ← textos en español
    └── en.yml             ← textos en inglés
```
