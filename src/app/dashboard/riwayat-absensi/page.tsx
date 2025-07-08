// 'use client'
// import { useState, useEffect, useCallback } from 'react'
// import { useAuth } from '@/context/authContext'
// import { DateRange } from 'react-day-picker'
// import { format, subDays } from 'date-fns'
// import { id } from 'date-fns/locale'
// import Image from 'next/image'
// import { motion } from 'framer-motion'


// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { Calendar } from '@/components/ui/calendar'
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Badge } from '@/components/ui/badge'
// import { Skeleton } from '@/components/ui/skeleton'

// import { Calendar as CalendarIcon, X, Camera } from 'lucide-react'

// interface AttendanceRecord {
//   id: string
//   date: string
//   clockIn: string
//   clockOut: string | null
//   status: 'Tepat Waktu' | 'Terlambat' | 'Pulang Cepat'
//   employee: {
//     id: string
//     name: string
//     department: string
//     position: string
//   }
//   photoIn: string | null
//   photoOut: string | null
// }

// export default function RiwayatAbsenPage() {
//   const { user, isAuthenticated, isLoading: authLoading } = useAuth()
//   const [data, setData] = useState<AttendanceRecord[]>([])
//   const [loading, setLoading] = useState(true)
//   const [dateRange, setDateRange] = useState<DateRange | undefined>({
//     from: subDays(new Date(), 7),
//     to: new Date()
//   })
//   const [filters, setFilters] = useState({
//     name: '',
//     department: '',
//     status: 'all'
//   })
//   const [showPhotoModal, setShowPhotoModal] = useState({
//     open: false,
//     photoUrl: '',
//     type: ''
//   })

//   // Data dummy untuk riwayat absensi
//   const dummyData: AttendanceRecord[] = [
//     {
//       id: '1',
//       date: new Date().toISOString(),
//       clockIn: '08:00',
//       clockOut: '17:00',
//       status: 'Tepat Waktu',
//       employee: {
//         id: 'EMP001',
//         name: 'John Doe',
//         department: 'IT',
//         position: 'Developer'
//       },
//       photoIn: '/images/placeholder-user.jpg',
//       photoOut: '/images/placeholder-user.jpg'
//     },
//     {
//       id: '2',
//       date: subDays(new Date(), 1).toISOString(),
//       clockIn: '08:30',
//       clockOut: '16:30',
//       status: 'Terlambat',
//       employee: {
//         id: 'EMP002',
//         name: 'Jane Smith',
//         department: 'HR',
//         position: 'Manager'
//       },
//       photoIn: '/images/placeholder-user.jpg',
//       photoOut: '/images/placeholder-user.jpg'
//     },
//     {
//       id: '3',
//       date: subDays(new Date(), 2).toISOString(),
//       clockIn: '08:00',
//       clockOut: '16:00',
//       status: 'Pulang Cepat',
//       employee: {
//         id: 'EMP003',
//         name: 'Bob Johnson',
//         department: 'Finance',
//         position: 'Analyst'
//       },
//       photoIn: '/images/placeholder-user.jpg',
//       photoOut: null
//     }
//   ]

//   const fetchData = useCallback (async () => {
//     try {
//       setLoading(true)
      
//       let filteredDummy = [...dummyData]

//       // Filter by date range
//       if (dateRange?.from && dateRange?.to) {
//         filteredDummy = filteredDummy.filter(record => {
//           const recordDate = new Date(record.date)
//           return recordDate >= dateRange.from! && recordDate <= dateRange.to!
//         })
//       }
      
//       // Filter by name
//       if (filters.name) {
//         filteredDummy = filteredDummy.filter(record => 
//           record.employee.name.toLowerCase().includes(filters.name.toLowerCase())
//         )
//       }
      
//       // Filter by department
//       if (filters.department) {
//         filteredDummy = filteredDummy.filter(record => 
//           record.employee.department.toLowerCase().includes(filters.department.toLowerCase())
//         )
//       }
      
//       // Filter by status
//       if (filters.status !== 'all') {
//         filteredDummy = filteredDummy.filter(record => 
//           record.status === filters.status
//         )
//       }
      
//       // Filter by user if not admin
//       if (user?.role !== 'Direktur') {
//         filteredDummy = filteredDummy.filter(record => 
//           record.employee.id === user?.id
//         )
//       }
//         setData(filteredDummy);
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [dateRange, filters, user?.role]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchData()
//     }
//   }, [isAuthenticated, fetchData])

//   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFilters({
//       ...filters,
//       [name]: value
//     })
//   }

//   const handleDateSelect = (range: DateRange | undefined) => {
//     setDateRange(range)
//   }

//   const resetFilters = () => {
//     setDateRange({
//       from: subDays(new Date(), 7),
//       to: new Date()
//     })
//     setFilters({
//       name: '',
//       department: '',
//       status: 'all'
//     })
//   }

//   const openPhotoModal = (photoUrl: string, type: string) => {
//     setShowPhotoModal({
//       open: true,
//       photoUrl,
//       type
//     })
//   }

//   if (authLoading) {
//     return <div className="min-h-screen bg-[#121212] flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
//     </div>
//   }

//   if (!isAuthenticated) {
//     return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-gray-100">
//       Silakan login untuk mengakses riwayat absensi
//     </div>
//   } 
//   return (

//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//       className="space-y-6 p-6 bg-[#1e1e1e] min-h-screen text-gray-100"
//     >
//       {/* Header dan Filter */}
//       <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-100">
//           {user?.role === 'admin' ? 'Riwayat Absensi Karyawan' : 'Riwayat Absensi Saya'}
//         </h1>

//         {/* <div className="flex items-center gap-2"> */}
//           <Button 
//             onClick={resetFilters} 
//             variant="outline" 

//            className="border-red-800/30 bg-red-800/20 text-red-300 hover:bg-red-800/50 
//            hover:text-red-100 transition-colors">

//           {/* // className="border-[#3a3a3a] bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a] 
//           // hover:text-gray-100 transition-colors" >  */}

//             <X className="h-4 w-4 mr-2" />
//             Reset Filter
//           </Button>
//         </div>
//       {/* </div> */}

//       {/* Filter Controls */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         {/* Date Picker */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Rentang Tanggal</label>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button 
//                 variant="outline" 
//                 className="w-full justify-start text-left font-normal bg-[#1e1e1e] border-[#2e2e2e] 
//                 hover:bg-[#2e2e2e] hover:text-gray-100">

//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {dateRange?.from ? (
//                   dateRange.to ? (
//                     <>
//                       {format(dateRange.from, 'dd MMM yyyy', { locale: id })} -{' '}
//                       {format(dateRange.to, 'dd MMM yyyy', { locale: id })}
//                     </>
//                   ) : (
//                     format(dateRange.from, 'dd MMM yyyy', { locale: id })
//                   )
//                 ) : (
//                   <span>Pilih tanggal</span>
//                 )}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0 bg-[#1e1e1e] border-[#2e2e2e]" align="start">
//               <Calendar
//                 mode="range"
//                 selected={dateRange}
//                 onSelect={handleDateSelect}
//                 numberOfMonths={2}
//                 className="bg-[#1e1e1e] text-gray-100"
//               />
//             </PopoverContent>
//           </Popover>
//         </div>

//         {/* Name Filter */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Nama Karyawan</label>
//           <Input
//             name="name"
//             placeholder="Cari nama..."
//             value={filters.name}
//             onChange={handleFilterChange}
//             className="bg-[#1e1e1e] border-[#2e2e2e] focus:border-blue-500"
//           />
//         </div>

//         {/* Department Filter */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Departemen</label>
//           <Input
//             name="department"
//             placeholder="Filter departemen..."
//             value={filters.department}
//             onChange={handleFilterChange}
//             className="bg-[#1e1e1e] border-[#2e2e2e] focus:border-blue-500"
//           />
//         </div>

//         {/* Status Filter */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Status</label>
//           <Select
//             value={filters.status}
//             onValueChange={(value) => setFilters({...filters, status: value})}
//           >
//             <SelectTrigger className="w-full bg-[#1e1e1e] border-[#2e2e2e]">
//               <SelectValue placeholder="Pilih status" />
//             </SelectTrigger>
//             <SelectContent className="bg-[#1e1e1e] border-[#2e2e2e]">
//               <SelectItem value="all" className="hover:bg-[#252525]">Semua Status</SelectItem>
//               <SelectItem value="Tepat Waktu" className="hover:bg-[#252525]">
//                 <span className="text-emerald-400">Tepat Waktu</span>
//               </SelectItem>
//               <SelectItem value="Terlambat" className="hover:bg-[#252525]">
//                 <span className="text-amber-400">Terlambat</span>
//               </SelectItem>
//               <SelectItem value="Pulang Cepat" className="hover:bg-[#252525]">
//                 <span className="text-orange-300">Pulang Cepat</span>
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Data Table */}
//       <div className="rounded-md border border-[#2e2e2e] overflow-hidden">
//         <Table>
//           <TableHeader className="bg-[#1e1e1e]">
//             <TableRow>
//               <TableHead className="text-blue-300 ">Tanggal</TableHead>
//               <TableHead className="text-blue-300 ">Nama</TableHead>
//               <TableHead className="text-blue-300 ">Departemen</TableHead>
//               <TableHead className="text-blue-300 ">Masuk</TableHead>
//               <TableHead className="text-blue-300 ">Pulang</TableHead>
//               <TableHead className="text-blue-300 ">Status</TableHead>
//               <TableHead className="text-blue-300 ">Foto</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {loading ? (
//               Array.from({ length: 5 }).map((_, i) => (
//                 <TableRow key={i} className="border-[#2e2e2e] bg-[#1e1e1e]">
//                   {[...Array(7)].map((_, j) => (
//                     <TableCell key={j}>
//                       <Skeleton className="h-4 w-full bg-[#333]" />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : data.length === 0 ? (
//               <TableRow className="border-[#2e2e2e] bg-[#1e1e1e]">
//                 <TableCell colSpan={7} className="text-center py-8 text-gray-400">
//                   Tidak ada data yang ditemukan
//                 </TableCell>
//               </TableRow>
//             ) : (
//               data.map((record) => (
//                 <TableRow 
//                   key={record.id} 
//                   className="border-[#2e2e2e] hover:bg-[#1f1f1f]"
//                 >
//                   <TableCell>
//                     {format(new Date(record.date), 'dd MMM yyyy', { locale: id })}
//                   </TableCell>
//                   <TableCell>{record.employee.name}</TableCell>
//                   <TableCell>{record.employee.department}</TableCell>
//                   <TableCell>{record.clockIn}</TableCell>
//                   <TableCell>{record.clockOut || '-'}</TableCell>
//                   <TableCell>
//                     <Badge 
//                       variant="outline"
//                       className={
//                         record.status === 'Tepat Waktu' ? 'border-green-500 text-emerald-400' :
//                         record.status === 'Terlambat' ? 'border-yellow-500 text-amber-400' :
//                         'border-orange-500 text-orange-300'
//                       }
//                     >
//                       {record.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="flex gap-2">
//                     {record.photoIn && (
//                       <Button 
//                         variant="ghost" 
//                         size="sm"
//                         onClick={() => openPhotoModal(record.photoIn!, 'Masuk')}
//                         className="text-blue-300  hover:text-blue-300 hover:bg-[#252525]"
//                       >
//                         <Camera className="h-4 w-4 mr-2" />
//                         Masuk
//                       </Button>
//                     )}
//                     {record.photoOut && (
//                       <Button 
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => openPhotoModal(record.photoOut!, 'Pulang')}
//                         className="text-blue-300  hover:text-blue-300 hover:bg-[#252525]"
//                       >
//                         <Camera className="h-4 w-4 mr-2" />
//                         Pulang
//                       </Button>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Photo Modal */}
//       {showPhotoModal.open && (
//         <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
//           <div className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-lg p-6 max-w-4xl w-full mx-4">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-gray-100">
//                 Foto Absen {showPhotoModal.type}
//               </h3>
//               <Button
//                 variant="ghost"
//                 onClick={() => {
//                     setShowPhotoModal({...showPhotoModal, open: false});
//                     if (showPhotoModal.photoUrl.startsWith('blob:')) {
//                       URL.revokeObjectURL(showPhotoModal.photoUrl);
//                     }
//                   }}
//                 >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//             <div className="relative aspect-video bg-[#121212] rounded-md overflow-hidden border border-[#2e2e2e]">
//               <Image
//                 src={showPhotoModal.photoUrl}
//                 alt={`Foto ${showPhotoModal.type}`}
//                 fill
//                 priority={false} 
//                 quality={75}
//                 className="object-contain"
//                 unoptimized
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   )
// }
'use client'
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/context/authContext'
import { subDays } from 'date-fns'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { AttendanceRecord } from '@/types/attendance'
import { dummyAttendance } from '@/data/attendence'
import { DataTable } from '@/components/Common/dataTable'
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
      
      if (user?.role !== 'Direktur') {
        filteredDummy = filteredDummy.filter(record => 
          record.employee.id === user?.id
        )
      }
      
      setData(filteredDummy)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }, [dateRange, filters, user?.role, user?.id])

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
      className="space-y-6 p-6 bg-[#1e1e1e] min-h-screen text-gray-100"
    >
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-100">
          {user?.role === 'Direktur' ? 'Riwayat Absensi Karyawan' : 'Riwayat Absensi Saya'}
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
        onDateSelect={setDateRange}
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
        photoUrl={showPhotoModal.photoUrl}
        type={showPhotoModal.type}
        onClose={closePhotoModal}
      />
    </motion.div>
  )
}