import emailjs from "@emailjs/browser";
import { renderProjectCards } from './utils/projectUtils.js';
import { setContactForm } from './utils/formUtils.js';

let currentLanguage = 'id';
let lastLanguage = currentLanguage;
let languageToggle = document.querySelector('.language-toggle');
let heroBody = document.querySelector('.hero__body');
let aboutBody = document.querySelector('.about__body');
let notificationSuccess = null;
let notificationError = null;

languageToggle.addEventListener('click', function(e){
  if(e.target.closest('.id-btn')){
    currentLanguage = 'id';
  }else if(e.target.closest('.en-btn')) {
    currentLanguage = 'en';
  }

  if(currentLanguage !== lastLanguage){
    lastLanguage = currentLanguage;
    getContent();
  }
});

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

document.getElementById("contact-form-wrapper").addEventListener("submit", async function (e) {
  e.preventDefault();

  try {
    await emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      this
    );
    showNotif(notificationSuccess);
    this.reset();
  } catch (error) {
    showNotif(notificationError, "error");
    console.error(error);
  }
});

//membuat hamburger menu
function openHamburgerMenu() {
    const hamburger = document.querySelector('#hamburger');
    const navigation = document.querySelector('#navigation');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('#navigation nav a'); // Ambil semua link navigation
    const btnNavLinks = document.querySelectorAll('#navigation a.primary-button');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');      // bikin garis jadi silang
        navigation.classList.toggle('active');
        header.classList.toggle('menu-open');
    });

    // Tutup menu ketika link navigation diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navigation.classList.remove('active');
            header.classList.remove('menu-open');
        });
    });

    btnNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navigation.classList.remove('active');
            header.classList.remove('menu-open');
        });
    });
}

// Tunggu DOM siap untuk generate project cards
document.addEventListener('DOMContentLoaded', function() {    
    getContent();

    //membuka hamburger menu
    openHamburgerMenu();

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

async function getContent(){
  try {
    const responsePath = `/api/get_contents.php?lang=${currentLanguage}`;
    const translationsPath = `/content/translations/translations_${currentLanguage}.json`;

    const [response, translationsResponse] = await Promise.all([
      fetch(responsePath),
      fetch(translationsPath)
    ])

    if(!response.ok || !translationsResponse.ok){
      throw new Error(`HTTP error! status ${response.status}`);    
    }

    const results = await response.json();
    const translationsContent = await translationsResponse.json();
    let content = {
      heroContent: results.contents.hero,
      aboutContent: results.contents.about,
      projectsContent: results.projects,
      translationsContent: translationsContent
    }

    loadContent(content);

  } catch (error) {
    console.error(error);
  }
}

function loadContent(content){
  heroBody.innerHTML = content.heroContent;

  aboutBody.innerHTML = content.aboutContent;

  renderProjectCards(content.projectsContent);

  notificationSuccess = content.translationsContent.notifications.success;
  notificationError = content.translationsContent.notifications.error;

  setContactForm(content.translationsContent)
}