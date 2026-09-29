const logoutButton = document.getElementById("logoutBtn");

if(logoutButton){

    logoutButton.addEventListener("click", async function(){

        logoutButton.disabled = true;

        try{

            await fetch("../api/profile-logout.php", {
                method:"POST",
                credentials:"include"
            });

        }

        catch(error){

            console.error("Logout API Error:", error);

        }

        sessionStorage.removeItem("healthHubLoginUsername");
        sessionStorage.removeItem("healthHubLoginEmail");
        sessionStorage.removeItem("healthHubLoginPassword");
        sessionStorage.removeItem("healthHubLoginProfile");
        window.location.href = "../index.php";

    });

}