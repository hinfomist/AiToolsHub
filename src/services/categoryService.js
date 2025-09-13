import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toolService } from './toolService';
import { blogService } from './blogService';

export const categoryService = {
  // Get all categories from shared collection
  async getAllCategories() {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      return categories;
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  },

  // Get both tools and blogs for a category
  async getCategoryContent(categoryName, toolsLimit = 10, blogsLimit = 10) {
    try {
      const [tools, blogs] = await Promise.all([
        toolService.getToolsByCategory(categoryName),
        blogService.getBlogsByCategory(categoryName, blogsLimit)
      ]);

      return { tools, blogs };
    } catch (error) {
      console.error('Error getting category content:', error);
      return { tools: [], blogs: [] };
    }
  },

  // Get tools in a category for linking to blogs
  async getToolsInCategory(categoryName) {
    try {
      const tools = await toolService.getToolsByCategory(categoryName);
      return tools.map(tool => ({
        id: tool.id,
        name: tool.name,
        description: tool.description
      }));
    } catch (error) {
      console.error('Error getting tools in category:', error);
      return [];
    }
  },

  // Get category counts for both tools and blogs
  async getCategoryCounts() {
    try {
      const [toolCounts, blogCounts] = await Promise.all([
        toolService.getCategoryCounts(),
        this.getBlogCategoryCounts()
      ]);

      const combinedCounts = {};
      
      // Combine tool counts
      Object.entries(toolCounts).forEach(([category, count]) => {
        combinedCounts[category] = {
          tools: count,
          blogs: blogCounts[category] || 0,
          total: count + (blogCounts[category] || 0)
        };
      });

      // Add blog-only categories
      Object.entries(blogCounts).forEach(([category, count]) => {
        if (!combinedCounts[category]) {
          combinedCounts[category] = {
            tools: 0,
            blogs: count,
            total: count
          };
        }
      });

      return combinedCounts;
    } catch (error) {
      console.error('Error getting category counts:', error);
      return {};
    }
  },

  // Get detailed tool counts specifically for admin
  async getAdminCategoryCounts() {
    try {
      const allCategories = await this.getAllCategories();
      const allTools = await toolService.getAllTools();
      
      const counts = {};
      
      // Initialize all categories with 0 count
      allCategories.forEach(category => {
        counts[category.name] = 0;
      });
      
      // Count tools for each category
      allTools.forEach(tool => {
        // Handle both old single category and new categories array
        const categories = Array.isArray(tool.categories) ? tool.categories : [tool.category];
        categories.forEach(category => {
          if (category && counts.hasOwnProperty(category)) {
            counts[category]++;
          }
        });
      });
      
      return counts;
    } catch (error) {
      console.error('Error getting admin category counts:', error);
      return {};
    }
  },

  async getBlogCategoryCounts() {
    try {
      const blogs = await blogService.getAllBlogs('published', 1000); // Get all blogs for counting
      const counts = {};
      
      blogs.blogs.forEach(blog => {
        if (blog.categories && Array.isArray(blog.categories)) {
          blog.categories.forEach(category => {
            counts[category] = (counts[category] || 0) + 1;
          });
        }
      });
      
      return counts;
    } catch (error) {
      console.error('Error getting blog category counts:', error);
      return {};
    }
  }
};