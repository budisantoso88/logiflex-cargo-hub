
import React from 'react';
import { Calendar, MapPin, Truck, Package, Clock } from 'lucide-react';
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
      className="bg-white rounded-2xl shadow-card p-4 mb-4 animate-fade-in hover:shadow-lg transition-all"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <Badge 
          variant={type === 'cari-armada' ? 'default' : 'secondary'}
          className={`
            rounded-full px-3 py-1 text-xs font-medium
            ${type === 'cari-armada' 
              ? 'bg-gradient-primary text-white border-0' 
              : 'bg-gradient-secondary text-white border-0'}
          `}
        >
          {type === 'cari-armada' ? 'Cari Armada' : 'Sedia Armada'}
        </Badge>
      </div>
      
      <div className="flex items-center text-sm mb-2 text-gray-700">
        <MapPin size={16} className="mr-1.5 flex-shrink-0 text-logiflex-blue" />
        <div className="flex items-center">
          <span className="truncate max-w-[100px] font-medium">{origin}</span>
          <span className="mx-2 text-gray-400">→</span>
          <span className="truncate max-w-[100px] font-medium">{destination}</span>
        </div>
      </div>
      
      <div className="flex items-center text-sm mb-3 text-gray-700">
        <Calendar size={16} className="mr-1.5 flex-shrink-0 text-logiflex-blue" />
        <span>{date}</span>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
        <div className="text-logiflex-blue font-bold text-lg">
          Rp {price.toLocaleString('id-ID')}
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Clock size={14} className="mr-1" />
          {expiresIn <= 1 ? 'Berakhir < 1 jam' : `Berakhir dalam ${expiresIn} jam`}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
