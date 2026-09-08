<!-- ==========================================================
                    HOSPITAL GALLERY
========================================================== -->

<div class="section-card">

    <div class="section-header">

        <h2>

            Hospital Gallery

        </h2>

            <p>

                Upload hospital photographs, assign labels, and choose which
                images should be displayed in the User Module.

            </p>

    </div>

    <!-- ======================================================
                    UPLOAD AREA
    ====================================================== -->

    <div class="photo-upload-box">

        <input
            type="file"
            id="hospitalPhotos"
            accept="image/*"
            multiple
            hidden>

        <button
            class="primary-btn"
            id="uploadPhotoBtn">

            <i class="fa-solid fa-cloud-arrow-up"></i>

            Upload Hospital Photos

        </button>

        <p>

            JPG, JPEG, PNG

            <br>

            Multiple images supported

        </p>

    </div>

    <!-- ======================================================
                    IMAGE GALLERY
    ====================================================== -->

    <div
        id="photoGallery"
        class="photo-gallery">

    </div>





    <!-- ======================================================
                    ACTION BUTTONS
    ====================================================== -->

    <div class="button-row">

        <button
            type="button"
            class="secondary-btn photo-reset">

            Reset

        </button>

        <button
            type="button"
            class="primary-btn save-hospital-photos">

            <i class="fa-solid fa-floppy-disk"></i>

            Save Selected Photos

        </button>

    </div>

</div>


<!-- ==========================================================
                    IMAGE LABEL MODAL
========================================================== -->

<div
    id="photoLabelModal"
    class="modal">

    <div class="modal-content small-modal">

        <!-- Modal Header -->

        <div class="modal-header">

            <h2>

                Image Label

            </h2>

        </div>

        <!-- Modal Body -->

        <div class="modal-body">

            <img
                id="labelPreviewImage"
                class="label-preview-image"
                src=""
                alt="Preview">

            <label>

                Enter Image Label

            </label>

            <input
                type="text"
                id="photoLabelInput"
                placeholder="Example : ICU, Reception, Emergency">

            <small>

                Label is optional. It will be displayed below the image
                in the User Module.

            </small>

        </div>

        <!-- Modal Footer -->

        <div class="modal-footer">

            <button
                type="button"
                id="noLabelBtn"
                class="secondary-btn">

                No Label

            </button>

            <button
                type="button"
                id="saveLabelBtn"
                class="primary-btn">

                Save Label

            </button>

        </div>

    </div>

</div>


<!-- ==========================================================
BACKEND DEVELOPER NOTES

Database Table

hospital_gallery

--------------------------------------------------------

id

hospital_id

image_path

image_label

display_order

status

created_at

updated_at

--------------------------------------------------------

POST API

/api/hospital/photos

multipart/form-data

photos[]

labels[]

--------------------------------------------------------

GET API

/api/hospital/photos?hospital_id=1

--------------------------------------------------------

Expected Response

[
    {
        "id":1,
        "image_path":"uploads/hospital/front.jpg",
        "image_label":"Reception"
    },
    {
        "id":2,
        "image_path":"uploads/hospital/opd.jpg",
        "image_label":"OPD"
    }
]

--------------------------------------------------------

If image_label is NULL or empty,
Frontend will display only the image.

========================================================== -->