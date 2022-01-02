// import { toast } from "react-toastify";
import http from "./http";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
const apiEndPointCheck = `/exists`;
const apiEndPointSignup = `/signup`;
const apiEndPointSendOtp = `/otp`;
const apiEndPointVerifyOtp = `/verifyOtp`;
const apiEndPointCheckRecovery = `exists`;
const apiEndPointCache = `/cacheUsername`;
const fpPromise = FingerprintJS.load();

export async function checkUser(username) {
  // Get the visitor identifier when you need it.
  const fp = await fpPromise;
  const result = await fp.get();

  const param = `?username=${username}&fingerprint=${result.visitorId}`;
  const { data } = await http.get(`${apiEndPointCheck}${param}`);
  return data;
}

export async function sendOtp(recovery) {
  const info = {
    recovery: recovery.value,
    recoveryType: recovery.type,
  };
  const { data } = await http.post(apiEndPointSendOtp, info);
  console.log(data);
  return data;
}

export async function verifyOtp(recovery) {
  const param = `?recovery=${recovery.value}&otp=${recovery.otp}`;
  const { data } = await http.get(`${apiEndPointVerifyOtp}${param}`);
  return data.message;
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
  const param = `?recovery=${value.value}&recoveryType=${value.type}`;
  const { data } = await http.get(`${apiEndPointCheckRecovery}${param}`);
  return data;
}

export async function cache(username) {
  // Get the visitor identifier when you need it.
  const fp = await fpPromise;
  const result = await fp.get();

  const { data } = await http.post(`${apiEndPointCache}`, {
    username: username,
    fingerprint: result.visitorId,
    expirationTime: 20,
  });
  console.log(data);
  return data;
}

const service = { checkUser, sendOtp, signUp, checkRecovery, cache, verifyOtp };

export default service;
