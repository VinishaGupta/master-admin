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
   READ JSON DATA
========================================================== */

$input = json_decode(
    file_get_contents("php://input"),
    true
);


if (!$input) {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON data."
    ]);

    exit;
}


/* ==========================================================
   GET PRIVATE HEALTHCARE DATA
========================================================== */

$privateHealthcare =
    $input['private_healthcare'] ?? [];


if (!is_array($privateHealthcare)) {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid Private Healthcare data."
    ]);

    exit;
}


/* ==========================================================
   CREATE TABLE IF NOT EXISTS
========================================================== */

$createTable = "
    CREATE TABLE IF NOT EXISTS private_healthcare (
        id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        is_selected TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    )
";


if (!$con->query($createTable)) {

    echo json_encode([
        "status" => "error",
        "message" => "Unable to create Private Healthcare table.",
        "error" => $con->error
    ]);

    exit;
}


/* ==========================================================
   SAVE DATA
========================================================== */

$stmt = $con->prepare("
    INSERT INTO private_healthcare
    (
        id,
        name,
        is_selected
    )
    VALUES (?, ?, ?)

    ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        is_selected = VALUES(is_selected)
");


if (!$stmt) {

    echo json_encode([
        "status" => "error",
        "message" => "Unable to prepare database statement.",
        "error" => $con->error
    ]);

    exit;
}


foreach ($privateHealthcare as $item) {

    $id =
        isset($item['id'])
            ? (int)$item['id']
            : 0;

    $name =
        trim($item['name'] ?? '');

    $selected =
        isset($item['selected'])
            ? (int)$item['selected']
            : 0;


    if ($id <= 0 || $name === '') {
        continue;
    }


    $stmt->bind_param(
        "isi",
        $id,
        $name,
        $selected
    );


    if (!$stmt->execute()) {

        echo json_encode([
            "status" => "error",
            "message" => "Failed to save Private Healthcare.",
            "error" => $stmt->error
        ]);

        $stmt->close();
        $con->close();

        exit;
    }
}


$stmt->close();
$con->close();


/* ==========================================================
   SUCCESS
========================================================== */

echo json_encode([
    "status" => "success",
    "message" => "Private Healthcare saved successfully."
]);

?>