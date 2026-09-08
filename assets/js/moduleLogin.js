/* ==========================================================
        MODULE LOGIN SYSTEM

        BACKEND INTEGRATION NOTE:
        ------------------------------------------------------
        This login is currently using temporary frontend
        credentials for development/testing only.

        TEMPORARY CREDENTIALS:
        Username: admin
        Password: 1234

        IMPORTANT:
        Backend developer must replace the temporary
        credential check with the actual authentication API.

        Expected backend responsibilities:
        - Verify username/password
        - Authenticate the user
        - Create server-side session OR secure token
        - Return authentication status
        - Return user/module role
        - Protect the destination dashboard
        - Handle logout/session expiration

        DO NOT USE THE CURRENT CREDENTIAL CHECK
        IN PRODUCTION.
========================================================== */



/* ==========================================================
                CURRENT MODULE
========================================================== */

let currentLoginModule = null;


/* ==========================================================
                MODULE LOGIN CONFIGURATION
========================================================== */

/* ==========================================================
        BACKEND MODULE CONFIGURATION

        The destination below is currently a frontend route.

        Backend developer should ensure that this route
        cannot be accessed without valid authentication.
========================================================== */

const moduleLoginConfig = {

healthHub: {

    title: "Health Hub Admin",

    subtitle:
        "Login to access the Health Hub Administration Portal.",

    /*
     * TEMPORARY FRONTEND CREDENTIALS
     * --------------------------------
     * For development/testing only.
     *
     * BACKEND:
     * Replace this credential check with the
     * actual login API and database authentication.
     */

    username: "admin",

    password: "1234",

    /*
     * BACKEND:
     * This dashboard must be protected by
     * server-side authentication.
     */

    destination:
        "health-hub-admin/dashboard.php"

}

};


/* ==========================================================
                OPEN LOGIN
========================================================== */

function openModuleLogin(moduleId){

    const config =
        moduleLoginConfig[moduleId];


    if(!config){

        console.error(
            "Login configuration not found for:",
            moduleId
        );

        return;

    }


    currentLoginModule = moduleId;


    const modal =
        document.getElementById("moduleLoginModal");

    const title =
        document.getElementById("moduleLoginTitle");

    const subtitle =
        document.getElementById("moduleLoginSubtitle");

    const username =
        document.getElementById("moduleUsername");

    const password =
        document.getElementById("modulePassword");


    title.innerText =
        config.title;


    subtitle.innerText =
        config.subtitle;


    username.value = "";

    password.value = "";


    hideLoginError();


    modal.classList.add("show");


    setTimeout(()=>{

        username.focus();

    },200);

}


/* ==========================================================
                CLOSE LOGIN
========================================================== */

function closeModuleLogin(){

    const modal =
        document.getElementById("moduleLoginModal");


    modal.classList.remove("show");


    currentLoginModule = null;


    document.getElementById(
        "moduleUsername"
    ).value = "";


    document.getElementById(
        "modulePassword"
    ).value = "";


    hideLoginError();

}


/* ==========================================================
                SUBMIT LOGIN
========================================================== */

function submitModuleLogin(){

    if(!currentLoginModule){

        return;

    }


    const config =
        moduleLoginConfig[currentLoginModule];


    const username =
        document.getElementById(
            "moduleUsername"
        ).value.trim();


    const password =
        document.getElementById(
            "modulePassword"
        ).value;


    /* ==========================
            VALIDATION
    ========================== */
/* ==========================================================
        TEMPORARY LOGIN VALIDATION
        ------------------------------------------------------
        DEVELOPMENT ONLY.

        BACKEND DEVELOPER:
        Replace this block with an API request such as:

        POST /api/auth/login

        The backend should verify the credentials and
        establish an authenticated session/token.

        Do NOT keep username/password validation
        inside frontend JavaScript for production.
========================================================== */
    if(
        username === config.username &&
        password === config.password
    ){

        hideLoginError();


        const loginButton =
            document.getElementById(
                "moduleLoginButton"
            );


        loginButton.innerHTML = `

            <span>Opening...</span>

            <i class="fa-solid fa-spinner fa-spin"></i>

        `;


        loginButton.disabled = true;


        /* ==========================
                REDIRECT
        ========================== */

        setTimeout(()=>{

            window.location.href =
                config.destination;

        },500);


    }

    else{

        showLoginError();

    }

}


/* ==========================================================
                SHOW ERROR
========================================================== */

function showLoginError(){

    const error =
        document.getElementById(
            "moduleLoginError"
        );


    error.classList.add("show");


    const password =
        document.getElementById(
            "modulePassword"
        );


    password.value = "";

    password.focus();

}


/* ==========================================================
                HIDE ERROR
========================================================== */

function hideLoginError(){

    const error =
        document.getElementById(
            "moduleLoginError"
        );


    if(error){

        error.classList.remove("show");

    }

}


/* ==========================================================
                PASSWORD VISIBILITY
========================================================== */

function toggleModulePassword(){

    const password =
        document.getElementById(
            "modulePassword"
        );


    const icon =
        document.getElementById(
            "passwordEyeIcon"
        );


    if(password.type === "password"){

        password.type = "text";

        icon.className =
            "fa-solid fa-eye-slash";

    }

    else{

        password.type = "password";

        icon.className =
            "fa-solid fa-eye";

    }

}


/* ==========================================================
                ENTER KEY LOGIN
========================================================== */

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Enter" &&
            currentLoginModule
        ){

            submitModuleLogin();

        }

    }
);


/* ==========================================================
                CLICK OUTSIDE MODAL
========================================================== */

document.addEventListener(
    "click",
    function(event){

        const modal =
            document.getElementById(
                "moduleLoginModal"
            );


        if(
            event.target === modal &&
            currentLoginModule
        ){

            closeModuleLogin();

        }

    }
);