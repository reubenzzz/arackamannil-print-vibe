import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Category {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // If the table doesn't exist yet, we will just show empty list
        if (error.code === '42P01') {
          setCategories([]);
          return;
        }
        throw error;
      }
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setImageFile(file);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    let publicUrl = null;

    try {
      // 1. Upload image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `category-banners/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('categories')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl: url } } = supabase.storage
          .from('categories')
          .getPublicUrl(filePath);

        publicUrl = url;
      }

      // 2. Insert category row
      const { error: dbError } = await supabase
        .from('categories')
        .insert([{
          title: title.trim(),
          description: description.trim(),
          image_url: publicUrl,
        }]);

      if (dbError) throw dbError;

      toast.success('Category added successfully!');
      setTitle('');
      setDescription('');
      setImageFile(null);
      // Reset file input
      const fileInput = document.getElementById('category-image') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      fetchCategories();
    } catch (error: any) {
      console.error('Error adding category:', error);
      toast.error(error.message || 'Failed to add category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string, imageUrl: string | null) => {
    if (!confirm('Are you sure you want to delete this category? All images uploaded under this category in the gallery will still exist, but the category card itself will be deleted.')) return;

    try {
      // 1. If there's an uploaded image, delete it from storage
      if (imageUrl && imageUrl.includes('/categories/')) {
        const path = imageUrl.split('/').slice(-2).join('/');
        
        await supabase.storage
          .from('categories')
          .remove([path]);
      }

      // 2. Delete database row
      const { error: dbError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-xl font-heading font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            Add New Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="category-title">Category Title *</Label>
              <Input
                id="category-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mug Printing, Custom T-Shirts"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category-desc">Description *</Label>
              <Textarea
                id="category-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this category services..."
                rows={3}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category-image">Cover Image (Optional)</Label>
              <Input
                id="category-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted-foreground">
                Max 5MB. Supported formats: JPG, PNG, WebP. If left blank, a default gradient cover will be used.
              </p>
            </div>

            <Button type="submit" disabled={submitting} className="hero-gradient text-primary-foreground font-semibold">
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Category...
                </>
              ) : (
                'Add Category'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.length === 0 ? (
          <div className="col-span-full">
            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No custom categories added yet. Displaying system defaults on home screen.</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          categories.map((category) => (
            <Card key={category.id} className="border-border overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
                  {category.image_url ? (
                    <img
                      src={category.image_url}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full hero-gradient flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">
                      {category.title}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDeleteCategory(category.id, category.image_url)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-bold text-lg text-foreground mb-1 truncate">
                    {category.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0 border-t border-border mt-auto flex justify-between items-center bg-secondary/10">
                <span className="text-xs text-primary font-semibold">Custom Category</span>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
