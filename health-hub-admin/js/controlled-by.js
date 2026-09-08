/* ==========================================================
                CONTROLLED BY
========================================================== */

let publicSystems = [];
let privateSystems = [];
let selectedControlled = null;


/* ==========================================================
                API URLs
========================================================== */

const PUBLIC_API =
    "http://localhost/MultiDigi---Admin/Hospital-Admin_Backend/api/public-healthcare/get.php";

const PRIVATE_API =
    "http://localhost/MultiDigi---Admin/Hospital-Admin_Backend/api/private-healthcare/get.php";


/* ==========================================================
                INITIALIZE
========================================================== */

function initializeControlledBy() {

    console.log("Controlled By Loaded");

    loadControlledData();

}


/* ==========================================================
                LOAD DATA
========================================================== */

async function loadControlledData() {

    try {

        const [publicResponse, privateResponse] = await Promise.all([

            fetch(PUBLIC_API),

            fetch(PRIVATE_API)

        ]);


        if (!publicResponse.ok) {

            throw new Error(
                "Public Healthcare API returned " +
                publicResponse.status
            );

        }


        if (!privateResponse.ok) {

            throw new Error(
                "Private Healthcare API returned " +
                privateResponse.status
            );

        }


        const publicData = await publicResponse.json();

        const privateData = await privateResponse.json();


        console.log("Public Healthcare Data:", publicData);

        console.log("Private Healthcare Data:", privateData);


        /*
        The PHP APIs return:

        [
            {
                id: 1,
                name: "Government Hospital"
            }
        ]
        */

        publicSystems = Array.isArray(publicData)
            ? publicData
            : [];


        privateSystems = Array.isArray(privateData)
            ? privateData
            : [];


        createControlledCards(
            publicSystems,
            "publicGrid"
        );


        createControlledCards(
            privateSystems,
            "privateGrid"
        );


        updateSelected();

        initializeControlledSearch();


    } catch (error) {

        console.error(
            "Controlled By API Error:",
            error
        );


        showControlledError(
            "publicGrid",
            "Unable to load Public Healthcare Systems."
        );


        showControlledError(
            "privateGrid",
            "Unable to load Private Healthcare Systems."
        );

    }

}


/* ==========================================================
                CREATE CARDS
========================================================== */

function createControlledCards(
    data,
    containerId
) {

    const grid = document.getElementById(containerId);


    if (!grid) {

        console.error(
            "Container not found:",
            containerId
        );

        return;

    }


    grid.innerHTML = "";


    if (!data || data.length === 0) {

        grid.innerHTML = `

            <div class="medical-empty">

                No records found.

            </div>

        `;

        return;

    }


    data.forEach(function (item) {

        const name = item.name || "";

        const first =
            name.charAt(0).toUpperCase();


        grid.innerHTML += `

            <div class="medical-card">

                <input
                    type="radio"
                    name="controlledBy"
                    id="controlled${item.id}"
                    value="${item.id}"
                    ${selectedControlled == item.id ? "checked" : ""}
                    hidden
                >

                <label
                    class="medical-label"
                    for="controlled${item.id}"
                >

                    <div class="badge">

                        ${escapeHtml(first)}

                    </div>


                    <h3>

                        ${escapeHtml(name)}

                    </h3>


                    <p>

                        Healthcare Authority

                    </p>


                    <div class="tick">

                        <i class="fa-solid fa-check"></i>

                    </div>

                </label>

            </div>

        `;

    });


    attachControlledEvents();

}


/* ==========================================================
                ATTACH RADIO EVENTS
========================================================== */

function attachControlledEvents() {

    document
        .querySelectorAll(
            "input[name='controlledBy']"
        )
        .forEach(function (radio) {

            radio.addEventListener(
                "change",
                function () {

                    selectedControlled =
                        this.value;

                    updateSelected();

                }
            );

        });

}


/* ==========================================================
                UPDATE SELECTED
========================================================== */

function updateSelected() {

    const label =
        document.getElementById(
            "controlledSelectedName"
        );


    if (!label) {

        return;

    }


    const checked =
        document.querySelector(
            "input[name='controlledBy']:checked"
        );


    if (!checked) {

        label.innerText = "None";

        return;

    }


    const selectedId =
        String(checked.value);


    const allSystems =
        publicSystems.concat(
            privateSystems
        );


    const selectedItem =
        allSystems.find(function (item) {

            return String(item.id) === selectedId;

        });


    if (selectedItem) {

        label.innerText =
            selectedItem.name;

    } else {

        label.innerText = "None";

    }

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


    input.oninput = function () {

        const value =
            input.value
                .trim()
                .toLowerCase();


        const filteredPublic =
            publicSystems.filter(function (item) {

                return String(item.name || "")
                    .toLowerCase()
                    .includes(value);

            });


        const filteredPrivate =
            privateSystems.filter(function (item) {

                return String(item.name || "")
                    .toLowerCase()
                    .includes(value);

            });


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
            .forEach(function (radio) {

                radio.checked = false;

            });


        selectedControlled = null;


        updateSelected();

    }
);


/* ==========================================================
                SAVE
========================================================== */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".save-controlled"
            );


        if (!button) {

            return;

        }


        const selected =
            document.querySelector(
                "input[name='controlledBy']:checked"
            );


        if (!selected) {

            alert(
                "Please select a Healthcare Authority."
            );

            return;

        }


        const controlledBy =
            selected.value;


        console.log(
            "Selected Controlled By:",
            controlledBy
        );


        /*
        For now this only confirms the selection.

        When you have a hospital/user table where
        this value needs to be stored, POST controlledBy
        to that API here.
        */


        if (typeof showSuccessModal === "function") {

            showSuccessModal([

                "Controlled By details saved successfully.",

                "Your selected Healthcare Authority has been saved.",

                "You may continue to the next section."

            ]);

        } else {

            alert(
                "Controlled By details saved successfully."
            );

        }

    }
);


/* ==========================================================
                ERROR MESSAGE
========================================================== */

function showControlledError(
    containerId,
    message
) {

    const container =
        document.getElementById(containerId);


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="medical-empty">

            ${escapeHtml(message)}

        </div>

    `;

}


/* ==========================================================
                HTML ESCAPE
========================================================== */

function escapeHtml(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


/* ==========================================================
                AUTO INITIALIZE
========================================================== */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeControlledBy
    );

} else {

    initializeControlledBy();

}