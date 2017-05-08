# angular2-socketio-chat-example

## Entrypoints

On this directory you will see *entrypoints* for the code. WebPack uses the these to transpile and create ES5 bundles (e.g. `target/assets/js/main.js`, `target/assets/js/vendor.js`, `target/assets/js/polyfills.js` and `target/assets/js/server.js`).

- `main.ts` is the main application (frontend)
- `index.html` is the SPA (single page app) HTML
- `vendor.ts` contains the dependencies for libraries to be bundled
- `polyfills.ts` contains the dependencies for polyfills
- `server.ts` is the NodeJS backend

# Subdirectories

- `app/` contains frontend-only code parts
- `models/` contains models shared with frontend and backend
- `backend/` contains the backend code
- `styles/` contains shared SCSS files


