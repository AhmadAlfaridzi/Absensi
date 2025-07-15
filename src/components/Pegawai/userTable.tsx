'use client'
import { ColumnDef } from "@tanstack/react-table"
import { UserProfile } from "@/types/user"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { GenericTable } from "@/components/Common/genericTable"

const columns: ColumnDef<UserProfile>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => (
      <Link 
        href={`/dashboard/pegawai/${row.original.id}`}
        className="font-medium text-blue-300 hover:underline"
      >
        {row.getValue("name")}
      </Link>
    )
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role")
      return (
        <Badge variant="outline" className={
          role === 'ADMIN' ? 'border-purple-600 text-purple-600' :
          role === 'OWNER' ? 'border-red-600 text-red-600' :
          'border-gray-600 text-gray-600'
        }>
          {String(role)}
        </Badge>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <Badge variant="outline" className={
          status === 'AKTIF' ? 'border-green-600 text-green-600' :
          status === 'NONAKTIF' ? 'border-red-600 text-red-600' :
          'border-yellow-600 text-yellow-600'
        }>
          {String(status)}
        </Badge>
      )
    }
  }
]

export function UserTable({ data }: { data: UserProfile[] }) {
  return (
    <GenericTable
      columns={columns}
      data={data}
      showPagination={true}
      pageSize={8}
      noDataMessage="Tidak ada data pegawai"
    />
  )
}