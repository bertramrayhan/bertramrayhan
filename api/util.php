<?php 
function returnMessage(bool $isSuccess, string $message) {
    return json_encode(['success' => $isSuccess, 'message' => $message]);
}

function checkRequestMethod($allowedMethod){
    if($_SERVER['REQUEST_METHOD'] !== $allowedMethod){
        http_response_code(405);
        echo returnMessage(false, 'Method tidak diizinkan');
        return false;
    }
    return true;
}

function preventDirectAccess($filename = null) {
    // Jika tidak ada filename yang diberikan, gunakan debug_backtrace untuk mendapatkan file yang memanggil
    if ($filename === null) {
        $backtrace = debug_backtrace();
        $filename = $backtrace[0]['file']; // File yang memanggil function ini
    }
    
    // Cek apakah file yang memanggil sama dengan file yang sedang diakses
    if (basename($filename) == basename($_SERVER['SCRIPT_FILENAME'])) {
        http_response_code(403);
        header('Content-Type: application/json');
        die(returnMessage(false, 'Direct access to this file is not allowed'));
    }
}

function trimData(array &$inputData){
    foreach ($inputData as $key => $value) {
        if (is_string($value)) {
            $inputData[$key] = trim($value);
        }
    }
}

function checkDataIfEmpty(array $inputData) {
    foreach ($inputData as $key => $value) {
        if (!isset($value) || (is_string($value) && trim($value) === "")) {
            echo returnMessage(false, "Data '" . $key . "' tidak boleh kosong.");
            return false;
        }
    }
    return true;
}

function returnErrorQuery($conn){
    http_response_code(500);
    echo returnMessage(false, "Gagal menjalankan query: " . $conn->error);
}

function handlePreflightRequest() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('HTTP/1.1 204 No Content');
        exit;
    }
}
?>