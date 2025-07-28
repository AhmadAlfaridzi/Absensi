'use client'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronLeft} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { dummyAlatKalibrasi } from '@/data/alatKalibrasi'

interface ParamsType {
  id: string
}

export default function DetailAlatKalibrasi({ params }: { params: ParamsType }) {
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
              <div>
                <p className="text-gray-400">Merek/Model</p>
                <p className="font-medium">{data.merek_model}</p>
              </div>
              <div>
                <p className="text-gray-400">Nomor Seri</p>
                <p className="font-medium">{data.nomor_seri}</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <p className="font-medium">{data.status}</p>
              </div>
              <div>
                <p className="text-gray-400">Lokasi</p>
                <p className="font-medium">{data.id_lokasi}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#2e2e2e] p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Spesifikasi Teknis</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Rentang Pengukuran</p>
                <p className="font-medium">{data.rentang_pengukuran}</p>
              </div>
              <div>
                <p className="text-gray-400">Kelas Akurasi</p>
                <p className="font-medium">{data.kelas_akurasi}</p>
              </div>
              <div>
                <p className="text-gray-400">Tanggal Kalibrasi</p>
                <p className="font-medium">{data.tanggal_kalibrasi}</p>
              </div>
              <div>
                <p className="text-gray-400">Tanggal Kadaluarsa</p>
                <p className="font-medium">{data.tanggal_kadaluarsa}</p>
              </div>
            </div>
          </div>
        </div>

        {data.foto && (
          <div className="bg-[#2e2e2e] p-6 rounded-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Foto Alat</h2>
            <div className="relative aspect-square">
              <Image 
                src={data.foto} 
                alt={data.nama_alat}
                width={500}
                height={500}
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