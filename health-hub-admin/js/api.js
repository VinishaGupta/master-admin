/* ==========================================================
                    API CONFIGURATION
========================================================== */

// Change this URL according to your backend.

const API_BASE_URL = "http://localhost:8002/health-hub-api";

/* ==========================================================
                    GET LOGGED USER
========================================================== */

async function getLoggedInUser(){

    try{

        const response = await fetch(

            API_BASE_URL + "/getLoggedInUser.php",

            {
                credentials:"include"
            }

        );

        return await response.json();

    }

    catch(error){

        console.error(error);

        return {

            success:false,

            message:"Unable to fetch logged in user."

        };

    }

}

/* ==========================================================
                    VERIFY PASSWORD
========================================================== */

async function verifyPassword(password){

    try{

        const response = await fetch(

            API_BASE_URL + "/verifyPassword.php",

            {

                method:"POST",

                credentials:"include",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    password:password

                })

            }

        );

        return await response.json();

    }

    catch(error){

        console.error(error);

        return{

            success:false

        };

    }

}

/* ==========================================================
                    REGISTER MEDICAL FIRM
========================================================== */

async function registerMedicalFirm(formData){

    try{

        const response = await fetch(

            API_BASE_URL + "/registerMedicalFirm.php",

            {

                method:"POST",

                credentials:"include",

                body:formData

            }

        );

        return await response.json();

    }

    catch(error){

        console.error(error);

        return{

            success:false,

            message:"Registration Failed"

        };

    }

}