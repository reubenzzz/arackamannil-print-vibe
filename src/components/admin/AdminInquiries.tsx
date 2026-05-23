import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Trash2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success('Status updated successfully');
      fetchInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Inquiry deleted successfully');
      fetchInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast.error('Failed to delete inquiry');
    }
  };

  if (loading) {
    return <p className="text-center py-8">Loading inquiries...</p>;
  }

  return (
    <div className="space-y-4">
      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No inquiries yet</p>
          </CardContent>
        </Card>
      ) : (
        inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="border-border shadow-sm hover:shadow-md transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="text-xl font-heading font-bold text-foreground">
                    {inquiry.name}
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground font-body">
                    <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <Mail className="w-4 h-4 text-primary/70" />
                      <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                    </span>
                    {inquiry.phone && (
                      <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
                        <Phone className="w-4 h-4 text-primary/70" />
                        <a href={`tel:${inquiry.phone.replace(/\s+/g, '')}`}>{inquiry.phone}</a>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'} className="capitalize px-3 py-1 font-body">
                    {inquiry.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground font-body">
                    {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-6 whitespace-pre-wrap font-body text-base bg-secondary/10 p-4 rounded-lg border border-border/50">
                {inquiry.message}
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                  asChild
                >
                  <a href={`mailto:${inquiry.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email Customer
                  </a>
                </Button>
                {inquiry.phone && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:text-green-500 dark:hover:bg-green-500 dark:hover:text-black transition-smooth"
                    asChild
                  >
                    <a href={`tel:${inquiry.phone.replace(/\s+/g, '')}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Customer
                    </a>
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(inquiry.id, inquiry.status === 'new' ? 'contacted' : 'new')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {inquiry.status === 'new' ? 'Mark as Contacted' : 'Mark as New'}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteInquiry(inquiry.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminInquiries;
