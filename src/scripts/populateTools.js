import { toolService } from '../services/toolService.js';

const toolsToAdd = [
  // Content Writing (5 tools)
  {
    name: 'ChatGPT',
    description: 'Advanced conversational AI that can help with writing, coding, analysis, and creative tasks.',
    fullDescription: 'ChatGPT is an advanced conversational AI developed by OpenAI that can assist with a wide variety of tasks including writing, coding, analysis, creative projects, and problem-solving. Built on the GPT-4 architecture, it provides intelligent, context-aware responses and can maintain coherent conversations across multiple topics.',
    category: 'Content Writing',
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
    tags: ['Copywriting', 'Marketing', 'Ads', 'Email'],
    logoUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
    websiteUrl: 'https://copy.ai',
    highlights: ['Free plan available', '90+ templates', 'Multi-language'],
    pricing: 'Freemium - $36/month for Pro',
    isPaid: false,
    createdBy: 'Copy.ai'
  },
  {
    name: 'Writesonic',
    description: 'AI writing tool for articles, ads, and product descriptions.',
    fullDescription: 'Writesonic is an AI writing platform that helps create high-quality content for blogs, ads, emails, and websites. It offers various templates and tools for different content needs.',
    category: 'Content Writing',
    tags: ['Article', 'Blog', 'Templates', 'SEO'],
    logoUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop',
    websiteUrl: 'https://writesonic.com',
    highlights: ['AI article writer', 'Bulk processing', 'Chrome extension'],
    pricing: 'Freemium - $19/month',
    isPaid: false,
    createdBy: 'Writesonic'
  },
  {
    name: 'Grammarly',
    description: 'AI-powered writing assistant for grammar, tone, and clarity.',
    fullDescription: 'Grammarly is an AI-powered writing assistant that helps improve your writing by checking grammar, spelling, punctuation, clarity, engagement, and delivery mistakes.',
    category: 'Content Writing',
    tags: ['Grammar', 'Editing', 'Proofreading', 'Browser'],
    logoUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop',
    websiteUrl: 'https://grammarly.com',
    highlights: ['Browser extension', 'Real-time suggestions', 'Plagiarism checker'],
    pricing: 'Freemium - $12/month for Premium',
    isPaid: false,
    createdBy: 'Grammarly'
  },

  // Music Creation (5 tools)
  {
    name: 'AIVA',
    description: 'AI music composer for creating royalty-free soundtracks.',
    fullDescription: 'AIVA is an AI music composer that creates royalty-free music for various creative projects including films, games, and commercials.',
    category: 'Music Creation',
    categories: ['Music Creation'],
    tags: ['Royalty-free music', 'Multiple genres', 'Commercial license'],
    logoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    websiteUrl: 'https://aiva.ai',
    highlights: ['Royalty-free music', 'Multiple genres', 'Commercial license'],
    pricing: 'Freemium - $11/month for Standard',
    isPaid: false,
    createdBy: 'AIVA Technologies'
  },
  {
    name: 'Mubert',
    description: 'AI music generation platform for content creators.',
    fullDescription: 'Mubert generates royalty-free music using AI for content creators, streamers, and businesses looking for background music and soundtracks.',
    category: 'Music Creation',
    tags: ['Background music', 'Streaming', 'Royalty-free', 'Content creation'],
    logoUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop',
    websiteUrl: 'https://mubert.com',
    highlights: ['Real-time generation', 'Multiple moods', 'API access'],
    pricing: 'Freemium - $14/month for Creator',
    isPaid: false,
    createdBy: 'Mubert'
  },
  {
    name: 'Amper Music',
    description: 'AI music composition tool for professionals.',
    fullDescription: 'Amper Music uses AI to help professionals create custom music tracks quickly and easily, with full control over style, mood, and instrumentation.',
    category: 'Music Creation',
    tags: ['Professional', 'Custom music', 'Instrumentation', 'Commercial'],
    logoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    websiteUrl: 'https://www.ampermusic.com',
    highlights: ['Professional quality', 'Custom compositions', 'Full licensing'],
    pricing: 'Paid - Custom pricing',
    isPaid: true,
    createdBy: 'Amper Music'
  },
  {
    name: 'Soundraw',
    description: 'AI music generator with customization options.',
    fullDescription: 'Soundraw allows users to generate and customize AI-created music tracks with control over mood, genre, length, and instruments.',
    category: 'Music Creation',
    tags: ['Customizable', 'Multiple genres', 'Mood control', 'Royalty-free'],
    logoUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop',
    websiteUrl: 'https://soundraw.io',
    highlights: ['Customization tools', 'Unlimited downloads', 'Commercial use'],
    pricing: 'Paid - $16.99/month for Creator',
    isPaid: true,
    createdBy: 'Soundraw'
  },
  {
    name: 'Boomy',
    description: 'AI music creation platform for everyone.',
    fullDescription: 'Boomy makes it easy for anyone to create original songs using AI, even without musical experience. Share and monetize your creations on streaming platforms.',
    category: 'Music Creation',
    tags: ['User-friendly', 'No experience needed', 'Monetization', 'Streaming'],
    logoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    websiteUrl: 'https://boomy.com',
    highlights: ['No musical experience needed', 'Streaming distribution', 'Revenue sharing'],
    pricing: 'Freemium - $9.99/month for Creator',
    isPaid: false,
    createdBy: 'Boomy'
  },

  // Customer Support (5 tools)
  {
    name: 'Zendesk Answer Bot',
    description: 'AI-powered customer support automation.',
    fullDescription: 'Zendesk Answer Bot uses AI to automatically resolve customer inquiries and route complex issues to human agents, improving response times and customer satisfaction.',
    category: 'Customer Support',
    tags: ['Automation', 'Ticketing', 'Knowledge base', 'Enterprise'],
    logoUrl: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop',
    websiteUrl: 'https://zendesk.com/answer-bot',
    highlights: ['Auto-resolution', 'Smart routing', 'Analytics'],
    pricing: 'Paid - $5/month per agent',
    isPaid: true,
    createdBy: 'Zendesk'
  },
  {
    name: 'Intercom Resolution Bot',
    description: 'AI chatbot for customer support and engagement.',
    fullDescription: 'Intercom\'s Resolution Bot uses AI to answer customer questions instantly, resolve common issues, and seamlessly hand off complex queries to human agents.',
    category: 'Customer Support',
    tags: ['Chatbot', 'Live chat', 'Customer engagement', 'Resolution'],
    logoUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop',
    websiteUrl: 'https://intercom.com/resolution-bot',
    highlights: ['Instant answers', 'Seamless handoff', 'Customer insights'],
    pricing: 'Paid - $39/month for Starter',
    isPaid: true,
    createdBy: 'Intercom'
  },
  {
    name: 'Freshworks Freddy AI',
    description: 'AI-powered customer service assistant.',
    fullDescription: 'Freddy AI integrates across Freshworks products to provide intelligent customer service automation, predictive insights, and personalized experiences.',
    category: 'Customer Support',
    tags: ['Predictive', 'Personalization', 'Integration', 'Insights'],
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
    websiteUrl: 'https://freshworks.com/freddy-ai',
    highlights: ['Predictive insights', 'Cross-platform', 'Sentiment analysis'],
    pricing: 'Paid - Included in plans',
    isPaid: true,
    createdBy: 'Freshworks'
  },
  {
    name: 'Ada',
    description: 'AI-powered customer service automation platform.',
    fullDescription: 'Ada provides AI-powered customer service automation that resolves complex inquiries without human intervention, improving efficiency and customer experience.',
    category: 'Customer Support',
    tags: ['Automation', 'Complex queries', 'Multi-channel', 'Analytics'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://ada.cx',
    highlights: ['Complex resolution', 'Multi-channel support', 'Advanced analytics'],
    pricing: 'Paid - Custom pricing',
    isPaid: true,
    createdBy: 'Ada'
  },
  {
    name: 'LivePerson Conversational Cloud',
    description: 'AI-powered conversational commerce platform.',
    fullDescription: 'LivePerson\'s platform uses AI to power conversational experiences across messaging channels, helping businesses automate customer interactions and drive sales.',
    category: 'Customer Support',
    tags: ['Conversational commerce', 'Messaging', 'Sales automation', 'Multi-channel'],
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
    websiteUrl: 'https://liveperson.com',
    highlights: ['Conversational AI', 'Sales integration', 'Messaging-first'],
    pricing: 'Paid - Custom pricing',
    isPaid: true,
    createdBy: 'LivePerson'
  },

  // Interview Prep (5 tools)
  {
    name: 'Pramp',
    description: 'AI-powered mock interview platform for technical interviews.',
    fullDescription: 'Pramp provides AI-driven mock interviews for software engineering and other technical roles, helping candidates practice and improve their interview skills.',
    category: 'Interview Prep',
    tags: ['Technical interviews', 'Mock interviews', 'Coding practice', 'Feedback'],
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    websiteUrl: 'https://pramp.com',
    highlights: ['Peer-to-peer practice', 'Real-time coding', 'Interview feedback'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'Pramp'
  },
  {
    name: 'Interview Warmup',
    description: 'Google\'s AI interview practice tool.',
    fullDescription: 'Interview Warmup by Google uses AI to help job seekers practice answering interview questions and improve their responses with personalized feedback.',
    category: 'Interview Prep',
    tags: ['Google', 'Question practice', 'AI feedback', 'Job preparation'],
    logoUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
    websiteUrl: 'https://grow.google/certificates/interview-warmup',
    highlights: ['Google-powered', 'Industry-specific questions', 'Speech practice'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'Google'
  },
  {
    name: 'InterviewBuddy',
    description: 'AI mock interview platform with human experts.',
    fullDescription: 'InterviewBuddy combines AI technology with human expertise to provide comprehensive mock interview practice for various industries and roles.',
    category: 'Interview Prep',
    tags: ['Human experts', 'Multi-industry', 'Mock interviews', 'Career coaching'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://interviewbuddy.in',
    highlights: ['Expert mentors', 'Industry-specific prep', 'Detailed feedback'],
    pricing: 'Paid - $10 per session',
    isPaid: true,
    createdBy: 'InterviewBuddy'
  },
  {
    name: 'Interviewing.io',
    description: 'Anonymous technical interview practice platform.',
    fullDescription: 'Interviewing.io provides anonymous technical interview practice with engineers from top companies, using AI to match candidates with appropriate interviewers.',
    category: 'Interview Prep',
    tags: ['Anonymous', 'Technical', 'Top companies', 'Engineer matching'],
    logoUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop',
    websiteUrl: 'https://interviewing.io',
    highlights: ['Anonymous practice', 'Top company engineers', 'Technical focus'],
    pricing: 'Freemium - $25 per interview',
    isPaid: false,
    createdBy: 'Interviewing.io'
  },
  {
    name: 'Karat',
    description: 'AI-powered technical interview platform.',
    fullDescription: 'Karat uses AI to conduct and evaluate technical interviews, providing standardized assessment for engineering candidates at scale.',
    category: 'Interview Prep',
    tags: ['Technical assessment', 'Standardized', 'Engineering', 'Scale'],
    logoUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=100&h=100&fit=crop',
    websiteUrl: 'https://karat.com',
    highlights: ['Standardized assessment', 'Technical focus', 'Enterprise solution'],
    pricing: 'Paid - Enterprise pricing',
    isPaid: true,
    createdBy: 'Karat'
  },

  // AI Code Tools (5 tools)
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
    pricing: 'Freemium - $12/month for Pro',
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
    pricing: 'Freemium - $20/month for Pro',
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
    pricing: 'Freemium - $20/month for Hacker',
    isPaid: false,
    createdBy: 'Replit'
  },
  {
    name: 'Amazon CodeWhisperer',
    description: 'Amazon\'s AI coding companion for real-time code suggestions.',
    fullDescription: 'Amazon CodeWhisperer is an AI coding companion that provides real-time code suggestions and recommendations. It helps developers write code faster and more securely with ML-powered suggestions.',
    category: 'AI Code Tools',
    tags: ['Amazon', 'Code Suggestions', 'Security Scanning', 'Real-time'],
    logoUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop',
    websiteUrl: 'https://aws.amazon.com/codewhisperer',
    highlights: ['Real-time suggestions', 'Security scanning', 'Multiple languages', 'AWS integration'],
    pricing: 'Freemium - $19/month for Professional',
    isPaid: false,
    createdBy: 'Amazon'
  },

  // Resume Builder (5 tools)
  {
    name: 'Resume.io',
    description: 'AI-powered resume builder with professional templates.',
    fullDescription: 'Resume.io uses AI to help create professional resumes with smart suggestions, content optimization, and ATS-friendly templates.',
    category: 'Resume Builder',
    tags: ['Professional templates', 'ATS-friendly', 'Content optimization', 'Job matching'],
    logoUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
    websiteUrl: 'https://resume.io',
    highlights: ['ATS optimization', 'Professional templates', 'Content suggestions'],
    pricing: 'Freemium - $2.95/month for Pro',
    isPaid: false,
    createdBy: 'Resume.io'
  },
  {
    name: 'Zety',
    description: 'AI resume builder with job-specific optimization.',
    fullDescription: 'Zety provides AI-powered resume building with job-specific optimization, ensuring your resume matches job requirements and passes ATS systems.',
    category: 'Resume Builder',
    tags: ['Job-specific', 'ATS optimization', 'Cover letters', 'Career advice'],
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    websiteUrl: 'https://zety.com',
    highlights: ['Job matching', 'Cover letter builder', 'Career guidance'],
    pricing: 'Paid - $5.95/month for Full Access',
    isPaid: true,
    createdBy: 'Zety'
  },
  {
    name: 'Kickresume',
    description: 'AI resume writer with designer templates.',
    fullDescription: 'Kickresume combines AI writing assistance with professionally designed templates to create standout resumes and cover letters.',
    category: 'Resume Builder',
    tags: ['Designer templates', 'AI writing', 'Cover letters', 'Portfolio'],
    logoUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
    websiteUrl: 'https://kickresume.com',
    highlights: ['Designer templates', 'AI content writer', 'Portfolio integration'],
    pricing: 'Freemium - $19/month for Premium',
    isPaid: false,
    createdBy: 'Kickresume'
  },
  {
    name: 'Enhancv',
    description: 'AI-powered resume builder with personal branding focus.',
    fullDescription: 'Enhancv uses AI to help build personalized resumes that showcase your unique story and achievements with modern, visually appealing designs.',
    category: 'Resume Builder',
    tags: ['Personal branding', 'Visual design', 'Storytelling', 'Modern templates'],
    logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
    websiteUrl: 'https://enhancv.com',
    highlights: ['Personal branding', 'Visual storytelling', 'Modern designs'],
    pricing: 'Freemium - $24.99/month for Pro',
    isPaid: false,
    createdBy: 'Enhancv'
  },
  {
    name: 'Rezi',
    description: 'AI resume builder optimized for ATS systems.',
    fullDescription: 'Rezi specializes in creating ATS-optimized resumes using AI technology to ensure your resume gets past automated screening systems.',
    category: 'Resume Builder',
    tags: ['ATS optimization', 'Keyword matching', 'Score analysis', 'Job targeting'],
    logoUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=100&h=100&fit=crop',
    websiteUrl: 'https://rezi.ai',
    highlights: ['ATS score analysis', 'Keyword optimization', 'Job targeting'],
    pricing: 'Freemium - $29/month for Pro',
    isPaid: false,
    createdBy: 'Rezi'
  },

  // Email Assistants (5 tools)
  {
    name: 'Boomerang Respondable',
    description: 'AI email assistant for better response rates.',
    fullDescription: 'Boomerang Respondable uses AI to analyze your emails and provide suggestions to improve response rates, optimize send times, and write more effective messages.',
    category: 'Email Assistants',
    tags: ['Response optimization', 'Send time optimization', 'Email analytics', 'Productivity'],
    logoUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
    websiteUrl: 'https://boomerangapp.com/respondable',
    highlights: ['Response rate improvement', 'Send time optimization', 'Email scheduling'],
    pricing: 'Freemium - $4.98/month for Personal',
    isPaid: false,
    createdBy: 'Boomerang'
  },
  {
    name: 'Superhuman',
    description: 'AI-powered email client for productivity.',
    fullDescription: 'Superhuman is an AI-enhanced email client that helps users achieve inbox zero faster with smart features like triage, scheduling, and intelligent shortcuts.',
    category: 'Email Assistants',
    tags: ['Email client', 'Productivity', 'Inbox management', 'Smart features'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://superhuman.com',
    highlights: ['Inbox zero', 'Keyboard shortcuts', 'Email tracking'],
    pricing: 'Paid - $30/month',
    isPaid: true,
    createdBy: 'Superhuman'
  },
  {
    name: 'Ellie',
    description: 'AI email assistant that writes replies in your style.',
    fullDescription: 'Ellie is an AI email assistant that learns your writing style and crafts personalized email replies, helping you respond faster while maintaining your voice.',
    category: 'Email Assistants',
    tags: ['Personal style', 'Auto-reply', 'Learning AI', 'Time-saving'],
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
    websiteUrl: 'https://ellieai.com',
    highlights: ['Learns your style', 'Context-aware replies', 'Multiple languages'],
    pricing: 'Freemium - $19/month for Pro',
    isPaid: false,
    createdBy: 'Ellie AI'
  },
  {
    name: 'Flowrite',
    description: 'AI writing assistant for professional emails.',
    fullDescription: 'Flowrite helps write professional emails and messages using AI, turning short instructions into well-crafted, contextually appropriate communications.',
    category: 'Email Assistants',
    tags: ['Professional writing', 'Email templates', 'Tone adjustment', 'Quick composition'],
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
    websiteUrl: 'https://flowrite.com',
    highlights: ['Professional tone', 'Template library', 'Quick composition'],
    pricing: 'Freemium - $15/month for Premium',
    isPaid: false,
    createdBy: 'Flowrite'
  },
  {
    name: 'Mailbutler Smart Assistant',
    description: 'AI email assistant with smart compose and scheduling.',
    fullDescription: 'Mailbutler\'s Smart Assistant provides AI-powered email composition, smart scheduling, contact insights, and email tracking to enhance email productivity.',
    category: 'Email Assistants',
    tags: ['Smart compose', 'Email scheduling', 'Contact insights', 'Email tracking'],
    logoUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop',
    websiteUrl: 'https://mailbutler.io',
    highlights: ['Smart compose', 'Contact insights', 'Email tracking'],
    pricing: 'Freemium - $4.95/month for Smart',
    isPaid: false,
    createdBy: 'Mailbutler'
  },

  // Data Analysis (5 tools)
  {
    name: 'Tableau with Einstein Analytics',
    description: 'AI-powered data visualization and analytics platform.',
    fullDescription: 'Tableau with Einstein Analytics combines powerful data visualization with AI-driven insights, helping users discover patterns and make data-driven decisions.',
    category: 'Data Analysis',
    tags: ['Data visualization', 'Business intelligence', 'AI insights', 'Enterprise'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://tableau.com',
    highlights: ['Advanced visualizations', 'AI-powered insights', 'Enterprise integration'],
    pricing: 'Paid - $70/month per user',
    isPaid: true,
    createdBy: 'Tableau'
  },
  {
    name: 'MonkeyLearn',
    description: 'AI-powered text analysis and data extraction.',
    fullDescription: 'MonkeyLearn provides AI tools for text analysis, including sentiment analysis, keyword extraction, and intent detection to help businesses understand their data.',
    category: 'Data Analysis',
    tags: ['Text analysis', 'Sentiment analysis', 'Data extraction', 'Machine learning'],
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
    websiteUrl: 'https://monkeylearn.com',
    highlights: ['Text classification', 'Sentiment analysis', 'Easy integration'],
    pricing: 'Freemium - $299/month for Team',
    isPaid: false,
    createdBy: 'MonkeyLearn'
  },
  {
    name: 'DataRobot',
    description: 'Automated machine learning platform for predictive analytics.',
    fullDescription: 'DataRobot automates the process of building and deploying machine learning models, making advanced analytics accessible to business users.',
    category: 'Data Analysis',
    tags: ['AutoML', 'Predictive analytics', 'Machine learning', 'Enterprise'],
    logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
    websiteUrl: 'https://datarobot.com',
    highlights: ['Automated ML', 'Model deployment', 'Enterprise ready'],
    pricing: 'Paid - Enterprise pricing',
    isPaid: true,
    createdBy: 'DataRobot'
  },
  {
    name: 'Alteryx Intelligence Suite',
    description: 'AI and machine learning tools for data analytics.',
    fullDescription: 'Alteryx Intelligence Suite provides AI and machine learning capabilities integrated into the Alteryx analytics platform for advanced data analysis.',
    category: 'Data Analysis',
    tags: ['Data preparation', 'Machine learning', 'Analytics workflow', 'Self-service'],
    logoUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop',
    websiteUrl: 'https://alteryx.com/intelligence-suite',
    highlights: ['Data preparation', 'ML integration', 'Workflow automation'],
    pricing: 'Paid - Custom pricing',
    isPaid: true,
    createdBy: 'Alteryx'
  },
  {
    name: 'Julius AI',
    description: 'AI data analyst that interprets and visualizes your data.',
    fullDescription: 'Julius AI acts as your personal data analyst, helping you analyze, visualize, and gain insights from your data through natural language conversations.',
    category: 'Data Analysis',
    tags: ['Natural language', 'Data visualization', 'Personal analyst', 'Conversational AI'],
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    websiteUrl: 'https://julius.ai',
    highlights: ['Natural language queries', 'Automated insights', 'Easy visualization'],
    pricing: 'Freemium - $20/month for Pro',
    isPaid: false,
    createdBy: 'Julius AI'
  },

  // PDF Tools (5 tools)
  {
    name: 'ChatPDF',
    description: 'AI-powered PDF document analysis and chat interface.',
    fullDescription: 'ChatPDF allows you to upload PDF documents and ask questions about their content using AI, making it easy to extract information and insights from documents.',
    category: 'PDF Tools',
    tags: ['Document analysis', 'Question answering', 'PDF chat', 'Information extraction'],
    logoUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
    websiteUrl: 'https://chatpdf.com',
    highlights: ['PDF conversation', 'Instant answers', 'Multiple languages'],
    pricing: 'Freemium - $5/month for Plus',
    isPaid: false,
    createdBy: 'ChatPDF'
  },
  {
    name: 'PDF.ai',
    description: 'AI document assistant for PDF analysis and summarization.',
    fullDescription: 'PDF.ai provides AI-powered document analysis, summarization, and question-answering capabilities for PDF files, helping users quickly understand document content.',
    category: 'PDF Tools',
    tags: ['Document summarization', 'AI analysis', 'Content extraction', 'Quick insights'],
    logoUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop',
    websiteUrl: 'https://pdf.ai',
    highlights: ['Document summarization', 'Key insights', 'Fast processing'],
    pricing: 'Freemium - $19/month for Pro',
    isPaid: false,
    createdBy: 'PDF.ai'
  },
  {
    name: 'Humata',
    description: 'AI assistant for document research and analysis.',
    fullDescription: 'Humata is an AI-powered document assistant that helps researchers, students, and professionals quickly analyze and extract insights from complex documents.',
    category: 'PDF Tools',
    tags: ['Research assistant', 'Document analysis', 'Academic research', 'Professional documents'],
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    websiteUrl: 'https://humata.ai',
    highlights: ['Research focused', 'Complex document analysis', 'Citation generation'],
    pricing: 'Freemium - $14.99/month for Pro',
    isPaid: false,
    createdBy: 'Humata'
  },
  {
    name: 'AskYourPDF',
    description: 'Conversational AI for PDF document interaction.',
    fullDescription: 'AskYourPDF enables users to have conversations with their PDF documents, extracting information and answers through natural language queries.',
    category: 'PDF Tools',
    tags: ['Conversational AI', 'Document interaction', 'Natural language', 'Information retrieval'],
    logoUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
    websiteUrl: 'https://askyourpdf.com',
    highlights: ['Natural conversation', 'Multi-document support', 'API access'],
    pricing: 'Freemium - $19.99/month for Premium',
    isPaid: false,
    createdBy: 'AskYourPDF'
  },
  {
    name: 'Docsumo',
    description: 'AI-powered document data extraction and processing.',
    fullDescription: 'Docsumo uses AI to automatically extract data from documents like invoices, receipts, and forms, streamlining document processing workflows.',
    category: 'PDF Tools',
    tags: ['Data extraction', 'Document processing', 'Invoice processing', 'Workflow automation'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://docsumo.com',
    highlights: ['Automated extraction', 'Workflow integration', 'High accuracy'],
    pricing: 'Freemium - $500/month for Growth',
    isPaid: false,
    createdBy: 'Docsumo'
  },

  // Legal AI Tools (5 tools)
  {
    name: 'Harvey',
    description: 'AI legal assistant for law firms and legal professionals.',
    fullDescription: 'Harvey is an AI assistant specifically designed for legal professionals, helping with contract analysis, legal research, and document drafting.',
    category: 'Legal AI Tools',
    tags: ['Legal research', 'Contract analysis', 'Document drafting', 'Law firms'],
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    websiteUrl: 'https://harvey.ai',
    highlights: ['Legal-specific AI', 'Contract analysis', 'Research assistance'],
    pricing: 'Paid - Enterprise pricing',
    isPaid: true,
    createdBy: 'Harvey'
  },
  {
    name: 'DoNotPay',
    description: 'AI lawyer for consumer rights and legal assistance.',
    fullDescription: 'DoNotPay provides AI-powered legal assistance for common consumer issues like parking tickets, subscription cancellations, and small claims.',
    category: 'Legal AI Tools',
    tags: ['Consumer rights', 'Legal assistance', 'Parking tickets', 'Small claims'],
    logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
    websiteUrl: 'https://donotpay.com',
    highlights: ['Consumer focused', 'Automated legal actions', 'Cost-effective'],
    pricing: 'Paid - $36/year',
    isPaid: true,
    createdBy: 'DoNotPay'
  },
  {
    name: 'Lawgeex',
    description: 'AI contract review and analysis platform.',
    fullDescription: 'Lawgeex uses AI to review and analyze contracts, identifying potential issues and ensuring compliance with legal standards and company policies.',
    category: 'Legal AI Tools',
    tags: ['Contract review', 'Legal compliance', 'Risk analysis', 'Enterprise'],
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
    websiteUrl: 'https://lawgeex.com',
    highlights: ['Contract review', 'Compliance checking', 'Risk assessment'],
    pricing: 'Paid - Enterprise pricing',
    isPaid: true,
    createdBy: 'Lawgeex'
  },
  {
    name: 'Spellbook',
    description: 'AI assistant for contract drafting and review.',
    fullDescription: 'Spellbook integrates with Microsoft Word to provide AI-powered contract drafting and review capabilities, helping lawyers work more efficiently.',
    category: 'Legal AI Tools',
    tags: ['Contract drafting', 'Microsoft Word', 'Legal writing', 'Efficiency'],
    logoUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
    websiteUrl: 'https://spellbook.legal',
    highlights: ['Word integration', 'Contract drafting', 'Legal suggestions'],
    pricing: 'Paid - $40/month per user',
    isPaid: true,
    createdBy: 'Spellbook'
  },
  {
    name: 'Kira Systems',
    description: 'AI-powered contract analysis and due diligence.',
    fullDescription: 'Kira Systems provides AI-powered contract analysis and due diligence tools for law firms and corporate legal departments.',
    category: 'Legal AI Tools',
    tags: ['Due diligence', 'Contract analysis', 'Legal research', 'Enterprise'],
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
    websiteUrl: 'https://kirasystems.com',
    highlights: ['Due diligence', 'Contract extraction', 'Legal analytics'],
    pricing: 'Paid - Enterprise pricing',
    isPaid: true,
    createdBy: 'Kira Systems'
  },

  // Language Translation (5 tools)
  {
    name: 'DeepL',
    description: 'AI-powered translation with superior accuracy and nuance.',
    fullDescription: 'DeepL provides highly accurate AI translation that captures nuance and context better than traditional translation tools, supporting dozens of languages.',
    category: 'Language Translation',
    tags: ['High accuracy', 'Nuanced translation', 'Multiple languages', 'Context-aware'],
    logoUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop',
    websiteUrl: 'https://deepl.com',
    highlights: ['Superior accuracy', 'Context understanding', 'Document translation'],
    pricing: 'Freemium - $6.99/month for Pro',
    isPaid: false,
    createdBy: 'DeepL'
  },
  {
    name: 'Google Translate',
    description: 'Free AI translation service supporting 100+ languages.',
    fullDescription: 'Google Translate offers free AI-powered translation between over 100 languages with features like camera translation and voice input.',
    category: 'Language Translation',
    tags: ['Free', '100+ languages', 'Camera translation', 'Voice input'],
    logoUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
    websiteUrl: 'https://translate.google.com',
    highlights: ['100+ languages', 'Camera translation', 'Voice input'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'Google'
  },
  {
    name: 'Microsoft Translator',
    description: 'AI translation service with business integration.',
    fullDescription: 'Microsoft Translator provides AI-powered translation with strong business integrations, real-time conversation translation, and enterprise features.',
    category: 'Language Translation',
    tags: ['Business integration', 'Real-time conversation', 'Enterprise', 'API access'],
    logoUrl: 'https://images.unsplash.com/photo-1559526324-593bc1d3c4aa?w=100&h=100&fit=crop',
    websiteUrl: 'https://translator.microsoft.com',
    highlights: ['Business focused', 'Real-time conversation', 'Enterprise integration'],
    pricing: 'Freemium - Pay per use',
    isPaid: false,
    createdBy: 'Microsoft'
  },
  {
    name: 'Reverso',
    description: 'AI translation with context examples and learning tools.',
    fullDescription: 'Reverso combines AI translation with context examples, conjugation tools, and language learning features to provide comprehensive translation assistance.',
    category: 'Language Translation',
    tags: ['Context examples', 'Language learning', 'Conjugation', 'Educational'],
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
    websiteUrl: 'https://reverso.net',
    highlights: ['Context examples', 'Learning tools', 'Conjugation help'],
    pricing: 'Freemium - $9.99/month for Premium',
    isPaid: false,
    createdBy: 'Reverso'
  },
  {
    name: 'Linguee',
    description: 'AI-powered translation with bilingual example sentences.',
    fullDescription: 'Linguee provides AI translation enhanced with billions of bilingual example sentences from reliable sources, helping users understand context and usage.',
    category: 'Language Translation',
    tags: ['Bilingual examples', 'Context learning', 'Reliable sources', 'Usage examples'],
    logoUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop',
    websiteUrl: 'https://linguee.com',
    highlights: ['Bilingual examples', 'Reliable sources', 'Context understanding'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'Linguee'
  },

  // Design Tools (5 tools)
  {
    name: 'Canva Magic Design',
    description: 'AI-powered design assistant with smart templates.',
    fullDescription: 'Canva\'s Magic Design uses AI to create custom designs instantly based on your content and preferences, with access to millions of templates and elements.',
    category: 'Design Tools',
    tags: ['Smart templates', 'Instant design', 'Brand consistency', 'Easy to use'],
    logoUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    websiteUrl: 'https://canva.com/magic-design',
    highlights: ['Instant design generation', 'Brand kit integration', 'Millions of elements'],
    pricing: 'Freemium - $14.99/month for Pro',
    isPaid: false,
    createdBy: 'Canva'
  },
  {
    name: 'Figma AI',
    description: 'AI-enhanced collaborative design platform.',
    fullDescription: 'Figma integrates AI features to enhance the collaborative design process with smart suggestions, automated layouts, and intelligent design assistance.',
    category: 'Design Tools',
    tags: ['Collaborative design', 'Smart suggestions', 'UI/UX design', 'Team collaboration'],
    logoUrl: 'https://images.unsplash.com/photo-1545665277-5937750c7b45?w=100&h=100&fit=crop',
    websiteUrl: 'https://figma.com',
    highlights: ['Real-time collaboration', 'Smart suggestions', 'Design systems'],
    pricing: 'Freemium - $12/month per editor',
    isPaid: false,
    createdBy: 'Figma'
  },
  {
    name: 'Framer AI',
    description: 'AI website builder with advanced design capabilities.',
    fullDescription: 'Framer AI helps create responsive websites with advanced design capabilities, AI-generated content, and seamless animations.',
    category: 'Design Tools',
    tags: ['Website builder', 'Responsive design', 'AI content', 'Animations'],
    logoUrl: 'https://images.unsplash.com/photo-1493119508027-2b584f234d6c?w=100&h=100&fit=crop',
    websiteUrl: 'https://framer.com',
    highlights: ['AI website generation', 'Advanced animations', 'Responsive design'],
    pricing: 'Freemium - $15/month for Mini',
    isPaid: false,
    createdBy: 'Framer'
  },
  {
    name: 'Uizard',
    description: 'AI-powered UI design tool from sketches to prototypes.',
    fullDescription: 'Uizard transforms hand-drawn sketches into digital designs and prototypes using AI, making UI design accessible to everyone.',
    category: 'Design Tools',
    tags: ['Sketch to design', 'UI prototyping', 'No design skills', 'Rapid prototyping'],
    logoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop',
    websiteUrl: 'https://uizard.io',
    highlights: ['Sketch recognition', 'Rapid prototyping', 'No design experience needed'],
    pricing: 'Freemium - $12/month for Pro',
    isPaid: false,
    createdBy: 'Uizard'
  },
  {
    name: 'Khroma',
    description: 'AI color palette generator for designers.',
    fullDescription: 'Khroma uses AI to generate unlimited color palettes based on your preferences, helping designers discover and create beautiful color combinations.',
    category: 'Design Tools',
    tags: ['Color palettes', 'Color theory', 'Design inspiration', 'Personalized'],
    logoUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop',
    websiteUrl: 'https://khroma.co',
    highlights: ['Personalized palettes', 'Unlimited combinations', 'Color accessibility'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'Khroma'
  },

  // Avatars & Voice (5 tools)
  {
    name: 'ElevenLabs',
    description: 'AI voice generation and cloning platform.',
    fullDescription: 'ElevenLabs provides realistic AI voice generation and voice cloning technology, enabling users to create natural-sounding speech from text.',
    category: 'Avatars & Voice',
    tags: ['Voice generation', 'Voice cloning', 'Text-to-speech', 'Realistic voices'],
    logoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    websiteUrl: 'https://elevenlabs.io',
    highlights: ['Realistic voice cloning', 'Multiple languages', 'API access'],
    pricing: 'Freemium - $5/month for Starter',
    isPaid: false,
    createdBy: 'ElevenLabs'
  },
  {
    name: 'D-ID',
    description: 'AI video generation with talking avatars.',
    fullDescription: 'D-ID creates AI-generated videos with talking avatars from still images, enabling personalized video content creation at scale.',
    category: 'Avatars & Voice',
    tags: ['Talking avatars', 'Video generation', 'Personalized content', 'Still to video'],
    logoUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=100&h=100&fit=crop',
    websiteUrl: 'https://d-id.com',
    highlights: ['Photo to video', 'Realistic avatars', 'Multi-language support'],
    pricing: 'Freemium - $5.99/month for Lite',
    isPaid: false,
    createdBy: 'D-ID'
  },
  {
    name: 'Murf AI',
    description: 'AI voice generator for professional voiceovers.',
    fullDescription: 'Murf AI creates professional-quality voiceovers using AI, offering a wide range of voices and languages for various content needs.',
    category: 'Avatars & Voice',
    tags: ['Professional voiceover', 'Multiple voices', 'Content creation', 'High quality'],
    logoUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop',
    websiteUrl: 'https://murf.ai',
    highlights: ['Studio-quality voices', '120+ voices', 'Voice customization'],
    pricing: 'Freemium - $23/month for Basic',
    isPaid: false,
    createdBy: 'Murf'
  },
  {
    name: 'Ready Player Me',
    description: 'AI-powered avatar creation platform.',
    fullDescription: 'Ready Player Me creates personalized 3D avatars using AI from photos, designed for use across games, VR, and virtual worlds.',
    category: 'Avatars & Voice',
    tags: ['3D avatars', 'Photo to avatar', 'Gaming', 'Virtual worlds'],
    logoUrl: 'https://images.unsplash.com/photo-1493119508027-2b584f234d6c?w=100&h=100&fit=crop',
    websiteUrl: 'https://readyplayer.me',
    highlights: ['Cross-platform avatars', 'Photo-realistic', 'Gaming integration'],
    pricing: 'Freemium - Custom pricing for Enterprise',
    isPaid: false,
    createdBy: 'Ready Player Me'
  },
  {
    name: 'Replica Studios',
    description: 'AI voice actors for creative projects.',
    fullDescription: 'Replica Studios provides AI voice actors with unique personalities and emotional range for games, films, and creative projects.',
    category: 'Avatars & Voice',
    tags: ['Voice acting', 'Creative projects', 'Emotional range', 'Character voices'],
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
    websiteUrl: 'https://replicastudios.com',
    highlights: ['Character voices', 'Emotional performance', 'Creative focus'],
    pricing: 'Freemium - $4/month for Individual',
    isPaid: false,
    createdBy: 'Replica Studios'
  },

  // Marketing (5 tools)
  {
    name: 'HubSpot Marketing Hub',
    description: 'AI-powered inbound marketing automation platform.',
    fullDescription: 'HubSpot Marketing Hub uses AI to automate marketing campaigns, personalize content, and optimize lead generation across multiple channels.',
    category: 'Marketing',
    tags: ['Marketing automation', 'Lead generation', 'Email marketing', 'Analytics'],
    logoUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop',
    websiteUrl: 'https://hubspot.com/products/marketing',
    highlights: ['Complete marketing suite', 'Free CRM integration', 'Advanced analytics'],
    pricing: 'Freemium - $45/month for Starter',
    isPaid: false,
    createdBy: 'HubSpot'
  },
  {
    name: 'Persado',
    description: 'AI-powered marketing language optimization.',
    fullDescription: 'Persado uses AI to optimize marketing language and messaging, generating personalized content that drives higher engagement and conversions.',
    category: 'Marketing',
    tags: ['Language optimization', 'Personalization', 'A/B testing', 'Conversion optimization'],
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
    websiteUrl: 'https://persado.com',
    highlights: ['Language optimization', 'Personalized messaging', 'Performance analytics'],
    pricing: 'Paid - Enterprise pricing',
    isPaid: true,
    createdBy: 'Persado'
  },
  {
    name: 'Seventh Sense',
    description: 'AI email send time optimization for HubSpot and Marketo.',
    fullDescription: 'Seventh Sense uses AI to optimize email send times for each individual contact, improving open rates and engagement in HubSpot and Marketo.',
    category: 'Marketing',
    tags: ['Email optimization', 'Send time optimization', 'HubSpot integration', 'Marketo integration'],
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
    websiteUrl: 'https://theseventhsense.com',
    highlights: ['Individual send time optimization', 'Platform integration', 'Improved engagement'],
    pricing: 'Paid - $70/month for Professional',
    isPaid: true,
    createdBy: 'Seventh Sense'
  },
  {
    name: 'Phrasee',
    description: 'AI copywriting for email marketing campaigns.',
    fullDescription: 'Phrasee generates and optimizes email subject lines, body copy, and push notifications using AI to maximize engagement and conversions.',
    category: 'Marketing',
    tags: ['Email copywriting', 'Subject line optimization', 'A/B testing', 'Campaign optimization'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://phrasee.co',
    highlights: ['AI copywriting', 'Subject line optimization', 'Performance tracking'],
    pricing: 'Paid - Custom pricing',
    isPaid: true,
    createdBy: 'Phrasee'
  },
  {
    name: 'Adext AI',
    description: 'AI-powered digital advertising optimization.',
    fullDescription: 'Adext AI automatically optimizes digital advertising campaigns across Google Ads and Facebook Ads, maximizing ROI through machine learning.',
    category: 'Marketing',
    tags: ['Ad optimization', 'Google Ads', 'Facebook Ads', 'ROI maximization'],
    logoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&h=100&fit=crop',
    websiteUrl: 'https://adext.ai',
    highlights: ['Automated optimization', 'Multi-platform support', 'ROI focused'],
    pricing: 'Paid - 12% of ad spend',
    isPaid: true,
    createdBy: 'Adext'
  },

  // SEO Tools (5 tools)
  {
    name: 'Surfer SEO',
    description: 'AI-powered SEO optimization and content analysis platform.',
    fullDescription: 'Surfer SEO uses AI to analyze top-ranking pages and provides data-driven recommendations for optimizing content, keywords, and on-page SEO elements.',
    category: 'SEO Tools',
    tags: ['SEO Analysis', 'Content Optimization', 'Keyword Research', 'SERP Analysis'],
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
    websiteUrl: 'https://surferseo.com',
    highlights: ['Content editor', 'SERP analysis', 'Keyword clustering'],
    pricing: 'Paid - $69/month for Basic',
    isPaid: true,
    createdBy: 'Surfer SEO'
  },
  {
    name: 'Clearscope',
    description: 'AI-driven content optimization platform for SEO.',
    fullDescription: 'Clearscope helps content creators optimize their articles for search engines by providing AI-powered recommendations for keywords, topics, and content structure.',
    category: 'SEO Tools',
    tags: ['Content Optimization', 'SEO Writing', 'Keyword Research', 'Content Analysis'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://clearscope.io',
    highlights: ['Content grading', 'Real-time optimization', 'Team collaboration'],
    pricing: 'Paid - $170/month for Essentials',
    isPaid: true,
    createdBy: 'Clearscope'
  },
  {
    name: 'MarketMuse',
    description: 'AI-powered content planning and optimization platform.',
    fullDescription: 'MarketMuse uses AI to analyze content gaps, plan content strategies, and optimize existing content for better search engine performance and user engagement.',
    category: 'SEO Tools',
    tags: ['Content Planning', 'SEO Strategy', 'Content Gap Analysis', 'Topic Modeling'],
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    websiteUrl: 'https://marketmuse.com',
    highlights: ['Content planning', 'Competitive analysis', 'Topic clusters'],
    pricing: 'Freemium - $149/month for Standard',
    isPaid: false,
    createdBy: 'MarketMuse'
  },
  {
    name: 'Frase',
    description: 'AI-powered SEO content optimization and research tool.',
    fullDescription: 'Frase combines AI-powered content optimization with research capabilities to help create SEO-friendly content that ranks higher in search results.',
    category: 'SEO Tools',
    tags: ['Content Research', 'SEO Optimization', 'Answer Engine', 'Content Briefs'],
    logoUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
    websiteUrl: 'https://frase.io',
    highlights: ['Question research', 'Content briefs', 'AI writing assistant'],
    pricing: 'Paid - $14.99/month for Solo',
    isPaid: true,
    createdBy: 'Frase'
  },
  {
    name: 'Page Optimizer Pro',
    description: 'AI-driven on-page SEO optimization and analysis tool.',
    fullDescription: 'Page Optimizer Pro analyzes top-ranking pages and provides detailed recommendations for optimizing on-page SEO elements including content, structure, and technical factors.',
    category: 'SEO Tools',
    tags: ['On-page SEO', 'Page Analysis', 'SEO Recommendations', 'Technical SEO'],
    logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
    websiteUrl: 'https://pageoptimizer.pro',
    highlights: ['On-page analysis', 'Technical recommendations', 'Competitor insights'],
    pricing: 'Paid - $34/month for Basic',
    isPaid: true,
    createdBy: 'Page Optimizer Pro'
  }
];

async function populateTools() {
  try {
    console.log('Starting to populate tools...');
    
    // Get existing tools to check for duplicates
    const existingTools = await toolService.getAllTools();
    const existingNames = new Set(existingTools.map(tool => tool.name));
    
    console.log(`Found ${existingTools.length} existing tools`);
    
    // Add only new tools (avoid duplicates)
    const addedTools = [];
    const skippedTools = [];
    
    for (const tool of toolsToAdd) {
      try {
        if (existingNames.has(tool.name)) {
          skippedTools.push(tool.name);
          console.log(`⚠ Skipped existing: ${tool.name}`);
        } else {
          // Ensure new data model compatibility: add categories array
          const toolWithCategories = {
            ...tool,
            categories: Array.isArray(tool.categories) ? tool.categories : [tool.category].filter(Boolean)
          };
          await toolService.addTool(toolWithCategories);
          addedTools.push(toolWithCategories);
          console.log(`✓ Successfully added: ${tool.name}`);
        }
      } catch (error) {
        console.error(`✗ Error adding ${tool.name}:`, error);
      }
    }
    
    console.log('✅ Population process completed!');
    console.log(`New tools added: ${addedTools.length}`);
    console.log(`Tools skipped (already exist): ${skippedTools.length}`);
    console.log(`Total tools in database: ${existingTools.length + addedTools.length}`);
    
    // Display summary by category for new tools only
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

// Export the function for use in other modules
export { populateTools };