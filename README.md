# Fameo Admin Dashboard

A modern admin dashboard built with **Next.js 14 (App Router)** and **Tailwind CSS**.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`

## 📁 Project Structure

```
fameo-admin-dashboard/
├── app/
│   ├── layout.js          # Root layout with Sidebar & Header
│   ├── page.js            # Home page placeholder
│   └── globals.css        # Global styles & Tailwind directives
├── components/
│   ├── Sidebar.jsx        # Fixed sidebar navigation
│   └── Header.jsx         # Top header with role buttons
├── public/                # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 📦 Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Tech Stack

- **Next.js 14** - React framework with App Router
- **Tailwind CSS 3** - Utility-first CSS framework
- **React 18** - UI library

## 📋 Features

- ✅ Modern admin dashboard layout
- ✅ Fixed sidebar navigation
- ✅ Sticky header with role switcher
- ✅ Responsive design
- ✅ Clean component structure

## 🔧 Configuration

### Tailwind Config
Customize colors, spacing, and plugins in `tailwind.config.js`

### Next.js Config
Configure image optimization, webpack, and more in `next.config.js`

## 📝 Notes

- All components use `'use client'` directive for client-side interactivity
- Sidebar width is set to `w-64` (256px)
- Content area has `ml-64` margin to accommodate fixed sidebar
- Uses light theme with `bg-gray-50`

## 🤝 Contributing

Feel free to extend this dashboard with additional pages and components!

## 📄 License

Private project - Fameo Community Admin Dashboard
