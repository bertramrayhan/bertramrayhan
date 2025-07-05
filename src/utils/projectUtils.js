// Utility functions untuk project cards
import { techIcons } from '../data/techIcons.js';
import { getTranslation } from '../data/translations.js';

/**
 * Generate HTML untuk tech stack icons
 * @param {Array} techStack - Array berisi nama tech stack
 * @param {string} language - Language code
 * @returns {string} HTML string untuk tech stack icons
 */
export function generateTechStackHTML(techStack, language = 'id') {
    return techStack.map(tech => `
        <div class="tooltip">
            <img src="${techIcons[tech].src}" alt="${getTranslation(language, `techStack.${tech}`)} logo" class="tech-stack-icon">
            <span class="tooltip-text">${getTranslation(language, `techStack.${tech}`)}</span>
        </div>
    `).join('');
}

/**
 * Generate HTML untuk project card
 * @param {Object} project - Object berisi data project
 * @param {string} language - Language code
 * @returns {string} HTML string untuk project card
 */
export function generateProjectCardHTML(project, language = 'id') {
    const techStackHTML = generateTechStackHTML(project.tech, language);
    
    return `
        <a data-fancybox="gallery" href="${project.image}">
            <img src="${project.image}" alt="Photo Project ${project.name}">
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
}

/**
 * Render semua project cards ke dalam grid
 * @param {Array} projects - Array berisi data semua projects
 * @param {HTMLElement} container - Element container untuk project cards
 * @param {string} language - Language code
 */
export function renderProjectCards(projects, container, language = 'id') {
    // Hapus project card yang ada (hardcoded)
    container.innerHTML = '';

    projects.forEach((project) => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.innerHTML = generateProjectCardHTML(project, language);
        container.appendChild(card);
    });
}
