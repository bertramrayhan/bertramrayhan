<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Discord\Interaction;
use Discord\InteractionType;
use Discord\InteractionResponseType;

$publicKey = getenv('DISCORD_PUBLIC_KEY');
$signature = $_SERVER['HTTP_X_SIGNATURE_ED25519'] ?? '';
$timestamp = $_SERVER['HTTP_X_SIGNATURE_TIMESTAMP'] ?? '';
$postData = file_get_contents('php://input');

// Atur header sebagai JSON di awal
header('Content-Type: application/json');

// =================================================================
// TAMBAHAN PENTING: Cek apakah signature dan timestamp ada
// =================================================================
if (empty($signature) || empty($timestamp)) {
    http_response_code(401 );
    echo json_encode(['error' => 'Missing signature headers.']);
    exit; // Hentikan eksekusi di sini
}
// =================================================================

// Sekarang kita tahu signature tidak kosong, baru kita panggil verifyKey
if (Interaction::verifyKey($postData, $signature, $timestamp, $publicKey)) {
    $payload = json_decode($postData, true);

    switch ($payload['type']) {
        case InteractionType::PING:
            echo json_encode(['type' => InteractionResponseType::PONG]);
            break;

        // ... sisa kode switch Anda tetap sama ...
        case InteractionType::APPLICATION_COMMAND:
            echo json_encode([
                'type' => InteractionResponseType::CHANNEL_MESSAGE_WITH_SOURCE,
                'data' => ['content' => 'Halo! Perintah ini diterima tetapi belum diimplementasikan.']
            ]);
            break;

        default:
            echo json_encode([
                'type' => InteractionResponseType::CHANNEL_MESSAGE_WITH_SOURCE,
                'data' => ['content' => 'Tipe interaksi ini tidak didukung.']
            ]);
            break;
    }
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid signature.']);
}
?>