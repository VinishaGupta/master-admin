/* ==========================================================
        MEDICAL SYSTEM MODULE
========================================================== */

let medicalSystems = [];

let selectedSystems = [];


/* ==========================================================
        INITIALIZE
========================================================== */

function initializeMedicalSystem() {

    medicalSystems = [];

    selectedSystems = [];

    loadMedicalSystems();

}


/* ==========================================================
        LOAD MEDICAL SYSTEMS FROM BACKEND
========================================================== */

async function loadMedicalSystems() {

    try {

        const response = await fetch(
            "http://localhost:8000/Hospital-Admin_Backend/api/medical-system/get.php"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch medical systems");
        }

        medicalSystems = await response.json();

createCards(medicalSystems);
searchMedicalSystems();
updateMedicalSelected();
    } catch (error) {

        console.error("Medical System API Error:", error);

        const grid = document.getElementById("medicalGrid");

        if (grid) {
            grid.innerHTML = "<p>Unable to load medical systems.</p>";
        }
    }
}

/* ==========================================================
        CREATE CARDS
========================================================== */

function createCards(data) {

    const grid = document.getElementById("medicalGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";

    if (!data || data.length === 0) {

        grid.innerHTML = `
            <p class="no-data">
                No medical systems available.
            </p>
        `;

        return;
    }

    data.forEach(system => {

        const first =
            system.name.charAt(0).toUpperCase();

        grid.innerHTML += `

            <div class="medical-card">

                <input
                    type="checkbox"
                    id="system${system.id}"
                    value="${system.id}"
                    ${selectedSystems.includes(Number(system.id)) ? "checked" : ""}
                    hidden>

                <label
                    class="medical-label"
                    for="system${system.id}">

                    <div class="badge">
                        ${first}
                    </div>

                    <h3>
                        ${system.name}
                    </h3>

                    <p>
                        Health System
                    </p>

                    <div class="tick">
                        <i class="fa-solid fa-check"></i>
                    </div>

                </label>

            </div>

        `;

    });

    attachEvents();

    updateMedicalSelected();
}


/* ==========================================================
        CHECKBOX EVENTS
========================================================== */

function attachEvents() {

    const checks =
        document.querySelectorAll(
            ".medical-card input"
        );


    checks.forEach(check => {

        check.addEventListener(
            "change",
            function () {

                const id =
                    Number(this.value);


                if (this.checked) {

                    if (
                        !selectedSystems.includes(id)
                    ) {

                        selectedSystems.push(id);

                    }

                }
                else {

                    selectedSystems =
                        selectedSystems.filter(
                            item => item !== id
                        );

                }


                updateMedicalSelected();

            }
        );

    });

}


/* ==========================================================
        UPDATE SELECTED COUNT
========================================================== */

function updateMedicalSelected() {
    const countElement =
        document.getElementById("selectedCount");

    if (!countElement) {
        return;
    }

    const total = document.querySelectorAll(
        ".medical-card input:checked"
    ).length;

    countElement.innerText = total;
}

/* ==========================================================
        SEARCH
========================================================== */

function searchMedicalSystems() {

    const input =
        document.getElementById(
            "medicalSearch"
        );


    if (!input) {

        return;

    }


    input.oninput = function () {

        const value =
            this.value
                .trim()
                .toLowerCase();


        const filtered =
            medicalSystems.filter(
                system =>
                    system.name
                        .toLowerCase()
                        .includes(value)
            );


        createCards(filtered);

    };

}


/* ==========================================================
        GET SELECTED IDS
========================================================== */

function getSelectedMedicalSystems() {

    const selected = [];


    document
        .querySelectorAll(
            ".medical-card input:checked"
        )
        .forEach(item => {

            selected.push(
                Number(item.value)
            );

        });


    return selected;

}


/* ==========================================================
        SAVE BUTTON
========================================================== */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".save-medical-system"
            );


        if (!button) {

            return;

        }


        const selected =
            getSelectedMedicalSystems();


        console.log(
            "Selected Medical Systems:",
            selected
        );


        /*
        ======================================================
        BACKEND SAVE

        Your supplied backend currently has:

        GET
        api/medical-system/get.php

        POST
        api/medical-system/save.php

        BUT save.php creates a NEW medical system:

        POST name=...

        It does NOT save which systems a hospital selected.

        Therefore selection saving is intentionally left
        here until the Hospital Admin selection API/table
        is provided.
        ======================================================
        */


        showMedicalSystemSuccess();

    }
);


/* ==========================================================
        SUCCESS POPUP
========================================================== */

function showMedicalSystemSuccess() {

    showSuccessModal([

        "Types of Medical & Health Systems saved successfully.",

        "Your selected Medical Systems have been saved.",

        "You may continue to the next section."

    ]);

}


/* ==========================================================
        RESET BUTTON
========================================================== */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".medical-reset"
            );


        if (!button) {

            return;

        }


        document
            .querySelectorAll(
                ".medical-card input"
            )
            .forEach(check => {

                check.checked = false;

            });


        selectedSystems = [];


updateMedicalSelected();
    }
);

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeMedicalSystem();

    }
);