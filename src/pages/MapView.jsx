import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router';
import { useAllProperties } from '../hooks/useProperties';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { FaMapMarkedAlt, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  const { data: properties = [], isLoading } = useAllProperties();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const bangladeshCenter = [23.8103, 90.4125];

  const locationCoordinates = [
    // Dhaka Areas (Check these FIRST before general "Dhaka")
    { name: 'gulshan', coords: [23.7925, 90.4078] },
    { name: 'banani', coords: [23.7937, 90.4066] },
    { name: 'dhanmondi', coords: [23.7461, 90.3742] },
    { name: 'mirpur', coords: [23.8223, 90.3654] },
    { name: 'uttara', coords: [23.8759, 90.3795] },
    { name: 'motijheel', coords: [23.7334, 90.4176] },
    { name: 'mohammadpur', coords: [23.7679, 90.3563] },
    { name: 'bashundhara', coords: [23.8223, 90.4279] },
    { name: 'mohakhali', coords: [23.7808, 90.4067] },
    { name: 'farmgate', coords: [23.7562, 90.3872] },
    { name: 'tejgaon', coords: [23.7644, 90.3958] },
    { name: 'badda', coords: [23.7809, 90.4282] },
    { name: 'rampura', coords: [23.7633, 90.4254] },
    { name: 'khilgaon', coords: [23.7515, 90.4265] },
    { name: 'malibagh', coords: [23.7362, 90.4215] },
    { name: 'shantinagar', coords: [23.7373, 90.4153] },
    { name: 'paltan', coords: [23.7341, 90.4127] },
    { name: 'kawran bazar', coords: [23.7513, 90.3944] },
    { name: 'shahbag', coords: [23.7388, 90.3958] },
    { name: 'elephant road', coords: [23.7448, 90.3903] },
    
    // Other Cities
    { name: 'coxs bazar', coords: [21.4272, 92.0058] },
    { name: 'cox\'s bazar', coords: [21.4272, 92.0058] },
    { name: 'cox', coords: [21.4272, 92.0058] },
    { name: 'chittagong', coords: [22.3569, 91.7832] },
    { name: 'chattogram', coords: [22.3569, 91.7832] },
    { name: 'sylhet', coords: [24.8949, 91.8687] },
    { name: 'rajshahi', coords: [24.3745, 88.6042] },
    { name: 'khulna', coords: [22.8456, 89.5403] },
    { name: 'barishal', coords: [22.7010, 90.3535] },
    { name: 'barisal', coords: [22.7010, 90.3535] },
    { name: 'rangpur', coords: [25.7439, 89.2752] },
    { name: 'mymensingh', coords: [24.7471, 90.4203] },
    { name: 'gazipur', coords: [23.9999, 90.4203] },
    { name: 'narayanganj', coords: [23.6238, 90.5000] },
    
    // Dhaka (General - Check LAST)
    { name: 'dhaka', coords: [23.8103, 90.4125] },
  ];

  const getCoordinates = (location, propertyId, index) => {
    const locationLower = location.toLowerCase();
    
    // Check each location in order (most specific first)
    for (const { name, coords } of locationCoordinates) {
      if (locationLower.includes(name)) {
        const hash = propertyId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        // Much smaller offset: ±0.002 degrees ≈ ±200 meters
        const offsetLat = ((hash % 40) / 10000) - 0.002;
        const offsetLng = ((index % 40) / 10000) - 0.002;
        return [coords[0] + offsetLat, coords[1] + offsetLng];
      }
    }
    
    // Default to Dhaka center
    const hash = propertyId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const offsetLat = ((hash % 40) / 10000) - 0.002;
    const offsetLng = ((index % 40) / 10000) - 0.002;
    return [bangladeshCenter[0] + offsetLat, bangladeshCenter[1] + offsetLng];
  };

  const propertiesWithCoords = useMemo(() => {
    return properties.map((property, index) => ({
      ...property,
      coordinates: getCoordinates(property.location || '', property._id, index),
    }));
  }, [properties]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <FaMapMarkedAlt className="mx-auto text-6xl text-green-500 animate-pulse mb-4" />
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-4 left-4 z-[1000]"
      >
        <Card className="p-4 bg-white/95 backdrop-blur shadow-xl rounded-2xl">
          <div className="flex items-center gap-3 mb-2">
            <FaMapMarkedAlt className="text-2xl text-green-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Property Map</h2>
              <p className="text-sm text-gray-600">{properties.length} properties</p>
            </div>
          </div>
          <Link to="/all-properties">
            <Button variant="outline" size="sm" className="w-full mt-2">
              List View
            </Button>
          </Link>
        </Card>
      </motion.div>

      {selectedProperty && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="absolute top-4 right-4 z-[1000] w-80"
        >
          <Card className="overflow-hidden bg-white shadow-xl rounded-2xl">
            <img
              src={selectedProperty.imageUrl || '/staticassets/swiper1.jpg'}
              alt={selectedProperty.propertyName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <Badge className="mb-2 bg-green-500 text-white">
                {selectedProperty.category}
              </Badge>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {selectedProperty.propertyName}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedProperty.location}
              </p>
              <p className="text-xl font-bold text-green-600 mb-4">
                ৳{parseInt(selectedProperty.price || 0).toLocaleString()}
                {selectedProperty.priceUnit ? ` / ${selectedProperty.priceUnit}` : ''}
              </p>
              <div className="flex gap-2">
                <Link to={`/property/${selectedProperty._id}`} className="flex-1">
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    View Details
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setSelectedProperty(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <MapContainer
        center={bangladeshCenter}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {propertiesWithCoords.map((property) => (
          <Marker
            key={property._id}
            position={property.coordinates}
            eventHandlers={{
              click: () => setSelectedProperty(property),
            }}
          >
            <Popup>
              <div className="text-center">
                <p className="font-bold text-sm">{property.propertyName}</p>
                <p className="text-xs text-gray-600">{property.location}</p>
                <p className="text-green-600 font-semibold text-sm mt-1">
                  ৳{parseInt(property.price || 0).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;

