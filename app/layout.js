'use client';

import { RoleProvider } from '@/context/RoleContext';
import LayoutContent from '@/components/LayoutContent';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Fameo Admin Dashboard</title>
        <meta name="description" content="Community admin dashboard for Fameo" />
      </head>
      <body className="bg-gray-50">
        <RoleProvider>
          <LayoutContent>{children}</LayoutContent>
        </RoleProvider>
      </body>
    </html>
  );
}
