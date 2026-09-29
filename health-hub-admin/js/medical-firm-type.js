/* ==========================================================
                    MEDICAL FIRM TYPE
========================================================== */

/*
    DATA FLOW

    Project Admin
        ↓
    types_of_medical_firm/get.php
        ↓
    Health Hub Admin
        ↓
    Medical Firm Categories
        ↓
    Medical Firm Types
*/


/* ==========================================================
                    API URLS
========================================================== */

const MEDICAL_FIRM_MASTER_URL =
    "https://livtara.in/multiadmin/Hospital-Admin_Backend/api/types-of-medical-firm/get.php";

const MEDICAL_FIRM_SAVE_URL =
    "https://livtara.in/superadmin/master/health-hub-admin/api/medical-firm-types/save.php";

const MEDICAL_FIRM_SELECTED_URL =
    "https://livtara.in/superadmin/master/health-hub-admin/api/medical-firm-types/get.php";


/* ==========================================================
                    GLOBAL VARIABLES
========================================================== */

let medicalFirmCategories = [];

let currentCategory = null;

let filteredTypes = [];


/* ==========================================================
                    INITIALIZE
========================================================== */

function initializeMedicalFirmType() {

    console.log(
        "Medical Firm Type Section Loaded"
    );

    loadMedicalFirmTypes();

}


/* ==========================================================
                    LOAD PROJECT ADMIN DATA
========================================================== */

async function loadMedicalFirmTypes() {

    try {

        console.log(
            "Loading Medical Firm Types..."
        );


        const response =
            await fetch(
                MEDICAL_FIRM_MASTER_URL,
                {
                    method: "GET",
                    cache: "no-cache"
                }
            );


        console.log(
            "Medical Firm API Status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Medical Firm API HTTP error: " +
                response.status
            );

        }


        const result =
            await response.json();


        console.log(
            "Project Admin Medical Firm Response:",
            result
        );


        if (
            !result ||
            result.status !== true ||
            !Array.isArray(result.data)
        ) {

            throw new Error(
                "Invalid Medical Firm API response."
            );

        }


        /*
        ======================================================
        CONVERT DATABASE ROWS INTO CATEGORY STRUCTURE
        ======================================================
        */

        const categoryMap = {};


        result.data.forEach(item => {

            const categoryName =
                String(
                    item.category_name || ""
                ).trim();


            const medicalFirmName =
                String(
                    item.medical_firm_name || ""
                ).trim();


            if (!categoryName) {
                return;
            }


            /*
            --------------------------------------------------
            CREATE CATEGORY
            --------------------------------------------------
            */

            if (!categoryMap[categoryName]) {

                categoryMap[categoryName] = {

                    id:
                        "category-" +
                        categoryName
                            .toLowerCase()
                            .replace(
                                /[^a-z0-9]+/g,
                                "-"
                            ),

                    category_name:
                        categoryName,

                    subtypes: []

                };

            }


            /*
            --------------------------------------------------
            NULL MEDICAL FIRM NAME = CATEGORY ONLY
            --------------------------------------------------
            */

            if (
                medicalFirmName === "" ||
                medicalFirmName === "null"
            ) {

                return;

            }


            /*
            --------------------------------------------------
            ADD MEDICAL FIRM TYPE
            --------------------------------------------------
            */

            categoryMap[
                categoryName
            ].subtypes.push({

                id:
                    Number(item.id),

                name:
                    medicalFirmName,

                selected:
                    Number(
                        item.is_selected || 0
                    ) === 1

            });

        });


        /*
        ======================================================
        CONVERT OBJECT TO ARRAY
        ======================================================
        */

        medicalFirmCategories =
            Object.values(categoryMap);


        console.log(
            "Medical Firm Categories:",
            medicalFirmCategories
        );


        /*
        ======================================================
        LOAD SAVED HEALTH HUB SELECTIONS
        ======================================================
        */

        await loadSavedMedicalFirmTypes();


        /*
        ======================================================
        WAIT FOR DYNAMIC HTML
        ======================================================
        */

        renderMedicalFirmWhenReady();


    }

    catch (error) {

        console.error(
            "Failed to load Medical Firm Types:",
            error
        );

    }

}


/* ==========================================================
              LOAD SAVED HEALTH HUB DATA
========================================================== */

async function loadSavedMedicalFirmTypes() {

    try {

        const response =
            await fetch(
                MEDICAL_FIRM_SELECTED_URL,
                {
                    method: "GET",
                    cache: "no-cache"
                }
            );


        if (!response.ok) {

            console.warn(
                "Health Hub Medical Firm GET returned:",
                response.status
            );

            return;

        }


        const result =
            await response.json();


        console.log(
            "Saved Medical Firm Types:",
            result
        );


        if (
            !result ||
            result.status !== true ||
            !Array.isArray(result.data)
        ) {

            return;

        }


        /*
        ======================================================
        APPLY SAVED SELECTIONS
        ======================================================
        */

        result.data.forEach(savedItem => {

            const category =
                medicalFirmCategories.find(
                    item =>
                        item.category_name ===
                        savedItem.category_name
                );


            if (!category) {
                return;
            }


            const subtype =
                category.subtypes.find(
                    item =>
                        Number(item.id) ===
                        Number(savedItem.id)
                );


            if (subtype) {

                subtype.selected =
                    Number(
                        savedItem.is_selected
                    ) === 1;

            }

        });


    }

    catch (error) {

        console.warn(
            "Could not load saved Medical Firm Types:",
            error
        );

    }

}


/* ==========================================================
              WAIT FOR DYNAMIC HTML
========================================================== */

function renderMedicalFirmWhenReady() {

    const main =
        document.getElementById(
            "medicalFirmMain"
        );


    const details =
        document.getElementById(
            "medicalFirmDetails"
        );


    if (!main || !details) {

        console.log(
            "Medical Firm HTML not ready yet..."
        );


        setTimeout(
            renderMedicalFirmWhenReady,
            100
        );


        return;

    }


    console.log(
        "Medical Firm HTML found. Rendering..."
    );


    loadMainCategories();

}


/* ==========================================================
              LOAD MAIN CATEGORIES
========================================================== */

function loadMainCategories() {

    const main =
        document.getElementById(
            "medicalFirmMain"
        );


    const details =
        document.getElementById(
            "medicalFirmDetails"
        );


    if (!main || !details) {
        return;
    }


    main.style.display = "grid";

    details.style.display = "none";


    main.innerHTML = "";


    if (
        medicalFirmCategories.length === 0
    ) {

        main.innerHTML = `

            <div class="medical-empty-message">

                No Medical Firm Categories found.

            </div>

        `;

        return;

    }


    /*
    ======================================================
    CATEGORY COLORS
    ======================================================
    */

    const colors = [

        "#2563eb",
        "#16a34a",
        "#dc2626",
        "#7c3aed",
        "#ea580c",
        "#0891b2",
        "#d97706",
        "#0f766e",
        "#e11d48",
        "#4f46e5"

    ];


    /*
    ======================================================
    CREATE CATEGORY CARDS
    ======================================================
    */

    medicalFirmCategories.forEach(
        (category, index) => {

            main.innerHTML += `

                <div
                    class="medical-category-card"
                    data-category-id="${category.category_name}"
                    style="--accent:${colors[index % colors.length]}"
                >

                    <div class="medical-category-icon">

                        <span>

                            ${category
                                .category_name
                                .charAt(0)
                                .toUpperCase()}

                        </span>

                    </div>

                    <h3>

                        ${category.category_name}

                    </h3>

                    <p>

                        Click to configure all Medical Firm Types.

                    </p>

                    <div class="medical-category-arrow">

                        <i class="fa-solid fa-arrow-right"></i>

                    </div>

                </div>

            `;

        }
    );


    /*
    ======================================================
    CATEGORY CLICK
    ======================================================
    */

    document
        .querySelectorAll(
            ".medical-category-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                function () {

                    const categoryName =
                        this.dataset.categoryId;


                    openCategory(
                        categoryName
                    );

                }
            );

        });

}


/* ==========================================================
                    OPEN CATEGORY
========================================================== */

function openCategory(
    categoryName
) {

    currentCategory =
        medicalFirmCategories.find(
            item =>
                item.category_name ===
                categoryName
        );


    if (!currentCategory) {

        console.warn(
            "Category not found:",
            categoryName
        );

        return;

    }


    document.getElementById(
        "medicalFirmMain"
    ).style.display = "none";


    document.getElementById(
        "medicalFirmDetails"
    ).style.display = "block";


    document.getElementById(
        "firmTitle"
    ).innerText =
        currentCategory.category_name;


    const search =
        document.getElementById(
            "medicalSearch"
        );


    if (search) {

        search.value = "";

    }


    filteredTypes =
        [
            ...currentCategory.subtypes
        ];


    renderSubtypeCards(
        filteredTypes
    );

}


/* ==========================================================
              RENDER MEDICAL FIRM TYPE CARDS
========================================================== */

function renderSubtypeCards(
    types
) {

    const list =
        document.getElementById(
            "firmSubtypeList"
        );


    if (!list) {

        console.warn(
            "firmSubtypeList not found."
        );

        return;

    }


    list.innerHTML = "";


    if (types.length === 0) {

        list.innerHTML = `

            <div class="medical-empty-message">

                No Medical Firm Types found
                in this category.

            </div>

        `;


        updateSelectedCount();

        return;

    }


    types.forEach(type => {

        list.innerHTML += `

            <div
                class="firm-subtype-card ${
                    type.selected
                        ? "selected"
                        : ""
                }"
                data-id="${type.id}"
            >

                <div class="firm-check">

                    <i class="fa-solid fa-check"></i>

                </div>

                <h4>

                    ${type.name}

                </h4>

            </div>

        `;

    });


    initializeSubtypeSelection();


    updateSelectedCount();

}


/* ==========================================================
              CARD SELECTION
========================================================== */

function initializeSubtypeSelection() {

    document
        .querySelectorAll(
            ".firm-subtype-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                function () {

                    if (!currentCategory) {
                        return;
                    }


                    const id =
                        Number(
                            this.dataset.id
                        );


                    const subtype =
                        currentCategory.subtypes.find(
                            item =>
                                Number(item.id) ===
                                id
                        );


                    if (!subtype) {
                        return;
                    }


                    subtype.selected =
                        !subtype.selected;


                    this.classList.toggle(
                        "selected",
                        subtype.selected
                    );


                    updateSelectedCount();

                }
            );

        });

}


/* ==========================================================
                    SELECTED COUNT
========================================================== */

function updateSelectedCount() {

    const countElement =
        document.getElementById(
            "medicalSelectedCount"
        );


    if (!countElement) {
        return;
    }


    if (!currentCategory) {

        countElement.innerText = "0";

        return;

    }


    const count =
        currentCategory.subtypes.filter(
            item => item.selected
        ).length;


    countElement.innerText =
        count;

}


/* ==========================================================
                    SEARCH
========================================================== */

document.addEventListener(
    "input",
    function (event) {

        if (
            event.target.id !==
            "medicalSearch"
        ) {

            return;

        }


        if (!currentCategory) {
            return;
        }


        const value =
            event.target.value
                .toLowerCase()
                .trim();


        filteredTypes =
            currentCategory.subtypes.filter(
                item =>
                    item.name
                        .toLowerCase()
                        .includes(value)
            );


        renderSubtypeCards(
            filteredTypes
        );

    }
);


/* ==========================================================
                    BACK BUTTON
========================================================== */

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(
                "#firmBack"
            )
        ) {

            return;

        }


        currentCategory = null;

        filteredTypes = [];


        loadMainCategories();

    }
);


/* ==========================================================
                    RESET BUTTON
========================================================== */

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(
                "#medicalResetButton"
            )
        ) {

            return;

        }


        if (!currentCategory) {
            return;
        }


        currentCategory.subtypes.forEach(
            item => {

                item.selected = false;

            }
        );


        const search =
            document.getElementById(
                "medicalSearch"
            );


        if (search) {

            search.value = "";

        }


        filteredTypes =
            [
                ...currentCategory.subtypes
            ];


        renderSubtypeCards(
            filteredTypes
        );

    }
);


/* ==========================================================
                    SAVE BUTTON
========================================================== */

document.addEventListener(
    "click",
    async function (event) {

        if (
            !event.target.closest(
                "#firmSave"
            )
        ) {

            return;

        }


        if (!currentCategory) {

            alert(
                "Please select a Medical Firm Category."
            );

            return;

        }


        /*
        ======================================================
        PREPARE ALL TYPES FROM CURRENT CATEGORY
        ======================================================
        */

        const medicalFirmTypes =
            currentCategory.subtypes.map(
                item => ({

                    id:
                        Number(item.id),

                    category_name:
                        currentCategory
                            .category_name,

                    medical_firm_name:
                        item.name,

                    is_selected:
                        item.selected
                            ? 1
                            : 0

                })
            );


        console.log(
            "Saving Medical Firm Types:",
            medicalFirmTypes
        );


        try {

            const response =
                await fetch(
                    MEDICAL_FIRM_SAVE_URL,
                    {
                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                medical_firm_types:
                                    medicalFirmTypes

                            })

                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Save API HTTP error: " +
                    response.status
                );

            }


            const result =
                await response.json();


            console.log(
                "Medical Firm Save Result:",
                result
            );


            if (
                result.status === true
            ) {

                showSuccessModal([

                    currentCategory
                        .category_name +
                        " types saved successfully.",

                    "Your selected Medical Firm Types have been saved.",

                    "You may continue to the next section."

                ]);

            }

            else {

                alert(
                    result.message ||
                    "Failed to save Medical Firm Types."
                );

            }

        }

        catch (error) {

            console.error(
                "Medical Firm Save Error:",
                error
            );


            alert(
                "Unable to save Medical Firm Types."
            );

        }

    }
);