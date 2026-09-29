<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "../db.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query(
        "SELECT english_name, hindi_name, regional_name
         FROM hospital_language
         ORDER BY id DESC LIMIT 1"
    );

    $row = $result ? $result->fetch_assoc() : null;

    echo json_encode([
        "success" => true,
        "data" => $row ?: [
            "english_name" => "",
            "hindi_name" => "",
            "regional_name" => ""
        ]
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Only GET and POST are supported."
    ]);
    exit;
}

$request = json_decode(file_get_contents('php://input'), true) ?: [];
$englishName = trim((string)($request['english_name'] ?? ''));
$hindiName = trim((string)($request['hindi_name'] ?? ''));
$regionalName = trim((string)($request['regional_name'] ?? ''));

if ($englishName === '' || $hindiName === '' || $regionalName === '') {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "All hospital language names are required."
    ]);
    exit;
}

$statement = $conn->prepare(
    "INSERT INTO hospital_language
    (english_name, hindi_name, regional_name)
    VALUES (?, ?, ?)"
);

if (!$statement) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to prepare hospital language save."
    ]);
    exit;
}

$statement->bind_param("sss", $englishName, $hindiName, $regionalName);

if (!$statement->execute()) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to save hospital language names."
    ]);
    $statement->close();
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Hospital language names saved successfully.",
    "id" => $statement->insert_id
]);

$statement->close();
$conn->close();