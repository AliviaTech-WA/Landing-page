# AliviaTech · Landing page Angular

Landing pública de AliviaTech migrada a Angular 22.3. Conserva la identidad visual original y añade navegación accesible, animaciones progresivas, una demostración por rol y enlaces legales reales.

## Requisitos

- Node.js compatible con Angular 22 (el proyecto fue verificado con Node 24).
- npm y las dependencias de `package-lock.json`.

## Desarrollo

```bash
npm ci
npm start
```

La aplicación estará disponible por defecto en `http://localhost:4200/`.

## Configurar el acceso a autenticación

El repositorio no incluye actualmente una ruta de login ni una URL real de otra aplicación. Para evitar inventar un destino, los controles **Iniciar sesión** se muestran deshabilitados hasta completar esta configuración:

- Desarrollo: `src/environments/environment.ts`
- Producción: `src/environments/environment.production.ts`

Asigna `loginUrl` a:

- una ruta interna, por ejemplo `'/login'`, cuando esa ruta sea parte de esta aplicación; o
- una URL absoluta, por ejemplo `'https://app.dominio.example/login'`, cuando la autenticación pertenezca a otro despliegue.

Si se utiliza una ruta interna, debe agregarse también su componente o carga diferida a `src/app/app.routes.ts`.

## Verificación

```bash
npm test -- --watch=false
npm run build
```

El build de producción se genera en `dist/landing-page/browser/`.

## Despliegue estático

1. Configura `loginUrl` para el entorno de producción.
2. Ejecuta `npm ci` y `npm run build`.
3. Publica el contenido de `dist/landing-page/browser/` en el proveedor elegido.
4. Configura el servidor para servir archivos existentes directamente y redirigir rutas Angular desconocidas a `/index.html` con estado 200.
5. No redirijas los documentos existentes bajo `/legal/`; se publican como archivos HTML estáticos.
6. Habilita HTTPS y compresión Brotli o gzip desde el proveedor.

No se incluye configuración específica de Netlify, Vercel, Firebase, Cloudflare u otro proveedor porque todavía no se ha elegido uno.

## Estructura principal

```text
src/app/
├── components/
│   ├── login-link/       # Destino centralizado y estado pendiente del login
│   ├── site-footer/      # Contacto y enlaces legales
│   └── site-header/      # Navegación activa y menú responsive
├── pages/
│   └── landing-page/     # Contenido e interactividad de la landing
├── shared/
│   ├── hero-scale.directive.ts
│   └── reveal.directive.ts
├── app.routes.ts
└── app.ts
```

Los recursos públicos viven en `public/`. Los documentos legales existentes se conservan en `public/legal/`.
