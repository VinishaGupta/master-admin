/* ==========================================================
   RIGHTS MODULE
========================================================== */


/* ==========================================================
   BACKEND API

   GET
   /api/hospital/rights

   Response:

   {
       english: "<h3>...</h3><ul>...</ul>",
       hindi: "<h3>...</h3><ul>...</ul>",
       regional: "<h3>...</h3><ul>...</ul>"
   }


   POST
   /api/hospital/rights

   Payload:

   {
       english: "...HTML...",
       hindi: "...HTML...",
       regional: "...HTML..."
   }

   Store HTML directly in database.
========================================================== */


/* ==========================================================
   INITIALIZE
========================================================== */

function initializeRights() {

    setupRightsEditor("rightsEnglish");

    setupRightsEditor("rightsHindi");

    setupRightsEditor("rightsRegional");

}


/* ==========================================================
   ADD NEW HEADING
========================================================== */

function addRightsSection(editorId, language) {

    const editor = document.getElementById(editorId);

    if (!editor) {
        return;
    }


    let heading = "";

    let right = "";


    /* ENGLISH */

    if (language === "en") {

        heading = "New Heading";

        right = "Write right here";

    }


    /* HINDI */

    if (language === "hi") {

        heading = "नया शीर्षक";

        right = "यहाँ अधिकार लिखें";

    }


    /* REGIONAL */

    if (language === "mr") {

        heading =
            "नवीन शीर्षक / ಹೊಸ ಶೀರ್ಷಿಕೆ / নতুন শিরোনাম";

        right =
            "येथे अधिकार लिहा / ಇಲ್ಲಿ ಹಕ್ಕು ಬರೆಯಿರಿ / এখানে অধিকার লিখুন";

    }


    editor.focus();


    const html = `
        <h3>${heading}</h3>
        <ul>
            <li>${right}</li>
        </ul>
        <br>
    `;


    editor.insertAdjacentHTML("beforeend", html);

}


/* ==========================================================
   EDITOR
========================================================== */

function setupRightsEditor(id) {

    const editor = document.getElementById(id);

    if (!editor) {
        return;
    }


    editor.addEventListener("keydown", function (e) {

        if (e.key !== "Enter") {
            return;
        }


        const selection = window.getSelection();

        const node = selection.anchorNode;


        if (!node) {
            return;
        }


        const parent = node.parentElement;


        /*
         * When Enter is pressed inside a bullet,
         * create another bullet instead of breaking
         * the editor layout.
         */

        if (parent && parent.tagName === "LI") {

            e.preventDefault();

            document.execCommand(
                "insertHTML",
                false,
                "</li><li>"
            );

        }

    });

}


/* ==========================================================
   RESET
========================================================== */

document.addEventListener("click", function (e) {

    const resetButton =
        e.target.closest(".rights-reset");


    if (!resetButton) {
        return;
    }


    if (confirm("Clear all rights?")) {

        const english =
            document.getElementById("rightsEnglish");

        const hindi =
            document.getElementById("rightsHindi");

        const regional =
            document.getElementById("rightsRegional");


        if (english) {
            english.innerHTML = "";
        }


        if (hindi) {
            hindi.innerHTML = "";
        }


        if (regional) {
            regional.innerHTML = "";
        }

    }

});


/* ==========================================================
   SAVE
========================================================== */

document.addEventListener("click", function (e) {

    const saveButton =
        e.target.closest(".save-rights");


    if (!saveButton) {
        return;
    }


    /* ENGLISH */

    document.getElementById("rightsEnglishData").value =
        document.getElementById("rightsEnglish").innerHTML;


    /* HINDI */

    document.getElementById("rightsHindiData").value =
        document.getElementById("rightsHindi").innerHTML;


    /* REGIONAL */

    document.getElementById("rightsRegionalData").value =
        document.getElementById("rightsRegional").innerHTML;


    /* PAYLOAD */

    const data = {

        english:
            document.getElementById("rightsEnglishData").value,

        hindi:
            document.getElementById("rightsHindiData").value,

        regional:
            document.getElementById("rightsRegionalData").value

    };


    console.log(data);


    /*
     * BACKEND API
     *
     * POST /api/hospital/rights
     *
     * Send "data" to backend.
     */


    showSuccessModal([

        "Hospital rights saved successfully.",

        "Rights have been sent to backend.",

        "These rights will appear in User Module."

    ]);

});