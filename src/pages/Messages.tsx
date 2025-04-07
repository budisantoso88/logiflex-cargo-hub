
import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Messages = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock messages data
  const allMessages = [
    {
      id: 1,
      sender: 'Joko Widodo',
      content: 'Halo, apakah armada masih tersedia untuk tanggal 15 April?',
      timestamp: '2 jam lalu',
      unread: true,
      avatar: 'J',
    },
    {
      id: 2,
      sender: 'Diana Putri',
      content: 'Terima kasih, konfirmasi pengirimannya sudah saya terima.',
      timestamp: '5 jam lalu',
      unread: false,
      avatar: 'D',
    },
    {
      id: 3,
      sender: 'Hendro Logistics',
      content: 'Saya tertarik dengan listing Anda. Bisa nego harga?',
      timestamp: '1 hari lalu',
      unread: false,
      avatar: 'H',
    },
  ];
  
  const unreadMessages = allMessages.filter(msg => msg.unread);

  const handleMessageClick = (messageId: number) => {
    navigate(`/chat/${messageId}`);
  };

  return (
    <MainLayout>
      {/* Modern Gradient Header */}
      <div className="bg-gradient-primary text-white p-4 pt-safe rounded-b-xl">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white mr-2 hover:bg-white/20" 
            onClick={() => navigate('/profile')}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold">Pesan</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
          >
            <Bell size={20} />
          </Button>
        </div>
      </div>
      
      {/* Search Bar and Tabs */}
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10 bg-gray-100 border-0 rounded-xl"
            placeholder="Cari pesan..."
          />
        </div>

        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="w-full grid grid-cols-2 mb-2">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')}>Semua</TabsTrigger>
            <TabsTrigger value="unread" onClick={() => setActiveTab('unread')}>Belum Dibaca</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {allMessages.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-3">
                {allMessages.map((message) => (
                  <MessageCard 
                    key={message.id} 
                    message={message} 
                    onClick={() => handleMessageClick(message.id)} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread">
            {unreadMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                <p className="text-center font-medium">Tidak ada pesan yang belum dibaca</p>
              </div>
            ) : (
              <div className="space-y-3">
                {unreadMessages.map((message) => (
                  <MessageCard 
                    key={message.id} 
                    message={message} 
                    onClick={() => handleMessageClick(message.id)} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Empty state component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-8 text-gray-500">
    <div className="bg-logiflex-blue/10 p-4 rounded-full mb-3">
      <MessageSquare size={48} strokeWidth={1.5} className="text-logiflex-blue" />
    </div>
    <p className="text-center font-medium">Belum ada pesan</p>
    <p className="text-center text-sm text-gray-500 mt-1">
      Kontak akan muncul di sini ketika Anda mulai berkomunikasi.
    </p>
  </div>
);

// Message card component
interface MessageProps {
  message: {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
    unread: boolean;
    avatar: string;
  };
  onClick: () => void;
}

const MessageCard = ({ message, onClick }: MessageProps) => {
  return (
    <div 
      className={`p-4 rounded-xl shadow-sm transition-all ${
        message.unread 
          ? 'bg-logiflex-blue/5 border-l-4 border-logiflex-blue' 
          : 'bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
          message.unread ? 'bg-logiflex-blue' : 'bg-gray-400'
        }`}>
          {message.avatar}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium">{message.sender}</h3>
            <span className="text-xs text-gray-500">{message.timestamp}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1 line-clamp-1">{message.content}</p>
          {message.unread && (
            <div className="flex justify-end mt-1">
              <span className="bg-logiflex-blue text-white text-xs px-2 py-0.5 rounded-full">Baru</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
