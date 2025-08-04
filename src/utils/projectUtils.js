import { techIcons } from '../data/techIcons.js';

let projectsContainer = document.getElementById('project-grid');
const projectCardTemplate = document.getElementById('project-card-template')
const techStackTemplate = document.getElementById('tech-stack-template')

export function renderProjectCards(projects){
    projectsContainer.innerHTML = '';

    for (const project of projects) {
        const projectCardClone = projectCardTemplate.content.cloneNode(true);

        let projectPhoto = projectCardClone.querySelector('.project-photo');
        projectPhoto.src = new URL(project.imagePath, import.meta.url).href;
        projectPhoto.alt = 'Photo Project' + project.name;

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
