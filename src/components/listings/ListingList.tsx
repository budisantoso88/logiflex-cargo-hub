
import React from 'react';
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ListingCard, { ListingType } from './ListingCard';

export interface Listing {
  id: string;
  type: ListingType;
  title: string;
  origin: string;
  destination: string;
  date: string;
  price: number;
  expiresIn: number; // hours remaining
}

export interface ListingListProps {
  listings: Listing[];
  onListingClick?: (id: string) => void;
}

const ListingList = ({ listings, onListingClick }: ListingListProps) => {
  const navigate = useNavigate();

  const handleListingClick = (id: string) => {
    if (onListingClick) {
      onListingClick(id);
    } else {
      // If no click handler is provided, navigate to the listing detail page
      navigate(`/listing/${id}`);
    }
  };

  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <Package size={48} strokeWidth={1.5} className="mb-2" />
        <p className="text-center">Belum ada listing yang tersedia</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          {...listing}
          onClick={() => handleListingClick(listing.id)}
        />
      ))}
    </div>
  );
};

export default ListingList;
