import LocalizedStrings from "react-localization";

const Localization = new LocalizedStrings({
  en: {
    title: "Welcome",
    sub_title: "Your myKloud account has been created successfully.",

    select_recovery: "For now , let’s select your recovery method",
    email_address: "Email address",
    phone_number: "Phone number",

    email_placeholder: "Recovery email address",

    email_msg: "You’ll receive an email with a confirmation code",
    sms_msg: "You’ll receive an sms with a confirmation code",
    send_code: "Send me code",

    validation: {
      email: {
        required: "Please enter valid email address ”name@",
        redundant:
          "Please enter secondary email address, that is not myKloud email",
        isExist: "User with this email already exists.",
      },
      number: {
        required: "Please enter valid phone number or change the country code",
        isExist: "User with this phone number already exists.",
      },
    },
  },
});

export default Localization;
