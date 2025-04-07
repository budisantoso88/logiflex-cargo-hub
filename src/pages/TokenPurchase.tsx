
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import TokenPackage from '@/components/token/TokenPackage';

const TokenPurchase = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  const tokenPackages = [
    {
      id: 'starter',
      name: 'Paket Starter',
      tokens: 5,
      price: 45000,
      originalPrice: 50000,
      discount: 10,
      validity: 30,
      benefits: [
        '5 token untuk listing',
        'Masa berlaku 30 hari',
        'Ideal untuk pengguna baru',
      ],
      recommended: false,
    },
    {
      id: 'regular',
      name: 'Paket Regular',
      tokens: 15,
      price: 120000,
      originalPrice: 150000,
      discount: 20,
      validity: 60,
      benefits: [
        '15 token untuk listing',
        '2 token gratis tambahan',
        'Perpanjangan otomatis 2 listing',
        'Masa berlaku 60 hari',
      ],
      recommended: true,
    },
    {
      id: 'business',
      name: 'Paket Business',
      tokens: 50,
      price: 350000,
      originalPrice: 500000,
      discount: 30,
      validity: 90,
      benefits: [
        '50 token untuk listing',
        '10 token gratis tambahan',
        'Notifikasi prioritas',
        'Masa berlaku 90 hari',
      ],
      recommended: false,
    },
    {
      id: 'enterprise',
      name: 'Paket Enterprise',
      tokens: 200,
      price: 1200000,
      originalPrice: 2000000,
      discount: 40,
      validity: 180,
      benefits: [
        '200 token untuk listing',
        '50 token gratis tambahan',
        'Akses fitur prioritas',
        'Dukungan pelanggan premium',
        'Masa berlaku 180 hari',
      ],
      recommended: false,
    },
  ];
  
  const handlePackageSelect = (id: string) => {
    setSelectedPackage(id);
  };
  
  const handleProceedToPayment = () => {
    if (!selectedPackage) return;
    
    // In a real app, this would navigate to a payment page
    console.log(`Proceeding to payment for package: ${selectedPackage}`);
    // navigate('/payment', { state: { packageId: selectedPackage } });
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
        <h1 className="text-xl font-bold">Beli Token</h1>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-1">Pilih Paket Token</h2>
          <p className="text-sm text-gray-500">
            1 token = 1 listing aktif selama 24 jam
          </p>
        </div>
        
        <div className="grid gap-6 mb-6">
          {tokenPackages.map((pkg) => (
            <TokenPackage
              key={pkg.id}
              name={pkg.name}
              tokens={pkg.tokens}
              price={pkg.price}
              originalPrice={pkg.originalPrice}
              discount={pkg.discount}
              validity={pkg.validity}
              benefits={pkg.benefits}
              recommended={pkg.recommended}
              onSelect={() => handlePackageSelect(pkg.id)}
            />
          ))}
        </div>
        
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-sm">Paket dipilih:</p>
            <p className="font-bold">
              {selectedPackage 
                ? tokenPackages.find(p => p.id === selectedPackage)?.name || '-' 
                : 'Belum dipilih'}
            </p>
          </div>
          <Button 
            disabled={!selectedPackage}
            onClick={handleProceedToPayment}
            className="flex items-center"
          >
            <CreditCard size={18} className="mr-2" />
            Lanjut ke Pembayaran
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default TokenPurchase;
