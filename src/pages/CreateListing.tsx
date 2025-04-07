
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "@/components/ui/use-toast";
import MainLayout from '@/layouts/MainLayout';
import { ListingType } from '@/components/listings/ListingCard';

const CreateListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialType = (location.state?.type as ListingType) || 'cari-armada';
  
  const [listingType, setListingType] = useState<ListingType>(initialType);
  const [title, setTitle] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !origin || !destination || !date || !price) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon isi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Mock API submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Listing berhasil dibuat",
        description: "Listing Anda akan aktif selama 24 jam ke depan",
      });
      navigate('/');
    }, 1000);
  };
  
  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-logiflex-blue text-white p-4 flex items-center pt-safe">
        <button 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Buat Listing Baru</h1>
      </div>
      
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="listingType">Jenis Listing</Label>
            <Select
              value={listingType}
              onValueChange={(value) => setListingType(value as ListingType)}
            >
              <SelectTrigger id="listingType">
                <SelectValue placeholder="Pilih jenis listing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cari-armada">
                  <div className="flex items-center">
                    <Package size={16} className="mr-2" />
                    <span>Cari Armada</span>
                  </div>
                </SelectItem>
                <SelectItem value="sedia-armada">
                  <div className="flex items-center">
                    <Truck size={16} className="mr-2" />
                    <span>Sedia Armada</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">
              {listingType === 'cari-armada' 
                ? 'Untuk mereka yang memiliki barang dan mencari transportasi' 
                : 'Untuk mereka yang memiliki transportasi dan mencari muatan'}
            </p>
          </div>
          
          <div>
            <Label htmlFor="title">Judul Listing</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Pengiriman Furniture ke Jakarta"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="origin">Lokasi Asal</Label>
              <Input
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Kota/Kabupaten asal"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="destination">Lokasi Tujuan</Label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Kota/Kabupaten tujuan"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Tanggal</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="price">Harga (Rp)</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Masukkan harga dalam rupiah"
                min="0"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">
              {listingType === 'cari-armada' 
                ? 'Deskripsi Barang' 
                : 'Deskripsi Kendaraan'}
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={listingType === 'cari-armada' 
                ? 'Jenis barang, ukuran, berat, dll' 
                : 'Jenis kendaraan, kapasitas, dll'
              }
              rows={4}
            />
          </div>
          
          <div className="bg-logiflex-yellow/20 p-3 rounded-md">
            <p className="text-sm">
              Pembuatan listing akan menggunakan <strong>1 token</strong> dan listing akan aktif selama <strong>24 jam</strong>.
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Memproses...' : 'Buat Listing'}
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateListing;
