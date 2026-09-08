<div class="section-card">

    <!-- ==========================================
                    HEADER
    ========================================== -->

    <div class="section-header">

        <h2>

            Emergency Contacts

        </h2>

        <p>

            Add emergency contact numbers that will be displayed to users during emergency situations.

        </p>

    </div>

    <!-- ==========================================
                    POPUP
    ========================================== -->

    <div
        class="emergency-popup-overlay"
        id="emergencyPopup">

        <div class="emergency-popup">

            <div class="popup-icon">

                <i class="fa-solid fa-triangle-exclamation"></i>

            </div>

            <h3>

                Emergency Information

            </h3>

            <p>

                Please fill the Emergency section carefully.

                These emergency contact numbers will be displayed to users whenever required.

            </p>

            <button
                id="popupOkBtn"
                class="primary-btn">

                OK

            </button>

        </div>

    </div>

    <!-- ==========================================
                    FORM
    ========================================== -->

    <form
        id="emergencyForm"
        style="display:none;">

        <div class="emergency-table">

            <!-- Ambulance -->

            <div class="emergency-row">

                <label>

                    Ambulance

                </label>

                <input
                    type="text"
                    id="ambulance"
                    placeholder="108">

            </div>

            <!-- Hospital Emergency -->

            <div class="emergency-row">

                <label>

                    Hospital Emergency Desk

                </label>

                <input
                    type="text"
                    id="hospitalEmergencyDesk"
                    placeholder="Emergency Number">

            </div>

            <!-- Reception -->

            <div class="emergency-row">

                <label>

                    Reception

                </label>

                <input
                    type="text"
                    id="reception"
                    placeholder="Reception Number">

            </div>

            <!-- Blood Bank -->

            <div class="emergency-row">

                <label>

                    Blood Bank

                </label>

                <input
                    type="text"
                    id="bloodBank"
                    placeholder="Blood Bank Number">

            </div>

            <!-- ICU -->

            <div class="emergency-row">

                <label>

                    ICU

                </label>

                <input
                    type="text"
                    id="icu"
                    placeholder="ICU Number">

            </div>

            <!-- Pharmacy -->

            <div class="emergency-row">

                <label>

                    Pharmacy

                </label>

                <input
                    type="text"
                    id="pharmacy"
                    placeholder="Pharmacy Number">

            </div>

            <!-- Police -->

            <div class="emergency-row">

                <label>

                    Police

                </label>

                <input
                    type="text"
                    id="police"
                    placeholder="100">

            </div>

            <!-- Fire Brigade -->

            <div class="emergency-row">

                <label>

                    Fire Brigade

                </label>

                <input
                    type="text"
                    id="fireBrigade"
                    placeholder="101">

            </div>

            <!-- Women -->

            <div class="emergency-row">

                <label>

                    Women Helpline

                </label>

                <input
                    type="text"
                    id="womenHelpline"
                    placeholder="1091">

            </div>

            <!-- Child -->

            <div class="emergency-row">

                <label>

                    Child Helpline

                </label>

                <input
                    type="text"
                    id="childHelpline"
                    placeholder="1098">

            </div>

            <!-- Disaster -->

            <div class="emergency-row">

                <label>

                    Disaster Management

                </label>

                <input
                    type="text"
                    id="disasterManagement"
                    placeholder="1078">

            </div>

        </div>

        <div class="button-row">

            <button
                type="submit"
                class="primary-btn">

                <i class="fa-solid fa-floppy-disk"></i>

                Save Emergency Contacts

            </button>

        </div>

    </form>

</div>