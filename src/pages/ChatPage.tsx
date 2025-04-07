
import React, { useState } from 'react';
import { ArrowLeft, Send, Image, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MainLayout from '@/layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "sonner";

interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender: 'user' | 'other';
}

const ChatPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [newMessage, setNewMessage] = useState('');
  
  // Mock contact data
  const contact = {
    id: id,
    name: id === '1' ? 'Joko Widodo' : id === '2' ? 'Diana Putri' : 'Hendro Logistics',
    avatar: id === '1' ? 'J' : id === '2' ? 'D' : 'H',
    status: 'online'
  };
  
  // Mock messages data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Halo, apakah armada masih tersedia untuk tanggal 15 April?',
      timestamp: '10:30',
      sender: 'other',
    },
    {
      id: 2,
      content: 'Ya, masih tersedia. Untuk berapa lama Anda membutuhkannya?',
      timestamp: '10:32',
      sender: 'user',
    },
    {
      id: 3,
      content: 'Saya butuh untuk 3 hari, dari 15-18 April. Apakah harganya masih sama seperti yang tertera di listing?',
      timestamp: '10:35',
      sender: 'other',
    },
  ]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add new message
    const newMsg: Message = {
      id: Date.now(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user',
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Mock response after 1 second
    setTimeout(() => {
      const responseMsg: Message = {
        id: Date.now() + 1,
        content: 'Terima kasih atas pesanannya. Saya akan segera memeriksa ketersediaan dan menghubungi Anda kembali.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'other',
      };
      
      setMessages(prev => [...prev, responseMsg]);
      toast.success("Pesan baru diterima");
    }, 1000);
  };
  
  return (
    <MainLayout hideNavigation>
      {/* Header */}
      <div className="bg-gradient-primary text-white p-4 flex items-center fixed top-0 left-0 right-0 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white mr-2" 
          onClick={() => navigate('/messages')}
        >
          <ArrowLeft size={24} />
        </Button>
        
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
          contact.status === 'online' ? 'bg-logiflex-blue' : 'bg-gray-400'
        }`}>
          {contact.avatar}
        </div>
        
        <div>
          <h1 className="font-semibold">{contact.name}</h1>
          <div className="flex items-center">
            {contact.status === 'online' ? (
              <>
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                <span className="text-xs">Online</span>
              </>
            ) : (
              <span className="text-xs">Last seen 2h ago</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <div className="pt-20 pb-20 px-4 bg-gray-50">
        <div className="flex flex-col space-y-3">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === 'user' 
                    ? 'bg-logiflex-blue text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className={`text-xs mt-1 block text-right ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Input area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Button 
            type="button"
            variant="ghost" 
            size="icon" 
            className="text-gray-500"
          >
            <Paperclip size={20} />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="pr-10 rounded-full bg-gray-100 border-0"
            />
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <Image size={20} />
            </Button>
          </div>
          
          <Button 
            type={newMessage.trim() ? "submit" : "button"}
            size="icon" 
            className={`rounded-full ${newMessage.trim() ? 'bg-logiflex-blue hover:bg-logiflex-blue/80' : 'bg-gray-200 text-gray-500'}`}
            disabled={!newMessage.trim()}
          >
            {newMessage.trim() ? <Send size={18} /> : <Mic size={18} />}
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default ChatPage;
