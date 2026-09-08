/* ==========================================================
                    FRONTEND DEMO DATA
========================================================== */

/*
    ==========================================================
                    BACKEND INTEGRATION
    ==========================================================

    Replace this dummy array with API response.

    Expected Response:

    [
        {
            id:1,
            name:"Ambulance Service",
            description:"Emergency ambulance availability.",
            image:"https://yourdomain.com/uploads/facilities/ambulance.jpg",
            selected:false
        },
        {
            id:2,
            name:"Blood Bank",
            description:"Blood storage.",
            image:"https://yourdomain.com/uploads/facilities/bloodbank.jpg",
            selected:true
        }
    ]

    selected=true
    Means this facility was already selected
    by the current Medical Firm.

    selected=false
    Means not selected.

    Image URL will come from Hostinger Upload Folder.

========================================================== */

let facilities = [];



/* ==========================================================
                    INITIALIZE
========================================================== */

function initializeFacilities(){

    console.log("Facilities Section Loaded");

    loadFacilities();

}


/* ==========================================================
                    LOAD CARDS
========================================================== */

async function loadFacilities(){

const container = document.getElementById("facilityGrid");


    if (!container) {
        console.error("facilityGrid not found.");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8000/Hospital-Admin_Backend/api/facilities/get.php"
        );

        const result = await response.json();

        if(result.status !== "success"){
            console.error(result.message);
            return;
        }

        facilities = result.data;

        container.innerHTML = "";

        facilities.forEach(item => {

            container.innerHTML += `

                <div
                    class="facility-card ${item.selected ? "selected" : ""}"
                    data-id="${item.id}">

                    <div class="facility-tick">
                        <i class="fa-solid fa-check"></i>
                    </div>

                    <img
                        src="http://localhost:8000/Hospital-Admin_Backend/${item.image}"
                        class="facility-image"
                        alt="${item.name}">

                    <div class="facility-content">

                        <h3>${item.name}</h3>

                        <p>${item.description}</p>

                        <div class="facility-available">

                            <i class="fa-solid fa-circle-check"></i>

                            Available

                        </div>

                    </div>

                </div>

            `;

        });

        initializeFacilitySelection();

    } catch(error) {

        console.error("Failed to load facilities:", error);

    }

}


/* ==========================================================
            CARD CLICK EVENTS
========================================================== */

function initializeFacilitySelection(){

    document.querySelectorAll(

        ".facility-card"

    ).forEach(card=>{

        card.addEventListener(

            "click",

            ()=>{

                card.classList.toggle(

                    "selected"

                );

            }

        );

    });

}


/* ==========================================================
        APPLY SAVED DATA FROM BACKEND

Backend will call this after fetching data.

Example

applySelectedFacilities([2,4,6]);

========================================================== */

function applySelectedFacilities(selectedIds){

    document.querySelectorAll(

        ".facility-card"

    ).forEach(card=>{

        const id=Number(

            card.dataset.id

        );

        if(selectedIds.includes(id)){

            card.classList.add(

                "selected"

            );

        }

    });

}


/* ==========================================================
                SAVE FACILITIES

BACKEND

Send only selected Facility IDs.

Expected Payload

{
    facility_ids:[1,3,5]
}

Backend should save these IDs
against the logged in Medical Firm.

========================================================== */

document.addEventListener(

    "click",

    function(event){

        if(event.target.closest("#saveFacilities")){

            const selectedFacilityIds=[];

            document.querySelectorAll(

                ".facility-card.selected"

            ).forEach(card=>{

                selectedFacilityIds.push(

                    Number(card.dataset.id)

                );

            });

            console.log(selectedFacilityIds);

            /*
            ==============================================
            BACKEND API

            POST

            {
                facility_ids:selectedFacilityIds
            }

            ==============================================
            */

            showSuccessModal([

                "Facilities saved successfully."

            ]);

        }

    }

);