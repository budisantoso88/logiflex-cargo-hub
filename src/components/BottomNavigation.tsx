
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Package, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const navItems = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/search', label: 'Pencarian', icon: Search },
    { path: '/create', label: 'Listing', icon: Package },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive 
                  ? "text-logiflex-blue"
                  : "text-logiflex-darkgrey"
              )
            }
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavigation;
