import { FaMapMarkerAlt, FaClipboardCheck, FaCalendarCheck } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      number: '1st',
      icon: <FaMapMarkerAlt className="text-5xl" />,
      title: 'Find Interesting Place',
      description: 'Browse through thousands of properties across Bangladesh. Use our advanced filters to find the perfect location that matches your needs.',
    },
    {
      number: '2nd',
      icon: <FaClipboardCheck className="text-5xl" />,
      title: 'Check Reviews',
      description: 'Read authentic reviews and ratings from previous tenants and buyers. View detailed property information, photos, and amenities.',
    },
    {
      number: '3rd',
      icon: <FaCalendarCheck className="text-5xl" />,
      title: 'Make a Reservation',
      description: 'Contact property owners directly or schedule a viewing. Complete your transaction with confidence and peace of mind.',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">How It Works Step by Step</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Follow this track, grow up your business asset with the field. Simple steps to find your perfect property.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center flex-1 max-w-xs md:max-w-none">
              <div className="flex flex-col items-center flex-1">
                {/* Step Circle */}
                <div className="relative mb-6">
                  <div className="bg-white dark:bg-gray-700 rounded-full p-6 shadow-lg border-4 border-green-100 dark:border-green-900/30">
                    <div className="text-green-500 dark:text-green-400 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                    {step.number}
                  </div>
                </div>
                
                {/* Step Content */}
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {/* Arrow (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center mx-4">
                  <div className="text-green-500 text-4xl font-bold">→</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

