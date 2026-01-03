import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useProperty, useUpdateProperty } from '../hooks/useProperties';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Swal from 'sweetalert2';

const propertyTypeOptions = {
  'Land/Plot': [
    { value: 'Residential Plot', label: 'Residential Plot' },
    { value: 'Commercial Plot', label: 'Commercial Plot' },
    { value: 'Land', label: 'Open Land' },
  ],
  Commercial: [
    { value: 'Commercial Plot', label: 'Commercial Plot' },
    { value: 'Office Space', label: 'Office Space' },
    { value: 'Warehouse', label: 'Warehouse' },
    { value: 'Retail Space', label: 'Retail Space' },
  ],
  Apartment: [
    { value: 'Apartment/Flats', label: 'Apartment / Flats' },
    { value: 'Serviced Apartment', label: 'Serviced Apartment' },
  ],
};

const categoryOptions = [
  { value: 'Land/Plot', label: 'Land / Plot' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Apartment', label: 'Apartment / Flat' },
];

const propertyForOptions = [
  { value: 'Sale', label: 'For Sale' },
  { value: 'Rent', label: 'For Rent' },
];

const RENT_FIELDS = ['priceUnit', 'depositAmount', 'availableFrom'];

const FIELD_METADATA = {
  propertySize: {
    label: 'Property Size',
    placeholder: 'e.g. 6 Katha / 2400 sqft',
    required: true,
  },
  constructionStatus: {
    label: 'Construction Status',
    type: 'select',
    options: ['Ready', 'Under Construction', 'Under Development', 'Almost Ready'],
    required: true,
  },
  transactionType: {
    label: 'Transaction Type',
    type: 'select',
    options: ['New', 'Resale'],
    required: true,
  },
  floorAvailableOn: {
    label: 'Floor Available On',
    placeholder: 'e.g. 5th Floor',
  },
  totalFloor: {
    label: 'Total Floors',
    type: 'number',
  },
  garages: {
    label: 'Parking / Garages',
    placeholder: 'e.g. 2 Car Parking',
  },
  bedrooms: {
    label: 'Bedrooms',
    type: 'number',
    required: true,
  },
  bathrooms: {
    label: 'Bathrooms',
    type: 'number',
    required: true,
  },
  balconies: {
    label: 'Balconies',
    type: 'number',
  },
  facing: {
    label: 'Facing',
    type: 'select',
    options: ['North', 'South', 'East', 'West', 'North-East', 'South-East'],
  },
  priceUnit: {
    label: 'Price Unit',
    placeholder: 'e.g. monthly',
    requiredWhen: (data) => data.propertyFor === 'Rent',
  },
  depositAmount: {
    label: 'Security Deposit',
    type: 'number',
  },
  availableFrom: {
    label: 'Available From',
    type: 'date',
    requiredWhen: (data) => data.propertyFor === 'Rent',
  },
};

const FIELD_CONFIG = {
  'Land/Plot': {
    base: ['propertySize', 'constructionStatus', 'transactionType'],
    typeSpecific: {},
  },
  Commercial: {
    base: ['propertySize', 'constructionStatus', 'transactionType'],
    typeSpecific: {
      'Office Space': ['floorAvailableOn', 'totalFloor', 'garages'],
      Warehouse: ['floorAvailableOn', 'garages'],
      'Retail Space': ['floorAvailableOn'],
      'Commercial Plot': [],
    },
  },
  Apartment: {
    base: [
      'propertySize',
      'constructionStatus',
      'transactionType',
      'bedrooms',
      'bathrooms',
      'balconies',
      'totalFloor',
      'facing',
      'garages',
    ],
    typeSpecific: {},
  },
};

const initialFormState = {
  propertyName: '',
  description: '',
  category: '',
  propertyType: '',
  propertyFor: '',
  location: '',
  price: '',
  propertySize: '',
  constructionStatus: '',
  transactionType: '',
  floorAvailableOn: '',
  totalFloor: '',
  garages: '',
  bedrooms: '',
  bathrooms: '',
  balconies: '',
  facing: '',
  priceUnit: '',
  depositAmount: '',
  availableFrom: '',
  imageUrl: '',
  features: '',
};

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: property, isLoading: propertyLoading } = useProperty(id);
  const updatePropertyMutation = useUpdateProperty();

  const [formData, setFormData] = useState(initialFormState);
  const [initialized, setInitialized] = useState(false);

  // Initialize form with property data
  useEffect(() => {
    if (property && !initialized) {
      const features = Array.isArray(property.features) 
        ? property.features.join(', ') 
        : property.features || '';
      
      setFormData({
        propertyName: property.propertyName || '',
        description: property.description || '',
        category: property.category || '',
        propertyType: property.propertyType || '',
        propertyFor: property.propertyFor || '',
        location: property.location || '',
        price: property.price?.toString() || '',
        propertySize: property.propertySize || '',
        constructionStatus: property.constructionStatus || '',
        transactionType: property.transactionType || '',
        floorAvailableOn: property.floorAvailableOn || '',
        totalFloor: property.totalFloor?.toString() || '',
        garages: property.garages || '',
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        balconies: property.balconies?.toString() || '',
        facing: property.facing || '',
        priceUnit: property.priceUnit || '',
        depositAmount: property.depositAmount?.toString() || '',
        availableFrom: property.availableFrom || '',
        imageUrl: property.imageUrl || '',
        features: features,
      });
      setInitialized(true);
    }
  }, [property, initialized]);

  const parsedFeatures = useMemo(() => {
    if (!formData.features.trim()) return [];
    return formData.features.split(',').map((item) => item.trim()).filter(Boolean);
  }, [formData.features]);

  const activeFieldKeys = useMemo(() => {
    const keys = new Set();
    const config = FIELD_CONFIG[formData.category];

    if (config?.base) {
      config.base.forEach((field) => keys.add(field));
    }

    if (config?.typeSpecific && formData.propertyType) {
      const specific = config.typeSpecific[formData.propertyType] || [];
      specific.forEach((field) => keys.add(field));
    }

    if (formData.propertyFor === 'Rent') {
      RENT_FIELDS.forEach((field) => keys.add(field));
    }

    return Array.from(keys);
  }, [formData.category, formData.propertyType, formData.propertyFor]);

  const handleChange = (field) => (event) => {
    const value = event?.target ? event.target.value : event;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const baseRequiredFields = [
    'propertyName',
    'description',
    'category',
    'propertyType',
    'propertyFor',
    'price',
    'location',
    'imageUrl',
  ];

  const dynamicRequiredFields = activeFieldKeys.filter((field) => {
    const metadata = FIELD_METADATA[field];
    if (!metadata) return false;
    if (metadata.requiredWhen) {
      return metadata.requiredWhen(formData);
    }
    return Boolean(metadata.required);
  });

  const validateForm = () => {
    const missing = [...baseRequiredFields, ...dynamicRequiredFields].find((field) => {
      const value = formData[field];
      return value === undefined || value === null || value.toString().trim() === '';
    });

    if (missing) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please complete all required fields before updating the property.',
      });
      return false;
    }

    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'You must be logged in to update a property.',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      features: parsedFeatures,
      userEmail: user.email,
      userName: user.displayName || 'HomeNest User',
      listedBy: {
        name: user.displayName || 'HomeNest User',
        email: user.email,
      },
    };

    const numericFields = [
      'price',
      'depositAmount',
      'bedrooms',
      'bathrooms',
      'balconies',
      'totalFloor',
    ];

    numericFields.forEach((field) => {
      if (payload[field] !== undefined && payload[field] !== '') {
        const num = Number(payload[field]);
        if (!Number.isNaN(num)) {
          payload[field] = num;
        } else {
          delete payload[field];
        }
      }
    });

    Object.keys(payload).forEach((key) => {
      if (payload[key] === '' || payload[key] === undefined || payload[key] === null) {
        delete payload[key];
      }
    });

    try {
      await updatePropertyMutation.mutateAsync({ id, payload });
      Swal.fire({
        icon: 'success',
        title: 'Property Updated!',
        text: 'Your property has been updated successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
      navigate('/my-properties');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update Property',
        text:
          error?.response?.data?.message ||
          error?.message ||
          'An unexpected error occurred. Please try again.',
      });
    }
  };

  const renderField = (fieldKey) => {
    const metadata = FIELD_METADATA[fieldKey];
    if (!metadata) return null;

    const value = formData[fieldKey];
    const commonProps = {
      id: fieldKey,
      value: value ?? '',
      onChange: (event) => handleChange(fieldKey)(event),
      required: dynamicRequiredFields.includes(fieldKey),
    };

    if (metadata.type === 'select') {
      return (
        <div key={fieldKey} className="space-y-2">
          <Label htmlFor={fieldKey}>
            {metadata.label}
            {dynamicRequiredFields.includes(fieldKey) && (
              <span className="text-red-500"> *</span>
            )}
          </Label>
          <Select value={value ?? ''} onValueChange={(val) => handleChange(fieldKey)(val)}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder={`Select ${metadata.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {metadata.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    const inputType = metadata.type === 'number' ? 'number' : metadata.type === 'date' ? 'date' : 'text';

    return (
      <div key={fieldKey} className="space-y-2">
        <Label htmlFor={fieldKey}>
          {metadata.label}
          {dynamicRequiredFields.includes(fieldKey) && (
            <span className="text-red-500"> *</span>
          )}
        </Label>
        <Input
          {...commonProps}
          type={inputType}
          placeholder={metadata.placeholder}
          min={metadata.type === 'number' ? '0' : undefined}
        />
      </div>
    );
  };

  if (propertyLoading) {
    return (
      <section className="py-8">
        <Card className="border-0 shadow-xl rounded-3xl bg-white dark:bg-gray-800">
          <CardHeader className="space-y-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96" />
          </CardHeader>
          <Separator />
          <CardContent className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (!property) {
    return (
      <section className="py-8">
        <Card className="border-0 shadow-xl rounded-3xl bg-white dark:bg-gray-800 p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Property Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The property you're trying to edit doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/my-properties')} className="bg-green-500 hover:bg-green-600">
            Back to My Properties
          </Button>
        </Card>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div>
        <Card className="border-0 shadow-xl rounded-3xl bg-white dark:bg-gray-800">
          <CardHeader className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Update Property
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Modify the details of your property listing.
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
                  <Label>Your Name</Label>
                  <Input value={user?.displayName || 'HomeNest User'} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Your Email</Label>
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

              {activeFieldKeys.length > 0 && (
                <div>
                  <Separator className="my-6" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Additional Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeFieldKeys.map((fieldKey) => renderField(fieldKey))}
                  </div>
                </div>
              )}

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
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/my-properties')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 px-8 py-3 text-lg"
                  disabled={updatePropertyMutation.isPending}
                >
                  {updatePropertyMutation.isPending ? 'Updating...' : 'Update Property'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UpdateProperty;

