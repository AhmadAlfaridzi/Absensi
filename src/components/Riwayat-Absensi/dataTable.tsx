'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { GenericTable } from "@/components/Common/genericTable"
import { AttendanceRecord } from "@/types/attendance"

type ProcessedAttendanceRecord = AttendanceRecord & {
  onPhotoClick?: (photoUrl: string, type: string) => void
}

const columns: ColumnDef<ProcessedAttendanceRecord>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => (
      <span className="text-gray-100">
        {format(new Date(row.getValue("date")), 'dd MMM yyyy', { locale: id })}
      </span>
    )
  },
  {
    accessorKey: "employee.name",
    header: "Nama",
    cell: ({ row }) => (
      <span className="text-gray-100">{row.original.employee.name}</span>
    )
  },
  {
    accessorKey: "employee.department",
    header: "Departemen",
    cell: ({ row }) => (
      <span className="text-gray-300">{row.original.employee.department}</span>
    )
  },
  {
    accessorKey: "clockIn",
    header: "Masuk",
    cell: ({ row }) => (
      <span className="text-gray-100">{row.getValue("clockIn")}</span>
    )
  },
  {
    accessorKey: "clockOut",
    header: "Pulang",
    cell: ({ row }) => (
      <span className="text-gray-300">
        {row.getValue("clockOut") || '-'}
      </span>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <Badge 
          variant="outline"
          className={
            status === 'Tepat Waktu' ? 'border-green-500 text-emerald-400' :
            status === 'Terlambat' ? 'border-yellow-500 text-amber-400' :
            'border-orange-500 text-orange-300'
          }
        >
          {String(status)}
        </Badge>
      )
    }
  },
  {
    id: "foto",
    header: "Foto",
    cell: ({ row }) => {
      // 2. Tambahkan type assertion untuk onPhotoClick
      const onPhotoClick = row.original.onPhotoClick!
      return (
        <div className="flex gap-2">
          {row.original.photoIn && (
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => onPhotoClick(row.original.photoIn!, 'Masuk')}
              className="text-blue-300 hover:text-blue-300 hover:bg-[#252525]"
            >
              <Camera className="h-4 w-4 mr-2" />
              Masuk
            </Button>
          )}
          {row.original.photoOut && (
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => onPhotoClick(row.original.photoOut!, 'Pulang')}
              className="text-blue-300 hover:text-blue-300 hover:bg-[#252525]"
            >
              <Camera className="h-4 w-4 mr-2" />
              Pulang
            </Button>
          )}
        </div>
      )
    }
  }
]

interface DataTableProps {
  data: AttendanceRecord[]
  loading: boolean
  onPhotoClick: (photoUrl: string, type: string) => void
}

export function DataTable({ data, loading, onPhotoClick }: DataTableProps) {
  // onPhotoClick
  const processedData: ProcessedAttendanceRecord[] = data.map(record => ({
    ...record,
    onPhotoClick
  }))


  return (
    <GenericTable<ProcessedAttendanceRecord>
      columns={columns}
      data={processedData}
      isLoading={loading}
      showPagination={true}
      pageSize={8}
      noDataMessage="Tidak ada data absensi"
      // 4. Pastikan GenericTable menerima props ini
      customHeaderClass="bg-[#1e1e1e]"
      customRowClass="hover:bg-[#1f1f1f] border-[#2e2e2e]"
    />
  )
}