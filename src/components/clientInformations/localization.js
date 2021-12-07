import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "Fill in some basic info",

    firstname_placeholder: "First name",
    lastname_placeholder: "Last name",

    birthday_title: "Your birthday",
    month_placeholder: "Month",
    year_placeholder: "Year",

    msg: "Here goe a short sentence taht can goes on two lines describing why we asking for date of birth.",

    previous: "Previous",
    create_account: "Create my account",

    agree: 'By clicking "create my account", you agree to the',
    terms: "Terms",
    privacy_policy: "Privacy Policy",
    and: "and",

    validation: {
      firstName: {
        required: "Enter first name",
      },
      lastName: {
        required: "Enter last name",
      },
      name: {
        requiredBoth: "Enter first and last names",
      },
      year: {
        format: "Invalid year format",
      },
      bithday: {
        required: "Enter your Date of Birth",
        notValid: "sorry",
      },
      captcha: {
        required: "I am not a Robot",
      },
    },
  },
});

export default Localization;
