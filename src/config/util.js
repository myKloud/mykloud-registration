export function generateOTP() {
  return Math.floor(Math.random() * 90000) + 10000;
}
