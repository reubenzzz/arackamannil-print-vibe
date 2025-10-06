import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import businessImg from '@/assets/category-business.jpg';
import flexImg from '@/assets/category-flex.jpg';
import weddingImg from '@/assets/category-wedding.jpg';
import brochureImg from '@/assets/category-brochure.jpg';
import bannerImg from '@/assets/category-banner.jpg';

const categories = [
  'Business Cards',
  'Flex Printing',
  'Wedding Invitations',
  'Brochures & Flyers',
  'Banners & Posters',
  'Letterheads',
  'Envelopes',
  'Certificates',
  'ID Cards',
  'Stickers & Labels',
  'Calendars',
  'Notebooks',
  'Menu Cards',
  'Greeting Cards',
  'Packaging',
  'Photo Printing',
  'Canvas Prints',
  'Roll-up Banners',
  'Signboards',
  'Vehicle Graphics',
];

const galleryImages = {
  'Business Cards': [businessImg, businessImg, businessImg, businessImg],
  'Flex Printing': [flexImg, flexImg, flexImg, flexImg],
  'Wedding Invitations': [weddingImg, weddingImg, weddingImg, weddingImg],
  'Brochures & Flyers': [brochureImg, brochureImg, brochureImg, brochureImg],
  'Banners & Posters': [bannerImg, bannerImg, bannerImg, bannerImg],
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const images = (galleryImages as any)[selectedCategory] || [businessImg, businessImg, businessImg, businessImg];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-heading font-bold text-foreground mb-4">
            Our Gallery
          </h1>
          <p className="text-xl font-body text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of printing services
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-1/4">
            <Card className="border-border sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                  Categories
                </h2>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-body transition-all ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'bg-secondary text-foreground hover:bg-secondary/70'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gallery Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                {selectedCategory}
              </h2>
              <p className="text-muted-foreground font-body mt-2">
                Browse our collection of {selectedCategory.toLowerCase()} samples
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {images.map((image: string, index: number) => (
                <Card
                  key={index}
                  className="overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-xl group animate-scale-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image}
                      alt={`${selectedCategory} ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="p-4 text-foreground font-body font-semibold">
                        View Details
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
