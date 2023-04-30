import axios from "axios";
import { apiLinks } from "./services";

export async function signIn(credentials) {
  try {
    const response = await axios.post(apiLinks.signin, credentials);
    return response?.data;
  } catch (error) {
    console.log(error);
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
