import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../api/axios';
import { FaHome, FaUsers, FaMapMarkerAlt, FaStar, FaBuilding, FaHandshake } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Statistics = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { data: properties = [] } = useQuery({
    queryKey: ['allPropertiesCount'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/properties');
      return data;
    },
  });

  const stats = [
    {
      icon: <FaHome className="text-4xl" />,
      value: properties.length || 150,
      suffix: '+',
      label: 'Properties Listed',
      color: 'from-green-400 to-emerald-600',
    },
    {
      icon: <FaUsers className="text-4xl" />,
      value: 5000,
      suffix: '+',
      label: 'Happy Customers',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl" />,
      value: 64,
      suffix: '',
      label: 'Districts Covered',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: <FaStar className="text-4xl" />,
      value: 4.9,
      suffix: '',
      label: 'Average Rating',
      decimals: 1,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: <FaBuilding className="text-4xl" />,
      value: 120,
      suffix: '+',
      label: 'Verified Agents',
      color: 'from-rose-400 to-rose-600',
    },
    {
      icon: <FaHandshake className="text-4xl" />,
      value: 2500,
      suffix: '+',
      label: 'Successful Deals',
      color: 'from-teal-400 to-teal-600',
    },
  ];

  return (
    <section className="py-20 bg-gray-900 dark:bg-gray-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Our Impact in Numbers</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trusted by thousands of property seekers and owners across Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {inView ? (
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
