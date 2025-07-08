import { AttendanceRecord } from '@/types/attendance'
import { subDays } from 'date-fns'

// const generateEmployee = (id: string, name: string, dept: string, position: string) => ({
//   id, name, department: dept, position
// })

export const dummyAttendance: AttendanceRecord[] = [
  {
      id: '1',
      date: new Date().toISOString(),
      clockIn: '08:00',
      clockOut: '17:00',
      status: 'Tepat Waktu',
      employee: {
        id: 'EMP001',
        name: 'John Doe',
        department: 'IT',
        position: 'Developer'
      },
      photoIn: '/images/placeholder-user.jpg',
      photoOut: '/images/placeholder-user.jpg'
    },
    {
      id: '2',
      date: subDays(new Date(), 1).toISOString(),
      clockIn: '08:30',
      clockOut: '16:30',
      status: 'Terlambat',
      employee: {
        id: 'EMP002',
        name: 'Jane Smith',
        department: 'HR',
        position: 'Manager'
      },
      photoIn: '/images/placeholder-user.jpg',
      photoOut: '/images/placeholder-user.jpg'
    },
    {
      id: '3',
      date: subDays(new Date(), 2).toISOString(),
      clockIn: '08:00',
      clockOut: '16:00',
      status: 'Pulang Cepat',
      employee: {
        id: 'EMP003',
        name: 'Bob Johnson',
        department: 'Finance',
        position: 'Analyst'
      },
      photoIn: '/images/placeholder-user.jpg',
      photoOut: null
    }
  ]