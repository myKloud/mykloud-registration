import { toast } from "react-toastify";
import http from "./http";

const apiEndPoint = `/user/users`;

export async function getUser(username) {
  const info = {
    username: username,
  };
  const { headers, data } = await http.post(apiEndPoint, info);
  return data;
}

export async function sendRecoveryCode(recovery) {
  const info = {
    value: recovery.value,
    otp: recovery.otp,
  };
  const { headers, data } = await http.post(apiEndPoint, info);
  return data;
}

export async function signUp(data) {
  const info = {
    username: data.username,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    recovery: data.recovery,
  };
  const { headers, data } = await http.post(apiEndPoint, info);
  return data;
}

export default {
  getUser,
  sendRecoveryCode,
  signUp,
};
