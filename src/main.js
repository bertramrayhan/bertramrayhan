import emailjs from "@emailjs/browser";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { renderProjectCards } from './utils/projectUtils.js';
import { renderTimeline } from './utils/timelineUtils.js';
import { populateHero, populateAbout, populateContact, populateSocials } from "./utils/PageContentUtils.js";
import { client } from './sanityClient.js';

let currentLanguage = localStorage.getItem('preferredLanguage') || 'id';
const langButtons = document.querySelectorAll('.lang-toggle-btn');
let notificationTimer;
window.notification = {};

function changeLanguage() {
    const targetLanguage = currentLanguage === 'id' ? 'en' : 'id';
    
    currentLanguage = targetLanguage;
    localStorage.setItem('preferredLanguage', targetLanguage);
    
    getContent(currentLanguage);
}

function updateLanguageButtons() {
    const buttonText = currentLanguage === 'id' ? 'EN' : 'ID';
    
    langButtons.forEach(btn => {
        btn.textContent = buttonText;
    });
}

function initLanguageButtons() {
    langButtons.forEach(btn => {
        btn.addEventListener('click', changeLanguage);
    });
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const iconContainer = document.getElementById('notification-icon');
    const messageContainer = document.getElementById('notification-message');
    const progress = document.getElementById('notification-progress');

    if (!notification || !iconContainer || !messageContainer || !progress) return;

    // Hapus timer yang mungkin sedang berjalan
    clearTimeout(notificationTimer);

    // 1. Buat elemen <span> untuk Material Icon
    const iconSpan = document.createElement('span');
    iconSpan.className = 'material-symbols-outlined';
    iconSpan.textContent = (type === 'success') ? 'check_circle' : 'error'; // Nama ikon

    // 2. Masukkan ikon ke dalam container
    iconContainer.innerHTML = ''; // Kosongkan dulu
    iconContainer.appendChild(iconSpan);
    // =================================================================

    // Atur pesan dan gaya notifikasi
    messageContainer.textContent = message;
    notification.className = 'fixed top-5 right-5 z-[100] w-auto max-w-sm rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out transform';
    notification.classList.add(type);

    // Reset dan mulai animasi bilah progres
    notification.classList.remove('show');
    void notification.offsetWidth;
    notification.classList.add('show');

    // Atur timer untuk menyembunyikan notifikasi
    notificationTimer = setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function initScrollObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Logika untuk animasi fade-in
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }

            // Logika untuk active link di navigasi
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`nav a[href="#${id}"]`);

            if (correspondingLink) {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

function initMobileMenu() {
    const hamburgerButton = document.querySelector('#hamburger-button');
    const mobileMenu = document.querySelector('#mobile-menu');

    // PERBAIKAN #1: Pemeriksaan Keberadaan Elemen
    // Jika tombol atau menu tidak ditemukan, hentikan fungsi untuk menghindari error.
    if (!hamburgerButton || !mobileMenu) {
        console.error("Hamburger button or mobile menu not found!");
        return; 
    }

    const menuLinks = mobileMenu.querySelectorAll('nav a'); // Lebih spesifik
    const hamburgerIcon = hamburgerButton.querySelector('.material-symbols-outlined');

    const toggleMenu = () => {
      const isActive = mobileMenu.classList.contains('translate-x-0');

      if (isActive) {
          // Jika aktif (terlihat), sembunyikan
          mobileMenu.classList.remove('translate-x-0');
          mobileMenu.classList.add('-translate-x-full');
      } else {
          // Jika tersembunyi, tampilkan
          mobileMenu.classList.remove('-translate-x-full');
          mobileMenu.classList.add('translate-x-0');
      }

      document.body.classList.toggle('menu-open', !isActive);
      hamburgerIcon.textContent = !isActive ? 'close' : 'menu';
      hamburgerButton.setAttribute('aria-label', !isActive ? 'Close menu' : 'Open menu');
  };

    hamburgerButton.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Hanya tutup jika menu sedang aktif
            if (mobileMenu.classList.contains('translate-x-0')) {
              toggleMenu();
          }
        });
    });
}

async function getPageContent(language = 'id') {
  const query = `*[_type == "pageContent" && language == $lang][0]`;
  const params = { lang: language };

  const content = await client.fetch(query, params);
  return content;
}

async function getProjects(language = 'id') {
    const query = `*[_type == "project" && language == $lang] 
        | order(isFeatured asc, name asc)
    `;
    const params = { lang: language };

    const projects = await client.fetch(query, params);
    return projects;
}

async function getTimelineEvents(language = 'id') {
  const query = `*[_type == "timelineEvent" && language == $lang] | order(eventDate asc)`;
  const params = { lang: language };

  const events = await client.fetch(query, params);
  return events;
}

async function getContent(language) {
    try {
        const [projectsData, timelineData, pageData] = await Promise.all([
            getProjects(language),
            getTimelineEvents(language),
            getPageContent(language)
        ]);

        if (!projectsData || !timelineData || !pageData) {
            throw new Error("Gagal mengambil sebagian atau seluruh data dari Sanity.");
        }

        let content = {
            projectsContent: projectsData,
            timelineContent: timelineData,
            pageContent: pageData,
        };

        loadContent(content);
        updateLanguageButtons();

    } catch (error) {
        console.error("Error di dalam getContent:", error);
    }
}

function loadContent(content){
    renderProjectCards(content.projectsContent);
    renderTimeline(content.timelineContent);

    populateHero(content.pageContent);
    populateAbout(content.pageContent);
    populateContact(content.pageContent);
    populateSocials(content.pageContent);

    window.notification.success = content.pageContent.notification_success;
    window.notification.error = content.pageContent.notification_error;

    initScrollObserver();

    Fancybox.destroy(); 
    
    Fancybox.bind("[data-fancybox='gallery-projects']", {
        infinite: false,
        hideScrollbar: false,
        Thumbs: { showOnStart: false },
    });

}

document.addEventListener('DOMContentLoaded', async () => {    
    getContent(currentLanguage);
    initLanguageButtons();
    initMobileMenu();

    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            `;

            try {
                await emailjs.sendForm(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    contactForm
                 );

                const successMessage = window.notification.success || 'Pesan berhasil terkirim!';
                showNotification(successMessage, 'success');
                
                contactForm.reset();

            } catch (error) {
                console.error('Gagal mengirim email:', error);
                const errorMessage = window.notification.error || 'Gagal mengirim pesan. Coba lagi.';
                showNotification(errorMessage, 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
});