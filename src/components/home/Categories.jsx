import { Link } from 'react-router';
import { FaBuilding, FaHome, FaStore, FaTree, FaWarehouse, FaHotel } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Categories = () => {
  const categories = [
    {
      icon: <FaHome className="text-4xl" />,
      title: 'Apartments',
      description: 'Modern flats & apartments for comfortable urban living',
      count: '500+ listings',
      color: 'bg-blue-500',
      hoverColor: 'group-hover:bg-blue-600',
      link: '/all-properties?category=Apartment',
    },
    {
      icon: <FaTree className="text-4xl" />,
      title: 'Land & Plots',
      description: 'Residential and commercial plots across Bangladesh',
      count: '300+ listings',
      color: 'bg-green-500',
      hoverColor: 'group-hover:bg-green-600',
      link: '/all-properties?category=Land/Plot',
    },
    {
      icon: <FaStore className="text-4xl" />,
      title: 'Commercial',
      description: 'Office spaces, shops, and business properties',
      count: '200+ listings',
      color: 'bg-purple-500',
      hoverColor: 'group-hover:bg-purple-600',
      link: '/all-properties?category=Commercial',
    },
    {
      icon: <FaBuilding className="text-4xl" />,
      title: 'Buildings',
      description: 'Full buildings for investment and development',
      count: '100+ listings',
      color: 'bg-orange-500',
      hoverColor: 'group-hover:bg-orange-600',
      link: '/all-properties',
    },
    {
      icon: <FaWarehouse className="text-4xl" />,
      title: 'Warehouses',
      description: 'Storage and industrial spaces for businesses',
      count: '50+ listings',
      color: 'bg-rose-500',
      hoverColor: 'group-hover:bg-rose-600',
      link: '/all-properties',
    },
    {
      icon: <FaHotel className="text-4xl" />,
      title: 'Guest Houses',
      description: 'Hotels and guest accommodations for travelers',
      count: '75+ listings',
      color: 'bg-teal-500',
      hoverColor: 'group-hover:bg-teal-600',
      link: '/all-properties',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Find the perfect property type that matches your needs
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                to={category.link}
                className="group block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800"
              >
                <div className="flex items-start gap-4">
                  <div className={`${category.color} ${category.hoverColor} text-white p-4 rounded-xl transition-colors duration-300`}>
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {category.description}
                    </p>
                    <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
