# MindBase Dashboard (MB-front)

A powerful, modern dashboard built with **SvelteKit** and **TailwindCSS** for managing and monitoring mobile and desktop devices. This application provides real-time statistics, remote configuration capabilities, and comprehensive content filtering controls for Android, iOS, and Mac devices.

## Features

- **📊 Real-time Dashboard**
  - **Live Statistics**: Monitor total customers, active connections, and installation trends.
  - **Platform Breakdown**: Detailed metrics split by Android, iOS, and Mac platforms.
  - **Trend Analysis**: Visual indicators for efficient tracking of user base growth.

- **📱 Device Management**
  - **Status Monitoring**: Check online/offline status and device health.
  - **Remote Configuration**: Push settings, updates, and verify enrollment locks wirelessly.
  - **App & Extension Control**: Manage installed applications and browser extensions.

- **🛡️ Content Filtering & Security**
  - **Category Management**: Allow or block specific content categories.
  - **URL Restrictions**: Granular control over accessible websites with logging capabilities.
  - **Remote Commands**: Execute maintenance commands or temporary disablements.

- **⚙️ Admin Controls**
  - **Configuration Management**: Centralized admin settings and	 password management.
  - **Payment Integration**: View subscription and payment statuses for managed devices.

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5) - The fastest way to build Svelte apps.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type-safe, robust code.
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
- **Icons**: [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte) - Beautiful & consistent icons.
- **Build Tool**: [Vite](https://vitejs.dev/) - Next generation frontend tooling.

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd MB-front-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application should now be running on `http://localhost:5173`.

### Building for Production

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Project Structure

```bash
src/
├── components/   # Reusable UI components
├── routes/       # Application pages and routing
│   ├── (auth)/   # Authentication pages (login/register)
│   └── dashboard/# Main dashboard views
├── services/     # API integration and business logic
│   ├── devices/  # Device management services
│   ├── info/     # Device status and lock info
│   └── ...       # Other feature-specific services
└── styles/       # Global styles and tailwind config
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - Run Svelte/TypeScript checks
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint
