import { axiosAuthenticated, apiLinks } from "./services.js";

export async function fetchUserProfile() {
  try {
    const response = await axiosAuthenticated.get(apiLinks.profile);
    return response?.data;
  } catch (errors) {
    console.log(errors);
    return null;
  }
}

export async function fetchUserBlogPosts() {
  try {
    const response = await axiosAuthenticated.get(apiLinks.blogPosts);
    return response?.data;
  } catch (errors) {
    console.log(errors);
    return null;
  }
}

export async function fetchBlogStats(post_id) {
  try {
    const response = await axiosAuthenticated.get(apiLinks.blogStats + post_id);
    return response?.data;
  } catch (errors) {
    console.log(errors);
    return null;
  }
}
