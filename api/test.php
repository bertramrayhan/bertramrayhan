<?php
// Memberitahu browser bahwa responsnya adalah JSON
header('Content-Type: application/json');

// Membuat array asosiatif
$response = [
    'success' => true,
    'message' => 'Halo dari Vercel PHP!',
    'timestamp' => date('Y-m-d H:i:s')
];

// Mengubah array menjadi string JSON dan menampilkannya
echo json_encode($response);
?>
