import { client, urlFor } from '../sanityClient.js';

export function renderProjectCards(projects) {
    const projectsGrid = document.querySelector('#projects-grid');
    const cardTemplate = document.querySelector('#project-card-template');

    if (!projectsGrid || !cardTemplate) {
        console.error('PENTING: Pastikan elemen #projects-grid dan #project-card-template ada di HTML Anda!');
        return;
    }

    projectsGrid.innerHTML = ''; // Kosongkan grid sebelum mengisi

    projects.forEach(project => {
        // 1. Kloning konten dari template
        const cardClone = cardTemplate.content.cloneNode(true);
        const cardElement = cardClone.querySelector('.group\\/card'); // Ambil elemen kartu utama

        // 2. Temukan elemen di dalam kloningan dan isi dengan data
        const imageContainer = cardElement.querySelector('.aspect-video');
        const titleElement = cardElement.querySelector('h3');
        const descriptionElement = cardElement.querySelector('p');
        const techsContainer = cardElement.querySelector('.flex-wrap');
        const githubLink = cardElement.querySelector('a[href*="github.com"], a:first-of-type'); // Selector lebih fleksibel
        const liveLink = cardElement.querySelector('a:not([href*="github.com"]):last-of-type');

        if (project.image) {
            const highQualityImageUrl = urlFor(project.image).url();
            const imageUrl = urlFor(project.image).width(800).auto('format').url();

            const fancyboxLink = document.createElement('a');
            fancyboxLink.href = highQualityImageUrl;
            fancyboxLink.setAttribute('data-fancybox', 'gallery-projects');
            fancyboxLink.setAttribute('data-caption', project.name);

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = project.name;
            img.className = 'w-full h-full object-cover cursor-pointer';
            img.loading = 'lazy';

            fancyboxLink.appendChild(img);

            imageContainer.innerHTML = '';
            imageContainer.appendChild(fancyboxLink);
        }

        titleElement.textContent = project.name;
        descriptionElement.textContent = project.description;

        let displayTechs = [...(project.techs || [])];
        if (project.isFeatured) {
            if(project.language === 'en'){
                displayTechs.unshift('Featured');
            }else {
                displayTechs.unshift('Unggulan');
            }
        }

        techsContainer.innerHTML = '';
        displayTechs.forEach(tech => {
            const techSpan = document.createElement('span');
            
            if (tech === 'Unggulan' || tech === 'Featured') {
                techSpan.className = 'text-xs text-yellow-300 bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-400/30 font-bold';
            } else {
                techSpan.className = 'text-xs text-primary bg-primary/20 px-2 py-1 rounded-full';
            }
            
            techSpan.textContent = tech;
            techsContainer.appendChild(techSpan);
        });

        if (project.githubUrl) {
            githubLink.href = project.githubUrl;
        } else {
            githubLink.remove();
        }

        if (project.liveUrl) {
            liveLink.href = project.liveUrl;
        } else {
            liveLink.remove();
        }

        projectsGrid.appendChild(cardElement);
    });
}