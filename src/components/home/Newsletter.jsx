import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaPaperPlane, FaEnvelope, FaCheck } from 'react-icons/fa';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setEmail('');
    toast.success('Thank you for subscribing to our newsletter!');
    setIsSubmitting(false);

    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <FaEnvelope className="text-white text-2xl" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Latest Properties
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Subscribe to our newsletter and be the first to know about new listings, 
            market trends, and exclusive deals in Bangladesh real estate.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="relative flex-1">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14 rounded-xl bg-white border-0 text-gray-800 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-white"
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || isSubscribed}
              className={`h-14 px-8 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isSubscribed 
                  ? 'bg-white text-green-600' 
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Subscribing...
                </span>
              ) : isSubscribed ? (
                <span className="flex items-center gap-2">
                  <FaCheck /> Subscribed!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FaPaperPlane /> Subscribe
                </span>
              )}
            </Button>
          </form>

          <p className="text-green-100/70 text-sm mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
