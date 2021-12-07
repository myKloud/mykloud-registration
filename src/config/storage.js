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
