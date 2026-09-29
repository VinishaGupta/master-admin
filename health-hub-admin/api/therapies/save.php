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


$therapies = $data["therapies"] ?? [];


if (empty($therapies)) {

    echo json_encode([
        "status" => "error",
        "message" => "No therapies received."
    ]);

    exit;
}


/* ==========================================================
   SAVE THERAPIES
   ========================================================== */

foreach ($therapies as $therapy) {

    $therapyId =
        (int)($therapy["therapy_id"] ?? 0);

    $therapyName =
        trim($therapy["therapy_name"] ?? "");

    $isSelected =
        (int)($therapy["selected"] ?? 0);


    /* Skip invalid records */

    if (
        $therapyId <= 0 ||
        $therapyName === ""
    ) {
        continue;
    }


    /* ======================================================
       INSERT / UPDATE
       ====================================================== */

    $stmt = mysqli_prepare(
        $con,

        "INSERT INTO hospital_therapies
        (
            therapy_id,
            therapy_name,
            is_selected
        )

        VALUES (?, ?, ?)

        ON DUPLICATE KEY UPDATE

            therapy_name =
                VALUES(therapy_name),

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
        $therapyId,
        $therapyName,
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
    "message" => "Therapies saved successfully."
]);


mysqli_close($con);

?>