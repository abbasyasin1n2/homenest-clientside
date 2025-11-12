import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Card, CardContent } from '@/components/ui/card';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Director, ABC Media',
      image: '/staticassets/testimontial-person.jpg',
      rating: 5,
      text: 'HomeNest made finding our dream home so easy! The platform is user-friendly and the property listings are detailed and accurate. Highly recommended!',
    },
    {
      id: 2,
      name: 'Sarah Ahmed',
      role: 'Business Owner',
      image: '/staticassets/testimonial-person2.jpg',
      rating: 5,
      text: 'As a property owner, listing on HomeNest was seamless. I received inquiries within days and found the perfect tenant. Excellent service!',
    },
    {
      id: 3,
      name: 'Mohammad Rahman',
      role: 'Software Engineer',
      image: '/staticassets/testimontial-person.jpg',
      rating: 5,
      text: 'The search filters are amazing! I found exactly what I was looking for in Uttara. The property details were comprehensive and the process was smooth.',
    },
  ];

  return (
    <section className="py-16 bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: 'url(/staticassets/testimonial-background.jpg)' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Testimonial</h2>
          <p className="text-gray-200 text-lg">
            What our clients tell about us
          </p>
        </div>
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 1,
            },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl max-w-3xl mx-auto">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
                    />
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <Rating
                      style={{ maxWidth: 150 }}
                      value={testimonial.rating}
                      readOnly
                    />
                  </div>
                  
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="border-t border-gray-300 pt-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

