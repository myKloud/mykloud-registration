import { USER } from "./types";

export const setUserObj = (user) => ({
  type: USER,
  user,
});
