<div class="section-card">

    <div class="section-header">

        <h2>

            Hospital Instructions

        </h2>

        <p>

            Create hospital instructions in multiple languages.
            These instructions will be displayed directly in the User Module.

        </p>

    </div>

    <form id="instructionForm">

        <!-- =======================================================
                        ENGLISH
        ======================================================== -->

        <div class="instruction-language-card">

            <div class="language-header">

                <div>

                    <h3>
                        🇬🇧 English
                    </h3>

                    <p>
                        Add hospital instructions in English.
                    </p>

                </div>

                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addInstructionSection('instructionEnglish','en')">

                    <i class="fa-solid fa-plus"></i>

                    Add Heading

                </button>

            </div>

            <div
                id="instructionEnglish"
                class="instruction-editor"
                contenteditable="true"
                spellcheck="true">

                <h3>Cardiology Instructions</h3>

                <ul>
                    <li>Patients should reach 15 minutes before appointment.</li>
                    <li>Carry previous reports.</li>
                </ul>

                <h3>Parking Instructions</h3>

                <ul>
                    <li>Free parking available.</li>
                    <li>Parking is in front of the building.</li>
                </ul>

            </div>

            <input
                type="hidden"
                id="instructionEnglishData"
                name="instruction_english">

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

                        अस्पताल के निर्देश हिन्दी में लिखें।

                    </p>

                </div>

                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addInstructionSection('instructionHindi','hi')">

                    <i class="fa-solid fa-plus"></i>

                    शीर्षक जोड़ें

                </button>

            </div>

            <div
                id="instructionHindi"
                class="instruction-editor"
                contenteditable="true">

                <h3>हृदय रोग विभाग</h3>

                <ul>

                    <li>मरीज समय से पहले आएँ।</li>

                    <li>पुरानी रिपोर्ट साथ लाएँ।</li>

                </ul>

                <h3>पार्किंग निर्देश</h3>

                <ul>

                    <li>निःशुल्क पार्किंग उपलब्ध है।</li>

                </ul>

            </div>

            <input
                type="hidden"
                id="instructionHindiData"
                name="instruction_hindi">

        </div>

        <!-- =======================================================
                        REGIONAL
        ======================================================== -->

        <div class="instruction-language-card">

            <div class="language-header">

                <div>

                    

                    <h3>

                        🌐 Regional Language
                        (मराठी / ಕನ್ನಡ / বাংলা)

                    </h3>

                    

                        <p>

                            Write hospital instructions in
                            Marathi (मराठी) /
                            Kannada (ಕನ್ನಡ) /
                            Bengali (বাংলা).

                        </p>

                </div>

                <button
                    type="button"
                    class="secondary-btn add-heading"
                    onclick="addInstructionSection('instructionRegional','mr')">

                    <i class="fa-solid fa-plus"></i>

                    शीर्षक जोडा / ಶೀರ್ಷಿಕೆ ಸೇರಿಸಿ / শিরোনাম যোগ করুন

                </button>

            </div>

            <div
                id="instructionRegional"
                class="instruction-editor"
                contenteditable="true">

                    <h3>

                        हृदयरोग विभाग /
                        ಹೃದಯ ವಿಭಾಗ /
                        হৃদরোগ বিভাগ

                    </h3>

                    <ul>

                        <li>

                            रुग्णांनी वेळेआधी यावे /
                            ರೋಗಿಗಳು ಸಮಯಕ್ಕಿಂತ ಮುಂಚಿತವಾಗಿ ಬರಬೇಕು /
                            রোগীরা নির্ধারিত সময়ের ১৫ মিনিট আগে আসুন।

                        </li>

                        <li>

                                जुने रिपोर्ट सोबत आणा /
                                ಹಳೆಯ ವರದಿಗಳನ್ನು ತರಿರಿ /
                                পুরোনো রিপোর্ট সঙ্গে আনুন।

                        </li>

                    </ul>

                    <h3>

                            पार्किंग सूचना /
                            ಪಾರ್ಕಿಂಗ್ ಸೂಚನೆ /
                            পার্কিং নির্দেশনা

                    </h3>

                    <ul>

                            <li>

                            मोफत पार्किंग उपलब्ध आहे /
                            ಉಚಿತ ಪಾರ್ಕಿಂಗ್ ಲಭ್ಯವಿದೆ /
                            বিনামূল্যে পার্কিং উপলব্ধ।

                            </li>

                    </ul>

            </div>

            <input
                type="hidden"
                id="instructionRegionalData"
                name="instruction_regional">

        </div>

        <!-- =======================================================
                        BUTTONS
        ======================================================== -->

        <div class="button-row">

            <button
                type="button"
                class="secondary-btn instruction-reset">

                Reset

            </button>

            <button
                type="button"
                class="primary-btn save-instructions">

                <i class="fa-solid fa-floppy-disk"></i>

                Save Instructions

            </button>

        </div>

    </form>

</div>

<!-- ============================================================
BACKEND NOTES

Store HTML exactly as received.

Database Example

instruction_english
instruction_hindi
instruction_regional

While displaying in User Module simply render

echo $instruction_english;

echo $instruction_hindi;

echo $instruction_regional;

Do NOT strip HTML because headings and bullet lists
must remain formatted.

============================================================= -->