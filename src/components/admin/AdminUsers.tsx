import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Trash2, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
}

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailForAdmin, setEmailForAdmin] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profilesRes, rolesRes] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('user_roles').select('*'),
      ]);

      if (profilesRes.error) throw profilesRes.error;
      if (rolesRes.error) throw rolesRes.error;

      setProfiles(profilesRes.data || []);
      setUserRoles(rolesRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const addAdminRole = async () => {
    if (!emailForAdmin.trim()) {
      toast.error('Please enter an email');
      return;
    }

    try {
      const profile = profiles.find((p) => p.email?.toLowerCase() === emailForAdmin.trim().toLowerCase());
      
      if (!profile) {
        toast.error('User not found with that email');
        return;
      }

      if (!profile.id) {
        toast.error('Invalid user profile');
        return;
      }

      // Check if user already has admin role
      const existingRole = userRoles.find(
        (r) => r.user_id === profile.id && r.role === 'admin'
      );

      if (existingRole) {
        toast.error('User already has admin role');
        return;
      }

      const { error } = await supabase
        .from('user_roles')
        .insert({ 
          user_id: profile.id, 
          role: 'admin' 
        });

      if (error) throw error;

      toast.success('Admin role added successfully');
      setEmailForAdmin('');
      fetchData();
    } catch (error: any) {
      console.error('Error adding admin role:', error);
      toast.error(error.message || 'Failed to add admin role');
    }
  };

  const removeRole = async (roleId: string) => {
    if (!confirm('Are you sure you want to remove this role?')) return;

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', roleId);

      if (error) throw error;

      toast.success('Role removed successfully');
      fetchData();
    } catch (error) {
      console.error('Error removing role:', error);
      toast.error('Failed to remove role');
    }
  };

  const getUserRole = (userId: string) => {
    return userRoles.find((r) => r.user_id === userId);
  };

  if (loading) {
    return <p className="text-center py-8">Loading users...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-heading font-bold">User Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Admin Role</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">User Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={emailForAdmin}
                  onChange={(e) => setEmailForAdmin(e.target.value)}
                />
              </div>
              <Button onClick={addAdminRole} className="w-full">
                Add Admin Role
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {profiles.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No users yet</p>
          </CardContent>
        </Card>
      ) : (
        profiles.map((profile) => {
          const userRole = getUserRole(profile.id);
          return (
            <Card key={profile.id} className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-heading">
                      {profile.full_name || 'No name'}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {profile.email}
                    </p>
                  </div>
                  {userRole && (
                    <div className="flex items-center gap-2">
                      <Badge variant="default">
                        <Shield className="w-3 h-3 mr-1" />
                        {userRole.role}
                      </Badge>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeRole(userRole.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default AdminUsers;
