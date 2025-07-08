'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Camera } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { AttendanceRecord } from '@/types/attendance'

interface DataTableProps {
  data: AttendanceRecord[]
  loading: boolean
  onPhotoClick: (photoUrl: string, type: string) => void
}

export function DataTable({ data, loading, onPhotoClick }: DataTableProps) {
  return (
    <div className="rounded-md border border-[#2e2e2e] overflow-hidden">
      <Table>
        <TableHeader className="bg-[#1e1e1e]">
          <TableRow>
            <TableHead className="text-blue-300">Tanggal</TableHead>
            <TableHead className="text-blue-300">Nama</TableHead>
            <TableHead className="text-blue-300">Departemen</TableHead>
            <TableHead className="text-blue-300">Masuk</TableHead>
            <TableHead className="text-blue-300">Pulang</TableHead>
            <TableHead className="text-blue-300">Status</TableHead>
            <TableHead className="text-blue-300">Foto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-[#2e2e2e] bg-[#1e1e1e]">
                {[...Array(7)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full bg-[#333]" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow className="border-[#2e2e2e] bg-[#1e1e1e]">
              <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                Tidak ada data yang ditemukan
              </TableCell>
            </TableRow>
          ) : (
            data.map((record) => (
              <TableRow 
                key={record.id} 
                className="border-[#2e2e2e] hover:bg-[#1f1f1f]"
              >
                <TableCell>
                  {format(new Date(record.date), 'dd MMM yyyy', { locale: id })}
                </TableCell>
                <TableCell>{record.employee.name}</TableCell>
                <TableCell>{record.employee.department}</TableCell>
                <TableCell>{record.clockIn}</TableCell>
                <TableCell>{record.clockOut || '-'}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      record.status === 'Tepat Waktu' ? 'border-green-500 text-emerald-400' :
                      record.status === 'Terlambat' ? 'border-yellow-500 text-amber-400' :
                      'border-orange-500 text-orange-300'
                    }
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  {record.photoIn && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onPhotoClick(record.photoIn!, 'Masuk')}
                      className="text-blue-300 hover:text-blue-300 hover:bg-[#252525]"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Masuk
                    </Button>
                  )}
                  {record.photoOut && (
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => onPhotoClick(record.photoOut!, 'Pulang')}
                      className="text-blue-300 hover:text-blue-300 hover:bg-[#252525]"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Pulang
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}