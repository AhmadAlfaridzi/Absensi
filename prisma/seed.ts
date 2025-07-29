import { Role, UserStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { dummyPegawai } from '../src/data/users'
import prisma from '../src/lib/prisma'
import { attendanceService } from '../src/components/Presensi/attendanceService'

// const prisma = new PrismaClient()
const SALT_ROUNDS = 10

function toRole(role: string): Role {
  const roleMap: Record<string, Role> = {
    admin: Role.ADMIN,
    owner: Role.OWNER,
    direktur: Role.DIREKTUR,
    manajer: Role.MANAJER,
    teknisi: Role.TEKNISI,
    karyawan: Role.KARYAWAN
  };
  const normalizedRole = role.trim().toUpperCase();
  return roleMap[normalizedRole.toLowerCase()] || Role.KARYAWAN;
}


function toUserStatus(status?: string): UserStatus {
  if (!status) {
    console.warn('Status tidak ditemukan, menggunakan default AKTIF');
    return UserStatus.AKTIF;
  }

  const statusStr = String(status).trim().toUpperCase();
  
  if (statusStr.includes('TANGGUH')) return UserStatus.DITANGGUHKAN;
  if (statusStr.includes('NON') || statusStr.includes('TIDAK')) {
    return UserStatus.NONAKTIF;
  }
  
  return UserStatus.AKTIF;
}

async function main() {
  try {
    console.log('🌱 Starting seed process...')
    
    // 1. Clean up existing data
    console.log('🧹 Cleaning up old data...')
    await prisma.attendance.deleteMany()
    await prisma.user.deleteMany()

    // 2. Seed users
    console.log('👥 Seeding users...')
    for (const user of dummyPegawai) {
      try {
        const hashedPassword = await bcrypt.hash(`${user.username}123`, SALT_ROUNDS)
        await prisma.user.create({
          data: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone || null,
            address: user.address || null,
            birthDate: user.birthDate || null,
            joinDate: user.joinDate,
            role: toRole(user.role),
            position: user.position,
            department: user.department,
            image: user.image || null,
            status: toUserStatus(user.status),
            passwordHash: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        })
      } catch (error) {
        console.error(`Failed to create user ${user.id}:`, error)
      }
    }

    // 3. Seed attendances
    console.log('⏱️ Seeding attendances...')
    await attendanceService.seedDummyAttendances()

    console.log('🎉 Seeding completed successfully!')
  } catch (error) {
    console.error('💥 Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()