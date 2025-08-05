<?php 
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/util.php';

preventDirectAccess(__FILE__); // Pass __FILE__ untuk mengecek file ini

// Load file .env.development.local
try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../', '.env.development.local');
    $dotenv->safeLoad(); // safeLoad tidak akan error jika file tidak ada
} catch (Exception $e) {
    // Ignore jika file .env tidak ada
}
    $dbUrl = $_ENV['POSTGRES_URL'] ?? getenv('POSTGRES_URL');

    // Jika variabel tidak ditemukan, berikan error yang jelas.
    if ($dbUrl === false || empty($dbUrl)) {
        throw new Exception("Environment variable POSTGRES_URL tidak ditemukan.");
    }

    // Langkah 2: Urai (parse) URL tersebut untuk mendapatkan semua bagiannya.
    $dbopts = parse_url($dbUrl);

    // Langkah 3: Bangun connection string PDO dari hasil uraian.
    $host = $dbopts['host'];
    $port = isset($dbopts['port']) ? $dbopts['port'] : 5432; // Default PostgreSQL port
    $dbname = ltrim($dbopts['path'], '/'); // Hapus garis miring di awal path
    $user = $dbopts['user'];
    $password = $dbopts['pass'];

    // Parse query string untuk SSL mode jika ada
    $options = '';
    if (isset($dbopts['query'])) {
        parse_str($dbopts['query'], $queryParams);
        if (isset($queryParams['sslmode'])) {
            $options = ";sslmode=" . $queryParams['sslmode'];
        }
    }

    $connStr = "pgsql:host=$host;port=$port;dbname=$dbname$options";

    // Langkah 4: Buat koneksi PDO (sama seperti sebelumnya)
    $pdo = new PDO($connStr, $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>