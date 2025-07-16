import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Trash2 } from 'lucide-react';

interface Review {
  id: string;
  toolId: string;
  userName: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

const AdminReviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reviews'));
      const reviewsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(reviewsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (id: string, approved: boolean) => {
    try {
      await updateDoc(doc(db, 'reviews', id), { approved });
      setReviews(reviews.map(review => 
        review.id === id ? { ...review, approved } : review
      ));
      toast({
        title: "Success",
        description: `Review ${approved ? 'approved' : 'rejected'} successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update review status",
        variant: "destructive"
      });
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      await deleteDoc(doc(db, 'reviews', id));
      setReviews(reviews.filter(review => review.id !== id));
      toast({
        title: "Success",
        description: "Review deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete review",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Reviews</h1>
        <div className="flex gap-4 text-sm">
          <span>Total: {reviews.length}</span>
          <span>Approved: {reviews.filter(r => r.approved).length}</span>
          <span>Pending: {reviews.filter(r => !r.approved).length}</span>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{review.userName}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Tool ID: {review.toolId}
                  </p>
                  <Badge 
                    variant={review.approved ? "default" : "secondary"}
                    className="mt-2"
                  >
                    {review.approved ? "Approved" : "Pending"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {!review.approved && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => updateReviewStatus(review.id, true)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  {review.approved && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateReviewStatus(review.id, false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => deleteReview(review.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{review.message}</p>
              <p className="text-sm text-muted-foreground">
                Created: {new Date(review.createdAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No reviews found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;