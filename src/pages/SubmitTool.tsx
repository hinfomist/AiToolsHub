
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toolService } from '@/services/toolService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SubmitTool = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    category: '',
    pricing: '',
    email: '',
    highlights: [] as string[],
    tags: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newHighlight, setNewHighlight] = useState('');
  const [newTag, setNewTag] = useState('');

  const categories = [
    'Content Writing',
    'Image Generation',
    'Personal Assistants',
    'Chatbots',
    'Sales',
    'Productivity',
    'Video Creation',
    'Music Creation',
    'Customer Support',
    'AI Code Tools',
    'Data Analysis',
    'Design Tools',
    'Marketing',
    'SEO Tools'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addHighlight = () => {
    if (newHighlight.trim() && !formData.highlights.includes(newHighlight.trim())) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()]
      }));
      setNewHighlight('');
    }
  };

  const removeHighlight = (highlight: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter(h => h !== highlight)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.description || !formData.website || !formData.category || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including email address.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await toolService.submitTool({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        websiteUrl: formData.website,
        pricing: formData.pricing,
        submitterEmail: formData.email,
        tags: formData.tags,
        highlights: formData.highlights,
        logoUrl: ''
      });

      // Show success message
      toast({
        title: "Tool Submitted Successfully!",
        description: "Your tool has been submitted for review. You'll be notified soon via email.",
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        website: '',
        category: '',
        pricing: '',
        email: '',
        highlights: [],
        tags: []
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit tool. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Tool Finder
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/categories" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                Categories
              </Link>
              <Link to="/submit" className="text-purple-600 font-medium">
                Submit Tool
              </Link>
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Submit Your AI Tool
          </h1>
          <p className="text-xl text-gray-600">
            Share your AI tool with thousands of users. Get discovered, gain users, and grow your community.
          </p>
        </div>

        {/* Submission Guidelines */}
        <Card className="mb-8 border-0 bg-blue-50/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-800 mb-3">📋 Submission Guidelines</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• Your tool must be AI-powered or AI-related</li>
              <li>• Provide accurate and up-to-date information</li>
              <li>• Include a working website or demo link</li>
              <li>• Use clear, descriptive language in your description</li>
              <li>• Tools are reviewed within 24-48 hours</li>
            </ul>
          </CardContent>
        </Card>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tool Name *
                </label>
                <Input
                  type="text"
                  placeholder="e.g., ChatGPT, Midjourney, etc."
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL *
                </label>
                <Input
                  type="url"
                  placeholder="https://yourtool.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  We'll use this to contact you about your submission status
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing Model
                </label>
                <Select value={formData.pricing} onValueChange={(value) => handleInputChange('pricing', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pricing model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="freemium">Freemium</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="one-time">One-time Purchase</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tool Description *
                </label>
                <Textarea
                  placeholder="Describe what your tool does, its key features, and who it's for. Be specific and engaging."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full min-h-32"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Minimum 100 characters. Be detailed and engaging.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Highlights */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Key Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="e.g., Free tier available, API access, Mobile app"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addHighlight} className="px-3">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.highlights.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Current Highlights:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.highlights.map((highlight) => (
                        <Badge key={highlight} className="bg-green-100 text-green-700 pr-1">
                          ✓ {highlight}
                          <button
                            type="button"
                            onClick={() => removeHighlight(highlight)}
                            className="ml-2 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="e.g., AI, Writing, Automation, GPT"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag} className="px-3">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Current Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="pr-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Logo Upload */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Logo & Screenshots (Optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload your tool's logo</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 2MB. Recommended: 256x256px</p>
                  <Button type="button" variant="outline" className="mt-4">
                    Choose File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Review'}
            </Button>
            <Button type="button" variant="outline" size="lg" className="px-8">
              Save Draft
            </Button>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 text-center">
            <h3 className="font-semibold text-gray-800 mb-2">What happens next?</h3>
            <p className="text-gray-600 text-sm">
              Our team will review your submission within 24-48 hours. You'll receive an email notification once your tool is approved and live on the platform.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitTool;
