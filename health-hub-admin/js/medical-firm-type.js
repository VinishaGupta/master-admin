/* ==========================================================
                    MEDICAL FIRM TYPE
========================================================== */


/* ==========================================================
                    API
========================================================== */

const MEDICAL_FIRM_API =
    "http://localhost/MultiDigi---Admin/Hospital-Admin_Backend/api/types-of-medical-firm/get.php";


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

    const main =
        document.getElementById("medicalFirmMain");

    const details =
        document.getElementById("medicalFirmDetails");


    /*
        Your dashboard loads sections dynamically.
        Therefore, do nothing until the section
        actually exists.
    */

    if (!main || !details) {

        return;

    }


    /*
        Prevent duplicate API calls.
    */

    if (
        main.dataset.initialized === "true"
    ) {

        return;

    }


    main.dataset.initialized = "true";


    loadMedicalFirmData();

}


/* ==========================================================
                    LOAD DATA FROM API
========================================================== */

async function loadMedicalFirmData() {

    const main =
        document.getElementById(
            "medicalFirmMain"
        );


    /*
        IMPORTANT:
        Never access .innerHTML or .style
        if the element doesn't exist.
    */

    if (!main) {

        return;

    }


    main.innerHTML = `

        <div style="
            grid-column:1/-1;
            background:#fff;
            border:1px solid #dbeafe;
            border-radius:16px;
            padding:30px;
            text-align:center;
            color:#64748b;
        ">

            Loading Medical Firm Categories...

        </div>

    `;


    try {

        const response =
            await fetch(
                MEDICAL_FIRM_API,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    },
                    cache: "no-store"
                }
            );


        if (!response.ok) {

            throw new Error(
                "HTTP Error: " +
                response.status
            );

        }


        const result =
            await response.json();


        console.log(
            "Medical Firm API Response:",
            result
        );


        if (
            result.status !== true ||
            !Array.isArray(result.data)
        ) {

            throw new Error(
                "Invalid API response."
            );

        }


        /*
        ======================================================
                    CREATE CATEGORY STRUCTURE
        ======================================================

        Database:

        id | category_name | medical_firm_name

        1  | m             | NULL
        2  | m             | xyz
        3  | m             | ish
        4  | hospital      | NULL
        5  | hospital      | medplus


        Converted to:

        m
            xyz
            ish

        hospital
            medplus
        ======================================================
        */

        const categoryMap = {};


        result.data.forEach(
            function (row) {

                if (
                    row.category_name === null ||
                    row.category_name === undefined
                ) {

                    return;

                }


                const categoryName =
                    String(
                        row.category_name
                    ).trim();


                if (
                    categoryName === ""
                ) {

                    return;

                }


                /*
                    Create category.
                */

                if (
                    !categoryMap[categoryName]
                ) {

                    categoryMap[categoryName] = {

                        id: categoryName,

                        category_name:
                            categoryName,

                        subtypes: []

                    };

                }


                /*
                    Add Medical Firm Type.

                    NULL is intentionally ignored.
                */

                if (
                    row.medical_firm_name !== null &&
                    row.medical_firm_name !== undefined
                ) {

                    const firmName =
                        String(
                            row.medical_firm_name
                        ).trim();


                    if (
                        firmName !== ""
                    ) {

                        categoryMap[
                            categoryName
                        ]
                        .subtypes
                        .push({

                            id:
                                Number(
                                    row.id
                                ),

                            name:
                                firmName,

                            selected:
                                false

                        });

                    }

                }

            }
        );


        /*
            Convert object into array.
        */

        medicalFirmCategories =
            Object.values(
                categoryMap
            );


        console.log(
            "Medical Firm Categories:",
            medicalFirmCategories
        );


        /*
            Render categories.
        */

        loadMainCategories();

    }
    catch (error) {

        console.error(
            "Medical Firm API Error:",
            error
        );


        /*
            Check again because the
            dynamically loaded section
            could have disappeared.
        */

        const errorContainer =
            document.getElementById(
                "medicalFirmMain"
            );


        if (!errorContainer) {

            return;

        }


        errorContainer.innerHTML = `

            <div style="
                grid-column:1/-1;
                background:#fff;
                border:1px solid #fecaca;
                border-radius:16px;
                padding:30px;
                text-align:center;
                color:#b91c1c;
            ">

                <h3 style="
                    margin-bottom:8px;
                    color:#b91c1c;
                ">

                    Unable to load Medical Firm data.

                </h3>


                <p style="
                    margin:0;
                    color:#64748b;
                ">

                    Please check the API connection.

                </p>

            </div>

        `;

    }

}


/* ==========================================================
                LOAD MAIN CATEGORY PAGE
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


    /*
        IMPORTANT:
        This prevents the exact error
        you were getting:

        Cannot read properties of null
        (reading 'style')
    */

    if (!main || !details) {

        return;

    }


    main.style.display =
        "grid";


    details.style.display =
        "none";


    main.innerHTML = "";


    /*
    ==========================================================
                    NO DATA
    ==========================================================
    */

    if (
        medicalFirmCategories.length === 0
    ) {

        main.innerHTML = `

            <div style="
                grid-column:1/-1;
                background:#fff;
                border:1px solid #dbeafe;
                border-radius:16px;
                padding:30px;
                text-align:center;
                color:#64748b;
            ">

                No Medical Firm Categories Found.

            </div>

        `;

        return;

    }


    /*
    ==========================================================
                    CATEGORY COLORS
    ==========================================================
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
        "#4f46e5",
        "#0284c7",
        "#65a30d",
        "#b91c1c",
        "#9333ea",
        "#c2410c",
        "#0369a1",
        "#15803d",
        "#a21caf",
        "#0d9488",
        "#ca8a04"

    ];


    /*
    ==========================================================
                    CREATE CATEGORY CARDS
    ==========================================================
    */

    medicalFirmCategories.forEach(
        function (category, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "medical-category-card";


            card.dataset.id =
                category.id;


            card.style.setProperty(
                "--accent",
                colors[
                    index % colors.length
                ]
            );


            const initial =
                category
                    .category_name
                    .charAt(0)
                    .toUpperCase();


            const typeCount =
                category
                    .subtypes
                    .length;


            card.innerHTML = `

                <div
                    class="medical-category-icon"
                >

                    <span>

                        ${escapeHTML(
                            initial
                        )}

                    </span>

                </div>


                <h3>

                    ${escapeHTML(
                        category.category_name
                    )}

                </h3>


                <p>

                    ${typeCount}
                    Medical Firm Type
                    ${typeCount === 1 ? "" : "s"}
                    available.

                </p>


                <div
                    class="medical-category-arrow"
                >

                    <i class="
                        fa-solid
                        fa-arrow-right
                    "></i>

                </div>

            `;


            card.addEventListener(
                "click",
                function () {

                    openCategory(
                        category.id
                    );

                }
            );


            main.appendChild(
                card
            );

        }
    );

}


/* ==========================================================
                    OPEN CATEGORY
========================================================== */

function openCategory(categoryId) {

    currentCategory =
        medicalFirmCategories.find(
            function (category) {

                return String(
                    category.id
                ) === String(
                    categoryId
                );

            }
        );


    if (!currentCategory) {

        return;

    }


    const main =
        document.getElementById(
            "medicalFirmMain"
        );


    const details =
        document.getElementById(
            "medicalFirmDetails"
        );


    const title =
        document.getElementById(
            "firmTitle"
        );


    const search =
        document.getElementById(
            "medicalSearch"
        );


    if (
        !main ||
        !details ||
        !title ||
        !search
    ) {

        return;

    }


    main.style.display =
        "none";


    details.style.display =
        "block";


    title.innerText =
        currentCategory.category_name;


    search.value =
        "";


    filteredTypes = [
        ...currentCategory.subtypes
    ];


    renderSubtypeCards(
        filteredTypes
    );

}


/* ==========================================================
                RENDER SUBTYPE CARDS
========================================================== */

function renderSubtypeCards(types) {

    const list =
        document.getElementById(
            "firmSubtypeList"
        );


    if (!list) {

        return;

    }


    list.innerHTML = "";


    /*
    ==========================================================
                    NO TYPES
    ==========================================================
    */

    if (
        types.length === 0
    ) {

        list.innerHTML = `

            <div style="
                grid-column:1/-1;
                background:#fff;
                border:1px solid #dbeafe;
                border-radius:16px;
                padding:30px;
                text-align:center;
                color:#64748b;
            ">

                No Medical Firm Types Found.

            </div>

        `;


        updateSelectedCount();

        return;

    }


    /*
    ==========================================================
                    CREATE TYPE CARDS
    ==========================================================
    */

    types.forEach(
        function (type) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "firm-subtype-card";


            card.dataset.id =
                type.id;


            if (
                type.selected
            ) {

                card.classList.add(
                    "selected"
                );

            }


            card.innerHTML = `

                <div class="firm-check">

                    <i class="
                        fa-solid
                        fa-check
                    "></i>

                </div>


                <h4>

                    ${escapeHTML(
                        type.name
                    )}

                </h4>

            `;


            card.addEventListener(
                "click",
                function () {

                    if (!currentCategory) {

                        return;

                    }


                    const subtype =
                        currentCategory
                            .subtypes
                            .find(
                                function (item) {

                                    return Number(
                                        item.id
                                    ) === Number(
                                        type.id
                                    );

                                }
                            );


                    if (!subtype) {

                        return;

                    }


                    subtype.selected =
                        !subtype.selected;


                    card.classList.toggle(
                        "selected",
                        subtype.selected
                    );


                    updateSelectedCount();

                }
            );


            list.appendChild(
                card
            );

        }
    );


    updateSelectedCount();

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

        countElement.innerText =
            "0";

        return;

    }


    const count =
        currentCategory
            .subtypes
            .filter(
                function (item) {

                    return item.selected;

                }
            )
            .length;


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


        const searchValue =
            event.target.value
                .toLowerCase()
                .trim();


        filteredTypes =
            currentCategory
                .subtypes
                .filter(
                    function (item) {

                        return item.name
                            .toLowerCase()
                            .includes(
                                searchValue
                            );

                    }
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

        const backButton =
            event.target.closest(
                "#firmBack"
            );


        if (!backButton) {

            return;

        }


        currentCategory =
            null;


        loadMainCategories();

    }
);


/* ==========================================================
                    RESET BUTTON
========================================================== */

document.addEventListener(
    "click",
    function (event) {

        const resetButton =
            event.target.closest(
                "#medicalResetButton"
            );


        if (!resetButton) {

            return;

        }


        if (!currentCategory) {

            return;

        }


        currentCategory
            .subtypes
            .forEach(
                function (item) {

                    item.selected =
                        false;

                }
            );


        const search =
            document.getElementById(
                "medicalSearch"
            );


        if (search) {

            search.value =
                "";

        }


        filteredTypes = [

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
    function (event) {

        const saveButton =
            event.target.closest(
                "#firmSave"
            );


        if (!saveButton) {

            return;

        }


        if (!currentCategory) {

            return;

        }


        const selectedSubtypeIds =
            currentCategory
                .subtypes
                .filter(
                    function (item) {

                        return item.selected;

                    }
                )
                .map(
                    function (item) {

                        return Number(
                            item.id
                        );

                    }
                );


        console.log({

            category_id:
                currentCategory.id,

            category_name:
                currentCategory.category_name,

            subtype_ids:
                selectedSubtypeIds

        });


        alert(
            selectedSubtypeIds.length +
            " Medical Firm Type(s) selected."
        );

    }
);


/* ==========================================================
                    HTML ESCAPE
========================================================== */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* ==========================================================
        DYNAMIC SECTION INITIALIZATION
========================================================== */

/*
    The dashboard loads medical-firm-type.php
    dynamically.

    MutationObserver waits for:

        #medicalFirmMain
        #medicalFirmDetails

    to actually appear.
*/

const medicalFirmObserver =
    new MutationObserver(
        function () {

            const main =
                document.getElementById(
                    "medicalFirmMain"
                );


            const details =
                document.getElementById(
                    "medicalFirmDetails"
                );


            if (
                main &&
                details
            ) {

                initializeMedicalFirmType();

            }

        }
    );


/*
    Start watching the page.
*/

if (
    document.documentElement
) {

    medicalFirmObserver.observe(
        document.documentElement,
        {
            childList: true,
            subtree: true
        }
    );

}


/*
    Also try immediately in case the
    section already exists.
*/

initializeMedicalFirmType();