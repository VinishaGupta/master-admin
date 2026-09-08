/* ==========================================================
        DEPARTMENT MODULE
========================================================== */

/*

BACKEND FLOW

Project Admin creates departments

GET

/api/departments

Response:

[
    {
        id:1,
        name:"Cardiology",
        image:"uploads/departments/cardiology.jpg"
    }
]

--------------------------------------------------------

Hospital Admin Selected Departments

GET

/api/hospital/departments

Example Response

[
    {
        department_id:1,
        description:"24x7 Cardiology Department"
    },
    {
        department_id:4,
        description:"Experienced Skin Specialists"
    }
]

--------------------------------------------------------

SAVE

POST

/api/hospital/departments

Payload

[
    {
        department_id:1,
        selected:1,
        description:"24x7 Cardiology Department"
    },
    {
        department_id:2,
        selected:0,
        description:""
    }
]

========================================================== */


/* ==========================================================
        VARIABLES
========================================================== */



let departments = [];

let selectedDepartments = [];

let activeDepartment = null;


/* ==========================================================
        INITIALIZE
========================================================== */

function initializeDepartments(){

    departments = [];

    selectedDepartments = [];

    activeDepartment = null;

    loadDepartments();

}


/* ==========================================================
        LOAD DEPARTMENTS
========================================================== */

async function loadDepartments() {

    try {

        const response = await fetch(
            "http://localhost:8000/Hospital-Admin_Backend/api/department/get.php"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch departments.");
        }

        departments = await response.json();

        console.log("Departments loaded:", departments);

        selectedDepartments = [];

        createDepartmentCards(departments);

    } catch (error) {

        console.error("Error loading departments:", error);

        departments = [];

        createDepartmentCards(departments);

    }

}

/* ==========================================================
        CREATE DEPARTMENT CARDS
========================================================== */

function createDepartmentCards(data){

const grid =
    document.getElementById(
        "departmentContainer"
    );

    if(!grid){

        console.error(
            "departmentGrid not found."
        );

        return;

    }

    grid.innerHTML = "";

    data.forEach(dep=>{

        grid.innerHTML += `

<div class="department-card">

    <input
        type="checkbox"
        class="department-checkbox"
        id="department${dep.id}"
        value="${dep.id}"
        ${selectedDepartments.includes(dep.id) ? "checked" : ""}
        hidden>

    <label
        class="department-label"
        for="department${dep.id}">

        <div class="department-image">

       <img
    src="${
        dep.image
            ? `http://localhost:8000/Hospital-Admin_Backend/uploads/departments/${dep.image}`
            : "assets/images/no-image.png"
    }"
    alt="${dep.name}">

        </div>

        <h3>

            ${dep.name}

        </h3>

        <p>

            Hospital Department

        </p>

        <div
            class="department-description-box"
            data-id="${dep.id}">

            <span class="description-text">

                ${
                    dep.description
                    ? dep.description
                    : "Click here to add description..."
                }

            </span>

        </div>

        <div class="department-tick">

            <i class="fa-solid fa-check"></i>

        </div>

    </label>

</div>

`;

    });

    attachDepartmentEvents();

    updateDepartmentCount();

}
/* ==========================================================
        CARD EVENTS
========================================================== */

function attachDepartmentEvents(){

    /* ==========================================
            DESCRIPTION CLICK
    ========================================== */

    const descriptionBoxes =
    document.querySelectorAll(
        ".department-description-box"
    );

    descriptionBoxes.forEach(box=>{

        box.onclick=function(e){

            e.preventDefault();
            e.stopPropagation();

            const id =
            Number(box.dataset.id);

            activeDepartment =
            departments.find(
                dep=>dep.id===id
            );

            if(!activeDepartment){
                return;
            }

            document.getElementById(
                "departmentModalName"
            ).innerText =
            activeDepartment.name;

            document.getElementById(
                "departmentDescriptionInput"
            ).value =
            activeDepartment.description || "";

            document.getElementById(
                "departmentDescriptionCount"
            ).innerText =
            activeDepartment.description
            ? activeDepartment.description.length
            : 0;

            document.getElementById(
                "departmentDescriptionModal"
            ).classList.add("active");

        };

    });


    /* ==========================================
            CHECKBOX EVENTS
    ========================================== */

    const checkboxes =
    document.querySelectorAll(
        ".department-checkbox"
    );

    checkboxes.forEach(check=>{

        const card =
        check.closest(".department-card");

        if(check.checked){

            card.classList.add(
                "selected"
            );

        }

        check.addEventListener(
            "change",
            function(){

                const id =
                Number(this.value);

                if(this.checked){

                    card.classList.add(
                        "selected"
                    );

                    if(
                        !selectedDepartments.includes(id)
                    ){

                        selectedDepartments.push(id);

                    }

                }
                else{

                    card.classList.remove(
                        "selected"
                    );

                    selectedDepartments =
                    selectedDepartments.filter(
                        item=>item!==id
                    );

                }

                updateDepartmentCount();

            }

        );

    });

}


/* ==========================================================
        UPDATE COUNT
========================================================== */

function updateDepartmentCount(){

    const count =
    document.querySelectorAll(
        ".department-checkbox:checked"
    ).length;

    const countBox =
    document.getElementById(
        "selectedDepartmentCount"
    );

    if(countBox){

        countBox.innerText =
        count;

    }

}


/* ==========================================================
        SEARCH
========================================================== */

document.addEventListener(
    "input",
    function(event){

        if(
            event.target.id !==
            "departmentSearch"
        ){
            return;
        }

        const value =
        event.target.value
        .trim()
        .toLowerCase();

        const filtered =
        departments.filter(dep=>

            dep.name
            .toLowerCase()
            .includes(value)

        );

        createDepartmentCards(
            filtered
        );

    }
);
/* ==========================================================
        DESCRIPTION CHARACTER COUNT
========================================================== */

document.addEventListener(
    "input",
    function(e){

        if(
            e.target.id !==
            "departmentDescriptionInput"
        ){
            return;
        }

        document.getElementById(
            "departmentDescriptionCount"
        ).innerText =
        e.target.value.length;

    }
);


/* ==========================================================
        SAVE DESCRIPTION
========================================================== */

document.addEventListener(
"click",
async function(event){

    if(
        !event.target.closest(
            "#saveDepartmentDescription"
        )
    ){
        return;
    }

    if(!activeDepartment){
        return;
    }

    /* ==========================================
            UPDATE LOCAL OBJECT
    ========================================== */

    activeDepartment.description =

    document.getElementById(
        "departmentDescriptionInput"
    ).value.trim();

    /* ==========================================
            BACKEND API
    ========================================== */

    const payload = {

        department_id: activeDepartment.id,

        description: activeDepartment.description

    };

    console.log(
        "Saving Department Description"
    );

    console.log(payload);

    /*
    ==============================================

    BACKEND

    fetch("/api/hospital/department-description",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(payload)

    });

    ===============================================
    */

    /*
    const response = await fetch(
        "/api/hospital/department-description",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        }
    );

    const result =
    await response.json();

    */

    /* ==========================================
            UPDATE CARD
    ========================================== */

    createDepartmentCards(departments);

    document.getElementById(
        "departmentDescriptionModal"
    ).classList.remove("active");

    showSuccessModal([

        "Department description saved successfully.",

        "Description has been updated.",

        "Changes have been sent to the backend."

    ]);

    activeDepartment = null;

});
/* crerate the /api/hospital/department-description for saving the description*/


/* ==========================================================
        CANCEL DESCRIPTION
========================================================== */

document.addEventListener(
    "click",
    function(event){

        if(
            !event.target.closest(
                "#cancelDepartmentDescription"
            )
        ){
            return;
        }

        document.getElementById(
            "departmentDescriptionModal"
        ).classList.remove("active");

        activeDepartment = null;

    }
);


/* ==========================================================
        CLOSE MODAL
========================================================== */

document.addEventListener(
    "click",
    function(event){

        const modal =
        document.getElementById(
            "departmentDescriptionModal"
        );

        if(
            modal &&
            event.target === modal
        ){

            modal.classList.remove(
                "active"
            );

            activeDepartment = null;

        }

    }
);


/* ==========================================================
        SUBMIT ALL DEPARTMENTS
========================================================== */

document.addEventListener(
    "click",
    function(event){

        const button =
        event.target.closest(
            ".department-save"
        );

        if(!button){
            return;
        }

        const payload = [];

        document
        .querySelectorAll(
            ".department-checkbox"
        )
        .forEach(item=>{

            const id =
            Number(item.value);

            const dep =
            departments.find(
                d=>d.id===id
            );

            payload.push({

                department_id:id,

                selected:
                item.checked ? 1 : 0,

                description:
                dep.description || ""

            });

        });

        console.log(
            "Department Payload"
        );

        console.table(payload);

        /*
        ===================================================

        BACKEND

        fetch("/api/hospital/departments",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(payload)

        });

        ===================================================
        */

        showSuccessModal([

            "Hospital departments saved successfully.",

            "Selected departments and descriptions have been saved.",

            "Data has been sent to the backend."

        ]);

    }
);


/* ==========================================================
        RESET
========================================================== */

document.addEventListener(
    "click",
    function(event){

        const button =
        event.target.closest(
            ".department-reset"
        );

        if(!button){
            return;
        }

        document
        .querySelectorAll(
            ".department-checkbox"
        )
        .forEach(item=>{

            item.checked = false;

            item
            .closest(".department-card")
            .classList.remove(
                "selected"
            );

        });

        selectedDepartments = [];

        departments.forEach(dep=>{

            dep.description = "";

        });

        createDepartmentCards(
            departments
        );

        updateDepartmentCount();

    }
);