// src/components/Pegawai/UserFilter.tsx
'use client'
import { Input } from '@/components/ui/input'
import { UserRole, UserStatus } from '@/types/user'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface UserFilterProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  roleFilter: UserRole | 'all'
  onRoleChange: (value: UserRole | 'all') => void
  departmentFilter: string
  onDepartmentChange: (value: string) => void
  statusFilter: UserStatus | 'all'
  onStatusChange: (value: UserStatus | 'all') => void
}

export function UserFilter({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  departmentFilter,
  onDepartmentChange,
  statusFilter,
  onStatusChange,
}: UserFilterProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Cari Pegawai</label>
        <Input
          placeholder="Nama/email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Role</label>
        <Select
          value={roleFilter}
          onValueChange={onRoleChange}
        >
          <SelectTrigger className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100">
            <SelectValue placeholder="Semua Role" />
          </SelectTrigger>
          <SelectContent className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100">
            <SelectItem value="all">Semua Role</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="Owner">Owner</SelectItem>
            <SelectItem value="Direktur">Direktur</SelectItem>
            <SelectItem value="Manajer">Manajer</SelectItem>
            <SelectItem value="karyawan">Karyawan</SelectItem>
            <SelectItem value="Teknisi">Teknisi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Departemen</label>
        <Input
          placeholder="Filter departemen..."
          value={departmentFilter}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Status</label>
        <Select
          value={statusFilter}
          onValueChange={onStatusChange}
        >
          <SelectTrigger className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1e1e1e] border-[#2e2e2e] text-gray-100">
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="Aktif">Aktif</SelectItem>
            <SelectItem value="Nonaktif">Nonaktif</SelectItem>
            <SelectItem value="Ditangguhkan">Ditangguhkan</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}