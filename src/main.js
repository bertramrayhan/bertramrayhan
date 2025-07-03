import emailjs from "@emailjs/browser";
import './style.css'; // kalau lo mau load CSS manual

// init pake public key dari .env
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// kirim form saat submit
document.getElementById("contact-form-wrapper").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    this
  ).then(() => {
    alert("Pesan terkirim! 😄");
    this.reset();
  }, (error) => {
    alert("Oops! Gagal kirim 😢");
    console.error(error);
  });
});

// Tunggu DOM siap untuk generate project cards
document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            name: "Project Title",
            image: "src/assets/images/halaman-beranda-pemilik.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum urna quis magna lobortis, eget finibus urna vestibulum. Sed nec ex non justo dictum venenatis. Fusce nec purus nec mauris posuere malesuada",
            github: "https://github.com/bertramrayhan/dumdumcell",
            release: "https://github.com/bertramrayhan/dumdumcell/releases/tag/v1.0.0",
            tech: ["java", "css3"]
        }
        // bisa tambahin project lain di sini
    ];

    const techIcons = {
        java: {
            src: "src/assets/icons/java-original-wordmark.svg",
            name: "Java"
        },
        css3: {
            src: "src/assets/icons/css3-original.svg",
            name: "CSS3"
        }
        // tambahin tech lainnya kalo ada
    };

    // Selector yang benar - pakai ID
    const projectGrid = document.querySelector('#project-grid');
    
    // Hapus project card yang ada (hardcoded)
    projectGrid.innerHTML = '';

    projects.forEach((project) => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        
        const techStackHTML = project.tech.map(tech => `
            <div class="tooltip">
                <img src="${techIcons[tech].src}" alt="${techIcons[tech].name} logo" class="tech-stack-icon">
                <span class="tooltip-text">${techIcons[tech].name}</span>
            </div>
        `).join('');

        card.innerHTML = `
            <a data-fancybox="gallery" href="${project.image}">
                <img src="${project.image}" alt="Photo Project ${project.name}" style="width: 514px;height: 274px;">
            </a>
            <div class="project-text">
                <h3>${project.name}</h3>
                <hr class="separator-project">
                <p style="text-align: justify;">${project.description}</p>
            </div>
            <div class="tech-stack-list">
                ${techStackHTML}
            </div>
            <div class="project-link">
                <a href="${project.github}" target="_blank" class="icon-link">
                    <svg width="35" height="35" viewBox="0 0 54 54" fill="none">
                        <use href="#icon-github"></use>
                    </svg>
                </a>
                <a href="${project.release}" target="_blank" class="icon-link">
                    <svg width="35" height="35" viewBox="0 0 150 150" fill="none">
                        <use href="#icon-link-live"></use>
                    </svg>
                </a>
            </div>
        `;

        projectGrid.appendChild(card);
    });

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