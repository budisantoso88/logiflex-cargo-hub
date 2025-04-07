
import React from 'react';
import { ArrowLeft, Bell, Lock, HelpCircle, User, Book, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would handle logout logic
    toast.success("Berhasil keluar dari akun");
    // Navigate to home after logout
    navigate('/');
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-logiflex-blue text-white p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white mr-2" 
          onClick={() => navigate('/profile')}
        >
          <ArrowLeft size={24} />
        </Button>
        <h1 className="text-xl font-bold">Pengaturan</h1>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <h2 className="p-4 font-semibold text-gray-700">Akun</h2>
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <User size={20} className="text-logiflex-darkgrey mr-3" />
              <span>Ubah Profil</span>
            </div>
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} className="rotate-180" />
            </Button>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Lock size={20} className="text-logiflex-darkgrey mr-3" />
              <span>Keamanan</span>
            </div>
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} className="rotate-180" />
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <h2 className="p-4 font-semibold text-gray-700">Notifikasi</h2>
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Bell size={20} className="text-logiflex-darkgrey mr-3" />
              <span>Notifikasi Listing</span>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Bell size={20} className="text-logiflex-darkgrey mr-3" />
              <span>Notifikasi Pesan</span>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <h2 className="p-4 font-semibold text-gray-700">Lainnya</h2>
          <Separator />
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <HelpCircle size={20} className="text-logiflex-darkgrey mr-3" />
              <span>Bantuan</span>
            </div>
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} className="rotate-180" />
            </Button>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Book size={20} className="text-logiflex-darkgrey mr-3" />
              <span>Syarat dan Ketentuan</span>
            </div>
            <Button variant="ghost" size="icon">
              <ArrowLeft size={20} className="rotate-180" />
            </Button>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full text-red-500 border-red-500 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-2" />
          <span>Keluar</span>
        </Button>
      </div>
    </MainLayout>
  );
};

export default Settings;
