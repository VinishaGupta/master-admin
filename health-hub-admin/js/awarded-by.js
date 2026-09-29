/* ==========================================================
                    HOSPITAL AWARDS
                    DATABASE VERSION
========================================================== */

(function () {

    "use strict";


    /* ==========================================================
                        API
    ========================================================== */

    const API = {

        get: "api/hospital-awards/get.php",

        save: "api/hospital-awards/save.php",

        update: "api/hospital-awards/update.php",

        delete: "api/hospital-awards/delete.php"

    };


    /* ==========================================================
                        VARIABLES
    ========================================================== */

    let awards = [];

    let editingId = null;

    let deleteId = null;


    let awardGrid = null;

    let awardModal = null;

    let deleteModal = null;

    let awardForm = null;

    let titleInput = null;

    let awardByInput = null;

    let awardDateInput = null;

    let awardImageInput = null;

    let descriptionInput = null;

    let previewWrapper = null;

    let previewImage = null;

    let modalHeading = null;

    let charCount = null;


    /* ==========================================================
                    INITIALIZE
    ========================================================== */

    function initializeAwardedBy() {

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


        /* ------------------------------------------------------
                        CHECK ELEMENTS
        ------------------------------------------------------ */

        if (!awardGrid || !awardForm) {

            console.warn(
                "Hospital Awards section is not loaded yet."
            );

            return;
        }


        bindEvents();

        loadAwards();

    }


    /* ==========================================================
                        BIND EVENTS
    ========================================================== */

    function bindEvents() {

        const addAwardBtn =
            document.getElementById("addAwardBtn");

        const closeAwardModal =
            document.getElementById("closeAwardModal");

        const cancelAwardBtn =
            document.getElementById("cancelAwardBtn");

        const cancelDeleteAward =
            document.getElementById("cancelDeleteAward");

        const confirmDeleteAward =
            document.getElementById("confirmDeleteAward");


        if (addAwardBtn) {

            addAwardBtn.onclick =
                openAddModal;

        }


        if (closeAwardModal) {

            closeAwardModal.onclick =
                closeModal;

        }


        if (cancelAwardBtn) {

            cancelAwardBtn.onclick =
                closeModal;

        }


        if (cancelDeleteAward) {

            cancelDeleteAward.onclick =
                closeDeleteModal;

        }


        if (confirmDeleteAward) {

            confirmDeleteAward.onclick =
                removeAward;

        }


        if (awardImageInput) {

            awardImageInput.onchange =
                previewImageFile;

        }


        if (descriptionInput) {

            descriptionInput.oninput =
                updateCounter;

        }


        if (awardForm) {

            awardForm.onsubmit =
                saveAward;

        }

    }


    /* ==========================================================
                        LOAD AWARDS
    ========================================================== */

    async function loadAwards() {

        try {

            awardGrid.innerHTML = `

                <div class="empty-awards">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    <h3>Loading Awards...</h3>

                </div>

            `;


            const response =
                await fetch(API.get, {
                    method: "GET",
                    cache: "no-store"
                });


            const text =
                await response.text();


            let result;


            try {

                result =
                    JSON.parse(text);

            }
            catch (error) {

                console.error(
                    "Invalid JSON from get.php:",
                    text
                );

                throw new Error(
                    "Invalid response received from server."
                );

            }


            if (
                !response.ok ||
                result.status === "error"
            ) {

                throw new Error(
                    result.message ||
                    "Unable to load awards."
                );

            }


            /*
                Supports responses like:

                {
                    status: "success",
                    data: [...]
                }

                or

                {
                    status: "success",
                    awards: [...]
                }
            */

            if (Array.isArray(result.data)) {

                awards =
                    result.data;

            }
            else if (Array.isArray(result.awards)) {

                awards =
                    result.awards;

            }
            else if (Array.isArray(result)) {

                awards =
                    result;

            }
            else {

                awards = [];

            }


            renderAwards();

        }
        catch (error) {

            console.error(
                "Load Awards Error:",
                error
            );


            awardGrid.innerHTML = `

                <div class="empty-awards">

                    <i class="fa-solid fa-triangle-exclamation"></i>

                    <h3>Unable to Load Awards</h3>

                    <p>
                        ${escapeHtml(error.message)}
                    </p>

                </div>

            `;

        }

    }


    /* ==========================================================
                        OPEN ADD MODAL
    ========================================================== */

    function openAddModal() {

        editingId = null;


        if (modalHeading) {

            modalHeading.innerHTML =
                "Add Hospital Award";

        }


        if (awardForm) {

            awardForm.reset();

        }


        if (previewImage) {

            previewImage.src = "";

        }


        if (previewWrapper) {

            previewWrapper.style.display =
                "none";

        }


        if (charCount) {

            charCount.innerHTML =
                "0";

        }


        if (awardModal) {

            awardModal.style.display =
                "flex";

        }

    }


    /* ==========================================================
                        CLOSE MODAL
    ========================================================== */

    function closeModal() {

        if (awardModal) {

            awardModal.style.display =
                "none";

        }


        if (awardForm) {

            awardForm.reset();

        }


        if (previewImage) {

            previewImage.src = "";

        }


        if (previewWrapper) {

            previewWrapper.style.display =
                "none";

        }


        editingId = null;


        if (charCount) {

            charCount.innerHTML =
                "0";

        }

    }


    /* ==========================================================
                    PREVIEW IMAGE
    ========================================================== */

    function previewImageFile() {

        if (!awardImageInput) {
            return;
        }


        const file =
            awardImageInput.files[0];


        if (!file) {

            if (previewWrapper) {

                previewWrapper.style.display =
                    "none";

            }

            return;

        }


        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];


        if (!allowedTypes.includes(file.type)) {

            alert(
                "Only JPG, PNG and WEBP images are allowed."
            );


            awardImageInput.value = "";


            if (previewWrapper) {

                previewWrapper.style.display =
                    "none";

            }

            return;

        }


        if (file.size > 5 * 1024 * 1024) {

            alert(
                "Image must be smaller than 5 MB."
            );


            awardImageInput.value = "";


            if (previewWrapper) {

                previewWrapper.style.display =
                    "none";

            }

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                if (previewImage) {

                    previewImage.src =
                        event.target.result;

                }


                if (previewWrapper) {

                    previewWrapper.style.display =
                        "flex";

                }

            };


        reader.readAsDataURL(file);

    }


    /* ==========================================================
                    CHARACTER COUNTER
    ========================================================== */

    function updateCounter() {

        if (!descriptionInput ||
            !charCount) {

            return;

        }


        charCount.innerHTML =
            descriptionInput.value.length;

    }


    /* ==========================================================
                        SAVE / UPDATE
    ========================================================== */

    async function saveAward(event) {

        event.preventDefault();


        const title =
            titleInput ?
            titleInput.value.trim() :
            "";


        const awardedBy =
            awardByInput ?
            awardByInput.value.trim() :
            "";


        const date =
            awardDateInput ?
            awardDateInput.value :
            "";


        const description =
            descriptionInput ?
            descriptionInput.value.trim() :
            "";


        /* ------------------------------------------------------
                            VALIDATION
        ------------------------------------------------------ */

        if (title === "") {

            alert(
                "Please enter Award Title."
            );

            return;

        }


        if (awardedBy === "") {

            alert(
                "Please enter Awarded By."
            );

            return;

        }


        if (description.length > 100) {

            alert(
                "Description cannot exceed 100 characters."
            );

            return;

        }


        try {

            const formData =
                new FormData();


            formData.append(
                "award_title",
                title
            );


            formData.append(
                "awarded_by",
                awardedBy
            );


            formData.append(
                "award_date",
                date
            );


            formData.append(
                "description",
                description
            );


            /*
                Image is OPTIONAL.

                Only send it when user
                selected a new image.
            */

            if (
                awardImageInput &&
                awardImageInput.files.length > 0
            ) {

                formData.append(
                    "image",
                    awardImageInput.files[0]
                );

            }


            let url;


            /* --------------------------------------------------
                            ADD
            -------------------------------------------------- */

            if (editingId === null) {

                url =
                    API.save;

            }


            /* --------------------------------------------------
                            UPDATE
            -------------------------------------------------- */

            else {

                formData.append(
                    "id",
                    editingId
                );


                url =
                    API.update;

            }


            const response =
                await fetch(
                    url,
                    {
                        method: "POST",
                        body: formData,
                        cache: "no-store"
                    }
                );


            const text =
                await response.text();


            let result;


            try {

                result =
                    JSON.parse(text);

            }
            catch (error) {

                console.error(
                    "Invalid server response:",
                    text
                );

                throw new Error(
                    "Invalid response received from server."
                );

            }


            if (
                !response.ok ||
                result.status === "error"
            ) {

                throw new Error(
                    result.message ||
                    "Unable to save award."
                );

            }


            alert(
                editingId === null
                    ? "Award saved successfully."
                    : "Award updated successfully."
            );


            closeModal();

            await loadAwards();

        }
        catch (error) {

            console.error(
                "Save Award Error:",
                error
            );


            alert(
                error.message ||
                "Something went wrong while saving the award."
            );

        }

    }


    /* ==========================================================
                        RENDER AWARDS
    ========================================================== */

    function renderAwards() {

        if (!awardGrid) {
            return;
        }


        awardGrid.innerHTML = "";


        if (
            !Array.isArray(awards) ||
            awards.length === 0
        ) {

            awardGrid.innerHTML = `

                <div class="empty-awards">

                    <i class="fa-solid fa-award"></i>

                    <h3>No Awards Added</h3>

                    <p>
                        Click <b>Add Award</b>
                        to showcase your hospital achievements.
                    </p>

                </div>

            `;

            return;

        }


        awards.forEach(
            function (award) {

                awardGrid.appendChild(
                    createAwardCard(award)
                );

            }
        );

    }


    /* ==========================================================
                        CREATE CARD
    ========================================================== */

    function createAwardCard(award) {

        const card =
            document.createElement("div");


        card.className =
            "award-card";


        const id =
            award.id;


        const title =
            award.award_title ??
            award.title ??
            "";


        const awardedBy =
            award.awarded_by ??
            award.awardedBy ??
            "";


        const date =
            award.award_date ??
            award.date ??
            "";


        const description =
            award.description ??
            "";


        const image =
            getImageUrl(
                award.image
            );


        card.innerHTML = `

            <div class="award-image">

                ${
                    image
                    ?
                    `
                    <img
                        src="${escapeAttribute(image)}"
                        alt="${escapeAttribute(title)}"
                    >
                    `
                    :
                    `
                    <div class="award-no-image">

                        <i class="fa-solid fa-award"></i>

                    </div>
                    `
                }

            </div>


            <div class="award-content">

                <h3>
                    ${escapeHtml(title)}
                </h3>


                <span class="award-by">

                    <b>Awarded By :</b>
                    ${escapeHtml(awardedBy)}

                </span>


                ${
                    date
                    ?
                    `
                    <span class="award-date">

                        ${escapeHtml(formatDate(date))}

                    </span>
                    `
                    :
                    ""
                }


                ${
                    description
                    ?
                    `
                    <p>
                        ${escapeHtml(description)}
                    </p>
                    `
                    :
                    ""
                }


                <div class="award-actions">

                    <button
                        type="button"
                        class="secondary-btn edit-btn"
                    >

                        <i class="fa-solid fa-pen"></i>

                        Edit

                    </button>


                    <button
                        type="button"
                        class="danger-btn delete-btn"
                    >

                        <i class="fa-solid fa-trash"></i>

                        Delete

                    </button>

                </div>

            </div>

        `;


        const editButton =
            card.querySelector(
                ".edit-btn"
            );


        const deleteButton =
            card.querySelector(
                ".delete-btn"
            );


        if (editButton) {

            editButton.onclick =
                function () {

                    editAward(id);

                };

        }


        if (deleteButton) {

            deleteButton.onclick =
                function () {

                    deleteAward(id);

                };

        }


        return card;

    }


    /* ==========================================================
                            EDIT
    ========================================================== */

    function editAward(id) {

        const award =
            awards.find(
                function (item) {

                    return String(item.id) ===
                        String(id);

                }
            );


        if (!award) {

            alert(
                "Award record not found."
            );

            return;

        }


        editingId =
            award.id;


        const title =
            award.award_title ??
            award.title ??
            "";


        const awardedBy =
            award.awarded_by ??
            award.awardedBy ??
            "";


        const date =
            award.award_date ??
            award.date ??
            "";


        const description =
            award.description ??
            "";


        const image =
            award.image ??
            "";


        if (modalHeading) {

            modalHeading.innerHTML =
                "Edit Hospital Award";

        }


        if (titleInput) {

            titleInput.value =
                title;

        }


        if (awardByInput) {

            awardByInput.value =
                awardedBy;

        }


        if (awardDateInput) {

            awardDateInput.value =
                date;

        }


        if (descriptionInput) {

            descriptionInput.value =
                description;

        }


        if (charCount) {

            charCount.innerHTML =
                description.length;

        }


        if (awardImageInput) {

            awardImageInput.value =
                "";

        }


        if (image) {

            if (previewImage) {

                previewImage.src =
                    getImageUrl(image);

            }


            if (previewWrapper) {

                previewWrapper.style.display =
                    "flex";

            }

        }
        else {

            if (previewImage) {

                previewImage.src =
                    "";

            }


            if (previewWrapper) {

                previewWrapper.style.display =
                    "none";

            }

        }


        if (awardModal) {

            awardModal.style.display =
                "flex";

        }

    }


    /* ==========================================================
                            DELETE
    ========================================================== */

    function deleteAward(id) {

        deleteId =
            id;


        if (deleteModal) {

            deleteModal.style.display =
                "flex";

        }

    }


    /* ==========================================================
                        CLOSE DELETE MODAL
    ========================================================== */

    function closeDeleteModal() {

        if (deleteModal) {

            deleteModal.style.display =
                "none";

        }


        deleteId =
            null;

    }


    /* ==========================================================
                            REMOVE
    ========================================================== */

    async function removeAward() {

        if (deleteId === null) {

            return;

        }


        try {

            const formData =
                new FormData();


            formData.append(
                "id",
                deleteId
            );


            const response =
                await fetch(
                    API.delete,
                    {
                        method: "POST",
                        body: formData,
                        cache: "no-store"
                    }
                );


            const text =
                await response.text();


            let result;


            try {

                result =
                    JSON.parse(text);

            }
            catch (error) {

                console.error(
                    "Invalid delete response:",
                    text
                );

                throw new Error(
                    "Invalid response received from server."
                );

            }


            if (
                !response.ok ||
                result.status === "error"
            ) {

                throw new Error(
                    result.message ||
                    "Unable to delete award."
                );

            }


            closeDeleteModal();


            await loadAwards();

        }
        catch (error) {

            console.error(
                "Delete Award Error:",
                error
            );


            alert(
                error.message ||
                "Something went wrong while deleting the award."
            );

        }

    }


    /* ==========================================================
                    IMAGE URL
    ========================================================== */

    function getImageUrl(image) {

        if (!image) {

            return "";

        }


        image =
            String(image).trim();


        if (image === "") {

            return "";

        }


        /* Already complete URL */

        if (
            image.startsWith("http://") ||
            image.startsWith("https://") ||
            image.startsWith("data:")
        ) {

            return image;

        }


        /*
            Database currently stores:

            uploads/hospital-awards/filename.jpg
        */

        if (
            image.startsWith("/")
        ) {

            return image;

        }


        return (
            "/superadmin/master/health-hub-admin/" +
            image.replace(/^\/+/, "")
        );

    }


    /* ==========================================================
                        FORMAT DATE
    ========================================================== */

    function formatDate(date) {

        if (!date) {

            return "";

        }


        /*
            Keep YYYY-MM-DD display clean.
        */

        if (
            /^\d{4}-\d{2}-\d{2}$/.test(date)
        ) {

            const parts =
                date.split("-");


            return (
                parts[2] +
                "/" +
                parts[1] +
                "/" +
                parts[0]
            );

        }


        return date;

    }


    /* ==========================================================
                        ESCAPE HTML
    ========================================================== */

    function escapeHtml(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* ==========================================================
                    ESCAPE ATTRIBUTE
    ========================================================== */

    function escapeAttribute(value) {

        return escapeHtml(value);

    }


    /* ==========================================================
                    OUTSIDE CLICK
    ========================================================== */

    window.addEventListener(
        "click",
        function (event) {

            if (
                awardModal &&
                event.target === awardModal
            ) {

                closeModal();

            }


            if (
                deleteModal &&
                event.target === deleteModal
            ) {

                closeDeleteModal();

            }

        }
    );


    /* ==========================================================
                    GLOBAL FUNCTION
    ========================================================== */

    window.initializeAwardedBy =
        initializeAwardedBy;


})();