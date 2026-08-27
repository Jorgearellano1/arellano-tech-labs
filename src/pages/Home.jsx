import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import DemoLab from '../components/lab/DemoLab';
import WhyUs from '../components/sections/WhyUs';
import Process from '../components/sections/Process';
import FeaturedProjects from '../components/sections/FeaturedProjects';
// import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import CTASection from '../components/sections/CTASection';

const Home = () => {
    return (
        <div className="home-page-flow">
            <Hero />
            <Services />
            <DemoLab />
            <WhyUs />
            <Process />
            <FeaturedProjects />
            {/* <Testimonials /> */}
            <FAQ />
            <CTASection />
        </div>
    );
};

export default Home;
