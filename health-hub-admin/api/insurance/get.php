<?php

require_once "../../db.php";

header("Content-Type: application/json; charset=utf-8");

header(
    "Access-Control-Allow-Origin: *"
);

header(
    "Access-Control-Allow-Methods: GET, OPTIONS"
);

header(
    "Access-Control-Allow-Headers: Content-Type"
);


/* Handle CORS preflight */

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


/* ==========================================================
   GET SELECTED INSURANCE COMPANIES
   ========================================================== */

$sql = "
    SELECT
        insurance_company_id,
        insurance_company_name
    FROM hospital_insurance_companies
    WHERE is_selected = 1
    ORDER BY insurance_company_name ASC
";


$result = mysqli_query($con, $sql);


if (!$result) {

    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($con)
    ]);

    exit;
}


$insuranceCompanies = [];


while ($row = mysqli_fetch_assoc($result)) {

    $insuranceCompanies[] = [
        "id" => (int)$row["insurance_company_id"],
        "name" => $row["insurance_company_name"]
    ];
}


echo json_encode([
    "status" => "success",
    "data" => $insuranceCompanies
]);


mysqli_close($con);

?>