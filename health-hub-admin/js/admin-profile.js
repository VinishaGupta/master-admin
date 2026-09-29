/* ==========================================================
                APPROVED ADMIN PROFILE
========================================================== */

async function loadApprovedAdminProfile(){

    const summary = document.getElementById(
        "adminProfileSummary"
    );

    if(!summary){

        return;

    }

    if(!sessionStorage.getItem("healthHubLoginUsername")){

        summary.innerHTML = `
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>Account session not found.</span>
        `;

        return;

    }

    const storedProfile = sessionStorage.getItem(
        "healthHubLoginProfile"
    );
    const profile = storedProfile
        ? JSON.parse(storedProfile)
        : null;
    const result = profile
        ? {success:true,profiles:[profile]}
        : {success:false,message:"Account session not found."};

    if(!result.success){

        summary.innerHTML = `
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>${escapeProfileText(result.message)}</span>
        `;

        return;

    }

    summary.innerHTML = `
        <i class="fa-solid fa-user-check"></i>
        <span>
            <strong>Approved users</strong>
            <small>${result.profiles.length} account(s)</small>
        </span>
        <button
            type="button"
            class="profile-details-btn"
            id="profileDetailsButton">
            View details
        </button>
    `;

    document.getElementById(
        "profileDetailsButton"
    ).addEventListener(
        "click",
        function(){

            showApprovedProfileDetails(result.profiles);

        }
    );

}

function showApprovedProfileDetails(profiles){

    const summary = document.getElementById(
        "adminProfileSummary"
    );

    summary.classList.toggle("expanded");

    if(!summary.classList.contains("expanded")){

        return;

    }

    const existingPanel = summary.querySelector(
        ".profile-details-panel"
    );

    if(existingPanel){

        existingPanel.remove();

    }

    const details = profiles.map(function(profile){

        return `
            <div class="profile-user-row">
                <strong>${escapeProfileText(profile.requester_name || "Approved user")}</strong>
                <span>${escapeProfileText(profile.personal_email || "Email unavailable")}</span>
                <span>${escapeProfileText(profile.hospital_name || "Hospital unavailable")}</span>
                <span class="approved-status">Approved</span>
            </div>
        `;

    }).join("");

    summary.insertAdjacentHTML(
        "beforeend",
        `
        <div class="profile-details-panel">
            <div class="profile-panel-heading">
                <b>Approved account details</b>
                <span>Password values are hidden for security.</span>
            </div>
            ${details}
        </div>
        `
    );

}

function escapeProfileText(value){

    const element = document.createElement("span");

    element.textContent = String(value);

    return element.innerHTML;

}

document.addEventListener(
    "DOMContentLoaded",
    loadApprovedAdminProfile
);