'use client'
import { useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import JsBarcode from 'jsbarcode'

interface BarcodeScannerModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  onScanSuccess: (code: string) => void
}

export default function BarcodeScannerModal({
  isOpen,
  onClose,
  userId,
  onScanSuccess
}: BarcodeScannerModalProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null
    
    if (isOpen) {
      scanner = new Html5QrcodeScanner(
        'barcode-scanner',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      )
      
      scanner.render(
        (decodedText) => {
          onScanSuccess(decodedText)
          scanner?.clear()
          onClose()
        },
        (error) => console.error('Scan error:', error)
      )
      
      scannerRef.current = scanner
    }

    return () => {
      scanner?.clear()
    }
  }, [isOpen, onClose, onScanSuccess])

  useEffect(() => {
    const canvas = document.getElementById('user-barcode')
    if (canvas) JsBarcode(canvas, userId, { format: 'CODE128' })
  }, [userId])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#2a2a2a] border-[#333333] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Scan Barcode Absensi</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div id="barcode-scanner" className="w-full h-64 bg-black rounded-lg" />
          
          <div className="text-center">
            <p className="text-gray-400 mb-2">Barcode Anda:</p>
            <canvas id="user-barcode" className="mx-auto" />
          </div>

          <Button onClick={onClose} className="w-full bg-[#333333] hover:bg-[#444444]">
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}