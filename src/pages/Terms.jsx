import { motion } from 'framer-motion';
import { FaFileContract, FaCheckCircle } from 'react-icons/fa';

const Terms = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using HomeNest ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services. These terms apply to all users of the platform, including property owners, buyers, renters, and visitors.`,
    },
    {
      title: '2. User Accounts',
      content: `To access certain features of HomeNest, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate, current, and complete information during registration and keep your account information updated.`,
    },
    {
      title: '3. Property Listings',
      content: `Property owners are solely responsible for the accuracy of their listings. HomeNest does not verify the authenticity of listings and acts only as a platform connecting property owners with potential buyers or renters. Users must conduct their own due diligence before entering into any property transactions.`,
    },
    {
      title: '4. Prohibited Activities',
      content: `Users must not: (a) post false or misleading information; (b) use the platform for illegal purposes; (c) attempt to gain unauthorized access to other users' accounts; (d) interfere with the platform's functionality; (e) post spam or promotional content unrelated to real estate; (f) violate any applicable laws or regulations.`,
    },
    {
      title: '5. Intellectual Property',
      content: `All content on HomeNest, including logos, designs, text, and graphics, is protected by intellectual property rights. Users retain ownership of content they post but grant HomeNest a non-exclusive license to use, display, and distribute such content on the platform.`,
    },
    {
      title: '6. Limitation of Liability',
      content: `HomeNest is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform. We do not guarantee the accuracy of property listings or the conduct of other users. All property transactions are conducted at your own risk.`,
    },
    {
      title: '7. Dispute Resolution',
      content: `Any disputes between users regarding property transactions must be resolved directly between the parties involved. HomeNest may, at its discretion, provide mediation services but is not obligated to do so. For disputes with HomeNest, users agree to attempt resolution through negotiation before pursuing legal action.`,
    },
    {
      title: '8. Termination',
      content: `HomeNest reserves the right to suspend or terminate user accounts that violate these terms or engage in fraudulent activity. Upon termination, your right to use the platform will immediately cease, and any content you have posted may be removed.`,
    },
    {
      title: '9. Modifications to Terms',
      content: `HomeNest may modify these terms at any time. Users will be notified of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the modified terms.`,
    },
    {
      title: '10. Governing Law',
      content: `These terms are governed by the laws of Bangladesh. Any legal proceedings arising from these terms will be conducted in the courts of Dhaka, Bangladesh.`,
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <FaFileContract className="text-green-500 text-3xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: January 2026
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Welcome to HomeNest. These Terms and Conditions govern your use of our real estate 
              platform and services. Please read them carefully before using our website. By using 
              HomeNest, you acknowledge that you have read, understood, and agree to be bound by 
              these terms.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                  <FaCheckCircle className="text-green-500" />
                  {section.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 mt-8 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              If you have any questions about these Terms & Conditions, please contact us at{' '}
              <a href="mailto:legal@homenest.com" className="text-green-600 dark:text-green-400 font-semibold hover:underline">
                legal@homenest.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
