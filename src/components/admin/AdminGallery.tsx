import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_CATEGORIES = [
  'Business Cards',
  'Our Capacity',
  'Wedding Invitations',
  'Brochures & Flyers',
  'Banners & Posters',
  'Letterheads',
  'Certificates',
  'ID Cards',
  'Stickers & Labels',
  'Layer Badge',
  'Calender',
  'Cup and momento Printing',
  'Tshirt Printing',
  'Cap Printing',
  'Dangler',
  'Led',
  'Magazine',
  'Tissue Box',
  'Flag',
  'Pin Badge',
  'Other Works',
];

interface GalleryImage {
  id: string;
  category: string;
  image_url: string;
  title: string | null;
}

const AdminGallery = () => {
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchCustomCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('title')
          .order('created_at', { ascending: true });

        if (error) {
          if (error.code === '42P01') return; // categories table doesn't exist
          throw error;
        }

        if (data && data.length > 0) {
          const customTitles = data.map((cat: any) => cat.title);
          const uniqueCategories = Array.from(new Set([...DEFAULT_CATEGORIES, ...customTitles]));
          setCategories(uniqueCategories);
          
          if (!uniqueCategories.includes(selectedCategory)) {
            setSelectedCategory(uniqueCategories[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching custom categories in AdminGallery:', err);
      }
    };

    fetchCustomCategories();
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${selectedCategory}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([{
          category: selectedCategory,
          image_url: publicUrl,
          title: title || null,
        }]);

      if (dbError) throw dbError;

      toast.success('Image uploaded successfully');
      setTitle('');
      fetchImages();
      (e.target as HTMLInputElement).value = '';
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const path = imageUrl.split('/').slice(-2).join('/');
      
      const { error: storageError } = await supabase.storage
        .from('gallery-images')
        .remove([path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast.success('Image deleted successfully');
      fetchImages();
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  if (loading) {
    return <p className="text-center py-8">Loading gallery...</p>;
  }

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-heading font-semibold mb-4">Upload New Image</h3>
          <div className="grid gap-4">
            <div>
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Title (Optional)</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Image title"
              />
            </div>
            <div>
              <Label>Image File</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Max 5MB. Supported formats: JPG, PNG, WebP
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="py-12 text-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No images yet</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          images.map((image) => (
            <Card key={image.id} className="border-border overflow-hidden group">
              <div className="relative aspect-square">
                <img
                  src={image.image_url}
                  alt={image.title || image.category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteImage(image.id, image.image_url)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="text-sm font-semibold text-foreground truncate">
                  {image.title || 'Untitled'}
                </p>
                <p className="text-xs text-muted-foreground">{image.category}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
