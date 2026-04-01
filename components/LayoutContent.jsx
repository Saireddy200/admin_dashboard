'use client';

import { useRole } from '@/context/RoleContext';
import { PageProvider } from '@/context/PageContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function LayoutContent({ children }) {
  const { activeRole, setActiveRole } = useRole();

  return (
    <PageProvider>
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
    </PageProvider>
  );
}
