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
            class="primary-btn">

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

        <div class="modal-header">

            <h2 id="modalHeading">

                Add Hospital Award

            </h2>

            <button
                id="closeAwardModal"
                type="button">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>

        <form id="awardForm">

            <input
                type="hidden"
                id="editingIndex">

            <div class="form-grid">

                <div class="input-group">

                    <label>

                        Award Title

                        <span class="required">*</span>

                    </label>

                    <input
                        type="text"
                        id="awardTitle"
                        maxlength="60"
                        required>

                </div>

                <div class="input-group">

                    <label>

                        Awarded By

                        <span class="required">*</span>

                    </label>

                    <input
                        type="text"
                        id="awardBy"
                        maxlength="60"
                        required>

                </div>

                <div class="input-group">

                    <label>

                        Award Date

                    </label>

                    <input
                        type="date"
                        id="awardDate">

                </div>

                <div class="input-group">

                    <label>

                        Certificate Image

                        <span class="required">*</span>

                    </label>

                    <input
                        type="file"
                        id="awardImage"
                        accept=".jpg,.jpeg,.png,.webp">

                </div>

            </div>

            <!-- Preview -->

            <div
                class="award-preview"
                id="previewWrapper">

                <img
                    id="previewImage">

            </div>

            <!-- Description -->

            <div class="input-group">

                <label>

                    Description

                </label>

                <textarea

                    id="awardDescription"

                    rows="4"

                    maxlength="100"

                    placeholder="Maximum 100 characters...">

                </textarea>

                <div class="character-counter">

                    <span id="charCount">

                        0

                    </span>

                    /100

                </div>

            </div>

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
                class="secondary-btn"
                id="cancelDeleteAward">

                Cancel

            </button>

            <button
                class="danger-btn"
                id="confirmDeleteAward">

                Delete

            </button>

        </div>

    </div>

</div>