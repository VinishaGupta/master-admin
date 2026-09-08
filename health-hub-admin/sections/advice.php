<div class="section-card">

    <div class="section-header">

        <h2>

            Hospital Advice

        </h2>

        <p>

            Create hospital advice in multiple languages.
            This advice will be displayed directly in the User Module.

        </p>

    </div>

    <form id="adviceForm">

        <!-- =======================================================
                        ENGLISH
        ======================================================== -->

        <div class="instruction-language-card">

            <div class="language-header">

                <div>

                    <h3>
                         English
                    </h3>

                    <p>
                        Add hospital advice in English.
                    </p>

                </div>

                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addAdviceSection('adviceEnglish','en')">

                    <i class="fa-solid fa-plus"></i>

                    Add Heading

                </button>

            </div>

            <div
                id="adviceEnglish"
                class="instruction-editor"
                contenteditable="true"
                spellcheck="true">

                <h3>Diet Advice</h3>

                <ul>
                    <li>Drink plenty of water every day.</li>
                    <li>Avoid oily and junk food.</li>
                </ul>

                <h3>General Health Advice</h3>

                <ul>
                    <li>Take medicines on time.</li>
                    <li>Consult your doctor before stopping medication.</li>
                </ul>

            </div>

            <input
                type="hidden"
                id="adviceEnglishData"
                name="advice_english">

        </div>

        <!-- =======================================================
                        HINDI
        ======================================================== -->

        <div class="instruction-language-card">

            <div class="language-header">

                <div>

                    <h3>

                        🇮🇳 हिन्दी

                    </h3>

                    <p>

                        अस्पताल की सलाह हिन्दी में लिखें।

                    </p>

                </div>

                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addAdviceSection('adviceHindi','hi')">

                    <i class="fa-solid fa-plus"></i>

                    शीर्षक जोड़ें

                </button>

            </div>

            <div
                id="adviceHindi"
                class="instruction-editor"
                contenteditable="true">

                <h3>आहार संबंधी सलाह</h3>

                <ul>

                    <li>प्रतिदिन पर्याप्त पानी पिएँ।</li>

                    <li>तैलीय भोजन से बचें।</li>

                </ul>

                <h3>सामान्य सलाह</h3>

                <ul>

                    <li>दवाइयाँ समय पर लें।</li>

                    <li>डॉक्टर की सलाह के बिना दवा बंद न करें।</li>

                </ul>

            </div>

            <input
                type="hidden"
                id="adviceHindiData"
                name="advice_hindi">

        </div>

        <!-- =======================================================
                        REGIONAL
        ======================================================== -->

        <div class="instruction-language-card">

            <div class="language-header">

                <div>

                <h3>

                    Regional Language
                    (मराठी / ಕನ್ನಡ / বাংলা)

                </h3>

                <p>

                    Hospital advice in
                    Marathi (मराठी) /
                    Kannada (ಕನ್ನಡ) /
                    Bengali (বাংলা).

                </p>
                </div>

                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addAdviceSection('adviceRegional','mr')">

                    <i class="fa-solid fa-plus"></i>

                    Add Heading
                    (शीर्षक / ಶೀರ್ಷಿಕೆ / শিরোনাম)

                </button>

            </div>

            <div
                id="adviceRegional"
                class="instruction-editor"
                contenteditable="true">

                    <h3>

                    आहार सल्ला / ಆಹಾರ ಸಲಹೆ / খাদ্য পরামর্শ

                    </h3>

                    <ul>

                    <li>

                    दररोज भरपूर पाणी प्या.
                    /
                    ಪ್ರತಿದಿನ ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ.
                    /
                    প্রতিদিন পর্যাপ্ত পানি পান করুন।

                    </li>

                    <li>

                    तेलकट पदार्थ टाळा.
                    /
                    ಎಣ್ಣೆಯುಕ್ತ ಆಹಾರವನ್ನು ತಪ್ಪಿಸಿ.
                    /
                    তেলযুক্ত খাবার এড়িয়ে চলুন।

                    </li>

                    </ul>

                    <h3>

                    सामान्य सल्ला
                    /
                    ಸಾಮಾನ್ಯ ಸಲಹೆ
                    /
                    সাধারণ পরামর্শ

                    </h3>

                    <ul>

                    <li>

                    औषधे वेळेवर घ्या.
                    /
                    ಔಷಧಿಗಳನ್ನು ಸಮಯಕ್ಕೆ ತೆಗೆದುಕೊಳ್ಳಿ.
                    /
                    সময়মতো ওষুধ গ্রহণ করুন।

                    </li>

                    <li>

                    डॉक्टरांचा सल्ला न घेता औषधे बंद करू नका.
                    /
                    ವೈದ್ಯರ ಸಲಹೆಯಿಲ್ಲದೆ ಔಷಧಿ ನಿಲ್ಲಿಸಬೇಡಿ.
                    /
                    ডাক্তারের পরামর্শ ছাড়া ওষুধ বন্ধ করবেন না।

                    </li>

                    </ul>

            </div>

            <input
                type="hidden"
                id="adviceRegionalData"
                name="advice_regional">

        </div>

        <!-- =======================================================
                        BUTTONS
        ======================================================== -->

        <div class="button-row">

            <button
                type="button"
                class="secondary-btn advice-reset">

                Reset

            </button>

            <button
                type="button"
                class="primary-btn save-advice">

                <i class="fa-solid fa-floppy-disk"></i>

                Save Advice

            </button>

        </div>

    </form>

</div>

<!-- ============================================================

BACKEND NOTES

Store HTML exactly as received.

Database Example

advice_english
advice_hindi
advice_regional

While displaying in User Module simply render

echo $advice_english;

echo $advice_hindi;

echo $advice_regional;

Do NOT strip HTML because headings and bullet lists
must remain formatted.

============================================================= -->