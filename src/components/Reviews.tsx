import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { ref, isVisible } = useScrollAnimation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('reviews-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews',
          filter: 'is_approved=eq.true'
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-heading font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
            </div>
          ) : (
            reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-border hover:border-accent transition-all duration-300 hover:shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground font-body mb-4 line-clamp-3">
                      "{review.comment}"
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-heading font-semibold text-foreground">
                        {review.customer_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
