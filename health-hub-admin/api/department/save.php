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

$department_name = trim($_POST['name'] ?? '');


/* ==========================================================
   VALIDATION
========================================================== */

if ($department_name === '') {

    echo json_encode([
        "success" => false,
        "message" => "Please enter Department Name."
    ]);

    exit;
}


/* ==========================================================
   IMAGE UPLOAD
========================================================== */

$imageName = "";

if (isset($_FILES["image"]) && $_FILES["image"]["error"] === 0) {

    $uploadDir = "../../uploads/departments/";

    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $extension = pathinfo(
        $_FILES["image"]["name"],
        PATHINFO_EXTENSION
    );

    $imageName = time() . "_" . rand(1000, 9999) . "." . $extension;

    if (!move_uploaded_file(
        $_FILES["image"]["tmp_name"],
        $uploadDir . $imageName
    )) {

        echo json_encode([
            "success" => false,
            "message" => "Failed to upload department image."
        ]);

        exit;
    }
}


/* ==========================================================
   INSERT
========================================================== */

$stmt = $conn->prepare(
    "INSERT INTO departments
    (department_name, department_image)
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
    "ss",
    $department_name,
    $imageName
);


/* ==========================================================
   EXECUTE
========================================================== */

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Department added successfully.",
        "id" => $stmt->insert_id
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to save Department: " . $stmt->error
    ]);

}


$stmt->close();
$conn->close();

?>