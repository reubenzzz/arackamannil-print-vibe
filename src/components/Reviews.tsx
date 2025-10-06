import { Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const reviews = [
  {
    name: 'Rajesh Kumar',
    rating: 5,
    comment: 'Excellent service! The quality of prints is outstanding and delivery was on time.',
    date: '2 weeks ago',
  },
  {
    name: 'Priya Menon',
    rating: 5,
    comment: 'Very professional team. My wedding invitations turned out beautifully!',
    date: '1 month ago',
  },
  {
    name: 'Suresh Nair',
    rating: 5,
    comment: 'Best printing shop in town. Affordable prices and great quality.',
    date: '3 weeks ago',
  },
  {
    name: 'Lakshmi Das',
    rating: 5,
    comment: 'Highly recommend! They helped design our business cards and the result was perfect.',
    date: '1 week ago',
  },
];

const Reviews = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="border-border hover:border-accent transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
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
                    {review.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
