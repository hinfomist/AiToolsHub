import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Database } from 'lucide-react';
import { populateTools } from '../../scripts/populateTools';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  websiteUrl: string;
  tags: string[];
  votes: number;
  views: number;
  createdAt: string;
}

const AdminTools = () => {
  const { toast } = useToast();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTools = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tools'));
      const toolsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Tool[];
      setTools(toolsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tools",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTool = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;

    try {
      await deleteDoc(doc(db, 'tools', id));
      setTools(tools.filter(tool => tool.id !== id));
      toast({
        title: "Success",
        description: "Tool deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete tool",
        variant: "destructive"
      });
    }
  };

  const handlePopulateTools = async () => {
    if (!confirm('This will add 25 sample tools to the database. Continue?')) return;
    
    setLoading(true);
    try {
      await populateTools();
      toast({
        title: "Success",
        description: "Sample tools added successfully"
      });
      fetchTools(); // Refresh the tools list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to populate tools",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Tools</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handlePopulateTools}
            disabled={loading}
          >
            <Database className="h-4 w-4 mr-2" />
            Populate Sample Tools
          </Button>
          <Link to="/admin/add-tool">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Tool
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <Badge variant="secondary" className="mt-2">
                    {tool.category}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Link to={`/tool/${tool.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/admin/edit-tool/${tool.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => deleteTool(tool.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {tool.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Votes: {tool.votes}</span>
                <span>Views: {tool.views}</span>
                <span>Created: {new Date(tool.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTools;