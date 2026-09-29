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
            "https://livtara.in/multiadmin/Hospital-Admin_Backend/api/facilities/get.php"
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
                        src= "https://livtara.in/multiadmin/Hospital-Admin_Backend/${item.image}"
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

    async function(event){

        if(event.target.closest("#saveFacilities")){

            const payload = [];


            document.querySelectorAll(
                ".facility-card"
            ).forEach(card => {

                const id = Number(
                    card.dataset.id
                );


                const facility = facilities.find(
                    item => Number(item.id) === id
                );


                if (!facility) {
                    return;
                }


                payload.push({

                    facility_id: id,

                    facility_name:
                        facility.name || "",

                    selected:
                        card.classList.contains("selected")
                            ? 1
                            : 0

                });

            });


            console.log(
                "Facility Payload:",
                payload
            );


            try {

                const response = await fetch(
                    "https://superadmin.livtara.in/master/health-hub-admin/api/facilities/save.php",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            facilities: payload
                        })
                    }
                );


                const result =
                    await response.json();


                console.log(
                    "Facility Save Result:",
                    result
                );


                if(result.status === "success"){

                    showSuccessModal([
                        "Facilities saved successfully."
                    ]);

                } else {

                    alert(
                        result.message ||
                        "Failed to save facilities."
                    );

                }


            } catch(error) {

                console.error(
                    "Failed to save facilities:",
                    error
                );

                alert(
                    "Failed to save facilities."
                );

            }

        }

    }

);