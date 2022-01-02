import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "Welcome to myKloud",
    firstname_placeholder: "First name",
    lastname_placeholder: "Last name",
    birthday_title: "Your birthday",
    month_placeholder: "Month",
    year_placeholder: "Year",
    msg: "By law, we are required to verify your age, but we do NOT use or sell this information",
    previous: "Previous",
    create_account: "Next",
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
      birthDay: {
        required: "Enter your Date of Birth",
        notValid: "sorry",
      },
      captcha: {
        required: "Please verify that you are a human",
      },
    },
  },
});

export default Localization;
