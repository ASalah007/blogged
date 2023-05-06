import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

export const apiURL = "http://127.0.0.1:8000/api/";
export const homeURL = "http://127.0.0.1:3000/";

export const apiLinks = {
  refresh: "token/refresh",
  signin: "token/",
  signup: "users/signup/",
  profile: "users/profile/",
  blogPosts: "blogs/list/",
  blogStats: "blogs/stats/",
};

for (let key of Object.keys(apiLinks)) {
  apiLinks[key] = apiURL + apiLinks[key];
}

axios.defaults.baseURL = apiURL;

export const axiosAuthenticated = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export function isTokenValid(token) {
  if (!token) return false;
  const jwt_object = jwt_decode(token);
  return jwt_object.exp && jwt_object.exp * 1000 > Date.now();
}

axiosAuthenticated.interceptors.request.use(async function (config) {
  const cookies = new Cookies();

  // put access_token if it is valid in the header
  const access_token = cookies.get("access");
  if (isTokenValid(access_token)) {
    config.headers.Authorization = "Bearer " + access_token;
    return config;
  }

  // if refresh token valid ask for access token and put it in the header
  const refresh_token = cookies.get("refresh");
  if (isTokenValid(refresh_token)) {
    const response = await axios.post(apiLinks.refresh, {
      refresh: refresh_token,
    });
    cookies.set("access", response.data.access);
    config.headers.Authorization = "Bearer " + response.data.access;
    return config;
  }

  const controller = new AbortController();
  controller.abort();

  return {
    ...config,
    signal: controller.signal,
  };
});
