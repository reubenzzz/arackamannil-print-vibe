import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { Button } from './ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import businessImg from '@/assets/service-graphic-design.jpg';
import flexImg from '@/assets/service-flex-printing.jpg';
import weddingImg from '@/assets/service-laser-printing.jpg';
import brochureImg from '@/assets/service-offset-printing.jpg';
import bannerImg from '@/assets/service-plastic-cover.jpg';

const categories = [
  {
    title: 'Graphics printing',
    description: 'Professional business cards that make a lasting impression',
    image: businessImg,
  },
  {
    title: 'Flex Printing',
    description: 'High-quality flex printing for outdoor and indoor displays',
    image: flexImg,
  },
  {
    title: 'Laser Printing',
    description: 'Elegant invitations for your special day',
    image: weddingImg,
  },
  {
    title: 'Offset Printing',
    description: 'Eye-catching marketing materials for your business',
    image: brochureImg,
  },
  {
    title: 'Plastic Cover',
    description: 'Large format printing for events and promotions',
    image: bannerImg,
  },
];

const Categories = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Explore Our Categories
          </h2>
          <p className="text-lg font-body text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of professional printing services tailored to meet all your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <CategoryCard {...category} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Link to="/gallery">
            <Button size="lg" variant="outline" className="font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-smooth">
              View Complete Gallery
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
