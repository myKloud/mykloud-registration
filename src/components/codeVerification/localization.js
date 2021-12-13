import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "Enter code we’ve sent to",

    not_recieve: "Didn’t recieve a code?",
    resend: "Resend",
    not_your_number: "Not your number?",
    not_your_email: "Not your email?",
    change: "Change",

    previous: "Previous",
    verify: "Verify",
    validation: {
      resend: {
        wait: "Please wait 15 min to resent the code.",
      },
    },
  },
});

export default Localization;
