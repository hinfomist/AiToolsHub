import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const CATEGORIES = [
  "Content Writing", "Image Generation", "Personal Assistants", "Chatbots", 
  "Sales", "Productivity", "Video Creation", "Music Creation", "Customer Support", 
  "Interview Prep", "AI Code Tools", "Resume Builder", "Email Assistants", 
  "Data Analysis", "PDF Tools", "Legal AI Tools", "Language Translation", 
  "Design Tools", "Avatars & Voice", "Marketing", "SEO Tools", "Logo Generator", 
  "Storytelling AI", "Course Generator", "Business Plan Tools", "Prompt Marketplace"
];

const SAMPLE_TOOLS_PER_CATEGORY = {
  "Content Writing": [
    {
      name: "Grammarly",
      description: "AI-powered writing assistant that helps you write clearly and effectively",
      features: ["Grammar Check", "Tone Detection", "Plagiarism Check"],
      websiteUrl: "https://grammarly.com",
      tags: ["writing", "grammar", "editing"]
    },
    {
      name: "Writesonic", 
      description: "AI writing tool for creating marketing copy, articles, and content",
      features: ["Article Writing", "Ad Copy", "Blog Posts"],
      websiteUrl: "https://writesonic.com",
      tags: ["writing", "marketing", "content"]
    }
  ],
  "Image Generation": [
    {
      name: "DALL-E",
      description: "AI image generator that creates realistic images from text descriptions",
      features: ["Text to Image", "Art Generation", "Photo Editing"],
      websiteUrl: "https://openai.com/dall-e-2",
      tags: ["image", "art", "generation"]
    }
  ],
  "Chatbots": [
    {
      name: "ChatGPT",
      description: "Conversational AI assistant for various tasks and questions",
      features: ["Conversation", "Q&A", "Writing Help"],
      websiteUrl: "https://chat.openai.com",
      tags: ["chat", "assistant", "conversation"]
    }
  ]
};

const populateAllData = async () => {
  try {
    console.log('Starting data population...');
    
    // Check existing categories
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    const existingCategories = new Set();
    categoriesSnapshot.forEach(doc => {
      existingCategories.add(doc.data().name);
    });

    // Check existing tools
    const toolsSnapshot = await getDocs(collection(db, 'tools'));
    const existingTools = new Set();
    toolsSnapshot.forEach(doc => {
      existingTools.add(doc.data().name);
    });

    let categoriesAdded = 0;
    let toolsAdded = 0;

    // Add missing categories
    for (const categoryName of CATEGORIES) {
      if (!existingCategories.has(categoryName)) {
        const slug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        
        await addDoc(collection(db, 'categories'), {
          name: categoryName,
          slug: slug,
          description: `AI tools for ${categoryName.toLowerCase()}`,
          iconUrl: "",
          createdAt: serverTimestamp()
        });
        
        categoriesAdded++;
        console.log(`Added category: ${categoryName}`);
      }
    }

    // Add sample tools for key categories
    for (const [categoryName, tools] of Object.entries(SAMPLE_TOOLS_PER_CATEGORY)) {
      for (const tool of tools) {
        if (!existingTools.has(tool.name)) {
          await addDoc(collection(db, 'tools'), {
            ...tool,
            category: categoryName,
            categories: [categoryName], // Support both formats
            approved: true,
            votes: Math.floor(Math.random() * 50),
            views: Math.floor(Math.random() * 1000),
            rating: 0,
            totalRatings: 0,
            createdAt: serverTimestamp()
          });
          
          toolsAdded++;
          console.log(`Added tool: ${tool.name} to ${categoryName}`);
        }
      }
    }

    console.log(`Population complete: ${categoriesAdded} categories, ${toolsAdded} tools added`);
    return { categoriesAdded, toolsAdded };
    
  } catch (error) {
    console.error('Error populating data:', error);
    throw error;
  }
};

export { populateAllData };