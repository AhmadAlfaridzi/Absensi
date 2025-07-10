import { SparePart } from '@/types/inventory'

export const dummySparePart: SparePart[] = [
  {
    id: 'SP-001',
    nama: 'Fuse 10A',
    kode: 'FUSE-10A',
    jumlah: 25,
    lokasi: 'Gudang A',
    supplier: 'ElectroParts',
    status: 'Tersedia',
    foto: '/images/fuse.jpg'
  },
  {
    id: 'SP-002',
    nama: 'Kabel Probe',
    kode: 'KBL-001',
    jumlah: 0,
    lokasi: 'Gudang B',
    supplier: 'CableMaster',
    status: 'Habis',
    foto: '/images/probe.jpg'
  },
  {
    id: 'SP-003',
    nama: 'Baterai 9V',
    kode: 'BTR-9V',
    jumlah: 50,
    lokasi: 'Gudang C',
    supplier: 'PowerCell',
    status: 'Tersedia'
  }
]