<?php

require_once "../../db.php";

header("Content-Type: application/json; charset=utf-8");

header(
    "Access-Control-Allow-Origin: https://livtara.in"
);

header(
    "Access-Control-Allow-Methods: POST, OPTIONS"
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
   ONLY POST ALLOWED
========================================================== */

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


/* ==========================================================
   GET PUBLIC HEALTHCARE DATA
========================================================== */

$publicHealthcare =
    $data["public_healthcare"] ?? [];


if (empty($publicHealthcare)) {

    echo json_encode([
        "status" => "error",
        "message" => "No Public Healthcare data received."
    ]);

    exit;

}


/* ==========================================================
   SAVE PUBLIC HEALTHCARE
========================================================== */

foreach ($publicHealthcare as $item) {

    $id =
        (int)($item["id"] ?? 0);

    $name =
        trim(
            $item["name"] ?? ""
        );

    $isSelected =
        (int)($item["selected"] ?? 0);


    /* ======================================================
       VALIDATE
    ====================================================== */

    if (
        $id <= 0 ||
        $name === ""
    ) {

        continue;

    }


    /* ======================================================
       INSERT / UPDATE
    ====================================================== */

    $stmt = mysqli_prepare(
        $con,

        "INSERT INTO public_healthcare
        (
            id,
            name,
            is_selected
        )

        VALUES (?, ?, ?)

        ON DUPLICATE KEY UPDATE

            name = VALUES(name),

            is_selected = VALUES(is_selected)"
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
        $id,
        $name,
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
    "message" => "Public Healthcare saved successfully."
]);


mysqli_close($con);

?>