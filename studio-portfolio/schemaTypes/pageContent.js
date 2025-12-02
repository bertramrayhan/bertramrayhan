// schemaTypes/pageContent.js
export default {
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Identifier',
      type: 'string',
      description: 'Hanya sebagai penanda, contoh: "Konten Halaman Utama"',
      readOnly: true, // Tidak perlu diubah
    },
    {
      name: 'heroSubtitle',
      title: 'Hero - Subtitle',
      description: 'Teks besar di bawah nama Anda, contoh: "I build things for the web."',
      type: 'string',
    },
    {
      name: 'heroDescription',
      title: 'Hero - Description',
      description: 'Paragraf singkat di hero section.',
      type: 'text',
    },
    {
      name: 'aboutContent',
      title: 'About Section Content',
      description: 'Konten untuk section "About Me". Anda bisa menggunakan styling.',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
  ],
}