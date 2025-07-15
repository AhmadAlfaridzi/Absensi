import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
      const body = await request.json()
    const { username, password } = body
    
    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'Username harus disertakan dan berupa string' },
        { status: 400 }
      )
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password harus disertakan dan berupa string' },
        { status: 400 }
      )
    }
    
   const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username.trim(),
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        passwordHash: true,
        status: true,
        position: true,
        department:true,
        image:true,
      }
    })

     if (!user) {
      await bcrypt.compare(password, '$2a$10$fakehashforprotection')
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      )
    }

     const passwordValid = await bcrypt.compare(password, user.passwordHash)
    
     if (!passwordValid) {
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      )
    }
    
     if (user.status !== 'AKTIF') {
      return NextResponse.json(
        { error: 'Akun Anda tidak aktif. Silakan hubungi admin.' },
        { status: 403 }
      )
    }

return NextResponse.json({
  success: true,
  data: {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role.toUpperCase(), 
    position: user.position,
    department: user.department,
    image: user.image
  }
})

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem. Silakan coba lagi nanti.' },
      { status: 500 }
    )
  }
}
