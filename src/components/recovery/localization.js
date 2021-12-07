import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "Welcome",
    sub_title: "Your myKloud account has been created succesfully.",

    select_recovery: "For now , let’s select your recovery method",
    email_address: "Email address",
    phone_number: "Phone number",

    email_placeholder: "Recovery email address",

    email_msg: "You’ll recieve an email with a confirmation code",
    sms_msg: "You’ll recieve an sms with a cofnirmation code",
    send_code: "Send me code",

    validation: {
      email: {
        required: "Please enter valid email address",
        redundant:
          "Please enter secondary email address, that is not myKloud email",
      },
      number: {
        required: "Please enter valid phone number or change the country code",
      },
    },
  },
});

export default Localization;
