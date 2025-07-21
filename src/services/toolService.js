import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const toolService = {
  // Get all approved tools
  async getAllTools() {
    try {
      const toolsRef = collection(db, 'tools');
      const q = query(toolsRef, where('approved', '==', true), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
    } catch (error) {
      console.error('Error fetching tools:', error);
      return [];
    }
  },

  // Get tools by category
  async getToolsByCategory(categoryName) {
    try {
      const toolsRef = collection(db, 'tools');
      const q = query(
        toolsRef, 
        where('approved', '==', true),
        where('category', '==', categoryName),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
    } catch (error) {
      console.error('Error fetching tools by category:', error);
      return [];
    }
  },

  // Get pending tools (for admin)
  async getPendingTools() {
    try {
      const toolsRef = collection(db, 'tools');
      const q = query(toolsRef, where('approved', '==', false), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt
      }));
    } catch (error) {
      console.error('Error fetching pending tools:', error);
      return [];
    }
  },

  // Add a new tool (admin)
  async addTool(toolData) {
    try {
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
        counts[tool.category] = (counts[tool.category] || 0) + 1;
      });
      
      return counts;
    } catch (error) {
      console.error('Error getting category counts:', error);
      return {};
    }
  }
};