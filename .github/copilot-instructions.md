# Copilot Instructions for studynotion-rebuild

## Project Overview

- **studynotion-rebuild** is a full-stack project with a `backend` (Node.js/Express, MongoDB) and a `frontend` (React, Redux, Tailwind CSS).
- The backend exposes REST APIs for course, user, cart, payment, and category management. The frontend is a SPA using Redux for state management and redux-persist for persistence.

## Key Architecture & Patterns

- **Backend**
  - Organized by domain: `controllers/`, `models/`, `routes/`, `middlewares/`, `config/`, `utils/`.
  - Each resource (e.g., course, user, cart) has a model, controller, and route file.
  - Uses `cloudinary` for media, and a `mailSender` utility for notifications.
  - MongoDB models are in `models/`, with business logic in `controllers/`.
  - API endpoints are grouped by resource in `routes/`.
- **Frontend**
  - React app bootstrapped with Create React App.
  - State managed via Redux (`store.js`, `slices/`).
  - UI components in `components/`, pages in `pages/`, dashboard features in `pages/dashboard/`.
  - Uses `redux-persist` for state persistence (see `store.js` and `cartSlice.js`, `userSlice.js`).
  - Tailwind CSS for styling (`tailwind.config.js`).

## Developer Workflows

- **Frontend**
  - Start: `npm start` in `frontend/` (runs on port 3000).
  - Build: `npm run build` (output in `build/`).
  - Test: `npm test` (Jest, watch mode).
- **Backend**
  - Start: `node server.js` or use `nodemon` for auto-reload.
  - Environment config in `config/`.

## Conventions & Integration

- **API Design**: RESTful, resource-based endpoints. Controllers handle business logic, routes handle endpoint registration.
- **Redux**: Slices in `slices/` (e.g., `cartSlice.js`, `userSlice.js`). Use actions and selectors for state access.
- **Persistence**: redux-persist is used for cart and user state.
- **Styling**: Tailwind utility classes, no CSS-in-JS.
- **Media**: File uploads handled via Cloudinary (see `config/cloudinary.js`).
- **Mail**: Email sending via `utils/mailSender.js`.

## Examples

- To add a new resource (e.g., wishlist): create a model, controller, and route in backend, and a slice in frontend if state is needed.
- To persist new Redux state: update `store.js` and add to redux-persist config.

## References

- [backend/server.js](../backend/server.js): Backend entry point
- [frontend/src/store.js](../frontend/src/store.js): Redux store setup
- [frontend/src/slices/](../frontend/src/slices/): Redux slices
- [backend/routes/](../backend/routes/): API route definitions
- [backend/models/](../backend/models/): Mongoose models
- [backend/controllers/](../backend/controllers/): Business logic

---

For more, see the `README.md` files in root and `frontend/`.
