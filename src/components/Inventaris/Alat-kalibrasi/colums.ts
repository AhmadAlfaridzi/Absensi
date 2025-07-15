// import { ColumnDef } from '@tanstack/react-table'
// import { AlatKalibrasi } from '@/types/inventory'
// import { Badge } from '@/components/ui/badge'
// import Link from 'next/link'

// export const columns: ColumnDef<AlatKalibrasi>[] = [
//   {
//     accessorKey: "id",
//     header: "ID Alat",
//   },
//   {
//     accessorKey: "nama_alat",
//     header: "Nama Alat",
//     cell: ({ row }) => (
//         <Link href={`/inventaris/alat-kalibrasi/${row.original.id}`}
//             className="font-medium text-blue-600 hover:underline" >
//             {row.getValue("nama_alat")} 
//             >
//         </Link>
//     )
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.getValue("status") as 'Aktif' | 'Tidak Aktif' | 'Dalam Kalibrasi' | 'Rusak';
//       const variant = 
//         status === 'Aktif' ? 'success' : 
//         status === 'Dalam Kalibrasi' ? 'warning' : 
//         'destructive';
//       return <Badge variant={variant}>{status}</Badge>;
//     }
//   }
// ]