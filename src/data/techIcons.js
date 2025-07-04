// src/data/techIcons.js

// Import setiap ikon secara individual
// Vite akan memproses import ini dan memberikan URL yang benar setelah build
import javaIcon from '../assets/icons/java-original-wordmark.svg';
import css3Icon from '../assets/icons/css3-original.svg';
import html5Icon from '../assets/icons/html5-original.svg';
import gitIcon from '../assets/icons/git-original.svg';
import mysqlIcon from '../assets/icons/mysql-original-wordmark.svg';
import pythonIcon from '../assets/icons/python-original.svg';


export const techIcons = {
    java: {
        src: javaIcon, // Gunakan variabel yang diimport
        name: "Java"
    },
    css3: {
        src: css3Icon, // Gunakan variabel yang diimport
        name: "CSS3"
    },
    html5: {
        src: html5Icon, // Gunakan variabel yang diimport
        name: "HTML5"
    },
    git: {
        src: gitIcon, // Gunakan variabel yang diimport
        name: "Git"
    },
    mysql: {
        src: mysqlIcon, // Gunakan variabel yang diimport
        name: "MySQL"
    },
    python: {
        src: pythonIcon, // Gunakan variabel yang diimport
        name: "Python"
    }
};
