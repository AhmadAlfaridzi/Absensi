'use client'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { dummySparePart } from '@/data/sparePart'

export default function DetailSparePart({ params }: { params: { id: string } }) {
  const data = dummySparePart.find(item => item.id === params.id)

  if (!data) return notFound()

  return (
    <div className="p-6 bg-[#1e1e1e] text-gray-100">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/inventaris/sparepart" className="flex items-center gap-1 text-gray-300">
            <ChevronLeft className="h-4 w-4" />
            Kembali
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-[#2e2e2e] p-6 rounded-md">
            <h1 className="text-2xl font-bold mb-4">{data.nama}</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Kode</p>
                <p className="font-medium">{data.kode}</p>
              </div>
              <div>
                <p className="text-gray-400">Jumlah</p>
                <p className="font-medium">{data.jumlah}</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <p className="font-medium">{data.status}</p>
              </div>
              <div>
                <p className="text-gray-400">Lokasi</p>
                <p className="font-medium">{data.lokasi}</p>
              </div>
              {data.supplier && (
                <div>
                  <p className="text-gray-400">Supplier</p>
                  <p className="font-medium">{data.supplier}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {data.foto && (
          <div className="bg-[#2e2e2e] p-6 rounded-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Foto Sparepart</h2>
            <div className="relative aspect-square">
              <Image 
                src={data.foto} 
                alt={data.nama}
                className="rounded-md object-cover w-full h-full"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}