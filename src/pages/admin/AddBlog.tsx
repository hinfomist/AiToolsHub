import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { blogService } from '../../services/blogService';
import { categoryService } from '../../services/categoryService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Admin',
    tags: [],
    categories: [],
    status: 'draft',
    seoTitle: '',
    seoDescription: '',
    relatedToolId: '',
    relatedToolName: ''
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [availableTools, setAvailableTools] = useState([]);
  const [loadingTools, setLoadingTools] = useState(false);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-generate slug from title
    if (field === 'title') {
      const slug = blogService.generateSlug(value);
      setFormData(prev => ({
        ...prev,
        slug: slug,
        seoTitle: value.length > 60 ? value.substring(0, 57) + '...' : value
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      console.log('Starting image upload...', file.name);
      const imageUrl = await blogService.uploadImage(file, 'blog-featured/');
      console.log('Image uploaded successfully:', imageUrl);
      
      setFormData(prev => ({
        ...prev,
        featuredImage: imageUrl
      }));
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      let errorMessage = "Failed to upload image";
      if (error.code === 'storage/unauthorized') {
        errorMessage = "Permission denied for image upload";
      } else if (error.message) {
        errorMessage = `Upload failed: ${error.message}`;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addCategory = async () => {
    if (currentCategory.trim() && !formData.categories.includes(currentCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, currentCategory.trim()]
      }));
      setCurrentCategory('');
      
      // Load tools for this category
      await loadToolsForCategory(currentCategory.trim());
    }
  };

  const loadToolsForCategory = async (categoryName) => {
    if (!categoryName) {
      setAvailableTools([]);
      return;
    }

    setLoadingTools(true);
    try {
      const tools = await categoryService.getToolsInCategory(categoryName);
      setAvailableTools(tools);
    } catch (error) {
      console.error('Error loading tools for category:', error);
      setAvailableTools([]);
    } finally {
      setLoadingTools(false);
    }
  };

  const handleRelatedToolChange = (toolId) => {
    const selectedTool = availableTools.find(tool => tool.id === toolId);
    setFormData(prev => ({
      ...prev,
      relatedToolId: toolId,
      relatedToolName: selectedTool ? selectedTool.name : ''
    }));
  };

  const removeCategory = (categoryToRemove) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }));
  };

  const handleSave = async (status = 'draft') => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      toast({
        title: "Error",
        description: "Content is required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      console.log('Attempting to save blog post...', { status, formData });
      
      const blogData = {
        ...formData,
        status: status,
        slug: formData.slug || blogService.generateSlug(formData.title),
        excerpt: formData.excerpt || formData.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
        author: formData.author || 'Admin',
        seoTitle: formData.seoTitle || formData.title,
        seoDescription: formData.seoDescription || formData.excerpt || formData.content.replace(/<[^>]*>/g, '').substring(0, 160)
      };

      console.log('Blog data prepared:', blogData);
      const blogId = await blogService.addBlog(blogData);
      console.log('Blog saved with ID:', blogId);
      
      toast({
        title: "Success",
        description: `Blog post ${status === 'published' ? 'published' : 'saved as draft'} successfully`,
      });
      
      // Small delay to ensure toast is visible before navigation
      setTimeout(() => {
        navigate('/admin/blogs');
      }, 1000);
      
    } catch (error) {
      console.error('Error saving blog:', error);
      
      let errorMessage = "Failed to save blog post";
      if (error.code === 'permission-denied') {
        errorMessage = "Permission denied. Please check Firebase rules.";
      } else if (error.code === 'unavailable') {
        errorMessage = "Service unavailable. Please try again later.";
      } else if (error.message) {
        errorMessage = `Failed to save: ${error.message}`;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/blogs')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Blog Post</h1>
          <p className="text-gray-600">Create a new blog post for your website</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter blog post title"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="blog-post-url"
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL: /blog/{formData.slug || 'your-post-slug'}
                </p>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="Brief description of your blog post (150-200 characters)"
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.excerpt.length}/200 characters
                </p>
              </div>

              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Author name"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content *</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => handleInputChange('content', content)}
                modules={quillModules}
                style={{ height: '400px', marginBottom: '50px' }}
              />
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  placeholder="SEO optimized title (60 characters max)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.seoTitle.length}/60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                  placeholder="SEO meta description (160 characters max)"
                  rows={3}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.seoDescription.length}/160 characters
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => handleSave('draft')}
                disabled={saving}
                variant="outline"
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              
              <Button
                onClick={() => handleSave('published')}
                disabled={saving}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                {saving ? 'Publishing...' : 'Publish'}
              </Button>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.featuredImage && (
                <div>
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}
              
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  variant="outline"
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button onClick={addTag} size="sm">Add</Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={currentCategory}
                  onChange={(e) => setCurrentCategory(e.target.value)}
                  placeholder="Add category"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                />
                <Button onClick={addCategory} size="sm">Add</Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.categories.map((category) => (
                  <Badge key={category} variant="outline" className="cursor-pointer" onClick={() => removeCategory(category)}>
                    {category} ×
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Tool */}
          {formData.categories.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Tool (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Link this blog post to a specific tool from the selected categories.
                </p>
                
                {loadingTools ? (
                  <div className="text-sm text-gray-500">Loading tools...</div>
                ) : availableTools.length > 0 ? (
                  <Select
                    value={formData.relatedToolId}
                    onValueChange={handleRelatedToolChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a related tool" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No related tool</SelectItem>
                      {availableTools.map((tool) => (
                        <SelectItem key={tool.id} value={tool.id}>
                          {tool.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-sm text-gray-500">
                    No tools found in the selected categories.
                  </div>
                )}
                
                {formData.relatedToolName && (
                  <div className="text-sm text-green-600">
                    Related to: {formData.relatedToolName}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBlog;