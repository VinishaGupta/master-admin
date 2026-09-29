/* ==========================================================
   CONTROLLED BY
   PUBLIC + PRIVATE HEALTHCARE
========================================================== */

let publicSystems = [];
let privateSystems = [];

let selectedControlled = null;


/* ==========================================================
   PROJECT ADMIN APIs
========================================================== */

const PUBLIC_HEALTHCARE_MASTER_URL =
    "https://livtara.in/multiadmin/Hospital-Admin_Backend/api/public-healthcare/get.php";

const PRIVATE_HEALTHCARE_MASTER_URL =
    "https://livtara.in/multiadmin/Hospital-Admin_Backend/api/private-healthcare/get.php";


/* ==========================================================
   HEALTH HUB ADMIN API
========================================================== */

const PUBLIC_HEALTHCARE_SELECTED_URL =
    "https://livtara.in/superadmin/master/health-hub-admin/api/public-healthcare/get.php";

const PUBLIC_HEALTHCARE_SAVE_URL =
    "https://livtara.in/superadmin/master/health-hub-admin/api/public-healthcare/save.php";


/* ==========================================================
   INITIALIZE
========================================================== */

function initializeControlledBy() {

    console.log("====================================");
    console.log("CONTROLLED BY INITIALIZED");
    console.log("====================================");

    loadControlledData();
}


/* ==========================================================
   LOAD DATA
========================================================== */

async function loadControlledData() {

    /* ======================================================
       PUBLIC HEALTHCARE
    ====================================================== */

    try {

        console.log(
            "1. Loading Public Healthcare..."
        );

        const response =
            await fetch(
                PUBLIC_HEALTHCARE_MASTER_URL
            );


        if (!response.ok) {

            throw new Error(
                "Public API HTTP " +
                response.status
            );
        }


        const data =
            await response.json();


        console.log(
            "Public API Response:",
            data
        );


        if (!Array.isArray(data)) {

            throw new Error(
                "Public API did not return an array."
            );
        }


        publicSystems =
            data.map(item => ({

                id: Number(item.id),

                name: String(
                    item.name || ""
                )

            }));


        console.log(
            "Public Systems:",
            publicSystems
        );

    }

    catch (error) {

        console.error(
            "PUBLIC HEALTHCARE ERROR:",
            error
        );

        publicSystems = [];
    }



    /* ======================================================
       PRIVATE HEALTHCARE
    ====================================================== */

    try {

        console.log(
            "2. Loading Private Healthcare..."
        );


        console.log(
            "Private API URL:",
            PRIVATE_HEALTHCARE_MASTER_URL
        );


        const response =
            await fetch(
                PRIVATE_HEALTHCARE_MASTER_URL,
                {
                    method: "GET",
                    cache: "no-cache"
                }
            );


        console.log(
            "Private API HTTP Status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Private API HTTP " +
                response.status
            );
        }


        const data =
            await response.json();


        console.log(
            "Private API Response:",
            data
        );


        if (!Array.isArray(data)) {

            throw new Error(
                "Private API did not return an array."
            );
        }


        privateSystems =
            data.map(item => ({

                id: Number(item.id),

                name: String(
                    item.name || ""
                )

            }));


        console.log(
            "Private Systems:",
            privateSystems
        );


    }

    catch (error) {

        console.error(
            "PRIVATE HEALTHCARE ERROR:",
            error
        );

        privateSystems = [];
    }



    /* ======================================================
       LOAD PREVIOUS SELECTION
    ====================================================== */

    try {

        const selectedResponse =
            await fetch(
                PUBLIC_HEALTHCARE_SELECTED_URL,
                {
                    method: "GET",
                    cache: "no-cache"
                }
            );


        if (selectedResponse.ok) {

            const selectedResult =
                await selectedResponse.json();


            console.log(
                "Saved Healthcare:",
                selectedResult
            );


            if (
                selectedResult.status ===
                "success"
            ) {

                const selectedData =
                    selectedResult.data || [];


                if (
                    selectedData.length > 0
                ) {

                    selectedControlled =
                        Number(
                            selectedData[0].id
                        );
                }
            }
        }

    }

    catch (error) {

        console.warn(
            "Could not load saved selection:",
            error
        );
    }



    /* ======================================================
       RENDER
    ====================================================== */

    console.log(
        "Final Public Systems:",
        publicSystems
    );

    console.log(
        "Final Private Systems:",
        privateSystems
    );


    renderControlledWhenReady();
}


/* ==========================================================
   WAIT FOR HTML
========================================================== */

function renderControlledWhenReady() {

    const publicGrid =
        document.getElementById(
            "publicGrid"
        );


    const privateGrid =
        document.getElementById(
            "privateGrid"
        );


    console.log(
        "Public Grid:",
        publicGrid
    );


    console.log(
        "Private Grid:",
        privateGrid
    );


    if (
        !publicGrid ||
        !privateGrid
    ) {

        console.log(
            "Controlled By HTML not ready. Retrying..."
        );


        setTimeout(
            renderControlledWhenReady,
            100
        );


        return;
    }


    console.log(
        "Controlled By HTML READY"
    );


    /* ======================================================
       PUBLIC
    ====================================================== */

    createControlledCards(
        publicSystems,
        "publicGrid"
    );


    /* ======================================================
       PRIVATE
    ====================================================== */

    createControlledCards(
        privateSystems,
        "privateGrid"
    );


    updateSelected();

    initializeControlledSearch();
}


/* ==========================================================
   CREATE CARDS
========================================================== */

function createControlledCards(
    data,
    containerId
) {

    const grid =
        document.getElementById(
            containerId
        );


    if (!grid) {

        console.error(
            "Grid not found:",
            containerId
        );

        return;
    }


    grid.innerHTML = "";


    console.log(
        "Rendering",
        data.length,
        "cards into",
        containerId
    );


    if (data.length === 0) {

        console.log(
            "No data for:",
            containerId
        );

        return;
    }


    data.forEach(item => {

        const first =
            item.name
                .charAt(0)
                .toUpperCase();


        const isSelected =
            Number(selectedControlled) ===
            Number(item.id);


        const card =
            document.createElement(
                "div"
            );


        card.className =
            "medical-card";


        card.innerHTML = `

            <input
                type="radio"
                name="controlledBy"
                id="controlled-${containerId}-${item.id}"
                value="${item.id}"
                ${isSelected ? "checked" : ""}
                hidden
            >

            <label
                class="medical-label"
                for="controlled-${containerId}-${item.id}"
            >

                <div class="badge">
                    ${first}
                </div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Healthcare Authority
                </p>

                <div class="tick">
                    <i class="fa-solid fa-check"></i>
                </div>

            </label>

        `;


        grid.appendChild(card);

    });


    attachControlledEvents();
}


/* ==========================================================
   RADIO EVENTS
========================================================== */

function attachControlledEvents() {

    document
        .querySelectorAll(
            "input[name='controlledBy']"
        )
        .forEach(radio => {

            radio.onchange =
                function () {

                    selectedControlled =
                        Number(
                            this.value
                        );


                    updateSelected();

                };

        });
}


/* ==========================================================
   SELECTED NAME
========================================================== */

function updateSelected() {

    const label =
        document.getElementById(
            "controlledSelectedName"
        );


    if (!label) {
        return;
    }


    if (
        selectedControlled === null
    ) {

        label.innerText =
            "None";

        return;
    }


    const allSystems = [
        ...publicSystems,
        ...privateSystems
    ];


    const selected =
        allSystems.find(
            item =>
                Number(item.id) ===
                Number(selectedControlled)
        );


    label.innerText =
        selected
            ? selected.name
            : "None";
}


/* ==========================================================
   SEARCH
========================================================== */

function initializeControlledSearch() {

    const input =
        document.getElementById(
            "controlledSearch"
        );


    if (!input) {
        return;
    }


    input.onkeyup =
        function () {

            const value =
                input.value
                    .toLowerCase()
                    .trim();


            const filteredPublic =
                publicSystems.filter(
                    item =>
                        item.name
                            .toLowerCase()
                            .includes(value)
                );


            const filteredPrivate =
                privateSystems.filter(
                    item =>
                        item.name
                            .toLowerCase()
                            .includes(value)
                );


            createControlledCards(
                filteredPublic,
                "publicGrid"
            );


            createControlledCards(
                filteredPrivate,
                "privateGrid"
            );

        };
}


/* ==========================================================
   SAVE
========================================================== */

document.addEventListener(
    "click",
    async function (event) {

        const button =
            event.target.closest(
                ".save-controlled"
            );


        if (!button) {
            return;
        }


        if (
            selectedControlled === null
        ) {

            alert(
                "Please select a Healthcare System."
            );

            return;
        }


        const publicData =
            publicSystems.map(
                item => ({

                    id: item.id,

                    name: item.name,

                    selected:
                        Number(item.id) ===
                        Number(selectedControlled)
                            ? 1
                            : 0

                })
            );


        const privateData =
            privateSystems.map(
                item => ({

                    id: item.id,

                    name: item.name,

                    selected:
                        Number(item.id) ===
                        Number(selectedControlled)
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

                        body: JSON.stringify({

                            public_healthcare:
                                publicData,

                            private_healthcare:
                                privateData

                        })
                    }
                );


            const result =
                await response.json();


            console.log(
                "Save Result:",
                result
            );


            if (
                result.status ===
                "success"
            ) {

                showSuccessModal([

                    "Controlled By details saved successfully.",

                    "Your selected Healthcare Authority has been saved.",

                    "You may continue to the next section."

                ]);

            }

            else {

                alert(
                    result.message ||
                    "Failed to save."
                );
            }

        }

        catch (error) {

            console.error(
                "Save error:",
                error
            );

            alert(
                "Unable to save Controlled By."
            );
        }

    }
);


/* ==========================================================
   RESET
========================================================== */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".controlled-reset"
            );


        if (!button) {
            return;
        }


        document
            .querySelectorAll(
                'input[name="controlledBy"]'
            )
            .forEach(
                radio =>
                    radio.checked = false
            );


        selectedControlled = null;

        updateSelected();

    }
);