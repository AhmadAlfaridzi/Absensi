'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/authContext'
// import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AttendanceCard from '@/components/Presensi/attendenceCard'
import AttendanceModal from '@/components/Presensi/attendanceModal'
import UserInfo from '@/components/Presensi/userInfo'
import BarcodeScannerModal from '@/components/Presensi/barcodeScannerModal'

export default function AbsenPage() {
  const { user } = useAuth()
  // const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'masuk' | 'pulang'>('masuk')
  const [attendanceTime, setAttendanceTime] = useState('')
  const [attendancePhoto, setAttendancePhoto] = useState<string | null>(null)
<<<<<<< HEAD
=======
  const [showBarcodeModal, setShowBarcodeModal] = useState(false) 
  const [attendanceMethod, setAttendanceMethod] = useState<'selfie' | 'barcode'>('selfie')
>>>>>>> inventory

  const handlePhotoTaken = (photo: string) => {
      setAttendancePhoto(photo)
    }

  const [currentDate] = useState(new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }))

  const [realTime, setRealTime] = useState(
    new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setRealTime(new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  const openAttendanceModal = (type: 'masuk' | 'pulang') => {
    setModalType(type)
    setAttendanceTime(new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })) 
      if (attendanceMethod === 'selfie') {
      setIsModalOpen(true)
    } else {
      setShowBarcodeModal(true)
    }
  }

  const handleSubmitAttendance = () => {
    console.log({
      userId: user?.id,
      type: modalType,
      time: attendanceTime,
      photo: attendancePhoto,
      date: new Date().toISOString()
    })
    setIsModalOpen(false)
    setAttendancePhoto(null)
  }

   const handleBarcodeScanned = (code: string) => {
    console.log('Barcode scanned:', code)
    // Kirim data ke API
    fetch('/api/attendance', {
      method: 'POST',
      body: JSON.stringify({
        userId: user?.id,
        type: modalType,
        barcode: code,
        time: new Date().toISOString()
      })
    })
    setShowBarcodeModal(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBF991]" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6 bg-[#1a1a1a]  text-white"
    >

      <UserInfo 
        user={user} 
        realTime={realTime} 
        currentDate={currentDate} 
      />

      <div className="flex gap-4 mb-6 justify-center">
        <button 
          className={`px-4 py-2 rounded-lg ${attendanceMethod === 'selfie' ? 'bg-green-600' : 'bg-gray-700'}`}
          onClick={() => setAttendanceMethod('selfie')}
        >
          Selfie
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${attendanceMethod === 'barcode' ? 'bg-green-600' : 'bg-gray-700'}`}
          onClick={() => setAttendanceMethod('barcode')}
        >
          Barcode
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AttendanceCard 
          type="masuk" 
          onClick={() => openAttendanceModal('masuk')} 
          scheduleTime="08:00"
        />
        <AttendanceCard 
          type="pulang" 
          onClick={() => openAttendanceModal('pulang')} 
          scheduleTime="17:00"
        />
      </div>

      <AttendanceModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        type={modalType}
        userName={user.name}
        attendanceTime={attendanceTime}
        onPhotoTaken={handlePhotoTaken}
        onSubmit={handleSubmitAttendance}
      />

      <BarcodeScannerModal
        isOpen={showBarcodeModal}
        onClose={() => setShowBarcodeModal(false)}
        userId={user.id}
        onScanSuccess={handleBarcodeScanned}
      />

    </motion.div>
  )
}