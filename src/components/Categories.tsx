import { Link } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import { Button } from './ui/button';
import businessImg from '@/assets/category-business.jpg';
import flexImg from '@/assets/category-flex.jpg';
import weddingImg from '@/assets/category-wedding.jpg';
import brochureImg from '@/assets/category-brochure.jpg';
import bannerImg from '@/assets/category-banner.jpg';

const categories = [
  {
    title: 'Business Cards',
    description: 'Professional business cards that make a lasting impression',
    image: businessImg,
  },
  {
    title: 'Flex Printing',
    description: 'High-quality flex printing for outdoor and indoor displays',
    image: flexImg,
  },
  {
    title: 'Wedding Invitations',
    description: 'Elegant invitations for your special day',
    image: weddingImg,
  },
  {
    title: 'Brochures & Flyers',
    description: 'Eye-catching marketing materials for your business',
    image: brochureImg,
  },
  {
    title: 'Banners & Posters',
    description: 'Large format printing for events and promotions',
    image: bannerImg,
  },
];

const Categories = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Explore Our Categories
          </h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of professional printing services tailored to meet all your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CategoryCard {...category} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/gallery">
            <Button size="lg" variant="outline" className="font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-smooth">
              View Complete Gallery
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
