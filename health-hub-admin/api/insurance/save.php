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


$insuranceCompanies =
    $data["insurance_companies"] ?? [];


if (empty($insuranceCompanies)) {

    echo json_encode([
        "status" => "error",
        "message" => "No insurance companies received."
    ]);

    exit;
}


/* ==========================================================
   SAVE INSURANCE COMPANIES
   ========================================================== */

foreach ($insuranceCompanies as $company) {

    $companyId =
        (int)($company["insurance_company_id"] ?? 0);

    $companyName =
        trim($company["insurance_company_name"] ?? "");

    $isSelected =
        (int)($company["selected"] ?? 0);


    /* Skip invalid records */

    if (
        $companyId <= 0 ||
        $companyName === ""
    ) {
        continue;
    }


    /* ======================================================
       INSERT / UPDATE
       ====================================================== */

    $stmt = mysqli_prepare(
        $con,

        "INSERT INTO hospital_insurance_companies
        (
            insurance_company_id,
            insurance_company_name,
            is_selected
        )

        VALUES (?, ?, ?)

        ON DUPLICATE KEY UPDATE

            insurance_company_name =
                VALUES(insurance_company_name),

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
        $companyId,
        $companyName,
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
    "message" => "Insurance companies saved successfully."
]);


mysqli_close($con);

?>