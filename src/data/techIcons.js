// src/data/techIcons.js

// Import setiap ikon secara individual
// Vite akan memproses import ini dan memberikan URL yang benar setelah build
import javaIcon from '../assets/icons/java-original-wordmark.svg';
import css3Icon from '../assets/icons/css3-original.svg';
import html5Icon from '../assets/icons/html5-original.svg';
import gitIcon from '../assets/icons/git-original.svg';
import mysqlIcon from '../assets/icons/mysql-original-wordmark.svg';
import pythonIcon from '../assets/icons/python-original.svg';
import phpIcon from '../assets/icons/php-original.svg';

export const techIcons = {
    java: {
        src: javaIcon,
        name: "Java"
    },
    css3: {
        src: css3Icon,
        name: "CSS3"
    },
    html5: {
        src: html5Icon,
        name: "HTML5"
    },
    git: {
        src: gitIcon,
        name: "Git"
    },
    mysql: {
        src: mysqlIcon,
        name: "MySQL"
    },
    python: {
        src: pythonIcon,
        name: "Python"
    },
    php: {
        src: phpIcon,
        name: "PHP"
    }
};
