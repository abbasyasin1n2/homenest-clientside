import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useProperty } from '../hooks/useProperties';
import { usePropertyRatings, useSubmitRating } from '../hooks/useRatings';
import { useAuth } from '../contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  FaMapMarkerAlt,
  FaTag,
  FaRulerCombined,
  FaBuilding,
  FaHome,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaBed,
  FaBath,
  FaDoorOpen,
} from 'react-icons/fa';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const {
    data: property,
    isLoading,
    error,
  } = useProperty(id);

  const {
    data: ratings = [],
    isLoading: ratingsLoading,
  } = usePropertyRatings(id);

  const [newRating, setNewRating] = useState({
    ratingValue: 4,
    reviewText: '',
  });

  const submitRatingMutation = useSubmitRating();

  const averageRating = useMemo(() => {
    if (!ratings.length) return 0;
    const total = ratings.reduce((sum, rating) => sum + (rating.ratingValue || 0), 0);
    return Number((total / ratings.length).toFixed(1));
  }, [ratings]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please login to submit your review.',
      });
      return;
    }

    if (!newRating.reviewText.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Review Required',
        text: 'Please share your experience in the review field.',
      });
      return;
    }

    try {
      await submitRatingMutation.mutateAsync({
        propertyId: id,
        propertyName: property?.propertyName,
        propertyCategory: property?.category,
        ratingValue: newRating.ratingValue,
        reviewText: newRating.reviewText.trim(),
        reviewerName: user.displayName || 'Anonymous User',
        reviewerEmail: user.email,
        reviewerPhoto: user.photoURL,
      });

      Swal.fire({
        icon: 'success',
        title: 'Thank you!',
        text: 'Your review has been submitted successfully.',
        timer: 2000,
        showConfirmButton: false,
      });

      setNewRating({
        ratingValue: 4,
        reviewText: '',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to submit review',
        text:
          err?.response?.data?.message ||
          err?.message ||
          'An unexpected error occurred. Please try again.',
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-72 bg-gray-200 animate-pulse rounded-3xl mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-40 bg-gray-200 rounded-3xl animate-pulse" />
              <div className="h-40 bg-gray-200 rounded-3xl animate-pulse" />
            </div>
            <div className="h-96 bg-gray-200 rounded-3xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !property) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto border-0 shadow-lg">
            <CardHeader>
              <h1 className="text-3xl font-bold text-red-500">
                Unable to load property details
              </h1>
              <p className="text-gray-600 mt-2">
                {error?.message || 'Please try refreshing the page.'}
              </p>
            </CardHeader>
          </Card>
        </div>
      </section>
    );
  }

  const formattedPrice =
    typeof property.price === 'number'
      ? property.price.toLocaleString()
      : property.price;

  const propertySummary = [
    {
      label: 'Property Type',
      value: property.propertyType || 'N/A',
      icon: <FaBuilding />,
    },
    {
      label: 'Listing Type',
      value: property.propertyFor || 'N/A',
      icon: <FaTag />,
    },
    {
      label: 'Size',
      value: property.propertySize || 'N/A',
      icon: <FaRulerCombined />,
    },
    {
      label: 'Bedrooms',
      value: property.bedrooms ? `${property.bedrooms}` : 'N/A',
      icon: <FaBed />,
    },
    {
      label: 'Bathrooms',
      value: property.bathrooms ? `${property.bathrooms}` : 'N/A',
      icon: <FaBath />,
    },
    {
      label: 'Balconies',
      value: property.balconies ? `${property.balconies}` : 'N/A',
      icon: <FaDoorOpen />,
    },
    {
      label: 'Construction Status',
      value: property.constructionStatus || 'N/A',
      icon: <FaHome />,
    },
    {
      label: 'Available From',
      value: property.availableFrom
        ? format(new Date(property.availableFrom), 'MMM dd, yyyy')
        : 'Ready',
      icon: <FaCalendarAlt />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 space-y-12">
        {/* Hero */}
        <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-xl">
          <img
            src={property.imageUrl || '/staticassets/swiper1.jpg'}
            alt={property.propertyName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4 text-white">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {property.category && (
                  <Badge className="bg-green-500 text-white text-sm px-4 py-2 rounded-full">
                    {property.category}
                  </Badge>
                )}
                {property.propertyFor && (
                  <Badge className="bg-white/20 text-white text-sm px-4 py-2 rounded-full border border-white/40">
                    {property.propertyFor}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {property.propertyName}
              </h1>
              <div className="flex items-center gap-2 text-sm md:text-base text-green-200">
                <FaMapMarkerAlt />
                <span>{property.location}</span>
              </div>
            </div>
            {formattedPrice && (
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-2xl text-right">
                <p className="text-sm text-green-100">Listed Price</p>
                <p className="text-2xl font-bold text-white">
                  ৳{formattedPrice}
                  {property.priceUnit ? ` / ${property.priceUnit}` : ''}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg rounded-3xl">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Property Overview
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {propertySummary.map((item, index) => (
                      <div
                        key={`${item.label}-${index}`}
                        className="flex items-start gap-3 bg-gray-50 rounded-2xl p-4"
                      >
                        <div className="text-green-500 text-xl pt-1">{item.icon}</div>
                        <div>
                          <p className="text-sm text-gray-500">{item.label}</p>
                          <p className="text-lg font-semibold text-gray-800">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description ||
                      'Detailed property description will be available soon.'}
                  </p>
                </div>

                {property.features?.length ? (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Key Features & Amenities
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {property.features.map((feature, index) => (
                          <Badge
                            key={`${feature}-${index}`}
                            className="bg-green-100 text-green-700 border border-green-200"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                ) : null}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-3xl">
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Ratings & Reviews
                    </h2>
                    <p className="text-gray-600">
                      Hear from clients who have explored this property.
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <div className="flex items-center gap-3">
                      <Rating style={{ maxWidth: 140 }} value={averageRating} readOnly />
                      <span className="text-2xl font-bold text-gray-800">
                        {averageRating || '–'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {ratings.length} {ratings.length === 1 ? 'review' : 'reviews'}
                    </p>
                  </div>
                </div>

                <Separator />

                <form
                  onSubmit={handleSubmitReview}
                  className="space-y-4 bg-gray-50 rounded-2xl p-4 md:p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    Share your experience
                  </h3>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-sm text-gray-600 flex-1">
                      Rate this property to help others make confident decisions. Your
                      name and review will be visible to other users.
                    </p>
                    <Rating
                      style={{ maxWidth: 180 }}
                      value={newRating.ratingValue}
                      onChange={(value) =>
                        setNewRating((prev) => ({ ...prev, ratingValue: value }))
                      }
                    />
                  </div>
                  <Textarea
                    value={newRating.reviewText}
                    onChange={(e) =>
                      setNewRating((prev) => ({ ...prev, reviewText: e.target.value }))
                    }
                    placeholder="Describe your experience with this property..."
                    rows={4}
                    className="resize-none"
                  />
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600"
                    disabled={submitRatingMutation.isPending}
                  >
                    {submitRatingMutation.isPending ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>

                <Separator />

                <div className="space-y-4">
                  {ratingsLoading ? (
                    <p className="text-gray-500">Loading reviews...</p>
                  ) : ratings.length === 0 ? (
                    <p className="text-gray-500 italic">
                      No reviews yet. Be the first to share your experience.
                    </p>
                  ) : (
                    ratings
                      .slice()
                      .reverse()
                      .map((rating) => (
                        <div
                          key={rating._id}
                          className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                            <div>
                              <p className="text-lg font-semibold text-gray-800">
                                {rating.reviewerName || 'HomeNest User'}
                              </p>
                              <p className="text-sm text-gray-500">
                                {rating.reviewerEmail}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Rating
                                style={{ maxWidth: 120 }}
                                value={rating.ratingValue || 0}
                                readOnly
                              />
                              <span className="text-sm text-gray-500">
                                {rating.createdAt
                                  ? format(new Date(rating.createdAt), 'MMM dd, yyyy')
                                  : ''}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {rating.reviewText}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg rounded-3xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Listing Highlights
                </h2>
                <div className="space-y-3 text-gray-600">
                  {property.transactionType && (
                    <div className="flex items-center gap-3">
                      <FaTag className="text-green-500" />
                      <span>
                        Transaction: <strong>{property.transactionType}</strong>
                      </span>
                    </div>
                  )}
                  {property.depositAmount && (
                    <div className="flex items-center gap-3">
                      <FaTag className="text-green-500" />
                      <span>
                        Deposit: <strong>৳{property.depositAmount}</strong>
                      </span>
                    </div>
                  )}
                  {property.garages && (
                    <div className="flex items-center gap-3">
                      <FaBuilding className="text-green-500" />
                      <span>{property.garages}</span>
                    </div>
                  )}
                  {property.facing && (
                    <div className="flex items-center gap-3">
                      <FaHome className="text-green-500" />
                      <span>Facing: {property.facing}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {property.listedBy && (
              <Card className="border-0 shadow-lg rounded-3xl bg-green-50">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Contact Information
                  </h2>
                  <div className="bg-white rounded-2xl p-4 space-y-3 shadow">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {property.listedBy.name}
                      </p>
                      <p className="text-sm text-gray-500">Property Advisor</p>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaPhone className="text-green-500" />
                      <span>{property.listedBy.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <FaEnvelope className="text-green-500" />
                      <span>{property.listedBy.email}</span>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-green-500 hover:bg-green-600"
                    >
                      <a href={`mailto:${property.listedBy.email}`}>
                        Contact Advisor
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;

