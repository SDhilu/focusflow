# FocusFlow — Productivity Dashboard

A beginner-friendly React + Vite dashboard with a lavender-and-white UI. It uses plain CSS and LocalStorage (no backend).

## Requirements
- Node.js (recommended: current LTS)
- npm

## Run it locally
1. Extract this ZIP.
2. Open a terminal in the `focusflow` folder.
3. Install packages:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build for production
```bash
npm run build
npm run preview
```

## Project structure
- `src/App.jsx` — combines the dashboard components and shared state.
- `src/styles.css` — all visual styling and responsive breakpoints.
- `src/data/initialData.js` — starter tasks, habits, and weekly chart data.
- `src/hooks/useLocalStorage.js` — reusable hook that saves state in the browser.
- `src/components/` — separate components for sidebar, topbar, stats, chart, tasks, habits, and welcome banner.

## How LocalStorage works
Tasks are saved under `focusflow-tasks` and habits under `focusflow-habits` in the current browser. Data stays on this device/browser; it is not synced to another device. To reset the demo, open browser developer tools → Application/Storage → Local Storage and remove those two keys.

## Notes
- Weekly chart values and focus-time total are currently demo values.
- Search filters tasks by title.
- Settings/help buttons are simple demo interactions, not full pages.
