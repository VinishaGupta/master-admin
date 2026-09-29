/* ==========================================================
                ELEMENTS & CONFIGURATION
========================================================== */

const moduleButtons = document.querySelectorAll(".module-btn");
const contentArea = document.querySelector(".content-area");

/**
 * Registry mapping section names to initialization callbacks.
 */
const sectionInitializers = {
    "registration": () => {
        if (typeof initializeRegistration === "function") initializeRegistration();
        if (typeof loadLoggedInUser === "function") loadLoggedInUser();
    },
    "medical-system": () => {
        if (typeof initializeMedicalSystem === "function") initializeMedicalSystem();
    },
    "controlled-by": () => {
        if (typeof initializeControlledBy === "function") initializeControlledBy();
    },
    "services": () => {
        if (typeof initializeServices === "function") initializeServices();
    },
    "therapies": () => {
        if (typeof initializeTherapies === "function") initializeTherapies();
    },
    "insurance": () => {
        if (typeof initializeInsurance === "function") initializeInsurance();
    },
    "facilities": () => {
        if (typeof initializeFacilities === "function") initializeFacilities();
    },
    "medical-firm-type": () => {
        if (typeof initializeMedicalFirmType === "function") initializeMedicalFirmType();
    },
    "hospital-language": () => {
        if (typeof initializeHospitalLanguage === "function") initializeHospitalLanguage();
    },
    "instructions": () => {
        if (typeof initializeInstructions === "function") initializeInstructions();
    },
    "advice": () => {
        if (typeof initializeAdvice === "function") initializeAdvice();
    },
    "departments": () => {
        if (typeof initializeDepartments === "function") initializeDepartments();
    },
    "hospital-photos": () => {
        if (typeof initializeHospitalPhotos === "function") initializeHospitalPhotos();
    },
    "awarded-by": () => {
        if (typeof initializeAwardedBy === "function") initializeAwardedBy();
    },
    "emergency": () => {
        if (typeof initializeEmergency === "function") initializeEmergency();
    }
};

/* ==========================================================
                LOAD SECTION FUNCTION
========================================================== */

async function loadSection(section) {
    if (!contentArea) return;

    try {
        const response = await fetch(`sections/${section}.php`);
        
        if (!response.ok) {
            throw new Error(`Failed to load module: ${response.statusText}`);
        }

        const html = await response.text();
        contentArea.innerHTML = html;

        // Run section-specific initializer
        if (sectionInitializers[section]) {
            sectionInitializers[section]();
        }

    } catch (error) {
        contentArea.innerHTML = `
            <div class="section-card">
                <h2>Unable to load module.</h2>
            </div>
        `;
        console.error(`Error loading section '${section}':`, error);
    }
}

/* ==========================================================
                EVENT LISTENERS & INIT
========================================================== */

// 1. Module Buttons Listener
moduleButtons.forEach(button => {
    button.addEventListener("click", () => {
        const section = button.dataset.section;
        if (!section) return;

        moduleButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        loadSection(section);
    });
});

// 2. Dropdown Menu Toggle
const basicToggle = document.getElementById("basicToggle");
if (basicToggle) {
    const basicMenu = document.getElementById("basicMenu");
    const basicArrow = document.getElementById("basicArrow");

    basicToggle.addEventListener("click", () => {
        if (basicMenu) basicMenu.classList.toggle("open");
        if (basicArrow) basicArrow.classList.toggle("rotate");
        basicToggle.classList.toggle("dropdown-open");
    });
}

// 3. Default Page Load
loadSection("registration");