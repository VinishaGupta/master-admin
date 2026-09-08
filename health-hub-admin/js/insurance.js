/* ==========================================================
                INSURANCE COMPANIES
========================================================== */

let insuranceCompanies = [];

let selectedInsurance = [];

let insuranceSelectionPage = null;

let insuranceDirectoryPage = null;


/* ==========================================================
                    INITIALIZE
========================================================== */

async function initializeInsurance(){

    console.log("Insurance Section Loaded");

    insuranceSelectionPage =
        document.getElementById("insuranceSelectionPage");

    insuranceDirectoryPage =
        document.getElementById("insuranceDirectory");

    await loadInsuranceCompanies();

    searchInsurance();

    insuranceButtons();

    initializeInsuranceDirectory();

}


/* ==========================================================
                LOAD FROM BACKEND
========================================================== */

async function loadInsuranceCompanies(){

    try {

        const response = await fetch(
            "http://localhost:8000/Hospital-Admin_Backend/api/health-insurance-company/get.php"
        );

        if(!response.ok){

            throw new Error(
                "Failed to load insurance companies."
            );

        }

        const data = await response.json();

        if(!Array.isArray(data)){

            throw new Error(
                "Invalid insurance company response."
            );

        }

        insuranceCompanies = data.map(company => ({

            id: Number(company.id),

            name: company.name || "",

            website: company.url || ""

        }));

        createInsuranceCards(
            insuranceCompanies
        );

        console.log(
            "Insurance companies loaded:",
            insuranceCompanies
        );

    }
    catch(error){

        console.error(
            "Failed to load insurance companies:",
            error
        );

        const list =
            document.getElementById(
                "insuranceList"
            );

        if(list){

            list.innerHTML = `
                <p class="text-muted">
                    Failed to load insurance companies.
                </p>
            `;

        }

    }

}


/* ==========================================================
                    CREATE CARDS
========================================================== */

function createInsuranceCards(data){

    const list =
        document.getElementById(
            "insuranceList"
        );

    if(!list){

        console.error(
            "insuranceList not found."
        );

        return;

    }

    list.innerHTML = "";

    data.forEach(company => {

        const checked =
            selectedInsurance.includes(
                company.id
            )
            ? "checked"
            : "";

        const first =
            company.name
                .charAt(0)
                .toUpperCase();

        list.innerHTML += `

            <div class="insurance-item">

                <input
                    type="checkbox"
                    id="insurance${company.id}"
                    value="${company.id}"
                    ${checked}
                >

                <label
                    class="insurance-card"
                    for="insurance${company.id}"
                >

                    <div class="insurance-left">

                        <div class="insurance-badge">

                            ${first}

                        </div>

                        <div>

                            <h4>

                                ${company.name}

                            </h4>

                            <p>

                                Insurance Company

                            </p>

                        </div>

                    </div>

                    <div class="insurance-check">

                        <i class="fa-solid fa-check"></i>

                    </div>

                </label>

            </div>

        `;

    });

    attachInsuranceEvents();

    updateInsuranceCount();

}


/* ==========================================================
                    CHECKBOX EVENTS
========================================================== */
function attachInsuranceEvents(){

    document
        .querySelectorAll(
            "#insuranceList input"
        )
        .forEach(box => {

            box.addEventListener(
                "change",
                updateInsuranceCount
            );

        });

}


/* ==========================================================
                    UPDATE COUNT
========================================================== */

function updateInsuranceCount(){

    const checked =
        document.querySelectorAll(
            "#insuranceList input:checked"
        );

    document.getElementById(
        "insuranceSelectedCount"
    ).innerText = checked.length;

}


/* ==========================================================
                    SEARCH
========================================================== */

function searchInsurance(){

    const searchInput =
        document.getElementById(
            "insuranceSearch"
        );

    if(!searchInput){

        return;

    }

    searchInput.addEventListener(
        "keyup",
        function(){

            const value =
                this.value
                    .toLowerCase()
                    .trim();

            const filtered =
                insuranceCompanies.filter(
                    company =>
                        company.name
                            .toLowerCase()
                            .includes(value)
                );

            createInsuranceCards(
                filtered
            );

        }
    );

}


/* ==========================================================
                    RESET
========================================================== */

function resetInsurance(){

    selectedInsurance = [];

    document
        .querySelectorAll(
            "#insuranceList input"
        )
        .forEach(box => {

            box.checked = false;

        });

    updateInsuranceCount();

}


/* ==========================================================
                    SAVE
========================================================== */

function saveInsurance(){

    selectedInsurance = [];

    document
        .querySelectorAll(
            "#insuranceList input:checked"
        )
        .forEach(box => {

            selectedInsurance.push(
                Number(box.value)
            );

        });

    console.log(
        "Selected Insurance IDs:",
        selectedInsurance
    );

    /*
    ==========================================================
                FUTURE BACKEND API

    selectedInsurance contains:

    [
        1,
        4,
        8
    ]

    These IDs can later be sent to the backend
    and linked to the Medical Firm.

    ==========================================================
    */

    showSuccessModal([

        "Health Insurance Companies saved successfully.",

        "Selected insurance companies have been linked to this medical firm."

    ]);

}


/* ==========================================================
                    BUTTONS
========================================================== */

function insuranceButtons(){

    const resetButton =
        document.querySelector(
            ".insurance-reset"
        );

    const saveButton =
        document.querySelector(
            ".insurance-save"
        );

    if(resetButton){

        resetButton.addEventListener(
            "click",
            resetInsurance
        );

    }

    if(saveButton){

        saveButton.addEventListener(
            "click",
            saveInsurance
        );

    }

}


/* ==========================================================
                INSURANCE DIRECTORY
========================================================== */

function initializeInsuranceDirectory(){

    const openButton =
        document.getElementById(
            "viewInsuranceCompanies"
        );

    const backButton =
        document.getElementById(
            "backToInsurance"
        );

    if(openButton){

        openButton.addEventListener(
            "click",
            openInsuranceDirectory
        );

    }

    if(backButton){

        backButton.addEventListener(
            "click",
            closeInsuranceDirectory
        );

    }

}


/* ==========================================================
            OPEN INSURANCE DIRECTORY
========================================================== */

function openInsuranceDirectory(){

    if(!insuranceSelectionPage ||
       !insuranceDirectoryPage){

        return;

    }

    insuranceSelectionPage.style.display =
        "none";

    insuranceDirectoryPage.style.display =
        "block";

    createInsuranceCompanyTable();

}


/* ==========================================================
            CLOSE INSURANCE DIRECTORY
========================================================== */

function closeInsuranceDirectory(){

    if(!insuranceSelectionPage ||
       !insuranceDirectoryPage){

        return;

    }

    insuranceDirectoryPage.style.display =
        "none";

    insuranceSelectionPage.style.display =
        "block";

}


/* ==========================================================
            CREATE DIRECTORY TABLE
========================================================== */

function createInsuranceCompanyTable(){

    const tbody =
        document.getElementById(
            "insuranceCompanyTableBody"
        );

    if(!tbody){

        console.error(
            "insuranceCompanyTableBody not found."
        );

        return;

    }

    tbody.innerHTML = "";

    insuranceCompanies.forEach(
        (company, index) => {

            tbody.innerHTML += `

                <tr>

                    <td>

                        ${index + 1}

                    </td>

                    <td>

                        ${company.name}

                    </td>

                    <td>

                        <button
                            type="button"
                            class="primary-btn visit-insurance-btn"
                            data-link="${company.website || '#'}"
                        >

                            Visit Website

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


/* ==========================================================
                VISIT WEBSITE
========================================================== */

document.addEventListener(
    "click",
    function(event){

        const button =
            event.target.closest(
                ".visit-insurance-btn"
            );

        if(!button){

            return;

        }

        const website =
            button.dataset.link;

        if(
            website &&
            website !== "#"
        ){

            window.open(
                website,
                "_blank"
            );

        }

    }
);