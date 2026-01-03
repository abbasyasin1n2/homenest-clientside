import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { FaHome, FaSearch, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Property Seekers */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 p-8 md:p-12 text-white"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <FaSearch className="text-3xl" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Looking for a Property?
              </h3>
              <p className="text-green-100 mb-6 leading-relaxed">
                Discover thousands of verified listings across Bangladesh. From cozy apartments in Dhaka to commercial spaces in Chittagong – find your perfect property today.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 font-semibold"
              >
                <Link to="/all-properties" className="flex items-center gap-2">
                  Explore Properties
                  <FaArrowRight />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* For Property Owners */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 text-white"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-2xl mb-6">
                <FaHome className="text-3xl text-green-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Want to List Your Property?
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Reach thousands of potential buyers and renters. List your property for free and connect with genuine prospects across Bangladesh.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold"
              >
                <Link to="/add-property" className="flex items-center gap-2">
                  List Your Property
                  <FaArrowRight />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
