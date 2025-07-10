import { AlatKalibrasi } from '@/types/inventory'

export const dummyAlatKalibrasi: AlatKalibrasi[] = [
  {
    id: 'AK-001',
    nama_alat: 'Multimeter Digital',
    merek_model: 'Fluke 87V',
    nomor_seri: 'FLK-2023-001',
    rentang_pengukuran: '0-1000V DC, 0-10A DC',
    kelas_akurasi: '0.5%',
    tanggal_kalibrasi: '2023-06-15',
    tanggal_kadaluarsa: '2024-06-15',
    id_lokasi: 'LAB-01',
    status: 'Aktif',
    foto: '/images/multimeter.jpg'
  },
  {
    id: 'AK-002',
    nama_alat: 'Termometer Infrared',
    merek_model: 'Testo 845',
    nomor_seri: 'TST-2023-002',
    rentang_pengukuran: '-30°C hingga 400°C',
    kelas_akurasi: '±1.5°C',
    tanggal_kalibrasi: '2023-07-20',
    tanggal_kadaluarsa: '2024-07-20',
    id_lokasi: 'LAB-02',
    status: 'Dalam Kalibrasi'
  },
  // Data tambahan
  {
    id: 'AK-003',
    nama_alat: 'Oscilloscope',
    merek_model: 'Keysight DSOX1204A',
    nomor_seri: 'KEY-2023-003',
    rentang_pengukuran: '200 MHz',
    kelas_akurasi: '1%',
    tanggal_kalibrasi: '2023-08-10',
    tanggal_kadaluarsa: '2024-08-10',
    id_lokasi: 'LAB-03',
    status: 'Aktif'
  },
  {
    id: 'AK-004',
    nama_alat: 'Power Supply',
    merek_model: 'Rigol DP832',
    nomor_seri: 'RGL-2023-004',
    rentang_pengukuran: '0-32V, 0-3A',
    kelas_akurasi: '0.1% + 10mV',
    tanggal_kalibrasi: '2023-09-05',
    tanggal_kadaluarsa: '2024-09-05',
    id_lokasi: 'LAB-01',
    status: 'Aktif'
  },
  {
    id: 'AK-005',
    nama_alat: 'Signal Generator',
    merek_model: 'Siglent SDG2042X',
    nomor_seri: 'SGL-2023-005',
    rentang_pengukuran: '0-40MHz',
    kelas_akurasi: '±1ppm',
    tanggal_kalibrasi: '2023-10-15',
    tanggal_kadaluarsa: '2024-10-15',
    id_lokasi: 'LAB-02',
    status: 'Rusak'
  },
  {
    id: 'AK-006',
    nama_alat: 'LCR Meter',
    merek_model: 'GW Instek LCR-800G',
    nomor_seri: 'GWI-2023-006',
    rentang_pengukuran: '20Hz-200kHz',
    kelas_akurasi: '0.1%',
    tanggal_kalibrasi: '2023-11-20',
    tanggal_kadaluarsa: '2024-11-20',
    id_lokasi: 'LAB-03',
    status: 'Aktif'
  },
  {
    id: 'AK-007',
    nama_alat: 'Clamp Meter',
    merek_model: 'Hioki CM4371',
    nomor_seri: 'HIO-2023-007',
    rentang_pengukuran: 'AC/DC 0-1000A',
    kelas_akurasi: '±1.5%',
    tanggal_kalibrasi: '2023-12-01',
    tanggal_kadaluarsa: '2024-12-01',
    id_lokasi: 'LAB-01',
    status: 'Aktif'
  }
]

export const tableAlatKalibrasi = dummyAlatKalibrasi.map(item => ({
  id: item.id,
  nama_alat: item.nama_alat,
  merek_model: item.merek_model,
  nomor_seri: item.nomor_seri,
  status: item.status
}))