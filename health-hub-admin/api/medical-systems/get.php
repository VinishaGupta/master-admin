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
   GET SELECTED MEDICAL SYSTEMS
   ========================================================== */

$sql = "
    SELECT
        medical_system_id,
        medical_system_name
    FROM hospital_medical_systems
    WHERE is_selected = 1
    ORDER BY medical_system_name ASC
";


$result = mysqli_query($con, $sql);


if (!$result) {

    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($con)
    ]);

    exit;
}


$systems = [];


while ($row = mysqli_fetch_assoc($result)) {

    $systems[] = [
        "id" => (int)$row["medical_system_id"],
        "name" => $row["medical_system_name"]
    ];
}


echo json_encode([
    "status" => "success",
    "data" => $systems
]);


mysqli_close($con);

?>