import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: '/staticassets/swiper1.jpg',
      title: 'Find Your Dream Home in Bangladesh',
      subtitle: 'Discover premium properties across Dhaka and beyond',
      description: 'Your trusted partner in finding the perfect property',
    },
    {
      id: 2,
      image: '/staticassets/swiper2.jpg',
      title: 'Premium Real Estate Solutions',
      subtitle: 'Buy, Rent, or Sell with Confidence',
      description: 'Connect with verified property owners and trusted agents',
    },
    {
      id: 3,
      image: '/staticassets/swiper3.png',
      title: 'Bangladesh\'s Leading Property Portal',
      subtitle: 'Thousands of Properties Waiting for You',
      description: 'From residential plots to commercial spaces, we have it all',
    },
  ];

  return (
    <div className="relative h-[600px] md:h-[700px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>
              
              {/* Content */}
              <div className="relative z-10 flex h-full items-center justify-center">
                <div className="container mx-auto px-4 text-center text-white">
                  <h1 className="mb-4 text-4xl font-bold md:text-6xl lg:text-7xl">
                    {slide.title}
                  </h1>
                  <p className="mb-6 text-xl md:text-2xl text-green-300">
                    {slide.subtitle}
                  </p>
                  <p className="mb-8 text-lg md:text-xl text-gray-200">
                    {slide.description}
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-green-500 hover:bg-green-600 text-lg px-8 py-6"
                    >
                      <Link to="/all-properties">
                        Explore Properties
                        <FaArrowRight className="ml-2" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white/10 bg-transparent text-lg px-8 py-6"
                    >
                      <Link to="/add-property" className="flex items-center justify-center gap-2">
                        List Your Property
                        <FaArrowRight />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;

