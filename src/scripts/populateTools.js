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

  // Image Generation (5 tools)
  {
    name: 'DALL-E 3',
    description: 'Advanced AI image generator from OpenAI with stunning quality.',
    fullDescription: 'DALL-E 3 is OpenAI\'s latest image generation model that creates high-quality, detailed images from text descriptions with improved understanding and safety.',
    category: 'Image Generation',
    tags: ['Image', 'Art', 'Creative', 'OpenAI'],
    logoUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop',
    websiteUrl: 'https://openai.com/dall-e-3',
    highlights: ['High quality', 'Safety focused', 'ChatGPT integration'],
    pricing: 'Paid - $15 for 115 credits',
    isPaid: true,
    createdBy: 'OpenAI'
  },
  {
    name: 'Midjourney',
    description: 'AI art generator known for artistic and creative images.',
    fullDescription: 'Midjourney is an independent research lab that produces an AI program for generating images from textual descriptions, similar to OpenAI\'s DALL-E and Stable Diffusion.',
    category: 'Image Generation',
    tags: ['Art', 'Creative', 'Discord', 'Professional'],
    logoUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    websiteUrl: 'https://midjourney.com',
    highlights: ['Artistic style', 'Discord bot', 'Community driven'],
    pricing: 'Paid - $10/month',
    isPaid: true,
    createdBy: 'Midjourney'
  },
  {
    name: 'Stable Diffusion',
    description: 'Open-source AI image generator with customization options.',
    fullDescription: 'Stable Diffusion is a deep learning, text-to-image model that can generate detailed images conditioned on text descriptions and can be run locally or through various online services.',
    category: 'Image Generation',
    tags: ['Open Source', 'Customizable', 'Local', 'Free'],
    logoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&h=100&fit=crop',
    websiteUrl: 'https://stability.ai/stable-diffusion',
    highlights: ['Open source', 'Run locally', 'Highly customizable'],
    pricing: 'Free - Open Source',
    isPaid: false,
    createdBy: 'Stability AI'
  },
  {
    name: 'Adobe Firefly',
    description: 'Adobe\'s AI image generator integrated with Creative Suite.',
    fullDescription: 'Adobe Firefly is a family of creative generative AI models integrated into Adobe\'s Creative Cloud applications, designed for safe commercial use.',
    category: 'Image Generation',
    tags: ['Adobe', 'Commercial', 'Integration', 'Professional'],
    logoUrl: 'https://images.unsplash.com/photo-1545665277-5937750c7b45?w=100&h=100&fit=crop',
    websiteUrl: 'https://firefly.adobe.com',
    highlights: ['Commercial safe', 'Adobe integration', 'Professional grade'],
    pricing: 'Freemium - Included with Creative Cloud',
    isPaid: false,
    createdBy: 'Adobe'
  },
  {
    name: 'Leonardo AI',
    description: 'AI image generator focused on game assets and character design.',
    fullDescription: 'Leonardo AI is a creative platform that uses AI to generate stunning art, images, and assets for games, with fine-tuned models for specific use cases.',
    category: 'Image Generation',
    tags: ['Gaming', 'Characters', 'Assets', 'Fine-tuned'],
    logoUrl: 'https://images.unsplash.com/photo-1493119508027-2b584f234d6c?w=100&h=100&fit=crop',
    websiteUrl: 'https://leonardo.ai',
    highlights: ['Game focused', 'Fine-tuned models', 'Asset generation'],
    pricing: 'Freemium - $12/month for Premium',
    isPaid: false,
    createdBy: 'Leonardo AI'
  },

  // Personal Assistants (5 tools)
  {
    name: 'Claude',
    description: 'Anthropic\'s AI assistant known for being helpful, harmless, and honest.',
    fullDescription: 'Claude is Anthropic\'s AI assistant that excels at analysis, writing, and coding. Known for being helpful, harmless, and honest in all interactions with strong reasoning capabilities.',
    category: 'Personal Assistants',
    tags: ['Chat', 'Analysis', 'Writing', 'Code'],
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    websiteUrl: 'https://claude.ai',
    highlights: ['Long context window', 'File uploads', 'Ethical AI'],
    pricing: 'Freemium - $20/month for Pro',
    isPaid: false,
    createdBy: 'Anthropic'
  },
  {
    name: 'Perplexity AI',
    description: 'AI-powered search engine that provides accurate, real-time answers.',
    fullDescription: 'Perplexity AI is an AI-powered search engine that provides accurate, real-time answers with citations. Perfect for research and fact-checking with up-to-date information.',
    category: 'Personal Assistants',
    tags: ['Search', 'Research', 'Citations', 'Real-time'],
    logoUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
    websiteUrl: 'https://perplexity.ai',
    highlights: ['Real-time data', 'Source citations', 'Mobile friendly'],
    pricing: 'Freemium - $20/month for Pro',
    isPaid: false,
    createdBy: 'Perplexity AI'
  },
  {
    name: 'Character.AI',
    description: 'Create and chat with AI characters for entertainment and creativity.',
    fullDescription: 'Character.AI allows users to create and chat with AI characters. Build custom personalities for entertainment, role-playing, or creative writing assistance.',
    category: 'Personal Assistants',
    tags: ['Characters', 'Chat', 'Entertainment', 'Creative'],
    logoUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=100&h=100&fit=crop',
    websiteUrl: 'https://beta.character.ai',
    highlights: ['Custom characters', 'Community driven', 'Creative writing'],
    pricing: 'Freemium - $9.99/month for Plus',
    isPaid: false,
    createdBy: 'Character.AI'
  },
  {
    name: 'Microsoft Copilot',
    description: 'Microsoft\'s AI assistant integrated across Office 365 and Windows.',
    fullDescription: 'Microsoft Copilot is an AI assistant integrated across Office 365 and Windows. Helps with productivity, coding, and creative tasks with enterprise-grade security.',
    category: 'Personal Assistants',
    tags: ['Microsoft', 'Office', 'Productivity', 'Integration'],
    logoUrl: 'https://images.unsplash.com/photo-1559526324-593bc1d3c4aa?w=100&h=100&fit=crop',
    websiteUrl: 'https://copilot.microsoft.com',
    highlights: ['Office integration', 'Enterprise ready', 'Multi-platform'],
    pricing: 'Freemium - $30/month for Microsoft 365',
    isPaid: false,
    createdBy: 'Microsoft'
  },
  {
    name: 'Google Bard',
    description: 'Google\'s conversational AI powered by Gemini.',
    fullDescription: 'Google Bard is a conversational AI service powered by Google\'s Gemini model, designed to help with creative and informational tasks.',
    category: 'Personal Assistants',
    tags: ['Google', 'Gemini', 'Search', 'Integration'],
    logoUrl: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
    websiteUrl: 'https://bard.google.com',
    highlights: ['Google integration', 'Real-time info', 'Free to use'],
    pricing: 'Free',
    isPaid: false,
    createdBy: 'Google'
  },

  // Chatbots (5 tools)
  {
    name: 'Dialogflow',
    description: 'Google\'s platform for building conversational interfaces.',
    fullDescription: 'Dialogflow is Google\'s natural language understanding platform that makes it easy to design and integrate conversational user interfaces into mobile apps, web applications, devices, and bots.',
    category: 'Chatbots',
    tags: ['Google', 'NLU', 'Integration', 'Developer'],
    logoUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop',
    websiteUrl: 'https://dialogflow.cloud.google.com',
    highlights: ['Google Cloud', 'Multi-platform', 'Rich integrations'],
    pricing: 'Freemium - Pay per request',
    isPaid: false,
    createdBy: 'Google'
  },
  {
    name: 'Chatfuel',
    description: 'No-code chatbot builder for Facebook Messenger and Instagram.',
    fullDescription: 'Chatfuel is a chatbot platform for Facebook Messenger and Instagram that allows businesses to automate customer service and marketing without coding knowledge.',
    category: 'Chatbots',
    tags: ['No-code', 'Facebook', 'Instagram', 'Marketing'],
    logoUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=100&h=100&fit=crop',
    websiteUrl: 'https://chatfuel.com',
    highlights: ['No coding required', 'Social media focus', 'E-commerce ready'],
    pricing: 'Freemium - $15/month for Pro',
    isPaid: false,
    createdBy: 'Chatfuel'
  },
  {
    name: 'ManyChat',
    description: 'Visual chatbot builder for marketing automation.',
    fullDescription: 'ManyChat is a visual chatbot builder that helps businesses automate their marketing on Facebook Messenger, Instagram, SMS, and email.',
    category: 'Chatbots',
    tags: ['Visual', 'Marketing', 'Automation', 'Multi-channel'],
    logoUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=100&h=100&fit=crop',
    websiteUrl: 'https://manychat.com',
    highlights: ['Visual flow builder', 'Multi-channel', 'Growth tools'],
    pricing: 'Freemium - $15/month for Pro',
    isPaid: false,
    createdBy: 'ManyChat'
  },
  {
    name: 'Botpress',
    description: 'Open-source conversational AI platform for developers.',
    fullDescription: 'Botpress is an open-source conversational AI platform that enables developers to build, deploy, and manage chatbots with advanced NLU capabilities.',
    category: 'Chatbots',
    tags: ['Open Source', 'Developer', 'NLU', 'Self-hosted'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://botpress.com',
    highlights: ['Open source', 'Self-hosted option', 'Advanced NLU'],
    pricing: 'Freemium - $50/month for Team',
    isPaid: false,
    createdBy: 'Botpress'
  },
  {
    name: 'Landbot',
    description: 'No-code chatbot builder with conversational experiences.',
    fullDescription: 'Landbot is a no-code chatbot builder that creates conversational experiences for websites, WhatsApp, and Facebook Messenger with a focus on lead generation.',
    category: 'Chatbots',
    tags: ['No-code', 'Lead generation', 'WhatsApp', 'Website'],
    logoUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
    websiteUrl: 'https://landbot.io',
    highlights: ['No-code', 'Lead generation', 'Multi-platform'],
    pricing: 'Freemium - $30/month for Starter',
    isPaid: false,
    createdBy: 'Landbot'
  },

  // Sales (5 tools)
  {
    name: 'Gong.io',
    description: 'AI-powered revenue intelligence platform for sales teams.',
    fullDescription: 'Gong.io is a revenue intelligence platform that uses AI to analyze sales calls and meetings, providing insights to help sales teams close more deals.',
    category: 'Sales',
    tags: ['Revenue', 'Sales calls', 'Analytics', 'Enterprise'],
    logoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&h=100&fit=crop',
    websiteUrl: 'https://gong.io',
    highlights: ['Call analysis', 'Deal insights', 'Coaching tools'],
    pricing: 'Paid - Custom pricing',
    isPaid: true,
    createdBy: 'Gong.io'
  },
  {
    name: 'Outreach.io',
    description: 'AI-powered sales engagement platform.',
    fullDescription: 'Outreach.io is a sales engagement platform that uses AI to help sales teams automate and optimize their outreach efforts across email, phone, and social channels.',
    category: 'Sales',
    tags: ['Engagement', 'Automation', 'Multi-channel', 'Enterprise'],
    logoUrl: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop',
    websiteUrl: 'https://outreach.io',
    highlights: ['Multi-channel outreach', 'AI optimization', 'CRM integration'],
    pricing: 'Paid - $100/month per user',
    isPaid: true,
    createdBy: 'Outreach'
  },
  {
    name: 'Conversica',
    description: 'AI-powered virtual sales assistant for lead follow-up.',
    fullDescription: 'Conversica provides AI-powered virtual sales assistants that engage leads through personalized conversations across email and SMS to qualify and nurture prospects.',
    category: 'Sales',
    tags: ['Virtual assistant', 'Lead qualification', 'Email', 'SMS'],
    logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    websiteUrl: 'https://conversica.com',
    highlights: ['Virtual assistant', 'Lead nurturing', 'Personalized outreach'],
    pricing: 'Paid - Custom pricing',
    isPaid: true,
    createdBy: 'Conversica'
  },
  {
    name: 'Salesloft',
    description: 'AI-powered sales engagement and revenue operations platform.',
    fullDescription: 'Salesloft provides a comprehensive sales engagement platform with AI-powered insights, email automation, and revenue intelligence to help sales teams increase productivity.',
    category: 'Sales',
    tags: ['Sales engagement', 'Revenue ops', 'Email automation', 'Analytics'],
    logoUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=100&h=100&fit=crop',
    websiteUrl: 'https://salesloft.com',
    highlights: ['Sales engagement', 'Revenue intelligence', 'Team collaboration'],
    pricing: 'Paid - $75/month per user',
    isPaid: true,
    createdBy: 'Salesloft'
  },
  {
    name: 'HubSpot Sales Hub',
    description: 'AI-powered CRM and sales automation platform.',
    fullDescription: 'HubSpot Sales Hub combines CRM, sales automation, and AI-powered insights to help sales teams manage prospects, track deals, and close more sales.',
    category: 'Sales',
    tags: ['CRM', 'Sales automation', 'Pipeline management', 'Reporting'],
    logoUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop',
    websiteUrl: 'https://hubspot.com/products/sales',
    highlights: ['Free CRM', 'Sales automation', 'Integrated marketing'],
    pricing: 'Freemium - $45/month per user',
    isPaid: false,
    createdBy: 'HubSpot'
  },

  // Productivity (5 tools)
  {
    name: 'Notion AI',
    description: 'AI-powered writing and productivity assistant built into Notion.',
    fullDescription: 'Notion AI integrates artificial intelligence directly into Notion workspaces, helping users write, edit, summarize, and organize content more efficiently.',
    category: 'Productivity',
    tags: ['Writing', 'Notes', 'Organization', 'Collaboration'],
    logoUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=100&h=100&fit=crop',
    websiteUrl: 'https://notion.so/product/ai',
    highlights: ['Integrated AI', 'Team collaboration', 'Template library'],
    pricing: 'Paid - $10/month per user',
    isPaid: true,
    createdBy: 'Notion'
  },
  {
    name: 'Otter.ai',
    description: 'AI-powered meeting transcription and note-taking assistant.',
    fullDescription: 'Otter.ai provides real-time transcription and automated meeting notes, helping teams capture and organize important conversations and decisions.',
    category: 'Productivity',
    tags: ['Transcription', 'Meetings', 'Notes', 'Collaboration'],
    logoUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=100&h=100&fit=crop',
    websiteUrl: 'https://otter.ai',
    highlights: ['Real-time transcription', 'Meeting summaries', 'Team sharing'],
    pricing: 'Freemium - $10/month for Pro',
    isPaid: false,
    createdBy: 'Otter.ai'
  },
  {
    name: 'Clockify AI',
    description: 'AI-enhanced time tracking and productivity analytics tool.',
    fullDescription: 'Clockify AI helps teams track time, analyze productivity patterns, and optimize workflows with intelligent insights and automated time categorization.',
    category: 'Productivity',
    tags: ['Time tracking', 'Analytics', 'Workflow', 'Team management'],
    logoUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop',
    websiteUrl: 'https://clockify.me',
    highlights: ['Automatic time tracking', 'Productivity insights', 'Team reports'],
    pricing: 'Freemium - $4.99/month per user',
    isPaid: false,
    createdBy: 'Clockify'
  },
  {
    name: 'Todoist AI',
    description: 'AI-powered task management and productivity assistant.',
    fullDescription: 'Todoist AI helps users organize tasks, set priorities, and manage projects with intelligent suggestions and automated scheduling features.',
    category: 'Productivity',
    tags: ['Task management', 'Project planning', 'Scheduling', 'Organization'],
    logoUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=100&h=100&fit=crop',
    websiteUrl: 'https://todoist.com',
    highlights: ['Smart scheduling', 'Project templates', 'Team collaboration'],
    pricing: 'Freemium - $4/month for Pro',
    isPaid: false,
    createdBy: 'Todoist'
  },
  {
    name: 'RescueTime',
    description: 'AI-powered automatic time tracking and productivity analysis.',
    fullDescription: 'RescueTime automatically tracks how you spend time on devices and provides detailed productivity reports with AI-powered insights to help improve focus.',
    category: 'Productivity',
    tags: ['Time tracking', 'Productivity analysis', 'Focus', 'Automation'],
    logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop',
    websiteUrl: 'https://rescuetime.com',
    highlights: ['Automatic tracking', 'Detailed reports', 'Distraction blocking'],
    pricing: 'Freemium - $12/month for Premium',
    isPaid: false,
    createdBy: 'RescueTime'
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
    highlights: ['Detailed analysis', 'Actionable recommendations', 'Competitor insights'],
    pricing: 'Paid - $34/month for Basic',
    isPaid: true,
    createdBy: 'Page Optimizer Pro'
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
  }
];

// Function to populate tools with duplicate checking
export const populateTools = async () => {
  console.log('Starting to populate tools...');
  
  try {
    // Get existing tools to check for duplicates
    const existingTools = await toolService.getAllTools();
    const existingToolNames = existingTools.map(tool => tool.name.toLowerCase());
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const tool of toolsToAdd) {
      // Check if tool already exists (case-insensitive)
      if (existingToolNames.includes(tool.name.toLowerCase())) {
        console.log(`Tool "${tool.name}" already exists, skipping...`);
        skippedCount++;
        continue;
      }
      
      try {
        await toolService.addTool(tool);
        console.log(`Added tool: ${tool.name}`);
        addedCount++;
      } catch (error) {
        console.error(`Error adding tool "${tool.name}":`, error);
      }
    }
    
    console.log(`Population complete! Added: ${addedCount}, Skipped: ${skippedCount}, Total in database: ${existingTools.length + addedCount}`);
  } catch (error) {
    console.error('Error populating tools:', error);
  }
};