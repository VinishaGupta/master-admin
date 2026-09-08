<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>Health Hub Admin</title>

    <!-- Google Font -->

    <link
        rel="preconnect"
        href="https://fonts.googleapis.com">

    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">

    <!-- Font Awesome -->

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

    <!-- CSS -->

    <link
        rel="stylesheet"
        href="css/health-hub-admin.css">
        <link rel="stylesheet" href="css/medical-system.css">
        <link rel="stylesheet" href="css/services.css">
        <link rel="stylesheet" href="css/facilities.css">
        <link rel="stylesheet" href="css/therapies.css">
        <link rel="stylesheet" href="css/insurance.css">
        <link rel="stylesheet" href="css/medical-firm-type.css">
        <link rel="stylesheet" href="css/hospital-language.css">
        <link rel="stylesheet" href="css/instructions.css">
        <link rel="stylesheet" href="css/advice.css">
        <link rel="stylesheet" href="css/instructions.css">
        <link rel="stylesheet" href="css/advice.css">
        <link rel="stylesheet" href="css/departments.css">
        <link rel="stylesheet" href="css/hospital-photos.css">
        <link rel="stylesheet" href="css/awarded-by.css">
        <link rel="stylesheet" href="css/emergency.css">

</head>

<body>

<div class="page-wrapper">

    <!-- ===========================================
                    BACK BUTTON
    ============================================ -->
<!-- ===========================================
                TOP BAR
============================================ -->

<div class="top-bar">

    <!-- BACK BUTTON -->

    <a
        href="../index.php"
        class="back-btn">

        <i class="fa-solid fa-arrow-left"></i>

        Back to Admin Portal

    </a>


    <!-- LOGOUT BUTTON -->

    <!--
        BACKEND INTEGRATION:
        This button is currently UI-only.

        Backend developer should connect this button
        to the actual logout endpoint.

        Logout should invalidate the authenticated
        session/token and redirect the user appropriately.
    -->

    <button
        type="button"
        class="logout-btn"
        id="logoutBtn">

        <i class="fa-solid fa-right-from-bracket"></i>

        Logout

    </button>

</div>
    

    <!-- ===========================================
                    HERO
    ============================================ -->

    <section class="hero-section">

        <div class="hero-overlay"></div>

        <div class="hero-content">

            <span class="hero-badge">

                Health Hub Administration

            </span>

            <h1>

                Healthcare Management Portal

            </h1>

            <p>

                Register hospitals, manage doctors, update facilities,
                maintain records and monitor healthcare services from one place.

            </p>

        </div>

    </section>

    <!-- ===========================================
                    MODULE NAVIGATION
    ============================================ -->

        <div class="dashboard-layout">

        <aside class="sidebar">

            <!-- 1 -->

            <!-- ===========================================
                            BASIC INFORMATION
                =========================================== -->

                <div class="sidebar-group">

                    <button
                        class="module-btn dropdown-btn active"
                        id="basicToggle">

                        <div>

                            <i class="fa-solid fa-layer-group"></i>

                            Basic Information

                        </div>

                        <i
                            class="fa-solid fa-chevron-down dropdown-arrow"
                            id="basicArrow">

                        </i>

                    </button>

                    <div
                        class="submenu"
                        id="basicMenu">

                        <!-- 1 -->
                        <button
                            class="module-btn submenu-btn active"
                            data-section="registration">

                            <i class="fa-solid fa-hospital"></i>

                            Registration

                        </button>

                        <!-- 2 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="hospital-language">

                            <i class="fa-solid fa-language"></i>

                            Hospital Name Language

                        </button>

                        <!-- 3 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="medical-system">

                            <i class="fa-solid fa-heart-pulse"></i>

                            Distinct Medical System

                        </button>

                        <!-- 4 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="controlled-by">

                            <i class="fa-solid fa-sitemap"></i>

                            Controlled By

                        </button>

                        <!-- 5 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="medical-firm-type">

                            <i class="fa-solid fa-hospital-user"></i>

                            Type of Medical Firm

                        </button>

                        <!-- 6 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="departments">

                            <i class="fa-solid fa-building"></i>

                            Departments

                        </button>

                        <!-- 7 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="facilities">

                            <i class="fa-solid fa-building-circle-check"></i>

                            Features

                        </button>

                        <!-- 8 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="services">

                            <i class="fa-solid fa-hand-holding-medical"></i>

                            Services

                        </button>

                        <!-- 9 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="instructions">

                            <i class="fa-solid fa-circle-info"></i>

                            Instructions

                        </button>

                        <!-- 10 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="advice">

                            <i class="fa-solid fa-lightbulb"></i>

                            Advice

                        </button>

                        <!-- 11 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="therapies">

                            <i class="fa-solid fa-spa"></i>

                            List of Therapies

                        </button>

                        <!-- 12 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="insurance">

                            <i class="fa-solid fa-file-medical"></i>

                            Health Insurance Company

                        </button>

                        <!-- 13 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="hospital-photos">

                            <i class="fa-solid fa-images"></i>

                            Hospital Photos

                        </button>

                        <!-- 14 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="awarded-by">

                            <i class="fa-solid fa-award"></i>

                            Awarded By

                        </button>

                        <!-- 15 -->
                        <button
                            class="module-btn submenu-btn"
                            data-section="emergency">

                            <i class="fa-solid fa-truck-medical"></i>

                            Emergency

                        </button>

                    </div>

                </div>

            <!-- 9 -->

            <button
                class="module-btn"
                data-section="add-doctor">

                <i class="fa-solid fa-user-doctor"></i>

                Add Doctor

            </button>

            <!-- 10 -->

            <button
                class="module-btn"
                data-section="doctor-records">

                <i class="fa-solid fa-notes-medical"></i>

                Doctor Records

            </button>


            <!-- 12 -->

            <button
                class="module-btn"
                data-section="staff">

                <i class="fa-solid fa-users"></i>

                Staff

            </button>

            <!-- 13 -->

            <button
                class="module-btn"
                data-section="settings">

                <i class="fa-solid fa-gear"></i>

                Settings

            </button>

        </aside>

            <main class="content-area">

            </main>

        </div>

</div>



<script src="js/api.js"></script>

<script src="js/modal.js"></script>

<script src="js/registration.js"></script>

<script src="js/medical-system.js"></script>

<script src="js/controlled-by.js"></script>

<script src="js/services.js"></script>

<script src="js/therapies.js"></script>

<script src="js/insurance.js"></script>

<script src="js/facilities.js"></script>

<script src="js/section-loader.js"></script>

<script src="js/medical-firm-type.js"></script>

<script src="js/hospital-language.js"></script>

<script src="js/instructions.js"></script>

<script src="js/advice.js"></script>

<script src="js/instructions.js"></script>

<script src="js/departments.js"></script>

<script src="js/hospital-photos.js"></script>

<script src="js/awarded-by.js"></script>

<script src="js/emergency.js"></script>

</body>

</html>