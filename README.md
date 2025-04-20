# goAccelovate Assessment App

This is a **Next.js** application developed for the technical assessment at **goAccelovate**. It is a modern full-stack application built with a focus on authentication, dashboard functionality, and task management using industry-standard tools and best practices.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/))
- **Deployment**: [Vercel](https://vercel.com/)

## 🌐 Live Demo

🔗 [View the deployed app here](https://your-vercel-app-url.vercel.app)

> _Replace the above link with your actual Vercel deployment URL._

---

## ✅ Features

### 🔐 Authentication

- Secure login and logout using **NextAuth**.
- Session-based protection with middleware.
- Session state is used in the Navbar to display user-specific information.

### 📋 Task Management

- Authenticated users can:
  - View a list of their tasks
  - Create new tasks
  - Update and edit existing tasks
  - Delete tasks

### 🧑‍💼 User Dashboard

- After signing in, users are redirected to a protected **dashboard**.
- The dashboard shows tasks fetched dynamically from the **Neon** PostgreSQL database.
- The UI is built using **shadcn/ui** for a consistent and clean look.

### ⚙️ Middleware Protection

- All routes under `/dashboard` are protected using custom middleware.
- Unauthorized users are redirected to the `/signin` page.

### 📦 API Security

- API routes are protected using `getToken()` to ensure only authenticated users can access them.

---

## 💾 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/rogueinnovator/goaccelovate-assessment.git
   cd goaccelovate-assessment
   ```
