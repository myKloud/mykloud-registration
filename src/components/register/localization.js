import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "Create your myKloud account",
    sub_title: "Single access to all myKloud applications.",

    show: "show",
    hide: "hide",
    next: "Next",

    username_placeholder: "Username",
    username_validation_general:
      "Only letters (a-z), numbers (0-9) and periods(.) are allowed",

    passowrd_placeholder: "Password",
    confirm_passowrd_placeholder: "Confirm Password",

    msg: "Safe & secure via myKloud.",

    validation: {
      username: {
        required: "Choose a Kmail address",
        length: "Your username must be between 4 and 12 characters long",
        pattern:
          "Sorry, only letters (a-z), numbers (0-9) and periods (.) are allowed.",
        is_exist: "This username is taken. Choose different one or log in",
      },

      password: {
        required: "Enter password",
        length:
          "Use 8 or more characters with a mix of letters, numbers & symbols",
        pattern:
          "Use 8 or more characters with a mix of letters, numbers & symbols",
      },

      confirmPassword: {
        required: "Confirm your password",
        match: "Those passwords didn’t match. Try again.",
      },
    },
  },
});

export default Localization;
