
🚀 CodeArc Frontend — React + Vite

This is the frontend UI for the CodeArc platform, built using React, Vite, Redux Toolkit, and Axios.
It provides user, admin, and recruiter interfaces with secure authentication, dashboards, profile management, and OAuth login.

📌 Features
🔐 Authentication

User Login / Signup

Admin & Recruiter login

OTP verification

Forgot + Reset Password

Google OAuth

GitHub OAuth

🎨 UI Features

Landing page with hero, features, join section

Modular component architecture

Responsive layouts for Admin / User / Recruiter

Protected routes (Private & Public routes)

Global state using Redux Toolkit

Axios API integration

🧩 Frontend Architecture

Clean folder structure

Reusable UI components

Custom hooks

Config-based API calls

Centralized auth + token management

Router-level access control

📂 Project Structure
src/
 ┣ assets/
 ┣ components/
 ┃ ┣ admin/
 ┃ ┣ auth/
 ┃ ┣ common/
 ┃ ┣ landing/
 ┃ ┗ user/
 ┣ config/
 ┣ hooks/
 ┣ layouts/
 ┣ lib/
 ┣ pages/
 ┣ router/
 ┣ services/
 ┣ store/
 ┣ types/
 ┣ utils/
 ┣ App.jsx
 ┗ main.jsx


This modular structure keeps your UI scalable and maintainable.

⚙️ Tech Stack
Feature	Technology
UI Framework	React 18
Build Tool	Vite
State Management	Redux Toolkit
Routing	React Router
API Client	Axios
Auth	JWT + OAuth
Styling	CSS / Tailwind (optional)
🔧 Setup Instructions

Follow these steps to run the frontend locally.

1️⃣ Clone the repository
git clone https://github.com/SREEJITH7/codearc-frontend.git
cd codearc-frontend

2️⃣ Install dependencies
npm install


(or)

yarn install

3️⃣ Create .env file

Inside the project root:

VITE_API_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_CLOUDINARY_BASE_URL=placeholder
VITE_APP_NAME=YourAppName


⚠️ Never commit .env to GitHub
(.gitignore already protects it)

4️⃣ Start development server
npm run dev


Your frontend will run at:

👉 http://localhost:5173/

🔐 Authentication Flow
User Login / Signup

Requests go to Django backend via stored API routes

Access & refresh tokens stored & validated

Protected routes restrict unauthorized access

Google & GitHub OAuth

Popup-based login

Backend handles token exchange

User is auto-logged in

📡 API Communication

All API calls use a centralized:

src/lib/axios.js


with interceptors for:

token refresh

adding access token to headers

handling errors gracefully

🏗 Recommended Git Branch Workflow
main
│
├── feature/auth-ui
├── feature/user-profile-ui
├── feature/admin-dashboard-ui
├── feature/recruiter-pages
└── feature/landing-page


Each feature → PR → review → merge to main.

🚀 Deployment

This frontend can be deployed to:

Vercel

Netlify

GitHub Pages

Cloudflare Pages

Backend URL can be configured via:

VITE_API_URL

🤝 Contributing

Create a feature branch

Write clean, modular code

Use meaningful commit messages

Submit PR for review

📄 License

This project is private (Internal Use).
>>>>>>> 89e19bc (added Readme file)
