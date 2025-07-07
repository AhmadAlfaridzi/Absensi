import { cookies } from 'next/headers'

export async function getServerUser() {
  const cookieStore = await cookies()
  const userData = cookieStore.get('user')?.value
  
  if (!userData) return null
  
  try {
    return JSON.parse(userData)
  } catch (error) {
    console.error('Failed to parse user data:', error)
    return null
  }
}