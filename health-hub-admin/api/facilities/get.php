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
   GET SELECTED FACILITIES
   ========================================================== */

$sql = "
    SELECT
        facility_id,
        facility_name
    FROM hospital_facilities
    WHERE is_selected = 1
    ORDER BY facility_name ASC
";


$result = mysqli_query($con, $sql);


if (!$result) {

    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($con)
    ]);

    exit;
}


$facilities = [];


while ($row = mysqli_fetch_assoc($result)) {

    $facilities[] = [
        "id" => (int)$row["facility_id"],
        "name" => $row["facility_name"]
    ];
}


echo json_encode([
    "status" => "success",
    "data" => $facilities
]);


mysqli_close($con);

?>