/**
 * Konfigurasi text/content untuk multi-language
 */

export const translations = {
    id: {
        // Contact form
        form: {
            name: {
                label: "Nama",
                placeholder: "Masukkan nama Anda"
            },
            email: {
                label: "Email", 
                placeholder: "Masukkan email Anda"
            },
            message: {
                label: "Pesan",
                placeholder: "Tulis pesan Anda di sini..."
            },
            submit: "Kirim"
        },
        // Tech stack names
        techStack: {
            java: "Java",
            css3: "CSS3", 
            html5: "HTML5",
            git: "Git",
            mysql: "MySQL",
            python: "Python"
        },
        // Notifications
        notifications: {
            success: "Pesan terkirim!",
            error: "Gagal mengirim pesan. Coba lagi!"
        }
    },
    en: {
        // Contact form
        form: {
            name: {
                label: "Name",
                placeholder: "Enter your name"
            },
            email: {
                label: "Email",
                placeholder: "Enter your email"
            },
            message: {
                label: "Message", 
                placeholder: "Write your message here..."
            },
            submit: "Submit"
        },
        // Tech stack names
        techStack: {
            java: "Java",
            css3: "CSS3",
            html5: "HTML5", 
            git: "Git",
            mysql: "MySQL",
            python: "Python"
        },
        // Notifications
        notifications: {
            success: "Message sent successfully!",
            error: "Failed to send message. Please try again!"
        }
    }
};

/**
 * Get translation text
 * @param {string} language - Language code
 * @param {string} key - Dot-notation key (e.g., 'form.name.label')
 * @returns {string} Translated text
 */
export function getTranslation(language, key) {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
        value = value?.[k];
    }
    
    return value || translations.id[key] || key;
}
