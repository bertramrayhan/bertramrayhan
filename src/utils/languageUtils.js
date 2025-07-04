/**
 * Utility functions untuk deteksi dan pengelolaan bahasa
 */

/**
 * Deteksi bahasa berdasarkan path URL
 * @returns {string} Language code ('id' atau 'en')
 */
export function detectLanguage() {
    const path = window.location.pathname;
    
    // Jika path mengandung '/en/', maka bahasa Inggris
    if (path.includes('/en/')) {
        return 'en';
    }
    
    // Default bahasa Indonesia
    return 'id';
}

/**
 * Get current language preference
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
    return detectLanguage();
}
