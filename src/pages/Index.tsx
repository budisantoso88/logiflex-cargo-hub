
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import ListingList from '@/components/listings/ListingList';
import { ListingType } from '@/components/listings/ListingCard';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("semua");
  
  // Mock data - in a real app this would come from an API
  const mockListings = [
    {
      id: '1',
      type: 'cari-armada' as ListingType,
      title: 'Pengiriman Furniture ke Jakarta',
      origin: 'Bandung, Jawa Barat',
      destination: 'Jakarta Selatan',
      date: '25 Apr 2025',
      price: 1500000,
      expiresIn: 12,
    },
    {
      id: '2',
      type: 'sedia-armada' as ListingType,
      title: 'Truk Engkel Siap Muat 8 Ton',
      origin: 'Surabaya, Jawa Timur',
      destination: 'Malang',
      date: '24 Apr 2025',
      price: 1200000,
      expiresIn: 5,
    },
    {
      id: '3',
      type: 'cari-armada' as ListingType,
      title: 'Kiriman Elektronik 2 Pallet',
      origin: 'Tangerang, Banten',
      destination: 'Bekasi',
      date: '26 Apr 2025',
      price: 800000,
      expiresIn: 22,
    },
    {
      id: '4',
      type: 'sedia-armada' as ListingType,
      title: 'Pickup Box Siap Antar Barang',
      origin: 'Jakarta Utara',
      destination: 'Bogor',
      date: '24 Apr 2025',
      price: 500000,
      expiresIn: 3,
    },
  ];
  
  const filteredListings = activeTab === 'semua' 
    ? mockListings 
    : mockListings.filter(listing => listing.type === activeTab);
  
  const handleListingClick = (id: string) => {
    console.log(`Listing clicked: ${id}`);
    // In a real app, this would navigate to a detail page
    // navigate(`/listing/${id}`);
  };
  
  const userTokens = 2; // Mock user token count
  
  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-logiflex-blue text-white p-4 pt-safe">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">LogiFlex</h1>
          <div className="flex items-center bg-white/20 rounded-full px-3 py-1">
            <span className="mr-1 text-sm">Token:</span>
            <span className="font-bold">{userTokens}</span>
          </div>
        </div>
        
        <div className="mt-6 mb-2">
          <h2 className="text-lg">Selamat datang di LogiFlex</h2>
          <p className="text-sm opacity-90">Platform logistik terpadu untuk kebutuhan pengiriman Anda</p>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <Button 
            className="flex-1 bg-white text-logiflex-blue hover:bg-gray-100"
            onClick={() => navigate('/create', { state: { type: 'cari-armada' } })}
          >
            <Package size={18} className="mr-2" />
            Cari Armada
          </Button>
          <Button 
            className="flex-1 bg-white text-logiflex-blue hover:bg-gray-100"
            onClick={() => navigate('/create', { state: { type: 'sedia-armada' } })}
          >
            <Truck size={18} className="mr-2" />
            Sedia Armada
          </Button>
        </div>
      </div>
      
      {/* Listings */}
      <div className="p-4">
        <Tabs defaultValue="semua" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="semua">Semua</TabsTrigger>
            <TabsTrigger value="cari-armada">Cari Armada</TabsTrigger>
            <TabsTrigger value="sedia-armada">Sedia Armada</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            <ListingList 
              listings={filteredListings}
              onListingClick={handleListingClick}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Index;
