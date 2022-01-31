import { setStorage } from "../../shared/storage";
import { signUp, verifyOtp } from "../../services/register";
import {
  binaryStringToArray,
  arrayToBinaryString,
  encodeBase64,
  decodeBase64,
} from "pmcrypto";
import  bcrypt from "bcryptjs" ;

const register = async (userObj) => {
  const rfc5054 = {
    N_base10:
      "21766174458617435773191008891802753781907668374255538511144643224689886235383840957210909013086056401571399717235807266581649606472148410291413364152197364477180887395655483738115072677402235101762521901569820740293149529620419333266262073471054548368736039519702486226506248861060256971802984953561121442680157668000761429988222457090413873973970171927093992114751765168063614761119615476233422096442783117971236371647333871414335895773474667308967050807005509320424799678417036867928316761272274230314067548291133582479583061439577559347101961771406173684378522703483495337037655006751328447510550299250924469288819",
    g_base10: "2",
    k_base16: "5b9e8ef059c6b32ea59fc1d322d37f04aa30bae5aa9003b8321e21ddb04e300",
  };
  // generate the client session class from the client session factory closure
  const SRP6JavascriptClientSession = require("thinbus-srp/client.js")(
    rfc5054.N_base10,
    rfc5054.g_base10,
    rfc5054.k_base16
  );

  const client = new SRP6JavascriptClientSession();
  // generate a random salt that should be stored with the user verifier
  const salt = client.generateRandomSalt();
  // generate the users password verifier that should be stored with their salt.
  const verifier = client.generateVerifier(
    salt,
    userObj.username,
    userObj.password
  );

  const computeKeyPassword = async (password, salt) => {
    if (!password || !salt || salt.length !== 24 || password.length < 1) {
      throw new Error("Password and salt required.");
    }
    const saltBinary = binaryStringToArray(decodeBase64(salt));
    const hash = await bcrypt.hash(
      password,
      "$2y$10$" + bcrypt.encodeBase64(saltBinary, 16)
    );
    // Remove bcrypt prefix and salt (first 29 characters)
    return hash.slice(29);
  };

  const pass = await computeKeyPassword(userObj.password, salt.slice(0 , 24));
  const response = await signUp({
    Type: 1,
    Passphrase: pass,
    Username: userObj.username,
    Payload: {
      "wMwCK-P-vMy.0J1i":
        "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",
      "wToNvEl-XtYUeW8Q":
        "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",
    },
    Auth: {
      ModulusID:
        "vl-JevUsz3GJc18CC1VOs-qDKqoIWlLiUePdrzFc72-BtxBPHBDZM7ayn8CNQ59Sk4XjDbwwBVpdYrPIFtOvIw==",
      Version: 4,
      Salt: salt,
      Verifier: verifier,
    },
    FirstName: userObj.firstname,
    LastName: userObj.lastname,
    Recovery: userObj.recovery,
    RecoveryType: userObj.method !== "phone" ? 0 : 1,
  });
  return response;
};

const verify = async (recovery, code) => {
  const response = await verifyOtp({ value: recovery, otp: code });
  return response;
};

const verifyCode = async (
  history,
  code,
  props,
  otp,
  setError,
  formValidation,
  userObj
) => {
  let check = await verify(userObj.recovery, code);

  if (props.push) {
    history.push({
      pathname: props.push,
    });
  }
  if (props.resetPass) {
    props.setStage("reset");
  }

  if (check === "Valid OTP") {
    setStorage("welcome");
    setError("");
    register(userObj)
      .then((res) => {
        if (!res.exists) {
          history.push({
            pathname: "/welcome",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    setError(() => formValidation.codeVerify.error);
  }
};

export default verifyCode;
