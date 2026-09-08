/* ==========================================================

BACKEND DEVELOPER NOTES

Database Table

hospital_gallery

------------------------------------------------------------

id

hospital_id

image_path

image_label

is_selected

display_order

status

created_at

updated_at

------------------------------------------------------------

POST

/api/hospital/photos

multipart/form-data

photos[]

labels[]

selected[]

------------------------------------------------------------

Backend Responsibilities

1. Upload all images.

2. Save labels.

3. Save is_selected value.

4. While loading gallery return

[
    {
        "id":1,
        "image_path":"uploads/hospital/icu.jpg",
        "image_label":"ICU",
        "is_selected":1
    }
]

Frontend will automatically highlight

photos where

is_selected = 1

========================================================== */


/* ==========================================================
        INITIALIZE
========================================================== */

function initializeHospitalPhotos(){

    selectedPhotos=[];
    pendingPhotos=[];
    currentPhoto=null;

    const saveBtn =
    document.getElementById("saveLabelBtn");

    const noBtn =
    document.getElementById("noLabelBtn");

    const labelModal =
    document.getElementById("photoLabelModal");

    const labelInput =
    document.getElementById("photoLabelInput");


        saveBtn.onclick=function(){

            if(!currentPhoto){
                return;
            }

            currentPhoto.label =
            labelInput.value.trim();


            addPhotoCard(currentPhoto);


            labelModal.classList.remove("active");


            currentPhoto=null;


            setTimeout(()=>{

                openNextPhoto();

            },200);

        };
            noBtn.onclick=function(){

                if(!currentPhoto){
                    return;
                }


                currentPhoto.label="";


                addPhotoCard(currentPhoto);


                labelModal.classList.remove("active");


                currentPhoto=null;


                setTimeout(()=>{

                    openNextPhoto();

                },200);

            };

}


/* ==========================================================
        OPEN FILE PICKER
========================================================== */

document.addEventListener("click",function(e){

    if(!e.target.closest("#uploadPhotoBtn")){

        return;

    }

const input = document.getElementById("hospitalPhotos");

input.value = "";

input.click();

});


/* ==========================================================
        IMAGE PREVIEW + LABEL POPUP
========================================================== */

let selectedPhotos = [];

let pendingPhotos = [];

let currentPhoto = null;



document.addEventListener("change",function(e){

    if(e.target.id!="hospitalPhotos"){

        return;

    }


    pendingPhotos = [...e.target.files];


    e.target.value="";


    openNextPhoto();

});


/* ==========================================================
        OPEN NEXT IMAGE
========================================================== */

function openNextPhoto(){

    if(pendingPhotos.length===0){

        return;

    }

    const file = pendingPhotos.shift();

    currentPhoto={

        id:null,          // Backend ID

        file:file,

        label:"",

        selected:false    // User Module visibility

    };

    const reader=new FileReader();

    reader.onload=function(event){

const labelModal =
document.getElementById("photoLabelModal");

const labelPreview =
document.getElementById("labelPreviewImage");

const labelInput =
document.getElementById("photoLabelInput");

labelPreview.src = event.target.result;

labelInput.value = "";

labelModal.classList.add("active");

    };

    reader.readAsDataURL(file);

}
/* ==========================================================
        SAVE LABEL
========================================================== */


/* ==========================================================
        NO LABEL
========================================================== */


/* ==========================================================
        CREATE PHOTO CARD
========================================================== */

function addPhotoCard(photo){

    selectedPhotos.push(photo);

    const gallery = document.getElementById("photoGallery");

    const reader = new FileReader();

    reader.onload = function(event){

        const card = document.createElement("div");

        card.className = "photo-card";

        card.innerHTML = `

            <div class="photo-selection-badge">

                <i class="fa-solid fa-check"></i>

            </div>

            <img
                src="${event.target.result}"
                alt="Hospital Photo">

            <div class="photo-label">

                ${photo.label || "No Label"}

            </div>

            <button
                class="remove-photo">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        /* ==========================================
                SELECT / DESELECT PHOTO
        ========================================== */

        card.onclick = function(e){

            if(e.target.closest(".remove-photo")){
                return;
            }

            photo.selected = !photo.selected;

            card.classList.toggle(
                "selected-photo",
                photo.selected
            );

        };

        /* ==========================================
                    REMOVE PHOTO
        ========================================== */

        card.querySelector(".remove-photo").onclick=function(e){

            e.stopPropagation();

            if(!confirm(
                "Delete this photo?"
            )){
                return;
            }

            selectedPhotos =
            selectedPhotos.filter(

                item=>item!==photo

            );

            card.remove();

        };

        gallery.appendChild(card);

    };

    reader.readAsDataURL(photo.file);

}


/*
====================================================

BACKEND

DELETE

/api/hospital/photos/{photo_id}

When image already exists in database

1. Delete image from uploads folder.
2. Delete record from hospital_gallery.
3. Return success response.

====================================================
*/


/* ==========================================================
        RESET
========================================================== */

document.addEventListener("click",function(e){

    if(!e.target.closest(".photo-reset")){

        return;

    }

    if(!confirm(

        "Remove all uploaded photos?"

    )){

        return;

    }

    selectedPhotos = [];

    pendingPhotos = [];

    currentPhoto = null;

    document.getElementById(

        "photoGallery"

    ).innerHTML = "";

    document.getElementById(

        "hospitalPhotos"

    ).value = "";

});

/*
====================================================

BACKEND

POST

/api/hospital/photos

Request

photos[]

Save every image.

Return uploaded image paths.

Frontend should refresh gallery
using returned data.

====================================================
*/
/* ==========================================================
        SAVE PHOTOS
========================================================== */

document.addEventListener("click",function(e){

    if(!e.target.closest(".save-hospital-photos")){

        return;

    }

    const formData = new FormData();

selectedPhotos.forEach(photo=>{

    formData.append(
        "photos[]",
        photo.file
    );

    formData.append(
        "labels[]",
        photo.label
    );

    formData.append(
        "selected[]",
        photo.selected ? 1 : 0
    );

});

    console.log(selectedPhotos);

    /*
    ========================================

    BACKEND

    fetch("/api/hospital/photos",{

        method:"POST",

        body:formData

    });

    ========================================
    */

        showSuccessModal([

            "Hospital photos saved successfully.",

            "Images and labels have been sent to backend.",

            "Selected photos will be visible in the User Module."

        ]);

        selectedPhotos = [];

        pendingPhotos = [];

        currentPhoto = null;

        document.getElementById("photoGallery").innerHTML = "";

        document.getElementById("hospitalPhotos").value = "";

});
document.addEventListener("click", function(e){

    const labelModal = document.getElementById("photoLabelModal");

    if(labelModal && e.target === labelModal){

        labelModal.classList.remove("active");

    }

});


