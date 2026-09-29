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
   GET SELECTED SERVICES
   ========================================================== */

$sql = "
    SELECT
        service_id,
        service_name
    FROM hospital_services
    WHERE is_selected = 1
    ORDER BY service_name ASC
";


$result = mysqli_query($con, $sql);


if (!$result) {

    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($con)
    ]);

    exit;
}


$services = [];


while ($row = mysqli_fetch_assoc($result)) {

    $services[] = [
        "id" => (int)$row["service_id"],
        "name" => $row["service_name"]
    ];
}


echo json_encode([
    "status" => "success",
    "data" => $services
]);


mysqli_close($con);

?>