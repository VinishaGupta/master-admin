<?php

/*
==========================================================
    DEPARTMENT SAVE API

    File:
    health-hub-admin/api/department/save.php

    Database:
    health-hub-admin/api/db.php
==========================================================
*/


/* ==========================================================
                    RESPONSE HEADER
========================================================== */

header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Origin: http://localhost:8000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


/* ==========================================================
                    OPTIONS REQUEST
========================================================== */

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(200);
    exit;

}


/* ==========================================================
                    ONLY POST ALLOWED
========================================================== */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Only POST requests are allowed."
    ]);

    exit;

}


/* ==========================================================
                    DATABASE CONNECTION
========================================================== */

/*
save.php:
health-hub-admin/api/department/save.php

db.php:
health-hub-admin/api/db.php

Therefore:
../db.php
*/

require_once "../db.php";


/* ==========================================================
                    GET DEPARTMENT NAME
========================================================== */

$department_name = trim($_POST["name"] ?? "");


/* ==========================================================
                    VALIDATION
========================================================== */

if ($department_name === "") {

    echo json_encode([
        "success" => false,
        "message" => "Please enter Department Name."
    ]);

    exit;

}


/*
Maximum department name length
*/

if (mb_strlen($department_name) > 150) {

    echo json_encode([
        "success" => false,
        "message" => "Department Name cannot exceed 150 characters."
    ]);

    exit;

}


/* ==========================================================
                    IMAGE SETTINGS
========================================================== */

$imageName = "";


/*
Maximum image size:
5 MB
*/

$maxFileSize = 5 * 1024 * 1024;


/*
Allowed MIME types
*/

$allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
];


/*
Allowed extensions
*/

$allowedExtensions = [
    "jpg",
    "jpeg",
    "png",
    "webp"
];


/* ==========================================================
                    IMAGE UPLOAD
========================================================== */

if (isset($_FILES["image"]) && $_FILES["image"]["error"] !== UPLOAD_ERR_NO_FILE) {


    /* ------------------------------------------------------
                        CHECK UPLOAD ERROR
    ------------------------------------------------------ */

    if ($_FILES["image"]["error"] !== UPLOAD_ERR_OK) {

        echo json_encode([
            "success" => false,
            "message" => "There was an error uploading the department image."
        ]);

        exit;

    }


    /* ------------------------------------------------------
                        CHECK FILE SIZE
    ------------------------------------------------------ */

    if ($_FILES["image"]["size"] > $maxFileSize) {

        echo json_encode([
            "success" => false,
            "message" => "Department image must be smaller than 5 MB."
        ]);

        exit;

    }


    /* ------------------------------------------------------
                        GET EXTENSION
    ------------------------------------------------------ */

    $originalName = $_FILES["image"]["name"];

    $extension = strtolower(
        pathinfo($originalName, PATHINFO_EXTENSION)
    );


    /* ------------------------------------------------------
                        CHECK EXTENSION
    ------------------------------------------------------ */

    if (!in_array($extension, $allowedExtensions, true)) {

        echo json_encode([
            "success" => false,
            "message" => "Invalid image format. Please use JPG, JPEG, PNG or WEBP."
        ]);

        exit;

    }


    /* ------------------------------------------------------
                        CHECK MIME TYPE
    ------------------------------------------------------ */

    $fileInfo = finfo_open(FILEINFO_MIME_TYPE);

    if ($fileInfo === false) {

        echo json_encode([
            "success" => false,
            "message" => "Unable to verify uploaded image."
        ]);

        exit;

    }


    $mimeType = finfo_file(
        $fileInfo,
        $_FILES["image"]["tmp_name"]
    );

    finfo_close($fileInfo);


    if (!in_array($mimeType, $allowedMimeTypes, true)) {

        echo json_encode([
            "success" => false,
            "message" => "Invalid image file."
        ]);

        exit;

    }


    /* ------------------------------------------------------
                        CHECK ACTUAL IMAGE
    ------------------------------------------------------ */

    if (@getimagesize($_FILES["image"]["tmp_name"]) === false) {

        echo json_encode([
            "success" => false,
            "message" => "The uploaded file is not a valid image."
        ]);

        exit;

    }


    /* ------------------------------------------------------
                        UPLOAD DIRECTORY
    ------------------------------------------------------ */

    /*
    Current file:

    health-hub-admin/api/department/save.php

    Go:
    ../../

    Then:
    uploads/departments/
    */

    $uploadDir = dirname(__DIR__, 2) . "/uploads/departments/";


    /* ------------------------------------------------------
                        CREATE DIRECTORY
    ------------------------------------------------------ */

    if (!is_dir($uploadDir)) {

        if (!mkdir($uploadDir, 0777, true)) {

            echo json_encode([
                "success" => false,
                "message" => "Failed to create department image folder."
            ]);

            exit;

        }

    }


    /* ------------------------------------------------------
                        GENERATE UNIQUE FILE NAME
    ------------------------------------------------------ */

    $imageName =
        "department_" .
        date("Ymd_His") .
        "_" .
        bin2hex(random_bytes(5)) .
        "." .
        $extension;


    $imagePath = $uploadDir . $imageName;


    /* ------------------------------------------------------
                        MOVE IMAGE
    ------------------------------------------------------ */

    if (!move_uploaded_file(
        $_FILES["image"]["tmp_name"],
        $imagePath
    )) {

        echo json_encode([
            "success" => false,
            "message" => "Failed to save department image."
        ]);

        exit;

    }

}


/* ==========================================================
                    DATABASE INSERT
========================================================== */

$stmt = $conn->prepare(
    "INSERT INTO departments
    (department_name, department_image)
    VALUES (?, ?)"
);


/* ==========================================================
                    CHECK PREPARE
========================================================== */

if (!$stmt) {

    /*
    If database insert fails after image upload,
    remove the uploaded image so we don't leave
    an unused file.
    */

    if ($imageName !== "" && isset($imagePath) && file_exists($imagePath)) {
        unlink($imagePath);
    }


    echo json_encode([
        "success" => false,
        "message" => "Failed to prepare database query: " . $conn->error
    ]);

    exit;

}


/* ==========================================================
                    BIND VALUES
========================================================== */

$stmt->bind_param(
    "ss",
    $department_name,
    $imageName
);


/* ==========================================================
                    EXECUTE QUERY
========================================================== */

if ($stmt->execute()) {

    $departmentId = $stmt->insert_id;


    /*
    Image URL returned to frontend.
    */

    $imageUrl = "";

    if ($imageName !== "") {

        $imageUrl =
            "/health-hub-admin/uploads/departments/" .
            $imageName;

    }


    echo json_encode([
        "success" => true,
        "message" => "Department added successfully.",
        "id" => $departmentId,
        "department_name" => $department_name,
        "department_image" => $imageName,
        "image_url" => $imageUrl
    ]);


} else {


    /*
    Database insert failed.
    Delete uploaded image if it exists.
    */

    if ($imageName !== "" && isset($imagePath) && file_exists($imagePath)) {
        unlink($imagePath);
    }


    echo json_encode([
        "success" => false,
        "message" => "Failed to save Department: " . $stmt->error
    ]);

}


/* ==========================================================
                    CLOSE CONNECTION
========================================================== */

$stmt->close();

$conn->close();

?>