<?php

if (
    ($_SERVER['HTTP_HOST'] ?? '') === 'localhost' ||
    ($_SERVER['HTTP_HOST'] ?? '') === '127.0.0.1' ||
    str_starts_with($_SERVER['HTTP_HOST'] ?? '', 'localhost:')
) {

    // LOCAL
    $host = "localhost";
    $user = "root";
    $password = "";
    $database = "healthhubadmin";

} else {

    // LIVE - HOSTINGER
    $host = "localhost";
    $user = "u117643329_healthhubadmin";
    $password = "Healthhubadmin@2026";
    $database = "u117643329_healthhubadmin";
}

$con = mysqli_connect($host, $user, $password, $database);

if (!$con) {
    die("Database connection failed: " . mysqli_connect_error());
}

mysqli_set_charset($con, "utf8mb4");
?>