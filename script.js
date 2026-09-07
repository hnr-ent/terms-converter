// ======================================
// ACTIVE BRAND
// ======================================

let activeBrand = "casi";

// ======================================
// ELEMENTS
// ======================================

const UI = {
    inputBox: document.getElementById("terms-input"),
    outputBox: document.getElementById("terms-output"),
    convertBtn: document.getElementById("convert-btn"),
    copyBtn: document.getElementById("copy-btn")
};

// ======================================
// BRAND SWITCHING
// ======================================

function hideAllSections() {

    Object.values(BRAND_CONFIG).forEach(config => {

        const element =
            document.getElementById(config.displayId);

        if (element) {
            element.style.display = "none";
        }

    });

}

function clearActiveButtons() {

    document
        .querySelectorAll(".brand-btn")
        .forEach(button => {

            button.classList.remove("active");

        });

}

function selectBrand(brand) {

    activeBrand = brand;

    hideAllSections();
    clearActiveButtons();

    const config = BRAND_CONFIG[brand];

    document
        .getElementById(config.displayId)
        .style.display = "block";

    document
        .getElementById(brand)
        .classList.add("active");

}

document
    .querySelectorAll(".brand-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            selectBrand(button.id);

        });

    });

// ======================================
// TEXT HELPERS
// ======================================

function toTitleCase(text) {

    return text
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());

}

function cleanHeader(text) {

    return text
        .replace(/[:;]/g, "")
        .trim();

}

// ======================================
// HEADER VALIDATION
// ======================================

function isAllowedHeader(text) {

    return CONVERTER_CONFIG.allowedHeaders.includes(
        cleanHeader(text)
    );

}

function normalizeHeader(text) {

    const cleaned = cleanHeader(text);

    return (
        CONVERTER_CONFIG.headerAliases[cleaned]
        || cleaned
    );

}

// ======================================
// HEADER FORMATTER
// ======================================

function convertHeader(text) {

    const rules =
        BRAND_CONFIG[activeBrand].header;

    const normalizedHeader =
        normalizeHeader(text);

    const specialHeader =
        CONVERTER_CONFIG.specialCaseHeaders[
            normalizedHeader
        ];

    let output;

    // ==================================
    // SPECIAL CASE HEADERS
    // ==================================

    if (specialHeader) {

        if (rules.case === "upper") {

            output =
                specialHeader.upper;

        } else {

            output =
                specialHeader.title;

        }

    }

    // ==================================
    // NORMAL HEADERS
    // ==================================

    else {

        output = normalizedHeader;

        if (rules.case === "upper") {

            output =
                output.toUpperCase();

        }

        else if (rules.case === "title") {

            output =
                toTitleCase(output);

        }

    }

    // ==================================
    // COLON RULE
    // ==================================

    if (rules.colon) {

        output += ":";

    }

    return output;

}

// ======================================
// UNDERLINE HELPER
// ======================================

function applyUnderline(text, rules) {

    if (!rules.underline) {
        return text;
    }

    switch (rules.underlineTag) {

        case "span":

            return `<span style="${rules.underlineStyle}">${text}</span>`;

        case "u":

            return `<u>${text}</u>`;

        default:

            return text;
    }

}

// ======================================
// DETECT VALID HEADER
// ======================================

function isHeaderParagraph(paragraph) {

    if (!paragraph) {
        return false;
    }

    if (paragraph.children.length !== 1) {
        return false;
    }

    const child =
        paragraph.firstElementChild;

    if (!child) {
        return false;
    }

    return child.tagName === "STRONG";

}

// ======================================
// PROCESS TERMS
// ======================================

function processTerms(htmlString) {

    const parser =
        new DOMParser();

    const doc =
        parser.parseFromString(
            htmlString,
            "text/html"
        );

    const paragraphs =
        doc.querySelectorAll("p");

    paragraphs.forEach(paragraph => {

        if (!isHeaderParagraph(paragraph)) {
            return;
        }

        const strong =
            paragraph.firstElementChild;

        const originalText =
            strong.textContent.trim();

        if (!isAllowedHeader(originalText)) {
            return;
        }

        const convertedText =
            convertHeader(originalText);

        const brandRules =
            BRAND_CONFIG[activeBrand];

        strong.innerHTML =
            applyUnderline(
                convertedText,
                brandRules.header
            );

    });

    return doc.body.innerHTML;

}

// ======================================
// CONVERT BUTTON
// ======================================

UI.convertBtn.addEventListener("click", () => {

    const input =
        UI.inputBox.value.trim();

    if (!input) {

        UI.outputBox.value = "";

        if (UI.copyBtn) {
            UI.copyBtn.disabled = true;
        }

        return;

    }

    const output =
        processTerms(input);

    UI.outputBox.value =
        output;

    if (UI.copyBtn) {
        UI.copyBtn.disabled = false;
    }

});

// ======================================
// COPY BUTTON
// ======================================

if (UI.copyBtn) {

    UI.copyBtn.disabled = true;

    UI.copyBtn.addEventListener(
        "click",
        async () => {

            const output =
                UI.outputBox.value.trim();

            if (!output) {
                return;
            }

            try {

                await navigator
                    .clipboard
                    .writeText(output);

                const originalText =
                    UI.copyBtn.textContent;

                UI.copyBtn.textContent =
                    "Copied!";

                UI.copyBtn.classList.add(
                    "copied"
                );

                setTimeout(() => {

                    UI.copyBtn.textContent =
                        originalText;

                    UI.copyBtn.classList.remove(
                        "copied"
                    );

                }, 500);

            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

            }

        }
    );

}

// ======================================
// INITIALIZE
// ======================================

selectBrand("casi");