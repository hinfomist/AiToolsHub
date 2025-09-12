import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, ExternalLink, Calendar } from 'lucide-react';
import { toolService } from '../../services/toolService';
import { useToast } from '@/hooks/use-toast';

const PendingTools = () => {
  const [pendingTools, setPendingTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingTools();
  }, []);

  const fetchPendingTools = async () => {
    try {
      const tools = await toolService.getPendingTools();
      setPendingTools(tools);
    } catch (error) {
      console.error('Error fetching pending tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (toolId) => {
    try {
      await toolService.approveTool(toolId);
      toast({
        title: "Tool Approved!",
        description: "The tool has been approved and is now live.",
      });
      fetchPendingTools(); // Refresh the list
    } catch (error) {
      console.error('Error approving tool:', error);
      toast({
        title: "Error",
        description: "Failed to approve tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (toolId) => {
    try {
      await toolService.deleteTool(toolId);
      toast({
        title: "Tool Rejected",
        description: "The tool has been rejected and removed.",
      });
      fetchPendingTools(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting tool:', error);
      toast({
        title: "Error",
        description: "Failed to reject tool. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pending Tools</h1>
          <p className="text-gray-600">Review and approve user-submitted tools</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {pendingTools.length} pending
        </Badge>
      </div>

      {pendingTools.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Tools</h3>
            <p className="text-gray-600">All user submissions have been reviewed!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {pendingTools.map((tool) => (
            <Card key={tool.id} className="border-l-4 border-l-yellow-400">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{tool.logoUrl}</div>
                    <div>
                      <CardTitle className="text-xl mb-2">{tool.name}</CardTitle>
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {new Date(tool.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{tool.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                    <a 
                      href={tool.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {tool.websiteUrl}
                    </a>
                  </div>
                  
                  {tool.submitterEmail && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">📧 Submitter:</span>
                      <a 
                        href={`mailto:${tool.submitterEmail}`}
                        className="text-blue-600 hover:text-blue-800 underline text-sm"
                      >
                        {tool.submitterEmail}
                      </a>
                    </div>
                  )}
                  
                  {tool.pricing && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">💰 Pricing:</span>
                      <Badge variant="secondary" className="text-xs">
                        {tool.pricing}
                      </Badge>
                    </div>
                  )}
                </div>

                {tool.tags && tool.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {tool.highlights && tool.highlights.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.highlights.map((highlight, index) => (
                        <Badge key={index} className="bg-green-100 text-green-700 hover:bg-green-200">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => handleApprove(tool.id)}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </Button>
                  <Button 
                    onClick={() => handleReject(tool.id)}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingTools;