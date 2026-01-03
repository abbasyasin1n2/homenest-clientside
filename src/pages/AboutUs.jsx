import { 
  FaHome, 
  FaSearch, 
  FaHandshake, 
  FaShieldAlt, 
  FaMapMarkerAlt, 
  FaChartLine,
  FaUsers,
  FaBuilding,
  FaStar,
  FaHeart,
  FaLightbulb,
  FaRocket,
  FaCheckCircle,
  FaQuoteLeft
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const AboutUs = () => {
  const stats = [
    { icon: <FaBuilding />, value: '10,000+', label: 'Properties Listed' },
    { icon: <FaUsers />, value: '50,000+', label: 'Happy Customers' },
    { icon: <FaMapMarkerAlt />, value: '64', label: 'Districts Covered' },
    { icon: <FaStar />, value: '4.9', label: 'Average Rating' },
  ];

  const values = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: 'Trust & Transparency',
      description: 'Every listing is verified. No hidden fees, no surprises. We believe in building lasting relationships through complete honesty.',
      color: 'bg-green-500',
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: 'Innovation First',
      description: 'Leveraging cutting-edge technology to make property hunting seamless. From smart search to virtual tours, we lead with innovation.',
      color: 'bg-blue-500',
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: 'Customer Obsessed',
      description: 'Your dream home is our mission. We go above and beyond to ensure every user finds exactly what they are looking for.',
      color: 'bg-rose-500',
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: 'Community Driven',
      description: 'Built by the community, for the community. We connect property owners with genuine buyers and renters across Bangladesh.',
      color: 'bg-purple-500',
    },
  ];

  const features = [
    { icon: <FaSearch />, text: 'Advanced Search & Filters' },
    { icon: <FaMapMarkerAlt />, text: 'Interactive Map View' },
    { icon: <FaChartLine />, text: 'Property Comparison' },
    { icon: <FaStar />, text: 'Verified Reviews & Ratings' },
    { icon: <FaHeart />, text: 'Personalized Wishlist' },
    { icon: <FaShieldAlt />, text: 'Secure Transactions' },
  ];

  const testimonials = [
    {
      quote: "HomeNest made finding my family's dream apartment so easy. The search filters and map view helped us narrow down the perfect location in Dhaka.",
      author: "Fatima Rahman",
      role: "Homeowner",
      avatar: "FR"
    },
    {
      quote: "As a property owner, listing my properties on HomeNest has been seamless. The platform brings genuine buyers and the support team is fantastic.",
      author: "Karim Ahmed",
      role: "Property Investor",
      avatar: "KA"
    },
    {
      quote: "The comparison feature is a game-changer! I could compare multiple properties side by side and make an informed decision quickly.",
      author: "Nadia Islam",
      role: "First-time Buyer",
      avatar: "NI"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-3 bg-green-500/10 dark:bg-green-500/20 px-6 py-3 rounded-full mb-8"
            >
              <FaHome className="text-green-500 text-2xl" />
              <span className="text-green-600 dark:text-green-400 font-semibold text-lg">About HomeNest</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
              Helping You Find the 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600"> Perfect Place</span> to Call Home
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              HomeNest is Bangladesh's premier real estate platform, connecting property seekers with their dream homes. 
              Whether you're buying, renting, or selling, we make the journey simple, transparent, and rewarding.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-lg px-8 py-6">
                <Link to="/all-properties">
                  <FaSearch className="mr-2" />
                  Explore Properties
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-500/10">
                <Link to="/add-property">
                  <FaBuilding className="mr-2" />
                  List Your Property
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="text-center text-white"
              >
                <div className="text-4xl mb-3 flex justify-center opacity-80">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-green-100 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-green-500 font-semibold text-lg mb-2 block">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                Redefining Real Estate in Bangladesh
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  HomeNest was born from a simple idea: finding a home should not be stressful. 
                  We saw how fragmented and confusing the property market in Bangladesh could be, 
                  and we knew technology could make it better.
                </p>
                <p>
                  Today, HomeNest stands as a comprehensive platform where property owners can 
                  showcase their listings to thousands of potential buyers and renters. Our 
                  intuitive search, interactive maps, and verified reviews make property hunting 
                  a delightful experience.
                </p>
                <p>
                  From cozy apartments in Dhaka to commercial spaces in Chittagong, from 
                  residential plots in Sylhet to vacation properties in Cox's Bazar – HomeNest 
                  covers all 64 districts, bringing the entire Bangladesh real estate market to 
                  your fingertips.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/staticassets/swiper2.jpg" 
                  alt="HomeNest - Real Estate Platform" 
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex-1">
                      <div className="text-2xl font-bold text-green-600">100%</div>
                      <div className="text-sm text-gray-600">Verified Listings</div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 flex-1">
                      <div className="text-2xl font-bold text-green-600">24/7</div>
                      <div className="text-sm text-gray-600">Support Available</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold">
                Est. 2024
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-500 font-semibold text-lg mb-2 block">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do at HomeNest, from how we build our platform to how we serve our community.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 overflow-hidden group">
                  <CardContent className="p-6 text-center">
                    <div className={`${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white transform group-hover:scale-110 transition-transform duration-300`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl flex items-center gap-3 hover:shadow-md transition-shadow"
                  >
                    <div className="text-green-500 text-xl">{feature.icon}</div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-green-500 font-semibold text-lg mb-2 block">Why HomeNest</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                A Platform Built for You
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                HomeNest is packed with features designed to make your property journey effortless. 
                Our modern tech stack ensures a fast, reliable, and secure experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong className="text-gray-800 dark:text-white">Smart Search:</strong> Find properties using advanced filters including price, location, property type, and more.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong className="text-gray-800 dark:text-white">Interactive Maps:</strong> Visualize properties on our integrated map view to explore neighborhoods.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong className="text-gray-800 dark:text-white">Compare & Decide:</strong> Use our comparison tool to evaluate multiple properties side by side.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-green-500 font-semibold text-lg mb-2 block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Thousands of happy customers have found their perfect properties through HomeNest.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <FaQuoteLeft className="text-green-500/30 text-4xl mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 dark:text-white">{testimonial.author}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
              <FaRocket className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              To democratize real estate in Bangladesh by providing a transparent, 
              technology-driven platform where everyone can find their perfect property. 
              We strive to eliminate the complexity and stress from property transactions, 
              making homeownership accessible to all.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-lg px-8">
                <Link to="/all-properties">
                  Start Exploring
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 border-gray-300 dark:border-gray-600">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of happy homeowners who found their perfect property with HomeNest.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-green-600 hover:bg-green-50 text-lg px-10 py-6 font-semibold shadow-lg"
            >
              <Link to="/all-properties">
                <FaSearch className="mr-2" />
                Browse Properties Now
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
