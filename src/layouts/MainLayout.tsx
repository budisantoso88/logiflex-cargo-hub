
import React from 'react';
import BottomNavigation from '@/components/BottomNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

const MainLayout = ({ children, hideNavigation = false }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 pb-20 overflow-hidden">
        {children}
      </main>
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};

export default MainLayout;
