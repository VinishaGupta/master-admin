// const container = document.getElementById("moduleContainer");

// const modules = [

//     healthHubAdmin,

//     jobSeekerAdmin

// ];

// modules.forEach(createCard);

// function createCard(module){

//     let featureHTML = "";

//     module.features.forEach(feature=>{

//         featureHTML += `

//             <div class="feature-chip">

//                 <i class="fa-solid fa-circle-check"></i>

//                 ${feature}

//             </div>

//         `;

//     });

//     container.innerHTML += `

//         <div class="featured-card">

//             <div
//                 class="featured-left"
//                 style="background-image:url('${module.image}')">

//             </div>

//             <div class="featured-right">

//                 <span class="featured-badge">

//                     ${module.subtitle}

//                 </span>

//                 <h2>

//                     ${module.title}

//                 </h2>

//                 <p>

//                     ${module.description}

//                 </p>

//                 <div class="feature-list">

//                     ${featureHTML}

//                 </div>

//                 <a
//                     href="${module.url}"
//                     class="dashboard-btn">

//                     ${module.button}

//                     <i class="fa-solid fa-arrow-right"></i>

//                 </a>

//             </div>

//         </div>

//     `;

// }
/* ==========================================================
                MODULE CONTAINER
========================================================== */

const container =
    document.getElementById("moduleContainer");


/* ==========================================================
                MODULES
========================================================== */

const modules = [

    healthHubAdmin,

    jobSeekerAdmin

];


/* ==========================================================
                CREATE MODULE CARDS
========================================================== */

modules.forEach(createCard);


function createCard(module){

    let featureHTML = "";


    module.features.forEach(feature=>{

        featureHTML += `

            <div class="feature-chip">

                <i class="fa-solid fa-circle-check"></i>

                ${feature}

            </div>

        `;

    });


    container.innerHTML += `

        <div class="featured-card">

            <div
                class="featured-left"
                style="background-image:url('${module.image}')">

            </div>


            <div class="featured-right">

                <span class="featured-badge">

                    ${module.subtitle}

                </span>


                <h2>

                    ${module.title}

                </h2>


                <p>

                    ${module.description}

                </p>


                <div class="feature-list">

                    ${featureHTML}

                </div>

                <button
                    type="button"
                    class="dashboard-btn"
                    onclick="openModuleLogin('${module.id}')">

                    ${module.button}

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            </div>

        </div>

    `;

}