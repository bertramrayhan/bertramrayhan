import emailjs from "@emailjs/browser";
import './style.css'; // kalau lo mau load CSS manual
import { getProjects } from './data/projects.js';
import { renderProjectCards } from './utils/projectUtils.js';
import { getCurrentLanguage } from './utils/languageUtils.js';
import { getTranslation } from './data/translations.js';
import { generateContactForm } from './utils/formUtils.js';

// init pake public key dari .env
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// kirim form saat submit
function showNotif(message, type = "success") {
  const notif = document.getElementById("notification");
  notif.innerHTML = `<h3>${message}</h3>`;
  notif.className = `notification ${type} show`;

  setTimeout(() => {
    notif.classList.remove("show");
    notif.classList.add("hide");

    setTimeout(() => {
      notif.className = `notification ${type}`;
    }, 400);
  }, 3000);
}

document.getElementById("contact-form-wrapper").addEventListener("submit", function (e) {
  e.preventDefault();

  // Deteksi bahasa untuk pesan notifikasi
  const currentLanguage = getCurrentLanguage();

  emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    this
  ).then(() => {
    showNotif(getTranslation(currentLanguage, 'notifications.success'));
    this.reset();
  }, (error) => {
    showNotif(getTranslation(currentLanguage, 'notifications.error'), "error");
    console.error(error);
  });
});

// Tunggu DOM siap untuk generate project cards
document.addEventListener('DOMContentLoaded', function() {
    // Deteksi bahasa berdasarkan URL
    const currentLanguage = getCurrentLanguage();
    
    // Generate contact form sesuai bahasa
    generateContactForm(currentLanguage);
    
    // Get projects data sesuai bahasa
    const projects = getProjects(currentLanguage);
    
    // Selector yang benar - pakai ID
    const projectGrid = document.querySelector('#project-grid');
    
    // Render semua project cards dengan bahasa
    renderProjectCards(projects, projectGrid, currentLanguage);

    // Inisialisasi FancyBox setelah DOM selesai dibuat
    if (window.Fancybox) {
        Fancybox.bind("[data-fancybox]", {
            // Options FancyBox
            infinite: false,
            hideScrollbar: false,
            Thumbs: {
                showOnStart: false
            }
        });
    }
});