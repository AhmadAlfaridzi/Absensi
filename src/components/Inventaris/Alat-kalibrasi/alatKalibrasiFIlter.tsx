'use client'
import { Input } from '@/components/ui/input'
import { DataRangePicker } from '@/components/Common/dataRangePicker'
import { StatusFilter } from '@/types/inventory'
import { DateRange } from 'react-day-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AlatKalibrasiFilterProps {
  dateRange?: DateRange
  onDateChange: (range?: DateRange) => void
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  locationFilter: string
  onLocationChange: (value: string) => void
}

export function AlatKalibrasiFilter({
  dateRange,
  onDateChange,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  locationFilter,
  onLocationChange,
}: AlatKalibrasiFilterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Rentang Tanggal Kalibrasi</label>
        <DataRangePicker
          dateRange={dateRange}
          onSelect={onDateChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Cari Alat</label>
        <Input
          placeholder="Nama alat/merek..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Status</label>
        <Select
          value={statusFilter}
          onValueChange={(value) => onStatusChange(value as StatusFilter)}
        >
          <SelectTrigger className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100">
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100">
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="Aktif">Aktif</SelectItem>
            <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
            <SelectItem value="Dalam Kalibrasi">Dalam Kalibrasi</SelectItem>
            <SelectItem value="Rusak">Rusak</SelectItem>
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