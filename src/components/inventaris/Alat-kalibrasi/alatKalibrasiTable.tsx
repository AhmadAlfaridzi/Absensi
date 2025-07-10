'use client'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { AlatKalibrasi } from "@/types/inventory"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const columns: ColumnDef<AlatKalibrasi>[] = [
  {
    accessorKey: "id",
    header: "ID Alat",
    cell: ({ row }) => (
      <Link 
        href={`/inventaris/alat-kalibrasi/${row.original.id}`}
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