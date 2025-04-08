
import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListingType } from '@/components/listings/ListingCard';
import { Listing } from '@/components/listings/ListingList';

export type FilterOptions = {
  search: string;
  priceRange: string;
  origin: string;
  destination: string;
  sortBy: 'price-asc' | 'price-desc' | 'date-asc' | 'date-desc' | '';
  listingType: ListingType | 'semua';
};

interface AdvancedSearchProps {
  onSearch: (filteredListings: Listing[], filters: FilterOptions) => void;
  listings: Listing[];
  className?: string;
}

export const AdvancedSearch = ({ onSearch, listings, className }: AdvancedSearchProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    priceRange: '',
    origin: '',
    destination: '',
    sortBy: '',
    listingType: 'semua',
  });

  // Collect unique origins and destinations for dropdown options
  const origins = Array.from(new Set(listings.map(l => l.origin)));
  const destinations = Array.from(new Set(listings.map(l => l.destination)));
  
  // Extract location from string (e.g. "Jakarta, Jawa Barat" -> "Jakarta")
  const extractMainLocation = (location: string) => {
    return location.split(',')[0].trim();
  };

  const applyFilters = () => {
    let filtered = [...listings];
    
    // Apply text search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchLower) ||
        listing.origin.toLowerCase().includes(searchLower) ||
        listing.destination.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply listing type filter
    if (filters.listingType !== 'semua') {
      filtered = filtered.filter(listing => listing.type === filters.listingType);
    }
    
    // Apply origin filter
    if (filters.origin) {
      filtered = filtered.filter(listing => 
        listing.origin.toLowerCase().includes(filters.origin.toLowerCase())
      );
    }
    
    // Apply destination filter
    if (filters.destination) {
      filtered = filtered.filter(listing => 
        listing.destination.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filtered = filtered.filter(listing => 
          listing.price >= min && listing.price <= max
        );
      }
    }
    
    // Apply sorting
    if (filters.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
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
    
    onSearch(filtered, filters);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      priceRange: '',
      origin: '',
      destination: '',
      sortBy: '',
      listingType: 'semua',
    });
    onSearch(listings, {
      search: '',
      priceRange: '',
      origin: '',
      destination: '',
      sortBy: '',
      listingType: 'semua',
    });
  };
  
  const hasActiveFilters = () => {
    return (
      filters.search !== '' ||
      filters.priceRange !== '' ||
      filters.origin !== '' ||
      filters.destination !== '' ||
      filters.sortBy !== '' ||
      filters.listingType !== 'semua'
    );
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Search bar with toggle button */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10 pr-4"
            placeholder="Cari rute, armada, atau pengiriman..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-gray-100" : ""}
        >
          <SlidersHorizontal size={18} className={showFilters ? "text-logiflex-blue" : ""} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => { 
              handleFilterChange('sortBy', 'price-asc');
              applyFilters();
            }}>
              Harga Terendah
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { 
              handleFilterChange('sortBy', 'price-desc'); 
              applyFilters();
            }}>
              Harga Tertinggi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { 
              handleFilterChange('sortBy', 'date-desc'); 
              applyFilters();
            }}>
              Tanggal Terbaru
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { 
              handleFilterChange('sortBy', 'date-asc'); 
              applyFilters();
            }}>
              Tanggal Terlama
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Advanced filters panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Filter Lanjutan</h3>
            {hasActiveFilters() && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">
                <X size={14} className="mr-1" /> Reset
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Tipe Listing</label>
              <Select 
                value={filters.listingType} 
                onValueChange={(value) => handleFilterChange('listingType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua</SelectItem>
                  <SelectItem value="cari-armada">Cari Armada</SelectItem>
                  <SelectItem value="sedia-armada">Sedia Armada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Rentang Harga</label>
              <Select 
                value={filters.priceRange} 
                onValueChange={(value) => handleFilterChange('priceRange', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Rentang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-prices">Semua Harga</SelectItem>
                  <SelectItem value="0-500000">Rp 0 - Rp 500.000</SelectItem>
                  <SelectItem value="500000-1000000">Rp 500.000 - Rp 1.000.000</SelectItem>
                  <SelectItem value="1000000-2000000">Rp 1.000.000 - Rp 2.000.000</SelectItem>
                  <SelectItem value="2000000-99999999">{'> Rp 2.000.000'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Asal</label>
              <Select 
                value={filters.origin} 
                onValueChange={(value) => handleFilterChange('origin', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kota Asal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-origins">Semua Asal</SelectItem>
                  {origins.map(origin => (
                    <SelectItem key={origin} value={extractMainLocation(origin)}>
                      {extractMainLocation(origin)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-gray-500">Tujuan</label>
              <Select 
                value={filters.destination} 
                onValueChange={(value) => handleFilterChange('destination', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kota Tujuan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-destinations">Semua Tujuan</SelectItem>
                  {destinations.map(destination => (
                    <SelectItem key={destination} value={extractMainLocation(destination)}>
                      {extractMainLocation(destination)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button onClick={() => applyFilters()}>
              Terapkan Filter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
