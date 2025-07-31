'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Camera, RotateCw, QrCode, User } from 'lucide-react'
import { Html5Qrcode } from 'html5-qrcode'

interface AttendanceModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  type: 'masuk' | 'pulang'
  userName: string
  attendanceTime: string
  onPhotoTaken: (photo: string) => void
  onSubmit: () => void
  onScanSuccess: (decodedText: string) => void
}

export default function AttendanceModal({
  isOpen,
  onOpenChange,
  type,
  userName,
  attendanceTime,
  onPhotoTaken,
  onSubmit,
  onScanSuccess
}: AttendanceModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const qrContainerRef = useRef<HTMLDivElement>(null)
  const qrScannerRef = useRef<Html5Qrcode | null>(null)
  
  const [mode, setMode] = useState({
    type: 'selfie' as 'selfie' | 'qr',
    cameraFacing: 'environment' as 'user' | 'environment',
    photo: null as string | null
  })

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  // Camera functions
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const startCamera = async () => {
    try {
      stopCamera()
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode.cameraFacing,
          width: { ideal: isMobile ? 1280 : 640 },
          height: { ideal: isMobile ? 720 : 480 }
        }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.style.transform = mode.cameraFacing === 'user' ? 'scaleX(-1)' : 'scaleX(1)'
        videoRef.current.style.objectFit = 'cover'
      }
    } catch (err) {
      console.error("Camera error:", err)
      setMode(prev => ({ ...prev, type: 'qr' }))
    }
  }

  const takePhoto = () => {
    if (!videoRef.current) return
    
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext('2d')!
    
    if (mode.cameraFacing === 'user') {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    const photo = canvas.toDataURL('image/jpeg')
    setMode(prev => ({ ...prev, photo }))
    onPhotoTaken(photo)
    stopCamera()
  }

  // QR Scanner functions
   const stopScanner = async () => {
    if (qrScannerRef.current) {
      try {
        await qrScannerRef.current.stop()
      } catch (err) {
        console.error("Error stopping scanner:", err)
      }
      qrScannerRef.current = null
    }
  }

  const startScanner = async () => {
    try {
      await stopScanner()
      if (!qrContainerRef.current) return

      const container = qrContainerRef.current
      container.innerHTML = ''
      
      qrScannerRef.current = new Html5Qrcode(container.id)
      await qrScannerRef.current.start(
        { facingMode: isMobile ? "environment" : "user" }, 
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          onScanSuccess(decodedText)
        },
        (errorMessage) => {
          console.log("Scan error:", errorMessage)
        }
      )
    } catch (err) {
      console.error("Scanner error:", err)
      setMode(prev => ({ ...prev, type: 'selfie' }))
    }
  }

  const switchCamera = () => {
    setMode(prev => ({
      ...prev,
      cameraFacing: prev.cameraFacing === 'user' ? 'environment' : 'user'
    }))
  }

  const retakePhoto = () => {
    setMode(prev => ({ ...prev, photo: null }))
    startCamera()
  }

  const handleClose = () => {
    if (mode.type === 'selfie') {
      stopCamera()
    } else {
      stopScanner()
    }
    onOpenChange(false)
  }


  const handleModeChange = (newMode: 'selfie' | 'qr') => {
    if (mode.type === newMode) return
    setMode(prev => ({ ...prev, type: newMode }))
  }

 useEffect(() => {
    if (!isOpen) {
      stopCamera()
      stopScanner()
      return
    }

    const initializeMode = async () => {
      try {
        if (mode.type === 'selfie') {
          await startCamera()
        } else {
          await startScanner()
        }
      } catch (err) {
        console.error("Initialization error:", err)
      }
    }

    initializeMode()

    return () => {
      stopCamera()
      stopScanner()
    }
  }, [isOpen, mode.type, mode.cameraFacing])

   return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#2a2a2a] border-[#444] text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            {type === 'masuk' ? 'Absen Masuk' : 'Absen Pulang'} - {userName}
          </DialogTitle>
        </DialogHeader>

        {/* Mode Selector */}
        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant={mode.type === 'selfie' ? 'default' : 'outline'}
            onClick={() => handleModeChange('selfie')}
            className={`flex items-center gap-2 ${
              mode.type === 'selfie' 
                ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white' 
                : 'bg-transparent hover:bg-[#3a3a3a] text-gray-300 border-gray-600'
            }`}
          >
            <User className="h-4 w-4" />
            Selfie
          </Button>
          <Button
            variant={mode.type === 'qr' ? 'default' : 'outline'}
            onClick={() => handleModeChange('qr')}
            className={`flex items-center gap-2 ${
              mode.type === 'qr' 
                ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white' 
                : 'bg-transparent hover:bg-[#3a3a3a] text-gray-300 border-gray-600'
            }`}
          >
            <QrCode className="h-4 w-4" />
            QR Code
          </Button>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-400">Waktu Saat Ini</p>
            <p className="text-2xl font-bold text-white">{attendanceTime}</p>
          </div>

          {/* Kamera/Scanner */}
          <div className="space-y-2">
            <p className="text-gray-400 text-center">
              {mode.type === 'selfie' 
                ? (type === 'masuk' ? 'Ambil Foto Masuk' : 'Ambil Foto Pulang') 
                : 'Scan QR Code'} (Wajib)
            </p>
            
            <div className="relative bg-[#333] rounded-lg aspect-[4/3] overflow-hidden border border-[#444]">
              {!mode.photo ? (
                mode.type === 'selfie' ? (
                  <div className="relative w-full h-full">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                      {isMobile && (
                        <button
                          onClick={switchCamera}
                          className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full shadow-md"
                        >
                          <RotateCw className="h-6 w-6" />
                        </button>
                      )}
                      <button
                        onClick={takePhoto}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
                      >
                        <Camera className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div ref={qrContainerRef} id="qr-scanner-container" className="w-full h-full relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="border-2 border-white/30 rounded-lg w-[80%] h-[60%] max-w-[300px] max-h-[300px] relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/50"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-white/50"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-white/50"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/50"></div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={mode.photo}
                    alt={`Foto ${type === 'masuk' ? 'masuk' : 'pulang'}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <button
                      onClick={retakePhoto}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md"
                    >
                      <RotateCw className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="bg-[#333] border-[#444] text-white hover:bg-[#444]"
            >
              Batal
            </Button>
            <Button 
              onClick={onSubmit} 
              disabled={!mode.photo && mode.type === 'selfie'}
              className={type === 'masuk' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'}
            >
              {type === 'masuk' ? 'Absen Masuk' : 'Absen Pulang'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}