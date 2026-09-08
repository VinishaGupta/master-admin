/* ==========================================================
            HOSPITAL INSTRUCTIONS MODULE
========================================================== */

/*

BACKEND API

GET

/api/hospital/instructions


Response

{

    english : "<h3>...</h3><ul>...</ul>",

    hindi : "<h3>...</h3><ul>...</ul>",

    regional : "<h3>...</h3><ul>...</ul>"

}



POST

/api/hospital/instructions

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

function initializeInstructions(){

    setupEditor("instructionEnglish");

    setupEditor("instructionHindi");

    setupEditor("instructionRegional");

}


/* ==========================================================
                ADD NEW HEADING
========================================================== */

function addInstructionSection(editorId,language){
// console.log(language);
    const editor=document.getElementById(editorId);

    let heading="";
    let instruction="";

    if(language==="en"){

        heading="New Heading";

        instruction="Write instruction here";

    }

    if(language==="hi"){

        heading="नया शीर्षक";

        instruction="यहाँ निर्देश लिखें";

    }

    if(language==="mr"){

        heading="नवीन शीर्षक / ಹೊಸ ಶೀರ್ಷಿಕೆ / নতুন শিরোনাম";

        instruction="येथे सूचना लिहा / ಇಲ್ಲಿ ಸೂಚನೆ ಬರೆಯಿರಿ / এখানে নির্দেশ লিখুন";

    }

    editor.focus();

    const html=

`

<h3>${heading}</h3>

<ul>

<li>${instruction}</li>

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

function setupEditor(id){

    const editor=document.getElementById(id);

    if(!editor){

        return;

    }

    editor.addEventListener(

        "keydown",

        function(e){

            if(e.key==="Enter"){

                const selection=window.getSelection();

                const node=selection.anchorNode;

                if(!node){

                    return;

                }

                const parent=node.parentElement;

                if(parent && parent.tagName==="LI"){

                    e.preventDefault();

                    document.execCommand(

                        "insertHTML",

                        false,

                        "</li><li>"

                    );

                }

            }

        }

    );

}


/* ==========================================================
                RESET
========================================================== */

document.addEventListener(

"click",

function(e){

    if(!e.target.closest(".instruction-reset")){

        return;

    }

    if(confirm("Clear all instructions?")){

        document.getElementById(

            "instructionEnglish"

        ).innerHTML="";



        document.getElementById(

            "instructionHindi"

        ).innerHTML="";



        document.getElementById(

            "instructionRegional"

        ).innerHTML="";

    }

}

);


/* ==========================================================
                SAVE
========================================================== */

document.addEventListener(

"click",

function(e){

    if(!e.target.closest(".save-instructions")){

        return;

    }

    /* ==========================================
            COPY HTML TO HIDDEN INPUTS
    ========================================== */

    document.getElementById(

        "instructionEnglishData"

    ).value=

    document.getElementById(

        "instructionEnglish"

    ).innerHTML;



    document.getElementById(

        "instructionHindiData"

    ).value=

    document.getElementById(

        "instructionHindi"

    ).innerHTML;



    document.getElementById(

        "instructionRegionalData"

    ).value=

    document.getElementById(

        "instructionRegional"

    ).innerHTML;



    /* ==========================================
            DATA
    ========================================== */

    const data={

        english:

        document.getElementById(

            "instructionEnglishData"

        ).value,



        hindi:

        document.getElementById(

            "instructionHindiData"

        ).value,



        regional:

        document.getElementById(

            "instructionRegionalData"

        ).value

    };


    console.log(data);



    /*

    ======================================

    BACKEND

    POST

    /api/hospital/instructions

    BODY

    data

    ======================================

    */



    showSuccessModal([

        "Hospital instructions saved successfully.",

        "Instructions have been sent to backend.",

        "These instructions will appear in User Module."

    ]);

});