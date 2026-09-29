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
   GET SELECTED DEPARTMENTS
   ========================================================== */

$sql = "
    SELECT
        department_id,
        department_name
    FROM hospital_departments
    WHERE is_selected = 1
    ORDER BY department_name ASC
";


$result = mysqli_query($con, $sql);


if (!$result) {

    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($con)
    ]);

    exit;
}


$departments = [];


while ($row = mysqli_fetch_assoc($result)) {

    $departments[] = [
        "id" => (int)$row["department_id"],
        "name" => $row["department_name"]
    ];
}


echo json_encode([
    "status" => "success",
    "data" => $departments
]);


mysqli_close($con);

?>