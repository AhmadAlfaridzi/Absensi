'use client'
import { useAuth } from '@/context/authContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="p-6 bg-[#1e1e1e] text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>
      
      <div className="max-w-lg space-y-4">
        <div className="space-y-2">
          <Label>Nama Lengkap</Label>
          <Input value={user?.name} disabled />
        </div>
        
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user?.email} disabled />
        </div>
        
  {/*         <div className="space-y-2">
          <Label>Nomor Telepon</Label>
          <Input value={user?.phone || ''} />
        </div> */}
        
        <Button className="mt-4">Simpan Perubahan</Button>
      </div>
    </div>
  )
}
