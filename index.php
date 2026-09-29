<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>Admin Portal</title>

    <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">

    <!-- Font Awesome -->

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

    <!-- CSS -->

    <link rel="stylesheet" href="assets/css/style.css">

    <link rel="stylesheet" href="assets/css/hero.css">

    <link rel="stylesheet" href="assets/css/card.css">

    <link rel="stylesheet" href="assets/css/responsive.css">

    <link rel="stylesheet" href="assets/css/module-login.css">

</head>

<body>

<!-- ==========================================
                NAVBAR
========================================== -->

    <header>

        <div class="logo">

            <i class="fa-solid fa-hospital"></i>

            <span>

                Organization Admin Portal

            </span>

        </div>


        <nav>

            <ul>

                <li>

                    <a href="#hero">

                        Home

                    </a>

                </li>

                <li>

                    <a href="#modules">

                        Modules

                    </a>

                </li>

                <li>

                    <a href="#features">

                        Features

                    </a>

                </li>

            </ul>

        </nav>


        <div class="profile">

            <i class="fa-solid fa-user-shield"></i>

            Super Admin

        </div>

    </header>



    <!-- ===========================
            HERO
    ============================ -->

    <section id="hero" class="hero">

        <div class="hero-left">

            <span class="badge">

                Administration Portal

            </span>

            <h1>

                Welcome to

                <span>

                    Organization Admin Center

                </span>

            </h1>

            <p>

                Manage all administration services from one centralized platform.
                Select a module below to continue.

            </p>

            <button>

                Explore Modules

            </button>

        </div>





    </section>

    <!-- ==========================
                STATISTICS
        =========================== -->

        <section class="stats">

            <div class="stat-card">

                <div class="stat-icon">

                    <i class="fa-solid fa-hospital"></i>

                </div>

                <div>

                    <h2>125+</h2>

                    <p>Hospitals</p>

                </div>

            </div>

            <div class="stat-card">

                <div class="stat-icon">

                    <i class="fa-solid fa-user-doctor"></i>

                </div>

                <div>

                    <h2>4,500+</h2>

                    <p>Doctors</p>

                </div>

            </div>

            <div class="stat-card">

                <div class="stat-icon">

                    <i class="fa-solid fa-users"></i>

                </div>

                <div>

                    <h2>2.3 Lakh</h2>

                    <p>Citizens</p>

                </div>

            </div>

            <div class="stat-card">

                <div class="stat-icon">

                    <i class="fa-solid fa-shield-heart"></i>

                </div>

                <div>

                    <h2>99.9%</h2>

                    <p>System Uptime</p>

                </div>

            </div>

        </section>




    <!-- ===========================
            MODULE TITLE
    ============================ -->

    <section id="modules" class="module-title">

        <h2>

            Administration Modules

        </h2>

        <p>

            Choose the module you want to manage.

        </p>

    </section>





    <!-- ===========================
            MODULES
    ============================ -->

    <section
        id="moduleContainer"
        class="module-container">

    </section>

    <section class="coming-soon">

<h2>

More Administration Modules

</h2>

<p>

More organization modules will be available soon.

</p>

<div class="coming-grid">

<div class="coming-card">

<i class="fa-solid fa-school"></i>

<h3>

Education Admin

</h3>

<span>

Coming Soon

</span>

</div>

<div class="coming-card">

<i class="fa-solid fa-building-shield"></i>

<h3>

Police Admin

</h3>

<span>

Coming Soon

</span>

</div>

<div class="coming-card">

<i class="fa-solid fa-car"></i>

<h3>

Transport Admin

</h3>

<span>

Coming Soon

</span>

</div>

<div class="coming-card">

<i class="fa-solid fa-landmark"></i>

<h3>

Revenue Admin

</h3>

<span>

Coming Soon

</span>

</div>

</div>

</section>





    <!-- ===========================
            FEATURES
    ============================ -->

    <section id="features" class="features">

        <div class="feature">

            <i class="fa-solid fa-shield-heart"></i>

            <h3>

                Secure

            </h3>

            <p>

                Role based authentication
                and secured access.

            </p>

        </div>



        <div class="feature">

            <i class="fa-solid fa-chart-line"></i>

            <h3>

                Analytics

            </h3>

            <p>

                Real time reports and
                monitoring.

            </p>

        </div>



        <div class="feature">

            <i class="fa-solid fa-cloud"></i>

            <h3>

                Cloud Ready

            </h3>

            <p>

                Centralized administration
                across departments.

            </p>

        </div>



        <div class="feature">

            <i class="fa-solid fa-bolt"></i>

            <h3>

                Fast

            </h3>

            <p>

                Optimized workflow
                for administrators.

            </p>

        </div>

    </section>






    <!-- ===========================
            FOOTER
    ============================ -->

    <footer>

        © 2026 Organization Admin Portal

    </footer>

<!-- ==========================================================
                MODULE LOGIN MODAL
========================================================== -->

<div
    class="module-login-overlay"
    id="moduleLoginModal">

    <div class="module-login-box">

        <!-- CLOSE BUTTON -->

        <button
            type="button"
            class="module-login-close"
            onclick="closeModuleLogin()">

            &times;

        </button>


        <!-- ICON -->

        <div class="module-login-icon">

            <i class="fa-solid fa-user-shield"></i>

        </div>


        <!-- TITLE -->

        <h2 id="moduleLoginTitle">

            Admin Login

        </h2>


        <p id="moduleLoginSubtitle">

            Enter your credentials to continue.

        </p>


        <!-- USERNAME -->

        <div class="login-field">

            <label for="moduleUsername">

                Username

            </label>

            <div class="login-input-wrapper">

                <i class="fa-solid fa-user"></i>

                <input
                    type="text"
                    id="moduleUsername"
                    placeholder="Enter username"
                    autocomplete="username">

            </div>

        </div>


        <!-- PASSWORD -->

        <div class="login-field">

            <label for="modulePassword">

                Password

            </label>

            <div class="login-input-wrapper">

                <i class="fa-solid fa-lock"></i>

                <input
                    type="password"
                    id="modulePassword"
                    placeholder="Enter password"
                    autocomplete="current-password">

                <button
                    type="button"
                    class="password-toggle"
                    onclick="toggleModulePassword()">

                    <i
                        class="fa-solid fa-eye"
                        id="passwordEyeIcon">
                    </i>

                </button>

            </div>

        </div>


        <!-- ERROR -->

        <div
            class="module-login-error"
            id="moduleLoginError">

            <i class="fa-solid fa-circle-exclamation"></i>

            <span>
                Invalid username or password.
            </span>

        </div>


        <!-- LOGIN BUTTON -->

        <button
            type="button"
            class="module-login-btn"
            id="moduleLoginButton"
            onclick="submitModuleLogin()">

            <span>Login</span>

            <i class="fa-solid fa-arrow-right"></i>

        </button>


    </div>

</div>

    <!-- JS -->

<script src="assets/js/healthHubAdmin.js"></script>

<script src="assets/js/jobSeekerAdmin.js"></script>

<script src="assets/js/moduleLogin.js"></script>

<script src="assets/js/app.js"></script>

</body>

</html>