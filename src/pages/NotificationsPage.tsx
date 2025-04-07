
import React from 'react';
import { ArrowLeft, Bell, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";

interface Notification {
  id: number;
  title: string;
  content: string;
  timestamp: string;
  type: 'system' | 'message' | 'listing';
  read: boolean;
}

const NotificationsPage = () => {
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      title: 'Pesan Baru',
      content: 'Anda menerima pesan baru dari Joko Widodo',
      timestamp: '10 menit lalu',
      type: 'message',
      read: false,
    },
    {
      id: 2,
      title: 'Pembayaran Berhasil',
      content: 'Pembayaran untuk token berhasil. Token telah ditambahkan ke akun Anda',
      timestamp: '2 jam lalu',
      type: 'system',
      read: false,
    },
    {
      id: 3,
      title: 'Listing Baru di Daerah Anda',
      content: 'Ada 5 listing baru yang mungkin sesuai dengan preferensi Anda',
      timestamp: '1 hari lalu',
      type: 'listing',
      read: true,
    },
    {
      id: 4,
      title: 'Pengingat Token',
      content: 'Token Anda tersisa 2. Pertimbangkan untuk membeli lebih banyak',
      timestamp: '3 hari lalu',
      type: 'system',
      read: true,
    },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success("Semua notifikasi telah dibaca");
  };
  
  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ));
    
    // Navigate based on notification type
    if (notification.type === 'message') {
      navigate('/messages');
    } else if (notification.type === 'listing') {
      navigate('/search');
    }
  };
  
  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-gradient-primary text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white mr-2" 
            onClick={() => navigate('/profile')}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold">Notifikasi</h1>
        </div>
        
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 text-xs"
            onClick={handleMarkAllAsRead}
          >
            <CheckCheck size={16} className="mr-1" />
            Tandai semua
          </Button>
        )}
      </div>
      
      <div className="p-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
              <Bell size={48} strokeWidth={1.5} className="text-gray-400" />
            </div>
            <p className="text-center font-medium">Tidak ada notifikasi</p>
            <p className="text-center text-sm text-gray-500 mt-1">
              Notifikasi akan muncul di sini
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-xl ${
                  notification.read ? 'bg-white' : 'bg-blue-50 border-l-4 border-logiflex-blue'
                } shadow-sm transition-all`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 ${
                    notification.type === 'system' ? 'bg-purple-100 text-purple-500' :
                    notification.type === 'message' ? 'bg-blue-100 text-blue-500' :
                    'bg-green-100 text-green-500'
                  }`}>
                    <Bell size={18} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.content}</p>
                  </div>
                </div>
                
                {!notification.read && (
                  <div className="flex justify-end mt-2">
                    <span className="bg-logiflex-blue text-white text-xs px-2 py-0.5 rounded-full">Baru</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;
