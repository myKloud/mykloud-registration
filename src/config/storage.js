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

export function setFirstResend(value, date) {
  const data = {
    recoveryData: value,
    date: date,
  };

  window.localStorage.setItem("firstResend", JSON.stringify(data));
}

export function setSecondResend(value, date) {
  const data = {
    recoveryData: value,
    date: date,
  };

  window.localStorage.setItem("secondResend", JSON.stringify(data));
}

export function setThirdResend(value, date) {
  const data = {
    recoveryData: value,
    date: date,
  };

  window.localStorage.setItem("thirdResend", JSON.stringify(data));
}

export function getFirstResend() {
  return JSON.parse(window.localStorage.getItem("firstResend"));
}

export function getSecondResend() {
  return JSON.parse(window.localStorage.getItem("secondResend"));
}

export function getThirdResend() {
  return JSON.parse(window.localStorage.getItem("thirdResend"));
}

export function removeResend() {
  localStorage.removeItem("firstResend");
  localStorage.removeItem("secondResend");
  localStorage.removeItem("thirdResend");
}
