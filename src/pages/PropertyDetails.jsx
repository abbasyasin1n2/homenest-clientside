import { useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { useProperty } from '../hooks/useProperties';
import { usePropertyRatings, useSubmitRating } from '../hooks/useRatings';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist, useAddToWishlist, useRemoveFromWishlist } from '../hooks/useWishlist';
import { useSendInquiry } from '../hooks/useInquiries';
import { useNotifications } from '../contexts/NotificationContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  FaHeart,
  FaRegHeart,
  FaPaperPlane,
  FaExpand,
  FaInfoCircle,
  FaSignInAlt,
} from 'react-icons/fa';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: property,
    isLoading,
    error,
  } = useProperty(id);

  const {
    data: ratings = [],
    isLoading: ratingsLoading,
  } = usePropertyRatings(id);

  const { data: wishlist = [] } = useWishlist(user?.email);
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const sendInquiry = useSendInquiry();
  const { addNotification } = useNotifications();

  const [newRating, setNewRating] = useState({
    ratingValue: 4,
    reviewText: '',
  });

  const [inquiryForm, setInquiryForm] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    message: '',
  });

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const submitRatingMutation = useSubmitRating();

  const isInWishlist = wishlist.some(item => item.propertyId === id);

  const averageRating = useMemo(() => {
    if (!ratings.length) return 0;
    const total = ratings.reduce((sum, rating) => sum + (rating.ratingValue || 0), 0);
    return Number((total / ratings.length).toFixed(1));
  }, [ratings]);

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error('Please login to add properties to your wishlist');
      navigate('/login', { state: { from: `/property/${id}` } });
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist.mutateAsync({ userEmail: user.email, propertyId: id });
        toast.success('Removed from Wishlist');
        addNotification({
          type: 'wishlist',
          title: 'Removed from Wishlist',
          message: `${property?.propertyName} has been removed from your wishlist`,
        });
      } else {
        await addToWishlist.mutateAsync({ userEmail: user.email, propertyId: id });
        toast.success('Added to Wishlist');
        addNotification({
          type: 'wishlist',
          title: 'Added to Wishlist',
          message: `${property?.propertyName} has been added to your wishlist`,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update wishlist');
    }
  };

  const handleSendInquiry = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to contact the property owner');
      navigate('/login', { state: { from: `/property/${id}` } });
      return;
    }

    try {
      await sendInquiry.mutateAsync({
        senderName: inquiryForm.name,
        senderEmail: user.email,
        senderPhone: inquiryForm.phone,
        message: inquiryForm.message,
        propertyId: id,
        propertyName: property.propertyName,
        ownerEmail: property.userEmail,
        ownerName: property.listedBy?.name || property.userName,
      });

      toast.success('Inquiry sent! The property owner will contact you soon.');

      setIsInquiryOpen(false);
      setInquiryForm({
        name: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        message: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send inquiry');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit your review');
      navigate('/login', { state: { from: `/property/${id}` } });
      return;
    }

    if (!newRating.reviewText.trim()) {
      toast.error('Please share your experience in the review field');
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

      toast.success('Thank you! Your review has been submitted successfully');

      setNewRating({
        ratingValue: 4,
        reviewText: '',
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to submit review');
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-xl cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <LazyLoadImage
            src={property.imageUrl || '/staticassets/swiper1.jpg'}
            alt={property.propertyName}
            className="w-full h-full object-cover"
            effect="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant={isInWishlist ? "default" : "secondary"}
                  className={`absolute top-6 right-6 ${isInWishlist ? 'bg-red-500 hover:bg-red-600' : 'bg-white hover:bg-gray-100'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlistToggle();
                  }}
                >
                  {isInWishlist ? (
                    <FaHeart className="h-5 w-5 text-white" />
                  ) : (
                    <FaRegHeart className="h-5 w-5 text-gray-700" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            size="icon"
            variant="secondary"
            className="absolute top-6 right-20 bg-white hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
          >
            <FaExpand className="h-5 w-5 text-gray-700" />
          </Button>
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
        </motion.div>

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

                {/* Review Section - Show login prompt for non-authenticated users */}
                {user ? (
                  <form
                    onSubmit={handleSubmitReview}
                    className="space-y-4 bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 md:p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Share your experience
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
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
                ) : (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 md:p-8 text-center border border-green-100 dark:border-green-800">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaSignInAlt className="text-green-600 dark:text-green-400 text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Want to share your experience?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      Login to write a review and help others make informed decisions about this property.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        asChild
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Link to="/login" state={{ from: `/property/${id}` }}>
                          <FaSignInAlt className="mr-2" />
                          Login to Add Review
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30"
                      >
                        <Link to="/register" state={{ from: `/property/${id}` }}>
                          Create an Account
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

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

            <Card className="border-0 shadow-lg rounded-3xl bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Contact Owner
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 space-y-3 shadow">
                  {property.listedBy && (
                    <>
                      <div>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {property.listedBy.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Property Owner</p>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <FaPhone className="text-green-500" />
                        <span>{property.listedBy.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <FaEnvelope className="text-green-500" />
                        <span>{property.listedBy.email}</span>
                      </div>
                    </>
                  )}
                  
                  {/* Inquiry Section - Show login prompt for non-authenticated users */}
                  {user ? (
                    <Dialog open={isInquiryOpen} onOpenChange={setIsInquiryOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-green-500 hover:bg-green-600">
                          <FaPaperPlane className="mr-2" />
                          Send Inquiry
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Contact Property Owner</DialogTitle>
                          <DialogDescription>
                            Send a message to inquire about this property
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSendInquiry} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                              id="name"
                              value={inquiryForm.name}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={inquiryForm.email}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                              required
                              disabled
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={inquiryForm.phone}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              value={inquiryForm.message}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                              placeholder="I'm interested in this property..."
                              rows={4}
                              required
                            />
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600"
                            disabled={sendInquiry.isPending}
                          >
                            {sendInquiry.isPending ? 'Sending...' : 'Send Message'}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <Separator />
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        Login to send an inquiry to the property owner
                      </p>
                      <Button
                        asChild
                        className="w-full bg-green-500 hover:bg-green-600"
                      >
                        <Link to="/login" state={{ from: `/property/${id}` }}>
                          <FaSignInAlt className="mr-2" />
                          Login to Send Inquiry
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Image Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[{ src: property.imageUrl || '/staticassets/swiper1.jpg' }]}
        />
      </div>
    </section>
  );
};

export default PropertyDetails;

