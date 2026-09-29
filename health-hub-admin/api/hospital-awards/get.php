<?php

require_once "../../db.php";

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: https://livtara.in");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method."
    ]);
    exit;
}

$sql = "
    SELECT
        id,
        award_title,
        awarded_by,
        award_date,
        description,
        image,
        created_at,
        updated_at
    FROM hospital_awards
    ORDER BY id DESC
";

$result = mysqli_query($con, $sql);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($con)
    ]);
    exit;
}

$data = [];

while ($row = mysqli_fetch_assoc($result)) {

    $data[] = [
        "id" => (int)$row["id"],
        "award_title" => $row["award_title"],
        "awarded_by" => $row["awarded_by"],
        "award_date" => $row["award_date"],
        "description" => $row["description"],
        "image" => $row["image"],
        "created_at" => $row["created_at"],
        "updated_at" => $row["updated_at"]
    ];
}

echo json_encode([
    "status" => "success",
    "data" => $data
]);

mysqli_close($con);
?>