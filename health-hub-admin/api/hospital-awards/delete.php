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

if ($id <= 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid award ID."
    ]);
    exit;
}

/*
|--------------------------------------------------------------------------
| GET IMAGE BEFORE DELETE
|--------------------------------------------------------------------------
*/

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

$image = $row['image'];

/*
|--------------------------------------------------------------------------
| DELETE DATABASE RECORD
|--------------------------------------------------------------------------
*/

$stmt = mysqli_prepare(
    $con,
    "DELETE FROM hospital_awards WHERE id = ?"
);

mysqli_stmt_bind_param($stmt, "i", $id);

if (!mysqli_stmt_execute($stmt)) {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_stmt_error($stmt)
    ]);
    exit;
}

mysqli_stmt_close($stmt);

/*
|--------------------------------------------------------------------------
| DELETE IMAGE FILE
|--------------------------------------------------------------------------
*/

if (!empty($image)) {

    $imagePath = "../../../" . $image;

    if (file_exists($imagePath)) {
        unlink($imagePath);
    }
}

echo json_encode([
    "status" => "success",
    "message" => "Award deleted successfully."
]);

mysqli_close($con);

?>