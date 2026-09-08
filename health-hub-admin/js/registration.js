/* ==========================================================
                    PAGE LOAD
========================================================== */



/* ==========================================================
                AUTO FILL EMAIL
========================================================== */

async function loadLoggedInUser(){

    const emailInput = document.getElementById(

        "loginEmail"

    );

    if(!emailInput){

        return;

    }

    const result = await getLoggedInUser();

    if(result.success){

        emailInput.value = result.email;

        emailInput.readOnly = true;

    }

}

/* ==========================================================
                INITIALIZE FORM
========================================================== */

function initializeRegistration(){

    const form = document.getElementById(

        "registrationForm"

    );

    if(!form){

        return;

    }
    initializeLandlineValidation();

    form.addEventListener(

        "submit",

        submitRegistration

    );
    /* ==========================================
                LOAD ESTABLISHMENT DAYS
        ========================================== */

        const daySelect = document.querySelector("[name='establishment_day']");

        if (daySelect) {

            for (let i = 1; i <= 31; i++) {

                const option = document.createElement("option");

                option.value = i;

                option.textContent = i;

                daySelect.appendChild(option);

            }

        }
    initializeFirmLogoPreview()

}
/* ==========================================================
            LOGO PREVIEW
========================================================== */

function initializeFirmLogoPreview(){

    const input = document.querySelector(

        'input[name="firm_logo"]'

    );

    const preview = document.getElementById(

        "firmLogoPreview"

    );

    if(!input || !preview){

        return;

    }

    input.addEventListener("change",function(){

        const file = this.files[0];

        if(!file){

            preview.src = "";

            preview.style.display = "none";

            return;

        }

        preview.src = URL.createObjectURL(file);

        preview.style.display = "block";

    });

}

/* ==========================================================
                SUBMIT FORM
========================================================== */

async function submitRegistration(event){

    event.preventDefault();

    const passwordInput = document.getElementById(

        "confirmPassword"

    );

    removePasswordError(passwordInput);

    /* -----------------------------------
            VERIFY PASSWORD
    ------------------------------------ */

    const verifyResult = await verifyPassword(

        passwordInput.value

    );

    if(!verifyResult.success){

        showPasswordError(passwordInput);

        passwordInput.focus();

        return;

    }

    /* -----------------------------------
            COLLECT FORM DATA
    ------------------------------------ */

    const form = document.getElementById(

        "registrationForm"

    );

    const formData = new FormData(form);

    /* -----------------------------------
            SUBMIT DATA
    ------------------------------------ */

    const registerResult = await registerMedicalFirm(

        formData

    );

    if(registerResult.success){

        showSuccessModal([

            "You have successfully registered.",

            "Within 72 hours of registration, your application will be scrutinized.",

            "After approval you will become the Super Admin of Health Hub.",

            "You can continue filling the remaining sections now or complete them later."

        ]);

        form.reset();

        await loadLoggedInUser();

    }

    else{

        alert(

            registerResult.message ||

            "Registration Failed."

        );

    }

}
/* ==========================================================
        STD CODE & LANDLINE VALIDATION
========================================================== */

function initializeLandlineValidation(){

    const stdInput = document.getElementById("stdCode");

    const landlineInput = document.getElementById("landlineNumber");

    if(!stdInput || !landlineInput){

        return;

    }

    function validateLandline(){

        // Allow only numbers
        stdInput.value = stdInput.value.replace(/\D/g,"");

        landlineInput.value = landlineInput.value.replace(/\D/g,"");

        let std = stdInput.value;

        // Remove only ONE leading zero
        if(std.startsWith("0")){

            std = std.substring(1);

        }

        // Effective STD length
        const stdLength = std.length;

        // Only 2 or 3 digits are allowed
        if(stdLength === 2){

            landlineInput.maxLength = 8;

        }

        else if(stdLength === 3){

            landlineInput.maxLength = 7;

        }

        else{

            landlineInput.maxLength = 8;

        }

        // Remove previous error
        removeLandlineError();

        // Validate only if both fields have values
        if(std.length && landlineInput.value.length){

            const totalDigits = stdLength + landlineInput.value.length;

            if(totalDigits !== 10){

                showLandlineError(

                    `STD Code + Landline should contain total 10 digits.`

                );

            }

        }

    }

    stdInput.addEventListener("input",validateLandline);

    landlineInput.addEventListener("input",validateLandline);

}
/* ==========================================================
        SHOW LANDLINE ERROR
========================================================== */

function showLandlineError(message){

    const landlineInput = document.getElementById("landlineNumber");

    landlineInput.style.border = "2px solid #ef4444";

    const error = document.createElement("small");

    error.className = "landline-error";

    error.style.color = "#ef4444";

    error.style.marginTop = "6px";

    error.innerText = message;

    landlineInput.parentNode.appendChild(error);

}

/* ==========================================================
        REMOVE LANDLINE ERROR
========================================================== */

function removeLandlineError(){

    const landlineInput = document.getElementById("landlineNumber");

    landlineInput.style.border = "";

    const error = document.querySelector(".landline-error");

    if(error){

        error.remove();

    }

}
/* ==========================================
    ESTABLISHMENT DATE VALIDATION
========================================== */

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function (e) {

    const day = document.querySelector(
        "[name='establishment_day']"
    ).value;

    const month = document.querySelector(
        "[name='establishment_month']"
    ).value;

    const year = document.querySelector(
        "[name='establishment_year']"
    ).value;

    if (!day && !month && !year) {

        e.preventDefault();

        alert(
            "Please enter at least Day, Month or Year for the Establishment Date."
        );

        return;
    }

});
// <!--
// Backend Integration:

// Load Pin Codes according to

// State
// ↓
// District
// ↓
// Taluka
// ↓
// Village

// Return matching pin codes.
// -->