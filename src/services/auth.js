import { toast } from "react-toastify";
import http from "./http";

const apiEndPoint = `/user/users`;

const refreshTokenTime = 600000;

export async function login(user) {
  const info = {
    email: user.user_name,
    password: user.password,
  };
  const { headers, data } = await http.post(apiEndPoint, info);
  return data.user;
}

export async function logout() {
  const { status } = await http.delete(apiEndPoint);
  if (status !== 200) {
    return false;
  }
  return true;
}

export default {
  login,
  logout,
};
