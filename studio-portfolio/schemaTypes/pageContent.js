import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pageContent',
  title: 'Page Content & Translations',
  type: 'document',
  
  // Menggunakan fieldset untuk mengelompokkan field di UI Sanity
  fieldsets: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'about', title: 'About Section'},
    {name: 'contact', title: 'Contact Section'},
    {name: 'socials', title: 'Social Media Links'},
  ],

  fields: [
    // Field 'language' penting untuk plugin
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    // --- Hero Section ---
    defineField({
      name: 'hero_subtitle', title: 'Subtitle', type: 'string', fieldset: 'hero'
    }),
    defineField({
      name: 'hero_description', title: 'Description', type: 'text', fieldset: 'hero'
    }),
    defineField({
      name: 'hero_button', title: 'Button Text', type: 'string', fieldset: 'hero'
    }),

    // --- About Section ---
    defineField({
      name: 'about_content', title: 'Content', type: 'array', of: [{type: 'block'}], fieldset: 'about'
    }),

    // --- Contact Section ---
    defineField({
      name: 'contact_title', title: 'Section Title', type: 'string', fieldset: 'contact'
    }),
    defineField({
      name: 'contact_description', title: 'Description', type: 'text', fieldset: 'contact'
    }),
    defineField({
      name: 'contact_email_button', title: 'Email Button Text (Say Hello)', type: 'string', fieldset: 'contact'
    }),
    defineField({
      name: 'contact_name_label', title: 'Name Label', type: 'string', fieldset: 'contact'
    }),
    defineField({
      name: 'contact_email_label', title: 'Email Label', type: 'string', fieldset: 'contact'
    }),
    defineField({
      name: 'contact_message_label', title: 'Message Label', type: 'string', fieldset: 'contact'
    }),
    defineField({
      name: 'contact_button', title: 'Button Text', type: 'string', fieldset: 'contact'
    }),
    defineField({
      name: 'notification_success',
      title: 'Success Notification Text',
      description: 'Pesan yang muncul saat email berhasil terkirim.',
      type: 'string',
      fieldset: 'contact', // Masukkan ke dalam grup 'Contact'
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'notification_error',
      title: 'Error Notification Text',
      description: 'Pesan yang muncul saat email gagal terkirim.',
      type: 'string',
      fieldset: 'contact', // Masukkan ke dalam grup 'Contact'
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'social_github',
      title: 'GitHub URL',
      type: 'url',
      fieldset: 'socials',
      validation: (rule) => rule.uri({
        scheme: ['http', 'https']
      } )
    }),
    defineField({
      name: 'social_linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      fieldset: 'socials',
      validation: (rule) => rule.uri({
        scheme: ['http', 'https']
      } )
    }),
  ],
})