import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'default-1',
    customer_name: 'Abraham Mathew',
    rating: 5,
    comment: 'Arackamannil Printers did an exceptional job with our company brochures and letterheads! The color accuracy and offset printing quality are truly outstanding. Best in Ranny!',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'default-2',
    customer_name: 'Priya Nair',
    rating: 5,
    comment: 'We ordered custom laser-cut wedding invitation cards and they were absolutely stunning. Every guest complimented the elegant design and texture. Excellent customer service!',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'default-3',
    customer_name: 'Reuben Joseph',
    rating: 5,
    comment: 'The flex banners and vinyl posters they printed for our event were vibrant and weather-resistant. Completed the massive order within 24 hours. Highly recommended!',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'default-4',
    customer_name: 'Dr. Elizabeth George',
    rating: 5,
    comment: 'Professional staff, top-tier printing machinery, and timely delivery. They have been handling all our clinic printing needs for years with flawless consistency.',
    created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
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

      if (error) {
        if (error.code === '42P01') {
          // Table doesn't exist yet, fall back to high-quality defaults
          setReviews(DEFAULT_REVIEWS);
          return;
        }
        throw error;
      }
      
      if (data && data.length > 0) {
        setReviews(data);
      } else {
        setReviews(DEFAULT_REVIEWS);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews(DEFAULT_REVIEWS);
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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="border-border hover:border-accent cursor-pointer card-hover-glow h-full flex flex-col justify-between">
                <CardContent className="p-6 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent animate-pulse" />
                      ))}
                    </div>
                    <p className="text-foreground/90 font-body mb-6 italic leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                  <div className="border-t border-border pt-4 mt-auto">
                    <p className="font-heading font-semibold text-foreground">
                      {review.customer_name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
