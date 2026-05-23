import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const reviewSchema = z.object({
  customer_name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  comment: z.string().trim().min(10, 'Review must be at least 10 characters').max(500, 'Review must be less than 500 characters'),
  rating: z.number().min(1, 'Please select a rating').max(5),
});

const ReviewForm = () => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      customer_name: formData.get('customer_name') as string,
      comment: formData.get('comment') as string,
      rating,
    };

    try {
      // Validate input
      reviewSchema.parse(data);

      // Save to database
      const { error } = await supabase
        .from('reviews')
        .insert([data]);

      if (error) throw error;

      toast.success('Thank you for your review! It will be visible after approval.');
      (e.target as HTMLFormElement).reset();
      setRating(0);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Please check your input');
      } else {
        toast.error('Failed to submit review. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Share Your Experience
            </h2>
            <p className="text-lg font-body text-muted-foreground">
              We'd love to hear about your experience with our services
            </p>
          </div>

          <Card className="border-border shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
                    placeholder="Enter your name"
                    required
                    maxLength={100}
                  />
                  {errors.customer_name && (
                    <p className="text-destructive text-sm mt-1">{errors.customer_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-destructive text-sm mt-1">{errors.rating}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-foreground mb-2">
                    Your Review
                  </label>
                  <textarea
                    rows={5}
                    name="comment"
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none"
                    placeholder="Tell us about your experience..."
                    required
                    maxLength={500}
                  />
                  {errors.comment && (
                    <p className="text-destructive text-sm mt-1">{errors.comment}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full hero-gradient text-primary-foreground font-body font-semibold py-3 rounded-lg hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 text-center border-t border-border pt-6 animate-fade-in">
            <p className="text-muted-foreground text-sm mb-4">
              Would you also like to support us on Google? Share your experience directly on our Google Business page!
            </p>
            <a
              href="https://g.page/r/CRfgjfnVnxk1EAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 border border-border rounded-lg bg-card text-foreground hover:bg-secondary hover:text-primary transition-smooth font-semibold shadow-sm card-hover-glow"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.4 15.1.5 12 .5c-4.8 0-8.9 2.7-11 6.8l3.9 3C5.8 7.3 8.6 5.04 12 5.04z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.25c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.3 3.6l3.6 2.8c2.1-1.9 3.7-4.8 3.7-8.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M4.9 10.3c-.2-.7-.3-1.5-.3-2.3s.1-1.6.3-2.3L1 2.7C.3 4.3 0 6.1 0 8s.3 3.7 1 5.3l3.9-3z"
                />
                <path
                  fill="#34A853"
                  d="M12 18.96c-3.4 0-6.2-2.26-7.1-5.26l-3.9 3c2.1 4.1 6.2 6.8 11 6.8 3.1 0 5.8-1 7.7-2.7l-3.6-2.8c-1.1.7-2.6 1.1-4.1 1.1z"
                />
              </svg>
              Write a Google Review
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewForm;
