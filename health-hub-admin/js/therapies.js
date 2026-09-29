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
            "https://livtara.in/multiadmin/Hospital-Admin_Backend/api/list-of-therapies/get.php"
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

    /* ---------------- SAVE ---------------- */

const saveButton =
    document.querySelector(
        ".therapy-save"
    );


if (saveButton) {

    saveButton.addEventListener(
        "click",
        async () => {

            const payload = [];


            document
                .querySelectorAll(
                    "#therapyList input"
                )
                .forEach(checkbox => {

                    const therapyId =
                        Number(checkbox.value);


                    const therapy =
                        therapies.find(
                            item =>
                                Number(item.id) === therapyId
                        );


                    if (!therapy) {
                        return;
                    }


                    payload.push({

                        therapy_id:
                            therapyId,

                        therapy_name:
                            therapy.name || "",

                        selected:
                            checkbox.checked
                                ? 1
                                : 0

                    });

                });


            console.log(
                "Therapy Payload:",
                payload
            );


            try {

                const response =
                    await fetch(
                        "https://superadmin.livtara.in/master/health-hub-admin/api/therapies/save.php",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                therapies:
                                    payload
                            })
                        }
                    );


                const result =
                    await response.json();


                console.log(
                    "Therapy Save Result:",
                    result
                );


                if (
                    result.status ===
                    "success"
                ) {

                    showSuccessModal([

                        "Therapies saved successfully."

                    ]);

                } else {

                    alert(
                        result.message ||
                        "Failed to save therapies."
                    );

                }


            } catch (error) {

                console.error(
                    "Failed to save therapies:",
                    error
                );

                alert(
                    "Failed to save therapies."
                );

            }

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