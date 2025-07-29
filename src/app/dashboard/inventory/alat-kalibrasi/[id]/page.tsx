'use client'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { dummyAlatKalibrasi } from '@/data/alatKalibrasi'

export default function DetailAlatKalibrasi({ params }: { params: { id: string } }) {
  // @ts-ignore - Sementara ignore warning untuk kompatibilitas
  const { id } = params
  const data = dummyAlatKalibrasi.find(item => item.id === id)

  if (!data) return notFound()

  return (
    <div className="p-6 bg-[#1e1e1e] text-gray-100">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/inventaris/alat-kalibrasi" className="flex items-center gap-1 text-gray-300">
            <ChevronLeft className="h-4 w-4" />
            Kembali
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-[#2e2e2e] p-6 rounded-md">
            <h1 className="text-2xl font-bold mb-4">{data.nama_alat}</h1>
            <div className="grid grid-cols-2 gap-4">
              {/* ... konten lainnya sama seperti sebelumnya ... */}
            </div>
          </div>
        </div>

        {data.foto && (
          <div className="bg-[#2e2e2e] p-6 rounded-md h-fit">
            <Image 
              src={data.foto} 
              alt={data.nama_alat}
              width={500}
              height={500}
              className="rounded-md object-cover w-full h-full"
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  )
}