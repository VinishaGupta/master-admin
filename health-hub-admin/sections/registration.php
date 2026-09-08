<div class="section-card">

    <div class="section-header">

        <h2>

            Medical Firm Registration

        </h2>

        <p>

            Register your medical firm to become part of the Health Hub platform.

        </p>

    </div>
        <form
            id="registrationForm"
            enctype="multipart/form-data">

            <!-- ==========================================
                        LOGIN DETAILS
            =========================================== -->

            <div class="form-block">

                <h3>

                    <i class="fa-solid fa-user-lock"></i>

                    Login Details

                </h3>

                <div class="form-grid">

                    <div class="input-group">

                        <label>

                            Email Address *

                        </label>

                        <input
                            type="email"
                            id="loginEmail"
                            name="email"
                            readonly>

                    </div>

                    <div class="input-group">

                        <label>

                            Password <span class="required">*</span>

                        </label>

                        <input
                            type="password"
                            id="confirmPassword"
                            name="password"
                            autocomplete="current-password"
                            required>

                    </div>

                </div>

            </div>

            <!-- ==========================================
                    MEDICAL FIRM DETAILS
            =========================================== -->

            <div class="form-block">

                <h3>

                    <i class="fa-solid fa-hospital"></i>

                    Medical Firm Details

                </h3>

                <div class="form-grid">

                    <div class="input-group">

                        <label>

                            Registered Medical Firm Name
                            <span class="required">*</span>

                        </label>

                        <input
                            type="text"
                            name="firm_name"
                            placeholder="Medical Firm Name"
                            required>

                    </div>

                    <div class="input-group">

                        <label>

                            Medical Firm Short Name (If Any)

                        </label>

                        <input
                            type="text"
                            name="firm_short_name"
                            placeholder="e.g. ABC Hospital">

                    </div>

                    <div class="input-group">

                        <label>

                            Managed By (If Any)

                        </label>

                        <input
                            type="text"
                            name="managed_by"
                            placeholder="e.g. India Youth Old Welfare Society, New Delhi">

                    </div>

                    <div class="input-group">

                        <label>

                            Registration Number
                            <span class="required">*</span>

                        </label>

                        <input
                            type="text"
                            name="registration_number"
                            placeholder="Registration Number"
                            required>

                    </div>

                    <div class="input-group">

                        <label>

                            Medical Firm Logo (If Any)

                        </label>

                        <input
                            type="file"
                            id="firmLogo"
                            name="firm_logo"
                            accept=".jpg,.jpeg,.png,.webp">

                    </div>

                    <div class="input-group full">

                        <label>

                            Establishment Date
                            <span class="required">*</span>

                        </label>

                        <div style="display:flex; gap:10px;">

                            <select name="establishment_day">

                                <option value="">Day</option>

                            </select>

                            <select name="establishment_month">

                                <option value="">Month</option>

                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>

                            </select>

                            <input
                                type="number"
                                name="establishment_year"
                                placeholder="Year"
                                min="1800"
                                max="2100">

                        </div>

                    </div>

                    <div class="input-group full">

                        <label>

                            Registration Certificate

                        </label>

                        <input
                            type="file"
                            name="registration_certificate"
                            accept=".pdf,.jpg,.jpeg,.png">

                    </div>

                </div>

            </div>
            <!-- ==========================================
                        WEBSITE & LOCATION
                ========================================== -->

                <div class="form-block">

                    <h3>

                        <i class="fa-solid fa-globe"></i>

                        Website & Location

                    </h3>

                    <p>

                        Provide your hospital's website and Google Map location.

                    </p>

                    <div class="form-grid">

                        <div class="input-group">

                            <label>

                                Website Link (If Any)

                            </label>

                            <input
                                type="url"
                                name="website_link"
                                placeholder="https://www.example.com">

                        </div>

                        <div class="input-group">

                            <label>

                                Google Map Link
                                <span class="required">*</span>

                            </label>

                            <input
                                type="url"
                                name="google_map_link"
                                placeholder="https://maps.google.com/..."
                                required>

                        </div>

                    </div>

                </div>

                <!-- ==========================================
                        CONTACT DETAILS
                ========================================== -->

                <div class="form-block">

                    <h3>

                        <i class="fa-solid fa-phone"></i>

                        Medical Firm Contact Details

                    </h3>

                    <div class="form-grid">

                        <div class="input-group">

                            <label>

                                Medical Firm STD Code

                            </label>

                            <input
                                type="text"
                                id="stdCode"
                                name="std_code"
                                placeholder="022">

                        </div>

                        <div class="input-group">

                            <label>

                                Medical Firm Landline Number

                            </label>

                            <input
                                type="text"
                                id="landlineNumber"
                                name="landline_number"
                                placeholder="Landline Number">

                        </div>

                        <div class="input-group">

                            <label>

                                Medical Firm Email

                            </label>

                            <input
                                type="email"
                                name="medical_firm_email"
                                placeholder="hospital@example.com">

                        </div>

                        <div class="input-group">

                            <label>

                                Medical Firm Mobile Number
                                <span class="required">*</span>

                            </label>

                            <input
                                type="tel"
                                name="mobile_number"
                                maxlength="10"
                                pattern="[0-9]{10}"
                                placeholder="9876543210"
                                required>

                        </div>

                    </div>

                </div>

       <!-- ==========================================
                    MEDICAL FIRM ADDRESS
            ========================================== -->

            <div class="form-block">

                <h3>

                    <i class="fa-solid fa-location-dot"></i>

                    Medical Firm Address

                </h3>
                <p>
                    (If your hospital is shited to new address then, fill new address here and previous address in previous address section.)
                </p>


                <div class="form-grid">

                    <!-- STATE -->

                    <div class="input-group">

                        <label>

                            State <span class="required">*</span>

                        </label>

                        <select
                            name="state"
                            required>

                            <option>

                                Select State

                            </option>

                        </select>

                    </div>

                    <!-- DISTRICT -->

                    <div class="input-group">

                        <label>

                            District <span class="required">*</span>

                        </label>

                        <select
                            name="district"
                            required>

                            <option>

                                Select District

                            </option>

                        </select>

                    </div>

                    <!-- TALUKA -->

                    <div class="input-group">

                        <label>

                            Taluka <span class="required">*</span>

                        </label>

                        <select
                            name="taluka"
                            required>

                            <option>

                                Select Taluka

                            </option>

                        </select>

                    </div>

                    <!-- VILLAGE -->

                    <div class="input-group">

                        <label>

                            Village / City
                            <span class="required">*</span>

                        </label>

                        <select
                            name="village"
                            required>

                            <option>

                                Select Village

                            </option>

                        </select>

                    </div>

                    <!-- PINCODE -->

                    <div class="input-group">

                        <label>

                            Pin Code
                            <span class="required">*</span>

                        </label>

                        <select
                            name="pin_code"
                            id="pinCode"
                            required>

                            <!--
                            Backend:
                            Populate pin codes according to
                            selected State → District → Taluka → Village
                            -->

                            <option value="">

                                Select Pin Code

                            </option>

                        </select>

                    </div>

                    <!-- PLOT -->

                    <div class="input-group">

                        <label>

                            Plot No / Flat No

                        </label>

                        <input
                            type="text"
                            name="plot_number"
                            placeholder="Plot No. 42">

                    </div>

                    <!-- BUILDING -->

                    <div class="input-group">

                        <label>

                            Building / Apartment Name

                        </label>

                        <input
                            type="text"
                            name="building_name"
                            placeholder="Sunrise Heights">

                    </div>

                    <!-- COLONY -->

                    <div class="input-group">

                        <label>

                            Colony

                        </label>

                        <input
                            type="text"
                            name="colony"
                            placeholder="Green Valley">

                    </div>

                    <!-- AREA -->

                    <div class="input-group">

                        <label>

                            Area

                        </label>

                        <input
                            type="text"
                            name="area"
                            placeholder="Airport Road">

                    </div>

                    <!-- LANDMARK -->

                    <div class="input-group">

                        <label>

                            Nearby Landmark

                        </label>

                        <input
                            type="text"
                            name="landmark"
                            placeholder="Nearby School">

                    </div>

                    <!-- BEHIND -->

                    <div class="input-group">

                        <label>

                            Behind

                        </label>

                        <input
                            type="text"
                            name="behind"
                            placeholder="Behind Bank">

                    </div>

                </div>

            </div>
        <!-- ==========================================
                    PREVIOUS MEDICAL FIRM ADDRESS
            ========================================== -->

            <div class="form-block">

                <h3>

                    <i class="fa-solid fa-clock-rotate-left"></i>

                    Previous Medical Firm Address (If Any)

                </h3>

                <p>

                    Fill this section only if your medical firm has been shifted from a previous location.

                </p>

                <div class="form-grid">

                    <!-- STATE -->

                    <div class="input-group">

                        <label>

                            State

                        </label>

                        <select name="old_state">

                            <option>

                                Select State

                            </option>

                        </select>

                    </div>

                    <!-- DISTRICT -->

                    <div class="input-group">

                        <label>

                            District

                        </label>

                        <select name="old_district">

                            <option>

                                Select District

                            </option>

                        </select>

                    </div>

                    <!-- TALUKA -->

                    <div class="input-group">

                        <label>

                            Taluka

                        </label>

                        <select name="old_taluka">

                            <option>

                                Select Taluka

                            </option>

                        </select>

                    </div>

                    <!-- VILLAGE -->

                    <div class="input-group">

                        <label>

                            Village / City

                        </label>

                        <select name="old_village">

                            <option>

                                Select Village

                            </option>

                        </select>

                    </div>

                    <!-- PIN CODE -->

                    <div class="input-group">

                        <label>

                            Pin Code

                        </label>

                        <select
                            name="old_pin_code"
                            id="oldPinCode">

                            <!--
                            Backend:
                            Populate previous address pin codes
                            based on selected
                            State → District → Taluka → Village.
                            -->

                            <option value="">

                                Select Pin Code

                            </option>

                        </select>

                    </div>

                    <!-- PLOT -->

                    <div class="input-group">

                        <label>

                            Plot No / Flat No

                        </label>

                        <input
                            type="text"
                            name="old_plot_number"
                            placeholder="Plot No. 42">

                    </div>

                    <!-- BUILDING -->

                    <div class="input-group">

                        <label>

                            Building / Apartment Name

                        </label>

                        <input
                            type="text"
                            name="old_building_name"
                            placeholder="Sunrise Heights">

                    </div>

                    <!-- COLONY -->

                    <div class="input-group">

                        <label>

                            Colony

                        </label>

                        <input
                            type="text"
                            name="old_colony"
                            placeholder="Green Valley">

                    </div>

                    <!-- AREA -->

                    <div class="input-group">

                        <label>

                            Area

                        </label>

                        <input
                            type="text"
                            name="old_area"
                            placeholder="Airport Road">

                    </div>

                    <!-- LANDMARK -->

                    <div class="input-group">

                        <label>

                            Nearby Landmark

                        </label>

                        <input
                            type="text"
                            name="old_landmark"
                            placeholder="Nearby School">

                    </div>

                    <!-- BEHIND -->

                    <div class="input-group">

                        <label>

                            Behind

                        </label>

                        <input
                            type="text"
                            name="old_behind"
                            placeholder="Behind Bank">

                    </div>

                </div>

            </div>

    



            <!-- ==========================================
                        HOSPITAL LAYOUT MAP
            ========================================== -->

            <div class="form-block">

                <h3>

                    <i class="fa-solid fa-map"></i>

                    Hospital Layout Map

                </h3>

                <p class="layout-description">

                    Upload the hospital layout map (JPG or PNG) that helps patients
                    understand the location of different buildings, entrances,
                    parking areas and departments.

                </p>

                <div class="layout-map-wrapper">

                    <!-- LEFT -->

                    <div class="layout-upload-card">

                        <h4>

                            Upload Layout Map

                        </h4>

                        <p>

                            Upload a JPG or PNG image of your hospital layout.

                        </p>

                        <input
                            type="file"
                            name="layout_map"
                            accept=".jpg,.jpeg,.png">

                    </div>

                    <!-- RIGHT -->

                    <div class="layout-example-card">

                        <h4>

                            Example Layout Map

                        </h4>

                        <img
                            src="../assets/images/layout-map-example.png"
                            alt="Hospital Layout Map Example"
                            class="layout-map-image">

                        <p>

                            This image is only for reference.
                            Upload a layout map similar to this.

                        </p>

                    </div>

                </div>

            </div>

        <!-- ==========================================
                    BUTTONS
        =========================================== -->

        <div class="button-row">

            <button
                type="reset"
                class="secondary-btn">

                Reset

            </button>

            <button
                type="submit"
                class="primary-btn">

                <i class="fa-solid fa-hospital"></i>

                Submit

            </button>

        </div>

    </form>

</div>