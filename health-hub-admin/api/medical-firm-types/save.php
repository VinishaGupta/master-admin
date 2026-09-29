<?php

header("Content-Type: application/json");

header(
    "Access-Control-Allow-Origin: https://livtara.in"
);

header(
    "Access-Control-Allow-Methods: POST, OPTIONS"
);

header(
    "Access-Control-Allow-Headers: Content-Type"
);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../../db.php";


/* ==========================================================
   READ JSON
========================================================== */

$input = json_decode(
    file_get_contents("php://input"),
    true
);


if (!$input) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid JSON data."
    ]);

    exit;
}


$medicalFirmTypes =
    $input["medical_firm_types"] ?? [];


if (!is_array($medicalFirmTypes)) {

    echo json_encode([
        "status" => false,
        "message" => "Invalid medical firm data."
    ]);

    exit;
}


/* ==========================================================
   SAVE
========================================================== */

$stmt = $con->prepare("
    INSERT INTO medical_firm_types
    (
        id,
        category_name,
        medical_firm_name,
        is_selected
    )
    VALUES (?, ?, ?, ?)

    ON DUPLICATE KEY UPDATE

        category_name =
            VALUES(category_name),

        medical_firm_name =
            VALUES(medical_firm_name),

        is_selected =
            VALUES(is_selected)
");


if (!$stmt) {

    echo json_encode([
        "status" => false,
        "message" => "Database statement failed.",
        "error" => $con->error
    ]);

    exit;
}


foreach ($medicalFirmTypes as $item) {

    $id =
        (int)($item["id"] ?? 0);

    $category =
        trim($item["category_name"] ?? "");

    $name =
        trim($item["medical_firm_name"] ?? "");

    $selected =
        (int)($item["is_selected"] ?? 0);


    if (
        $id <= 0 ||
        $category === "" ||
        $name === ""
    ) {
        continue;
    }


    $stmt->bind_param(
        "issi",
        $id,
        $category,
        $name,
        $selected
    );


    if (!$stmt->execute()) {

        echo json_encode([
            "status" => false,
            "message" => "Failed to save medical firm type.",
            "error" => $stmt->error
        ]);

        $stmt->close();
        $con->close();

        exit;
    }
}


$stmt->close();
$con->close();


echo json_encode([
    "status" => true,
    "message" => "Medical Firm Types saved successfully."
]);

?>