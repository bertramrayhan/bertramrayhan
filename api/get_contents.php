<?php
require_once __DIR__ . '/util.php';
require_once __DIR__ . '/connection.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

handlePreflightRequest();

if(!checkRequestMethod('GET')){return;}

if(!checkDataIfEmpty($_GET)){return;}

try {
    $contents = [];

    $lang = $_GET['lang'];
    $query = 'SELECT slug, content FROM sections WHERE lang=?';
    $statement = $pdo->prepare($query);
    $statement->bindParam(1, $lang, PDO::PARAM_STR);
    $statement->execute();

    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    foreach($results as $row) {
        $contents[$row['slug']] = $row['content'];
    }
    
    $query = 'SELECT name, imagePath AS imagePath, description, github, release, array_to_json(techs) as techs FROM projects WHERE lang=?;';
    $statement = $pdo->prepare($query);
    $statement->execute([$lang]);
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Convert JSON string ke PHP array
    foreach($results as &$project) {
        if(isset($project['techs'])) {
            $project['techs'] = json_decode($project['techs'], true);
        }
    }

    echo json_encode([
        'success' => true,
        'contents' => $contents,
        'projects' => $results
    ]);
    
} catch(PDOException $e){
    http_response_code(500);
    echo returnMessage(false, 'Database error: ' . $e->getMessage());
} catch(Exception $e){
    http_response_code(500);
    echo returnMessage(false, 'Server error: ' . $e->getMessage());
}
?>