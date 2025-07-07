export type StatusFilter = 'all' | 'Aktif' | 'Tidak Aktif' | 'Dalam Kalibrasi' | 'Rusak'

export interface AlatKalibrasi {
  id: string
  nama_alat: string
  merek_model: string
  nomor_seri: string
  rentang_pengukuran: string
  kelas_akurasi: string
  tanggal_kalibrasi: string
  tanggal_kadaluarsa: string
  id_lokasi: string
  status: 'Aktif' | 'Tidak Aktif' | 'Dalam Kalibrasi' | 'Rusak'
  foto?: string
}

export interface SparePart {
  id: string
  nama: string
  kode: string
  jumlah: number
  lokasi: string
  supplier?: string
  foto?: string
}