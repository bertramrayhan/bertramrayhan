// schemaTypes/experience.js

export default {
  // Ganti nama internal menjadi lebih generik
  name: 'timelineEvent', 
  title: 'Timeline Event', // Ganti judul di UI
  type: 'document',
  fields: [
    // 1. TAMBAHKAN KOLOM TIPE UNTUK KATEGORI
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      description: 'Pilih kategori untuk entri timeline ini.',
      options: {
        list: [
          {title: 'Pekerjaan / Magang', value: 'work'},
          {title: 'Kompetisi / Lomba', value: 'competition'},
          {title: 'Proyek Penting', value: 'project'},
          {title: 'Pendidikan / Akademik', value: 'education'},
          {title: 'Lainnya', value: 'other'},
        ],
        layout: 'radio', // Tampilkan sebagai tombol radio agar mudah dipilih
      },
      validation: rule => rule.required(),
    },
    // 2. UBAH NAMA KOLOM AGAR LEBIH UMUM
    {
      name: 'title', // Sebelumnya 'jobTitle'
      title: 'Title / Position',
      description: 'Contoh: "Juara 1", "Software Engineer Intern", "Proyek Aplikasi Berita"',
      type: 'string',
      validation: rule => rule.required(),
    },
    {
      name: 'organization', // Sebelumnya 'company'
      title: 'Organization / Context',
      description: 'Contoh: "Universitas Indonesia", "Google", "Proyek Pribadi"',
      type: 'string',
      validation: rule => rule.required(),
    },
    {
      name: 'eventDate',
      title: 'Event Start Date (for sorting)',
      type: 'date',
      description: 'Pilih tanggal awal event. Ini HANYA untuk pengurutan dan tidak akan ditampilkan. Pilih tanggal 1 untuk setiap bulan.',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: rule => rule.required(),
    },
    {
      name: 'period',
      title: 'Period',
      type: 'string',
      description: 'Contoh: "2023 - Sekarang" atau "Oktober 2024"',
      validation: rule => rule.required(),
    },
    {
      name: 'description', // Ganti nama dari 'achievements'
      title: 'Description / Achievements',
      description: 'Jelaskan tentang acara ini atau tulis pencapaian dalam bentuk poin.',
      type: 'array',
      of: [{type: 'block'}], // Gunakan Rich Text Editor untuk fleksibilitas (bold, italic, list)
    },
    // Jangan lupa field 'language'
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organization',
      media: 'eventType', // Tampilkan tipe sebagai "media"
    },
  }
}