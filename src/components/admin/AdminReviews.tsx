import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ is_approved: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Review ${!currentStatus ? 'approved' : 'unapproved'}`);
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Review ${!currentStatus ? 'featured' : 'unfeatured'}`);
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  if (loading) {
    return <p className="text-center py-8">Loading reviews...</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No reviews yet</p>
          </CardContent>
        </Card>
      ) : (
        reviews.map((review) => (
          <Card key={review.id} className="border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-heading">
                    {review.customer_name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={review.is_approved ? 'default' : 'secondary'}>
                    {review.is_approved ? 'Approved' : 'Pending'}
                  </Badge>
                  {review.is_featured && (
                    <Badge variant="outline">Featured</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-4 whitespace-pre-wrap">
                {review.comment}
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleApproval(review.id, review.is_approved)}
                >
                  {review.is_approved ? (
                    <><XCircle className="w-4 h-4 mr-2" />Unapprove</>
                  ) : (
                    <><CheckCircle className="w-4 h-4 mr-2" />Approve</>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleFeatured(review.id, review.is_featured)}
                >
                  <Star className="w-4 h-4 mr-2" />
                  {review.is_featured ? 'Unfeature' : 'Feature'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                  onClick={() => {
                    navigator.clipboard.writeText(`"${review.comment}" - ${review.customer_name}`);
                    toast.success('Review text copied to clipboard! Opening Google reviews page...');
                    window.open('https://share.google/Jv47Kw3To7IA00VG0', '_blank');
                  }}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.78 0-8.678-3.898-8.678-8.678s3.898-8.678 8.678-8.678c2.258 0 4.29.839 5.86 2.21l3.05-3.05C18.9 1.442 15.776.5 12.24.5 5.756.5.5 5.756.5 12.24s5.256 11.74 11.74 11.74c6.8 0 11.74-4.78 11.74-11.74 0-.8-.086-1.577-.245-2.315H12.24z"/>
                  </svg>
                  Feature to Google
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteReview(review.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminReviews;
