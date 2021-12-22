const name = "mykloud";

export function getStorage() {
  return localStorage.getItem(name);
}

export function setStorage(value) {
  return localStorage.setItem(name, value);
}

export function removeStorage() {
  return localStorage.removeItem(name);
}

export function setResend(value) {
  window.localStorage.setItem("resend", value);
}

export function getResend() {
  return window.localStorage.getItem("resend");
}

export function removeResend() {
  localStorage.removeItem("resend");
}
