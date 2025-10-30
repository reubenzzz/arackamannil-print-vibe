import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

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
  'Badge',
  'Calender',
  'Cup and momento Printing'
  'Cloth Printing',
  'Dangler',
  'Led',
  'Magazine',
  'Tissue Box',
  'Flag',
  'Service',
];

interface GalleryImage {
  id: string;
  category: string;
  image_url: string;
  title: string | null;
}

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('category', selectedCategory)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

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
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : images.length === 0 ? (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground font-body">
                    No images available for this category yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {images.map((image, index) => (
                  <Card
                    key={image.id}
                    className="overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-xl group animate-scale-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={image.image_url}
                        alt={image.title || `${selectedCategory} ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="p-4 text-foreground font-body font-semibold">
                          {image.title || 'View Details'}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
