import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Trash2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface Inquiry {
  id: string;
  name: string;
  email: string;
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
          <Card key={inquiry.id} className="border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-heading">
                    {inquiry.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {inquiry.email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'}>
                    {inquiry.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(inquiry.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground mb-4 whitespace-pre-wrap">
                {inquiry.message}
              </p>
              <div className="flex gap-2">
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
