<?php

header("Content-Type: application/json");

header(
    "Access-Control-Allow-Origin: https://livtara.in"
);

header(
    "Access-Control-Allow-Methods: GET, OPTIONS"
);

header(
    "Access-Control-Allow-Headers: Content-Type"
);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../../db.php";


$result = $con->query("
    SELECT
        id,
        category_name,
        medical_firm_name,
        is_selected
    FROM medical_firm_types
    ORDER BY category_name ASC, id ASC
");


if (!$result) {

    echo json_encode([
        "status" => false,
        "message" => $con->error
    ]);

    exit;
}


$data = [];

while ($row = $result->fetch_assoc()) {

    $data[] = [

        "id" => (int)$row["id"],

        "category_name" =>
            $row["category_name"],

        "medical_firm_name" =>
            $row["medical_firm_name"],

        "is_selected" =>
            (int)$row["is_selected"]

    ];

}


echo json_encode([
    "status" => true,
    "data" => $data
]);


$con->close();

?>