import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';
import { Button } from './ui/button';

const slides = [
  {
    image: hero1,
    title: 'Quality Prints, Timeless Impressions',
    subtitle: 'Professional printing services for all your needs',
  },
  {
    image: hero2,
    title: 'Elegant Wedding Invitations',
    subtitle: 'Make your special day unforgettable with our premium designs',
  },
  {
    image: hero3,
    title: 'Large Format Printing',
    subtitle: 'Vibrant banners and displays that capture attention',
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-muted">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl animate-slide-up">
                <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl font-body text-muted-foreground mb-8">
                  {slide.subtitle}
                </p>
                <Button size="lg" className="hero-gradient text-primary-foreground font-semibold px-8">
                  Explore Our Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur hover:bg-background/70 transition-smooth"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur hover:bg-background/70 transition-smooth"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-primary w-8' 
                : 'bg-background/50 hover:bg-background/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
