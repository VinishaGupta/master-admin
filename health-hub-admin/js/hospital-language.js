/* ==========================================================
                HOSPITAL LANGUAGE
========================================================== */

/*
==============================================================

BACKEND INTEGRATION

This section allows the Medical Admin / Doctor to save the
Hospital Name in multiple languages.

This module DOES NOT depend on the Project Admin Panel.

--------------------------------------------------------------

GET API

/api/hospital/language-name

Expected Response

{
    english_name:"City Care Hospital",
    hindi_name:"सिटी केयर हॉस्पिटल",
    regional_name:"सिटी केअर हॉस्पिटल"
}

--------------------------------------------------------------

SAVE API

POST

/api/hospital/language-name

Payload

{
    english_name:"City Care Hospital",
    hindi_name:"सिटी केयर हॉस्पिटल",
    regional_name:"सिटी केअर हॉस्पिटल"
}

Backend should save these names against the currently
logged-in Medical Firm.

==============================================================
*/


/* ==========================================================
                DEMO DATA
========================================================== */

/*
Replace this object with API response.
*/

let hospitalLanguageData = {

    english_name : "City Care Hospital",

    hindi_name : "सिटी केयर हॉस्पिटल",

    regional_name : "e.g -ಸಿಟಿ ಕೆಯರ್ ಹಾಸ್ಪಿಟಲ್ - (Kannad)"

};


/* ==========================================================
                INITIALIZE
========================================================== */

function initializeHospitalLanguage(){

    loadHospitalLanguage();

}


/* ==========================================================
                LOAD DATA
========================================================== */

function loadHospitalLanguage(){

    /*
    ==========================================================

    BACKEND

    Replace demo object with API response.

    Example

    const response = await fetch("/api/hospital/language-name");

    hospitalLanguageData = await response.json();

    ==========================================================
    */

document.getElementById(
    "hospitalEnglishName"
).placeholder =
hospitalLanguageData.english_name || "Enter Hospital Name in English";

document.getElementById(
    "hospitalHindiName"
).placeholder =
hospitalLanguageData.hindi_name || "अस्पताल का नाम हिंदी में लिखें";

document.getElementById(
    "hospitalRegionalName"
).placeholder =
hospitalLanguageData.regional_name || "Enter Hospital Name in Regional Language";

}


/* ==========================================================
                SAVE
========================================================== */

document.addEventListener(

    "click",

    function(event){

        const button = event.target.closest(

            "#saveHospitalLanguage"

        );

        if(!button){

            return;

        }

        const english =

        document.getElementById(

            "hospitalEnglishName"

        ).value.trim();



        const hindi =

        document.getElementById(

            "hospitalHindiName"

        ).value.trim();



        const regional =

        document.getElementById(

            "hospitalRegionalName"

        ).value.trim();


        /* ==========================================
                    VALIDATION
        ========================================== */

        if(

            english==="" ||

            hindi==="" ||

            regional===""

        ){

            alert(

                "Please fill all language fields."

            );

            return;

        }


        const payload = {

            english_name : english,

            hindi_name : hindi,

            regional_name : regional

        };


        console.log(

            "Hospital Language Payload"

        );

        console.log(

            payload

        );


        /*
        ======================================================

        BACKEND API

        POST

        /api/hospital/language-name

        Body

        payload

        ======================================================
        */


        /* ==========================================
                BACKEND SUCCESS
        ========================================== */

        showSuccessModal([

            "Hospital names saved successfully.",

            "The hospital name has been stored in all selected languages.",

            "These names will automatically appear in the User Module.",

            "You can update these names anytime."

        ]);

    }

);