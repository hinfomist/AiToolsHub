import { toolService } from '../services/toolService.js';

const toolsToAdd = [
  // AI Code Tools
  {
    name: 'GitHub Copilot',
    description: 'AI pair programmer that helps you write code faster with intelligent suggestions.',
    fullDescription: 'GitHub Copilot is an AI coding assistant that provides intelligent code suggestions and completions. It helps developers write code faster by suggesting whole lines or blocks of code as you type.',
    category: 'AI Code Tools',
    tags: ['Code Assistant', 'AI Programming', 'Code Completion', 'Developer Tools'],
    logoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop',
    websiteUrl: 'https://aws.amazon.com/codewhisperer',
    highlights: ['Real-time suggestions', 'Security scanning', 'Multiple languages', 'AWS integration'],
    pricing: 'Free - $19/month',
    isPaid: false,
    createdBy: 'Amazon'
  },

  // PDF Tools
  {
    name: 'ChatPDF',
    description: 'AI-powered tool to chat with your PDF documents.',
    fullDescription: 'ChatPDF allows you to upload PDF documents and ask questions about their content. The AI reads and understands the document to provide accurate answers and summaries.',
    category: 'PDF Tools',
    tags: ['Document AI', 'PDF Chat', 'Document Analysis', 'Question Answering'],
    logoUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.chatpdf.com',
    highlights: ['PDF conversations', 'Document understanding', 'Multi-language support', 'Source citations'],
    pricing: 'Free - $20/month',
    isPaid: false,
    createdBy: 'ChatPDF'
  },
  {
    name: 'PDF.ai',
    description: 'AI-powered PDF editor and analyzer for document processing.',
    fullDescription: 'PDF.ai provides intelligent PDF processing capabilities including text extraction, document analysis, form filling, and automated document understanding using advanced AI technology.',
    category: 'PDF Tools',
    tags: ['PDF Processing', 'Document Analysis', 'Text Extraction', 'Form Filling'],
    logoUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=100&h=100&fit=crop',
    websiteUrl: 'https://pdf.ai',
    highlights: ['Smart extraction', 'Document insights', 'Batch processing', 'API access'],
    pricing: 'Free - $29/month',
    isPaid: false,
    createdBy: 'PDF.ai'
  },
  {
    name: 'LightPDF AI',
    description: 'AI-enhanced PDF tools for editing, converting, and analyzing documents.',
    fullDescription: 'LightPDF AI offers comprehensive PDF management with AI-powered features for document conversion, editing, analysis, and intelligent content extraction.',
    category: 'PDF Tools',
    tags: ['PDF Converter', 'Document Editing', 'AI Analysis', 'Content Extraction'],
    logoUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
    websiteUrl: 'https://lightpdf.com',
    highlights: ['AI-powered conversion', 'Document editing', 'Cloud storage', 'Batch operations'],
    pricing: 'Free - $9.99/month',
    isPaid: false,
    createdBy: 'LightPDF'
  },
  {
    name: 'Documint',
    description: 'AI document processing platform for automated PDF workflows.',
    fullDescription: 'Documint uses AI to automate document processing workflows, extract data from PDFs, and generate intelligent document insights for businesses.',
    category: 'PDF Tools',
    tags: ['Document Automation', 'Data Extraction', 'Workflow Automation', 'Business Intelligence'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://documint.me',
    highlights: ['Automated workflows', 'Data extraction', 'Template generation', 'Integration APIs'],
    pricing: 'Starting at $19/month',
    isPaid: true,
    createdBy: 'Documint'
  },
  {
    name: 'Nanonets PDF AI',
    description: 'AI-powered PDF data extraction and document processing platform.',
    fullDescription: 'Nanonets PDF AI specializes in extracting structured data from unstructured PDF documents using machine learning models trained for document understanding.',
    category: 'PDF Tools',
    tags: ['Data Extraction', 'Document AI', 'Machine Learning', 'Structured Data'],
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    websiteUrl: 'https://nanonets.com',
    highlights: ['ML-powered extraction', 'Custom models', 'API integration', 'High accuracy'],
    pricing: 'Free trial - $299/month',
    isPaid: true,
    createdBy: 'Nanonets'
  },

  // Legal AI Tools
  {
    name: 'DoNotPay',
    description: 'AI lawyer that helps with legal issues and bureaucracy.',
    fullDescription: 'DoNotPay is an AI-powered legal assistant that helps users with various legal issues including parking tickets, contract reviews, and bureaucratic processes.',
    category: 'Legal AI Tools',
    tags: ['Legal Assistant', 'Contract Review', 'Legal Documents', 'Consumer Rights'],
    logoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop',
    websiteUrl: 'https://casetext.com/cocounsel',
    highlights: ['Legal research', 'Document analysis', 'Case law search', 'Brief drafting'],
    pricing: 'Contact for pricing',
    isPaid: true,
    createdBy: 'Casetext'
  },

  // Business Plan Tools
  {
    name: 'LivePlan',
    description: 'AI-powered business planning software for entrepreneurs and startups.',
    fullDescription: 'LivePlan uses AI to help entrepreneurs create comprehensive business plans with financial forecasts, pitch decks, and strategic planning tools.',
    category: 'Business Plan Tools',
    tags: ['Business Planning', 'Financial Forecasting', 'Pitch Decks', 'Strategy'],
    logoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=100&h=100&fit=crop',
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
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.aiprm.com',
    highlights: ['Browser integration', 'Professional focus', 'Curated prompts', 'One-click access'],
    pricing: 'Free - $20/month',
    isPaid: false,
    createdBy: 'AIPRM'
  },

  // Course Generator
  {
    name: 'LearnWorlds AI',
    description: 'AI-powered course creation platform for educators and trainers.',
    fullDescription: 'LearnWorlds AI helps educators create comprehensive online courses with AI-generated content, assessments, and interactive learning materials.',
    category: 'Course Generator',
    tags: ['Course Creation', 'Educational AI', 'Online Learning', 'Content Generation'],
    logoUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.learnworlds.com',
    highlights: ['AI course builder', 'Interactive content', 'Assessment tools', 'Student analytics'],
    pricing: 'Starting at $24/month',
    isPaid: true,
    createdBy: 'LearnWorlds'
  },
  {
    name: 'CourseAI',
    description: 'AI course generator that creates complete courses from topics.',
    fullDescription: 'CourseAI automatically generates complete course curriculums, lessons, and materials based on any topic you provide, using advanced AI technology.',
    category: 'Course Generator',
    tags: ['Automated Course Creation', 'Curriculum Design', 'Lesson Planning', 'Educational Content'],
    logoUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop',
    websiteUrl: 'https://course-ai.com',
    highlights: ['Automated generation', 'Complete curriculums', 'Multiple formats', 'Quick creation'],
    pricing: 'Starting at $19/month',
    isPaid: true,
    createdBy: 'CourseAI'
  },
  {
    name: 'Teachable AI',
    description: 'AI-enhanced course platform with intelligent content suggestions.',
    fullDescription: 'Teachable AI integrates artificial intelligence into course creation, offering smart content suggestions, automated transcriptions, and intelligent course organization.',
    category: 'Course Generator',
    tags: ['Course Platform', 'Content Suggestions', 'AI Enhancement', 'Course Organization'],
    logoUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop',
    websiteUrl: 'https://teachable.com',
    highlights: ['Smart suggestions', 'Auto transcription', 'Course analytics', 'Student insights'],
    pricing: 'Free - $159/month',
    isPaid: false,
    createdBy: 'Teachable'
  },
  {
    name: 'MindStudio Course Creator',
    description: 'AI-powered tool for creating interactive educational content.',
    fullDescription: 'MindStudio Course Creator uses AI to help educators design interactive courses with multimedia content, quizzes, and adaptive learning paths.',
    category: 'Course Generator',
    tags: ['Interactive Learning', 'Multimedia Content', 'Adaptive Learning', 'Educational Design'],
    logoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop',
    websiteUrl: 'https://mindstudio.ai',
    highlights: ['Interactive design', 'Adaptive paths', 'Multimedia support', 'Learning analytics'],
    pricing: 'Starting at $49/month',
    isPaid: true,
    createdBy: 'MindStudio'
  },
  {
    name: 'Coursebox',
    description: 'AI course creator that transforms content into engaging courses.',
    fullDescription: 'Coursebox uses AI to transform existing content, documents, and videos into structured, engaging online courses with interactive elements and assessments.',
    category: 'Course Generator',
    tags: ['Content Transformation', 'Course Structure', 'Interactive Elements', 'Assessment Creation'],
    logoUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop',
    websiteUrl: 'https://coursebox.ai',
    highlights: ['Content transformation', 'Auto structuring', 'Interactive quizzes', 'Video integration'],
    pricing: 'Free - $99/month',
    isPaid: false,
    createdBy: 'Coursebox'
  }
];

// Populate function with duplicate prevention
export const populateTools = async () => {
  console.log('Starting to populate tools...');
  
  try {
    // Get existing tools to check for duplicates
    const existingTools = await toolService.getAllTools();
    const existingNames = new Set(existingTools.map(tool => tool.name.toLowerCase()));
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const tool of toolsToAdd) {
      // Check if tool already exists (case-insensitive)
      if (existingNames.has(tool.name.toLowerCase())) {
        console.log(`Skipping duplicate tool: ${tool.name}`);
        skippedCount++;
        continue;
      }
      
      try {
        await toolService.addTool(tool);
        console.log(`Added tool: ${tool.name}`);
        addedCount++;
        // Add to existing names to prevent duplicates within this batch
        existingNames.add(tool.name.toLowerCase());
      } catch (error) {
        console.error(`Error adding tool ${tool.name}:`, error);
      }
    }
    
    console.log(`Population complete! Added: ${addedCount}, Skipped: ${skippedCount}`);
    return { added: addedCount, skipped: skippedCount };
  } catch (error) {
    console.error('Error during population:', error);
    throw error;
  }
};