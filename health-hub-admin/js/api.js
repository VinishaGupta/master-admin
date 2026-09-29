// The admin application is served from /masteradmin/health-hub-admin, while
// the PHP API is at /masteradmin/api.  Going up two levels incorrectly targets
// /api and causes 404 responses on localhost.
const API_BASE_URL = "../api";

const PROFILE_REQUESTS_API =
    "https://livtara.in/api/profile/get_requests.php";

const LOCATION_API_BASE_URL =
    "https://smartjisolutions.smartbulkji.com/smartwebji/api";

const PINCODE_API_URL =
    "https://smartbulkji.com/api/getallpincode.php";

const PREVIOUS_ADDRESS_API_BASE_URL =
    "https://smartjisolutions.smartbulkji.com/smartwebji/api";

function normalizeLocationUrl(url){
    // The location provider supports CORS. Calling it in the browser avoids
    // XAMPP/PHP cURL outbound SSL timeouts on local development machines.
    return url;

}

async function fetchLocationData(url){

    const safeUrl = normalizeLocationUrl(url);

    try{

        const response = await fetch(safeUrl, {
            credentials:"same-origin"
        });

        if(!response.ok){

            return [];

        }

        const text = await response.text();

        if(!text){

            return [];

        }

        try{

            return JSON.parse(text);

        }

        catch(error){

            return [];

        }

    }

    catch(error){

        console.warn("Location fetch failed:", safeUrl, error);

        return [];

    }

}

function getLocationRows(result){

    if(Array.isArray(result)){

        return result;

    }

    if(result && Array.isArray(result.data)){

        return result.data;

    }

    if(result && Array.isArray(result.result)){

        return result.result;

    }

    if(result && Array.isArray(result.rows)){

        return result.rows;

    }

    if(result && Array.isArray(result.records)){

        return result.records;

    }

    if(result && result.data && Array.isArray(result.data.data)){

        return result.data.data;

    }

    return [];

}

async function getStates(){

    return getLocationRows(await fetchLocationData(
        LOCATION_API_BASE_URL + "/medico_state.php"
    ));

}

async function getDistricts(stateId){

    return getLocationRows(await fetchLocationData(
        LOCATION_API_BASE_URL + "/medico_district.php?stateid=" +
        encodeURIComponent(stateId)
    ));

}

async function getCities(districtId){

    return getLocationRows(await fetchLocationData(
        LOCATION_API_BASE_URL + "/medico_city.php?districtid=" +
        encodeURIComponent(districtId)
    ));

}

async function getVillages(cityId){

    return getLocationRows(await fetchLocationData(
        LOCATION_API_BASE_URL + "/medico_village.php?cityid=" +
        encodeURIComponent(cityId)
    ));

}

async function getPincodes(villageShortName){

    const result = await fetchLocationData(
        PINCODE_API_URL + "?village_short_name=" +
        encodeURIComponent(villageShortName)
    );

    const rows = getLocationRows(result);

    // Some pincode services return one record as an object instead of an array.
    return rows.length || !result || Array.isArray(result) ? rows : [result];

}

async function getPreviousStates(){
    return getLocationRows(await fetchLocationData(
        PREVIOUS_ADDRESS_API_BASE_URL + "/medico_state.php"
    ));
}

async function getPreviousDistricts(stateId){
    return getLocationRows(await fetchLocationData(
        PREVIOUS_ADDRESS_API_BASE_URL + "/medico_district.php?stateid=" + encodeURIComponent(stateId)
    ));
}

async function getPreviousCities(districtId){
    return getLocationRows(await fetchLocationData(
        PREVIOUS_ADDRESS_API_BASE_URL + "/medico_city.php?districtid=" + encodeURIComponent(districtId)
    ));
}

async function getPreviousVillages(cityId){
    return getLocationRows(await fetchLocationData(
        PREVIOUS_ADDRESS_API_BASE_URL + "/medico_village.php?cityid=" + encodeURIComponent(cityId)
    ));
}

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

/* ==========================================================
                    GENERATE HOSPITAL CODE
========================================================== */

async function generateHospitalCode(payload){

    try{

        const response = await fetch(

            API_BASE_URL + "/hospital-code.php",

            {

                method:"POST",

                credentials:"include",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(payload)

            }

        );

        const result = await response.json();

        if(!response.ok){

            return{

                success:false,

                message:result.message || "Hospital code could not be generated."

            };

        }

        return result;

    }

    catch(error){

        console.error("Hospital Code API Error:",error);

        return{

            success:false,

            message:"Unable to connect to the hospital code API."

        };

    }

}

/* ==========================================================
                    GET APPROVED PROFILE
========================================================== */

async function getApprovedProfiles(username){

    try{

        const response = await fetch(

            PROFILE_REQUESTS_API,

            {

                credentials:"include"

            }

        );

        const result = await response.json();

        if(!response.ok || !result.success || !Array.isArray(result.data)){

            return{

                success:false,

                message:"Unable to load approved account details."

            };

        }

        const profiles = result.data.filter(function(item){

            return item.status === "approved" &&
                (!username || String(item.username).trim() === String(username).trim());

        });

        if(!profiles.length){

            return{

                success:false,

                message:"No approved profile was found for this account."

            };

        }

        return{

            success:true,

            profiles:profiles

        };

    }

    catch(error){

        console.error("Approved Profile API Error:",error);

        return{

            success:false,

            message:"Unable to connect to the approved profile API."

        };

    }

}

/* ==========================================================
            VERIFY APPROVED LOGGED-IN USER
========================================================== */

async function verifyLoggedInUserPassword(password){

    const username = sessionStorage.getItem(
        "healthHubLoginUsername"
    );

    if(!username || !password){

        return{
            success:false
        };

    }

    try{

        const response = await fetch(
            "../api/profile-login.php",
            {
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username:username,
                    password:password,
                    loginInstanceId:sessionStorage.getItem(
                        "healthHubLoginInstanceId"
                    ) || ""
                })
            }
        );

        const result = await response.json();

        return{
            success:response.ok && result.success === true
        };

    }

    catch(error){

        console.error("Logged-in password verification error:",error);

        return{
            success:false
        };

    }

}
