import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useDeleteRating, useMyRatings } from '../hooks/useRatings';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { FaArrowRight, FaMapMarkerAlt, FaTag, FaTrash } from 'react-icons/fa';

const MyRatings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: ratings = [],
    isLoading,
    error,
  } = useMyRatings(user?.email);

  const deleteRatingMutation = useDeleteRating();

  const stats = useMemo(() => {
    if (!ratings.length) {
      return { total: 0, average: 0, latestDate: null };
    }

    const total = ratings.length;
    const average = Number(
      (
        ratings.reduce((sum, rating) => sum + (rating.ratingValue || 0), 0) /
        total
      ).toFixed(1)
    );
    const latestDate = ratings.reduce((latest, rating) => {
      if (!rating.createdAt) return latest;
      const date = new Date(rating.createdAt);
      return !latest || date > latest ? date : latest;
    }, null);

    return { total, average, latestDate };
  }, [ratings]);

  const handleDeleteRating = async (rating) => {
    const confirmation = await Swal.fire({
      icon: 'warning',
      title: 'Remove Review',
      text: 'Are you sure you want to delete this review? This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
    });

    if (!confirmation.isConfirmed) return;

    try {
      await deleteRatingMutation.mutateAsync({
        id: rating._id,
        userEmail: user.email,
        propertyId: rating.propertyId,
      });

      Swal.fire({
        icon: 'success',
        title: 'Review Removed',
        text: 'Your feedback has been removed successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text:
          err?.response?.data?.message ||
          err?.message ||
          'Could not delete your review. Please try again.',
      });
    }
  };

  if (!user) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-lg mx-auto border-0 shadow-lg">
            <CardHeader>
              <h1 className="text-3xl font-bold text-gray-800">Login Required</h1>
              <p className="text-gray-600 mt-2">
                Please login to view the reviews you have submitted on HomeNest.
              </p>
            </CardHeader>
            <CardContent className="pb-6">
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              My Ratings & Reviews
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Track and manage the feedback you have shared across the HomeNest portal.
              Help other clients discover the right properties with your insights.
            </p>
          </div>
          <Card className="border-0 shadow-lg rounded-3xl bg-white/90 backdrop-blur w-full max-w-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Reviews</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Average Rating</p>
                  <div className="flex items-center gap-2 justify-end">
                    <Rating style={{ maxWidth: 120 }} value={stats.average} readOnly />
                    <span className="text-xl font-semibold text-gray-800">
                      {stats.total ? stats.average : '–'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Last review:{' '}
                {stats.latestDate
                  ? format(stats.latestDate, 'MMM dd, yyyy')
                  : 'No reviews yet'}
              </div>
            </CardContent>
          </Card>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="border-0 rounded-3xl shadow-lg">
                <Skeleton className="h-40 rounded-t-3xl" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="border-0 shadow-lg rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-red-500 mb-2">
              Failed to load your reviews
            </h2>
            <p className="text-gray-600">
              {error?.message || 'Please refresh the page and try again.'}
            </p>
          </Card>
        ) : ratings.length === 0 ? (
          <Card className="border-0 shadow-lg rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              You haven’t reviewed any properties yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore HomeNest to share your experience with the properties you have visited or rented.
            </p>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => navigate('/all-properties')}
            >
              Browse Properties
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ratings
              .slice()
              .sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA;
              })
              .map((rating) => (
                <Card key={rating._id} className="border-0 rounded-3xl shadow-lg flex flex-col">
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Rating style={{ maxWidth: 120 }} value={rating.ratingValue} readOnly />
                        <Badge className="bg-green-100 text-green-700 border border-green-200">
                          {rating.ratingValue} / 5
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">
                        {rating.createdAt
                          ? format(new Date(rating.createdAt), 'MMM dd, yyyy')
                          : ''}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {rating.propertyName || 'HomeNest Property'}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <FaTag className="text-green-500" />
                      <span>{rating.propertyCategory || 'General'}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {rating.reviewText || 'No additional feedback provided.'}
                    </p>
                    {rating.propertyLocation && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FaMapMarkerAlt className="text-green-500" />
                        <span>{rating.propertyLocation}</span>
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => navigate(`/property/${rating.propertyId || ''}`)}
                      >
                        View Property
                        <FaArrowRight className="ml-2" />
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full sm:w-auto"
                        onClick={() => handleDeleteRating(rating)}
                        disabled={deleteRatingMutation.isPending}
                      >
                        <FaTrash className="mr-2" />
                        Delete Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyRatings;

