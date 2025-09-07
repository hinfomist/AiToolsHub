import { blogService } from '../services/blogService.js';

const createSampleBlog = async () => {
  const sampleBlog = {
    title: "How AI Tools Are Transforming Productivity in 2025",
    slug: "ai-tools-transforming-productivity-2025", 
    excerpt: "AI tools are reshaping how we work, from smart email assistants to content generators.",
    content: `
      <h2>The AI Revolution in the Workplace</h2>
      <p>Artificial Intelligence has moved from science fiction to everyday reality, fundamentally changing how we approach work and productivity. In 2025, AI tools have become indispensable partners in our daily workflows, offering unprecedented efficiency and capabilities.</p>
      
      <h3>Smart Email Management</h3>
      <p>Email assistants powered by AI can now draft responses, prioritize messages, and even schedule meetings automatically. Tools like Smart Compose and AI-powered inbox management systems reduce email processing time by up to 40%, allowing professionals to focus on high-value tasks.</p>
      
      <h3>Content Generation at Scale</h3>
      <p>From writing blog posts to creating marketing copy, AI content generators have revolutionized creative workflows. These tools don't replace human creativity but augment it, providing starting points, suggestions, and helping overcome writer's block. Content creators report 60% faster turnaround times when using AI writing assistants.</p>
      
      <h3>Automated Workflow Optimization</h3>
      <p>AI-powered automation tools can analyze work patterns, identify bottlenecks, and suggest optimizations. By learning from user behavior, these systems continuously improve processes, leading to measurable productivity gains across organizations.</p>
      
      <h2>The Future of AI-Powered Productivity</h2>
      <p>As we move forward, the integration of AI tools in our daily workflows will only deepen. The key is not to fear these changes but to embrace them as opportunities to enhance human capabilities and achieve more meaningful work.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center",
    author: "Admin",
    tags: ["AI Tools", "Productivity"],
    categories: ["Future of Work"],
    status: "published",
    seoTitle: "AI Tools and Productivity in 2025",
    seoDescription: "Discover how AI tools are changing productivity in 2025 with smarter workflows and automation."
  };

  try {
    const blogId = await blogService.addBlog(sampleBlog);
    console.log('Sample blog created with ID:', blogId);
    return blogId;
  } catch (error) {
    console.error('Error creating sample blog:', error);
    throw error;
  }
};

// Uncomment the line below to run this script
// createSampleBlog();

export { createSampleBlog };