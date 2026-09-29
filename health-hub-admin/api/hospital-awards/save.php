<?php

/* ==========================================================
   HOSPITAL AWARDS - SAVE API
========================================================== */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: https://livtara.in");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


/* ==========================================================
   CORS
========================================================== */

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


/* ==========================================================
   ONLY POST
========================================================== */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    echo json_encode([
        "status" => "error",
        "message" => "Only POST request is allowed."
    ]);

    exit;
}


/* ==========================================================
   DATABASE
========================================================== */

require_once "../../db.php";


/* ==========================================================
   CHECK CONNECTION
========================================================== */

if (!$con) {

    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " .
                     mysqli_connect_error()
    ]);

    exit;
}


/* ==========================================================
   FORCE CORRECT DATABASE
========================================================== */

if (!mysqli_select_db(
    $con,
    "u117643329_healthhubadmin"
)) {

    echo json_encode([
        "status" => "error",
        "message" => "Unable to select database: " .
                     mysqli_error($con)
    ]);

    exit;
}


mysqli_set_charset($con, "utf8mb4");


/* ==========================================================
   GET FORM DATA
========================================================== */

$award_title = trim(
    $_POST['award_title'] ?? ''
);

$awarded_by = trim(
    $_POST['awarded_by'] ?? ''
);

$award_date = trim(
    $_POST['award_date'] ?? ''
);

$description = trim(
    $_POST['description'] ?? ''
);


/* ==========================================================
   VALIDATION
========================================================== */

if ($award_title === '') {

    echo json_encode([
        "status" => "error",
        "message" => "Award title is required."
    ]);

    exit;
}


if ($awarded_by === '') {

    echo json_encode([
        "status" => "error",
        "message" => "Awarded by is required."
    ]);

    exit;
}


if (strlen($description) > 100) {

    echo json_encode([
        "status" => "error",
        "message" => "Description cannot exceed 100 characters."
    ]);

    exit;
}


/* ==========================================================
   IMAGE
   OPTIONAL
========================================================== */

$image = null;


if (
    isset($_FILES['image']) &&
    $_FILES['image']['error'] !== UPLOAD_ERR_NO_FILE
) {

    if ($_FILES['image']['error'] !== UPLOAD_ERR_OK) {

        echo json_encode([
            "status" => "error",
            "message" => "Image upload failed. Error code: " .
                         $_FILES['image']['error']
        ]);

        exit;
    }


    $allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp'
    ];


    $fileType = mime_content_type(
        $_FILES['image']['tmp_name']
    );


    if (!in_array($fileType, $allowedTypes, true)) {

        echo json_encode([
            "status" => "error",
            "message" => "Only JPG, PNG and WEBP images are allowed."
        ]);

        exit;
    }


    if (
        $_FILES['image']['size'] >
        5 * 1024 * 1024
    ) {

        echo json_encode([
            "status" => "error",
            "message" => "Image must be smaller than 5 MB."
        ]);

        exit;
    }


    /* ------------------------------------------------------
       Upload folder
    ------------------------------------------------------ */

    $uploadDir =
        "../../uploads/hospital-awards/";


    if (!is_dir($uploadDir)) {

        if (!mkdir(
            $uploadDir,
            0755,
            true
        )) {

            echo json_encode([
                "status" => "error",
                "message" => "Unable to create upload directory."
            ]);

            exit;
        }
    }


    /* ------------------------------------------------------
       Filename
    ------------------------------------------------------ */

    $extension = strtolower(
        pathinfo(
            $_FILES['image']['name'],
            PATHINFO_EXTENSION
        )
    );


    $fileName =
        "award_" .
        uniqid() .
        "." .
        $extension;


    $targetPath =
        $uploadDir .
        $fileName;


    /* ------------------------------------------------------
       Move file
    ------------------------------------------------------ */

    if (!move_uploaded_file(
        $_FILES['image']['tmp_name'],
        $targetPath
    )) {

        echo json_encode([
            "status" => "error",
            "message" => "Unable to save image."
        ]);

        exit;
    }


    $image =
        "uploads/hospital-awards/" .
        $fileName;
}


/* ==========================================================
   INSERT
========================================================== */

$sql = "
    INSERT INTO hospital_awards
    (
        award_title,
        awarded_by,
        award_date,
        description,
        image
    )
    VALUES
    (
        ?,
        ?,
        NULLIF(?, ''),
        ?,
        ?
    )
";


$stmt = mysqli_prepare(
    $con,
    $sql
);


if (!$stmt) {

    echo json_encode([
        "status" => "error",
        "message" => "Prepare failed: " .
                     mysqli_error($con)
    ]);

    exit;
}


mysqli_stmt_bind_param(
    $stmt,
    "sssss",
    $award_title,
    $awarded_by,
    $award_date,
    $description,
    $image
);


/* ==========================================================
   EXECUTE
========================================================== */

if (!mysqli_stmt_execute($stmt)) {

    echo json_encode([
        "status" => "error",
        "message" => "Insert failed: " .
                     mysqli_stmt_error($stmt)
    ]);

    mysqli_stmt_close($stmt);
    mysqli_close($con);

    exit;
}


/* ==========================================================
   NEW ID
========================================================== */

$newId = mysqli_insert_id($con);


/* ==========================================================
   VERIFY INSERT
========================================================== */

$verifyStmt = mysqli_prepare(
    $con,
    "SELECT id, award_title, awarded_by
     FROM hospital_awards
     WHERE id = ?"
);


mysqli_stmt_bind_param(
    $verifyStmt,
    "i",
    $newId
);


mysqli_stmt_execute(
    $verifyStmt
);


$verifyResult =
    mysqli_stmt_get_result(
        $verifyStmt
    );


$verifyRow =
    mysqli_fetch_assoc(
        $verifyResult
    );


mysqli_stmt_close(
    $verifyStmt
);


/* ==========================================================
   FINAL RESPONSE
========================================================== */

if (!$verifyRow) {

    echo json_encode([
        "status" => "error",
        "message" => "Insert executed but verification failed.",
        "database" => "u117643329_healthhubadmin",
        "table" => "hospital_awards"
    ]);

    mysqli_stmt_close($stmt);
    mysqli_close($con);

    exit;
}


echo json_encode([
    "status" => "success",
    "message" => "Award saved successfully.",
    "database" => "u117643329_healthhubadmin",
    "table" => "hospital_awards",
    "id" => (int)$newId,
    "data" => [
        "id" => (int)$newId,
        "award_title" => $verifyRow["award_title"],
        "awarded_by" => $verifyRow["awarded_by"],
        "award_date" => $award_date,
        "description" => $description,
        "image" => $image
    ]
]);


mysqli_stmt_close($stmt);
mysqli_close($con);

?>