'use client'
import { ColumnDef } from "@tanstack/react-table"
import { SparePart } from "@/types/inventory"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { GenericTable } from "@/components/Common/genericTable"

export const columns: ColumnDef<SparePart>[] = [
  {
    accessorKey: "id",
    header: "ID Sparepart",
    cell: ({ row }) => (
      <Link 
        href={`/inventaris/sparepart/${row.original.id}`}
        className="font-medium text-blue-300 hover:underline"
      >
        {row.getValue("id")}
      </Link>
    )
  },
  {
    accessorKey: "nama",
    header: "Nama Sparepart",
    cell: ({ row }) => <span className="text-gray-100">{row.getValue("nama")}</span>
  },
  {
    accessorKey: "kode",
    header: "Kode",
    cell: ({ row }) => <span className="text-gray-300">{row.getValue("kode")}</span>
  },
  {
    accessorKey: "jumlah",
    header: "Jumlah",
    cell: ({ row }) => <span className="text-gray-300">{row.getValue("jumlah")}</span>
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
            status === 'Tersedia' ? 'border-green-600 text-green-600' :
            status === 'Dipesan' ? 'border-yellow-600 text-yellow-600' :
            'border-red-600 text-red-600'
          }
        >
          {String(status)}
        </Badge>
      )
    }
  }
]

export function SparePartTable({ data }: { data: SparePart[] }) {
  return (
    <GenericTable
      columns={columns}
      data={data}
      showPagination={true}
      pageSize={8}
      noDataMessage="Tidak ada data spare part"
    />
  )
}