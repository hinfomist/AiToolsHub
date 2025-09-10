// Script to populate the shared categories collection
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase.js';

const categories = [
  { name: 'Content Writing', slug: 'content-writing', description: 'AI-powered writing and content creation tools' },
  { name: 'Image Generation', slug: 'image-generation', description: 'Create stunning visuals with AI image generators' },
  { name: 'Personal Assistants', slug: 'personal-assistants', description: 'AI assistants for daily tasks and productivity' },
  { name: 'Chatbots', slug: 'chatbots', description: 'Conversational AI and customer service bots' },
  { name: 'Sales', slug: 'sales', description: 'AI tools for sales automation and lead generation' },
  { name: 'Productivity', slug: 'productivity', description: 'Boost efficiency with AI productivity tools' },
  { name: 'Video Creation', slug: 'video-creation', description: 'AI-powered video editing and generation' },
  { name: 'Music Creation', slug: 'music-creation', description: 'Compose and generate music with AI' },
  { name: 'Customer Support', slug: 'customer-support', description: 'AI customer service and support solutions' },
  { name: 'Interview Prep', slug: 'interview-prep', description: 'AI-powered interview practice and preparation' },
  { name: 'AI Code Tools', slug: 'ai-code-tools', description: 'Code generation and development assistance' },
  { name: 'Resume Builder', slug: 'resume-builder', description: 'Create professional resumes with AI help' },
  { name: 'Email Assistants', slug: 'email-assistants', description: 'AI email writing and management tools' },
  { name: 'Data Analysis', slug: 'data-analysis', description: 'Analyze and visualize data with AI' },
  { name: 'PDF Tools', slug: 'pdf-tools', description: 'AI-powered PDF processing and analysis' },
  { name: 'Legal AI Tools', slug: 'legal-ai-tools', description: 'Legal document analysis and assistance' },
  { name: 'Language Translation', slug: 'language-translation', description: 'AI translation and language tools' },
  { name: 'Design Tools', slug: 'design-tools', description: 'AI-assisted design and creative tools' },
  { name: 'Avatars & Voice', slug: 'avatars-voice', description: 'AI avatars and voice synthesis' },
  { name: 'Marketing', slug: 'marketing', description: 'AI marketing automation and optimization' },
  { name: 'SEO Tools', slug: 'seo-tools', description: 'AI-powered SEO analysis and optimization' },
  { name: 'Logo Generator', slug: 'logo-generator', description: 'Create logos and brand assets with AI' },
  { name: 'Storytelling AI', slug: 'storytelling-ai', description: 'AI-powered story and narrative creation' },
  { name: 'Course Generator', slug: 'course-generator', description: 'Create educational content with AI' },
  { name: 'Business Plan Tools', slug: 'business-plan-tools', description: 'AI business planning and strategy tools' },
  { name: 'Prompt Marketplace', slug: 'prompt-marketplace', description: 'Buy and sell AI prompts and templates' }
];

async function populateCategories() {
  try {
    console.log('Starting to populate categories...');

    // Check if categories already exist
    const existingCategories = await getDocs(collection(db, 'categories'));
    if (!existingCategories.empty) {
      console.log('Categories already exist. Skipping population.');
      return;
    }

    // Add each category
    for (const category of categories) {
      console.log(`Adding category: ${category.name}`);
      await addDoc(collection(db, 'categories'), {
        ...category,
        createdAt: new Date()
      });
    }

    console.log('✅ Categories populated successfully!');
    console.log(`Added ${categories.length} categories to the database.`);

  } catch (error) {
    console.error('❌ Error populating categories:', error);
    
    if (error.code === 'permission-denied') {
      console.error('Permission denied. Make sure you are authenticated and have write permissions.');
    } else if (error.code === 'unavailable') {
      console.error('Firebase service unavailable. Check your connection and try again.');
    }
  }
}

// Run the script
populateCategories();