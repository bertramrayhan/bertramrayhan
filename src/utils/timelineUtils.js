import { toHTML } from '@portabletext/to-html';

const eventTypeToIcon = {
  work: 'work',
  competition: 'emoji_events',
  project: 'rocket_launch',
  education: 'school',
  other: 'label',
};

export function renderTimeline(events) {
  const timelineContainer = document.querySelector('#timeline-container');
  const timelineTemplate = document.querySelector('#timeline-template');

  if (!timelineContainer || !timelineTemplate) {
    console.error('PENTING: Pastikan elemen #timeline-container dan #timeline-template ada di HTML Anda!');
    return;
  }

  timelineContainer.innerHTML = '';

  events.forEach((event, index) => {
    const eventClone = timelineTemplate.content.cloneNode(true);
    const eventCard = eventClone.querySelector('.group\\/card');
    const timelineCard = eventClone.querySelector("#timeline-card");

    const iconElement = eventClone.querySelector('.material-symbols-outlined');
    const titleElement = eventClone.querySelector('h3');
    const periodElement = eventClone.querySelector('p.text-primary');
    const organizationElement = eventClone.querySelector('p.text-text-light');

    if (index % 2 !== 0) {
        timelineCard.classList.add('md:ml-auto');
    }else {
        timelineCard.classList.add('md:ml-0');
    }

    iconElement.textContent = eventTypeToIcon[event.eventType] || 'label';

    titleElement.textContent = event.title;
    periodElement.textContent = event.period;
    organizationElement.textContent = event.organization;

    if (event.description && Array.isArray(event.description)) {
      const descriptionHtml = toHTML(event.description, {
        components: {
          block: {
            normal: ({children}) => `<li class="flex items-start gap-2"><span class="text-primary mt-1">></span><span>${children}</span></li>`,
          },
           list: {
            bullet: ({children}) => `<ul class="space-y-2 text-xs text-text-secondary">${children}</ul>`,
          },
          listItem: {
            bullet: ({children}) => `<li class="flex items-start gap-2"><span class="text-primary mt-1">></span><span>${children}</span></li>`,
          },
        }
      });

      timelineCard.innerHTML += descriptionHtml;
    } else {
      timelineCard.innerHTML += '';
    }

    timelineContainer.appendChild(eventClone);
  });
}