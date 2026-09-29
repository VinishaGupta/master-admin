<?php

require_once "../../db.php";

header("Content-Type: application/json; charset=utf-8");

header(
    "Access-Control-Allow-Origin: https://superadmin.livtara.in"
);

header(
    "Access-Control-Allow-Methods: POST, OPTIONS"
);

header(
    "Access-Control-Allow-Headers: Content-Type"
);


/* Handle CORS preflight */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


/* Only POST allowed */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method."
    ]);

    exit;
}


/* ==========================================================
   READ JSON DATA
   ========================================================== */

$data = json_decode(
    file_get_contents("php://input"),
    true
);


if (!is_array($data)) {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON data."
    ]);

    exit;
}


$services = $data["services"] ?? [];


if (empty($services)) {

    echo json_encode([
        "status" => "error",
        "message" => "No services received."
    ]);

    exit;
}


/* ==========================================================
   SAVE SERVICES
   ========================================================== */

foreach ($services as $service) {

    $serviceId =
        (int)($service["id"] ?? 0);

    $serviceName =
        trim(
            $service["name"]
            ?? $service["service_name"]
            ?? ""
        );

    $isSelected =
        (int)($service["selected"] ?? 0);


    /* Skip invalid records */

    if (
        $serviceId <= 0 ||
        $serviceName === ""
    ) {
        continue;
    }


    /* ======================================================
       INSERT / UPDATE
       ====================================================== */

    $stmt = mysqli_prepare(
        $con,

        "INSERT INTO hospital_services
        (
            service_id,
            service_name,
            is_selected
        )

        VALUES (?, ?, ?)

        ON DUPLICATE KEY UPDATE

            service_name =
                VALUES(service_name),

            is_selected =
                VALUES(is_selected)"
    );


    if (!$stmt) {

        echo json_encode([
            "status" => "error",
            "message" =>
                "Prepare failed: " .
                mysqli_error($con)
        ]);

        exit;
    }


    mysqli_stmt_bind_param(
        $stmt,
        "isi",
        $serviceId,
        $serviceName,
        $isSelected
    );


    if (!mysqli_stmt_execute($stmt)) {

        echo json_encode([
            "status" => "error",
            "message" =>
                "Execute failed: " .
                mysqli_stmt_error($stmt)
        ]);

        mysqli_stmt_close($stmt);

        exit;
    }


    mysqli_stmt_close($stmt);
}


/* ==========================================================
   SUCCESS
   ========================================================== */

echo json_encode([
    "status" => "success",
    "message" => "Services saved successfully."
]);


mysqli_close($con);

?>