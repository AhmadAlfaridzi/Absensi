'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react' 
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import AttendanceCard from '@/components/presensi/attendenceCard'
import AttendanceModal from '@/components/presensi/AttendanceModal'
import UserInfo from '@/components/presensi/userInfo'

export default function AbsenPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'masuk' | 'pulang'>('masuk')
  const [attendanceTime, setAttendanceTime] = useState('')
  const [attendancePhoto, setAttendancePhoto] = useState<string | null>(null)
  // const [attendanceNote, setAttendanceNote] = useState('')

  // const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setAttendanceNote(e.target.value)
  // }

  const handlePhotoTaken = (photo: string) => {
      setAttendancePhoto(photo)
    }

  const handleBackClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/dashboard')
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
    setIsModalOpen(true)
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
      className="space-y-6 p-6 bg-[#1a1a1a] min-h-screen text-white"
    >
      {isMobile && (
        <Button 
          variant="ghost"
          onClick={handleBackClick}
          className="text-blue-400 hover:text-blue-300 mb-6 bg-[#2a2a2a] hover:bg-[#333333] md:hidden"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Kembali ke Dashboard
        </Button>
      )}

      <UserInfo 
        user={user} 
        realTime={realTime} 
        currentDate={currentDate} 
      />

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
    </motion.div>
  )
}