// import { toast } from "react-toastify";
import http from "./http";

const apiEndPointCheck = `/check`;
const apiEndPointSignup = `/signup`;
const apiEndPointSendOtp = `/sendOTP`;
const apiEndPointCheckRecovery = `/checkRecovery`;

export async function checkUser(username) {
  const param = `?username=${username}`;
  const { data } = await http.get(`${apiEndPointCheck}${param}`);
  return data;
}

export async function sendOtp(recovery) {
  const info = {
    recovery: recovery.value,
    otp: recovery.otp.toString(),
  };
  const { data } = await http.post(apiEndPointSendOtp, info);
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

  const { data } = await http.post(apiEndPointSignup, info);

  return data;
}

export async function checkRecovery(value) {
  const param = `?recovery=${value}`;
  const { data } = await http.get(`${apiEndPointCheckRecovery}${param}`);
  return data;
}

const service = { checkUser, sendOtp, signUp, checkRecovery };

export default service;
