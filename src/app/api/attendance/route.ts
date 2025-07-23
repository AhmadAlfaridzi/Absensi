import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { dummyAttendance } from '@/data/attendence'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    )
  }

  try {
    // Coba ambil dari database
    const attendances = await prisma.attendance.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })

    // Jika ada data di database, kembalikan
    if (attendances.length > 0) {
      return NextResponse.json(attendances)
    }

    // Jika tidak ada data di database, kembalikan data dummy yang difilter
    const filteredDummy = dummyAttendance
      .filter(att => att.employee.id === userId)
      .map(att => ({
        id: att.id,
        userId: att.employee.id,
        date: att.date.split('T')[0],
        clockIn: att.clockIn,
        clockOut: att.clockOut || null,
        status: convertStatus(att.status),
        photoIn: att.photoIn || null,
        photoOut: att.photoOut || null
      }))

    return NextResponse.json(filteredDummy)
  } catch (error) {
     console.error('Error fetching attendance data:', error)
  return NextResponse.json(
    { error: 'Failed to fetch attendance data' },
    { status: 500 }
  )
}
}

function convertStatus(status: string) {
  switch(status) {
    case 'Tepat Waktu': return 'TEPAT_WAKTU'
    case 'Terlambat': return 'TERLAMBAT'
    case 'Pulang Cepat': return 'PULANG_CEPAT'
    default: return 'TEPAT_WAKTU'
  }
}