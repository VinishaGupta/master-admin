<?php

require_once "../../db.php";

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: https://livtara.in");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method."
    ]);
    exit;
}

$id = (int)($_POST['id'] ?? 0);

$award_title = trim($_POST['award_title'] ?? '');
$awarded_by = trim($_POST['awarded_by'] ?? '');
$award_date = trim($_POST['award_date'] ?? '');
$description = trim($_POST['description'] ?? '');

if ($id <= 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid award ID."
    ]);
    exit;
}

if ($award_title === '') {
    echo json_encode([
        "status" => "error",
        "message" => "Award title is required."
    ]);
    exit;
}

if ($awarded_by === '') {
    echo json_encode([
        "status" => "error",
        "message" => "Awarded by is required."
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| GET EXISTING IMAGE
|--------------------------------------------------------------------------
*/

$oldImage = null;

$stmt = mysqli_prepare(
    $con,
    "SELECT image FROM hospital_awards WHERE id = ?"
);

mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($result);

mysqli_stmt_close($stmt);

if (!$row) {
    echo json_encode([
        "status" => "error",
        "message" => "Award not found."
    ]);
    exit;
}

$oldImage = $row['image'];

/*
|--------------------------------------------------------------------------
| IMAGE
|--------------------------------------------------------------------------
*/

$image = $oldImage;

if (
    isset($_FILES['image']) &&
    $_FILES['image']['error'] !== UPLOAD_ERR_NO_FILE
) {

    if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode([
            "status" => "error",
            "message" => "Image upload failed."
        ]);
        exit;
    }

    $allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ];

    $fileType = mime_content_type($_FILES['image']['tmp_name']);

    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode([
            "status" => "error",
            "message" => "Only JPG, PNG and WEBP images are allowed."
        ]);
        exit;
    }

    $uploadDir = "../../../uploads/hospital-awards/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $extension = strtolower(
        pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION)
    );

    $fileName = uniqid('award_', true) . '.' . $extension;

    $targetPath = $uploadDir . $fileName;

    if (!move_uploaded_file(
        $_FILES['image']['tmp_name'],
        $targetPath
    )) {
        echo json_encode([
            "status" => "error",
            "message" => "Unable to save image."
        ]);
        exit;
    }

    $image = "uploads/hospital-awards/" . $fileName;

    /*
    | Delete old image
    */

    if (!empty($oldImage)) {

        $oldFile = "../../../" . $oldImage;

        if (file_exists($oldFile)) {
            unlink($oldFile);
        }
    }
}

$stmt = mysqli_prepare(
    $con,
    "UPDATE hospital_awards
     SET
        award_title = ?,
        awarded_by = ?,
        award_date = NULLIF(?, ''),
        description = ?,
        image = ?
     WHERE id = ?"
);

mysqli_stmt_bind_param(
    $stmt,
    "sssssi",
    $award_title,
    $awarded_by,
    $award_date,
    $description,
    $image,
    $id
);

if (!mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_stmt_error($stmt)
    ]);
    exit;
}

echo json_encode([
    "status" => "success",
    "message" => "Award updated successfully."
]);

mysqli_stmt_close($stmt);
mysqli_close($con);

?>