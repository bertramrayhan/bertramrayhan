import emailjs from "@emailjs/browser";
import './style.css'; // kalau lo mau load CSS manual
import { projects } from './data/projects.js';
import { renderProjectCards } from './utils/projectUtils.js';

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

  emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    this
  ).then(() => {
    showNotif("Pesan terkirim!");
    this.reset();
  }, (error) => {
    showNotif("Gagal mengirim pesan. Coba lagi!", "error");
    console.error(error);
  });
});

// Tunggu DOM siap untuk generate project cards
document.addEventListener('DOMContentLoaded', function() {
    // Selector yang benar - pakai ID
    const projectGrid = document.querySelector('#project-grid');
    
    // Render semua project cards
    renderProjectCards(projects, projectGrid);

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