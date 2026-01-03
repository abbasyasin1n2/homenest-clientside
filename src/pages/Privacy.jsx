import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaUserShield, FaDatabase, FaCookie, FaEnvelope } from 'react-icons/fa';

const Privacy = () => {
  const sections = [
    {
      icon: <FaDatabase className="text-2xl" />,
      title: 'Information We Collect',
      content: `We collect information you provide directly, including: name, email address, phone number, and profile information when you create an account. For property owners, we also collect property details, photos, and location information. We automatically collect usage data, device information, and cookies when you use our platform.`,
    },
    {
      icon: <FaUserShield className="text-2xl" />,
      title: 'How We Use Your Information',
      content: `We use your information to: provide and improve our services, process property listings and inquiries, communicate with you about your account and transactions, send newsletters and promotional content (with your consent), analyze platform usage to improve user experience, and ensure the security of our platform.`,
    },
    {
      icon: <FaLock className="text-2xl" />,
      title: 'Information Sharing',
      content: `We share your information only when necessary: with other users as part of property transactions (e.g., contact information shared with property owners when you send an inquiry), with service providers who help us operate the platform, when required by law or to protect our legal rights. We never sell your personal information to third parties.`,
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: 'Data Security',
      content: `We implement industry-standard security measures to protect your data, including SSL encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      icon: <FaCookie className="text-2xl" />,
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze platform usage. You can control cookie settings through your browser, but disabling cookies may affect some features of our platform.`,
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: 'Your Rights',
      content: `You have the right to: access your personal data, correct inaccurate information, delete your account and associated data, opt-out of marketing communications, and request a copy of your data. To exercise these rights, please contact us at privacy@homenest.com.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <FaShieldAlt className="text-blue-500 text-3xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: January 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              At HomeNest, we are committed to protecting your privacy and ensuring the security 
              of your personal information. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our real estate platform. 
              By using HomeNest, you consent to the practices described in this policy.
            </p>
          </div>

          {/* Privacy Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-xl">
                    {section.icon}
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              HomeNest is not intended for use by individuals under the age of 18. We do not 
              knowingly collect personal information from children. If you believe we have 
              collected information from a minor, please contact us immediately.
            </p>

            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any 
              significant changes by posting the new policy on this page and updating the 
              "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mt-8 text-center">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
              Questions About Our Privacy Policy?
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Contact our privacy team at{' '}
              <a href="mailto:privacy@homenest.com" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                privacy@homenest.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
