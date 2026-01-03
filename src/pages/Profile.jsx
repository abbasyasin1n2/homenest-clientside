import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile, useUpdateProfile } from '../hooks/useProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { FaUser, FaEnvelope, FaPhone, FaImage, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user } = useAuth();
  const { data: userProfile, isLoading } = useUserProfile(user?.email);
  const updateProfile = useUpdateProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    photoURL: '',
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || user?.displayName || '',
        phone: userProfile.phone || '',
        bio: userProfile.bio || '',
        photoURL: userProfile.photoURL || user?.photoURL || '',
      });
    }
  }, [userProfile, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        email: user.email,
        profileData: formData,
      });

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been updated successfully',
        timer: 2000,
        showConfirmButton: false,
      });

      setIsEditing(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update profile',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">My Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={
                      formData.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        formData.name || 'User'
                      )}&background=10b981&color=fff&size=128`
                    }
                    alt={formData.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                </div>
                <div>
                  <CardTitle className="text-2xl">{formData.name || 'Anonymous User'}</CardTitle>
                  <CardDescription>{user?.email}</CardDescription>
                </div>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} className="bg-green-500 hover:bg-green-600">
                  <FaEdit className="mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">
                    <FaUser className="inline mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">
                    <FaEnvelope className="inline mr-2" />
                    Email
                  </Label>
                  <Input id="email" value={user?.email} disabled className="bg-gray-100" />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="phone">
                    <FaPhone className="inline mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="photoURL">
                    <FaImage className="inline mr-2" />
                    Profile Photo URL
                  </Label>
                  <Input
                    id="photoURL"
                    type="url"
                    value={formData.photoURL}
                    onChange={(e) => setFormData({ ...formData, photoURL: e.target.value })}
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600"
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: userProfile?.name || user?.displayName || '',
                        phone: userProfile?.phone || '',
                        bio: userProfile?.bio || '',
                        photoURL: userProfile?.photoURL || user?.photoURL || '',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <Label className="text-muted-foreground">
                    <FaUser className="inline mr-2" />
                    Full Name
                  </Label>
                  <p className="text-lg font-medium">{formData.name || 'Not set'}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">
                    <FaEnvelope className="inline mr-2" />
                    Email
                  </Label>
                  <p className="text-lg font-medium">{user?.email}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">
                    <FaPhone className="inline mr-2" />
                    Phone Number
                  </Label>
                  <p className="text-lg font-medium">{formData.phone || 'Not set'}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Bio</Label>
                  <p className="text-lg">{formData.bio || 'No bio added yet'}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

