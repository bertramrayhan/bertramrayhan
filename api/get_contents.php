<?php
require_once __DIR__ . '/util.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

handlePreflightRequest();

if(!checkRequestMethod('GET')){return;}

if(!checkDataIfEmpty($_GET)){return;}

echo returnMessage(true, 'berhasil nyambung');
?>