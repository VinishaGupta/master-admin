<?php

require_once "../../db.php";

header("Content-Type: application/json; charset=utf-8");

header(
    "Access-Control-Allow-Origin: *"
);

header(
    "Access-Control-Allow-Methods: GET, OPTIONS"
);

header(
    "Access-Control-Allow-Headers: Content-Type"
);


/* Handle CORS preflight */

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(200);
    exit;
}


/* ==========================================================
   GET ONLY SELECTED THERAPIES
   ========================================================== */

$sql = "
    SELECT
        therapy_id,
        therapy_name
    FROM hospital_therapies
    WHERE is_selected = 1
    ORDER BY therapy_name ASC
";


$result = mysqli_query($con, $sql);


if (!$result) {

    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($con)
    ]);

    exit;
}


$therapies = [];


while ($row = mysqli_fetch_assoc($result)) {

    $therapies[] = [
        "id" => (int)$row["therapy_id"],
        "name" => $row["therapy_name"]
    ];
}


echo json_encode([
    "status" => "success",
    "data" => $therapies
]);


mysqli_close($con);

?>