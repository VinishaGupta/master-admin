/* ==========================================================
                    HOSPITAL EMERGENCY
========================================================== */

let emergencyData = JSON.parse(

    localStorage.getItem("hospitalEmergency")

) || {

    ambulance: "",

    hospitalEmergencyDesk: "",

    reception: "",

    bloodBank: "",

    icu: "",

    pharmacy: "",

    police: "",

    fireBrigade: "",

    womenHelpline: "",

    childHelpline: "",

    disasterManagement: ""

};

/* ==========================================================
                    INITIALIZE
========================================================== */

function initializeEmergency(){

    showPopup();

    bindEmergencyEvents();

    loadEmergency();

}

/* ==========================================================
                    EVENTS
========================================================== */

function bindEmergencyEvents(){

    document.getElementById("popupOkBtn").onclick = closePopup;

    document.getElementById("emergencyForm").onsubmit = saveEmergency;

}

/* ==========================================================
                    POPUP
========================================================== */

function showPopup(){

    document.getElementById(

        "emergencyPopup"

    ).style.display = "flex";

    document.getElementById(

        "emergencyForm"

    ).style.display = "none";

}

function closePopup(){

    document.getElementById(

        "emergencyPopup"

    ).style.display = "none";

    document.getElementById(

        "emergencyForm"

    ).style.display = "block";

}

/* ==========================================================
                    LOAD DATA
========================================================== */

function loadEmergency(){

    document.getElementById("ambulance").value =
    emergencyData.ambulance;

    document.getElementById("hospitalEmergencyDesk").value =
    emergencyData.hospitalEmergencyDesk;

    document.getElementById("reception").value =
    emergencyData.reception;

    document.getElementById("bloodBank").value =
    emergencyData.bloodBank;

    document.getElementById("icu").value =
    emergencyData.icu;

    document.getElementById("pharmacy").value =
    emergencyData.pharmacy;

    document.getElementById("police").value =
    emergencyData.police;

    document.getElementById("fireBrigade").value =
    emergencyData.fireBrigade;

    document.getElementById("womenHelpline").value =
    emergencyData.womenHelpline;

    document.getElementById("childHelpline").value =
    emergencyData.childHelpline;

    document.getElementById("disasterManagement").value =
    emergencyData.disasterManagement;

}

/* ==========================================================
                    SAVE
========================================================== */

function saveEmergency(e){

    e.preventDefault();

    const allEmergencyData = {

        ambulance:
        document.getElementById("ambulance").value.trim(),

        hospitalEmergencyDesk:
        document.getElementById("hospitalEmergencyDesk").value.trim(),

        reception:
        document.getElementById("reception").value.trim(),

        bloodBank:
        document.getElementById("bloodBank").value.trim(),

        icu:
        document.getElementById("icu").value.trim(),

        pharmacy:
        document.getElementById("pharmacy").value.trim(),

        police:
        document.getElementById("police").value.trim(),

        fireBrigade:
        document.getElementById("fireBrigade").value.trim(),

        womenHelpline:
        document.getElementById("womenHelpline").value.trim(),

        childHelpline:
        document.getElementById("childHelpline").value.trim(),

        disasterManagement:
        document.getElementById("disasterManagement").value.trim()

    };

    /* ==========================================
        Remove Empty Fields
    ========================================== */

    emergencyData = {};

    Object.keys(allEmergencyData).forEach(function(key){

        if(allEmergencyData[key] !== ""){

            emergencyData[key] = allEmergencyData[key];

        }

    });

    localStorage.setItem(

        "hospitalEmergency",

        JSON.stringify(emergencyData)

    );

    /*
    ==========================================================

    BACKEND

    Send ONLY emergencyData.

    Example Payload

    {
        ambulance:"108",
        police:"100"
    }

    Empty fields should NOT be sent.

    ==========================================================
    */

    console.log("Emergency Payload :", emergencyData);

    showSuccessModal([

        "Emergency contacts saved successfully."

    ]);

}

/* ==========================================================
            BACKEND INTEGRATION (FUTURE)

Backend Developer:

GET  /api/emergency

Load data into emergencyData.

POST / PUT /api/emergency

Replace the localStorage code inside
saveEmergency() with API calls.

No UI changes required.

========================================================== */