
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Truck, TrendingUp, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import ListingList, { Listing } from '@/components/listings/ListingList';
import { ListingType } from '@/components/listings/ListingCard';
import AdvancedSearch, { FilterOptions } from '@/components/search/AdvancedSearch';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("semua");
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions>({
    search: '',
    priceRange: '',
    origin: '',
    destination: '',
    sortBy: '',
    listingType: 'semua',
  });
  
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
    {
      id: '5',
      type: 'cari-armada' as ListingType,
      title: 'Pengiriman Bahan Makanan Fresh',
      origin: 'Jakarta Barat',
      destination: 'Depok',
      date: '27 Apr 2025',
      price: 600000,
      expiresIn: 18,
    },
    {
      id: '6',
      type: 'sedia-armada' as ListingType,
      title: 'Truk Box Berpendingin Tersedia',
      origin: 'Bandung, Jawa Barat',
      destination: 'Cirebon',
      date: '28 Apr 2025',
      price: 1800000,
      expiresIn: 24,
    },
  ];

  // Initialize filtered listings with data filtered by tab
  React.useEffect(() => {
    const initialFiltered = activeTab === 'semua' 
      ? mockListings 
      : mockListings.filter(listing => listing.type === activeTab);
    setFilteredListings(initialFiltered);
  }, [activeTab]);
  
  const handleListingClick = (id: string) => {
    navigate(`/listing/${id}`);
  };
  
  const userTokens = 2; // Mock user token count
  
  const handleSearch = (filtered: Listing[], filters: FilterOptions) => {
    setFilteredListings(filtered);
    setAppliedFilters(filters);
    
    // If filter includes a listing type, also update the tab
    if (filters.listingType !== 'semua') {
      setActiveTab(filters.listingType);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Also update the filter for listing type
    const newFilters = {
      ...appliedFilters,
      listingType: value as ListingType | 'semua'
    };
    
    // Apply the filters
    const tabFiltered = value === 'semua' 
      ? mockListings 
      : mockListings.filter(listing => listing.type === value);
    
    // Apply other existing filters to the tab-filtered results
    let filtered = [...tabFiltered];
    if (appliedFilters.search) {
      const searchLower = appliedFilters.search.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchLower) ||
        listing.origin.toLowerCase().includes(searchLower) ||
        listing.destination.toLowerCase().includes(searchLower)
      );
    }
    
    if (appliedFilters.origin) {
      filtered = filtered.filter(listing => 
        listing.origin.toLowerCase().includes(appliedFilters.origin.toLowerCase())
      );
    }
    
    if (appliedFilters.destination) {
      filtered = filtered.filter(listing => 
        listing.destination.toLowerCase().includes(appliedFilters.destination.toLowerCase())
      );
    }
    
    if (appliedFilters.priceRange) {
      const [min, max] = appliedFilters.priceRange.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter(listing => 
          listing.price >= min && listing.price <= max
        );
      }
    }
    
    if (appliedFilters.sortBy) {
      filtered.sort((a, b) => {
        switch (appliedFilters.sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'date-asc':
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case 'date-desc':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          default:
            return 0;
        }
      });
    }
    
    setFilteredListings(filtered);
    setAppliedFilters(newFilters);
  };
  
  return (
    <MainLayout>
      {/* Modern Gradient Header */}
      <div className="bg-gradient-primary text-white p-6 pt-safe rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">LogiFlex</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bell size={20} className="animate-pulse-slow" onClick={() => navigate('/notifications')} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 ml-2">
              <span className="mr-1 text-sm">Token:</span>
              <span className="font-bold">{userTokens}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 mb-4">
          <h2 className="text-xl font-semibold">Selamat datang di LogiFlex</h2>
          <p className="text-sm opacity-90 mt-1">Platform logistik terpadu untuk kebutuhan pengiriman Anda</p>
        </div>
        
        <div className="flex space-x-3 mt-6 -mb-8 relative z-10">
          <Button 
            className="flex-1 bg-white text-logiflex-blue hover:bg-gray-100 shadow-lg rounded-xl py-6"
            onClick={() => navigate('/create', { state: { type: 'cari-armada' } })}
          >
            <Package size={22} strokeWidth={1.5} className="mr-2" />
            <span className="font-medium">Cari Armada</span>
          </Button>
          <Button 
            className="flex-1 bg-white text-logiflex-blue hover:bg-gray-100 shadow-lg rounded-xl py-6"
            onClick={() => navigate('/create', { state: { type: 'sedia-armada' } })}
          >
            <Truck size={22} strokeWidth={1.5} className="mr-2" />
            <span className="font-medium">Sedia Armada</span>
          </Button>
        </div>
      </div>
      
      {/* Trending Section */}
      <div className="px-4 py-6 mt-6">
        <div className="flex items-center mb-4">
          <TrendingUp size={20} className="text-logiflex-blue mr-2" />
          <h3 className="font-medium text-lg">Trending</h3>
        </div>
        
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2">
          <div className="flex-shrink-0 bg-logiflex-blue/10 rounded-lg p-3 min-w-[150px]">
            <p className="text-sm font-medium text-logiflex-blue">Jakarta → Bandung</p>
            <p className="text-xs text-gray-600">25+ listing aktif</p>
          </div>
          <div className="flex-shrink-0 bg-logiflex-green/10 rounded-lg p-3 min-w-[150px]">
            <p className="text-sm font-medium text-logiflex-green">Surabaya → Malang</p>
            <p className="text-xs text-gray-600">18+ listing aktif</p>
          </div>
          <div className="flex-shrink-0 bg-logiflex-yellow/10 rounded-lg p-3 min-w-[150px]">
            <p className="text-sm font-medium text-logiflex-yellow">Medan → Pekanbaru</p>
            <p className="text-xs text-gray-600">12+ listing aktif</p>
          </div>
        </div>
      </div>
      
      {/* Listings with Advanced Search */}
      <div className="px-4 pb-6">
        {/* Advanced Search Component */}
        <AdvancedSearch 
          listings={mockListings} 
          onSearch={handleSearch}
          className="mb-4"
        />
        
        <Tabs defaultValue="semua" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="semua" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow">Semua</TabsTrigger>
            <TabsTrigger value="cari-armada" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow">Cari Armada</TabsTrigger>
            <TabsTrigger value="sedia-armada" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow">Sedia Armada</TabsTrigger>
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
