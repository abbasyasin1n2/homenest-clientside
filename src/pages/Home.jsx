import HeroSlider from '../components/home/HeroSlider';
import FeaturedProperties from '../components/home/FeaturedProperties';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HowItWorks from '../components/home/HowItWorks';
import OurTeam from '../components/home/OurTeam';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <FeaturedProperties />
      <WhyChooseUs />
      <HowItWorks />
      <OurTeam />
      <Testimonials />
    </div>
  );
};

export default Home;

