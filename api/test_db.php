<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/connection.php';

try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../', '.env.development.local');
    $dotenv->safeLoad(); // safeLoad tidak akan error jika file tidak ada
} catch (Exception $e) {
    // Ignore jika file .env tidak ada
}

header('Content-Type: application/json');

try {
    // Langkah 5: Jalankan query (sama seperti sebelumnya)
    $stmt = $pdo->query("SELECT slug, content, lang, updated_at FROM sections ORDER BY id");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Langkah 6: Kirim respons sukses (sama seperti sebelumnya)
    echo json_encode([
        'status' => 'success',
        'message' => 'Koneksi ke database berhasil!',
        'data' => $results
    ]);

} catch (Exception $e) { // Kita gunakan Exception umum untuk menangkap semua jenis error
    http_response_code(500 );
    echo json_encode([
        'status' => 'error',
        'message' => 'Terjadi kesalahan.',
        'error_details' => $e->getMessage()
    ]);
}
?>
