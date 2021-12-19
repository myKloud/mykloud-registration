import { toast } from "react-toastify";
import http from "./http";

const apiEndPoint_check = `/check`;
const apiEndPoint_signup = `/signup`;
const apiEndPoint_send_otp = `/sendOtp`;

export async function checkUser(username) {
  const info = {
    username: username,
  };

  const param = `?username=${username}`;
  const { data } = await http.get(`${apiEndPoint_check}${param}`);
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
