<div align="center">

#  CodeArc Frontend

**Modern, modular frontend for the CodeArc developer platform.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=flat-square&logo=reactrouter)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](./LICENSE)

[Getting Started](#-getting-started) · [Architecture](#-architecture) · [Features](#-features) · [API Integration](#-api-integration) · [Deployment](#-deployment) · [Contributing](#-contributing)

</div>

---

## Overview

CodeArc Frontend is the React + Vite UI layer for the CodeArc platform. It provides role-based interfaces for **Users**, **Admins**, and **Recruiters**, with secure JWT + OAuth authentication, protected routing, and a centralized Axios API client.

---

## Features

### Authentication
- Email/password login and signup
- OTP verification flow
- Forgot & reset password
- Google OAuth (popup-based)
- GitHub OAuth (popup-based)
- Admin and Recruiter dedicated login

### UI & UX
- Landing page with hero, features, and join sections
- Responsive dashboards per role (User / Admin / Recruiter)
- Protected routes with role-level access control
- Public routes redirect authenticated users automatically

### Engineering
- Global state with Redux Toolkit
- Centralized Axios client with request/response interceptors
- Automatic access token injection and refresh
- Modular, reusable component architecture
- Custom hooks for shared logic

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Build Tool | Vite |
| State Management | Redux Toolkit |
| Routing | React Router v6 |
| API Client | Axios |
| Authentication | JWT + Google & GitHub OAuth |
| Styling | CSS / Tailwind CSS |

---

## Architecture

```
src/
├── assets/                 # Static files (images, icons, fonts)
├── components/
│   ├── admin/              # Admin-specific UI components
│   ├── auth/               # Login, Signup, OTP, OAuth components
│   ├── common/             # Shared/reusable components
│   ├── landing/            # Hero, Features, Join section
│   └── user/               # User dashboard components
├── config/                 # Environment and API config
├── hooks/                  # Custom React hooks
├── layouts/                # Page-level layout wrappers
├── lib/
│   └── axios.js            # Axios instance with interceptors
├── pages/                  # Route-level page components
├── router/                 # Route definitions, Private/Public guards
├── services/               # API service functions
├── store/                  # Redux slices and store config
├── types/                  # TypeScript / JSDoc types
├── utils/                  # Utility/helper functions
├── App.jsx
└── main.jsx
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18.x`
- npm `>= 9.x` or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/SREEJITH7/codearc-frontend.git
cd codearc-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_CLOUDINARY_BASE_URL=your_cloudinary_base_url
VITE_APP_NAME=CodeArc
```

> **Warning:** Never commit `.env` to version control. It is already listed in `.gitignore`.

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Authentication Flow

### JWT (Email / Password)
1. User submits credentials → request sent to Django backend
2. Backend returns `access` and `refresh` tokens
3. Tokens stored and attached to all subsequent requests via Axios interceptors
4. Protected routes check token validity; expired tokens are refreshed automatically

### OAuth (Google / GitHub)
1. Popup window opens the provider's OAuth consent screen
2. Provider redirects back with an auth code
3. Backend exchanges the code for tokens
4. User session is established automatically — no manual login required

---

## API Integration

All API communication is handled through a single Axios instance at `src/lib/axios.js`.

**Interceptor responsibilities:**

| Interceptor | Behavior |
|---|---|
| Request | Attaches `Authorization: Bearer <access_token>` header |
| Response (401) | Silently refreshes access token and retries the original request |
| Response (error) | Normalizes and propagates errors for UI handling |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## Git Workflow

```
main
├── feature/auth-ui
├── feature/user-profile-ui
├── feature/admin-dashboard-ui
├── feature/recruiter-pages
└── feature/landing-page
```

**Process:** `feature branch` → Pull Request → Code Review → Merge to `main`

Use clear, descriptive commit messages:
```bash
git commit -m "feat(auth): add GitHub OAuth popup flow"
git commit -m "fix(router): redirect authenticated users from public routes"
```

---

## Deployment

The frontend is a static Vite build and can be deployed to any static hosting provider.

| Platform | Notes |
|---|---|
| [Vercel](https://vercel.com) | Recommended — auto-deploys from GitHub |
| [Netlify](https://netlify.com) | Supports SPA redirect rules out of the box |
| [Cloudflare Pages](https://pages.cloudflare.com) | Fast global CDN |
| [GitHub Pages](https://pages.github.com) | Free, requires base URL config |

Set `VITE_API_URL` in your hosting provider's environment variable settings to point to the production backend.

---

## Contributing

1. Fork the repo and create a feature branch from `main`
2. Write clean, modular, well-named code
3. Keep components small and single-responsibility
4. Use meaningful commit messages (see above)
5. Open a Pull Request with a clear description of changes

> This is a private/internal project. Please coordinate with the team before making significant architectural changes.

---

## License

**Private — Internal Use Only.**
Unauthorized distribution or use outside the CodeArc organization is not permitted.

---

<div align="center">
Built with by the CodeArc team
</div>
