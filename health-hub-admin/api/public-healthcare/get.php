<?php

require_once "../../db.php";

header("Content-Type: application/json; charset=utf-8");

header(
    "Access-Control-Allow-Origin: https://livtara.in"
);

header(
    "Access-Control-Allow-Methods: GET, OPTIONS"
);

header(
    "Access-Control-Allow-Headers: Content-Type"
);


/* ==========================================================
   CORS PREFLIGHT
========================================================== */

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(200);
    exit;

}


/* ==========================================================
   ONLY GET ALLOWED
========================================================== */

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method."
    ]);

    exit;

}


/* ==========================================================
   GET SELECTED PUBLIC HEALTHCARE
========================================================== */

$sql = "
    SELECT
        id,
        name,
        is_selected
    FROM public_healthcare
    WHERE is_selected = 1
    ORDER BY name ASC
";


$result = mysqli_query(
    $con,
    $sql
);


if (!$result) {

    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($con)
    ]);

    exit;

}


/* ==========================================================
   BUILD RESPONSE
========================================================== */

$data = [];


while ($row = mysqli_fetch_assoc($result)) {

    $data[] = [

        "id" =>
            (int)$row["id"],

        "name" =>
            $row["name"],

        "selected" =>
            (int)$row["is_selected"]

    ];

}


/* ==========================================================
   SUCCESS
========================================================== */

echo json_encode([
    "status" => "success",
    "data" => $data
]);


mysqli_close($con);

?>