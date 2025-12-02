import emailjs from "@emailjs/browser";
import { renderProjectCards } from './utils/projectUtils.js';
import { setContactForm } from './utils/formUtils.js';
import { client } from './sanityClient.js';

// let currentLanguage = 'id';
// let lastLanguage = currentLanguage;
// let languageToggles = document.querySelectorAll('.language-toggle');
// let heroBody = document.querySelector('.hero__body');
// let aboutBody = document.querySelector('.about__body');
// let notificationSuccess = null;
// let notificationError = null;

// languageToggles.forEach(languageToggle => {
//   languageToggle.addEventListener('click', function(e){
//     if(e.target.closest('.id-btn')){
//       currentLanguage = 'id';
//     }else if(e.target.closest('.en-btn')) {
//       currentLanguage = 'en';
//     }

//     if(currentLanguage !== lastLanguage){
//       lastLanguage = currentLanguage;
//       getContent();
//     }
//   });
// });

// // init pake public key dari .env
// emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// // kirim form saat submit
// function showNotif(message, type = "success") {
//   const notif = document.getElementById("notification");
//   notif.innerHTML = `<h3>${message}</h3>`;
//   notif.className = `notification ${type} show`;

//   setTimeout(() => {
//     notif.classList.remove("show");
//     notif.classList.add("hide");

//     setTimeout(() => {
//       notif.className = `notification ${type}`;
//     }, 400);
//   }, 3000);
// }

// document.getElementById("contact-form-wrapper").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   try {
//     await emailjs.sendForm(
//       import.meta.env.VITE_EMAILJS_SERVICE_ID,
//       import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//       this
//     );
//     showNotif(notificationSuccess);
//     this.reset();
//   } catch (error) {
//     showNotif(notificationError, "error");
//     console.error(error);
//   }
// });

function initScrollObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    const observerOptions = {
        root: null, // relatif terhadap viewport
        rootMargin: '0px',
        threshold: 0.4 // Memicu saat 30% dari section terlihat
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

async function getProjects(language = 'id') {
    // Ini adalah query Sanity, disebut GROQ. Mirip SQL.
    const query = `*[_type == "project" && language == $lang]`;
    const params = { lang: language };

    const projects = await client.fetch(query, params);
    return projects;
}

async function getContent(){
    try {
        const [projectsData] = await Promise.all([
        getProjects('id'),
        ])

        if(!projectsData.ok){
        throw new Error(`HTTP error! status ${projectsData.status}`);    
        }

        const results = await projectsData.json();
        console.log(results);
        let content = {
        //   heroContent: results.contents.hero,
        //   aboutContent: results.contents.about,
        projectsContent: results.projects,
        //   translationsContent: translationsContent
        }

        loadContent(content);

    } catch (error) {
        console.error(error);
    }
}

function loadContent(content){
//   heroBody.innerHTML = content.heroContent;

//   aboutBody.innerHTML = content.aboutContent;

    renderProjectCards(content.projectsContent);

//   notificationSuccess = content.translationsContent.notifications.success;
//   notificationError = content.translationsContent.notifications.error;

//   setContactForm(content.translationsContent)
}

document.addEventListener('DOMContentLoaded', async () => {    
    getContent();
    const projectsData = await getProjects('id'); // Ambil proyek Bhs. Indonesia
    console.log('Data Proyek dari Sanity:', projectsData);

    initScrollObserver();
    initMobileMenu();

    // Inisialisasi FancyBox setelah DOM selesai dibuat
    // if (window.Fancybox) {
    //     Fancybox.bind("[data-fancybox]", {
    //         // Options FancyBox
    //         infinite: false,
    //         hideScrollbar: false,
    //         Thumbs: {
    //             showOnStart: false
    //         }
    //     });
    // }
});