import HeroSlider from '../components/home/HeroSlider';
import FeaturedProperties from '../components/home/FeaturedProperties';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HowItWorks from '../components/home/HowItWorks';
import OurTeam from '../components/home/OurTeam';
import Testimonials from '../components/home/Testimonials';
import Statistics from '../components/home/Statistics';
import Categories from '../components/home/Categories';
import Newsletter from '../components/home/Newsletter';
import FAQ from '../components/home/FAQ';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Slider */}
      <HeroSlider />
      
      {/* 2. Statistics Counter */}
      <Statistics />
      
      {/* 3. Featured Properties */}
      <FeaturedProperties />
      
      {/* 4. Categories */}
      <Categories />
      
      {/* 5. Why Choose Us */}
      <WhyChooseUs />
      
      {/* 6. How It Works */}
      <HowItWorks />
      
      {/* 7. Our Team */}
      <OurTeam />
      
      {/* 8. Testimonials */}
      <Testimonials />
      
      {/* 9. FAQ */}
      <FAQ />
      
      {/* 10. Call to Action */}
      <CallToAction />
      
      {/* 11. Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;

