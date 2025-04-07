
import React from 'react';
import { Calendar, MapPin, Truck, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type ListingType = 'cari-armada' | 'sedia-armada';

interface ListingCardProps {
  id: string;
  type: ListingType;
  title: string;
  origin: string;
  destination: string;
  date: string;
  price: number;
  expiresIn: number; // hours remaining
  onClick?: () => void;
}

const ListingCard = ({
  id,
  type,
  title,
  origin,
  destination,
  date,
  price,
  expiresIn,
  onClick
}: ListingCardProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 mb-3 animate-fade-in"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
        <Badge 
          variant={type === 'cari-armada' ? 'default' : 'secondary'}
          className={type === 'cari-armada' ? 'bg-logiflex-blue' : 'bg-logiflex-green'}
        >
          {type === 'cari-armada' ? 'Cari Armada' : 'Sedia Armada'}
        </Badge>
      </div>
      
      <div className="flex items-center text-sm mb-2 text-gray-600">
        <MapPin size={16} className="mr-1 flex-shrink-0" />
        <div className="flex items-center">
          <span className="truncate max-w-[100px]">{origin}</span>
          <span className="mx-1">→</span>
          <span className="truncate max-w-[100px]">{destination}</span>
        </div>
      </div>
      
      <div className="flex items-center text-sm mb-3 text-gray-600">
        <Calendar size={16} className="mr-1 flex-shrink-0" />
        <span>{date}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-logiflex-blue font-bold">
          Rp {price.toLocaleString('id-ID')}
        </div>
        <div className="text-xs text-gray-500">
          {expiresIn <= 1 ? 'Berakhir < 1 jam' : `Berakhir dalam ${expiresIn} jam`}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
