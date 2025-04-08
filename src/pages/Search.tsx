
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import ListingList, { Listing } from '@/components/listings/ListingList';
import { Separator } from '@/components/ui/separator';
import AdvancedSearch, { FilterOptions } from '@/components/search/AdvancedSearch';

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
  const navigate = useNavigate();
  const [listings, setListings] = useState(mockListings);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    priceRange: '',
    origin: '',
    destination: '',
    sortBy: '',
    listingType: 'semua',
  });

  const handleSearch = (filtered: Listing[], newFilters: FilterOptions) => {
    setListings(filtered);
    setFilters(newFilters);
  };

  const handleListingClick = (id: string) => {
    navigate(`/listing/${id}`);
  };

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Pencarian</h1>
        
        <AdvancedSearch 
          listings={mockListings}
          onSearch={handleSearch}
          className="mb-4"
        />
        
        <Separator className="my-4" />
        
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Hasil Pencarian</h2>
          <ListingList 
            listings={listings} 
            onListingClick={handleListingClick} 
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
