/* eslint-disable */
import api from './axios';

// Search across all content types
export const searchAll = async (query) => {
  try {
    const [blogsResponse, companiesResponse] = await Promise.allSettled([
      searchBlogs(query),
      searchCompanies(query)
    ]);

    const results = {
      blogs: blogsResponse.status === 'fulfilled' ? blogsResponse.value : [],
      companies: companiesResponse.status === 'fulfilled' ? companiesResponse.value : [],
      total: 0
    };

    results.total = results.blogs.length + results.companies.length;
    return results;
  } catch (error) {
    console.error('Error in searchAll:', error);
    throw new Error('Failed to search content. Please try again.');
  }
};

// Search blogs
export const searchBlogs = async (query) => {
  try {
    const response = await api.get(`/blogs?search=${encodeURIComponent(query)}`);
    return response.data || [];
  } catch (error) {
    console.error('Error searching blogs:', error);
    // Fallback: search locally if API fails
    return [];
  }
};

// Search companies/portfolio
export const searchCompanies = async (query) => {
  try {
    const response = await api.get(`/companies?search=${encodeURIComponent(query)}`);
    return response.data || [];
  } catch (error) {
    console.error('Error searching companies:', error);
    // Fallback: search locally if API fails
    return [];
  }
};

// Get search suggestions
export const getSearchSuggestions = async (query) => {
  try {
    const response = await api.get(`/search/suggestions?q=${encodeURIComponent(query)}`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching search suggestions:', error);
    // Return common business/investment terms as fallback
    const suggestions = [
      'market analysis', 'stock performance', 'investment strategy', 
      'business growth', 'financial planning', 'portfolio management'
    ];
    return suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));
  }
};

// Local search function for client-side filtering
export const localSearch = (items, query, searchFields = ['title', 'name']) => {
  if (!query || !items) return items;
  
  const searchTerm = query.toLowerCase().trim();
  return items.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      return value && value.toLowerCase().includes(searchTerm);
    });
  });
};
