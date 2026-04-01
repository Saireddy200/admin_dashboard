'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import './globals.css';

export default function RootLayout({ children }) {
  const [activeRole, setActiveRole] = useState('Super Admin');

  return (
    <html lang="en">
      <head>
        <title>Fameo Admin Dashboard</title>
        <meta name="description" content="Community admin dashboard for Fameo" />
      </head>
      <body className="bg-gray-50">
        <div className="flex flex-col h-screen">
          {/* Logo & Top Menu Bar */}
          <Header activeRole={activeRole} setActiveRole={setActiveRole} />

          {/* Main Content with Sidebar */}
          <div className="flex flex-1">
            {/* Sidebar Menu (on the left) */}
            <Sidebar activeRole={activeRole} />

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
