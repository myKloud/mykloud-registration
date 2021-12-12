import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "Forgot username",

    recovery_sub_title: "Enter your recovery email or phone number",

    fullname_sub_title: "Enter your Full Name",

    firstname_placeholder: "First name",

    lastname_placeholder: "Last name",

    fullname_message:
      "You’ll recieve an email with a conformation code if above input is valid",

    fullname_btn: "Send me the code",

    show: "show",
    hide: "hide",
    next: "Next",

    recovery_placeholder: "Recovery email address or phone number",
  },
});

export default Localization;
