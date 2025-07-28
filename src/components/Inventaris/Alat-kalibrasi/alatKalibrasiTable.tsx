'use client'

import { ColumnDef } from "@tanstack/react-table"
import { AlatKalibrasi } from "@/types/inventory"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { GenericTable } from "@/components/Common/genericTable"

export const columns: ColumnDef<AlatKalibrasi>[] = [
  {
    accessorKey: "id",
    header: "ID Alat",
    cell: ({ row }) => (
      <Link 
        href={`/dashboard/inventory/alat-kalibrasi/${row.original.id}`}
        className="font-medium text-blue-300 hover:underline"
      >
        {row.getValue("id")}
      </Link>
    )
  },
  {
    accessorKey: "nama_alat",
    header: "Nama Alat",
    cell: ({ row }) => <span className="text-gray-100">{row.getValue("nama_alat")}</span>
  },
  {
    accessorKey: "merek_model",
    header: "Merek/Model",
    cell: ({ row }) => <span className="text-gray-300">{row.getValue("merek_model")}</span>
  },
  {
    accessorKey: "nomor_seri",
    header: "Nomor Seri",
    cell: ({ row }) => <span className="text-gray-300">{row.getValue("nomor_seri")}</span>
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <Badge 
          className={
            status === 'Aktif' ? 'bg-green-800 border-green-600' :
            status === 'Dalam Kalibrasi' ? 'bg-yellow-800 border-yellow-600' :
            status === 'Rusak' ? 'bg-red-800 border-red-600' :
            'bg-gray-800 border-gray-600'
          }
        >
          {String(status)}
        </Badge>
      )
    }
  }
]

export function AlatKalibrasiTable({ data }: { data: AlatKalibrasi[] }) {
  return (
    <GenericTable
      columns={columns}
      data={data}
      showPagination={true}
      pageSize={8}
      noDataMessage="Tidak ada data alat kalibrasi"
    />
  )
}