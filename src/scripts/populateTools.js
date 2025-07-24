import { toolService } from '../services/toolService.js';

const toolsToAdd = [
  // Content Writing Tools
  {
    name: 'Jasper AI',
    description: 'AI-powered content creation platform for marketing teams and businesses.',
    fullDescription: 'Jasper AI is an advanced AI content creation platform that helps marketing teams, content creators, and businesses generate high-quality written content at scale. It offers templates for various content types including blog posts, social media content, email campaigns, and ad copy.',
    category: 'Content Writing',
    tags: ['AI Writing', 'Marketing', 'Content Creation', 'Blog Posts', 'Copywriting'],
    logoUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.jasper.ai',
    highlights: ['50+ content templates', 'Brand voice consistency', 'SEO optimization', 'Team collaboration'],
    pricing: 'Starting at $49/month',
    isPaid: true,
    createdBy: 'Jasper AI'
  },
  {
    name: 'Copy.ai',
    description: 'AI copywriter that helps you create compelling content for marketing and sales.',
    fullDescription: 'Copy.ai is an AI-powered copywriting tool that generates marketing copy, product descriptions, blog posts, and social media content. It uses advanced natural language processing to create engaging content that converts.',
    category: 'Content Writing',
    tags: ['Copywriting', 'Marketing Copy', 'Social Media', 'Product Descriptions'],
    logoUrl: 'https://images.unsplash.com/photo-1586953983027-d7508a64f4bb?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.copy.ai',
    highlights: ['90+ copywriting templates', 'Multiple languages', 'Tone adjustment', 'Free plan available'],
    pricing: 'Free - $49/month',
    isPaid: false,
    createdBy: 'Copy.ai'
  },
  {
    name: 'Writesonic',
    description: 'AI writing assistant for creating articles, blogs, ads, and marketing content.',
    fullDescription: 'Writesonic is an AI writing platform that helps create high-quality content including articles, blog posts, ads, product descriptions, and social media posts. It offers SEO-optimized content generation and supports multiple languages.',
    category: 'Content Writing',
    tags: ['AI Writing', 'SEO Content', 'Blog Writing', 'Ad Copy'],
    logoUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop',
    websiteUrl: 'https://writesonic.com',
    highlights: ['SEO-optimized content', '25+ languages', 'Factual content', 'API access'],
    pricing: 'Free - $19/month',
    isPaid: false,
    createdBy: 'Writesonic'
  },
  {
    name: 'Rytr',
    description: 'AI writing assistant that helps you create killer content instantly.',
    fullDescription: 'Rytr is an AI writing assistant that generates high-quality content for blogs, emails, ads, and more. It supports 30+ languages and 20+ tones of voice, making it versatile for various content creation needs.',
    category: 'Content Writing',
    tags: ['AI Writing', 'Content Generation', 'Multilingual', 'Email Writing'],
    logoUrl: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=100&h=100&fit=crop',
    websiteUrl: 'https://rytr.me',
    highlights: ['30+ languages', '20+ tones', 'Plagiarism checker', 'Chrome extension'],
    pricing: 'Free - $29/month',
    isPaid: false,
    createdBy: 'Rytr'
  },
  {
    name: 'Anyword',
    description: 'AI copywriting platform with predictive performance scoring.',
    fullDescription: 'Anyword is an AI-powered copywriting platform that not only generates content but also predicts its performance. It offers data-driven insights to optimize marketing copy, social media posts, and ad campaigns.',
    category: 'Content Writing',
    tags: ['AI Copywriting', 'Performance Prediction', 'Marketing', 'Data-Driven'],
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
    websiteUrl: 'https://anyword.com',
    highlights: ['Performance prediction', 'A/B testing', 'Brand guidelines', 'Analytics dashboard'],
    pricing: 'Starting at $39/month',
    isPaid: true,
    createdBy: 'Anyword'
  },

  // Image Generation Tools
  {
    name: 'Stability AI',
    description: 'Open-source AI system for generating images from text descriptions.',
    fullDescription: 'Stability AI offers Stable Diffusion, a powerful open-source AI model for generating high-quality images from text prompts. It provides various models and tools for creative professionals and developers.',
    category: 'Image Generation',
    tags: ['Text-to-Image', 'Open Source', 'Stable Diffusion', 'Art Generation'],
    logoUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop',
    websiteUrl: 'https://stability.ai',
    highlights: ['Open source models', 'High-quality output', 'Multiple model versions', 'API access'],
    pricing: 'Free - $20/month',
    isPaid: false,
    createdBy: 'Stability AI'
  },
  {
    name: 'Adobe Firefly',
    description: 'AI-powered creative tools integrated into Adobe Creative Suite.',
    fullDescription: 'Adobe Firefly is a family of AI-powered creative tools that generate images, text effects, and design elements. Integrated into Adobe Creative Suite, it helps designers and artists enhance their creative workflow.',
    category: 'Image Generation',
    tags: ['Adobe', 'Creative Suite', 'Text Effects', 'Design Elements'],
    logoUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=100&h=100&fit=crop',
    websiteUrl: 'https://firefly.adobe.com',
    highlights: ['Adobe integration', 'Commercial usage rights', 'Text effects', 'Vector generation'],
    pricing: 'Included with Adobe CC',
    isPaid: true,
    createdBy: 'Adobe'
  },
  {
    name: 'Canva AI',
    description: 'AI-powered design tools within the Canva platform.',
    fullDescription: 'Canva AI brings artificial intelligence to the popular design platform, offering features like Magic Design, Background Remover, and AI-generated images to streamline the design process for users.',
    category: 'Image Generation',
    tags: ['Design Platform', 'Magic Design', 'Background Removal', 'Templates'],
    logoUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.canva.com',
    highlights: ['Easy-to-use interface', 'Design templates', 'Background removal', 'Team collaboration'],
    pricing: 'Free - $15/month',
    isPaid: false,
    createdBy: 'Canva'
  },
  {
    name: 'Leonardo AI',
    description: 'Advanced AI image generator for creating production-quality visual assets.',
    fullDescription: 'Leonardo AI is a powerful AI image generation platform designed for creating production-quality visual assets. It offers fine-tuned models, advanced editing capabilities, and tools for game development, marketing, and creative projects.',
    category: 'Image Generation',
    tags: ['Production Quality', 'Game Assets', 'Fine-tuned Models', 'Advanced Editing'],
    logoUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=100&h=100&fit=crop',
    websiteUrl: 'https://leonardo.ai',
    highlights: ['Fine-tuned models', 'Realtime canvas', 'AI video generation', 'Commercial license'],
    pricing: 'Free - $48/month',
    isPaid: false,
    createdBy: 'Leonardo AI'
  },
  {
    name: 'RunwayML',
    description: 'AI-powered creative toolkit for video, image, and audio generation.',
    fullDescription: 'RunwayML is a comprehensive AI creative platform that offers tools for generating and editing videos, images, and audio. It provides cutting-edge AI models for creative professionals, filmmakers, and artists.',
    category: 'Image Generation',
    tags: ['Video Generation', 'Creative Toolkit', 'AI Models', 'Professional Tools'],
    logoUrl: 'https://images.unsplash.com/photo-1524749292158-7540c2494485?w=100&h=100&fit=crop',
    websiteUrl: 'https://runwayml.com',
    highlights: ['Video generation', 'Real-time collaboration', '30+ AI tools', 'Professional features'],
    pricing: 'Free - $95/month',
    isPaid: false,
    createdBy: 'Runway'
  },

  // Personal Assistants
  {
    name: 'Notion AI',
    description: 'AI assistant integrated into Notion workspace for enhanced productivity.',
    fullDescription: 'Notion AI is an intelligent writing assistant built into Notion that helps users generate content, improve writing, brainstorm ideas, and organize information more efficiently within their workspace.',
    category: 'Personal Assistants',
    tags: ['Workspace AI', 'Writing Assistant', 'Productivity', 'Note Taking'],
    logoUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.notion.so/product/ai',
    highlights: ['Integrated workspace', 'Content generation', 'Writing improvement', 'Brainstorming'],
    pricing: '$10/month per user',
    isPaid: true,
    createdBy: 'Notion'
  },
  {
    name: 'Otter.ai',
    description: 'AI-powered meeting assistant that records, transcribes, and summarizes conversations.',
    fullDescription: 'Otter.ai is an AI meeting assistant that automatically records, transcribes, and summarizes meetings in real-time. It integrates with popular video conferencing platforms and helps teams stay organized and productive.',
    category: 'Personal Assistants',
    tags: ['Meeting Transcription', 'Voice Recording', 'Meeting Summary', 'Team Collaboration'],
    logoUrl: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop',
    websiteUrl: 'https://otter.ai',
    highlights: ['Real-time transcription', 'Meeting summaries', 'Speaker identification', 'Integration with Zoom/Teams'],
    pricing: 'Free - $20/month',
    isPaid: false,
    createdBy: 'Otter.ai'
  },
  {
    name: 'Clockify AI',
    description: 'AI-enhanced time tracking and project management assistant.',
    fullDescription: 'Clockify AI combines time tracking with artificial intelligence to help individuals and teams manage projects more effectively. It provides insights, automation, and intelligent suggestions for better productivity.',
    category: 'Personal Assistants',
    tags: ['Time Tracking', 'Project Management', 'Productivity Analytics', 'Team Management'],
    logoUrl: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=100&h=100&fit=crop',
    websiteUrl: 'https://clockify.me',
    highlights: ['Time tracking', 'Project insights', 'Team analytics', 'Automated reporting'],
    pricing: 'Free - $9.99/month',
    isPaid: false,
    createdBy: 'Clockify'
  },
  {
    name: 'Reclaim AI',
    description: 'AI scheduling assistant that optimizes your calendar automatically.',
    fullDescription: 'Reclaim AI is an intelligent scheduling assistant that automatically optimizes your calendar by scheduling focus time, managing habits, and coordinating team schedules to maximize productivity.',
    category: 'Personal Assistants',
    tags: ['Calendar Management', 'Schedule Optimization', 'Focus Time', 'Habit Tracking'],
    logoUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
    websiteUrl: 'https://reclaim.ai',
    highlights: ['Smart scheduling', 'Focus time blocks', 'Habit integration', 'Team coordination'],
    pricing: 'Free - $18/month',
    isPaid: false,
    createdBy: 'Reclaim AI'
  },
  {
    name: 'Superhuman',
    description: 'AI-powered email client that helps you process email faster.',
    fullDescription: 'Superhuman is an AI-enhanced email client designed for speed and efficiency. It offers features like AI-powered email composition, smart scheduling, and advanced keyboard shortcuts to help users manage their inbox more effectively.',
    category: 'Personal Assistants',
    tags: ['Email Management', 'Productivity', 'AI Composition', 'Keyboard Shortcuts'],
    logoUrl: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=100&h=100&fit=crop',
    websiteUrl: 'https://superhuman.com',
    highlights: ['Fastest email experience', 'AI-powered features', 'Advanced shortcuts', 'Email scheduling'],
    pricing: '$30/month',
    isPaid: true,
    createdBy: 'Superhuman'
  },

  // Chatbots
  {
    name: 'Claude',
    description: 'Advanced AI assistant by Anthropic for conversational AI and analysis.',
    fullDescription: 'Claude is Anthropic\'s AI assistant designed to be helpful, harmless, and honest. It excels at complex reasoning, creative writing, coding assistance, and in-depth analysis while maintaining strong safety guidelines.',
    category: 'Chatbots',
    tags: ['Conversational AI', 'Reasoning', 'Creative Writing', 'Code Assistant'],
    logoUrl: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=100&h=100&fit=crop',
    websiteUrl: 'https://claude.ai',
    highlights: ['Advanced reasoning', 'Large context window', 'Safety-focused', 'Multimodal capabilities'],
    pricing: 'Free - $20/month',
    isPaid: false,
    createdBy: 'Anthropic'
  },
  {
    name: 'Perplexity AI',
    description: 'AI-powered search engine that provides accurate answers with sources.',
    fullDescription: 'Perplexity AI is an AI-powered search engine that combines the capabilities of large language models with real-time web search to provide accurate, cited answers to complex questions.',
    category: 'Chatbots',
    tags: ['AI Search', 'Real-time Information', 'Source Citations', 'Research Assistant'],
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    websiteUrl: 'https://perplexity.ai',
    highlights: ['Real-time search', 'Source citations', 'Follow-up questions', 'Academic mode'],
    pricing: 'Free - $20/month',
    isPaid: false,
    createdBy: 'Perplexity AI'
  },
  {
    name: 'Character.AI',
    description: 'Create and chat with AI characters for entertainment and roleplay.',
    fullDescription: 'Character.AI allows users to create and interact with AI-powered characters for entertainment, education, and creative purposes. Users can chat with historical figures, fictional characters, or create their own.',
    category: 'Chatbots',
    tags: ['Character Creation', 'Roleplay', 'Entertainment', 'Creative AI'],
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
    websiteUrl: 'https://character.ai',
    highlights: ['Custom characters', 'Roleplay scenarios', 'Community sharing', 'Mobile app'],
    pricing: 'Free - $9.99/month',
    isPaid: false,
    createdBy: 'Character.AI'
  },
  {
    name: 'Replika',
    description: 'AI companion designed for meaningful conversations and emotional support.',
    fullDescription: 'Replika is an AI chatbot designed to be a personal companion that learns from conversations to provide emotional support, companionship, and engaging dialogue tailored to each user.',
    category: 'Chatbots',
    tags: ['AI Companion', 'Emotional Support', 'Personal AI', 'Mental Health'],
    logoUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=100&h=100&fit=crop',
    websiteUrl: 'https://replika.ai',
    highlights: ['Emotional intelligence', 'Personalized responses', 'Mood tracking', '3D avatar'],
    pricing: 'Free - $19.99/month',
    isPaid: false,
    createdBy: 'Luka Inc.'
  },
  {
    name: 'Pi by Inflection',
    description: 'Personal AI assistant focused on helpful, natural conversations.',
    fullDescription: 'Pi is a personal AI assistant created by Inflection AI, designed to be helpful, kind, and engaging in natural conversations. It focuses on being a supportive companion for daily tasks and discussions.',
    category: 'Chatbots',
    tags: ['Personal Assistant', 'Natural Conversation', 'Helpful AI', 'Daily Tasks'],
    logoUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop',
    websiteUrl: 'https://pi.ai',
    highlights: ['Natural conversations', 'Emotional intelligence', 'Voice interaction', 'Multi-platform'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'Inflection AI'
  },

  // Sales Tools
  {
    name: 'Salesforce Einstein',
    description: 'AI-powered CRM features integrated into Salesforce platform.',
    fullDescription: 'Salesforce Einstein brings artificial intelligence to the Salesforce CRM platform, offering predictive analytics, automated insights, and intelligent recommendations to help sales teams close more deals.',
    category: 'Sales',
    tags: ['CRM AI', 'Predictive Analytics', 'Sales Insights', 'Lead Scoring'],
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.salesforce.com/products/einstein',
    highlights: ['Predictive lead scoring', 'Opportunity insights', 'Automated activity capture', 'AI-powered forecasting'],
    pricing: 'Included with Salesforce plans',
    isPaid: true,
    createdBy: 'Salesforce'
  },
  {
    name: 'Gong.io',
    description: 'AI-powered revenue intelligence platform for sales teams.',
    fullDescription: 'Gong.io uses AI to analyze sales conversations, emails, and meetings to provide insights into deal progression, customer sentiment, and competitive intelligence, helping sales teams improve their performance.',
    category: 'Sales',
    tags: ['Revenue Intelligence', 'Conversation Analytics', 'Deal Intelligence', 'Sales Coaching'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.gong.io',
    highlights: ['Conversation intelligence', 'Deal risk analysis', 'Competitive insights', 'Sales coaching'],
    pricing: 'Contact for pricing',
    isPaid: true,
    createdBy: 'Gong.io'
  },
  {
    name: 'Outreach.io',
    description: 'AI-powered sales engagement platform for prospecting and outreach.',
    fullDescription: 'Outreach.io is a sales engagement platform that uses AI to optimize outreach sequences, predict the best times to contact prospects, and provide insights to improve sales effectiveness.',
    category: 'Sales',
    tags: ['Sales Engagement', 'Email Sequences', 'Prospecting', 'Sales Analytics'],
    logoUrl: 'https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.outreach.io',
    highlights: ['Automated sequences', 'A/B testing', 'Analytics dashboard', 'CRM integration'],
    pricing: 'Starting at $100/month per user',
    isPaid: true,
    createdBy: 'Outreach'
  },
  {
    name: 'Clay',
    description: 'AI-powered data enrichment and personalization platform for sales.',
    fullDescription: 'Clay combines data enrichment with AI-powered personalization to help sales teams find, research, and reach out to prospects with highly personalized messages at scale.',
    category: 'Sales',
    tags: ['Data Enrichment', 'Personalization', 'Prospecting', 'Lead Generation'],
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.clay.com',
    highlights: ['Data enrichment', 'AI personalization', 'Webhook integrations', 'Automated research'],
    pricing: 'Starting at $149/month',
    isPaid: true,
    createdBy: 'Clay'
  },
  {
    name: 'Lavender',
    description: 'AI email coach that helps improve sales email performance.',
    fullDescription: 'Lavender is an AI-powered email assistant that helps sales professionals write better emails by providing real-time coaching, personalization suggestions, and performance analytics.',
    category: 'Sales',
    tags: ['Email Coaching', 'Sales Emails', 'Performance Analytics', 'Personalization'],
    logoUrl: 'https://images.unsplash.com/photo-1586953983027-d7508a64f4bb?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.lavender.ai',
    highlights: ['Real-time email coaching', 'Deliverability insights', 'Personalization suggestions', 'Performance tracking'],
    pricing: 'Free - $45/month',
    isPaid: false,
    createdBy: 'Lavender'
  }
];

export async function populateTools() {
  console.log('Starting to populate tools...');
  
  for (const tool of toolsToAdd) {
    try {
      const toolId = await toolService.addTool(tool);
      console.log(`Added tool: ${tool.name} with ID: ${toolId}`);
    } catch (error) {
      console.error(`Error adding tool ${tool.name}:`, error);
    }
  }
  
  console.log('Finished populating tools!');
}

// To run this script, call populateTools() from browser console or admin panel
window.populateTools = populateTools;