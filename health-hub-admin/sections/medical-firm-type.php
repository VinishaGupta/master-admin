<div class="section-card">

    <!-- ==========================================================
                        PAGE HEADER
    ========================================================== -->

    <div class="section-header">

        <h2>

            Medical Firm Type

        </h2>

        <p>

            Select a Medical Firm Category and configure all applicable Medical Firm Types.

        </p>

    </div>

    <!-- ==========================================================
                        CATEGORY PAGE
    ========================================================== -->

    <div id="medicalFirmMain">

        <!-- Categories generated dynamically -->

    </div>

    <!-- ==========================================================
                        TYPE PAGE
    ========================================================== -->

    <div
        id="medicalFirmDetails"
        style="display:none;">

        <div class="medical-top-bar">

            <button
                type="button"
                class="secondary-btn"
                id="firmBack">

                <i class="fa-solid fa-arrow-left"></i>

                Back

            </button>

            <div>

                <h2 id="firmTitle">

                </h2>

                <p>

                    Select one or more Medical Firm Types available in your organization.

                </p>

            </div>

        </div>

        <!-- Search -->

        <div class="medical-search">

            <i class="fa-solid fa-magnifying-glass"></i>

            <input
                type="text"
                id="medicalSearch"
                placeholder="Search Medical Firm Type">

        </div>

        <!-- Selected Count -->

        <div class="selected-info">

            Selected :

            <span id="medicalSelectedCount">

                0

            </span>

        </div>

        <!-- Dynamic Cards -->

        <div
            class="medical-type-grid"
            id="firmSubtypeList">

        </div>

        <div class="button-row">

            <button
                type="button"
                class="secondary-btn"
                id="medicalResetButton">

                Reset

            </button>

            <button
                type="button"
                class="primary-btn"
                id="firmSave">

                <i class="fa-solid fa-floppy-disk"></i>

                Save

            </button>

        </div>

    </div>

</div>