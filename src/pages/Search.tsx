
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ListingList from '@/components/listings/ListingList';
import { Separator } from '@/components/ui/separator';

// Mock data for demonstration purposes
const mockListings = [
  {
    id: '1',
    type: 'cari-armada' as const,
    title: 'Pengiriman Barang Elektronik',
    origin: 'Jakarta',
    destination: 'Bandung',
    date: '10 April 2025',
    price: 1500000,
    expiresIn: 18,
  },
  {
    id: '2',
    type: 'sedia-armada' as const,
    title: 'Truk Box Tersedia',
    origin: 'Surabaya',
    destination: 'Malang',
    date: '11 April 2025',
    price: 1200000,
    expiresIn: 22,
  },
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [listings, setListings] = useState(mockListings);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setListings(mockListings);
      return;
    }
    
    const filtered = mockListings.filter(
      listing => 
        listing.title.toLowerCase().includes(query) ||
        listing.origin.toLowerCase().includes(query) ||
        listing.destination.toLowerCase().includes(query)
    );
    
    setListings(filtered);
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Pencarian</h1>
        
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10"
            placeholder="Cari rute, armada, atau jenis pengiriman..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <Separator className="my-4" />
        
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Hasil Pencarian</h2>
          <ListingList 
            listings={listings} 
            onListingClick={(id) => console.log(`Listing ${id} clicked`)} 
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
