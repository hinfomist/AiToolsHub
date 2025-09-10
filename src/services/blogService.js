import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, orderBy, limit, startAfter, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

const BLOGS_COLLECTION = 'blogs';
const CATEGORIES_COLLECTION = 'categories'; // Shared with tools
const TAGS_COLLECTION = 'tags';

export const blogService = {
  // Blog CRUD operations
  async addBlog(blogData) {
    try {
      console.log('Adding blog to Firestore...', blogData);
      
      // Validate required fields
      if (!blogData.title || !blogData.content) {
        throw new Error('Title and content are required');
      }
      
      const docRef = await addDoc(collection(db, BLOGS_COLLECTION), {
        ...blogData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0,
        likes: 0
      });
      
      console.log('Blog added successfully with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding blog:', error);
      
      // Provide more specific error messages
      if (error.code === 'permission-denied') {
        throw new Error('Permission denied. Please check Firebase security rules.');
      } else if (error.code === 'unavailable') {
        throw new Error('Firebase service is currently unavailable. Please try again later.');
      } else if (error.code === 'unauthenticated') {
        throw new Error('Authentication required. Please log in and try again.');
      }
      
      throw error;
    }
  },

  async updateBlog(id, blogData) {
    try {
      const blogRef = doc(db, BLOGS_COLLECTION, id);
      await updateDoc(blogRef, {
        ...blogData,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  async deleteBlog(id) {
    try {
      const blogRef = doc(db, BLOGS_COLLECTION, id);
      await deleteDoc(blogRef);
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },

  async getBlogById(id) {
    try {
      const blogRef = doc(db, BLOGS_COLLECTION, id);
      const blogSnap = await getDoc(blogRef);
      
      if (blogSnap.exists()) {
        return { id: blogSnap.id, ...blogSnap.data() };
      } else {
        throw new Error('Blog not found');
      }
    } catch (error) {
      console.error('Error getting blog:', error);
      throw error;
    }
  },

  async getBlogBySlug(slug) {
    try {
      const q = query(collection(db, BLOGS_COLLECTION), where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error('Blog not found');
      }
    } catch (error) {
      console.error('Error getting blog by slug:', error);
      throw error;
    }
  },

  async getAllBlogs(status = 'published', pageLimit = 10, lastDoc = null) {
    try {
      // Avoid Firestore composite index by not ordering here; sort in JS instead
      let q = query(
        collection(db, BLOGS_COLLECTION),
        where('status', '==', status),
        limit(pageLimit)
      );

      if (lastDoc) {
        q = query(
          collection(db, BLOGS_COLLECTION),
          where('status', '==', status),
          startAfter(lastDoc),
          limit(pageLimit)
        );
      }

      const querySnapshot = await getDocs(q);
      let blogs = [];
      let lastVisible = null;

      querySnapshot.forEach((docSnap) => {
        blogs.push({ id: docSnap.id, ...docSnap.data() });
        lastVisible = docSnap;
      });

      // Sort by createdAt desc in JS for consistent UI
      blogs.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || (a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(a.createdAt || 0));
        const bTime = b.createdAt?.toDate?.() || (b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(b.createdAt || 0));
        return bTime.getTime() - aTime.getTime();
      });

      return { blogs, lastVisible, hasMore: querySnapshot.docs.length === pageLimit };
    } catch (error) {
      console.error('Error getting blogs:', error);
      throw error;
    }
  },

  async getBlogsByCategory(category, pageLimit = 10) {
    try {
      const q = query(
        collection(db, BLOGS_COLLECTION),
        where('categories', 'array-contains', category),
        where('status', '==', 'published'),
        limit(pageLimit)
      );

      const querySnapshot = await getDocs(q);
      const blogs = [];

      querySnapshot.forEach((docSnap) => {
        blogs.push({ id: docSnap.id, ...docSnap.data() });
      });

      // Sort by createdAt desc in JS
      blogs.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || (a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(a.createdAt || 0));
        const bTime = b.createdAt?.toDate?.() || (b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(b.createdAt || 0));
        return bTime.getTime() - aTime.getTime();
      });

      return blogs;
    } catch (error) {
      console.error('Error getting blogs by category:', error);
      throw error;
    }
  },

  async getBlogsByRelatedTool(toolId, pageLimit = 10) {
    try {
      const q = query(
        collection(db, BLOGS_COLLECTION),
        where('relatedToolId', '==', toolId),
        where('status', '==', 'published'),
        limit(pageLimit)
      );

      const querySnapshot = await getDocs(q);
      const blogs = [];

      querySnapshot.forEach((docSnap) => {
        blogs.push({ id: docSnap.id, ...docSnap.data() });
      });

      // Sort by createdAt desc in JS
      blogs.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || (a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(a.createdAt || 0));
        const bTime = b.createdAt?.toDate?.() || (b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(b.createdAt || 0));
        return bTime.getTime() - aTime.getTime();
      });

      return blogs;
    } catch (error) {
      console.error('Error getting blogs by related tool:', error);
      throw error;
    }
  }

  async getBlogsByTag(tag, pageLimit = 10) {
    try {
      const q = query(
        collection(db, BLOGS_COLLECTION),
        where('tags', 'array-contains', tag),
        where('status', '==', 'published'),
        limit(pageLimit)
      );

      const querySnapshot = await getDocs(q);
      const blogs = [];

      querySnapshot.forEach((docSnap) => {
        blogs.push({ id: docSnap.id, ...docSnap.data() });
      });

      // Sort by createdAt desc in JS
      blogs.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || (a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(a.createdAt || 0));
        const bTime = b.createdAt?.toDate?.() || (b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(b.createdAt || 0));
        return bTime.getTime() - aTime.getTime();
      });

      return blogs;
    } catch (error) {
      console.error('Error getting blogs by tag:', error);
      throw error;
    }
  }

  async getRelatedBlogs(currentBlogId, tags, categories, pageLimit = 3) {
    try {
      const q = query(
        collection(db, BLOGS_COLLECTION),
        where('status', '==', 'published'),
        limit(pageLimit + 10) // Fetch extra and filter client-side
      );

      const querySnapshot = await getDocs(q);
      const blogs = [];

      querySnapshot.forEach((docSnap) => {
        const blog = { id: docSnap.id, ...docSnap.data() };
        if (blog.id !== currentBlogId) {
          const hasCommonTags = blog.tags?.some(tag => tags?.includes(tag));
          const hasCommonCategories = blog.categories?.some(cat => categories?.includes(cat));
          if (hasCommonTags || hasCommonCategories) {
            blogs.push(blog);
          }
        }
      });

      // Sort by createdAt desc and limit
      blogs.sort((a, b) => {
        const aTime = a.createdAt?.toDate?.() || (a.createdAt?.seconds ? new Date(a.createdAt.seconds * 1000) : new Date(a.createdAt || 0));
        const bTime = b.createdAt?.toDate?.() || (b.createdAt?.seconds ? new Date(b.createdAt.seconds * 1000) : new Date(b.createdAt || 0));
        return bTime.getTime() - aTime.getTime();
      });

      return blogs.slice(0, pageLimit);
    } catch (error) {
      console.error('Error getting related blogs:', error);
      throw error;
    }
  }

  async incrementViews(id) {
    try {
      const blogRef = doc(db, BLOGS_COLLECTION, id);
      const blogSnap = await getDoc(blogRef);
      
      if (blogSnap.exists()) {
        const currentViews = blogSnap.data().views || 0;
        await updateDoc(blogRef, {
          views: currentViews + 1
        });
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  },

  // File upload
  async uploadImage(file, path = 'blogImages/') {
    try {
      console.log('Starting image upload:', file.name, file.size);
      
      // Create a unique filename
      const timestamp = Date.now();
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filename = `${path}${timestamp}_${cleanFileName}`;
      
      console.log('Upload path:', filename);
      
      const storageRef = ref(storage, filename);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      console.log('Image uploaded successfully, URL:', downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      
      // Provide more specific error messages
      if (error.code === 'storage/unauthorized') {
        throw new Error('Permission denied for image upload. Please check Firebase storage rules.');
      } else if (error.code === 'storage/canceled') {
        throw new Error('Upload was canceled.');
      } else if (error.code === 'storage/quota-exceeded') {
        throw new Error('Storage quota exceeded.');
      } else if (error.code === 'storage/unauthenticated') {
        throw new Error('Authentication required for image upload.');
      }
      
      throw error;
    }
  },

  // Categories
  async getCategories() {
    try {
      const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      return categories;
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  },

  async addCategory(name) {
    try {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      const docRef = await addDoc(collection(db, CATEGORIES_COLLECTION), {
        name,
        slug
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  },

  // Tags
  async getTags() {
    try {
      const querySnapshot = await getDocs(collection(db, TAGS_COLLECTION));
      const tags = [];
      querySnapshot.forEach((doc) => {
        tags.push({ id: doc.id, ...doc.data() });
      });
      return tags;
    } catch (error) {
      console.error('Error getting tags:', error);
      throw error;
    }
  },

  async addTag(name) {
    try {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      const docRef = await addDoc(collection(db, TAGS_COLLECTION), {
        name,
        slug
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding tag:', error);
      throw error;
    }
  },

  // Utility functions
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
};