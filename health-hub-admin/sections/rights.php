<div class="section-card">

    <!-- ==========================================================
                         SECTION HEADER
    =========================================================== -->

    <div class="section-header">

        <h2>
            Patient's Rights
        </h2>

        <p>
            Create patient's rights information in multiple languages.
            These rights will be displayed directly in the User Module.
        </p>

    </div>


    <!-- ==========================================================
                         RIGHTS FORM
    =========================================================== -->

    <form id="rightsForm">


        <!-- =======================================================
                              ENGLISH
        ======================================================== -->

        <div class="rights-language-card">

            <div class="language-header">

                <div>

                    <h3>
                        🇬🇧 English
                    </h3>

                    <p>
                        Add hospital rights information in English.
                    </p>

                </div>


                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addRightsSection('rightsEnglish','en')">

                    <i class="fa-solid fa-plus"></i>

                    Add Heading

                </button>

            </div>


            <!-- ENGLISH EDITOR -->

            <div
                id="rightsEnglish"
                class="rights-editor"
                contenteditable="true"
                spellcheck="true">

                <h3>Patient Rights</h3>

                <ul>

                    <li>
                        Receive respectful and dignified treatment.
                    </li>

                    <li>
                        Receive clear and understandable information about your health condition.
                    </li>

                    <li>
                        Ask questions about your diagnosis, treatment, and care.
                    </li>

                    <li>
                        Receive information about available treatment options.
                    </li>

                </ul>


                <h3>Privacy and Confidentiality</h3>

                <ul>

                    <li>
                        Have your personal and medical information kept confidential.
                    </li>

                    <li>
                        Expect privacy during consultation, examination, and treatment.
                    </li>

                    <li>
                        Receive appropriate protection of your medical records.
                    </li>

                </ul>


                <h3>Information and Consent</h3>

                <ul>

                    <li>
                        Receive information about the treatment and procedures being provided.
                    </li>

                    <li>
                        Give informed consent before appropriate medical procedures.
                    </li>

                    <li>
                        Refuse a treatment or procedure where permitted by applicable rules.
                    </li>

                </ul>

            </div>


            <!-- ENGLISH HIDDEN DATA -->

            <input
                type="hidden"
                id="rightsEnglishData"
                name="rights_english">

        </div>



        <!-- =======================================================
                              HINDI
        ======================================================== -->

        <div class="rights-language-card">

            <div class="language-header">

                <div>

                    <h3>
                        🇮🇳 हिन्दी
                    </h3>

                    <p>
                        अस्पताल के अधिकार हिन्दी में लिखें।
                    </p>

                </div>


                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addRightsSection('rightsHindi','hi')">

                    <i class="fa-solid fa-plus"></i>

                    शीर्षक जोड़ें

                </button>

            </div>


            <!-- HINDI EDITOR -->

            <div
                id="rightsHindi"
                class="rights-editor"
                contenteditable="true">

                <h3>मरीजों के अधिकार</h3>

                <ul>

                    <li>
                        सम्मान और गरिमा के साथ उपचार प्राप्त करने का अधिकार।
                    </li>

                    <li>
                        अपनी स्वास्थ्य स्थिति के बारे में स्पष्ट और समझने योग्य जानकारी प्राप्त करने का अधिकार।
                    </li>

                    <li>
                        अपनी बीमारी, उपचार और देखभाल के बारे में प्रश्न पूछने का अधिकार।
                    </li>

                    <li>
                        उपलब्ध उपचार विकल्पों के बारे में जानकारी प्राप्त करने का अधिकार।
                    </li>

                </ul>


                <h3>गोपनीयता और निजता</h3>

                <ul>

                    <li>
                        अपनी व्यक्तिगत और मेडिकल जानकारी को गोपनीय रखने का अधिकार।
                    </li>

                    <li>
                        परामर्श, जांच और उपचार के दौरान निजता प्राप्त करने का अधिकार।
                    </li>

                    <li>
                        अपने मेडिकल रिकॉर्ड की उचित सुरक्षा का अधिकार।
                    </li>

                </ul>


                <h3>जानकारी और सहमति</h3>

                <ul>

                    <li>
                        दिए जा रहे उपचार और प्रक्रियाओं के बारे में जानकारी प्राप्त करने का अधिकार।
                    </li>

                    <li>
                        उचित चिकित्सा प्रक्रियाओं से पहले सूचित सहमति देने का अधिकार।
                    </li>

                    <li>
                        लागू नियमों के अनुसार किसी उपचार या प्रक्रिया को अस्वीकार करने का अधिकार।
                    </li>

                </ul>

            </div>


            <!-- HINDI HIDDEN DATA -->

            <input
                type="hidden"
                id="rightsHindiData"
                name="rights_hindi">

        </div>



        <!-- =======================================================
                            REGIONAL LANGUAGE
        ======================================================== -->

        <div class="rights-language-card">

            <div class="language-header">

                <div>

                    <h3>
                        🌐 Regional Language
                        (मराठी / ಕನ್ನಡ / বাংলা)
                    </h3>

                    <p>
                        Write hospital rights information in
                        Marathi (मराठी) /
                        Kannada (ಕನ್ನಡ) /
                        Bengali (বাংলা).
                    </p>

                </div>


                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addRightsSection('rightsRegional','mr')">

                    <i class="fa-solid fa-plus"></i>

                    शीर्षक जोडा / ಶೀರ್ಷಿಕೆ ಸೇರಿಸಿ / শিরোনাম যোগ করুন

                </button>

            </div>


            <!-- REGIONAL EDITOR -->

            <div
                id="rightsRegional"
                class="rights-editor">

                <h3>

                    रुग्णांचे अधिकार /
                    ರೋಗಿಗಳ ಹಕ್ಕುಗಳು /
                    রোগীদের অধিকার

                </h3>

                <ul>

                    <li>

                        आदर आणि सन्मानाने उपचार मिळण्याचा अधिकार /
                        ಗೌರವ ಮತ್ತು ಘನತೆಯಿಂದ ಚಿಕಿತ್ಸೆ ಪಡೆಯುವ ಹಕ್ಕು /
                        সম্মান ও মর্যাদার সঙ্গে চিকিৎসা পাওয়ার অধিকার।

                    </li>

                    <li>

                        आपल्या आरोग्यस्थितीबद्दल स्पष्ट आणि समजण्यास सोपी माहिती मिळण्याचा अधिकार /
                        ನಿಮ್ಮ ಆರೋಗ್ಯ ಸ್ಥಿತಿಯ ಬಗ್ಗೆ ಸ್ಪಷ್ಟ ಮತ್ತು ಅರ್ಥವಾಗುವ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯುವ ಹಕ್ಕು /
                        আপনার স্বাস্থ্য সম্পর্কে স্পষ্ট ও সহজবোধ্য তথ্য পাওয়ার অধিকার।

                    </li>

                    <li>

                        निदान, उपचार आणि काळजीबद्दल प्रश्न विचारण्याचा अधिकार /
                        ನಿಮ್ಮ ರೋಗನಿರ್ಣಯ, ಚಿಕಿತ್ಸೆ ಮತ್ತು ಆರೈಕೆಯ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳುವ ಹಕ್ಕು /
                        রোগ নির্ণয়, চিকিৎসা ও যত্ন সম্পর্কে প্রশ্ন করার অধিকার।

                    </li>

                </ul>


                <h3>

                    गोपनीयता आणि निजता /
                    ಗೌಪ್ಯತೆ ಮತ್ತು ಖಾಸಗಿತನ /
                    গোপনীয়তা ও ব্যক্তিগত গোপনীয়তা

                </h3>

                <ul>

                    <li>

                        आपली वैयक्तिक आणि वैद्यकीय माहिती गोपनीय ठेवण्याचा अधिकार /
                        ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಮತ್ತು ವೈದ್ಯಕೀಯ ಮಾಹಿತಿಯನ್ನು ಗೌಪ್ಯವಾಗಿಡುವ ಹಕ್ಕು /
                        আপনার ব্যক্তিগত ও চিকিৎসা সংক্রান্ত তথ্য গোপন রাখার অধিকার।

                    </li>

                    <li>

                        तपासणी आणि उपचारादरम्यान निजता मिळण्याचा अधिकार /
                        ಪರೀಕ್ಷೆ ಮತ್ತು ಚಿಕಿತ್ಸೆಯ ಸಮಯದಲ್ಲಿ ಖಾಸಗಿತನ ಪಡೆಯುವ ಹಕ್ಕು /
                        পরীক্ষা ও চিকিৎসার সময় ব্যক্তিগত গোপনীয়তা পাওয়ার অধিকার।

                    </li>

                </ul>


                <h3>

                    माहिती आणि संमती /
                    ಮಾಹಿತಿ ಮತ್ತು ಒಪ್ಪಿಗೆ /
                    তথ্য ও সম্মতি

                </h3>

                <ul>

                    <li>

                        दिल्या जाणाऱ्या उपचार आणि प्रक्रियांबद्दल माहिती मिळण्याचा अधिकार /
                        ನೀಡಲಾಗುತ್ತಿರುವ ಚಿಕಿತ್ಸೆ ಮತ್ತು ವಿಧಾನಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯುವ ಹಕ್ಕು /
                        প্রদত্ত চিকিৎসা ও প্রক্রিয়া সম্পর্কে তথ্য পাওয়ার অধিকার।

                    </li>

                    <li>

                        योग्य वैद्यकीय प्रक्रियेपूर्वी माहितीपूर्ण संमती देण्याचा अधिकार /
                        ಸೂಕ್ತ ವೈದ್ಯಕೀಯ ವಿಧಾನಗಳ ಮೊದಲು ತಿಳಿದ ಒಪ್ಪಿಗೆ ನೀಡುವ ಹಕ್ಕು /
                        উপযুক্ত চিকিৎসা প্রক্রিয়ার আগে অবহিত সম্মতি দেওয়ার অধিকার।

                    </li>

                </ul>

            </div>


            <!-- REGIONAL HIDDEN DATA -->

            <input
                type="hidden"
                id="rightsRegionalData"
                name="rights_regional">

        </div>



        <!-- =======================================================
                              BUTTONS
        ======================================================== -->

        <div class="button-row">

            <button
                type="button"
                class="secondary-btn rights-reset">

                Reset

            </button>


            <button
                type="button"
                class="primary-btn save-rights">

                <i class="fa-solid fa-floppy-disk"></i>

                Save Rights

            </button>

        </div>


    </form>

</div>


<!-- ============================================================
                         BACKEND NOTES
=============================================================

Store HTML exactly as received.

Database fields:

rights_english
rights_hindi
rights_regional

While displaying in User Module:

echo $rights_english;

echo $rights_hindi;

echo $rights_regional;

Do NOT strip HTML because headings and bullet lists
must remain formatted.

============================================================= -->