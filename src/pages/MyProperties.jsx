import { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  useDeleteProperty,
  useMyProperties,
  useUpdateProperty,
} from '../hooks/useProperties';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import Swal from 'sweetalert2';
import {
  FaMapMarkerAlt,
  FaTag,
  FaRulerCombined,
  FaEdit,
  FaTrash,
  FaClock,
} from 'react-icons/fa';
import { format } from 'date-fns';
import { useNavigate } from 'react-router';

const MyProperties = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: myProperties = [], isLoading, error } = useMyProperties(user?.email);

  const deletePropertyMutation = useDeleteProperty();
  const updatePropertyMutation = useUpdateProperty();

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const handleOpenEdit = (property) => {
    setSelectedProperty(property);
    setEditForm({
      propertyName: property.propertyName || '',
      description: property.description || '',
      price: property.price || '',
      propertySize: property.propertySize || '',
      propertyFor: property.propertyFor || '',
      priceUnit: property.priceUnit || '',
      depositAmount: property.depositAmount || '',
      availableFrom: property.availableFrom
        ? format(new Date(property.availableFrom), 'yyyy-MM-dd')
        : '',
      imageUrl: property.imageUrl || '',
    });
  };

  const handleChangeEditForm = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateProperty = async (event) => {
    event.preventDefault();
    if (!selectedProperty || !editForm) return;

    const payload = {
      ...selectedProperty,
      ...editForm,
      price: Number(editForm.price),
      depositAmount: editForm.depositAmount
        ? Number(editForm.depositAmount)
        : undefined,
      availableFrom: editForm.availableFrom || undefined,
      userEmail: user.email,
    };

    try {
      await updatePropertyMutation.mutateAsync({
        id: selectedProperty._id,
        payload,
      });
      Swal.fire({
        icon: 'success',
        title: 'Property Updated',
        text: 'Your property has been updated successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
      setSelectedProperty(null);
      setEditForm(null);
      // Navigate to property details page
      navigate(`/property/${selectedProperty._id}`);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text:
          err?.response?.data?.message ||
          err?.message ||
          'Could not update property at the moment.',
      });
    }
  };

  const handleDeleteProperty = async (id) => {
    const confirmation = await Swal.fire({
      icon: 'warning',
      title: 'Delete Property',
      text: 'Are you sure you want to delete this property? This action cannot be undone.',
      showCancelButton: true,
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
    });

    if (!confirmation.isConfirmed) return;

    try {
      await deletePropertyMutation.mutateAsync({ id, userEmail: user.email });
      Swal.fire({
        icon: 'success',
        title: 'Property Deleted',
        text: 'The property has been removed from your listings.',
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
          'Could not delete the property. Please try again.',
      });
    }
  };

  const sortedProperties = useMemo(() => {
    return [...myProperties].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }, [myProperties]);

  if (!user) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-lg mx-auto border-0 shadow-lg">
            <CardHeader>
              <h1 className="text-3xl font-bold text-gray-800">Login Required</h1>
              <p className="text-gray-600 mt-2">
                Please login to view and manage your listed properties.
              </p>
            </CardHeader>
            <CardFooter className="flex justify-center pb-6">
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 space-y-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              My Properties
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Manage the properties you have listed on HomeNest. Update details, check
              availability, or remove listings in just a few clicks.
            </p>
          </div>
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={() => navigate('/add-property')}
          >
            Add New Property
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="border-0 rounded-3xl shadow-lg">
                <Skeleton className="h-40 rounded-t-3xl" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="border-0 shadow-lg rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-red-500 mb-2">
              Failed to load your properties
            </h2>
            <p className="text-gray-600">
              {error?.message || 'Please refresh the page and try again.'}
            </p>
          </Card>
        ) : sortedProperties.length === 0 ? (
          <Card className="border-0 shadow-lg rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              You haven&apos;t listed any properties yet
            </h2>
            <p className="text-gray-600 mb-8">
              Start earning by listing your properties on HomeNest. It only takes a few
              minutes to reach thousands of interested buyers and tenants across Bangladesh.
            </p>
            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={() => navigate('/add-property')}
            >
              List Your First Property
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map((property) => {
              const formattedPrice =
                typeof property.price === 'number'
                  ? property.price.toLocaleString()
                  : property.price;

              return (
                <Card
                  key={property._id}
                  className="border-0 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48">
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
                  </div>

                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FaClock />
                      <span>
                        {property.createdAt
                          ? format(new Date(property.createdAt), 'MMM dd, yyyy')
                          : 'Recently listed'}
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
                        'Detailed description is not available. Please update this listing.'}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                      {property.propertySize && (
                        <div className="flex items-center gap-2">
                          <FaRulerCombined className="text-green-500" />
                          <span>{property.propertySize}</span>
                        </div>
                      )}
                      {formattedPrice && (
                        <div className="flex items-center gap-2">
                          <FaTag className="text-green-500" />
                          <span>
                            ৳{formattedPrice}
                            {property.priceUnit ? ` / ${property.priceUnit}` : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto flex flex-col gap-3">
                    <div className="flex gap-2">
                      <Dialog
                        open={selectedProperty?._id === property._id}
                        onOpenChange={(isOpen) => {
                          if (!isOpen) {
                            setSelectedProperty(null);
                            setEditForm(null);
                          } else {
                            handleOpenEdit(property);
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className="flex-1 bg-green-500 hover:bg-green-600"
                            onClick={() => handleOpenEdit(property)}
                          >
                            <FaEdit className="mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Property</DialogTitle>
                            <DialogDescription>
                              Update the property details below. Changes will be reflected
                              immediately across HomeNest.
                            </DialogDescription>
                          </DialogHeader>
                          {editForm && (
                            <form onSubmit={handleUpdateProperty} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-name">Property Name</Label>
                                  <Input
                                    id="edit-name"
                                    value={editForm.propertyName}
                                    onChange={(e) =>
                                      handleChangeEditForm('propertyName', e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-price">Price</Label>
                                  <Input
                                    id="edit-price"
                                    type="number"
                                    min="0"
                                    value={editForm.price}
                                    onChange={(e) =>
                                      handleChangeEditForm('price', e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-size">Size</Label>
                                  <Input
                                    id="edit-size"
                                    value={editForm.propertySize}
                                    onChange={(e) =>
                                      handleChangeEditForm('propertySize', e.target.value)
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-image">Image URL</Label>
                                  <Input
                                    id="edit-image"
                                    value={editForm.imageUrl}
                                    onChange={(e) =>
                                      handleChangeEditForm('imageUrl', e.target.value)
                                    }
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-priceUnit">Price Unit</Label>
                                  <Input
                                    id="edit-priceUnit"
                                    value={editForm.priceUnit}
                                    onChange={(e) =>
                                      handleChangeEditForm('priceUnit', e.target.value)
                                    }
                                    placeholder="e.g. monthly"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-deposit">Deposit Amount</Label>
                                  <Input
                                    id="edit-deposit"
                                    type="number"
                                    min="0"
                                    value={editForm.depositAmount}
                                    onChange={(e) =>
                                      handleChangeEditForm('depositAmount', e.target.value)
                                    }
                                    placeholder="For rental listings"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-available">Available From</Label>
                                  <Input
                                    id="edit-available"
                                    type="date"
                                    value={editForm.availableFrom}
                                    onChange={(e) =>
                                      handleChangeEditForm('availableFrom', e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  value={editForm.description}
                                  onChange={(e) =>
                                    handleChangeEditForm('description', e.target.value)
                                  }
                                  rows={4}
                                  required
                                />
                              </div>
                              <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedProperty(null);
                                    setEditForm(null);
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  className="bg-green-500 hover:bg-green-600 min-w-[140px]"
                                  disabled={updatePropertyMutation.isPending}
                                >
                                  {updatePropertyMutation.isPending
                                    ? 'Updating...'
                                    : 'Save Changes'}
                                </Button>
                              </DialogFooter>
                            </form>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleDeleteProperty(property._id)}
                        disabled={deletePropertyMutation.isPending}
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProperties;
