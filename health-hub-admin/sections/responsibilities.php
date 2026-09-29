<div class="section-card">

    <!-- ==========================================================
                         SECTION HEADER
    =========================================================== -->

    <div class="section-header">

        <h2>
            Patient's Responsibilities
        </h2>

        <p>
            Create patient's responsibilities in multiple languages.
            These responsibilities will be displayed directly in the User Module.
        </p>

    </div>


    <!-- ==========================================================
                         RESPONSIBILITY FORM
    =========================================================== -->

    <form id="responsibilityForm">


        <!-- =======================================================
                              ENGLISH
        ======================================================== -->

        <div class="responsibility-language-card">

            <div class="language-header">

                <div>

                    <h3>
                        🇬🇧 English
                    </h3>

                    <p>
                        Add hospital responsibilities in English.
                    </p>

                </div>


                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addResponsibilitySection('responsibilityEnglish','en')">

                    <i class="fa-solid fa-plus"></i>

                    Add Heading

                </button>

            </div>


            <!-- ENGLISH EDITOR -->

            <div
                id="responsibilityEnglish"
                class="responsibility-editor"
                contenteditable="true"
                spellcheck="true">

                <h3>Patient Responsibilities</h3>

                <ul>

                    <li>
                        Provide accurate and complete information about your health condition.
                    </li>

                    <li>
                        Follow the treatment plan and instructions provided by your doctor.
                    </li>

                    <li>
                        Inform the hospital staff about any changes in your health condition.
                    </li>

                    <li>
                        Take medicines only as prescribed by your doctor.
                    </li>

                </ul>


                <h3>Hospital Visit Responsibilities</h3>

                <ul>

                    <li>
                        Arrive on time for scheduled appointments.
                    </li>

                    <li>
                        Carry your hospital card, identification proof, and previous medical reports.
                    </li>

                    <li>
                        Maintain cleanliness and hygiene inside the hospital premises.
                    </li>

                    <li>
                        Follow the instructions provided by hospital staff.
                    </li>

                </ul>


                <h3>Respect and Safety</h3>

                <ul>

                    <li>
                        Treat doctors, nurses, staff, patients, and visitors with respect.
                    </li>

                    <li>
                        Maintain silence in consultation and patient care areas.
                    </li>

                    <li>
                        Follow hospital safety and emergency instructions.
                    </li>

                    <li>
                        Do not damage hospital property or equipment.
                    </li>

                </ul>

            </div>


            <!-- ENGLISH HIDDEN DATA -->

            <input
                type="hidden"
                id="responsibilityEnglishData"
                name="responsibility_english">

        </div>



        <!-- =======================================================
                              HINDI
        ======================================================== -->

        <div class="responsibility-language-card">

            <div class="language-header">

                <div>

                    <h3>
                        🇮🇳 हिन्दी
                    </h3>

                    <p>
                        अस्पताल की जिम्मेदारियाँ हिन्दी में लिखें।
                    </p>

                </div>


                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addResponsibilitySection('responsibilityHindi','hi')">

                    <i class="fa-solid fa-plus"></i>

                    शीर्षक जोड़ें

                </button>

            </div>


            <!-- HINDI EDITOR -->

            <div
                id="responsibilityHindi"
                class="responsibility-editor"
                contenteditable="true">

                <h3>मरीजों की जिम्मेदारियाँ</h3>

                <ul>

                    <li>
                        अपनी स्वास्थ्य स्थिति के बारे में सही और पूरी जानकारी दें।
                    </li>

                    <li>
                        डॉक्टर द्वारा दिए गए उपचार और निर्देशों का पालन करें।
                    </li>

                    <li>
                        अपने स्वास्थ्य में किसी भी बदलाव की जानकारी अस्पताल के कर्मचारियों को दें।
                    </li>

                    <li>
                        दवाइयाँ केवल डॉक्टर द्वारा बताए अनुसार लें।
                    </li>

                </ul>


                <h3>अस्पताल में मरीज की जिम्मेदारियाँ</h3>

                <ul>

                    <li>
                        निर्धारित समय पर अस्पताल और अपनी नियुक्ति के लिए पहुँचें।
                    </li>

                    <li>
                        अपना अस्पताल कार्ड, पहचान पत्र और पुरानी मेडिकल रिपोर्ट साथ लाएँ।
                    </li>

                    <li>
                        अस्पताल परिसर में स्वच्छता और साफ-सफाई बनाए रखें।
                    </li>

                    <li>
                        अस्पताल के कर्मचारियों द्वारा दिए गए निर्देशों का पालन करें।
                    </li>

                </ul>


                <h3>सम्मान और सुरक्षा</h3>

                <ul>

                    <li>
                        डॉक्टरों, नर्सों, कर्मचारियों, मरीजों और आगंतुकों के साथ सम्मानपूर्वक व्यवहार करें।
                    </li>

                    <li>
                        परामर्श और मरीजों की देखभाल वाले क्षेत्रों में शांति बनाए रखें।
                    </li>

                    <li>
                        अस्पताल की सुरक्षा और आपातकालीन निर्देशों का पालन करें।
                    </li>

                    <li>
                        अस्पताल की संपत्ति या उपकरणों को नुकसान न पहुँचाएँ।
                    </li>

                </ul>

            </div>


            <!-- HINDI HIDDEN DATA -->

            <input
                type="hidden"
                id="responsibilityHindiData"
                name="responsibility_hindi">

        </div>



        <!-- =======================================================
                            REGIONAL LANGUAGE
        ======================================================== -->

        <div class="responsibility-language-card">

            <div class="language-header">

                <div>

                    <h3>
                        🌐 Regional Language
                        (मराठी / ಕನ್ನಡ / বাংলা)
                    </h3>

                    <p>
                        Write hospital responsibilities in
                        Marathi (मराठी) /
                        Kannada (ಕನ್ನಡ) /
                        Bengali (বাংলা).
                    </p>

                </div>


                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addResponsibilitySection('responsibilityRegional','mr')">

                    <i class="fa-solid fa-plus"></i>

                    शीर्षक जोडा / ಶೀರ್ಷಿಕೆ ಸೇರಿಸಿ / শিরোনাম যোগ করুন

                </button>

            </div>


            <!-- REGIONAL EDITOR -->

            <div
                id="responsibilityRegional"
                class="responsibility-editor">

                <h3>

                    रुग्णांच्या जबाबदाऱ्या /
                    ರೋಗಿಗಳ ಜವಾಬ್ದಾರಿಗಳು /
                    রোগীদের দায়িত্ব

                </h3>

                <ul>

                    <li>

                        आपल्या आरोग्याविषयी योग्य आणि संपूर्ण माहिती द्या /
                        ನಿಮ್ಮ ಆರೋಗ್ಯದ ಬಗ್ಗೆ ಸರಿಯಾದ ಮತ್ತು ಸಂಪೂರ್ಣ ಮಾಹಿತಿಯನ್ನು ನೀಡಿ /
                        আপনার স্বাস্থ্য সম্পর্কে সঠিক ও সম্পূর্ণ তথ্য দিন।

                    </li>

                    <li>

                        डॉक्टरांनी दिलेल्या उपचार आणि सूचनांचे पालन करा /
                        ವೈದ್ಯರು ನೀಡಿದ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಸೂಚನೆಗಳನ್ನು ಪಾಲಿಸಿ /
                        চিকিৎসকের দেওয়া চিকিৎসা ও নির্দেশনা অনুসরণ করুন।

                    </li>

                    <li>

                        आरोग्याच्या स्थितीत झालेल्या कोणत्याही बदलाची माहिती रुग्णालयातील कर्मचाऱ्यांना द्या /
                        ನಿಮ್ಮ ಆರೋಗ್ಯ ಸ್ಥಿತಿಯಲ್ಲಿ ಯಾವುದೇ ಬದಲಾವಣೆಗಳಿದ್ದರೆ ಆಸ್ಪತ್ರೆಯ ಸಿಬ್ಬಂದಿಗೆ ತಿಳಿಸಿ /
                        আপনার স্বাস্থ্যের অবস্থার যেকোনো পরিবর্তন হাসপাতালের কর্মীদের জানান।

                    </li>

                </ul>


                <h3>

                    रुग्णालयातील जबाबदाऱ्या /
                    ಆಸ್ಪತ್ರೆಯ ಜವಾಬ್ದಾರಿಗಳು /
                    হাসপাতালের দায়িত্ব

                </h3>

                <ul>

                    <li>

                        नियोजित भेटीच्या वेळेस रुग्णालयात वेळेवर पोहोचा /
                        ನಿಗದಿತ ಸಮಯಕ್ಕೆ ಆಸ್ಪತ್ರೆಗೆ ಬನ್ನಿ /
                        নির্ধারিত সময়ে হাসপাতালে আসুন।

                    </li>

                    <li>

                        रुग्णालयाचे कार्ड, ओळखपत्र आणि मागील वैद्यकीय अहवाल सोबत आणा /
                        ಆಸ್ಪತ್ರೆಯ ಕಾರ್ಡ್, ಗುರುತಿನ ಚೀಟಿ ಮತ್ತು ಹಿಂದಿನ ವೈದ್ಯಕೀಯ ವರದಿಗಳನ್ನು ತರಿರಿ /
                        হাসপাতালের কার্ড, পরিচয়পত্র এবং আগের চিকিৎসা রিপোর্ট সঙ্গে আনুন।

                    </li>

                    <li>

                        रुग्णालयाच्या परिसरात स्वच्छता राखा /
                        ಆಸ್ಪತ್ರೆಯ ಆವರಣದಲ್ಲಿ ಸ್ವಚ್ಛತೆಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ /
                        হাসপাতাল প্রাঙ্গণে পরিচ্ছন্নতা বজায় রাখুন।

                    </li>

                </ul>


                <h3>

                    आदर आणि सुरक्षितता /
                    ಗೌರವ ಮತ್ತು ಸುರಕ್ಷತೆ /
                    সম্মান ও নিরাপত্তা

                </h3>

                <ul>

                    <li>

                        डॉक्टर, परिचारिका आणि रुग्णालयातील कर्मचाऱ्यांशी आदराने वागा /
                        ವೈದ್ಯರು, ನರ್ಸ್‌ಗಳು ಮತ್ತು ಆಸ್ಪತ್ರೆಯ ಸಿಬ್ಬಂದಿಯನ್ನು ಗೌರವದಿಂದ ಕಾಣಿರಿ /
                        ডাক্তার, নার্স এবং হাসপাতালের কর্মীদের সম্মান করুন।

                    </li>

                    <li>

                        रुग्णालयाच्या सुरक्षा आणि आपत्कालीन सूचनांचे पालन करा /
                        ಆಸ್ಪತ್ರೆಯ ಸುರಕ್ಷತಾ ಮತ್ತು ತುರ್ತು ಸೂಚನೆಗಳನ್ನು ಪಾಲಿಸಿ /
                        হাসপাতালের নিরাপত্তা ও জরুরি নির্দেশনা অনুসরণ করুন।

                    </li>

                </ul>

            </div>


            <!-- REGIONAL HIDDEN DATA -->

            <input
                type="hidden"
                id="responsibilityRegionalData"
                name="responsibility_regional">

        </div>



        <!-- =======================================================
                              BUTTONS
        ======================================================== -->

        <div class="button-row">

            <button
                type="button"
                class="secondary-btn responsibility-reset">

                Reset

            </button>


            <button
                type="button"
                class="primary-btn save-responsibilities">

                <i class="fa-solid fa-floppy-disk"></i>

                Save Responsibilities

            </button>

        </div>


    </form>

</div>


<!-- ============================================================
                         BACKEND NOTES
=============================================================

Store HTML exactly as received.

Database fields:

responsibility_english
responsibility_hindi
responsibility_regional

While displaying in User Module:

echo $responsibility_english;

echo $responsibility_hindi;

echo $responsibility_regional;

Do NOT strip HTML because headings and bullet lists
must remain formatted.

============================================================= -->