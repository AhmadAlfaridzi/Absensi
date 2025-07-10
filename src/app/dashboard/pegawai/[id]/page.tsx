// src/app/dashboard/Pegawai/[id]/page.tsx
'use client'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { dummyPegawai } from '@/data/pegawai'

export default function DetailPegawai({ params }: { params: { id: string } }) {
  const data = dummyPegawai.find(item => item.id === params.id)

  if (!data) return notFound()

  return (
    <div className="p-6 bg-[#1e1e1e] text-gray-100">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/Pegawai" className="flex items-center gap-1 text-gray-300">
            <ChevronLeft className="h-4 w-4" />
            Kembali
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-[#2e2e2e] p-6 rounded-md">
            <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-medium">{data.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Role</p>
                <p className="font-medium">{data.role}</p>
              </div>
              <div>
                <p className="text-gray-400">Jabatan</p>
                <p className="font-medium">{data.position || '-'}</p>
              </div>
              <div>
                <p className="text-gray-400">Departemen</p>
                <p className="font-medium">{data.department || '-'}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-[#2e2e2e] p-6 rounded-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Informasi</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400">Status</p>
              <p className="font-medium">{data.status || 'Aktif'}</p>
            </div>
            <div>
              <p className="text-gray-400">Bergabung Pada</p>
              <p className="font-medium">{data.joinDate || '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}