/*
================================================
SERVICES MODULE
================================================
*/

let services = [];
let selectedServices = [];
let deleteServiceId = null;

const BACKEND_URL =
    "http://localhost:8000/Hospital-Admin_Backend";


/*
================================================
CREATE PLACEHOLDER IMAGE
================================================
*/

function createPlaceholderImage(text){

    const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="500"
            height="300">

            <rect
                width="100%"
                height="100%"
                fill="#e5e7eb"/>

            <text
                x="50%"
                y="50%"
                text-anchor="middle"
                dominant-baseline="middle"
                font-size="34"
                fill="#475569">

                ${text}

            </text>

        </svg>
    `;

    return "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg);
}


/*
================================================
CLEAR FORM
================================================
*/

function clearServiceForm(){

    const name =
        document.getElementById("serviceName");

    const description =
        document.getElementById("serviceDescription");

    const image =
        document.getElementById("serviceImage");

    const editId =
        document.getElementById("editServiceId");

    const title =
        document.getElementById("modalTitle");

    const button =
        document.getElementById("createService");

    const preview =
        document.getElementById("imagePreview");


    if(name) name.value = "";

    if(description) description.value = "";

    if(image) image.value = "";

    if(editId) editId.value = "";

    if(title) title.innerText = "Add Service";

    if(button) button.innerText = "Create";

    if(preview){

        preview.src = "";

        preview.style.display = "none";

    }

}


/*
================================================
RENDER SERVICES
================================================
*/

function renderServices(){

    const container =
        document.getElementById("serviceGrid");


    if(!container){

        console.error(
            "serviceGrid not found."
        );

        return;

    }


    container.innerHTML = "";


    services.forEach(service => {

        const selected =
            selectedServices.includes(
                Number(service.id)
            );


        const card =
            document.createElement("div");


        card.className =
            "service-card";


        if(selected){

            card.classList.add(
                "selected"
            );

        }


        /*
        IMAGE URL
        */

        let imageURL = "";

        if(service.image){

            imageURL =
                BACKEND_URL +
                "/" +
                service.image;

        }
        else{

            imageURL =
                createPlaceholderImage(
                    service.name
                );

        }


        card.innerHTML = `

            <img
                src="${imageURL}"
                alt="${service.name}">

            <div class="card-body">

                <h3>
                    ${service.name}
                </h3>

                <p>
                    ${service.description || ""}
                </p>

                <div class="card-actions">

                    <button
                        type="button"
                        class="edit-btn">

                        Edit

                    </button>

                    <button
                        type="button"
                        class="delete-btn">

                        Delete

                    </button>

                </div>

                <button
                    type="button"
                    class="select-btn">

                    ${
                        selected
                        ? "Selected ✓"
                        : "Select Service"
                    }

                </button>

            </div>

        `;


        /*
        CARD CLICK
        */

        card.onclick = function(){

            toggleService(
                Number(service.id)
            );

        };


        /*
        EDIT
        */

        card
            .querySelector(".edit-btn")
            .onclick = function(event){

                event.stopPropagation();

                editService(
                    Number(service.id)
                );

            };


        /*
        DELETE
        */

        card
            .querySelector(".delete-btn")
            .onclick = function(event){

                event.stopPropagation();

                openDeleteModal(
                    Number(service.id)
                );

            };


        container.appendChild(card);

    });

}


/*
================================================
SELECT / UNSELECT SERVICE
================================================
*/

function toggleService(id){

    if(
        selectedServices.includes(id)
    ){

        selectedServices =
            selectedServices.filter(
                item => item !== id
            );

    }
    else{

        selectedServices.push(id);

    }


    renderServices();

}


/*
================================================
EDIT SERVICE
================================================
*/

function editService(id){

    const service =
        services.find(
            item =>
                Number(item.id) === id
        );


    if(!service){

        console.error(
            "Service not found:",
            id
        );

        return;

    }


    document
        .getElementById("serviceName")
        .value =
        service.name;


    document
        .getElementById("serviceDescription")
        .value =
        service.description || "";


    document
        .getElementById("editServiceId")
        .value =
        id;


    document
        .getElementById("modalTitle")
        .innerText =
        "Edit Service";


    document
        .getElementById("createService")
        .innerText =
        "Update";


    document
        .getElementById("serviceModal")
        .style.display =
        "flex";

}


/*
================================================
DELETE MODAL
================================================
*/

function openDeleteModal(id){

    deleteServiceId = id;


    document
        .getElementById("deleteModal")
        .style.display =
        "flex";

}


/*
================================================
OPEN SERVICE MODAL
================================================
*/

document.addEventListener(
    "click",
    function(event){

        if(
            event.target.closest(
                "#openServiceModal"
            )
        ){

            clearServiceForm();

            document
                .getElementById("serviceModal")
                .style.display =
                "flex";

        }

    }
);


/*
================================================
CLOSE SERVICE MODAL
================================================
*/

document.addEventListener(
    "click",
    function(event){

        if(
            event.target.closest(
                "#closeModal"
            )
        ){

            document
                .getElementById("serviceModal")
                .style.display =
                "none";

            clearServiceForm();

        }

    }
);


/*
================================================
CLOSE MODALS ON OUTSIDE CLICK
================================================
*/

window.addEventListener(
    "click",
    function(event){

        const serviceModal =
            document.getElementById(
                "serviceModal"
            );

        const deleteModal =
            document.getElementById(
                "deleteModal"
            );


        if(
            serviceModal &&
            event.target === serviceModal
        ){

            serviceModal.style.display =
                "none";

            clearServiceForm();

        }


        if(
            deleteModal &&
            event.target === deleteModal
        ){

            deleteModal.style.display =
                "none";

        }

    }
);


/*
================================================
IMAGE PREVIEW
================================================
*/

document.addEventListener(
    "change",
    function(event){

        if(
            event.target.id !==
            "serviceImage"
        ){

            return;

        }


        const file =
            event.target.files[0];


        if(!file){

            return;

        }


        const preview =
            document.getElementById(
                "imagePreview"
            );


        if(preview){

            preview.src =
                URL.createObjectURL(file);

            preview.style.display =
                "block";

        }

    }
);


/*
================================================
CREATE / UPDATE SERVICE
================================================
*/

document.addEventListener(
    "click",
    async function(event){

        if(
            !event.target.closest(
                "#createService"
            )
        ){

            return;

        }


        const name =
            document
                .getElementById("serviceName")
                .value
                .trim();


        const description =
            document
                .getElementById(
                    "serviceDescription"
                )
                .value
                .trim();


        const image =
            document.getElementById(
                "serviceImage"
            );


        if(name === ""){

            alert(
                "Please enter Service Name."
            );

            return;

        }


        const editId =
            document
                .getElementById(
                    "editServiceId"
                )
                .value;


        const formData =
            new FormData();


        formData.append(
            "service_name",
            name
        );


        formData.append(
            "description",
            description
        );


        if(
            image &&
            image.files.length > 0
        ){

            formData.append(
                "image",
                image.files[0]
            );

        }


        let url;


        if(editId !== ""){

            formData.append(
                "id",
                editId
            );


            url =
                BACKEND_URL +
                "/api/services/update.php";

        }
        else{

            url =
                BACKEND_URL +
                "/api/services/save.php";

        }


        try{

            const response =
                await fetch(
                    url,
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const result =
                await response.json();


            if(
                result.status !==
                "success"
            ){

                alert(
                    result.message ||
                    "Something went wrong."
                );

                return;

            }


            alert(
                result.message
            );


            document
                .getElementById(
                    "serviceModal"
                )
                .style.display =
                "none";


            clearServiceForm();


            loadServices();

        }
        catch(error){

            console.error(
                "Service save/update error:",
                error
            );


            alert(
                "Unable to connect to backend."
            );

        }

    }
);


/*
================================================
DELETE SERVICE
================================================
*/

document.addEventListener(
    "click",
    async function(event){

        if(
            !event.target.closest(
                "#confirmDelete"
            )
        ){

            return;

        }


        if(!deleteServiceId){

            return;

        }


        const formData =
            new FormData();


        formData.append(
            "id",
            deleteServiceId
        );


        try{

            const response =
                await fetch(
                    BACKEND_URL +
                    "/api/services/delete.php",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const result =
                await response.json();


            if(
                result.status !==
                "success"
            ){

                alert(
                    result.message
                );

                return;

            }


            alert(
                result.message
            );


            selectedServices =
                selectedServices.filter(
                    id =>
                        id !==
                        Number(deleteServiceId)
                );


            deleteServiceId =
                null;


            document
                .getElementById(
                    "deleteModal"
                )
                .style.display =
                "none";


            loadServices();

        }
        catch(error){

            console.error(
                "Delete service error:",
                error
            );


            alert(
                "Unable to connect to backend."
            );

        }

    }
);


/*
================================================
CANCEL DELETE
================================================
*/

document.addEventListener(
    "click",
    function(event){

        if(
            event.target.closest(
                "#cancelDelete"
            )
        ){

            deleteServiceId =
                null;


            document
                .getElementById(
                    "deleteModal"
                )
                .style.display =
                "none";

        }

    }
);


/*
================================================
SAVE SELECTED SERVICES
================================================
*/

document.addEventListener(
    "click",
    function(event){

        if(
            event.target.closest(
                "#saveServices"
            )
        ){

            console.log(
                "Selected Services:",
                selectedServices
            );


            /*
            SAVE API WILL BE ADDED HERE
            */

            alert(
                "Selected Services saved successfully."
            );

        }

    }
);


/*
================================================
LOAD SERVICES FROM DATABASE
================================================
*/

/*
================================================
LOAD SERVICES FROM DATABASE
================================================
*/

async function loadServices() {

    try {

        const response = await fetch(
            BACKEND_URL + "/api/services/get.php"
        );

        if (!response.ok) {
            throw new Error(
                "HTTP error: " + response.status
            );
        }

        const result = await response.json();

        if (result.status !== "success") {

            console.error(
                result.message || "Failed to load services."
            );

            return;
        }

        services = result.data || [];

        /*
        Wait until the dynamically loaded
        services section actually exists.
        */

        const renderWhenReady = () => {

            const container =
                document.getElementById("serviceGrid");

            if (!container) {

                setTimeout(
                    renderWhenReady,
                    50
                );

                return;
            }

            renderServices();
        };

        renderWhenReady();

    }
    catch (error) {

        console.error(
            "Failed to load services:",
            error
        );

    }

}


/*
================================================
INITIALIZE SERVICES
================================================
*/

function initializeServices() {

    console.log(
        "Services Section Loaded"
    );

    loadServices();

}