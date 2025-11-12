import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useAddProperty } from '../hooks/useProperties';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Swal from 'sweetalert2';

const categoryOptions = [
  { value: 'Land/Plot', label: 'Land / Plot' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Apartment', label: 'Apartment / Flat' },
];

const propertyForOptions = [
  { value: 'Sale', label: 'For Sale' },
  { value: 'Rent', label: 'For Rent' },
];

const propertyTypeOptions = {
  'Land/Plot': [
    { value: 'Residential Plot', label: 'Residential Plot' },
    { value: 'Commercial Plot', label: 'Commercial Plot' },
    { value: 'Land', label: 'Land' },
  ],
  Commercial: [
    { value: 'Office Space', label: 'Office Space' },
    { value: 'Warehouse', label: 'Warehouse' },
    { value: 'Retail Space', label: 'Retail Space' },
  ],
  Apartment: [
    { value: 'Apartment/Flats', label: 'Apartment / Flats' },
    { value: 'Serviced Apartment', label: 'Serviced Apartment' },
  ],
};

const initialFormState = {
  propertyName: '',
  description: '',
  category: '',
  propertyType: '',
  propertyFor: '',
  propertySize: '',
  price: '',
  priceUnit: '',
  depositAmount: '',
  availableFrom: '',
  location: '',
  imageUrl: '',
  features: '',
};

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const addPropertyMutation = useAddProperty();

  const [formData, setFormData] = useState(initialFormState);

  const parsedFeatures = useMemo(() => {
    if (!formData.features.trim()) return [];
    return formData.features.split(',').map((item) => item.trim()).filter(Boolean);
  }, [formData.features]);

  useEffect(() => {
    if (formData.propertyFor === 'Rent') {
      setFormData((prev) => ({
        ...prev,
        priceUnit: prev.priceUnit || 'monthly',
      }));
    } else if (formData.propertyFor === 'Sale') {
      setFormData((prev) => ({
        ...prev,
        priceUnit: '',
        depositAmount: '',
      }));
    }
  }, [formData.propertyFor]);

  useEffect(() => {
    if (formData.category) {
      const types = propertyTypeOptions[formData.category] || [];
      if (!types.find((type) => type.value === formData.propertyType)) {
        setFormData((prev) => ({
          ...prev,
          propertyType: types[0]?.value || '',
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        propertyType: '',
      }));
    }
  }, [formData.category]);

  const handleChange = (field) => (event) => {
    const value =
      event && event.target ? event.target.value : event; // handles select values
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'propertyName',
      'description',
      'category',
      'propertyType',
      'propertyFor',
      'price',
      'location',
      'imageUrl',
    ];

    const missingField = requiredFields.find((field) => !formData[field]?.toString().trim());
    if (missingField) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields before submitting the property.',
      });
      return false;
    }

    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'You must be logged in to add a property.',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      depositAmount: formData.depositAmount
        ? Number(formData.depositAmount)
        : undefined,
      features: parsedFeatures,
      userEmail: user.email,
      userName: user.displayName || 'HomeNest User',
      listedBy: {
        name: user.displayName || 'HomeNest User',
        email: user.email,
      },
    };

    try {
      await addPropertyMutation.mutateAsync(payload);
      Swal.fire({
        icon: 'success',
        title: 'Property Added!',
        text: 'Your property has been listed successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
      setFormData(initialFormState);
      navigate('/my-properties');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Property',
        text:
          error?.response?.data?.message ||
          error?.message ||
          'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="border-0 shadow-xl rounded-3xl">
          <CardHeader className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Add a New Property
            </h1>
            <p className="text-gray-600">
              Provide accurate details so tenants and buyers can discover the right property
              quickly.
            </p>
          </CardHeader>
          <Separator />
          <CardContent className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="propertyName">
                    Property Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="propertyName"
                    value={formData.propertyName}
                    onChange={handleChange('propertyName')}
                    placeholder="e.g. Modhu City Phase 3 Residential Plot"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange('location')}
                    placeholder="e.g. Mohammadpur, Dhaka"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange('category')(value)}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select property category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    Property Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => handleChange('propertyType')(value)}
                    disabled={!formData.category}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {(propertyTypeOptions[formData.category] || []).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>
                    Listing Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.propertyFor}
                    onValueChange={(value) => handleChange('propertyFor')(value)}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {propertyForOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertySize">Property Size</Label>
                  <Input
                    id="propertySize"
                    value={formData.propertySize}
                    onChange={handleChange('propertySize')}
                    placeholder="e.g. 6 Katha / 2400 sqft"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">
                    Price <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleChange('price')}
                    placeholder="e.g. 14500000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceUnit">Price Unit {formData.propertyFor === 'Rent' && <span className="text-red-500">*</span>}</Label>
                  <Input
                    id="priceUnit"
                    value={formData.priceUnit}
                    onChange={handleChange('priceUnit')}
                    placeholder={formData.propertyFor === 'Rent' ? 'e.g. monthly' : 'Optional'}
                    disabled={formData.propertyFor !== 'Rent'}
                  />
                </div>
                {formData.propertyFor === 'Rent' && (
                  <div className="space-y-2">
                    <Label htmlFor="depositAmount">Security Deposit</Label>
                    <Input
                      id="depositAmount"
                      type="number"
                      min="0"
                      value={formData.depositAmount}
                      onChange={handleChange('depositAmount')}
                      placeholder="e.g. 1200000"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="availableFrom">Available From</Label>
                  <Input
                    id="availableFrom"
                    type="date"
                    value={formData.availableFrom}
                    onChange={handleChange('availableFrom')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Your Name
                  </Label>
                  <Input value={user?.displayName || 'HomeNest User'} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>
                    Your Email
                  </Label>
                  <Input value={user?.email || ''} readOnly />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="imageUrl">
                    Feature Image URL <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange('imageUrl')}
                    placeholder="https://"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange('description')}
                  placeholder="Describe the property highlights, nearby amenities, and anything buyers or tenants should know..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">
                  Key Features <span className="text-xs text-gray-400 font-normal">(comma separated)</span>
                </Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={handleChange('features')}
                  placeholder="e.g. Generator backup, Dedicated parking, Security & CCTV"
                />
                {parsedFeatures.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {parsedFeatures.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 px-8 py-3 text-lg"
                  disabled={addPropertyMutation.isPending}
                >
                  {addPropertyMutation.isPending ? 'Submitting...' : 'Add Property'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AddProperty;

