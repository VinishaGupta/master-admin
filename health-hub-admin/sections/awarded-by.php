<div class="section-card">

    <div class="section-header">

        <div>

            <h2>

                <i class="fa-solid fa-award"></i>

                Hospital Awards & Recognition

            </h2>

            <p>

                Showcase the awards, recognitions, accreditations and certificates
                received by your medical firm.

            </p>

        </div>


        <button
            id="addAwardBtn"
            class="primary-btn"
            type="button">

            <i class="fa-solid fa-plus"></i>

            Add Award

        </button>

    </div>

</div>


<!-- ==========================================================
                    AWARDS GRID
========================================================== -->

<div
    id="awardGrid"
    class="award-grid">

    <div class="empty-awards">

        <i class="fa-solid fa-award"></i>

        <h3>

            No Awards Added

        </h3>

        <p>

            Click <strong>Add Award</strong> to showcase your hospital achievements.

        </p>

    </div>

</div>


<!-- ==========================================================
                    ADD / EDIT MODAL
========================================================== -->

<div
    class="award-modal"
    id="awardModal">

    <div class="award-modal-content">


        <!-- ==================================================
                            MODAL HEADER
        ================================================== -->

        <div class="modal-header">

            <div>

                <h2 id="modalHeading">

                    Add Hospital Award

                </h2>

                <p class="modal-subtitle">

                    Add details about your hospital award or recognition.

                </p>

            </div>


            <button
                id="closeAwardModal"
                type="button"
                aria-label="Close">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>


        <!-- ==================================================
                            FORM
        ================================================== -->

        <form id="awardForm">


            <input
                type="hidden"
                id="editingIndex">


            <!-- ==================================================
                                FORM GRID
            ================================================== -->

            <div class="form-grid">


                <!-- AWARD TITLE -->

                <div class="input-group">

                    <label for="awardTitle">

                        Award Title

                        <span class="required">*</span>

                    </label>

                    <input
                        type="text"
                        id="awardTitle"
                        maxlength="60"
                        placeholder="Enter award title"
                        required>

                </div>


                <!-- AWARDED BY -->

                <div class="input-group">

                    <label for="awardBy">

                        Awarded By

                        <span class="required">*</span>

                    </label>

                    <input
                        type="text"
                        id="awardBy"
                        maxlength="60"
                        placeholder="Enter awarding organization"
                        required>

                </div>


                <!-- AWARD DATE -->

                <div class="input-group">

                    <label for="awardDate">

                        Award Date

                    </label>

                    <input
                        type="date"
                        id="awardDate">

                </div>


                <!-- CERTIFICATE IMAGE -->

                <div class="input-group">

                    <label for="awardImage">

                        Certificate Image

                        <span class="optional">
                            Optional
                        </span>

                    </label>

                    <input
                        type="file"
                        id="awardImage"
                        accept=".jpg,.jpeg,.png,.webp">

                    <small class="input-help">

                        JPG, PNG or WEBP • Maximum 5 MB

                    </small>

                </div>

            </div>


            <!-- ==================================================
                            IMAGE PREVIEW
            ================================================== -->

            <div
                class="award-preview"
                id="previewWrapper">

                <div
                    class="preview-placeholder"
                    id="previewPlaceholder">

                    <i class="fa-regular fa-image"></i>

                    <span>
                        No certificate image selected
                    </span>

                </div>


                <img
                    id="previewImage"
                    alt="Certificate preview">

            </div>


            <!-- ==================================================
                            DESCRIPTION
            ================================================== -->

            <div class="input-group description-group">

                <label for="awardDescription">

                    Description

                </label>

                <textarea
                    id="awardDescription"
                    rows="4"
                    maxlength="100"
                    placeholder="Enter a short description..."></textarea>


                <div class="character-counter">

                    <span id="charCount">

                        0

                    </span>

                    /100

                </div>

            </div>


            <!-- ==================================================
                            BUTTONS
            ================================================== -->

            <div class="button-row">

                <button
                    type="button"
                    class="secondary-btn"
                    id="cancelAwardBtn">

                    Cancel

                </button>


                <button
                    type="submit"
                    class="primary-btn">

                    <i class="fa-solid fa-floppy-disk"></i>

                    Save Award

                </button>

            </div>

        </form>

    </div>

</div>


<!-- ==========================================================
                    DELETE MODAL
========================================================== -->

<div
    class="delete-modal"
    id="deleteAwardModal">

    <div class="delete-box">


        <div class="delete-icon">

            <i class="fa-solid fa-trash-can"></i>

        </div>


        <h3>

            Delete Award?

        </h3>


        <p>

            This action cannot be undone.

        </p>


        <div class="button-row">

            <button
                type="button"
                class="secondary-btn"
                id="cancelDeleteAward">

                Cancel

            </button>


            <button
                type="button"
                class="danger-btn"
                id="confirmDeleteAward">

                <i class="fa-solid fa-trash"></i>

                Delete

            </button>

        </div>

    </div>

</div>