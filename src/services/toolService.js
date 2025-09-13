import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const toolService = {
  // Get all approved tools
  async getAllTools() {
    try {
      const toolsRef = collection(db, 'tools');
      const q = query(toolsRef, where('approved', '==', true));
      const querySnapshot = await getDocs(q);
      
      const tools = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
      
      // Sort by createdAt in JavaScript instead of Firestore
      return tools.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error fetching tools:', error);
      return [];
    }
  },

  // Get ALL tools (including non-approved) for admin
  async getAllToolsAdmin() {
    try {
      const toolsRef = collection(db, 'tools');
      const querySnapshot = await getDocs(toolsRef);
      
      const tools = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
      
      // Sort by createdAt in JavaScript instead of Firestore
      return tools.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error fetching all tools:', error);
      return [];
    }
  },

  // Get tools by category
  async getToolsByCategory(categoryName) {
    try {
      console.log('Searching for category:', categoryName);
      const toolsRef = collection(db, 'tools');
      const q = query(
        toolsRef, 
        where('approved', '==', true),
        where('categories', 'array-contains', categoryName)
      );
      const querySnapshot = await getDocs(q);
      
      let tools = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));

      // If no tools found with categories array, try with old category field
      if (tools.length === 0) {
        console.log('No tools found with categories array, trying category field');
        const q2 = query(
          toolsRef, 
          where('approved', '==', true),
          where('category', '==', categoryName)
        );
        const querySnapshot2 = await getDocs(q2);
        tools = querySnapshot2.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
        }));
      }

      console.log('Found tools:', tools);
      
      // Sort by createdAt in JavaScript instead of Firestore
      return tools.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error fetching tools by category:', error);
      return [];
    }
  },

  // Get pending tools (for admin)
  async getPendingTools() {
    try {
      const toolsRef = collection(db, 'tools');
      const q = query(toolsRef, where('approved', '==', false));
      const querySnapshot = await getDocs(q);
      
      const tools = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
      
      // Sort by createdAt in JavaScript instead of Firestore
      return tools.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error fetching pending tools:', error);
      return [];
    }
  },

  // Check if tool exists by name
  async toolExists(toolName) {
    try {
      const toolsRef = collection(db, 'tools');
      const q = query(toolsRef, where('name', '==', toolName));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking if tool exists:', error);
      return false;
    }
  },

  // Add a new tool (admin) with duplicate checking
  async addTool(toolData) {
    try {
      // Check if tool already exists
      const exists = await this.toolExists(toolData.name);
      if (exists) {
        console.log(`Tool "${toolData.name}" already exists, skipping...`);
        return null;
      }

      const docRef = await addDoc(collection(db, 'tools'), {
        ...toolData,
        approved: true, // Admin tools are automatically approved
        votes: 0,
        views: 0,
        rating: 0,
        totalRatings: 0,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding tool:', error);
      throw error;
    }
  },

  // Submit tool (user submission - needs approval)
  async submitTool(toolData) {
    try {
      const docRef = await addDoc(collection(db, 'tools'), {
        ...toolData,
        approved: false, // User submissions need approval
        votes: 0,
        views: 0,
        rating: 0,
        totalRatings: 0,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error submitting tool:', error);
      throw error;
    }
  },

  // Update tool
  async updateTool(toolId, toolData) {
    try {
      const toolRef = doc(db, 'tools', toolId);
      await updateDoc(toolRef, {
        ...toolData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating tool:', error);
      throw error;
    }
  },

  // Delete tool
  async deleteTool(toolId) {
    try {
      await deleteDoc(doc(db, 'tools', toolId));
    } catch (error) {
      console.error('Error deleting tool:', error);
      throw error;
    }
  },

  // Get single tool
  async getTool(toolId) {
    try {
      const toolRef = doc(db, 'tools', toolId);
      const toolSnap = await getDoc(toolRef);
      
      if (toolSnap.exists()) {
        return {
          id: toolSnap.id,
          ...toolSnap.data(),
          createdAt: toolSnap.data().createdAt?.toDate?.()?.toISOString() || toolSnap.data().createdAt
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching tool:', error);
      return null;
    }
  },

  // Approve tool
  async approveTool(toolId) {
    try {
      const toolRef = doc(db, 'tools', toolId);
      await updateDoc(toolRef, {
        approved: true,
        approvedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error approving tool:', error);
      throw error;
    }
  },

  // Get category counts
  async getCategoryCounts() {
    try {
      const tools = await this.getAllTools();
      const counts = {};
      
      tools.forEach(tool => {
        // Handle both old single category and new categories array
        const categories = Array.isArray(tool.categories) ? tool.categories : [tool.category];
        categories.forEach(category => {
          if (category) {
            counts[category] = (counts[category] || 0) + 1;
          }
        });
      });
      
      return counts;
    } catch (error) {
      console.error('Error getting category counts:', error);
      return {};
    }
  },

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
  }
};