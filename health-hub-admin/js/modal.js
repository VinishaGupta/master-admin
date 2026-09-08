/* ==========================================================
                    CREATE MODAL
========================================================== */

function showSuccessModal(messageList){

    // Remove existing modal if present
    const existingModal = document.getElementById("successModal");

    if(existingModal){

        existingModal.remove();

    }

    let listHTML = "";

    messageList.forEach(message=>{

        listHTML += `

            <li>${message}</li>

        `;

    });

    const modalHTML = `

        <div
            id="successModal"
            class="custom-modal">

            <div class="custom-modal-box">

                <div class="modal-icon">

                    <i class="fa-solid fa-circle-check"></i>

                </div>

                <h2>

                    Registration Successful

                </h2>

                <ul>

                    ${listHTML}

                </ul>

                <button
                    id="modalOkButton"
                    class="primary-btn">

                    OK

                </button>

            </div>

        </div>

    `;

    document.body.insertAdjacentHTML(

        "beforeend",

        modalHTML

    );

    document

        .getElementById("modalOkButton")

        .addEventListener(

            "click",

            ()=>{

                document

                    .getElementById("successModal")

                    .remove();

            }

        );

}

/* ==========================================================
                    PASSWORD ERROR
========================================================== */

function showPasswordError(input){

    removePasswordError(input);

    input.style.border = "2px solid #ef4444";

    const error = document.createElement("small");

    error.className = "password-error";

    error.innerText = "Incorrect Password";

    error.style.color = "#ef4444";

    error.style.marginTop = "6px";

    input.parentNode.appendChild(error);

}

/* ==========================================================
                REMOVE PASSWORD ERROR
========================================================== */

function removePasswordError(input){

    input.style.border = "";

    const error = input.parentNode.querySelector(

        ".password-error"

    );

    if(error){

        error.remove();

    }

}