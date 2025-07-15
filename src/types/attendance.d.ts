export interface Employee {
  id: string
  name: string
  department: string
  position: string
}

export interface AttendanceRecord {
  id: string
  date: string
  clockIn: string
  clockOut: string | null
  status: 'Tepat Waktu' | 'Terlambat' | 'Pulang Cepat'
  employee: Employee
  photoIn: string | null
  photoOut: string | null
}