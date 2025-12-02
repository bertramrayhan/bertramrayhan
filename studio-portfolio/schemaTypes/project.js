
export default {
  // Ini adalah ID internal skema, harus unik dan tanpa spasi
  name: 'project',
  
  // Ini adalah nama yang akan muncul di UI Sanity Studio
  title: 'Projects',
  
  // Tipe skema. 'document' berarti ini adalah tipe konten utama
  type: 'document',
  
  // 'fields' adalah array yang berisi semua kolom isian untuk "Project"
  fields: [
    {
      name: 'name',
      title: 'Project Name',
      type: 'string',
      description: 'Nama proyek, contoh: "Aplikasi Kasir DumDumCell"',
      validation: rule => rule.required() // Membuat kolom ini wajib diisi
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      description: 'Screenshot atau gambar utama proyek.',
      options: {
        hotspot: true, // Memungkinkan Anda memilih area fokus pada gambar
      },
      validation: rule => rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text', // 'text' untuk paragraf panjang, 'string' untuk satu baris
      description: 'Deskripsi singkat tentang proyek.',
      validation: rule => rule.required()
    },
    {
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url', // Tipe 'url' memberikan validasi URL otomatis
      description: 'Link ke repository GitHub proyek ini.'
    },
    {
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
      description: 'Link ke demo langsung proyek (jika ada).'
    },
    {
      name: 'techs',
      title: 'Technologies',
      type: 'array', // Tipe 'array' untuk daftar item
      description: 'Teknologi yang digunakan.',
      of: [{type: 'string'}], // Daftar ini berisi item-item bertipe 'string'
      options: {
        layout: 'tags' // Menampilkan input sebagai tag yang bisa ditambah/hapus
      }
    },
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
  ]
}