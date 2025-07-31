'use client'
import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Barcode } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export default function BarcodeScanner({ onScan, videoRef }: BarcodeScannerProps) {
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoRef]);

  const handleMockScan = () => {
    const mockBarcode = `EMP-${Date.now()}`;
    onScan(mockBarcode);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-full bg-black rounded-lg" style={{ aspectRatio: '4/3' }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          playsInline
        />
        <div className="absolute inset-0 border-4 border-green-500 animate-pulse" />
      </div>
      <Button onClick={handleMockScan} className="gap-2 w-full sm:w-auto">
        <Barcode className="h-4 w-4" />
        Simulasikan Scan Barcode
      </Button>
    </div>
  );
}