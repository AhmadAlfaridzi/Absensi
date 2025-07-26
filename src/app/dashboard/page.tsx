// src/app/dashboard/page.tsx
'use client'
import { useAuth } from '@/context/authContext'
import { redirect } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { GenericTable } from '@/components/Common/genericTable'
import { ColumnDef } from '@tanstack/react-table'
import { dummyAttendance } from '@/data/attendence'
import { format, isToday } from 'date-fns'
import { id } from 'date-fns/locale'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AttendanceRecord } from '@/types/attendance'

// Fungsi untuk menghitung statistik dari data absensi
const calculateStats = (attendanceData: AttendanceRecord[]) => {
  const today = new Date().toISOString().split('T')[0]
  
  // Filter data hari ini
  const todayRecords = attendanceData.filter(record => 
    record.date.includes(today)
  )

  // Hitung total karyawan unik
  const uniqueEmployees = new Set(
    attendanceData.map(record => record.employee.id)
  ).size

  // Hitung statistik hari ini
  const stats = {
    totalKaryawan: uniqueEmployees,
    tepatWaktu: todayRecords.filter(r => r.status === 'Tepat Waktu').length,
    terlambat: todayRecords.filter(r => r.status === 'Terlambat').length,
    tidakHadir: uniqueEmployees - todayRecords.length // Asumsi yang tidak absen = tidak hadir
  }

  return stats
}

// Data grafik bulanan (contoh statis, bisa disesuaikan dengan data riil)
const attendanceData = [
  { name: 'Jan', hadir: 45, terlambat: 5, tidakHadir: 2 },
  { name: 'Feb', hadir: 42, terlambat: 8, tidakHadir: 3 },
  { name: 'Mar', hadir: 48, terlambat: 2, tidakHadir: 1 },
  { name: 'Apr', hadir: 42, terlambat: 8, tidakHadir: 3 },
  { name: 'Mei', hadir: 48, terlambat: 2, tidakHadir: 1 },
  { name: 'Jun', hadir: 45, terlambat: 5, tidakHadir: 2 },
  { name: 'Jul', hadir: 42, terlambat: 8, tidakHadir: 3 },
  { name: 'Agu', hadir: 48, terlambat: 2, tidakHadir: 1 },
  { name: 'Sep', hadir: 42, terlambat: 8, tidakHadir: 3 },
  { name: 'Okt', hadir: 48, terlambat: 2, tidakHadir: 1 },
  { name: 'Nov', hadir: 48, terlambat: 2, tidakHadir: 1 },
  { name: 'Des', hadir: 42, terlambat: 8, tidakHadir: 3 },
]

export default function DashboardPage() {
  const { user } = useAuth()
  
  // Hitung statistik dari data dummyAttendance
  const dashboardStats = calculateStats(dummyAttendance)

  const todayAttendanceColumns: ColumnDef<AttendanceRecord>[] = [
    {
      accessorKey: 'employee.name',
      header: 'Nama Karyawan'
    },
    {
      accessorKey: 'employee.department',
      header: 'Departemen'
    },
    {
      accessorKey: 'clockIn',
      header: 'Jam Masuk',
      cell: ({ row }) => {
        const clockIn = row.getValue('clockIn')
        return clockIn ? clockIn : '-'
      }
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        let color = 'text-gray-400'
        
        if (status === 'Tepat Waktu') color = 'text-emerald-400'
        else if (status === 'Terlambat') color = 'text-amber-400'
        else if (status === 'Pulang Cepat') color = 'text-orange-300'
        
        return <span className={color}>{status}</span>
      }
    },
    {
      id: 'actions',
      header: 'Detail',
      cell: () => (
        <Link href="/riwayat-absensi" passHref>
          <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
            Lihat Detail
          </Button>
        </Link>
      )
    }
  ]

  const todayAttendance = dummyAttendance.filter(record => 
    isToday(new Date(record.date))
  )

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      {/* Statistik untuk kehadiran karyawan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card statistik akan menampilkan data dinamis */}
        {/* Total Karyawan */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Total Karyawan</p>
              <h2 className="text-2xl font-bold">{dashboardStats.totalKaryawan}</h2>
            </div>
          </div>
        </div>

        {/* Tepat Waktu */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Tepat Waktu</p>
              <h2 className="text-2xl font-bold">{dashboardStats.tepatWaktu}</h2>
            </div>
          </div>
        </div>

        {/* Terlambat */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Terlambat</p>
              <h2 className="text-2xl font-bold">{dashboardStats.terlambat}</h2>
            </div>
          </div>
        </div>

        {/* Tidak Hadir */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Tidak Hadir</p>
              <h2 className="text-2xl font-bold">{dashboardStats.tidakHadir}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Grafik Kehadiran */}
      <div className="bg-[#1a1a1a] p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Grafik Kehadiran Karyawan</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="name" stroke="#a0aec0" />
              <YAxis stroke="#a0aec0" />
              <Tooltip />
              <Legend />
              <Bar dataKey="hadir" fill="#48bb78" name="Hadir" />
              <Bar dataKey="terlambat" fill="#ecc94b" name="Terlambat" />
              <Bar dataKey="tidakHadir" fill="#f56565" name="Tidak Hadir" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabel Absensi Hari Ini */}
      <div className="bg-[#1a1a1a] p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Absensi Hari Ini</h2>
          <Link href="/riwayat-absensi" passHref>
            <Button variant="outline" className="bg-[#1e1e1e] border-[#2e2e2e] hover:bg-[#252525]">
              Lihat Riwayat Lengkap
            </Button>
          </Link>
        </div>
        
        <GenericTable<AttendanceRecord>
          columns={todayAttendanceColumns}
          data={todayAttendance}
          noDataMessage="Tidak ada data absensi hari ini"
          showPagination={todayAttendance.length > 5}
          pageSize={5}
        />
      </div>
    </div>
  )
}