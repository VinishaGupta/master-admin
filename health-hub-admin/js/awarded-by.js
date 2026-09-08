/* ==========================================================
                    HOSPITAL AWARDS
========================================================== */


/*
BACKEND INTEGRATION NOTES

Currently using localStorage for frontend testing.

Later replace:

loadAwards()
saveAwardData()
deleteAwardData()

with API calls.

Expected APIs:

GET    /api/awards
POST   /api/awards
PUT    /api/awards/{id}
DELETE /api/awards/{id}


Payload:

title
awardedBy
date
description
image

*/


let awards = JSON.parse(
    localStorage.getItem("hospitalAwards")
) || [];


let editingId = null;

let deleteId = null;


/* ==========================================================
                    ELEMENTS
========================================================== */


let awardGrid;

let awardModal;

let deleteModal;

let awardForm;

let titleInput;

let awardByInput;

let awardDateInput;

let awardImageInput;

let descriptionInput;

let previewWrapper;

let previewImage;

let modalHeading;

let charCount;



/* ==========================================================
                    INITIALIZE
========================================================== */


function initializeAwardedBy(){


    awardGrid =
    document.getElementById("awardGrid");


    awardModal =
    document.getElementById("awardModal");


    deleteModal =
    document.getElementById("deleteAwardModal");


    awardForm =
    document.getElementById("awardForm");


    titleInput =
    document.getElementById("awardTitle");


    awardByInput =
    document.getElementById("awardBy");


    awardDateInput =
    document.getElementById("awardDate");


    awardImageInput =
    document.getElementById("awardImage");


    descriptionInput =
    document.getElementById("awardDescription");


    previewWrapper =
    document.getElementById("previewWrapper");


    previewImage =
    document.getElementById("previewImage");


    modalHeading =
    document.getElementById("modalHeading");


    charCount =
    document.getElementById("charCount");



    bindEvents();


    loadAwards();


}





/* ==========================================================
                    LOAD AWARDS
========================================================== */


function loadAwards(){


    awards = JSON.parse(
        localStorage.getItem("hospitalAwards")
    ) || [];


    renderAwards();


}




/* ==========================================================
                    EVENTS
========================================================== */


function bindEvents(){


    document
    .getElementById("addAwardBtn")
    .onclick=openAddModal;



    document
    .getElementById("closeAwardModal")
    .onclick=closeModal;



    document
    .getElementById("cancelAwardBtn")
    .onclick=closeModal;



    document
    .getElementById("cancelDeleteAward")
    .onclick=function(){


        deleteModal.style.display="none";


    };



    document
    .getElementById("confirmDeleteAward")
    .onclick=removeAward;



    awardImageInput.onchange =
    previewImageFile;



    descriptionInput.oninput =
    updateCounter;



    awardForm.onsubmit =
    saveAward;


}






/* ==========================================================
                    OPEN MODAL
========================================================== */


function openAddModal(){


    editingId=null;


    modalHeading.innerHTML =
    "Add Hospital Award";


    awardForm.reset();


    previewWrapper.style.display="none";


    previewImage.src="";


    charCount.innerHTML="0";


    awardModal.style.display="flex";


}





/* ==========================================================
                    CLOSE MODAL
========================================================== */


function closeModal(){


    awardModal.style.display="none";


    awardForm.reset();


    previewImage.src="";


    previewWrapper.style.display="none";


    editingId=null;


    charCount.innerHTML="0";


}






/* ==========================================================
                    IMAGE PREVIEW
========================================================== */


function previewImageFile(){


    const file =
    awardImageInput.files[0];


    if(!file){


        previewWrapper.style.display="none";

        return;

    }



    const reader =
    new FileReader();



    reader.onload=function(e){


        previewImage.src =
        e.target.result;


        previewWrapper.style.display="flex";


    };



    reader.readAsDataURL(file);


}





/* ==========================================================
                CHARACTER COUNTER
========================================================== */


function updateCounter(){


    charCount.innerHTML =
    descriptionInput.value.length;


}







/* ==========================================================
                    SAVE AWARD
========================================================== */


function saveAward(e){


    e.preventDefault();



    const title =
    titleInput.value.trim();


    const awardedBy =
    awardByInput.value.trim();


    const date =
    awardDateInput.value;


    const description =
    descriptionInput.value.trim();



    if(title===""){


        alert("Please enter Award Title.");

        return;

    }



    if(awardedBy===""){


        alert("Please enter Awarded By.");

        return;

    }



    function storeAward(image){



        const award = {


            id: editingId || Date.now(),


            title:title,


            awardedBy:awardedBy,


            date:date,


            description:description,


            image:image


        };





        if(editingId){


            const index =
            awards.findIndex(
                item=>item.id===editingId
            );


            awards[index]=award;



        }

        else{


            awards.push(award);


        }



        saveAwardData();



    }






    if(awardImageInput.files.length){



        const reader =
        new FileReader();



        reader.onload=function(e){


            storeAward(
                e.target.result
            );


        };



        reader.readAsDataURL(
            awardImageInput.files[0]
        );


    }

    else{



        if(editingId){


            const oldAward =
            awards.find(
                item=>item.id===editingId
            );


            storeAward(
                oldAward.image
            );


        }

        else{


            alert(
            "Please upload Award Image."
            );


        }


    }



}







/* ==========================================================
                SAVE DATA
========================================================== */


function saveAwardData(){


    localStorage.setItem(
        "hospitalAwards",
        JSON.stringify(awards)
    );


    renderAwards();


    closeModal();


}








/* ==========================================================
                    RENDER CARDS
========================================================== */


function renderAwards(){


    awardGrid.innerHTML="";



    if(awards.length===0){


        awardGrid.innerHTML=`


        <div class="empty-awards">

            <i class="fa-solid fa-award"></i>

            <h3>No Awards Added</h3>

            <p>
            Click <b>Add Award</b> to showcase your hospital achievements.
            </p>

        </div>


        `;


        return;


    }





    awards.forEach((award)=>{


        awardGrid.appendChild(

            createAwardCard(award)

        );


    });



}







/* ==========================================================
                    CREATE CARD
========================================================== */


function createAwardCard(award){


    const card =
    document.createElement("div");



    card.className =
    "award-card";



    card.innerHTML=`


    <div class="award-image">

        <img src="${award.image}">

    </div>



    <div class="award-content">


        <h3>${award.title}</h3>


        <span class="award-by">

        <b>Awarded By :</b>
        ${award.awardedBy}

        </span>


        <span class="award-date">

        ${award.date}

        </span>



        <p>

        ${award.description}

        </p>



        <div class="award-actions">


        <button class="secondary-btn edit-btn">

        <i class="fa-solid fa-pen"></i>
        Edit

        </button>



        <button class="danger-btn delete-btn">

        <i class="fa-solid fa-trash"></i>
        Delete

        </button>



        </div>


    </div>



    `;





    card
    .querySelector(".edit-btn")
    .onclick=function(){


        editAward(
            award.id
        );


    };




    card
    .querySelector(".delete-btn")
    .onclick=function(){


        deleteAward(
            award.id
        );


    };



    return card;


}






/* ==========================================================
                    EDIT
========================================================== */


function editAward(id){


    editingId=id;



    const award =
    awards.find(
        item=>item.id===id
    );



    modalHeading.innerHTML =
    "Edit Hospital Award";



    titleInput.value =
    award.title;



    awardByInput.value =
    award.awardedBy;



    awardDateInput.value =
    award.date;



    descriptionInput.value =
    award.description;



    charCount.innerHTML =
    award.description.length;



    previewImage.src =
    award.image;



    previewWrapper.style.display =
    "block";



    awardModal.style.display =
    "flex";


}







/* ==========================================================
                    DELETE
========================================================== */


function deleteAward(id){


    deleteId=id;


    deleteModal.style.display =
    "flex";


}





/* ==========================================================
                    REMOVE
========================================================== */


function removeAward(){



    awards =
    awards.filter(
        item=>item.id!==deleteId
    );



    localStorage.setItem(
        "hospitalAwards",
        JSON.stringify(awards)
    );



    deleteModal.style.display =
    "none";



    deleteId=null;



    renderAwards();



}






/* ==========================================================
                CLOSE MODAL OUTSIDE CLICK
========================================================== */


window.addEventListener(
"click",
function(e){


    if(e.target===awardModal){


        closeModal();


    }



    if(e.target===deleteModal){


        deleteModal.style.display="none";


    }



});