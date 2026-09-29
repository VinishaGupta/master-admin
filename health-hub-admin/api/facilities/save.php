<?php
require_once "../../db.php";
header("Access-Control-Allow-Origin: https://superadmin.livtara.in");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

header("Content-Type: application/json");


/* ==========================================
   CONNECT TO HEALTH HUB ADMIN DATABASE
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
   READ JSON DATA
========================================== */

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$facilities = $data["facilities"] ?? [];


if (empty($facilities)) {

    echo json_encode([
        "status" => "error",
        "message" => "No facilities received."
    ]);

    exit;
}


/* ==========================================
   SAVE FACILITIES
========================================== */

foreach ($facilities as $facility) {

    $facilityId = (int)($facility["facility_id"] ?? 0);

    $facilityName =
        $facility["facility_name"] ?? "";

    $isSelected =
        (int)($facility["selected"] ?? 0);


    if ($facilityId <= 0 || $facilityName === "") {
        continue;
    }


    $stmt = mysqli_prepare(
        $con,

        "INSERT INTO hospital_facilities
        (facility_id, facility_name, is_selected)

        VALUES (?, ?, ?)

        ON DUPLICATE KEY UPDATE
        facility_name = VALUES(facility_name),
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
        $facilityId,
        $facilityName,
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
    "message" => "Facilities saved successfully."
]);


mysqli_close($con);

?>
