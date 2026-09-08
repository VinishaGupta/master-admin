// const healthHubAdmin = {

//     title: "Health Hub Admin",

//     subtitle: "Healthcare Management",

//     description:
//         "Manage hospitals, doctors, institutions and healthcare services from one centralized platform.",

//     image: "assets/images/health-admin.png",

//     button: "Open Dashboard",

//     url: "health-hub-admin/dashboard.php",

//     features: [

//         "Hospitals",



//     ]

// };

// do not touch above code keep it as it is ^ this one ^//

/* ==========================================================
        HEALTH HUB ADMIN MODULE

        BACKEND INTEGRATION NOTE:
        ------------------------------------------------------
        This object contains frontend module information.

        The current URL is a frontend route only.

        Backend must protect the destination using
        proper authentication and authorization.

        Current module:
        healthHub
========================================================== */
const healthHubAdmin = {

    /*
     * Unique module identifier.
     * This is used by the reusable login system.
     */
    id: "healthHub",

    title: "Health Hub Admin",

    subtitle: "Healthcare Management",

    description:
        "Manage hospitals, doctors, institutions and healthcare services from one centralized platform.",

    image: "assets/images/health-admin.png",

    button: "Open Dashboard",

    /*
     * FRONTEND ROUTE
     *
     * Backend must protect this route from
     * unauthenticated/direct access.
     */
    url: "health-hub-admin/dashboard.php",

    features: [

        "Hospitals"

    ]

};