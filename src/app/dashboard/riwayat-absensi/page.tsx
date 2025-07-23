'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/context/authContext'
import { subDays } from 'date-fns'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { AttendanceRecord } from '@/types/attendance'
import { dummyAttendance } from '@/data/attendence'
import { DataTable } from '@/components/Riwayat-Absensi/dataTable'
import { FilterControl } from '@/components/Common/filterControl'
import { PhotoModal } from '@/components/Common/photoModal'

export default function RiwayatAbsenPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [data, setData] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 7),
    to: new Date()
  })
  const [filters, setFilters] = useState({
    name: '',
    department: '',
    status: 'all'
  })
  const [showPhotoModal, setShowPhotoModal] = useState({
    open: false,
    photoUrl: '',
    type: ''
  })

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      
      let filteredDummy = [...dummyAttendance]

      if (dateRange?.from && dateRange?.to) {
        filteredDummy = filteredDummy.filter(record => {
          const recordDate = new Date(record.date)
          return recordDate >= dateRange.from! && recordDate <= dateRange.to!
        })
      }
      
      if (filters.name) {
        filteredDummy = filteredDummy.filter(record => 
          record.employee.name.toLowerCase().includes(filters.name.toLowerCase())
        )
      }
      
      if (filters.department) {
        filteredDummy = filteredDummy.filter(record => 
          record.employee.department.toLowerCase().includes(filters.department.toLowerCase())
        )
      }
      
      if (filters.status !== 'all') {
        filteredDummy = filteredDummy.filter(record => 
          record.status === filters.status
        )
      }
      
      
      setData(filteredDummy)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }, [dateRange, filters])
  //  }, [dateRange, filters, user?.role, user?.id])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated, fetchData])

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetFilters = () => {
    setDateRange({
      from: subDays(new Date(), 7),
      to: new Date()
    })
    setFilters({
      name: '',
      department: '',
      status: 'all'
    })
  }

  const openPhotoModal = (photoUrl: string, type: string) => {
    setShowPhotoModal({
      open: true,
      photoUrl,
      type
    })
  }

  const closePhotoModal = () => {
    setShowPhotoModal(prev => {
      if (prev.photoUrl.startsWith('blob:')) {
        URL.revokeObjectURL(prev.photoUrl)
      }
      return {...prev, open: false}
    })
  }

  if (authLoading) {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
    </div>
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-gray-100">
      Silakan login untuk mengakses riwayat absensi
    </div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 p-6 bg-[#1e1e1e]  text-gray-100"
    >
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">
          {user?.role === 'ADMIN' ? 'Riwayat Absensi Karyawan' : 'Riwayat Absensi Saya'}
        </h1>
        <Button 
          onClick={resetFilters} 
          variant="outline" 
          className="border-red-800/30 bg-red-800/20 text-red-300 hover:bg-red-800/50 hover:text-red-100 transition-colors">
          <X className="h-4 w-4 mr-2" />
          Reset Filter
        </Button>
      </div>

      <FilterControl 
        dateRange={dateRange}
        onDateSelect={(range) => {
          if (range) {
            setDateRange(prev => ({
              from: range.from || prev.from,  
              to: range.to || prev.to
            }));
          }
        }}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <DataTable 
        data={data}
        loading={loading}
        onPhotoClick={openPhotoModal}
      />

      <PhotoModal
        open={showPhotoModal.open}
        imageUrl={showPhotoModal.photoUrl}
        onOpenChange={(open) => !open && closePhotoModal()}
        title={`Foto ${showPhotoModal.type}`}
        />
    </motion.div>
  )
}













