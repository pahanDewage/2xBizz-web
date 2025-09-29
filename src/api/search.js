/* eslint-disable */

// Frontend-only search functions that work with existing data
// No API calls - only searches through data already loaded in the frontend

// Cache for loaded data to avoid multiple API calls
let cachedBlogs = [];
let cachedCompanies = [];
let dataCacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to get cached data
export const getCachedData = () => {
  const now = Date.now();
  if (dataCacheTimestamp && (now - dataCacheTimestamp) < CACHE_DURATION) {
    return { blogs: cachedBlogs, companies: cachedCompanies };
  }
  return null;
};

// Helper function to set cached data
export const setCachedData = (blogs, companies) => {
  cachedBlogs = blogs;
  cachedCompanies = companies;
  dataCacheTimestamp = Date.now();
};

// Search across all content types using existing frontend data
export const searchAll = (query, allBlogs = [], allCompanies = []) => {
  try {
    const blogs = searchBlogs(query, allBlogs);
    const companies = searchCompanies(query, allCompanies);

    const results = {
      blogs: blogs,
      companies: companies,
      total: blogs.length + companies.length
    };

    return results;
  } catch (error) {
    console.error('Error in searchAll:', error);
    return { blogs: [], companies: [], total: 0 };
  }
};

// Search blogs using existing frontend data
export const searchBlogs = (query, allBlogs = []) => {
  if (!query || !allBlogs || allBlogs.length === 0) return [];
  
  return localSearch(allBlogs, query, ['title', 'excerpt', 'description', 'categoryName', 'author']);
};

// Search companies using existing frontend data
export const searchCompanies = (query, allCompanies = []) => {
  if (!query || !allCompanies || allCompanies.length === 0) return [];
  
  return localSearch(allCompanies, query, ['name', 'description', 'sector', 'industry']);
};

// Get search suggestions using existing frontend data
export const getSearchSuggestions = (query, allBlogs = [], allCompanies = []) => {
  if (!query || query.length < 2) return [];

  const suggestions = new Set();
  const queryLower = query.toLowerCase();
  
  // Add blog-related suggestions
  if (allBlogs && allBlogs.length > 0) {
    allBlogs.forEach(blog => {
      if (blog.title) {
        const words = blog.title.toLowerCase().split(/\s+/);
        words.forEach(word => {
          if (word.length > 3 && word.includes(queryLower)) {
            suggestions.add(word);
          }
        });
      }
      if (blog.categoryName && blog.categoryName.toLowerCase().includes(queryLower)) {
        suggestions.add(blog.categoryName.toLowerCase());
      }
    });
  }

  // Add company-related suggestions
  if (allCompanies && allCompanies.length > 0) {
    allCompanies.forEach(company => {
      if (company.name) {
        const words = company.name.toLowerCase().split(/\s+/);
        words.forEach(word => {
          if (word.length > 2 && word.includes(queryLower)) {
            suggestions.add(word);
          }
        });
      }
      if (company.sector && company.sector.toLowerCase().includes(queryLower)) {
        suggestions.add(company.sector.toLowerCase());
      }
    });
  }

  // Add common business terms
  const commonTerms = [
    'market analysis', 'stock performance', 'investment strategy', 
    'business growth', 'financial planning', 'portfolio management',
    'trading', 'stocks', 'crypto', 'analysis', 'trends', 'insights',
    'technology', 'finance', 'business', 'investment', 'growth'
  ];
  
  commonTerms.forEach(term => {
    if (term.includes(queryLower)) {
      suggestions.add(term);
    }
  });

  return Array.from(suggestions).slice(0, 10);
};

// Enhanced local search function with keyword matching
export const localSearch = (items, query, searchFields = ['title', 'name']) => {
  if (!query || !items || !Array.isArray(items)) return [];
  
  const searchTerm = query.toLowerCase().trim();
  if (searchTerm.length === 0) return [];
  
  const keywords = searchTerm.split(/\s+/).filter(keyword => keyword.length > 0);
  
  return items.filter(item => {
    if (!item || typeof item !== 'object') return false;
    
    // Check if all keywords are found in any of the search fields
    return keywords.every(keyword => {
      return searchFields.some(field => {
        const value = item[field];
        if (!value || typeof value !== 'string') return false;
        
        const fieldValue = value.toLowerCase();
        
        // Exact phrase match (higher priority)
        if (fieldValue.includes(searchTerm)) return true;
        
        // Individual keyword match
        if (fieldValue.includes(keyword)) return true;
        
        // Partial word match for longer keywords
        if (keyword.length > 2) {
          const words = fieldValue.split(/\s+/);
          return words.some(word => word.startsWith(keyword) || word.includes(keyword));
        }
        
        return false;
      });
    });
  }).sort((a, b) => {
    // Sort by relevance - exact matches first
    const aScore = calculateRelevanceScore(a, searchTerm, searchFields);
    const bScore = calculateRelevanceScore(b, searchTerm, searchFields);
    return bScore - aScore;
  });
};

// Calculate relevance score for search results
const calculateRelevanceScore = (item, searchTerm, searchFields) => {
  let score = 0;
  const searchLower = searchTerm.toLowerCase();
  
  searchFields.forEach(field => {
    const value = item[field];
    if (!value) return;
    
    const fieldValue = value.toLowerCase();
    
    // Exact match gets highest score
    if (fieldValue === searchLower) {
      score += 100;
    }
    // Starts with search term
    else if (fieldValue.startsWith(searchLower)) {
      score += 50;
    }
    // Contains exact phrase
    else if (fieldValue.includes(searchLower)) {
      score += 30;
    }
    // Contains individual keywords
    else {
      const keywords = searchLower.split(/\s+/);
      keywords.forEach(keyword => {
        if (fieldValue.includes(keyword)) {
          score += 10;
        }
      });
    }
  });
  
  return score;
};
