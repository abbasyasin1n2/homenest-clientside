import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaQuestionCircle } from 'react-icons/fa';

const FAQ = () => {
  const faqs = [
    {
      question: 'How do I list my property on HomeNest?',
      answer: 'Simply create an account, click on "Add Property" in the navigation menu, fill in your property details including photos, description, price, and location. Once submitted, your listing will be live immediately for potential buyers or renters to see.',
    },
    {
      question: 'Is it free to list properties on HomeNest?',
      answer: 'Yes! Listing your property on HomeNest is completely free. We believe in making property listing accessible to everyone. You can list unlimited properties without any charges.',
    },
    {
      question: 'How can I contact a property owner?',
      answer: 'On each property detail page, you\'ll find a "Contact Owner" or "Send Inquiry" button. Fill in the inquiry form with your message, and we\'ll connect you directly with the property owner. You can also see the owner\'s contact information if they\'ve made it public.',
    },
    {
      question: 'What types of properties can I find on HomeNest?',
      answer: 'HomeNest features a wide variety of properties including apartments, land/plots, commercial spaces, buildings, warehouses, and guest houses. Whether you\'re looking to buy, rent, or invest, we have options across all 64 districts of Bangladesh.',
    },
    {
      question: 'How do I save properties I\'m interested in?',
      answer: 'Create a free account on HomeNest and use the "Add to Wishlist" feature on any property you like. You can access all your saved properties from the Wishlist page anytime. You can also compare up to 4 properties side by side using our comparison feature.',
    },
    {
      question: 'Are the property listings verified?',
      answer: 'We encourage all property owners to provide accurate and complete information. While we review listings for completeness, we recommend buyers and renters to personally verify property details and conduct due diligence before making any commitments.',
    },
    {
      question: 'Can I rate and review properties?',
      answer: 'Absolutely! After viewing a property, you can leave a rating (1-5 stars) and a detailed review sharing your experience. This helps other users make informed decisions and maintains quality on our platform.',
    },
    {
      question: 'How do I update or delete my property listing?',
      answer: 'Go to "My Properties" in your dashboard where you\'ll see all your listings. Click on the property you want to modify and choose "Edit" to update details or "Delete" to remove the listing entirely.',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <FaQuestionCircle className="text-green-500 text-3xl" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Got questions? We've got answers. Find everything you need to know about HomeNest.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl px-6 border border-gray-200 dark:border-gray-600 data-[state=open]:border-green-300 dark:data-[state=open]:border-green-700 transition-colors"
              >
                <AccordionTrigger className="text-left text-gray-800 dark:text-white font-semibold hover:text-green-600 dark:hover:text-green-400 py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
