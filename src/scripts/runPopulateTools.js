import { toolService } from '../services/toolService.js';

const toolsToAdd = [
  // Content Writing (5 tools)
  {
    name: 'ChatGPT',
    description: 'Advanced conversational AI that can help with writing, coding, analysis, and creative tasks.',
    fullDescription: 'ChatGPT is an advanced conversational AI developed by OpenAI that can assist with a wide variety of tasks including writing, coding, analysis, creative projects, and problem-solving. Built on the GPT-4 architecture, it provides intelligent, context-aware responses and can maintain coherent conversations across multiple topics.',
    category: 'Content Writing',
    categories: ['Content Writing'],
    tags: ['Chat', 'Writing', 'Assistant', 'GPT-4'],
    logoUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
    websiteUrl: 'https://chat.openai.com',
    highlights: ['Free tier available', 'API access', 'Mobile app'],
    pricing: 'Freemium - $20/month for Plus',
    isPaid: false,
    createdBy: 'OpenAI'
  },
  {
    name: 'Jasper AI',
    description: 'AI writing assistant for marketing copy, blog posts, and business content.',
    fullDescription: 'Jasper AI is a powerful writing assistant designed specifically for marketers, content creators, and businesses. It helps create high-quality marketing copy, blog posts, social media content, and more with advanced AI technology.',
    category: 'Content Writing',
    categories: ['Content Writing'],
    tags: ['Marketing', 'Copywriting', 'Blog', 'Business'],
    logoUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=100&h=100&fit=crop',
    websiteUrl: 'https://jasper.ai',
    highlights: ['SEO optimized', 'Templates library', 'Team collaboration'],
    pricing: 'Paid - $39/month',
    isPaid: true,
    createdBy: 'Jasper AI'
  },
  {
    name: 'Copy.ai',
    description: 'AI-powered copywriter for ads, emails, and website content.',
    fullDescription: 'Copy.ai helps businesses create compelling copy for various marketing materials including ads, emails, product descriptions, and website content using advanced AI algorithms.',
    category: 'Content Writing',
    categories: ['Content Writing'],
    tags: ['Copywriting', 'Marketing', 'Ads', 'Email'],
    logoUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
    websiteUrl: 'https://copy.ai',
    highlights: ['Free plan available', '90+ templates', 'Multi-language'],
    pricing: 'Freemium - $36/month for Pro',
    isPaid: false,
    createdBy: 'Copy.ai'
  },

  // Personal Assistants (3 tools)
  {
    name: 'Siri',
    description: 'Apple\'s intelligent personal assistant for iOS, macOS, and more.',
    fullDescription: 'Siri is Apple\'s intelligent personal assistant that helps users get things done using voice commands. It can send messages, make calls, set reminders, and control smart home devices.',
    category: 'Personal Assistants',
    categories: ['Personal Assistants'],
    tags: ['Voice Assistant', 'iOS', 'Smart Home', 'Apple'],
    logoUrl: 'https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?w=100&h=100&fit=crop',
    websiteUrl: 'https://apple.com/siri',
    highlights: ['Voice commands', 'Smart home control', 'Cross-device sync'],
    pricing: 'Free with Apple devices',
    isPaid: false,
    createdBy: 'Apple'
  },
  {
    name: 'Google Assistant',
    description: 'Google\'s AI-powered virtual assistant for smart devices.',
    fullDescription: 'Google Assistant is an AI-powered virtual assistant that can engage in two-way conversations, answer questions, make appointments, control smart home devices, and much more.',
    category: 'Personal Assistants',
    categories: ['Personal Assistants'],
    tags: ['Voice Assistant', 'Google', 'Smart Home', 'Android'],
    logoUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
    websiteUrl: 'https://assistant.google.com',
    highlights: ['Conversational AI', 'Smart home integration', 'Multi-device'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'Google'
  },
  {
    name: 'Alexa',
    description: 'Amazon\'s cloud-based voice service for smart devices.',
    fullDescription: 'Amazon Alexa is a cloud-based voice service that powers Echo devices and other Alexa-enabled devices. It can play music, answer questions, control smart home devices, and provide various skills.',
    category: 'Personal Assistants',
    categories: ['Personal Assistants'],
    tags: ['Voice Assistant', 'Amazon', 'Smart Home', 'Echo'],
    logoUrl: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=100&h=100&fit=crop',
    websiteUrl: 'https://developer.amazon.com/alexa',
    highlights: ['Voice control', '100k+ skills', 'Smart home hub'],
    pricing: 'Free with Alexa devices',
    isPaid: false,
    createdBy: 'Amazon'
  },

  // Image Generation (3 tools)
  {
    name: 'DALL-E 3',
    description: 'OpenAI\'s advanced AI image generator that creates images from text descriptions.',
    fullDescription: 'DALL-E 3 is OpenAI\'s most advanced AI image generation model that can create highly detailed and accurate images from text descriptions with improved safety and quality.',
    category: 'Image Generation',
    categories: ['Image Generation'],
    tags: ['AI Art', 'Text-to-Image', 'Creative', 'OpenAI'],
    logoUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=100&h=100&fit=crop',
    websiteUrl: 'https://openai.com/dall-e-3',
    highlights: ['High quality images', 'Text understanding', 'Safe generation'],
    pricing: 'Paid - $0.040 per image',
    isPaid: true,
    createdBy: 'OpenAI'
  },
  {
    name: 'Midjourney',
    description: 'AI art generator that creates stunning images from text prompts.',
    fullDescription: 'Midjourney is an AI art generator that creates beautiful, artistic images from text descriptions. It\'s known for its unique artistic style and high-quality outputs.',
    category: 'Image Generation',
    categories: ['Image Generation'],
    tags: ['AI Art', 'Artistic', 'Discord Bot', 'Creative'],
    logoUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop',
    websiteUrl: 'https://midjourney.com',
    highlights: ['Artistic style', 'High quality', 'Community driven'],
    pricing: 'Paid - $10/month Basic',
    isPaid: true,
    createdBy: 'Midjourney'
  },
  {
    name: 'Stable Diffusion',
    description: 'Open-source AI image generator for creating detailed images from text.',
    fullDescription: 'Stable Diffusion is an open-source AI model that generates detailed images from text descriptions. It\'s free to use and can be run locally or through various online platforms.',
    category: 'Image Generation',
    categories: ['Image Generation'],
    tags: ['Open Source', 'Text-to-Image', 'Free', 'Local'],
    logoUrl: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?w=100&h=100&fit=crop',
    websiteUrl: 'https://stability.ai',
    highlights: ['Open source', 'Free to use', 'Local installation'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'Stability AI'
  }
];

async function populateTools() {
  try {
    console.log('🚀 Starting tools population...');
    console.log(`📝 Found ${toolsToAdd.length} tools to add`);
    
    const addedTools = [];
    let skipped = 0;
    
    for (const tool of toolsToAdd) {
      try {
        console.log(`\n⏳ Adding tool: ${tool.name}`);
        const toolId = await toolService.addTool(tool);
        console.log(`✅ Successfully added ${tool.name} with ID: ${toolId}`);
        addedTools.push(tool);
      } catch (error) {
        if (error.message && error.message.includes('already exists')) {
          console.log(`⚠️  Tool ${tool.name} already exists, skipping...`);
          skipped++;
        } else {
          console.error(`❌ Error adding ${tool.name}:`, error);
        }
      }
    }
    
    console.log(`\n📊 Population summary:`);
    console.log(`✅ Successfully added: ${addedTools.length} tools`);
    console.log(`⚠️  Skipped (already exist): ${skipped} tools`);
    
    // Show category breakdown
    const categoryCount = {};
    addedTools.forEach(tool => {
      categoryCount[tool.category] = (categoryCount[tool.category] || 0) + 1;
    });
    
    console.log('\n📊 New tools added by category:');
    Object.entries(categoryCount).forEach(([category, count]) => {
      console.log(`${category}: ${count} tools`);
    });
    
  } catch (error) {
    console.error('❌ Error populating tools:', error);
  }
}

// Run the script
populateTools().then(() => {
  console.log('Script completed. Tools population finished.');
}).catch((error) => {
  console.error('Script failed:', error);
});