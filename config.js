const CONVERTER_CONFIG = {

    defaultBrand: "casi",
    titleSelector: "p",
    ignoredTextPatterns: [/lorem ipsum/i],
    output: {
        trim: true
    },

    // ==================================================
    // VALID SECTION HEADERS
    // ==================================================

    allowedHeaders: [
        "Description of Promotion",
        "Promotional Period",
        "Eligibility",
        "Action Required",
        "Claiming Promotional Offer",
        "Registration Procedure",
        "Limitations on Participation",
        "Wagering Requirement",
        "Order of Funds Used for Wagering",
        "Eligible Game",
        "Eligible Games",
        "Eligible GameS",
        "Eligible Game(s)",
        "Eligible Game(S)",
        "Withdrawal Restrictions",
        "Cancellation",
        "Gaming Problem",
        "Gambling Problem",
        "Important Terms"
    ],

    // ==================================================
    // NORMALIZE INPUT VARIANTS
    // ==================================================

    headerAliases: {

        "Eligible Game": "Eligible Game",

        "Eligible Games": "Eligible Games",

        "Eligible Game(s)": "Eligible Game(s)",

        "Eligible Game(S)": "Eligible Game(s)"

    },

    // ==================================================
    // SPECIAL DISPLAY RULES
    // ==================================================

    specialCaseHeaders: {

        "Eligible Game(s)": {

            title: "Eligible Game(s)",

            upper: "ELIGIBLE GAME(S)"

        }

    }

};

const BRAND_CONFIG = {

    casi: {

        label: "Casi",
        displayId: "casi-diff",

        header: {
            case: "title",
            colon: true,
            underline: false
        }

    },

sports: {

    label: "Sports",

    displayId: "sports-diff",

    header: {

        case: "upper",

        colon: true,

        underline: true,

        underlineTag: "span",

        underlineStyle:
            "text-decoration: underline;"
    }

},

    acq: {

        label: "ACQ",
        displayId: "acq-diff",

        header: {
            case: "upper",
            colon: false,
            underline: false
        }

    }

};