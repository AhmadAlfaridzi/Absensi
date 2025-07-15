'use client'
import { Input } from '@/components/ui/input'
// import { DataRangePicker } from '@/components/Common/dataRangePicker'
import { SparePartStatusFilter } from '@/types/inventory'
// import { DateRange } from 'react-day-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface SparePartFilterProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: SparePartStatusFilter
  onStatusChange: (value: SparePartStatusFilter) => void
  locationFilter: string
  onLocationChange: (value: string) => void
}

export function SparePartFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  locationFilter,
  onLocationChange,
}: SparePartFilterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Cari Sparepart</label>
        <Input
          placeholder="Nama/kode sparepart..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Status</label>
        <Select
          value={statusFilter}
          onValueChange={(value) => onStatusChange(value as SparePartStatusFilter)}
        >
          <SelectTrigger className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100">
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100">
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="Tersedia">Tersedia</SelectItem>
            <SelectItem value="Habis">Habis</SelectItem>
            <SelectItem value="Dipesan">Dipesan</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Lokasi</label>
        <Input
          placeholder="Filter lokasi..."
          value={locationFilter}
          onChange={(e) => onLocationChange(e.target.value)}
          className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100"
        />
      </div>
    </div>
  )
}