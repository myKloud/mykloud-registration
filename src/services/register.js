import { toast } from "react-toastify";
import http from "./http";

const apiEndPoint_signup = `/signup`;
const apiEndPoint_send_otp = `/`; // to do

export async function checkUser(username) {
  const info = {
    username: username,
  };
  const apiEndPoint_check_user = `/check?username=${username}`; // to do

  const { headers, data } = await http.get(apiEndPoint_check_user, info);
  return data;
}

export async function sendOtp(recovery) {
  const info = {
    value: recovery.value,
    otp: recovery.otp,
  };
  await console.log(info);
  return true;
  //   const { headers, data } = await http.post(apiEndPoint_send_otp, info);
  //   debugger;
  //   return data;
}

export async function signUp(informations) {
  const info = {
    username: informations.username,
    fistName: informations.firstName,
    lastName: informations.lastName,
    password: informations.password,
    recovery: informations.recovery,
  };

  const { data } = await http.post(apiEndPoint_signup, info);

  return data;
}

export default {
  checkUser,
  sendOtp,
  signUp,
};
