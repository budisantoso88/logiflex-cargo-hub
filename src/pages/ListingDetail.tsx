import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, ArrowLeft, 
  Phone, MessageSquare, Package, Truck, 
  Info, User, DollarSign, FileText 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/layouts/MainLayout';
import { ListingType } from '@/components/listings/ListingCard';

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
    description: 'Membutuhkan truk untuk mengangkut furniture dari toko kami di Bandung ke alamat pelanggan di Jakarta Selatan. Total berat sekitar 500kg dengan volume 3m³.',
    specifications: {
      weight: '500kg',
      volume: '3m³',
      type: 'Furniture',
      distance: '150km',
    },
    ownerName: 'PT. Mebel Jaya',
    ownerJoined: 'Mei 2023',
    ownerRating: 4.8,
    contactPhone: '081234567890',
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
    description: 'Tersedia truk engkel untuk pengiriman barang dari Surabaya ke Malang dan sekitarnya. Kapasitas maksimal 8 ton dan tersedia sopir berpengalaman.',
    specifications: {
      capacity: '8 ton',
      vehicleType: 'Truk Engkel',
      availableSpace: '32m³',
      driver: 'Tersedia',
    },
    ownerName: 'Armada Prima',
    ownerJoined: 'Oktober 2022',
    ownerRating: 4.9,
    contactPhone: '085678901234',
  }
];

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const listing = mockListings.find(item => item.id === id);
  
  if (!listing) {
    return (
      <MainLayout>
        <div className="p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mb-4" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={24} />
          </Button>
          <div className="flex flex-col items-center justify-center py-12">
            <Package size={64} className="text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-700">Listing Tidak Ditemukan</h2>
            <p className="text-gray-500 mt-2">Listing yang Anda cari tidak tersedia</p>
            <Button 
              className="mt-6 bg-gradient-primary" 
              onClick={() => navigate('/')}
            >
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const handleContact = () => {
    toast({
      title: "Menghubungi Pemilik",
      description: `Menghubungi ${listing.ownerName} di ${listing.contactPhone}`,
    });
  };
  
  const handleChat = () => {
    navigate(`/chat/${id}`);
  };
  
  return (
    <MainLayout>
      <div className="bg-gradient-primary text-white p-4 pt-safe">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white mr-2" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold">Detail Listing</h1>
        </div>
      </div>
      
      <div className="p-4 animate-fade-in">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold">{listing.title}</h2>
            <Badge 
              variant={listing.type === 'cari-armada' ? 'default' : 'secondary'}
              className={`
                rounded-full px-3 py-1 text-sm font-medium
                ${listing.type === 'cari-armada' 
                  ? 'bg-gradient-primary text-white border-0' 
                  : 'bg-gradient-secondary text-white border-0'}
              `}
            >
              {listing.type === 'cari-armada' ? 'Cari Armada' : 'Sedia Armada'}
            </Badge>
          </div>
          
          <div className="flex items-center text-lg font-semibold text-logiflex-blue mb-4">
            Rp {listing.price.toLocaleString('id-ID')}
          </div>
        </div>
        
        <Card className="mb-4 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="text-logiflex-blue" size={20} />
              <div>
                <span className="font-medium">{listing.origin}</span>
                <span className="mx-2 text-gray-400">→</span>
                <span className="font-medium">{listing.destination}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="text-logiflex-blue" size={20} />
              <span>{listing.date}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="text-logiflex-blue" size={20} />
              <span>
                {listing.expiresIn <= 1 
                  ? 'Berakhir < 1 jam' 
                  : `Berakhir dalam ${listing.expiresIn} jam`}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-4 shadow-md">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <FileText size={18} />
              Deskripsi
            </h3>
            <p className="text-gray-700">{listing.description}</p>
          </CardContent>
        </Card>
        
        <Card className="mb-4 shadow-md">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              {listing.type === 'cari-armada' ? (
                <>
                  <Package size={18} />
                  Spesifikasi Muatan
                </>
              ) : (
                <>
                  <Truck size={18} />
                  Spesifikasi Kendaraan
                </>
              )}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(listing.specifications).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-3">
                  <span className="text-xs text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6 shadow-md">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User size={18} />
              Informasi Pemilik
            </h3>
            
            <div className="flex items-center mb-2">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                <User size={24} className="text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">{listing.ownerName}</p>
                <p className="text-sm text-gray-500">Bergabung sejak {listing.ownerJoined}</p>
              </div>
            </div>
            
            <div className="flex items-center text-amber-500 mt-1 mb-3">
              {'★'.repeat(Math.floor(listing.ownerRating))}
              {listing.ownerRating % 1 > 0 ? '⭐' : ''}
              {'☆'.repeat(5 - Math.ceil(listing.ownerRating))}
              <span className="ml-1 text-gray-700">{listing.ownerRating.toFixed(1)}</span>
            </div>
            
            <Separator className="my-3" />
            
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-logiflex-blue" />
                <span className="font-medium">{listing.contactPhone}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2" 
                  onClick={handleContact}
                >
                  <Phone size={18} /> Telepon
                </Button>
                
                <Button 
                  className="bg-gradient-primary border-0 flex items-center gap-2" 
                  onClick={handleChat}
                >
                  <MessageSquare size={18} /> Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe flex gap-3 shadow-lg">
          <Button 
            variant="outline"
            className="flex-1" 
            onClick={handleContact}
          >
            <Phone size={18} /> Telepon
          </Button>
          
          <Button 
            className="flex-1 bg-gradient-primary border-0" 
            onClick={handleChat}
          >
            <MessageSquare size={18} /> Chat
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListingDetail;
