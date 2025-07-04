export const projectsData = {
    id: [
        {
            name: "Aplikasi Kasir DumDumCell",
            image: new URL('/src/assets/images/halaman-beranda-pemilik.png', import.meta.url).href,
            description: "Aplikasi Kasir DumDumCell membantu operasional bisnis DumDum Cellular dengan dilengkapi fitur unggulan seperti login RFID, barcode scanner, dan cetak struk otomatis. Sistem ini memiliki dua level akses (karyawan dan pemilik), serta mendukung pemantauan stok, transaksi penjualan, dan laporan otomatis dengan tampilan user-friendly.",
            github: "https://github.com/bertramrayhan/dumdumcell",
            release: "https://github.com/bertramrayhan/dumdumcell/releases/tag/v1.0.0",
            tech: ["java", "css3"]
        }
    ],
    en: [
        {
            name: "DumDumCell Cashier Application",
            image: new URL('/src/assets/images/halaman-beranda-pemilik.png', import.meta.url).href,
            description: "DumDumCell Cashier Application helps DumDum Cellular business operations with advanced features like RFID login, barcode scanner, and automatic receipt printing. The system has two access levels (employee and owner), and supports stock monitoring, sales transactions, and automatic reporting with a user-friendly interface.",
            github: "https://github.com/bertramrayhan/dumdumcell",
            release: "https://github.com/bertramrayhan/dumdumcell/releases/tag/v1.0.0",
            tech: ["java", "css3"]
        }
    ]
};

/**
 * Get projects data based on language
 * @param {string} language - Language code ('id' or 'en')
 * @returns {Array} Projects array for specified language
 */
export function getProjects(language = 'id') {
    return projectsData[language] || projectsData.id;
}