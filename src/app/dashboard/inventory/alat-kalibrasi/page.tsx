'use client'
import { useState } from 'react'
import { AlatKalibrasiTable } from '@/components/Inventaris/Alat-kalibrasi/alatKalibrasiTable'
import { AlatKalibrasiFilter } from '@/components/Inventaris/Alat-kalibrasi/alatKalibrasiFIlter'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { dummyAlatKalibrasi } from '@/data/alatKalibrasi'
import { DateRange } from 'react-day-picker'
import { StatusFilter } from '@/types/inventory'

export default function AlatKalibrasiPage() {
 const [filters, setFilters] = useState({
    search: '',
    status: 'all' as StatusFilter,
    location: '',
    dateRange: undefined as DateRange | undefined
  })

  const filteredData = dummyAlatKalibrasi.filter(item => {
    return (
      (filters.search === '' || 
        item.nama_alat.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.merek_model.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.status === 'all' || item.status === filters.status) &&
      (filters.location === '' || item.id_lokasi.includes(filters.location)) &&
      (!filters.dateRange?.from || new Date(item.tanggal_kalibrasi) >= filters.dateRange.from) &&
      (!filters.dateRange?.to || new Date(item.tanggal_kalibrasi) <= filters.dateRange.to)
    )
  })

  return (
    <div className="space-y-6 p-6 bg-[#1e1e1e] text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Alat Kalibrasi</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/inventaris/alat-kalibrasi/tambah">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Alat
          </Link>
        </Button>
      </div>

      <AlatKalibrasiFilter
        dateRange={filters.dateRange}
        onDateChange={(range) => setFilters({...filters, dateRange: range})}
        searchQuery={filters.search}
        onSearchChange={(value) => setFilters({...filters, search: value})}
        statusFilter={filters.status}
        onStatusChange={(value) => setFilters({...filters, status: value})}
        locationFilter={filters.location}
        onLocationChange={(value) => setFilters({...filters, location: value})}
      />

      <AlatKalibrasiTable data={filteredData} />
    </div>
  )
}
