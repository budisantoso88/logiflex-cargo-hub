
import React from 'react';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Messages = () => {
  const navigate = useNavigate();
  
  // Mock messages data
  const messages = [
    {
      id: 1,
      sender: 'Joko Widodo',
      content: 'Halo, apakah armada masih tersedia untuk tanggal 15 April?',
      timestamp: '2 jam lalu',
      unread: true,
    },
    {
      id: 2,
      sender: 'Diana Putri',
      content: 'Terima kasih, konfirmasi pengirimannya sudah saya terima.',
      timestamp: '5 jam lalu',
      unread: false,
    },
    {
      id: 3,
      sender: 'Hendro Logistics',
      content: 'Saya tertarik dengan listing Anda. Bisa nego harga?',
      timestamp: '1 hari lalu',
      unread: false,
    },
  ];

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
        <h1 className="text-xl font-bold">Pesan</h1>
      </div>
      
      <div className="p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <MessageSquare size={48} strokeWidth={1.5} className="mb-2" />
            <p className="text-center">Belum ada pesan</p>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 rounded-lg border ${message.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
                onClick={() => console.log(`Open chat with ${message.sender}`)}
              >
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
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Messages;
