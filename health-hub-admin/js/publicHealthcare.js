/* ==========================================================
   PUBLIC HEALTHCARE MODULE
========================================================== */

let publicHealthcare = [];
let selectedPublicHealthcare = null;


/* ==========================================================
   API URLS
========================================================== */

/*
    MASTER DATA
    Comes from Project Admin / Hospital-Admin_Backend
*/

const PUBLIC_HEALTHCARE_MASTER_URL =
    "https://livtara.in/multiadmin/Hospital-Admin_Backend/api/public-healthcare/get.php";


/*
    HEALTH HUB ADMIN
    Stores the selection for this Health Hub
*/

const PUBLIC_HEALTHCARE_SAVE_URL =
    "https://superadmin.livtara.in/hospitaladmin/health-hub-admin/api/public-healthcare/save.php";


const PUBLIC_HEALTHCARE_SELECTED_URL =
    "https://superadmin.livtara.in/hospitaladmin/health-hub-admin/api/public-healthcare/get.php";


/* ==========================================================
   LOAD PUBLIC HEALTHCARE MASTER DATA
========================================================== */

async function loadPublicHealthcare() {

    try {

        const response = await fetch(
            PUBLIC_HEALTHCARE_MASTER_URL
        );


        if (!response.ok) {

            throw new Error(
                "HTTP error: " + response.status
            );

        }


        const result =
            await response.json();


        /*
            Project Admin get.php returns
            the array directly.
        */

        if (!Array.isArray(result)) {

            console.error(
                "Invalid Public Healthcare data:",
                result
            );

            return;

        }


        publicHealthcare = result;


        /*
            Load previously selected
            Health Hub value.
        */

        await loadSelectedPublicHealthcare();


        /*
            Render cards.
        */

        renderPublicHealthcare();

    }
    catch (error) {

        console.error(
            "Failed to load Public Healthcare:",
            error
        );

    }

}


/* ==========================================================
   LOAD SELECTED VALUE FROM HEALTH HUB
========================================================== */

async function loadSelectedPublicHealthcare() {

    try {

        const response = await fetch(
            PUBLIC_HEALTHCARE_SELECTED_URL
        );


        if (!response.ok) {

            throw new Error(
                "HTTP error: " + response.status
            );

        }


        const result =
            await response.json();


        if (
            result.status !== "success"
        ) {

            console.error(
                result.message ||
                "Failed to load selected Public Healthcare."
            );

            return;

        }


        const selected =
            result.data || [];


        /*
            Controlled By is a single selection.
            Therefore take the first selected record.
        */

        if (selected.length > 0) {

            selectedPublicHealthcare =
                Number(selected[0].id);

        }
        else {

            selectedPublicHealthcare =
                null;

        }

    }
    catch (error) {

        console.error(
            "Failed to load selected Public Healthcare:",
            error
        );

    }

}


/* ==========================================================
   RENDER PUBLIC HEALTHCARE
========================================================== */

function renderPublicHealthcare() {

    /*
        Change this ID only if your HTML uses
        a different container ID.
    */

    const container =
        document.getElementById(
            "publicHealthcareGrid"
        );


    if (!container) {

        console.error(
            "publicHealthcareGrid not found."
        );

        return;

    }


    container.innerHTML = "";


    publicHealthcare.forEach(
        healthcare => {

            const id =
                Number(
                    healthcare.id
                );


            const selected =
                selectedPublicHealthcare === id;


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "healthcare-card";


            if (selected) {

                card.classList.add(
                    "selected"
                );

            }


            /*
                First letter
            */

            const firstLetter =
                healthcare.name
                    ? healthcare.name
                        .charAt(0)
                        .toUpperCase()
                    : "H";


            card.innerHTML = `

                <div class="healthcare-card-icon">

                    ${firstLetter}

                </div>


                <div class="healthcare-card-content">

                    <h3>
                        ${healthcare.name}
                    </h3>

                    <p>
                        Healthcare Authority
                    </p>

                </div>


                <div class="healthcare-select-indicator">

                    ${
                        selected
                        ? '<i class="fa-solid fa-check"></i>'
                        : ''
                    }

                </div>

            `;


            /*
                CARD CLICK
            */

            card.addEventListener(
                "click",
                function () {

                    selectPublicHealthcare(
                        id
                    );

                }
            );


            container.appendChild(
                card
            );

        }
    );


    updatePublicHealthcareSelectedText();

}


/* ==========================================================
   SELECT PUBLIC HEALTHCARE
========================================================== */

function selectPublicHealthcare(id) {

    /*
        Only ONE Public Healthcare
        authority can be selected.
    */

    selectedPublicHealthcare =
        Number(id);


    renderPublicHealthcare();

}


/* ==========================================================
   UPDATE SELECTED TEXT
========================================================== */

function updatePublicHealthcareSelectedText() {

    const selectedText =
        document.getElementById(
            "selectedPublicHealthcare"
        );


    if (!selectedText) {

        return;

    }


    if (
        selectedPublicHealthcare === null
    ) {

        selectedText.innerText =
            "Selected : None";

        return;

    }


    const selected =
        publicHealthcare.find(
            item =>
                Number(item.id) ===
                selectedPublicHealthcare
        );


    if (selected) {

        selectedText.innerText =
            "Selected : " +
            selected.name;

    }
    else {

        selectedText.innerText =
            "Selected : None";

    }

}


/* ==========================================================
   SAVE PUBLIC HEALTHCARE
========================================================== */

async function savePublicHealthcare() {

    /*
        Nothing selected
    */

    if (
        selectedPublicHealthcare === null
    ) {

        alert(
            "Please select a Public Healthcare System."
        );

        return;

    }


    /*
        Send every master record.

        Selected one = 1
        Everything else = 0
    */

    const data =
        publicHealthcare.map(
            healthcare => ({

                id:
                    healthcare.id,

                name:
                    healthcare.name,

                selected:
                    Number(
                        healthcare.id
                    ) ===
                    selectedPublicHealthcare
                        ? 1
                        : 0

            })
        );


    try {

        const response =
            await fetch(
                PUBLIC_HEALTHCARE_SAVE_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            public_healthcare:
                                data

                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                "HTTP error: " +
                response.status
            );

        }


        const result =
            await response.json();


        console.log(
            "Public Healthcare Save Result:",
            result
        );


        if (
            result.status ===
            "success"
        ) {

            alert(
                "Public Healthcare saved successfully."
            );

        }
        else {

            alert(
                result.message ||
                "Failed to save Public Healthcare."
            );

        }

    }
    catch (error) {

        console.error(
            "Save Public Healthcare Error:",
            error
        );


        alert(
            "Unable to save Public Healthcare."
        );

    }

}


/* ==========================================================
   SAVE BUTTON
========================================================== */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.closest(
                "#savePublicHealthcare"
            )
        ) {

            savePublicHealthcare();

        }

    }
);


/* ==========================================================
   INITIALIZE
========================================================== */

function initializePublicHealthcare() {

    console.log(
        "Public Healthcare Section Loaded"
    );


    loadPublicHealthcare();

}


/* ==========================================================
   AUTO INITIALIZE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializePublicHealthcare();

    }
);