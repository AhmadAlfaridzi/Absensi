'use client'
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Barcode, RotateCw } from 'lucide-react';


interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
videoRef: React.RefObject<HTMLVideoElement>;
}


export default function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Mock barcode scan (implementasi nyata membutuhkan library seperti QuaggaJS)
  const handleMockScan = () => {
    const mockBarcode = `EMP-${Date.now()}`;
    onScan(mockBarcode);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full bg-black rounded-lg aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
        />
        <div className="absolute inset-0 border-4 border-green-500 animate-pulse" />
      </div>
      <Button onClick={handleMockScan} className="gap-2">
        <Barcode className="h-4 w-4" />
        Simulasikan Scan Barcode
      </Button>
    </div>
  );
}