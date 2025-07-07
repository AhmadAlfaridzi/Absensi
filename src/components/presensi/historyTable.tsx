import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

type AttendanceHistory = {
  date: string
  clockIn: string
  clockOut: string
  status: 'Tepat Waktu' | 'Terlambat' | 'Pulang Cepat'
}

type HistoryTableProps = {
  data: AttendanceHistory[]
}

export default function HistoryTable({ data }: HistoryTableProps) {
  return (
    <Table className="border-[#333333]">
      <TableHeader className="bg-[#333333]">
        <TableRow>
          <TableHead className="text-white">Tanggal</TableHead>
          <TableHead className="text-white">Masuk</TableHead>
          <TableHead className="text-white">Pulang</TableHead>
          <TableHead className="text-white">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-[#333333]">
        {data.map((item, index) => (
          <TableRow key={index} className="hover:bg-[#333333] border-[#333333]">
            <TableCell className="text-white">{item.date}</TableCell>
            <TableCell className="text-white">{item.clockIn}</TableCell>
            <TableCell className="text-white">{item.clockOut}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.status === 'Tepat Waktu' 
                  ? 'bg-green-900 text-green-300' 
                  : 'bg-yellow-900 text-yellow-300'
              }`}>
                {item.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}