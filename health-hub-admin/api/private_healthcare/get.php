<?php

header("Content-Type: application/json");

// Allow Health Hub Admin
header("Access-Control-Allow-Origin: https://livtara.in");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../db.php";

$result = $conn->query("
    SELECT *
    FROM private_healthcare
    ORDER BY id ASC
");

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$conn->close();
?>