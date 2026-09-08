/* ==========================================================
            HOSPITAL ADVICE MODULE
========================================================== */

/*

BACKEND API

GET

/api/hospital/advice


Response

{

    english : "<h3>...</h3><ul>...</ul>",

    hindi : "<h3>...</h3><ul>...</ul>",

    regional : "<h3>...</h3><ul>...</ul>"

}



POST

/api/hospital/advice

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

function initializeAdvice(){

    setupAdviceEditor("adviceEnglish");

    setupAdviceEditor("adviceHindi");

    setupAdviceEditor("adviceRegional");

}


/* ==========================================================
                ADD NEW HEADING
========================================================== */

function addAdviceSection(editorId,language){

    const editor=document.getElementById(editorId);

    let heading="";
    let advice="";

    if(language==="en"){

        heading="New Heading";

        advice="Write advice here";

    }

    if(language==="hi"){

        heading="नया शीर्षक";

        advice="यहाँ सलाह लिखें";

    }

    if(language==="mr"){

        heading=`

    नवीन शीर्षक
    /
    ಹೊಸ ಶೀರ್ಷಿಕೆ
    /
    নতুন শিরোনাম

    `;

        advice=`

    येथे सल्ला लिहा
    /
    ಇಲ್ಲಿ ಸಲಹೆ ಬರೆಯಿರಿ
    /
    এখানে পরামর্শ লিখুন

    `;

    }
    editor.focus();

    const html=

`

<h3>${heading}</h3>

<ul>

<li>${advice}</li>

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

function setupAdviceEditor(id){

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

    if(!e.target.closest(".advice-reset")){

        return;

    }

    if(confirm("Clear all advice?")){

        document.getElementById(

            "adviceEnglish"

        ).innerHTML="";



        document.getElementById(

            "adviceHindi"

        ).innerHTML="";



        document.getElementById(

            "adviceRegional"

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

    if(!e.target.closest(".save-advice")){

        return;

    }

    /* ==========================================
            COPY HTML TO HIDDEN INPUTS
    ========================================== */

    document.getElementById(

        "adviceEnglishData"

    ).value=

    document.getElementById(

        "adviceEnglish"

    ).innerHTML;



    document.getElementById(

        "adviceHindiData"

    ).value=

    document.getElementById(

        "adviceHindi"

    ).innerHTML;



    document.getElementById(

        "adviceRegionalData"

    ).value=

    document.getElementById(

        "adviceRegional"

    ).innerHTML;



    /* ==========================================
            DATA
    ========================================== */

    const data={

        english:

        document.getElementById(

            "adviceEnglishData"

        ).value,



        hindi:

        document.getElementById(

            "adviceHindiData"

        ).value,



        regional:

        document.getElementById(

            "adviceRegionalData"

        ).value

    };


    console.log(data);



    /*

    ======================================

    BACKEND

    POST

    /api/hospital/advice

    BODY

    data

    ======================================

    */



    showSuccessModal([

        "Hospital advice saved successfully.",

        "Advice has been sent to backend.",

        "This advice will appear in User Module."

    ]);

});