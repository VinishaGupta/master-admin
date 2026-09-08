/* ==========================================================
                ELEMENTS
========================================================== */

const moduleButtons = document.querySelectorAll(".module-btn");

const contentArea = document.querySelector(".content-area");

/* ==========================================================
                LOAD SECTION
========================================================== */

function loadSection(section){

    fetch("sections/" + section + ".php")

    .then(response => response.text())

.then(html =>{

    contentArea.innerHTML = html;

    // Registration Page
    if(section === "registration"){

        if(typeof initializeRegistration === "function"){

            initializeRegistration();

        }

        if(typeof loadLoggedInUser === "function"){

            loadLoggedInUser();

        }
        

    }

    // Medical System Page
    else if(section === "medical-system"){

        if(typeof initializeMedicalSystem === "function"){

            initializeMedicalSystem();

        }

    }
    if(section === "controlled-by"){

        if(typeof initializeControlledBy === "function"){

            initializeControlledBy();

        }

    }
    else if(section === "services"){

    initializeServices();

    }
    else if(section==="therapies"){

        initializeTherapies();

    }
    else if(section==="insurance"){

        initializeInsurance();

    }


else if(section === "facilities"){

    if(typeof initializeFacilities === "function"){

        initializeFacilities();

    }

}
if(section === "medical-firm-type"){

    if(typeof initializeMedicalFirmType === "function"){

        initializeMedicalFirmType();

    }

}
else if(section === "hospital-language"){

    if(typeof initializeHospitalLanguage === "function"){

        initializeHospitalLanguage();

    }

}
else if(section==="instructions"){

    if(typeof initializeInstructions==="function"){

        initializeInstructions();

    }

}

else if(section==="advice"){

    if(typeof initializeAdvice==="function"){

        initializeAdvice();

    }

}
else if(section==="departments"){


if(typeof initializeDepartments==="function"){


initializeDepartments();


}


}
else if(section==="hospital-photos"){

    if(typeof initializeHospitalPhotos==="function"){

        initializeHospitalPhotos();

    }

}
else if(section === "awarded-by"){

    if(typeof initializeAwardedBy === "function"){

        initializeAwardedBy();

    }

}
else if(section === "emergency"){

    if(typeof initializeEmergency === "function"){

        initializeEmergency();

    }

}


})

    .catch(error =>{

        contentArea.innerHTML = `

            <div class="section-card">

                <h2>Unable to load module.</h2>

            </div>

        `;

        console.error(error);

    });

}

/* ==========================================================
                DEFAULT PAGE
========================================================== */

loadSection("registration");

/* ==========================================================
                BUTTON EVENTS
========================================================== */

moduleButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const section = button.dataset.section;

        if(!section){

            return;

        }

        moduleButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        loadSection(section);

    });

});
/* ===========================================
        BASIC INFORMATION MENU
=========================================== */

// const basicToggle = document.getElementById(

//     "basicToggle"

// );

// const basicMenu = document.getElementById(

//     "basicMenu"

// );

// const basicArrow = document.getElementById(

//     "basicArrow"

// );

// basicToggle.addEventListener(

//     "click",

//     ()=>{

//         basicMenu.classList.toggle(

//             "open"

//         );

//         basicArrow.classList.toggle(

//             "rotate"

//         );

//     }

// );
/* ===========================================
        BASIC INFORMATION MENU
=========================================== */

const basicToggle = document.getElementById("basicToggle");

if(basicToggle){

    const basicMenu = document.getElementById("basicMenu");

    const basicArrow = document.getElementById("basicArrow");

    basicToggle.addEventListener(

        "click",

        ()=>{

            basicMenu.classList.toggle("open");

            basicArrow.classList.toggle("rotate");

            basicToggle.classList.toggle("dropdown-open");

        }

    );

}