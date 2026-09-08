<?php

header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Origin: http://localhost:8000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../db.php";


/* ==========================================================
   GET DATA
========================================================== */

$category_name = trim($_POST['category_name'] ?? '');
$medical_firm_name = trim($_POST['medical_firm_name'] ?? '');

$is_selected = isset($_POST['is_selected'])
    ? (int) $_POST['is_selected']
    : 0;


/* ==========================================================
   VALIDATION
========================================================== */

if ($category_name === '') {

    echo json_encode([
        "success" => false,
        "message" => "Please enter Category Name."
    ]);

    exit;
}


if ($medical_firm_name === '') {

    echo json_encode([
        "success" => false,
        "message" => "Please enter Medical Firm Name."
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
    "INSERT INTO types_of_medical_firm
    (category_name, medical_firm_name, is_selected)
    VALUES (?, ?, ?)"
);


if (!$stmt) {

    echo json_encode([
        "success" => false,
        "message" => "Failed to prepare query: " . $conn->error
    ]);

    exit;
}


$stmt->bind_param(
    "ssi",
    $category_name,
    $medical_firm_name,
    $is_selected
);


/* ==========================================================
   EXECUTE
========================================================== */

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Medical Firm Type added successfully.",
        "id" => $stmt->insert_id
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to save Medical Firm Type: " . $stmt->error
    ]);

}


$stmt->close();
$conn->close();

?>