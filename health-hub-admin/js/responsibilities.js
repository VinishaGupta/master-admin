/* ==========================================================
            HOSPITAL RESPONSIBILITIES MODULE
========================================================== */


/*

BACKEND API

GET

/api/hospital/responsibilities


Response

{

    english : "<h3>...</h3><ul>...</ul>",

    hindi : "<h3>...</h3><ul>...</ul>",

    regional : "<h3>...</h3><ul>...</ul>"

}


POST

/api/hospital/responsibilities

Payload

{

    english : "...HTML...",

    hindi : "...HTML...",

    regional : "...HTML..."

}

Store HTML directly in database.

User Module will render HTML.

*/


/* ==========================================================
                INITIALIZE
========================================================== */

function initializeResponsibilities() {

    setupResponsibilityEditor(
        "responsibilityEnglish"
    );


    setupResponsibilityEditor(
        "responsibilityHindi"
    );


    setupResponsibilityEditor(
        "responsibilityRegional"
    );

}


/* ==========================================================
                ADD NEW HEADING
========================================================== */

function addResponsibilitySection(
    editorId,
    language
) {

    const editor =
        document.getElementById(editorId);


    if (!editor) {

        return;

    }


    let heading = "";

    let responsibility = "";


    if (language === "en") {

        heading = "New Heading";

        responsibility =
            "Write responsibility here";

    }


    if (language === "hi") {

        heading = "नया शीर्षक";

        responsibility =
            "यहाँ जिम्मेदारी लिखें";

    }


    if (language === "mr") {

        heading =
            "नवीन शीर्षक / " +
            "ಹೊಸ ಶೀರ್ಷಿಕೆ / " +
            "নতুন শিরোনাম";

        responsibility =
            "येथे जबाबदारी लिहा / " +
            "ಇಲ್ಲಿ ಜವಾಬ್ದಾರಿಯನ್ನು ಬರೆಯಿರಿ / " +
            "এখানে দায়িত্ব লিখুন";

    }


    editor.focus();


    const html =

`
<h3>${heading}</h3>

<ul>

<li>${responsibility}</li>

</ul>

<br>
`;


    editor.insertAdjacentHTML(
        "beforeend",
        html
    );

}


/* ==========================================================
        AUTO BULLET WHEN ENTER INSIDE UL
========================================================== */

function setupResponsibilityEditor(id) {

    const editor =
        document.getElementById(id);


    if (!editor) {

        return;

    }


    editor.addEventListener(
        "keydown",
        function(e) {

            if (e.key !== "Enter") {

                return;

            }


            const selection =
                window.getSelection();


            const node =
                selection.anchorNode;


            if (!node) {

                return;

            }


            const parent =
                node.parentElement;


            if (
                parent &&
                parent.tagName === "LI"
            ) {

                e.preventDefault();


                document.execCommand(
                    "insertHTML",
                    false,
                    "</li><li>"
                );

            }

        }
    );

}


/* ==========================================================
                RESET
========================================================== */

document.addEventListener(
    "click",
    function(e) {

        if (
            !e.target.closest(
                ".responsibility-reset"
            )
        ) {

            return;

        }


        if (
            confirm(
                "Clear all responsibilities?"
            )
        ) {

            document.getElementById(
                "responsibilityEnglish"
            ).innerHTML = "";


            document.getElementById(
                "responsibilityHindi"
            ).innerHTML = "";


            document.getElementById(
                "responsibilityRegional"
            ).innerHTML = "";

        }

    }
);


/* ==========================================================
                SAVE
========================================================== */

document.addEventListener(
    "click",
    function(e) {

        if (
            !e.target.closest(
                ".save-responsibilities"
            )
        ) {

            return;

        }


        /* ==========================================
                COPY HTML TO HIDDEN INPUTS
        ========================================== */

        document.getElementById(
            "responsibilityEnglishData"
        ).value =

            document.getElementById(
                "responsibilityEnglish"
            ).innerHTML;


        document.getElementById(
            "responsibilityHindiData"
        ).value =

            document.getElementById(
                "responsibilityHindi"
            ).innerHTML;


        document.getElementById(
            "responsibilityRegionalData"
        ).value =

            document.getElementById(
                "responsibilityRegional"
            ).innerHTML;


        /* ==========================================
                    DATA
        ========================================== */

        const data = {

            english:

                document.getElementById(
                    "responsibilityEnglishData"
                ).value,


            hindi:

                document.getElementById(
                    "responsibilityHindiData"
                ).value,


            regional:

                document.getElementById(
                    "responsibilityRegionalData"
                ).value

        };


        console.log(data);


        /*

        ======================================

        BACKEND

        POST

        /api/hospital/responsibilities

        BODY

        data

        ======================================

        */


        showSuccessModal([

            "Hospital responsibilities saved successfully.",

            "Responsibilities have been sent to backend.",

            "These responsibilities will appear in User Module."

        ]);

    }
);