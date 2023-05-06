import axios from "axios";
import { apiLinks } from "./services";
import Cookies from "universal-cookie";
import { isTokenValid } from "./services";

export async function signIn(credentials) {
  try {
    const response = await axios.post(apiLinks.signin, credentials);
    return response?.data;
  } catch (error) {
    return null;
  }
}

export async function signUp(credentials) {
  try {
    const response = await axios.post(apiLinks.signup, credentials);
    return response?.data;
  } catch (errors) {
    return { errors: errors.response.data };
  }
}

export function isAuthenticated() {
  const cookies = new Cookies();
  if (isTokenValid(cookies.get("access"))) return true;
  if (isTokenValid(cookies.get("refresh"))) return true;

  return false;
}
