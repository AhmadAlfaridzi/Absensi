declare module '@/types/user' {
  export type UserRole = 'admin' | 'Owner' | 'Direktur' | 'Manajer' | 'karyawan' | 'Teknisi';

  //data user
  export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role: UserRole;
    position?: string;
    department?: string;
    image?: string;
  }

 export type AttendanceStatus = 'Tepat Waktu' | 'Terlambat' |'Pulang Cepat'};

 // data absensi
  export interface AttendanceRecord {
    id: string;
    userId: string;
    date: string;
    clockIn: string;
    clockOut: string | null;
    status: AttendanceStatus;
    photoIn?: string | null;
    photoOut?: string | null;
    employee?: { 
      id: string;
      name: string;
      department: string;
      position: string;
    };
  }
