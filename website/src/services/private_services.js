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
    return [];
  }
}

export async function fetchBlogStats(post_id) {
  try {
    const response = await axiosAuthenticated.get(apiLinks.blogStats + post_id);
    return response?.data;
  } catch (errors) {
    console.log(errors);
    return [];
  }
}

export async function publishPost(postId) {
  const body = { pub_date: new Date().toISOString() };
  try {
    const response = await axiosAuthenticated.patch(
      apiLinks.blogUpdate + postId + "/",
      body
    );
    return response.data;
  } catch (errors) {
    console.log(errors);
    return null;
  }
}

export async function draftPost(postId) {
  const body = { pub_date: null };
  try {
    const response = await axiosAuthenticated.patch(
      apiLinks.blogUpdate + postId + "/",
      body
    );
    return response.data;
  } catch (errors) {
    console.log(errors);
    return null;
  }
}
