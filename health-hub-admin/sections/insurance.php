<div
    class="section-card"
    id="insuranceSelectionPage">

    <div class="section-header">

        <h2>

            Health Insurance Company

        </h2>

        <p>

            Select the health insurance companies accepted by your medical firm.

        </p>

    </div>
    <div class="insurance-top-actions">

            <button
                type="button"
                id="viewInsuranceCompanies"
                class="secondary-btn">

            <i class="fa-solid fa-building"></i>

            View Insurance Companies

        </button>

    </div>

    <!-- ==========================================
                    SEARCH
    =========================================== -->

    <div class="insurance-search">

        <i class="fa-solid fa-magnifying-glass"></i>

        <input
            type="text"
            id="insuranceSearch"
            placeholder="Search Insurance Company">

    </div>

    <!-- ==========================================
                    SELECTED COUNT
    =========================================== -->

    <div class="selected-info">

        Selected :

        <span id="insuranceSelectedCount">

            0

        </span>

    </div>

    <!-- ==========================================
                    INSURANCE LIST
    =========================================== -->

    <div
        class="insurance-list"
        id="insuranceList">

    </div>

    <!-- ==========================================
                    BUTTONS
    =========================================== -->

    <div class="button-row">

        <button
            type="button"
            class="secondary-btn insurance-reset">

            Reset

        </button>

        <button
            type="button"
            class="primary-btn insurance-save">

            <i class="fa-solid fa-floppy-disk"></i>

            Save & Continue

        </button>

    </div>

</div>
<!-- ==========================================================
        INSURANCE COMPANY DIRECTORY
========================================================== -->

<div
    class="section-card"
    id="insuranceDirectory"
    style="display:none;">

    <div class="section-header">

        <h2>

            Insurance Company Directory

        </h2>

        <p>

            View all insurance companies registered by Project Admin.

            Click the Website button to visit the official website.

        </p>

    </div>

    <!-- ==========================================
                BACK BUTTON
    =========================================== -->

    <div class="insurance-back-row">

        <button
            type="button"
            id="backToInsurance"
            class="secondary-btn">

            <i class="fa-solid fa-arrow-left"></i>

            Back

        </button>

    </div>

    <!-- ==========================================
                TABLE
    =========================================== -->

    <div class="table-responsive">

        <table class="insurance-company-table">

            <thead>

                <tr>

                    <th>

                        Sr. No.

                    </th>

                    <th>

                        Company Name

                    </th>

                    <th>

                        Website

                    </th>

                </tr>

            </thead>

            <tbody
                id="insuranceCompanyTableBody">

                <!-- Backend Data -->

            </tbody>

        </table>

    </div>

</div>