import { toast } from "react-toastify";
import http from "./http";

const apiEndPoint_signup = `/signup`;
const apiEndPoint_send_otp = `/`; // to do
const apiEndPoint_check_user = `/`; // to do

export async function checkUser(username) {
  const info = {
    username: username,
  };
  return false;
  debugger;
  //   const { headers, data } = await http.post(apiEndPoint_check_user, info);
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
  var username = "user";
  var password = "eeda6a40-a112-4ccc-a3e2-97f2c5af72db";
  var basicAuth = "Basic " + window.btoa(username + ":" + password);
  await http
    .post(apiEndPoint_signup, info, {
      headers: { Authorization: +basicAuth },
    })
    .then(function (response) {
      console.log("Authenticated");
    })
    .catch(function (error) {
      console.log(error);
    });

  return true;
}

export default {
  checkUser,
  sendOtp,
  signUp,
};
