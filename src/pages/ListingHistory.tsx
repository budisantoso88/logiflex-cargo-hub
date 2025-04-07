
import React from 'react';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import ListingCard from '@/components/listings/ListingCard';

const ListingHistory = () => {
  const navigate = useNavigate();
  
  // Mock active listings data
  const activeListings = [
    {
      id: "1",
      type: "cari-armada" as const,
      title: "Pengiriman Barang Elektronik",
      origin: "Jakarta",
      destination: "Bandung",
      date: "15 April 2025",
      price: 1500000,
      expiresIn: 15
    },
    {
      id: "2",
      type: "sedia-armada" as const,
      title: "Truk Box Tersedia",
      origin: "Surabaya",
      destination: "Malang",
      date: "12 April 2025",
      price: 1200000,
      expiresIn: 8
    }
  ];
  
  // Mock past listings data
  const pastListings = [
    {
      id: "3",
      type: "cari-armada" as const,
      title: "Pengiriman Furniture",
      origin: "Jakarta",
      destination: "Semarang",
      date: "5 April 2025",
      price: 2000000,
      expiresIn: 0
    },
    {
      id: "4",
      type: "sedia-armada" as const,
      title: "Pick-up Box Tersedia",
      origin: "Yogyakarta",
      destination: "Solo",
      date: "2 April 2025",
      price: 800000,
      expiresIn: 0
    },
    {
      id: "5",
      type: "cari-armada" as const,
      title: "Pengiriman Makanan",
      origin: "Bandung",
      destination: "Cirebon",
      date: "25 Maret 2025",
      price: 1000000,
      expiresIn: 0
    }
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
        <h1 className="text-xl font-bold">Riwayat Listing</h1>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-full">
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="past">Selesai</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeListings.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                <Package size={48} strokeWidth={1.5} className="mb-2" />
                <p className="text-center">Belum ada listing aktif</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    {...listing}
                    onClick={() => console.log(`Active listing clicked: ${listing.id}`)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastListings.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                <Package size={48} strokeWidth={1.5} className="mb-2" />
                <p className="text-center">Belum ada listing selesai</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pastListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    {...listing}
                    onClick={() => console.log(`Past listing clicked: ${listing.id}`)}
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

export default ListingHistory;
