// import { toast } from "react-toastify";
import http from "./http";

const apiEndPoint_check = `/check`;
const apiEndPoint_signup = `/signup`;
const apiEndPoint_send_otp = `/sendOTP`;

export async function checkUser(username) {
  const param = `?username=${username}`;
  const { data } = await http.get(`${apiEndPoint_check}${param}`);
  return data;
}

export async function sendOtp(recovery) {
  const info = {
    recovery: recovery.value,
    otp: recovery.otp.toString(),
  };
  const { data } = await http.post(apiEndPoint_send_otp, info);
  return data;
}

export async function signUp(informations) {
  const { username, firstName, lastName, password, recovery } = informations;
  const info = {
    username,
    firstName,
    lastName,
    password,
    recovery,
  };

  const { data } = await http.post(apiEndPoint_signup, info);

  return data;
}

const service = { checkUser, sendOtp, signUp };

export default service;
