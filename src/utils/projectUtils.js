// projectUtils.js

import { techIcons } from '../data/techIcons.js';

// Langkah 1: Gunakan import.meta.glob untuk membuat Vite sadar akan semua gambar.
// Opsi { eager: true } membuatnya langsung memuat semua modul gambar.
const projectImageModules = import.meta.glob('/src/assets/images/*', { eager: true });

let projectsContainer = document.getElementById('project-grid');
const projectCardTemplate = document.getElementById('project-card-template');
const techStackTemplate = document.getElementById('tech-stack-template');

export function renderProjectCards(projects) {
    projectsContainer.innerHTML = '';

    for (const project of projects) {
        const projectCardClone = projectCardTemplate.content.cloneNode(true);

        // Langkah 2: Bangun path lengkap ke modul gambar yang dicari.
        const imagePathKey = `/src/assets/images/${project.imagePath}`;

        // Langkah 3: Dapatkan URL gambar yang sudah diproses Vite dari peta 'projectImageModules'.
        // Properti '.default' berisi URL publik dari gambar tersebut.
        const imageUrl = projectImageModules[imagePathKey]?.default;

        let projectPhoto = projectCardClone.querySelector('.project-photo');
        
        if (imageUrl) {
            projectPhoto.src = imageUrl;
        } else {
            // Fallback jika gambar tidak ditemukan, agar tidak error.
            projectPhoto.src = ''; // atau path ke gambar placeholder
            console.warn(`Gambar tidak ditemukan untuk proyek: ${project.name}. Path yang dicari: ${imagePathKey}`);
        }
        
        projectPhoto.alt = 'Photo Project ' + project.name;

        projectCardClone.querySelector('.project-name').textContent = project.name;
        projectCardClone.querySelector('.project-description').textContent = project.description;

        let techStackList = projectCardClone.querySelector('.tech-stack-list');
        for (const tech of project.techs) {
            const techIcon = techIcons[tech];
            const techStackClone = techStackTemplate.content.cloneNode(true);
            let techStackIcon = techStackClone.querySelector('.tech-stack-icon');
            techStackIcon.src = techIcon.src;
            techStackIcon.alt = techIcon.name + 'Logo';
            techStackClone.querySelector('.tooltip-text').textContent = techIcon.name;
            techStackList.appendChild(techStackClone);
        }

        projectCardClone.querySelector('.github-link').href = project.github;
        projectCardClone.querySelector('.release-link').href = project.release;

        projectsContainer.appendChild(projectCardClone);
    }
}
