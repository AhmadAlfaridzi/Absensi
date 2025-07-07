
'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Camera, RotateCw } from 'lucide-react'

interface AttendanceModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  type: 'masuk' | 'pulang'
  userName: string
  attendanceTime: string
  onPhotoTaken: (photo: string) => void
  onSubmit: () => void
}

export default function AttendanceModal({
  isOpen,
  onOpenChange,
  type,
  userName,
  attendanceTime,
  onPhotoTaken,
  onSubmit
}: AttendanceModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [photo, setPhoto] = useState<string | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('environment')


  // Deteksi perangkat mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    checkIfMobile()
  }, [])

  const startCamera = async () => {
    try {

      if (window.location.protocol !== 'https:' && window.location.hostname 
        !== 'localhost' && !window.location.hostname.startsWith('192.168.')) 
        {
         alert('Akses kamera membutuhkan koneksi HTTPS atau jaringan lokal. Mohon gunakan HTTPS atau jaringan lokal.')
      return
    }
      const constraints: MediaStreamConstraints = {
        video: {
          // width: { ideal: 1280 },
          // height: { ideal: 720 },
          facingMode: cameraFacingMode,

          width: { ideal: isMobile ? 640 : 1280 },
          height: { ideal: isMobile ? 480 : 720 },
          aspectRatio: isMobile ? 0.75 : 1.77,


          
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraActive(true)
        
        // Handle orientation change di mobile
        if (isMobile) {
          videoRef.current.style.transform = 'scaleX(-1)' 
          videoRef.current.style.objectFit = 'contain'
          
          videoRef.current.style.width = '100%';
          videoRef.current.style.height = 'auto';
          videoRef.current.style.maxHeight = '100vh';
          
          // Handle orientation change
          const handleResize = () => {
            if (videoRef.current) {
              const isPortrait = window.innerHeight > window.innerWidth
              videoRef.current.style.width = isPortrait ? '100%' : 'auto'
              videoRef.current.style.height = isPortrait ? 'auto' : '100%'
            }
          }
          
          window.addEventListener('resize', handleResize)
          handleResize() // Panggil sekali saat pertama kali
          
          // Bersihkan event listener saat komponen unmount
          return () => window.removeEventListener('resize', handleResize)
        }
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin.atau gunakan HTTPS.")
    }
  }

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        if (cameraFacingMode === 'user') {
          ctx.translate(canvas.width, 0)
          ctx.scale(-1, 1)
        }      
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const photoData = canvas.toDataURL('image/jpeg', 0.7) 
        setPhoto(photoData)
        onPhotoTaken(photoData)
        stopCamera()
      }
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      setIsCameraActive(false)
    }
  }

  const retakePhoto = () => {
    setPhoto(null)
    startCamera()
  }

  const switchCamera = () => {
    stopCamera()
    setCameraFacingMode(prev => prev === 'user' ? 'environment' : 'user')
  }
  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen, cameraFacingMode ])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#2a2a2a] border-[#333333] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">
            {type === 'masuk' ? 'Absen Masuk' : 'Absen Pulang'} - {userName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400">Waktu Saat Ini</p>
            <p className="text-2xl font-bold text-white">{attendanceTime}</p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-400">
              {type === 'masuk' ? 'Ambil Foto Masuk' : 'Ambil Foto Pulang'} (Wajib)
            </p>
            <div className="relative bg-[#333333] rounded-lg overflow-hidden aspect-video">
              {!photo ? (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {isCameraActive && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                      {isMobile && (
                        <button
                          onClick={switchCamera}
                          className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full"
                          title="Ganti Kamera"
                        >
                          <RotateCw className="h-6 w-6" />
                        </button>
                      )}
                      <button
                        onClick={takePhoto}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                        title="Ambil Foto"
                      >
                        <Camera className="h-6 w-6" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-full h-full relative">
                    <Image
                      src={photo}
                      alt={`Foto ${type === 'masuk' ? 'masuk' : 'pulang'}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                    <button
                      onClick={retakePhoto}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                      title="Ambil Ulang"
                    >
                      <RotateCw className="h-6 w-6" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                stopCamera()
                onOpenChange(false)
              }}
              className="bg-[#333333] border-[#444444] text-white hover:bg-[#444444]"
            >
              Batal
            </Button>
            <Button
              onClick={onSubmit}
              disabled={!photo}
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

