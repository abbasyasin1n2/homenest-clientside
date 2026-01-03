import { useFeaturedProperties } from '../../hooks/useProperties';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const FeaturedProperties = () => {
  const { data: properties, isLoading, error } = useFeaturedProperties();

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Featured Properties</h2>
            <p className="text-gray-600 dark:text-gray-400">Discover our most recent property listings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse dark:bg-gray-800">
                <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Failed to load featured properties</p>
        </div>
      </section>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Featured Properties</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">No properties available yet. Be the first to list!</p>
          <Button asChild className="bg-green-500 hover:bg-green-600">
            <Link to="/add-property">Add Your First Property</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Featured Properties</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover our most recent property listings across Bangladesh
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.slice(0, 8).map((property) => (
            <Card key={property._id} className="overflow-hidden hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.imageUrl || '/staticassets/swiper1.jpg'}
                  alt={property.propertyName}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {property.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                  {property.propertyName}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FaMapMarkerAlt className="text-green-500 flex-shrink-0" />
                  <span className="text-sm line-clamp-1">{property.location}</span>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 pb-2">
                <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 text-sm">
                  {property.description || 'Premium property in a prime location'}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <FaRulerCombined />
                    <span>{property.propertySize || 'N/A'}</span>
                  </div>
                  {property.createdAt && (
                    <span>{format(new Date(property.createdAt), 'MMM dd, yyyy')}</span>
                  )}
                </div>
                <div className="text-xl font-bold text-green-600 dark:text-green-400">
                  {property.price ? `৳${property.price.toLocaleString()}` : 'Price on Request'}
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                  <Link to={`/property/${property._id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-green-500 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20">
            <Link to="/all-properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;

