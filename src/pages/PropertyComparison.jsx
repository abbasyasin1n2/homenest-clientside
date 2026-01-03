import { Link } from 'react-router';
import { useComparison } from '../contexts/ComparisonContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { FaTrash, FaHome, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaTag, FaMoneyBillWave } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const PropertyComparison = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();

  const handleRemove = (propertyId) => {
    removeFromComparison(propertyId);
    toast.success('Removed from comparison');
  };

  const handleClearAll = () => {
    clearComparison();
    toast.success('Comparison cleared');
  };

  if (comparisonList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <FaHome className="mx-auto text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Properties to Compare</h2>
          <p className="text-gray-600 mb-6">
            Add properties from the listings page to compare them side-by-side
          </p>
          <Link to="/all-properties">
            <Button className="bg-green-500 hover:bg-green-600">
              Browse Properties
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const comparisonFields = [
    { label: 'Image', key: 'imageUrl', icon: null },
    { label: 'Property Name', key: 'propertyName', icon: FaHome },
    { label: 'Category', key: 'category', icon: FaTag },
    { label: 'Location', key: 'location', icon: FaMapMarkerAlt },
    { label: 'Price', key: 'price', icon: FaMoneyBillWave },
    { label: 'Listing Type', key: 'listingType', icon: FaTag },
    { label: 'Property Type', key: 'propertyType', icon: FaHome },
    { label: 'Bedrooms', key: 'bedrooms', icon: FaBed },
    { label: 'Bathrooms', key: 'bathrooms', icon: FaBath },
    { label: 'Size', key: 'size', icon: FaRulerCombined },
    { label: 'Description', key: 'description', icon: null },
  ];

  const formatValue = (property, key) => {
    if (key === 'imageUrl') {
      return (
        <img
          src={property[key] || '/staticassets/swiper1.jpg'}
          alt={property.propertyName}
          className="w-full h-48 object-cover rounded-xl"
        />
      );
    }
    if (key === 'price') {
      return `৳${parseInt(property[key] || 0).toLocaleString()}${property.priceUnit ? ` / ${property.priceUnit}` : ''}`;
    }
    if (key === 'size') {
      return `${property[key] || 'N/A'} ${property.sizeUnit || 'sqft'}`;
    }
    if (key === 'bedrooms' || key === 'bathrooms') {
      return property[key] || 'N/A';
    }
    if (key === 'description') {
      return (
        <div className="max-h-32 overflow-y-auto text-sm text-gray-600">
          {property[key] || 'No description available'}
        </div>
      );
    }
    return property[key] || 'N/A';
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Compare Properties</h1>
            <p className="text-gray-600">
              Compare up to 3 properties side-by-side ({comparisonList.length}/3)
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={handleClearAll}
            className="rounded-full"
          >
            <FaTrash className="mr-2" />
            Clear All
          </Button>
        </div>
      </motion.div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 rounded-2xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 sticky left-0 bg-gray-50 z-10">
                    Feature
                  </th>
                  {comparisonList.map((property, index) => (
                    <th
                      key={property._id}
                      className="px-6 py-4 text-center text-sm font-semibold text-gray-900 min-w-[300px]"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col gap-2"
                      >
                        <Badge className="bg-green-500 text-white">
                          Property {index + 1}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemove(property._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <FaTrash className="mr-1" /> Remove
                        </Button>
                      </motion.div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comparisonFields.map((field, fieldIndex) => (
                  <motion.tr
                    key={field.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: fieldIndex * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                      <div className="flex items-center gap-2">
                        {field.icon && <field.icon className="text-gray-500" />}
                        {field.label}
                      </div>
                    </td>
                    {comparisonList.map((property) => (
                      <td
                        key={property._id}
                        className="px-6 py-4 text-sm text-gray-700 text-center"
                      >
                        {formatValue(property, field.key)}
                      </td>
                    ))}
                  </motion.tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 sticky left-0 bg-gray-50 z-10">
                    Actions
                  </td>
                  {comparisonList.map((property) => (
                    <td key={property._id} className="px-6 py-4 text-center">
                      <Link to={`/property/${property._id}`}>
                        <Button className="bg-green-500 hover:bg-green-600 w-full">
                          View Details
                        </Button>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <Link to="/all-properties">
          <Button variant="outline" className="rounded-full">
            Add More Properties
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default PropertyComparison;

