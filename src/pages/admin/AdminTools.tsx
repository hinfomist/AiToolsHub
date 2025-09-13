import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Database, Grid, ArrowLeft, AlertTriangle, CheckSquare, Layers } from 'lucide-react';
import { populateTools } from '../../scripts/populateTools';
import { categoryService } from '@/services/categoryService';
import { toolService } from '@/services/toolService';
import { populateCategories } from '../../scripts/populateCategories';
import { CategoryIcon } from '@/components/CategoryIcon';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  categories?: string[]; // Support for new categories array format
  websiteUrl: string;
  tags: string[];
  votes: number;
  views: number;
  createdAt: string;
}

const AdminTools = () => {
  const { toast } = useToast();
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [duplicates, setDuplicates] = useState<string[]>([]);
  const [selectedDuplicates, setSelectedDuplicates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const fetchTools = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tools'));
      const toolsData = querySnapshot.docs.map(d => {
        const data = d.data() as any;
        const createdAt = data.createdAt?.toDate?.()?.toISOString() || data.createdAt || new Date().toISOString();
        return { id: d.id, ...data, createdAt } as Tool;
      });
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

  const fetchCategories = async () => {
    try {
      const [categoriesData, counts] = await Promise.all([
        categoryService.getAllCategories(),
        categoryService.getAdminCategoryCounts()
      ]);
      setCategories(categoriesData);
      setCategoryCounts(counts);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive"
      });
    }
  };

  const filterToolsByCategory = (categoryName: string) => {
    const filtered = tools.filter(tool => {
      // Handle both old single category field and new categories array
      if (Array.isArray(tool.categories)) {
        return tool.categories.includes(categoryName);
      }
      return tool.category === categoryName;
    });
    setFilteredTools(filtered);
    findDuplicatesInCategory(filtered);
  };

  const findDuplicatesInCategory = (categoryTools: Tool[]) => {
    const duplicateIds: string[] = [];
    const nameMap: { [key: string]: Tool[] } = {};
    
    // Group tools by name
    categoryTools.forEach(tool => {
      const normalizedName = tool.name.toLowerCase().trim();
      if (!nameMap[normalizedName]) {
        nameMap[normalizedName] = [];
      }
      nameMap[normalizedName].push(tool);
    });
    
    // Find duplicates
    Object.values(nameMap).forEach(toolGroup => {
      if (toolGroup.length > 1) {
        toolGroup.forEach(tool => duplicateIds.push(tool.id));
      }
    });
    
    setDuplicates(duplicateIds);
  };

  const deleteTool = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tool?')) return;

    try {
      await deleteDoc(doc(db, 'tools', id));
      const updatedTools = tools.filter(tool => tool.id !== id);
      setTools(updatedTools);
      
      if (selectedCategory) {
        filterToolsByCategory(selectedCategory);
      }
      
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

  const bulkDeleteDuplicates = async () => {
    if (selectedDuplicates.length === 0) {
      toast({
        title: "Warning",
        description: "Please select duplicates to delete",
        variant: "destructive"
      });
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedDuplicates.length} duplicate tools?`)) return;

    try {
      await Promise.all(
        selectedDuplicates.map(id => deleteDoc(doc(db, 'tools', id)))
      );
      
      const updatedTools = tools.filter(tool => !selectedDuplicates.includes(tool.id));
      setTools(updatedTools);
      
      if (selectedCategory) {
        filterToolsByCategory(selectedCategory);
      }
      
      setSelectedDuplicates([]);
      
      toast({
        title: "Success",
        description: `${selectedDuplicates.length} duplicate tools deleted successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete duplicate tools",
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
      fetchTools();
      fetchCategories();
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

  const handlePopulateCategories = async () => {
    if (!confirm('This will add 25 categories to the database. Continue?')) return;
    
    setLoading(true);
    try {
      await populateCategories();
      toast({
        title: "Success",
        description: "Categories populated successfully"
      });
      fetchCategories();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to populate categories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory && tools.length > 0) {
      filterToolsByCategory(selectedCategory);
    }
  }, [tools, selectedCategory]);

  const renderToolCard = (tool: Tool) => (
    <Card key={tool.id} className={duplicates.includes(tool.id) ? "border-warning bg-warning/5" : ""}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">{tool.name}</CardTitle>
              {duplicates.includes(tool.id) && (
                <AlertTriangle className="h-4 w-4 text-warning" />
              )}
            </div>
            <Badge variant="secondary" className="mt-2">
              {tool.category}
            </Badge>
          </div>
          <div className="flex gap-2">
            {duplicates.includes(tool.id) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (selectedDuplicates.includes(tool.id)) {
                    setSelectedDuplicates(prev => prev.filter(id => id !== tool.id));
                  } else {
                    setSelectedDuplicates(prev => [...prev, tool.id]);
                  }
                }}
                className={selectedDuplicates.includes(tool.id) ? "bg-primary text-primary-foreground" : ""}
              >
                <CheckSquare className="h-4 w-4" />
              </Button>
            )}
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
  );

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Tools</TabsTrigger>
          <TabsTrigger value="categories">Manage by Category</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6">
            {tools.map(renderToolCard)}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {selectedCategory ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedDuplicates([]);
                    }}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Categories
                  </Button>
                  <h2 className="text-2xl font-bold">
                    {selectedCategory} ({filteredTools.length} tools)
                  </h2>
                </div>
                <div className="flex gap-2">
                  {duplicates.length > 0 && (
                    <Button
                      variant="destructive"
                      onClick={bulkDeleteDuplicates}
                      disabled={selectedDuplicates.length === 0}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected Duplicates ({selectedDuplicates.length})
                    </Button>
                  )}
                  <Link to={`/admin/add-tool?category=${encodeURIComponent(selectedCategory)}`}>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tool to {selectedCategory}
                    </Button>
                  </Link>
                </div>
              </div>

              {duplicates.length > 0 && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-warning mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Potential Duplicates Detected</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {duplicates.length} tools appear to be duplicates. Select and delete them using the bulk action.
                  </p>
                </div>
              )}

              <div className="grid gap-6">
                {filteredTools.map(renderToolCard)}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Categories</h2>
                {categories.length === 0 && (
                  <Button 
                    variant="outline" 
                    onClick={handlePopulateCategories}
                    disabled={loading}
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Initialize Categories
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => {
                  const count = categoryCounts[category.name] || 0;
                  return (
                    <Card 
                      key={category.id} 
                      className={`cursor-pointer hover:shadow-lg transition-shadow ${count === 0 ? 'border-warning/20 bg-warning/5' : ''}`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <CategoryIcon categoryName={category.name} className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{category.name}</h3>
                            <p className={`text-sm ${count === 0 ? 'text-warning' : 'text-muted-foreground'}`}>
                              {count} tools {count === 0 ? '(Empty)' : ''}
                            </p>
                          </div>
                          {count > 0 && (
                            <Badge variant="secondary" className="ml-2">
                              {count}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTools;