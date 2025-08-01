import { toolService } from '../services/toolService.js';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase.js';

// Helper function to clear existing tools
const clearAllTools = async () => {
  try {
    const toolsRef = collection(db, 'tools');
    const querySnapshot = await getDocs(toolsRef);
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    console.log('All existing tools cleared successfully');
  } catch (error) {
    console.error('Error clearing tools:', error);
  }
};

const toolsToAdd = [
  // SEO Tools
  {
    name: 'Semrush',
    description: 'Comprehensive SEO toolkit for keyword research, competitor analysis, and rank tracking.',
    fullDescription: 'Semrush is an all-in-one digital marketing toolkit that provides SEO, PPC, content, social media, and competitive research tools to help businesses grow their online visibility.',
    category: 'SEO Tools',
    tags: ['SEO', 'Keyword Research', 'Competitor Analysis', 'Rank Tracking'],
    logoUrl: '🔍',
    websiteUrl: 'https://semrush.com',
    highlights: ['Keyword research', 'Competitor analysis', 'Site audit', 'Rank tracking'],
    pricing: 'Starting at $119.95/month',
    isPaid: true,
    createdBy: 'Semrush'
  },
  {
    name: 'Ahrefs',
    description: 'SEO toolset for backlink analysis, keyword research, and content optimization.',
    fullDescription: 'Ahrefs is a comprehensive SEO toolset that helps with backlink analysis, keyword research, competitor analysis, rank tracking, and site audits.',
    category: 'SEO Tools',
    tags: ['Backlinks', 'SEO Analysis', 'Content Research', 'Site Audit'],
    logoUrl: '📊',
    websiteUrl: 'https://ahrefs.com',
    highlights: ['Backlink analysis', 'Keyword explorer', 'Content gap analysis', 'Site explorer'],
    pricing: 'Starting at $99/month',
    isPaid: true,
    createdBy: 'Ahrefs'
  },
  {
    name: 'Moz Pro',
    description: 'SEO software suite for keyword research, link building, and site optimization.',
    fullDescription: 'Moz Pro provides SEO tools including keyword research, link building, site audits, and rank tracking to help improve search engine visibility.',
    category: 'SEO Tools',
    tags: ['SEO Suite', 'Link Building', 'Keyword Research', 'Site Optimization'],
    logoUrl: '🎯',
    websiteUrl: 'https://moz.com',
    highlights: ['Keyword explorer', 'Link explorer', 'Site crawl', 'Rank tracker'],
    pricing: 'Starting at $99/month',
    isPaid: true,
    createdBy: 'Moz'
  },
  {
    name: 'Screaming Frog',
    description: 'Website crawler for technical SEO analysis and site auditing.',
    fullDescription: 'Screaming Frog SEO Spider is a website crawler that helps with technical SEO audits, finding broken links, analyzing page titles and metadata.',
    category: 'SEO Tools',
    tags: ['Technical SEO', 'Site Crawling', 'SEO Audit', 'Broken Links'],
    logoUrl: '🐸',
    websiteUrl: 'https://screamingfrog.co.uk',
    highlights: ['Website crawling', 'Technical SEO', 'Broken link detection', 'Metadata analysis'],
    pricing: 'Free - £149/year for paid version',
    isPaid: false,
    createdBy: 'Screaming Frog'
  },
  {
    name: 'SE Ranking',
    description: 'All-in-one SEO platform for rank tracking and website optimization.',
    fullDescription: 'SE Ranking is a comprehensive SEO platform that offers rank tracking, website auditing, backlink monitoring, and competitor research tools.',
    category: 'SEO Tools',
    tags: ['Rank Tracking', 'SEO Platform', 'Website Audit', 'Competitor Research'],
    logoUrl: '📈',
    websiteUrl: 'https://seranking.com',
    highlights: ['Daily rank tracking', 'Website audit', 'Backlink checker', 'Keyword grouping'],
    pricing: 'Starting at $31/month',
    isPaid: true,
    createdBy: 'SE Ranking'
  },

  // AI Code Tools
  {
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster with intelligent suggestions.',
    fullDescription: 'GitHub Copilot is an AI coding assistant that provides intelligent code suggestions and completions. It helps developers write code faster by suggesting whole lines or blocks of code as you type.',
    category: 'AI Code Tools',
    tags: ['Code Assistant', 'AI Programming', 'Code Completion', 'Developer Tools'],
    logoUrl: '👨‍💻',
    websiteUrl: 'https://github.com/features/copilot',
    highlights: ['Code suggestions', 'Multiple languages', 'IDE integration', 'Context-aware'],
    pricing: '$10/month per user',
    isPaid: true,
    createdBy: 'GitHub'
  },
  {
    name: 'Tabnine',
    description: 'AI code completion tool that boosts developer productivity.',
    fullDescription: 'Tabnine is an AI-powered code completion tool that predicts and suggests code completions based on context and patterns. It supports multiple programming languages and integrates with popular IDEs.',
    category: 'AI Code Tools',
    tags: ['Code Completion', 'AI Assistant', 'IDE Integration', 'Multiple Languages'],
    logoUrl: '🤖',
    websiteUrl: 'https://www.tabnine.com',
    highlights: ['AI code predictions', '30+ languages', 'Privacy focused', 'Team learning'],
    pricing: 'Free - $39/month',
    isPaid: false,
    createdBy: 'Tabnine'
  },
  {
    name: 'Cursor',
    description: 'AI-first code editor built for pair programming with AI.',
    fullDescription: 'Cursor is an AI-first code editor that enables developers to edit code with AI assistance. It offers features like AI-powered code generation, debugging, and refactoring in a modern editor interface.',
    category: 'AI Code Tools',
    tags: ['AI Editor', 'Code Generation', 'Pair Programming', 'Debugging'],
    logoUrl: '⚡',
    websiteUrl: 'https://cursor.sh',
    highlights: ['AI pair programming', 'Code generation', 'Natural language editing', 'Git integration'],
    pricing: 'Free - $20/month',
    isPaid: false,
    createdBy: 'Anysphere'
  },
  {
    name: 'Replit AI',
    description: 'AI coding assistant integrated into Replit\'s cloud development environment.',
    fullDescription: 'Replit AI is an integrated AI coding assistant that helps developers write, debug, and explain code within Replit\'s browser-based development environment.',
    category: 'AI Code Tools',
    tags: ['Cloud IDE', 'Code Assistant', 'Debugging', 'Code Explanation'],
    logoUrl: '☁️',
    websiteUrl: 'https://replit.com',
    highlights: ['Cloud-based coding', 'AI assistance', 'Collaborative editing', 'Instant deployment'],
    pricing: 'Free - $20/month',
    isPaid: false,
    createdBy: 'Replit'
  },
  {
    name: 'CodeWhisperer',
    description: 'Amazon\'s AI coding companion for real-time code suggestions.',
    fullDescription: 'Amazon CodeWhisperer is an AI coding companion that provides real-time code suggestions and recommendations. It helps developers write code faster and more securely with ML-powered suggestions.',
    category: 'AI Code Tools',
    tags: ['Amazon', 'Code Suggestions', 'Security Scanning', 'Real-time'],
    logoUrl: '🛡️',
    websiteUrl: 'https://aws.amazon.com/codewhisperer',
    highlights: ['Real-time suggestions', 'Security scanning', 'Multiple languages', 'AWS integration'],
    pricing: 'Free - $19/month',
    isPaid: false,
    createdBy: 'Amazon'
  },

  // Legal AI Tools
  {
    name: 'DoNotPay',
    description: 'AI lawyer that helps with legal issues and bureaucracy.',
    fullDescription: 'DoNotPay is an AI-powered legal assistant that helps users with various legal issues including parking tickets, contract reviews, and bureaucratic processes.',
    category: 'Legal AI Tools',
    tags: ['Legal Assistant', 'Contract Review', 'Legal Documents', 'Consumer Rights'],
    logoUrl: '⚖️',
    websiteUrl: 'https://donotpay.com',
    highlights: ['Legal document generation', 'Contract analysis', 'Consumer protection', 'Automated appeals'],
    pricing: '$36/year',
    isPaid: true,
    createdBy: 'DoNotPay'
  },
  {
    name: 'LawGeex',
    description: 'AI-powered contract review and legal document analysis platform.',
    fullDescription: 'LawGeex uses AI to review contracts and legal documents, identifying risks, suggesting revisions, and ensuring compliance with legal standards.',
    category: 'Legal AI Tools',
    tags: ['Contract Review', 'Legal Analysis', 'Risk Assessment', 'Compliance'],
    logoUrl: '📋',
    websiteUrl: 'https://www.lawgeex.com',
    highlights: ['Contract AI review', 'Risk identification', 'Compliance checking', 'Legal insights'],
    pricing: 'Contact for pricing',
    isPaid: true,
    createdBy: 'LawGeex'
  },
  {
    name: 'Spellbook',
    description: 'AI copilot for lawyers to draft and review contracts faster.',
    fullDescription: 'Spellbook is an AI assistant for lawyers that integrates with Microsoft Word to help draft, review, and negotiate contracts more efficiently.',
    category: 'Legal AI Tools',
    tags: ['Legal Writing', 'Contract Drafting', 'Microsoft Word', 'Legal Research'],
    logoUrl: '📝',
    websiteUrl: 'https://www.spellbook.legal',
    highlights: ['Word integration', 'Contract drafting', 'Legal research', 'Clause suggestions'],
    pricing: 'Starting at $40/month',
    isPaid: true,
    createdBy: 'Spellbook'
  },
  {
    name: 'Kira Systems',
    description: 'AI-powered contract analysis and due diligence platform.',
    fullDescription: 'Kira Systems uses machine learning to extract and analyze information from contracts and documents, streamlining due diligence and contract review processes.',
    category: 'Legal AI Tools',
    tags: ['Contract Analysis', 'Due Diligence', 'Document Review', 'Legal Tech'],
    logoUrl: '🔍',
    websiteUrl: 'https://kirasystems.com',
    highlights: ['ML contract analysis', 'Due diligence automation', 'Data extraction', 'Legal insights'],
    pricing: 'Contact for pricing',
    isPaid: true,
    createdBy: 'Kira Systems'
  },
  {
    name: 'CoCounsel',
    description: 'AI legal assistant for research, document review, and legal tasks.',
    fullDescription: 'CoCounsel is an AI legal assistant that helps lawyers with legal research, document review, contract analysis, and other legal tasks using advanced AI technology.',
    category: 'Legal AI Tools',
    tags: ['Legal Research', 'Document Review', 'Legal Assistant', 'Case Analysis'],
    logoUrl: '🏛️',
    websiteUrl: 'https://casetext.com/cocounsel',
    highlights: ['Legal research', 'Document analysis', 'Case law search', 'Brief drafting'],
    pricing: 'Contact for pricing',
    isPaid: true,
    createdBy: 'Casetext'
  },

  // Customer Support Tools
  {
    name: 'Intercom',
    description: 'AI-powered customer messaging platform with automated support.',
    fullDescription: 'Intercom provides AI-powered customer messaging with automated support, live chat, and help desk features to improve customer experience.',
    category: 'Customer Support Tools',
    tags: ['Live Chat', 'Customer Messaging', 'Help Desk', 'Automation'],
    logoUrl: '💬',
    websiteUrl: 'https://intercom.com',
    highlights: ['AI chatbots', 'Live messaging', 'Help desk', 'Customer insights'],
    pricing: 'Starting at $74/month',
    isPaid: true,
    createdBy: 'Intercom'
  },
  {
    name: 'Zendesk Answer Bot',
    description: 'AI-powered chatbot for automated customer support and ticket resolution.',
    fullDescription: 'Zendesk Answer Bot uses AI to automatically resolve customer support tickets and provide instant answers to common questions.',
    category: 'Customer Support Tools',
    tags: ['Chatbot', 'Ticket Resolution', 'Automated Support', 'Knowledge Base'],
    logoUrl: '🎫',
    websiteUrl: 'https://zendesk.com',
    highlights: ['Automated responses', 'Ticket routing', 'Knowledge base integration', 'Multi-channel'],
    pricing: 'Starting at $5/month per agent',
    isPaid: true,
    createdBy: 'Zendesk'
  },
  {
    name: 'Freshworks Freddy AI',
    description: 'AI assistant for customer support, sales, and marketing automation.',
    fullDescription: 'Freddy AI is Freshworks\' AI assistant that helps with customer support, predictive analytics, and intelligent automation across sales and marketing.',
    category: 'Customer Support Tools',
    tags: ['AI Assistant', 'Predictive Analytics', 'Support Automation', 'CRM Integration'],
    logoUrl: '🤖',
    websiteUrl: 'https://freshworks.com',
    highlights: ['Predictive insights', 'Automated workflows', 'Intelligent routing', 'Multi-product AI'],
    pricing: 'Starting at $15/month per agent',
    isPaid: true,
    createdBy: 'Freshworks'
  },
  {
    name: 'Ada',
    description: 'AI-powered customer service automation platform.',
    fullDescription: 'Ada is an AI customer service platform that automates customer interactions across multiple channels with intelligent chatbots and workflow automation.',
    category: 'Customer Support Tools',
    tags: ['Customer Service AI', 'Chatbot Platform', 'Workflow Automation', 'Multi-channel'],
    logoUrl: '🎯',
    websiteUrl: 'https://ada.cx',
    highlights: ['Conversational AI', 'Multi-channel support', 'No-code builder', 'Analytics dashboard'],
    pricing: 'Contact for pricing',
    isPaid: true,
    createdBy: 'Ada'
  },
  {
    name: 'Crisp MagicReply',
    description: 'AI-powered auto-reply system for customer support conversations.',
    fullDescription: 'MagicReply is Crisp\'s AI feature that automatically generates contextual replies for customer support conversations, improving response times and efficiency.',
    category: 'Customer Support Tools',
    tags: ['Auto-reply', 'Conversation AI', 'Response Automation', 'Live Chat'],
    logoUrl: '✨',
    websiteUrl: 'https://crisp.chat',
    highlights: ['Automatic replies', 'Context understanding', 'Multi-language', 'Live chat integration'],
    pricing: 'Starting at $25/month',
    isPaid: true,
    createdBy: 'Crisp'
  },

  // Business Plan Tools
  {
    name: 'LivePlan',
    description: 'AI-powered business planning software for entrepreneurs and startups.',
    fullDescription: 'LivePlan uses AI to help entrepreneurs create comprehensive business plans with financial forecasts, pitch decks, and strategic planning tools.',
    category: 'Business Plan Tools',
    tags: ['Business Planning', 'Financial Forecasting', 'Pitch Decks', 'Strategy'],
    logoUrl: '📊',
    websiteUrl: 'https://www.liveplan.com',
    highlights: ['AI-guided planning', 'Financial forecasts', 'Pitch deck builder', 'Progress tracking'],
    pricing: 'Starting at $20/month',
    isPaid: true,
    createdBy: 'Palo Alto Software'
  },
  {
    name: 'BizPlanBuilder',
    description: 'AI-assisted business plan creation with templates and guidance.',
    fullDescription: 'BizPlanBuilder provides AI-powered business plan creation tools with professional templates, financial modeling, and step-by-step guidance for entrepreneurs.',
    category: 'Business Plan Tools',
    tags: ['Business Templates', 'Financial Modeling', 'Plan Writing', 'Entrepreneurship'],
    logoUrl: '📋',
    websiteUrl: 'https://www.bizplanbuilder.com',
    highlights: ['Professional templates', 'Financial modeling', 'Investor-ready plans', 'Expert guidance'],
    pricing: 'Starting at $39.95',
    isPaid: true,
    createdBy: 'JIAN'
  },
  {
    name: 'Upmetrics',
    description: 'AI business plan generator with collaborative features.',
    fullDescription: 'Upmetrics offers AI-powered business plan generation with collaborative editing, financial forecasting, and presentation tools for entrepreneurs and teams.',
    category: 'Business Plan Tools',
    tags: ['Collaborative Planning', 'AI Generation', 'Team Collaboration', 'Presentations'],
    logoUrl: '🚀',
    websiteUrl: 'https://upmetrics.co',
    highlights: ['AI plan generation', 'Team collaboration', 'Financial dashboards', 'Presentation mode'],
    pricing: 'Free - $20/month',
    isPaid: false,
    createdBy: 'Upmetrics'
  },
  {
    name: 'Enloop',
    description: 'Automated business plan writing and financial forecasting tool.',
    fullDescription: 'Enloop automatically writes business plans and creates financial forecasts based on your business information, using AI to generate professional documents.',
    category: 'Business Plan Tools',
    tags: ['Automated Writing', 'Financial Forecasts', 'Business Analytics', 'Performance Tracking'],
    logoUrl: '🔄',
    websiteUrl: 'https://enloop.com',
    highlights: ['Automated writing', 'Performance scores', 'Financial sync', 'Industry comparisons'],
    pricing: 'Free - $39.95/month',
    isPaid: false,
    createdBy: 'Enloop'
  },
  {
    name: 'PlanGuru',
    description: 'Advanced business planning and budgeting software with AI insights.',
    fullDescription: 'PlanGuru provides comprehensive business planning, budgeting, and forecasting tools with AI-powered insights for strategic decision making.',
    category: 'Business Plan Tools',
    tags: ['Budgeting', 'Forecasting', 'Strategic Planning', 'Business Intelligence'],
    logoUrl: '📈',
    websiteUrl: 'https://www.planguru.com',
    highlights: ['Advanced forecasting', 'Scenario planning', 'KPI dashboards', 'Integration tools'],
    pricing: 'Starting at $99/month',
    isPaid: true,
    createdBy: 'PlanGuru'
  },

  // Prompt Marketplace
  {
    name: 'PromptBase',
    description: 'Marketplace for buying and selling AI prompts for various applications.',
    fullDescription: 'PromptBase is a marketplace where users can buy and sell high-quality prompts for AI models like ChatGPT, DALL-E, and Stable Diffusion.',
    category: 'Prompt Marketplace',
    tags: ['Prompt Marketplace', 'AI Prompts', 'ChatGPT', 'DALL-E'],
    logoUrl: '🛒',
    websiteUrl: 'https://promptbase.com',
    highlights: ['Quality prompts', 'Multiple AI models', 'Prompt testing', 'Creator earnings'],
    pricing: 'Free to browse - varies per prompt',
    isPaid: false,
    createdBy: 'PromptBase'
  },
  {
    name: 'PromptHero',
    description: 'Search engine and marketplace for AI art prompts and images.',
    fullDescription: 'PromptHero is a platform for discovering and sharing AI-generated art prompts, featuring a searchable database of prompts and generated images.',
    category: 'Prompt Marketplace',
    tags: ['AI Art', 'Prompt Search', 'Image Generation', 'Creative Prompts'],
    logoUrl: '🎨',
    websiteUrl: 'https://prompthero.com',
    highlights: ['Prompt search', 'AI art gallery', 'Model information', 'Trending prompts'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'PromptHero'
  },
  {
    name: 'FlowGPT',
    description: 'Community-driven platform for sharing ChatGPT prompts and workflows.',
    fullDescription: 'FlowGPT is a community platform where users share and discover effective ChatGPT prompts, workflows, and use cases for various applications.',
    category: 'Prompt Marketplace',
    tags: ['ChatGPT Prompts', 'Community', 'Workflows', 'Prompt Sharing'],
    logoUrl: '💡',
    websiteUrl: 'https://flowgpt.com',
    highlights: ['Community prompts', 'Workflow templates', 'Use case examples', 'Prompt collections'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'FlowGPT'
  },
  {
    name: 'OrdinaryPeoplePrompts',
    description: 'Platform for discovering and sharing practical AI prompts.',
    fullDescription: 'OrdinaryPeoplePrompts is a community-driven platform focused on practical, everyday AI prompts that regular users can apply to solve common problems.',
    category: 'Prompt Marketplace',
    tags: ['Practical Prompts', 'Community', 'Everyday Use', 'Problem Solving'],
    logoUrl: '👥',
    websiteUrl: 'https://ordinarypeopleprompts.com',
    highlights: ['Practical prompts', 'Real-world use cases', 'User submissions', 'Easy categories'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'OrdinaryPeoplePrompts'
  },
  {
    name: 'AIPRM',
    description: 'Chrome extension with curated ChatGPT prompts for professionals.',
    fullDescription: 'AIPRM provides a Chrome extension with curated ChatGPT prompts designed for professionals in marketing, SEO, copywriting, and other business functions.',
    category: 'Prompt Marketplace',
    tags: ['Chrome Extension', 'Professional Prompts', 'Marketing', 'SEO'],
    logoUrl: '🔧',
    websiteUrl: 'https://aiprm.com',
    highlights: ['Chrome extension', 'Professional prompts', 'Category organization', 'Regular updates'],
    pricing: 'Free - $20/month for premium',
    isPaid: false,
    createdBy: 'AIPRM'
  },

  // Course Generator
  {
    name: 'CourseAI',
    description: 'AI-powered platform for creating comprehensive online courses.',
    fullDescription: 'CourseAI helps educators and content creators build engaging online courses using AI to generate course outlines, content, quizzes, and learning materials.',
    category: 'Course Generator',
    tags: ['Course Creation', 'Educational Content', 'Learning Materials', 'AI Education'],
    logoUrl: '🎓',
    websiteUrl: 'https://course-ai.com',
    highlights: ['Course outline generation', 'Content creation', 'Quiz generation', 'Learning paths'],
    pricing: 'Starting at $29/month',
    isPaid: true,
    createdBy: 'CourseAI'
  },
  {
    name: 'LearnWorlds AI',
    description: 'AI-enhanced course creation platform with intelligent content generation.',
    fullDescription: 'LearnWorlds AI provides intelligent course creation tools with AI-powered content generation, assessment creation, and personalized learning paths.',
    category: 'Course Generator',
    tags: ['E-learning Platform', 'Content Generation', 'Assessment Tools', 'Personalization'],
    logoUrl: '📚',
    websiteUrl: 'https://learnworlds.com',
    highlights: ['AI content generation', 'Interactive videos', 'Assessment creation', 'Learning analytics'],
    pricing: 'Starting at $24/month',
    isPaid: true,
    createdBy: 'LearnWorlds'
  },
  {
    name: 'Teachable AI Assistant',
    description: 'AI-powered course creation tools integrated with Teachable platform.',
    fullDescription: 'Teachable\'s AI Assistant helps course creators generate course content, create engaging lessons, and optimize course structure for better student outcomes.',
    category: 'Course Generator',
    tags: ['Course Platform', 'Content Optimization', 'Lesson Creation', 'Student Engagement'],
    logoUrl: '🏫',
    websiteUrl: 'https://teachable.com',
    highlights: ['Content optimization', 'Lesson planning', 'Engagement tools', 'Student analytics'],
    pricing: 'Starting at $39/month',
    isPaid: true,
    createdBy: 'Teachable'
  },
  {
    name: 'Coursebox',
    description: 'AI course generator that creates complete courses from topics or documents.',
    fullDescription: 'Coursebox uses AI to transform topics, documents, or websites into complete courses with lessons, quizzes, and assignments automatically generated.',
    category: 'Course Generator',
    tags: ['Automated Course Creation', 'Document Conversion', 'Quiz Generation', 'Lesson Planning'],
    logoUrl: '📦',
    websiteUrl: 'https://coursebox.ai',
    highlights: ['One-click course creation', 'Document import', 'Automatic quizzes', 'Mobile learning'],
    pricing: 'Free - $49/month',
    isPaid: false,
    createdBy: 'Coursebox'
  },
  {
    name: 'Mini Course Generator',
    description: 'AI tool for creating bite-sized educational courses and microlearning content.',
    fullDescription: 'Mini Course Generator specializes in creating short, focused educational content using AI to generate microlearning modules and bite-sized courses.',
    category: 'Course Generator',
    tags: ['Microlearning', 'Bite-sized Content', 'Educational Modules', 'Quick Learning'],
    logoUrl: '⚡',
    websiteUrl: 'https://minicourse.co',
    highlights: ['Microlearning focus', 'Quick generation', 'Mobile-friendly', 'Engagement tracking'],
    pricing: 'Starting at $19/month',
    isPaid: true,
    createdBy: 'Mini Course Generator'
  }
];

export async function populateTools() {
  try {
    console.log('Starting tool population...');
    
    // Clear all existing tools first
    await clearAllTools();
    
    console.log('Adding new tools...');
    
    // Add all tools with duplicate prevention
    for (const tool of toolsToAdd) {
      try {
        // Check if tool already exists by name (extra safety check)
        const existingTools = await toolService.getAllTools();
        const existingTool = existingTools.find(existing => 
          existing.name.toLowerCase() === tool.name.toLowerCase()
        );
        
        if (existingTool) {
          console.log(`Tool "${tool.name}" already exists, skipping...`);
          continue;
        }
        
        await toolService.addTool(tool);
        console.log(`Added tool: ${tool.name} in category: ${tool.category}`);
      } catch (error) {
        console.error(`Error adding tool ${tool.name}:`, error);
      }
    }
    
    console.log('Tool population completed successfully!');
    console.log(`Total tools added: ${toolsToAdd.length}`);
    
    // Log tools by category
    const categoryCounts = {};
    toolsToAdd.forEach(tool => {
      categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
    });
    
    console.log('Tools added by category:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`- ${category}: ${count} tools`);
    });
    
  } catch (error) {
    console.error('Error during tool population:', error);
  }
}