
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, LogOut, MessageSquare, Settings, User, ChevronRight, Shield, Gift, Star, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: 'Budi Santoso',
    phone: '081234567890',
    email: 'budi@example.com',
    tokens: 2,
    joinDate: '20 Mar 2025',
  };
  
  // Mock notification count
  const notificationCount = 3;
  
  const menuItems = [
    { 
      icon: MessageSquare, 
      label: 'Pesan', 
      action: () => navigate('/messages'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      badge: 2
    },
    { 
      icon: Bell, 
      label: 'Notifikasi', 
      action: () => navigate('/notifications'),
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      badge: notificationCount
    },
    { 
      icon: Calendar, 
      label: 'Riwayat Listing', 
      action: () => navigate('/listing-history'),
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    },
    { 
      icon: CreditCard, 
      label: 'Token & Pembayaran', 
      action: () => navigate('/tokens'),
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    { 
      icon: Settings, 
      label: 'Pengaturan', 
      action: () => navigate('/settings'),
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-100'
    },
    { 
      icon: Shield, 
      label: 'Keamanan', 
      action: () => console.log('Security pressed'),
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    { 
      icon: Gift, 
      label: 'Kode Promo', 
      action: () => console.log('Promo code pressed'),
      color: 'text-pink-500',
      bgColor: 'bg-pink-100'
    },
  ];

  const handleLogout = () => {
    toast.success("Berhasil keluar dari akun");
    navigate('/');
  };
  
  return (
    <MainLayout>
      {/* Modern Gradient Header */}
      <div className="bg-gradient-primary text-white p-6 pt-safe rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Profil</h1>
          <div className="flex">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20 rounded-full mr-2 relative"
              onClick={() => navigate('/notifications')}
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {notificationCount}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20 rounded-full"
              onClick={() => navigate('/settings')}
            >
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 -mt-10">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <div className="flex items-center">
            <div className="bg-logiflex-blue/10 rounded-full p-4">
              <User size={40} className="text-logiflex-blue" />
            </div>
            <div className="ml-4">
              <h2 className="font-bold text-xl">{user.name}</h2>
              <div className="flex items-center mt-1">
                <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full flex items-center">
                  <Star size={12} className="mr-1" />
                  Verified
                </span>
                <span className="text-sm text-gray-500 ml-2">{user.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Token Tersedia</p>
              <p className="text-lg font-bold text-logiflex-blue">{user.tokens} <span className="text-sm font-normal">Token</span></p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Bergabung Sejak</p>
              <p className="font-medium">{user.joinDate}</p>
            </div>
          </div>
          
          <Button 
            className="w-full mt-5 bg-gradient-primary hover:bg-gradient-primary border-0 rounded-xl shadow-button hover:shadow-lg transition-all py-6 text-base"
            onClick={() => navigate('/tokens')}
          >
            <CreditCard size={20} className="mr-2" />
            Beli Token
          </Button>
        </div>
        
        {/* Menu */}
        <div className="mt-6 space-y-3 mb-4">
          <h3 className="font-semibold text-lg px-1">Menu</h3>

          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {menuItems.map((item, index) => (
              <button 
                key={index}
                className="flex items-center w-full p-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors justify-between group"
                onClick={item.action}
              >
                <div className="flex items-center">
                  <div className={`${item.bgColor} ${item.color} p-2 rounded-lg mr-3 relative`}>
                    <item.icon size={18} />
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            ))}
          </div>
          
          <button 
            className="flex items-center w-full p-4 text-left text-red-500 bg-white rounded-2xl shadow-card hover:bg-gray-50 active:bg-gray-100 transition-colors justify-between group"
            onClick={handleLogout}
          >
            <div className="flex items-center">
              <div className="bg-red-100 text-red-500 p-2 rounded-lg mr-3">
                <LogOut size={18} />
              </div>
              <span className="font-medium">Keluar</span>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
