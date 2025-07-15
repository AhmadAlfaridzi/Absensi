import { PrismaClient, Role, UserStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { dummyPegawai } from '../src/data/users'

const prisma = new PrismaClient()
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
    console.log('Memulai proses seeding...');
    
    // Validasi data dummy sebelum memproses
    const validatedUsers = dummyPegawai.filter(user => {
      if (!user.username) {
        console.error('User tanpa username ditemukan:', user);
        return false;
      }
      return true;
    });

    if (validatedUsers.length !== dummyPegawai.length) {
      console.warn(`Beberapa user tidak valid: ${dummyPegawai.length - validatedUsers.length} dari ${dummyPegawai.length}`);
    }

    console.log('Menghapus data user lama...');
    await prisma.user.deleteMany();

    console.log('Membuat user baru...');
    
    for (const user of validatedUsers) {
      try {
        // Pastikan username ada dan valid
        const username = String(user.username).trim();
        if (!username) {
          console.error('Username kosong untuk user:', user.id);
          continue;
        }

        const plainPassword = `${username}123`; // Gunakan username yang sudah divalidasi
        const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);

        await prisma.user.create({
          data: {
            id: user.id,
            name: user.name,
            username: username,
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
            lastLogin: user.lastLogin ? new Date(user.lastLogin) : null,
            passwordHash: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });

        console.log(`User ${username} berhasil dibuat`);
      } catch (error) {
        console.error(`Gagal membuat user ${user.id}:`, error);
      }
    }

    console.log(`✅ Berhasil membuat ${validatedUsers.length} user`);
  } catch (error) {
    console.error('❌ Seeding gagal:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();