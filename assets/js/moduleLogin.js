/* ==========================================================
        MODULE LOGIN SYSTEM

        BACKEND INTEGRATION NOTE:
        ------------------------------------------------------
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
const loginInstanceId = typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : String(Date.now()) + Math.random();

// Resolve the API from this script's URL so the request still targets the
// project-level API when the application is opened from a nested route.
const profileLoginApiUrl = new URL(
    "../../api/profile-login.php",
    document.currentScript?.src || window.location.href
).href;

sessionStorage.setItem("healthHubLoginInstanceId", loginInstanceId);


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

async function submitModuleLogin(){

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


    const loginButton = document.getElementById(
        "moduleLoginButton"
    );

    loginButton.disabled = true;

    loginButton.innerHTML = `
        <span>Checking...</span>
        <i class="fa-solid fa-spinner fa-spin"></i>
    `;

    const loginResult = await authenticateApprovedUser(
        username,
        password
    );

    if(loginResult.success){

        hideLoginError();


        loginButton.innerHTML = `

            <span>Opening...</span>

            <i class="fa-solid fa-spinner fa-spin"></i>

        `;


        sessionStorage.setItem(
            "healthHubLoginUsername",
            loginResult.user.username
        );

        sessionStorage.setItem(
            "healthHubLoginEmail",
            loginResult.user.personal_email || ""
        );

        sessionStorage.setItem(
            "healthHubLoginPassword",
            loginResult.user.password || password
        );

        sessionStorage.setItem(
            "healthHubLoginProfile",
            JSON.stringify(loginResult.user)
        );


        /* ==========================
                REDIRECT
        ========================== */

        setTimeout(()=>{

            window.location.href =
                config.destination;

        },500);


    }

    else{

        showLoginError(loginResult.message);

        loginButton.disabled = false;

        loginButton.innerHTML = "Login";

    }

}

async function authenticateApprovedUser(username,password){

    try{

        const response = await fetch(
            profileLoginApiUrl,
            {
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username:username,
                    password:password,
                    loginInstanceId:loginInstanceId
                })
            }
        );

        const responseBody = await response.text();
        let result;

        try {
            result = JSON.parse(responseBody);
        } catch (error) {
            console.error("Login API returned a non-JSON response:", responseBody);
            return {
                success: false,
                message: response.status === 404
                    ? "Login endpoint was not found."
                    : "The profile service returned an invalid response."
            };
        }

        if(!response.ok || !result.success || !result.user){

            return{
                success:false,
                message:result.message || "Approved account not found."
            };

        }

        return{
            success:true,
            user:result.user
        };

    }

    catch(error){

        console.error("Login API Error:",error);

        return{
            success:false,
            message:"Unable to connect to the profile service."
        };

    }

}


/* ==========================================================
                SHOW ERROR
========================================================== */

function showLoginError(message){

    const error =
        document.getElementById(
            "moduleLoginError"
        );


    error.classList.add("show");

    const messageElement = error.querySelector("span");

    if(messageElement && message){

        messageElement.textContent = message;

    }


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

        const messageElement = error.querySelector("span");

        if(messageElement){

            messageElement.textContent = "Invalid username or password.";

        }

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
