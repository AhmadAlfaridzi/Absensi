import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { userId, type, photo, barcode } = await req.json()

    // Validasi user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      )
    }

    // Validasi barcode
    if (barcode) {
      const validBarcode = await prisma.barcode.findFirst({
        where: { 
          code: barcode,
          userId: user.id 
        }
      })
      
      if (!validBarcode) {
        return NextResponse.json(
          { error: 'Barcode tidak valid' },
          { status: 400 }
        )
      }
    }

    // Data absensi
    const attendanceData = {
      userId: user.id,
      date: new Date().toISOString().split('T')[0],
      status: 'TEPAT_WAKTU' as const,
      ...(type === 'masuk' ? {
        clockIn: new Date().toISOString(),
        ...(photo && { photoIn: photo })
      } : {
        clockOut: new Date().toISOString(),
        ...(photo && { photoOut: photo })
      })
    }

    // Simpan absensi
    const attendance = await prisma.attendance.create({
      data: attendanceData,
      include: {
        user: {
          select: {
            name: true,
            department: true,
            position: true
          }
        }
      }
    })

    return NextResponse.json(attendance)

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}