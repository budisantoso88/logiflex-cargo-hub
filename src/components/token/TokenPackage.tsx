
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TokenPackageProps {
  name: string;
  tokens: number;
  price: number;
  originalPrice: number;
  discount: number;
  validity: number;
  benefits: string[];
  recommended?: boolean;
  onSelect: () => void;
}

const TokenPackage = ({
  name,
  tokens,
  price,
  originalPrice,
  discount,
  validity,
  benefits,
  recommended = false,
  onSelect
}: TokenPackageProps) => {
  return (
    <Card className={`relative border-2 ${recommended ? 'border-logiflex-green' : 'border-gray-200'} animate-slide-up`}>
      {recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-logiflex-green text-white px-3 py-1 rounded-full text-xs font-medium">
          Rekomendasi
        </div>
      )}
      <div className={`p-4 ${recommended ? 'bg-logiflex-green/10' : ''}`}>
        <h3 className="font-bold text-lg">{name}</h3>
        <div className="mt-2">
          <span className="text-2xl font-bold">Rp {price.toLocaleString('id-ID')}</span>
          <span className="text-sm text-gray-500 line-through ml-2">Rp {originalPrice.toLocaleString('id-ID')}</span>
        </div>
        <span className="inline-block bg-logiflex-yellow text-logiflex-darkgrey text-xs font-semibold rounded px-2 py-1 mt-1">
          Hemat {discount}%
        </span>
      </div>
      <CardContent className="pt-4">
        <div className="text-center mb-3">
          <span className="text-xl font-bold">{tokens} Token</span>
          {validity > 0 && (
            <p className="text-sm text-gray-500">Berlaku {validity} hari</p>
          )}
        </div>
        
        <div className="space-y-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-logiflex-green mr-2 flex-shrink-0" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSelect} 
          className="w-full"
          variant={recommended ? 'default' : 'outline'}
        >
          Pilih Paket
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TokenPackage;
