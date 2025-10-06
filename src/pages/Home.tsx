import { Link } from 'react-router-dom';
import HeroSlider from '@/components/HeroSlider';
import Categories from '@/components/Categories';
import Reviews from '@/components/Reviews';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      
      <Categories />

      {/* About Preview Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-6 animate-fade-in">
              About Arackamannil Printers
            </h2>
            <p className="text-lg font-body text-muted-foreground mb-8 leading-relaxed animate-slide-up">
              With decades of experience in the printing industry, Arackamannil Printers has been the trusted choice for individuals and businesses seeking high-quality printing solutions. We combine traditional craftsmanship with modern technology to deliver exceptional results every time.
            </p>
            <Link to="/about">
              <Button size="lg" className="hero-gradient text-primary-foreground font-semibold">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Reviews />
    </div>
  );
};

export default Home;
