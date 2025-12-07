import { toHTML } from '@portabletext/to-html';

export function populateHero(pageData) {
    document.querySelector('#hero-subtitle').textContent = pageData.hero_subtitle || '';
    document.querySelector('#hero-description').textContent = pageData.hero_description || '';
    document.querySelector('#hero-button').textContent = pageData.hero_button || '';

    const heroElements = document.querySelectorAll('.fade-in-item');

    // 3. Tambahkan kelas 'is-visible' ke setiap elemen untuk memicu animasi
    heroElements.forEach(el => {
        el.classList.add('is-visible');
    });
}

export function populateAbout(pageData) {
    const aboutContainer = document.querySelector('#about');
    aboutContainer.querySelectorAll("p").forEach(p => p.remove());

    if (pageData.about_content) {
        const html = toHTML(pageData.about_content, {
            components: {
                block: {
                    normal: ({children}) => `<p class="text-base font-normal leading-relaxed text-text-secondary text-justify">${children}</p>`
                }
            }
        });
        aboutContainer.innerHTML += html;
    }
}

export function populateContact(pageData) {
    // Deskripsi dan Tombol
    document.querySelector('#contact-title').textContent = pageData.contact_title || '';
    document.querySelector('#contact-description').textContent = pageData.contact_description || '';
    document.querySelector('#contact-email-button').textContent = pageData.contact_email_button || '';
    
    // Label Formulir
    document.querySelector('label[for="name"]').textContent = pageData.contact_name_label || 'Your Name';
    document.querySelector('label[for="email"]').textContent = pageData.contact_email_label || 'Email Address';
    document.querySelector('label[for="message"]').textContent = pageData.contact_message_label || 'Your Message';

    // Tombol Kirim Formulir
    document.querySelector('#contact-form-button').textContent = pageData.contact_button || 'Send Message';
}

export function populateSocials(pageData) {
    const githubUrl = pageData.social_github;
    const linkedinUrl = pageData.social_linkedin;

    document.querySelectorAll('#github-link').forEach(link => {
        if (githubUrl) {
            link.href = githubUrl;
        }
    });

    // Temukan semua link LinkedIn dan atur href-nya
    document.querySelectorAll('#linkedin-link').forEach(link => {
        if (linkedinUrl) {
            link.href = linkedinUrl;
        }
    });
}