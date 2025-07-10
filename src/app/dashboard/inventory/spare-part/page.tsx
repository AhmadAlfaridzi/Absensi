'use client'
import { useState } from 'react'
import { SparePartTable } from '@/components/Inventaris/Spare-part/sparePartTable'

import { SparePartFilter } from '@/components/Inventaris/Spare-part/sparePartFilter'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { dummySparePart } from '@/data/sparePart'
import { SparePartStatusFilter } from '@/types/inventory'

export default function SparePartPage() {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all' as SparePartStatusFilter,
    location: '',
  })

  const filteredData = dummySparePart.filter(item => {
    return (
      (filters.search === '' || 
        item.nama.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.kode.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.status === 'all' || item.status === filters.status) &&
      (filters.location === '' || item.lokasi.includes(filters.location))
    )
  })

  return (
    <div className="space-y-6 p-6 bg-[#1e1e1e] text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Daftar Sparepart</h1>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/inventaris/sparepart/tambah">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Sparepart
          </Link>
        </Button>
      </div>

      <SparePartFilter
        searchQuery={filters.search}
        onSearchChange={(value) => setFilters({...filters, search: value})}
        statusFilter={filters.status}
        onStatusChange={(value) => setFilters({...filters, status: value})}
        locationFilter={filters.location}
        onLocationChange={(value) => setFilters({...filters, location: value})}
      />

      <SparePartTable data={filteredData} />
    </div>
  )
}