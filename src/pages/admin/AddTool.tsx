import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const categories = [
  'Content Writing', 'Image Generation', 'Personal Assistants', 'Chatbots', 'Sales',
  'Productivity', 'Video Creation', 'Music Creation', 'Customer Support', 'AI Code Tools'
];

const AddTool = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    websiteUrl: '',
    tags: '',
    logoUrl: '',
    highlights: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'tools'), {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        highlights: formData.highlights.split(',').map(highlight => highlight.trim()),
        votes: 0,
        views: 0,
        rating: 4.5,
        createdAt: new Date().toISOString()
      });

      toast({
        title: "Success",
        description: "Tool added successfully!"
      });

      setFormData({
        name: '',
        description: '',
        category: '',
        websiteUrl: '',
        tags: '',
        logoUrl: '',
        highlights: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add tool. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/admin/tools" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Tools
      </Link>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Tool</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Tool Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
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
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                id="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                type="url"
                value={formData.logoUrl}
                onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="AI, Writing, Content"
              />
            </div>

            <div>
              <Label htmlFor="highlights">Highlights (comma separated)</Label>
              <Input
                id="highlights"
                value={formData.highlights}
                onChange={(e) => setFormData({...formData, highlights: e.target.value})}
                placeholder="Free Plan Available, User-Friendly"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Adding...' : 'Add Tool'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddTool;