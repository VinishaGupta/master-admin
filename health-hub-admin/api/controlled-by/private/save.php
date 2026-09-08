<?php

header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Origin: http://localhost:8000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../../db.php";


/* ==========================================================
   GET DATA
========================================================== */

$name = trim($_POST['name'] ?? '');

$is_selected = isset($_POST['is_selected'])
    ? (int) $_POST['is_selected']
    : 0;


/* ==========================================================
   VALIDATION
========================================================== */

if ($name === '') {

    echo json_encode([
        "success" => false,
        "message" => "Please enter Private Healthcare Name."
    ]);

    exit;
}


/* ==========================================================
   VALIDATE is_selected
========================================================== */

$is_selected = ($is_selected === 1) ? 1 : 0;


/* ==========================================================
   INSERT
========================================================== */

$stmt = $conn->prepare(
    "INSERT INTO private_healthcare
    (name, is_selected)
    VALUES (?, ?)"
);


if (!$stmt) {

    echo json_encode([
        "success" => false,
        "message" => "Failed to prepare query: " . $conn->error
    ]);

    exit;
}


$stmt->bind_param(
    "si",
    $name,
    $is_selected
);


/* ==========================================================
   EXECUTE
========================================================== */

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Private Healthcare added successfully.",
        "id" => $stmt->insert_id
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to save Private Healthcare: " . $stmt->error
    ]);

}


$stmt->close();
$conn->close();

?>