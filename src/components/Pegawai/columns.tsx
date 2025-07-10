// src/components/Pegawai/columns.ts
import { ColumnDef } from "@tanstack/react-table"
import { UserProfile } from "@/types/user"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<UserProfile>[] = [
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
    accessorKey: "position",
    header: "Jabatan"
  },
  {
    accessorKey: "department",
    header: "Departemen"
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role")
      return (
        <Badge variant="outline" className="capitalize">
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
        <Badge 
          variant="outline" 
          className={
            status === 'Aktif' ? 'bg-green-800 border-green-600' :
            status === 'Nonaktif' ? 'bg-red-800 border-red-600' :
            'bg-yellow-800 border-yellow-600'
          }
        >
          {String(status)}
        </Badge>
      )
    }
  }
]