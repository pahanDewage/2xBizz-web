/* eslint-disable */
import api from './axios';

//? Get all blog posts
export const fetchBlogs = async () => {
  try {
    const response = await api.get('/blogs');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error('Failed to fetch blog posts. Please try again.');
  }
};

//? Get a single blog post
export const fetchBlogById = async (id) => {
  try {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw new Error('Failed to fetch blog post. Please try again.');
  }
};

//? get favorite blog details
export const fetchFavoriteBlogs = async (uid) => {
  try {
    const response = await api.get(`/blogs/favourites/${uid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Favorite blog `, error);
    throw new Error('Failed to fetch Favorite blog posts. Please try again.');
  }
}

//? Get random blogs
export const getRandomBlogs = async () => {
  try {
    const response = await api.get('/blogs/random/category');
    return response.data;
  } catch (error) {
    console.error(`Error fetching Random blog `, error);
    throw new Error('Failed to fetch Random blog posts. Please try again.');
  }
}

