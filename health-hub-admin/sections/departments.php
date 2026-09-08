<div class="section-card">

    <div class="section-header">

        <h2>
            Departments
        </h2>

        <p>
            Select the departments available in your hospital.
            These departments are managed by Project Admin.
        </p>

    </div>


    <!-- ================================
            SEARCH + COUNT
    ================================= -->

    <div class="department-toolbar">

        <input 
            type="text"
            id="departmentSearch"
            placeholder="Search Department...">


        <div class="selected-count">

            Selected:
            
            <span id="selectedDepartmentCount">
                0
            </span>

        </div>

    </div>


    <!-- Department Cards -->

    <div 
        class="department-grid"
        id="departmentContainer">

    </div>


    <div class="button-row">

        <button 
            class="secondary-btn department-reset">

            Reset

        </button>


        <button 
            class="primary-btn department-save">

            Submit

        </button>

    </div>
    <!-- ==========================================================
        DEPARTMENT DESCRIPTION MODAL
========================================================== -->

<div
    id="departmentDescriptionModal"
    class="modal">

    <div class="department-description-modal">

        <!-- Header -->

        <div class="department-modal-header">

            <div>

                <h2>

                    Department Description

                </h2>

                <p id="departmentModalName">

                    Cardiology

                </p>

            </div>

        </div>

        <!-- Body -->

        <div class="department-modal-body">

            <label>

                Description

            </label>

            <textarea

                id="departmentDescriptionInput"

                maxlength="500"

                placeholder="Example:

• Experienced Specialists

• 24×7 Emergency Services

• Modern Equipment

• Cashless Insurance Available">

            </textarea>

            <div class="department-character-count">

                <span id="departmentDescriptionCount">

                    0

                </span>

                / 500 Characters

            </div>

        </div>

        <!-- Footer -->

        <div class="department-modal-footer">

            <button

                type="button"

                id="cancelDepartmentDescription"

                class="secondary-btn">

                Cancel

            </button>

            <button

                type="button"

                id="saveDepartmentDescription"

                class="primary-btn">

                Save Description

            </button>

        </div>

    </div>

</div>


</div>