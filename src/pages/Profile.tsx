
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, LogOut, MessageSquare, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import { Separator } from '@/components/ui/separator';

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
  
  const menuItems = [
    { 
      icon: MessageSquare, 
      label: 'Pesan', 
      action: () => console.log('Messages') 
    },
    { 
      icon: Calendar, 
      label: 'Riwayat Listing', 
      action: () => console.log('Listing History') 
    },
    { 
      icon: CreditCard, 
      label: 'Token & Pembayaran', 
      action: () => navigate('/tokens') 
    },
    { 
      icon: Settings, 
      label: 'Pengaturan', 
      action: () => console.log('Settings') 
    },
  ];
  
  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-logiflex-blue text-white p-4 pt-safe">
        <h1 className="text-xl font-bold">Profil</h1>
      </div>
      
      <div className="p-4">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center">
            <div className="bg-logiflex-blue/20 rounded-full p-3">
              <User size={32} className="text-logiflex-blue" />
            </div>
            <div className="ml-4">
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.phone}</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Token Tersedia</p>
              <p className="font-medium">{user.tokens} Token</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Bergabung Sejak</p>
              <p>{user.joinDate}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/tokens')}
          >
            Beli Token
          </Button>
        </div>
        
        {/* Menu */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className="flex items-center w-full p-4 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
              onClick={item.action}
            >
              <item.icon size={20} className="text-logiflex-darkgrey mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
          
          <Separator />
          
          <button 
            className="flex items-center w-full p-4 text-left text-red-500 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            onClick={() => console.log('Logout')}
          >
            <LogOut size={20} className="mr-3" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
