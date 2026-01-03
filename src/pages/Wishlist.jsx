import { useWishlist, useRemoveFromWishlist } from '../hooks/useWishlist';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { FaHeart, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Wishlist = () => {
  const { user } = useAuth();
  const { data: wishlist = [], isLoading } = useWishlist(user?.email);
  const removeFromWishlist = useRemoveFromWishlist();

  const propertyIds = wishlist.map(item => item.propertyId);

  const { data: properties = [], isLoading: propertiesLoading } = useQuery({
    queryKey: ['wishlistProperties', propertyIds],
    queryFn: async () => {
      if (propertyIds.length === 0) return [];
      const promises = propertyIds.map(id => 
        axiosInstance.get(`/properties/${id}`).catch(() => null)
      );
      const results = await Promise.all(promises);
      return results.filter(res => res !== null).map(res => res.data);
    },
    enabled: propertyIds.length > 0,
  });

  const handleRemove = async (propertyId) => {
    const result = await Swal.fire({
      title: 'Remove from Wishlist?',
      text: 'This property will be removed from your wishlist',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, remove it',
    });

    if (result.isConfirmed) {
      try {
        await removeFromWishlist.mutateAsync({ userEmail: user.email, propertyId });
        Swal.fire('Removed!', 'Property removed from wishlist', 'success');
      } catch (error) {
        Swal.fire('Error!', error.response?.data?.message || 'Failed to remove from wishlist', 'error');
      }
    }
  };

  if (isLoading || propertiesLoading) {
    return (
      <div className="py-8">
        <div className="text-center text-gray-600 dark:text-gray-400">Loading your wishlist...</div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">My Wishlist</h1>
        <p className="text-muted-foreground">Properties you've saved for later</p>
      </div>

      {properties.length === 0 ? (
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="py-12 text-center">
            <FaHeart className="mx-auto text-6xl text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2 dark:text-white">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Start adding properties to your wishlist to view them here
            </p>
            <Link to="/all-properties">
              <Button className="bg-green-500 hover:bg-green-600">Browse Properties</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property._id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.imageUrl}
                  alt={property.propertyName}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3" variant="secondary">
                  {property.listingType}
                </Badge>
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-3 right-3"
                  onClick={() => handleRemove(property._id)}
                >
                  <FaHeart className="h-4 w-4" />
                </Button>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-1">{property.propertyName}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <FaMapMarkerAlt className="h-3 w-3" />
                  {property.location}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      ৳{property.price?.toLocaleString()}
                    </span>
                    <Badge>{property.category}</Badge>
                  </div>

                  {property.bedrooms && property.bathrooms && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FaBed />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaBath />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                    </div>
                  )}

                  {property.size && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <FaRulerCombined />
                      <span>{property.size} sqft</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter>
                <Link to={`/property/${property._id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

