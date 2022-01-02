import { ONE_TIME_TRANSACTION } from "./types";

export const setOTP = (otp) => ({
  type: ONE_TIME_TRANSACTION,
  otp,
});
