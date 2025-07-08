import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DataRangePicker } from './dataRangePicker'
import { DateRange } from 'react-day-picker'

interface FilterControlProps {
  dateRange?: DateRange
  onDateSelect: (range?: DateRange) => void
  filters: {
    name: string
    department: string
    status: string
  }
  onFilterChange: (name: string, value: string) => void
}

export function FilterControl({ dateRange, onDateSelect, filters, onFilterChange }: FilterControlProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Rentang Tanggal</label>
        <DataRangePicker 
          dateRange={dateRange}
          onSelect={onDateSelect}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Nama Karyawan</label>
        <Input
          name="name"
          placeholder="Cari nama..."
          value={filters.name}
          onChange={(e) => onFilterChange('name', e.target.value)}
          className="bg-[#1e1e1e] border-[#2e2e2e] focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Departemen</label>
        <Input
          name="department"
          placeholder="Filter departemen..."
          value={filters.department}
          onChange={(e) => onFilterChange('department', e.target.value)}
          className="bg-[#1e1e1e] border-[#2e2e2e] focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange('status', value)}
        >
          <SelectTrigger className="w-full bg-[#1e1e1e] border-[#2e2e2e]">
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1e1e1e] border-[#2e2e2e]">
            <SelectItem value="all" className="hover:bg-[#252525]">Semua Status</SelectItem>
            <SelectItem value="Tepat Waktu" className="hover:bg-[#252525]">
              <span className="text-emerald-400">Tepat Waktu</span>
            </SelectItem>
            <SelectItem value="Terlambat" className="hover:bg-[#252525]">
              <span className="text-amber-400">Terlambat</span>
            </SelectItem>
            <SelectItem value="Pulang Cepat" className="hover:bg-[#252525]">
              <span className="text-orange-300">Pulang Cepat</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}