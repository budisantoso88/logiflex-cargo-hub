
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import TokenPackage from '@/components/token/TokenPackage';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const TokenPurchase = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
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

  // Mock token usage history data
  const tokenHistory = [
    { id: 1, date: '2025-04-08', type: 'Pembelian', package: 'Paket Regular', tokens: '+15', amount: 'Rp 120.000' },
    { id: 2, date: '2025-04-07', type: 'Penggunaan', description: 'Listing Muatan Jakarta-Surabaya', tokens: '-1', amount: '-' },
    { id: 3, date: '2025-04-05', type: 'Penggunaan', description: 'Listing Muatan Jakarta-Bandung', tokens: '-1', amount: '-' },
    { id: 4, date: '2025-04-03', type: 'Pembelian', package: 'Paket Starter', tokens: '+5', amount: 'Rp 45.000' },
    { id: 5, date: '2025-04-01', type: 'Penggunaan', description: 'Listing Muatan Surabaya-Malang', tokens: '-1', amount: '-' },
    { id: 6, date: '2025-03-30', type: 'Penggunaan', description: 'Listing Muatan Bandung-Jakarta', tokens: '-1', amount: '-' },
    { id: 7, date: '2025-03-28', type: 'Penggunaan', description: 'Listing Muatan Jakarta-Semarang', tokens: '-1', amount: '-' },
    { id: 8, date: '2025-03-25', type: 'Pembelian', package: 'Paket Starter', tokens: '+5', amount: 'Rp 45.000' },
  ];
  
  // Items per page for pagination
  const itemsPerPage = 5;
  
  // Calculate total pages
  const totalPages = Math.ceil(tokenHistory.length / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tokenHistory.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePackageSelect = (id: string) => {
    setSelectedPackage(id);
  };
  
  const handleProceedToPayment = () => {
    if (!selectedPackage) return;
    
    // In a real app, this would navigate to a payment page
    console.log(`Proceeding to payment for package: ${selectedPackage}`);
    // navigate('/payment', { state: { packageId: selectedPackage } });
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        {/* Token balance */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Saldo Token</p>
                <p className="text-2xl font-bold">12 Token</p>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Aktif
              </div>
            </div>
          </CardContent>
        </Card>

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
        
        {/* Token History Section */}
        <Card className="mb-20">
          <CardHeader className="py-3 px-4 cursor-pointer" onClick={() => setShowHistory(!showHistory)}>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-lg">
                <Clock size={18} className="mr-2" />
                Riwayat Penggunaan Token
              </CardTitle>
              {showHistory ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </CardHeader>
          
          {showHistory && (
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Aktivitas</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Biaya</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                        <TableCell>
                          <div className="font-medium">{item.type}</div>
                          <div className="text-sm text-gray-500">
                            {item.package || item.description}
                          </div>
                        </TableCell>
                        <TableCell className={`font-medium ${item.tokens.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {item.tokens}
                        </TableCell>
                        <TableCell>{item.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="py-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={currentPage === page}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          )}
        </Card>
        
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
