import { Card, CardContent } from '@/components/ui/card';
import { FaUserFriends, FaSearch, FaHeadset, FaDollarSign, FaFileContract, FaRocket } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUserFriends className="text-4xl" />,
      title: 'User Friendly',
      description: 'Our platform is designed with simplicity in mind, making it easy for anyone to find, list, or manage properties without any technical expertise.',
    },
    {
      icon: <FaSearch className="text-4xl" />,
      title: 'Quick Search',
      description: 'Powerful search filters help you find exactly what you\'re looking for - by location, price, category, or property type in seconds.',
    },
    {
      icon: <FaHeadset className="text-4xl" />,
      title: 'Live Support',
      description: 'Our dedicated support team is available to assist you with any questions or concerns, ensuring a smooth experience throughout your property journey.',
    },
    {
      icon: <FaDollarSign className="text-4xl" />,
      title: 'Embrace Your Budget',
      description: 'Find properties that match your budget perfectly. We offer options across all price ranges, from affordable rentals to premium investments.',
    },
    {
      icon: <FaFileContract className="text-4xl" />,
      title: 'No Hidden Rules',
      description: 'Transparent pricing and clear terms. No hidden fees, no surprises - just honest, straightforward property listings you can trust.',
    },
    {
      icon: <FaRocket className="text-4xl" />,
      title: 'Rapid Delivery',
      description: 'Get instant access to property details, contact information, and listings. Fast, efficient service from search to closing.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Let's discover the best places to living more relax. We make property hunting simple, fast, and reliable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-4 rounded-full mb-4 text-green-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

