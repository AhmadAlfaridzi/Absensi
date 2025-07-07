'use client'

import { useAuth } from '@/context/authcontext'
import { redirect } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const dashboardStats = {
  totalKaryawan: 52,
  tepatWaktu: 45,
  terlambat: 5,
  tidakHadir: 2
}

const attendanceData = [
  { name: 'Jan', hadir: 45, terlambat: 5, tidakHadir: 2 },
  { name: 'Feb', hadir: 42, terlambat: 8, tidakHadir: 3 },
  { name: 'Mar', hadir: 48, terlambat: 2, tidakHadir: 1 }
]

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      {/* Statistik untuk kehadiran karyawan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/*jumlah total Karyawan */}
        <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Total Karyawan</p>
              <h2 className="text-2xl font-bold">{dashboardStats.totalKaryawan}</h2>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Tepat Waktu</p>
              <h2 className="text-2xl font-bold">{dashboardStats.tepatWaktu}</h2>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-4 rounded-lg border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Terlambat</p>
              <h2 className="text-2xl font-bold">{dashboardStats.terlambat}</h2>
            </div>
          </div>
        </div>

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
    </div>
  )
}
