'use client'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { SparePart } from "@/types/inventory"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
          className={
            status === 'Tersedia' ? 'bg-green-800 border-green-600' :
            status === 'Dipesan' ? 'bg-yellow-800 border-yellow-600' :
            'bg-red-800 border-red-600'
          }
        >
          {String(status)}
        </Badge>
      )
    }
  }
]

export function SparePartTable({ data }: { data: SparePart[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border border-[#2e2e2e]">
      <Table>
        <TableHeader className="bg-[#1e1e1e]">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="text-blue-300">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow 
                key={row.id} 
                className="border-[#2e2e2e] hover:bg-[#2e2e2e]"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-gray-400">
                Tidak ada data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}