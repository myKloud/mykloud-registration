import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "Forgot password",

    recovery_sub_title: "Enter your recovery email or phone number",

    recovery_placeholder: "Recovery email address or phone number",

    reset_title: "Set up new password",

    reset_sub_title:
      "Password should be 8 or more characters with a mix of letters, numbers and symbols",

    create_placeholder: "Create new password",

    confirm_placeholder: "Confirm new password",

    show: "show",
    hide: "hide",
    next: "Next",
  },
});

export default Localization;
