<?php
require_once "../../db.php";
header("Access-Control-Allow-Origin: http://localhost:8001");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

header("Content-Type: application/json");


/* ==========================================
   CONNECT DATABASE
========================================== */

// $con = mysqli_connect(
//     "localhost",
//     "root",
//     "",
//     "healthhubadmin"
// );

// if (!$con) {

//     echo json_encode([
//         "status" => "error",
//         "message" => "Database connection failed: " . mysqli_connect_error()
//     ]);

//     exit;
// }


/* ==========================================
   READ JSON
========================================== */

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$systems = $data["medical_systems"] ?? [];


if (empty($systems)) {

    echo json_encode([
        "status" => "error",
        "message" => "No medical systems received."
    ]);

    exit;
}


/* ==========================================
   SAVE MEDICAL SYSTEMS
========================================== */

foreach ($systems as $system) {

    $systemId =
        (int)($system["medical_system_id"] ?? 0);

    $systemName =
        $system["medical_system_name"] ?? "";

    $isSelected =
        (int)($system["selected"] ?? 0);


    if ($systemId <= 0 || $systemName === "") {
        continue;
    }


    $stmt = mysqli_prepare(
        $con,

        "INSERT INTO hospital_medical_systems
        (medical_system_id, medical_system_name, is_selected)

        VALUES (?, ?, ?)

        ON DUPLICATE KEY UPDATE
        medical_system_name = VALUES(medical_system_name),
        is_selected = VALUES(is_selected)"
    );


    if (!$stmt) {

        echo json_encode([
            "status" => "error",
            "message" => mysqli_error($con)
        ]);

        exit;
    }


    mysqli_stmt_bind_param(
        $stmt,
        "isi",
        $systemId,
        $systemName,
        $isSelected
    );


    if (!mysqli_stmt_execute($stmt)) {

        echo json_encode([
            "status" => "error",
            "message" => mysqli_stmt_error($stmt)
        ]);

        exit;
    }


    mysqli_stmt_close($stmt);
}


/* ==========================================
   SUCCESS
========================================== */

echo json_encode([
    "status" => "success",
    "message" => "Medical systems saved successfully."
]);


mysqli_close($con);

?>