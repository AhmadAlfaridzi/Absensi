'use client'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/authcontext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface UserNavProps {
  image?: string 
}

export function UserNav({ image }: UserNavProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) return null

  // Role untuk setiap user
  const getRoleSpecificItems = () => {
    const items = [
      <DropdownMenuItem key="profile" onClick={() => router.push('/profile')}>
        Profile
      </DropdownMenuItem>
    ]

    //mengimpor UserRole
    if (user.role === 'admin' || user.role === 'Owner') {
      items.push(
        <DropdownMenuItem key="settings" onClick={() => router.push('/settings')}>
          System Settings
        </DropdownMenuItem>
      )
    }

    if (user.role === 'Direktur') {
      items.push(
        <DropdownMenuItem key="reports" onClick={() => router.push('/reports')}>
          Management Reports
        </DropdownMenuItem>
      )
    }

    return items
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {/* Gunakan prop image atau fallback ke string kosong */}
            <AvatarImage src={image || ''} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email || user.username}
              <span className="block capitalize text-green-600">{user.role.toLowerCase()}</span>
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {getRoleSpecificItems()}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logout()
            router.push('/login')
          }}
          className="text-red-600 focus:text-red-600"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}