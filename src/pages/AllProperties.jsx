import { useEffect, useMemo, useState } from 'react';
import { useAllProperties } from '../hooks/useProperties';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import {
  FaBath,
  FaBed,
  FaClock,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaSearch,
  FaTag,
} from 'react-icons/fa';
import { format } from 'date-fns';

const sortOptions = [
  { value: 'newest', label: 'Newest Listings' },
  { value: 'oldest', label: 'Oldest Listings' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'Land/Plot', label: 'Land/Plot' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Apartment', label: 'Apartment' },
];

const propertyForOptions = [
  { value: 'all', label: 'All Listings' },
  { value: 'Sale', label: 'For Sale' },
  { value: 'Rent', label: 'For Rent' },
];

const AllProperties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [propertyForFilter, setPropertyForFilter] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const sortParams = useMemo(() => {
    switch (sortOption) {
      case 'oldest':
        return { sortBy: 'createdAt', sortOrder: 'asc' };
      case 'price-asc':
        return { sortBy: 'price', sortOrder: 'asc' };
      case 'price-desc':
        return { sortBy: 'price', sortOrder: 'desc' };
      case 'newest':
      default:
        return { sortBy: 'createdAt', sortOrder: 'desc' };
    }
  }, [sortOption]);

  const {
    data: allProperties = [],
    isLoading,
    error,
  } = useAllProperties(debouncedSearch, sortParams.sortBy, sortParams.sortOrder);

  const filteredProperties = useMemo(() => {
    if (!allProperties.length) return [];

    return allProperties.filter((property) => {
      const categoryMatch =
        categoryFilter === 'all' || property.category === categoryFilter;
      const propertyForMatch =
        propertyForFilter === 'all' ||
        (property.propertyFor && property.propertyFor === propertyForFilter);
      return categoryMatch && propertyForMatch;
    });
  }, [allProperties, categoryFilter, propertyForFilter]);

  const groupedProperties = useMemo(() => {
    const groups = {
      'Land/Plot': [],
      Commercial: [],
      Apartment: [],
    };

    filteredProperties.forEach((property) => {
      const category = property.category || 'Other';
      if (groups[category]) {
        groups[category].push(property);
      } else {
        if (!groups.Other) groups.Other = [];
        groups.Other.push(property);
      }
    });

    return groups;
  }, [filteredProperties]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Filters */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                All Properties
              </h1>
              <p className="text-gray-600 mt-2 max-w-xl">
                Search, filter, and sort verified real estate listings from across
                Bangladesh.
              </p>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-center gap-4 w-full lg:w-auto">
              <div className="relative w-full xl:w-80">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by property name..."
                  className="pl-12 h-12 rounded-xl focus-visible:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 xl:flex xl:items-center gap-3">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-12 rounded-xl focus:ring-green-500 focus:ring-2">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={propertyForFilter} onValueChange={setPropertyForFilter}>
                  <SelectTrigger className="h-12 rounded-xl focus:ring-green-500 focus:ring-2">
                    <SelectValue placeholder="Listing Type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {propertyForOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="h-12 rounded-xl focus:ring-green-500 focus:ring-2">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="border-0 shadow-md rounded-3xl animate-pulse">
                <div className="h-56 bg-gray-200 rounded-t-3xl" />
                <CardContent className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-red-500 mb-2">
              Failed to load properties
            </h2>
            <p className="text-gray-600">
              Please refresh the page or try again in a moment.
            </p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No properties found
            </h2>
            <p className="text-gray-600 mb-8">
              Try adjusting your search or check back later for new listings.
            </p>
            <Button
              variant="outline"
              className="border-green-500 text-green-500 hover:bg-green-50"
              onClick={() => setSearchTerm('')}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedProperties).map(([category, properties]) => {
              if (!properties.length) return null;

              return (
                <section key={category}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {category === 'Other' ? 'Other Listings' : category}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {properties.length} {properties.length === 1 ? 'listing' : 'listings'}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => {
                      const priceValue = property.price;
                      const formattedPrice =
                        typeof priceValue === 'number'
                          ? priceValue.toLocaleString()
                          : priceValue;

                      return (
                        <Card
                          key={property._id}
                          className="overflow-hidden border-0 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white h-full flex flex-col"
                        >
                          <div className="relative h-56">
                            <img
                              src={property.imageUrl || '/staticassets/swiper1.jpg'}
                              alt={property.propertyName}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                              {property.category && (
                                <Badge className="bg-black/70 text-white backdrop-blur-sm">
                                  {property.category}
                                </Badge>
                              )}
                              {property.propertyFor && (
                                <Badge className="bg-green-500 text-white shadow">
                                  {property.propertyFor}
                                </Badge>
                              )}
                            </div>
                            {formattedPrice && (
                              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2 font-semibold text-green-600">
                                <FaTag />
                                ৳{formattedPrice}
                              </div>
                            )}
                          </div>

                          <CardHeader className="pb-0">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <FaClock />
                              <span>
                                {property.createdAt
                                  ? format(new Date(property.createdAt), 'MMM dd, yyyy')
                                  : 'Recently added'}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                              {property.propertyName}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <FaMapMarkerAlt className="text-green-500" />
                              <span className="line-clamp-1">{property.location}</span>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                              {property.description ||
                                'A well-maintained property with excellent connectivity and amenities.'}
                            </p>

                            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                              {property.propertySize && (
                                <div className="flex items-center gap-2">
                                  <FaRulerCombined className="text-green-500" />
                                  <span>{property.propertySize}</span>
                                </div>
                              )}
                              {property.bedrooms && (
                                <div className="flex items-center gap-2">
                                  <FaBed className="text-green-500" />
                                  <span>{property.bedrooms} Beds</span>
                                </div>
                              )}
                              {property.bathrooms && (
                                <div className="flex items-center gap-2">
                                  <FaBath className="text-green-500" />
                                  <span>{property.bathrooms} Baths</span>
                                </div>
                              )}
                              {property.propertyType && (
                                <div className="flex items-center gap-2">
                                  <FaTag className="text-green-500" />
                                  <span>{property.propertyType}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>

                          <CardFooter className="mt-auto pt-0">
                            <Button
                              asChild
                              className="w-full bg-green-500 hover:bg-green-600"
                            >
                              <Link to={`/property/${property._id}`}>View Details</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProperties;

