/* ==========================================================
                    THERAPIES
========================================================== */

let therapies = [];


/* ==========================================================
                    INITIALIZE
========================================================== */

async function initializeTherapies() {

    await loadTherapies();

    searchTherapies();

    therapyButtons();

}


/* ==========================================================
                    LOAD THERAPIES FROM DATABASE
========================================================== */

async function loadTherapies() {

    try {

        const response = await fetch(
            "http://localhost:8000/Hospital-Admin_Backend/api/list-of-therapies/get.php"
        );

        if (!response.ok) {

            throw new Error(
                "Failed to fetch therapies"
            );

        }

        therapies = await response.json();

        createTherapyCards(therapies);

        updateTherapyCount();

    }

    catch (error) {

        console.error(
            "Error loading therapies:",
            error
        );

        const list =
            document.getElementById("therapyList");

        list.innerHTML = `
            <div class="therapy-error">
                Unable to load therapies.
                Please try again.
            </div>
        `;

    }

}


/* ==========================================================
                    CREATE CARDS
========================================================== */

function createTherapyCards(data) {

    const list =
        document.getElementById("therapyList");

    list.innerHTML = "";


    if (!data.length) {

        list.innerHTML = `
            <div class="therapy-empty">
                No therapies found.
            </div>
        `;

        return;

    }


    data.forEach(item => {

        const first =
            item.name.charAt(0).toUpperCase();


        list.innerHTML += `

            <div class="therapy-item">

                <input
                    type="checkbox"
                    id="therapy${item.id}"
                    value="${item.id}"
                >

                <label
                    class="therapy-card"
                    for="therapy${item.id}"
                >

                    <div class="therapy-left">

                        <div class="therapy-badge">

                            ${first}

                        </div>

                        <div>

                            <h4>

                                ${item.name}

                            </h4>

                            <p>

                                Therapy

                            </p>

                        </div>

                    </div>


                    <div class="therapy-check">

                        <i class="fa-solid fa-check"></i>

                    </div>

                </label>

            </div>

        `;

    });


    therapyEvents();

}


/* ==========================================================
                    EVENTS
========================================================== */

function therapyEvents() {

    document
        .querySelectorAll("#therapyList input")
        .forEach(check => {

            check.addEventListener(
                "change",
                updateTherapyCount
            );

        });

}


/* ==========================================================
                    COUNT
========================================================== */

function updateTherapyCount() {

    const count =
        document.querySelectorAll(
            "#therapyList input:checked"
        ).length;


    const countElement =
        document.getElementById(
            "therapySelectedCount"
        );


    if (countElement) {

        countElement.innerText = count;

    }

}


/* ==========================================================
                    SEARCH
========================================================== */

function searchTherapies() {

    const search =
        document.getElementById(
            "therapySearch"
        );


    if (!search) return;


    search.addEventListener(
        "input",
        function () {

            const value =
                this.value
                    .toLowerCase()
                    .trim();


            const filtered =
                therapies.filter(item =>
                    item.name
                        .toLowerCase()
                        .includes(value)
                );


            createTherapyCards(filtered);

        }
    );

}


/* ==========================================================
                    BUTTONS
========================================================== */

function therapyButtons() {


    /* ---------------- RESET ---------------- */

    const resetButton =
        document.querySelector(
            ".therapy-reset"
        );


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        "#therapyList input"
                    )
                    .forEach(box => {

                        box.checked = false;

                    });


                updateTherapyCount();

            }
        );

    }


    /* ---------------- SAVE ---------------- */

    const saveButton =
        document.querySelector(
            ".therapy-save"
        );


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

                const selected =
                    Array.from(
                        document.querySelectorAll(
                            "#therapyList input:checked"
                        )
                    ).map(
                        checkbox => checkbox.value
                    );


                console.log(
                    "Selected Therapy IDs:",
                    selected
                );


                showSuccessModal([

                    "Therapies saved successfully.",

                    "Backend integration will save the selected therapies."

                ]);

            }
        );

    }

}


/* ==========================================================
                    START
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeTherapies
);