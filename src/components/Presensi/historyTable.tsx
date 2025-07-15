'use client'
import { ColumnDef } from "@tanstack/react-table"
import { GenericTable } from "@/components/Common/genericTable"
import { Badge } from "@/components/ui/badge"

type AttendanceHistory = {
  date: string
  clockIn: string
  clockOut: string | null
  status: 'Tepat Waktu' | 'Terlambat' | 'Pulang Cepat'
}

const columns: ColumnDef<AttendanceHistory>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => <span className="text-white">{row.getValue("date")}</span>
  },
  {
    accessorKey: "clockIn",
    header: "Masuk",
    cell: ({ row }) => <span className="text-white">{row.getValue("clockIn")}</span>
  },
  {
    accessorKey: "clockOut",
    header: "Pulang",
    cell: ({ row }) => (
      <span className="text-white">{row.getValue("clockOut") || '-'}</span>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <Badge
          className={
            status === 'Tepat Waktu' ? 'bg-green-900 text-green-300' :
            status === 'Terlambat' ? 'bg-yellow-900 text-yellow-300' :
            'bg-orange-900 text-orange-300'
          }
        >
          {String(status)}
        </Badge>
      )
    }
  }
]

export default function HistoryTable({ 
  data,
  isLoading 
}: { 
  data: AttendanceHistory[],
  isLoading?: boolean 
}) {
  return (
    <GenericTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      showPagination={true}
      pageSize={5}
      noDataMessage="Tidak ada riwayat presensi"
      customHeaderClass="bg-[#333333]"
      customRowClass="hover:bg-[#333333] border-[#333333]"
    />
  )
}