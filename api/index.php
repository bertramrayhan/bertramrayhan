<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Discord\Interaction;
use Discord\InteractionType;
use Discord\InteractionResponseType;

$publicKey = getenv('DISCORD_PUBLIC_KEY');
$signature = $_SERVER['HTTP_X_SIGNATURE_ED25519'] ?? '';
$timestamp = $_SERVER['HTTP_X_SIGNATURE_TIMESTAMP'] ?? '';
$postData = file_get_contents('php://input');

// Atur header sebagai JSON di awal, karena semua respons akan menjadi JSON.
header('Content-Type: application/json');

if (Interaction::verifyKey($postData, $signature, $timestamp, $publicKey)) {
    $payload = json_decode($postData, true);

    switch ($payload['type']) {
        case InteractionType::PING:
            // Respons PONG
            echo json_encode(['type' => InteractionResponseType::PONG]);
            break;

        case InteractionType::APPLICATION_COMMAND:
            // Respons default untuk perintah yang belum diimplementasikan
            echo json_encode([
                'type' => InteractionResponseType::CHANNEL_MESSAGE_WITH_SOURCE,
                'data' => [
                    'content' => 'Halo! Perintah ini diterima tetapi belum diimplementasikan.'
                ]
            ]);
            break;

        default:
            // Respons untuk tipe interaksi lain yang tidak kita tangani
            echo json_encode([
                'type' => InteractionResponseType::CHANNEL_MESSAGE_WITH_SOURCE,
                'data' => [
                    'content' => 'Tipe interaksi ini tidak didukung.'
                ]
            ]);
            break;
    }
} else {
    // Verifikasi gagal
    http_response_code(401 );
    echo json_encode(['error' => 'Invalid signature.']);
}
?>
