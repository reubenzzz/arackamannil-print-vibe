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
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewForm;
