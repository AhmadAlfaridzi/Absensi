'use client'
import { dummyPegawai } from '@/data/users'
import { UserTable } from '@/components/Pegawai/userTable'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function PegawaiPage() {
  return (
    <div className="space-y-6 p-6 bg-[#1e1e1e] text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manajemen Pegawai</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/dashboard/Pegawai/tambah">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pegawai
          </Link>
        </Button>
      </div>
      <UserTable data={dummyPegawai} />
    </div>
  )
}