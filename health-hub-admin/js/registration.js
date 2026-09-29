/* ==========================================================
                 PAGE LOAD & INITIALIZATION
========================================================== */

async function loadLoggedInUser() {
    const emailInput = document.getElementById("loginEmail");
    if (!emailInput) return;

    const storedProfile = sessionStorage.getItem("healthHubLoginProfile");
    const profile = storedProfile ? JSON.parse(storedProfile) : null;

    const result = profile
        ? {
            success: true,
            email: profile.personal_email || "",
            password: profile.password || ""
          }
        : await getLoggedInUser();

    if (result && result.success) {
        emailInput.value = result.email || "";
        const passwordInput = document.getElementById("confirmPassword");
        if (passwordInput && result.password) {
            passwordInput.value = result.password;
        }
        emailInput.readOnly = true;
    }
}

function initializeRegistration() {
    const form = document.getElementById("registrationForm");
    if (!form) return;

    initializeLandlineValidation();
    initializeLocationFields();
    initializePreviousLocationFields();
    initializeHospitalCode();
    initializeFirmLogoPreview();
    populateEstablishmentDays();

    // Clean single event listener binding
    form.removeEventListener("submit", submitRegistration);
    form.addEventListener("submit", submitRegistration);
}

function populateEstablishmentDays() {
    const daySelect = document.querySelector("[name='establishment_day']");
    if (daySelect && daySelect.options.length <= 1) {
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }
    }
}

/* ==========================================================
                    LOGO PREVIEW
========================================================== */

function initializeFirmLogoPreview() {
    const input = document.querySelector('input[name="firm_logo"]');
    const preview = document.getElementById("firmLogoPreview");

    if (!input || !preview) return;

    input.addEventListener("change", function () {
        const file = this.files[0];

        if (preview.src && preview.src.startsWith("blob:")) {
            URL.revokeObjectURL(preview.src);
        }

        if (!file) {
            preview.src = "";
            preview.style.display = "none";
            return;
        }

        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    });
}

/* ==========================================================
                    SUBMIT FORM
========================================================== */

async function submitRegistration(event) {
    event.preventDefault();

    // 1. Establishment Date Validation
    const day = document.querySelector("[name='establishment_day']")?.value;
    const month = document.querySelector("[name='establishment_month']")?.value;
    const year = document.querySelector("[name='establishment_year']")?.value;

    if (!day && !month && !year) {
        alert("Please select at least Day, Month, or Year for the Establishment Date.");
        return;
    }

    // The email and password are loaded from the approved profile and are
    // already included in the registration form. Do not verify them again
    // here; that caused a second profile-login request and blocked saving
    // when the account was active in another session.

    // 2. Submit Form
    const form = event.target;
    const formData = new FormData(form);
    const registerResult = await registerMedicalFirm(formData);

    if (registerResult && registerResult.success) {
        if (typeof showSuccessModal === "function") {
            showSuccessModal([
                "You have successfully registered.",
                "Within 72 hours of registration, your application will be scrutinized.",
                "After approval you will become the Super Admin of Health Hub.",
                "You can continue filling the remaining sections now or complete them later."
            ]);
        } else {
            alert("Registration successful! Your application will be processed within 72 hours.");
        }

        form.reset();
        await loadLoggedInUser();
    } else {
        alert(registerResult?.message || "Registration Failed.");
    }
}

function showPasswordError(input) {
    input.style.border = "2px solid #ef4444";
}

function removePasswordError(input) {
    input.style.border = "";
}

/* ==========================================================
           STD CODE & LANDLINE VALIDATION
========================================================== */

function initializeLandlineValidation() {
    const stdInput = document.getElementById("stdCode");
    const landlineInput = document.getElementById("landlineNumber");

    if (!stdInput || !landlineInput) return;

    function validateLandline() {
        stdInput.value = stdInput.value.replace(/\D/g, "");
        landlineInput.value = landlineInput.value.replace(/\D/g, "");

        let std = stdInput.value;
        if (std.startsWith("0")) {
            std = std.substring(1);
        }

        const stdLength = std.length;
        landlineInput.maxLength = stdLength === 3 ? 7 : 8;

        removeLandlineError();

        if (std.length && landlineInput.value.length) {
            const totalDigits = stdLength + landlineInput.value.length;
            if (totalDigits !== 10) {
                showLandlineError("STD Code + Landline must equal 10 digits.");
            }
        }
    }

    stdInput.addEventListener("input", validateLandline);
    landlineInput.addEventListener("input", validateLandline);
}

function showLandlineError(message) {
    removeLandlineError();
    const landlineInput = document.getElementById("landlineNumber");
    if (!landlineInput) return;

    landlineInput.style.border = "2px solid #ef4444";

    const error = document.createElement("small");
    error.className = "landline-error";
    error.style.color = "#ef4444";
    error.style.marginTop = "6px";
    error.style.display = "block";
    error.innerText = message;

    landlineInput.parentNode.appendChild(error);
}

function removeLandlineError() {
    const landlineInput = document.getElementById("landlineNumber");
    if (landlineInput) landlineInput.style.border = "";

    const error = document.querySelector(".landline-error");
    if (error) error.remove();
}

/* ==========================================================
                    LOCATION & HOSPITAL CODE
========================================================== */

function initializeHospitalCode() {
    const stateInput = document.querySelector('[name="state"]');
    const districtInput = document.querySelector('[name="district"]');
    const talukaInput = document.querySelector('[name="taluka"]');
    const villageInput = document.querySelector('[name="village"]');
    const pinCodeInput = document.querySelector('[name="pin_code"]');
    const hospitalCodeInput = document.getElementById("hospitalCode");
    const districtShortNameInput = document.querySelector('[name="district_short_name"]');

    if (!stateInput || !districtInput || !talukaInput || !villageInput || !hospitalCodeInput) {
        return;
    }

    let requestNumber = 0;

    function getSelectedShortName(select) {
        const selectedOption = select.options[select.selectedIndex];
        return selectedOption?.dataset.shortName || selectedOption?.value || "";
    }

    function getDistrictShortName() {
        const districtShortName = getSelectedShortName(districtInput);
        if (districtShortNameInput) {
            districtShortNameInput.value = districtShortName;
        }
        return districtShortName;
    }

    async function loadHospitalCode() {
        const state = stateInput.value;
        const district = districtInput.value;
        const taluka = talukaInput.value;
        const village = villageInput.value;
        const stateShortName = getSelectedShortName(stateInput);
        const districtShortName = getDistrictShortName();
        const talukaShortName = getSelectedShortName(talukaInput);
        const villageShortName = getSelectedShortName(villageInput);
        const currentRequestNumber = ++requestNumber;

        hospitalCodeInput.value = "";

        if (!state || !district || !taluka || !village || !stateShortName || !districtShortName) {
            return;
        }

        hospitalCodeInput.value = "Loading...";

        try {
            const firmShortNameInput = document.querySelector('[name="firm_short_name"]');
            const hospitalShortName = (firmShortNameInput?.value || "HP")
                .replace(/[^a-z0-9]/gi, "")
                .toUpperCase() || "HP";

            const result = await generateHospitalCode({
                state,
                state_short_name: stateShortName,
                district,
                district_short_name: districtShortName,
                taluka,
                taluka_short_name: talukaShortName,
                city: taluka,
                city_short_name: talukaShortName,
                village,
                village_short_name: villageShortName,
                hospital_short_name: hospitalShortName
            });

            if (currentRequestNumber !== requestNumber) return;

            if (result && result.success) {
                const generatedCode = String(
                    result.hospital_code || result.hospitalCode || result.code || ""
                );
                const sequence = (generatedCode.match(/(\d+)$/)?.[1] || "0")
                    .padStart(6, "0");
                const districtName = districtInput.options[districtInput.selectedIndex]
                    ?.textContent.trim() || district;
                const districtAbbreviation = districtName
                    .replace(/[^a-z]/gi, "")
                    .slice(0, 2)
                    .toUpperCase();

                hospitalCodeInput.value = [
                    hospitalShortName,
                    stateShortName,
                    districtShortName,
                    districtAbbreviation,
                    sequence
                ].join("");
            } else {
                hospitalCodeInput.value = "";
            }
        } catch (error) {
            hospitalCodeInput.value = "";
            console.error("Hospital Code Error:", error);
        }
    }

    [stateInput, districtInput, talukaInput, villageInput, pinCodeInput].forEach(input => {
        if (input) input.addEventListener("change", loadHospitalCode);
    });
}

function getLocationValue(item, keys) {
    for (const key of keys) {
        if (item && item[key] !== undefined && item[key] !== null) {
            return String(item[key]);
        }
    }
    return "";
}

function fillLocationSelect(select, rows, placeholder) {
    select.disabled = false;
    select.innerHTML = "";

    const firstOption = document.createElement("option");
    firstOption.value = "";
    firstOption.textContent = placeholder;
    select.appendChild(firstOption);

    (rows || []).forEach(item => {
        const option = document.createElement("option");
        const id = getLocationValue(item, ["id", "state_id", "district_id", "city_id", "village_id"]);
        const name = getLocationValue(item, ["name", "state_name", "district_name", "city_name", "village_name"]) || id;
        const shortName = getLocationValue(item, [
            "short_name",
            "state_short_name",
            "district_short_name",
            "city_short_name",
            "village_short_name",
            "village_shortname",
            "code"
        ]);

        option.value = name;
        option.textContent = name;
        option.dataset.id = id;
        option.dataset.shortName = shortName;
        select.appendChild(option);
    });
}

function resetLocationSelect(select, placeholder) {
    if (select.tagName === "INPUT") {
        resetPinCodeInput(select);
        return;
    }

    fillLocationSelect(select, [], placeholder);
    select.disabled = true;
}

const PREVIOUS_LOCATION_API =
    "https://smartjisolutions.smartbulkji.com/smartwebji/api";

const PINCODE_API =
    "https://smartbulkji.com/api/getallpincode.php";

async function fetchPreviousLocationRows(endpoint) {
    try {
        const response = await fetch(PREVIOUS_LOCATION_API + endpoint);
        const result = await response.json();
        if (Array.isArray(result)) return result;
        if (result && Array.isArray(result.data)) return result.data;
    } catch (error) {
        console.error("Previous address location API error:", error);
    }
    return [];
}

async function fetchPreviousPincodes(villageShortName) {
    if (!villageShortName) return [];

    try {
        const response = await fetch(
            PINCODE_API + "?village_short_name=" + encodeURIComponent(villageShortName)
        );
        const result = await response.json();
        if (Array.isArray(result)) return result;
        if (result && Array.isArray(result.data)) return result.data;
        return result ? [result] : [];
    } catch (error) {
        console.error("Previous address pincode API error:", error);
        return [];
    }
}

function getPincodeValue(item) {
    const keys = [
        "pin_code", "pincode", "postal_code", "zipcode", "zip_code",
        "pinCode", "PINCODE", "code", "name", "value", "id"
    ];

    for (const key of keys) {
        if (item && item[key] !== undefined && item[key] !== null) {
            const value = String(item[key]).replace(/\D/g, "");
            if (/^\d{6}$/.test(value)) return value;
        }
    }

    return "";
}

function fillPreviousPincodes(select, rows) {
    const values = [...new Set((rows || []).map(getPincodeValue).filter(Boolean))];
    select.disabled = false;
    select.innerHTML = "";

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = values.length ? "Select Pin Code" : "Pincode not found";
    select.appendChild(placeholder);

    values.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });

    if (values.length === 1) {
        select.value = values[0];
    }
}

function initializePreviousLocationFields() {
    const state = document.querySelector('[name="old_state"]');
    const district = document.querySelector('[name="old_district"]');
    const city = document.querySelector('[name="old_taluka"]');
    const village = document.querySelector('[name="old_village"]');
    const pinCode = document.querySelector('[name="old_pin_code"]');

    if (!state || !district || !city || !village) return;

    resetLocationSelect(district, "Select District");
    resetLocationSelect(city, "Select Taluka");
    resetLocationSelect(village, "Select Village");
    if (pinCode) resetLocationSelect(pinCode, "Select Pin Code");

    fetchPreviousLocationRows("/medico_state.php")
        .then(rows => fillLocationSelect(state, rows, "Select State"));

    state.addEventListener("change", async () => {
        resetLocationSelect(district, "Select District");
        resetLocationSelect(city, "Select Taluka");
        resetLocationSelect(village, "Select Village");
        if (pinCode) resetLocationSelect(pinCode, "Select Pin Code");
        if (state.value) {
            const id = state.options[state.selectedIndex].dataset.id;
            fillLocationSelect(district, await fetchPreviousLocationRows(
                "/medico_district.php?stateid=" + encodeURIComponent(id)
            ), "Select District");
        }
    });

    district.addEventListener("change", async () => {
        resetLocationSelect(city, "Select Taluka");
        resetLocationSelect(village, "Select Village");
        if (pinCode) resetLocationSelect(pinCode, "Select Pin Code");
        if (district.value) {
            const id = district.options[district.selectedIndex].dataset.id;
            fillLocationSelect(city, await fetchPreviousLocationRows(
                "/medico_city.php?districtid=" + encodeURIComponent(id)
            ), "Select Taluka");
        }
    });

    city.addEventListener("change", async () => {
        resetLocationSelect(village, "Select Village");
        if (pinCode) resetLocationSelect(pinCode, "Select Pin Code");
        if (city.value) {
            const id = city.options[city.selectedIndex].dataset.id;
            fillLocationSelect(village, await fetchPreviousLocationRows(
                "/medico_village.php?cityid=" + encodeURIComponent(id)
            ), "Select Village");
        }
    });

    village.addEventListener("change", async () => {
        if (!pinCode) return;

        resetLocationSelect(pinCode, "Select Pin Code");
        if (!village.value) return;

        const option = village.options[village.selectedIndex];
        const villageShortName = option.dataset.shortName || village.value;
        fillPreviousPincodes(
            pinCode,
            await fetchPreviousPincodes(villageShortName)
        );
    });
}

function resetPinCodeInput(input) {
    input.value = "";
    input.placeholder = "Select a village to auto-fill";
    input.disabled = false;
}

function fillPinCodeInput(input, rows) {
    const pinCodes = [...new Set((rows || [])
        .map(item => getLocationValue(item, [
            "pin_code", "pincode", "postal_code", "zipcode", "zip_code",
            "pinCode", "PINCODE", "code", "name", "value", "id"
        ]))
        .map(pinCode => pinCode.trim().replace(/\D/g, ""))
        .filter(pinCode => /^\d{6}$/.test(pinCode))
        .filter(Boolean))];

    if (pinCodes.length) {
        input.value = pinCodes[0];
        input.placeholder = "Enter 6-digit pincode";
    } else {
        input.value = "";
        input.placeholder = "Enter 6-digit pincode";
    }

    // The user may overwrite an auto-filled value when required.
    input.disabled = false;
}

function initializeLocationFields() {
    const state = document.querySelector('[name="state"]');
    const district = document.querySelector('[name="district"]');
    const taluka = document.querySelector('[name="taluka"]');
    const village = document.querySelector('[name="village"]');
    const pinCode = document.querySelector('[name="pin_code"]');

    if (!state || !district || !taluka || !village || !pinCode) return;

    resetLocationSelect(district, "Select District");
    resetLocationSelect(taluka, "Select Taluka");
    resetLocationSelect(village, "Select Village");
    resetLocationSelect(pinCode, "Select Pin Code");

    getStates()
        .then(rows => {
            fillLocationSelect(state, rows, "Select State");
            state.disabled = false;
        })
        .catch(error => console.error("State API Error:", error));

    state.addEventListener("change", async function () {
        resetLocationSelect(district, "Select District");
        resetLocationSelect(taluka, "Select Taluka");
        resetLocationSelect(village, "Select Village");
        resetLocationSelect(pinCode, "Select Pin Code");

        if (!state.value) return;

        try {
            const selectedId = state.options[state.selectedIndex].dataset.id;
            fillLocationSelect(district, await getDistricts(selectedId), "Select District");
        } catch (error) {
            console.error("District API Error:", error);
        }
    });

    district.addEventListener("change", async function () {
        resetLocationSelect(taluka, "Select Taluka");
        resetLocationSelect(village, "Select Village");
        resetLocationSelect(pinCode, "Select Pin Code");

        if (!district.value) return;

        try {
            const selectedId = district.options[district.selectedIndex].dataset.id;
            fillLocationSelect(taluka, await getCities(selectedId), "Select Taluka");
        } catch (error) {
            console.error("Taluka API Error:", error);
        }
    });

    taluka.addEventListener("change", async function () {
        resetLocationSelect(village, "Select Village");
        resetLocationSelect(pinCode, "Select Pin Code");

        if (!taluka.value) return;

        try {
            const selectedId = taluka.options[taluka.selectedIndex].dataset.id;
            fillLocationSelect(village, await getVillages(selectedId), "Select Village");
        } catch (error) {
            console.error("Village API Error:", error);
        }
    });

    village.addEventListener("change", async function () {
        resetLocationSelect(pinCode, "Select Pin Code");

        if (!village.value) return;

        try {
            const selectedVillage = village.options[village.selectedIndex];
            const villageShortName = selectedVillage.dataset.shortName || selectedVillage.value;
            fillPinCodeInput(pinCode, await getPincodes(villageShortName));
            pinCode.dispatchEvent(new Event("change"));
        } catch (error) {
            console.error("Pincode API Error:", error);
        }
    });
}
