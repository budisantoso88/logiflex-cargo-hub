
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Plus, User, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  // Mock notification counts
  const notificationCount = 3;
  const messageCount = 2;

  const navItems = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/search', label: 'Pencarian', icon: Search },
    { path: '/create', label: 'Listing', icon: Plus },
    { 
      path: '/messages', 
      label: 'Chat', 
      icon: MessageCircle,
      badge: messageCount > 0 ? messageCount : undefined 
    },
    { 
      path: '/profile', 
      label: 'Profil', 
      icon: User,
      badge: notificationCount > 0 ? notificationCount : undefined 
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50 shadow-lg">
      <nav className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-full h-full relative",
                isActive 
                  ? "text-logiflex-blue"
                  : "text-gray-400"
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.path === '/create' ? (
                  <div className="absolute -top-6 bg-gradient-primary rounded-full p-3 shadow-button">
                    <item.icon size={22} className="text-white" />
                  </div>
                ) : (
                  <div className="relative">
                    <item.icon size={20} className={isActive ? "mb-1" : "mb-1"} />
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
                <span className={`text-xs mt-1 ${item.path === '/create' ? "mt-7" : ""}`}>
                  {item.label}
                </span>
                {isActive && item.path !== '/create' && (
                  <div className="absolute bottom-0 w-1/2 h-1 bg-logiflex-blue rounded-t-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavigation;
