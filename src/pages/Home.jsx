import Hero from '../components/sections/Hero';
import ClientLogos from '../components/sections/ClientLogos';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import AnimationSection from '../components/sections/AnimationSection';
import DemoLab from '../components/lab/DemoLab';
import Services from '../components/sections/Services';
// import WhyUs from '../components/sections/WhyUs';        // oculto en el rediseño 2026 (reactivar con una línea)
import Process from '../components/sections/Process';
// import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import CTASection from '../components/sections/CTASection';

const Home = () => {
    return (
        <div className="home-page-flow">
            <Hero />
            <ClientLogos />
            <FeaturedProjects />
            <AnimationSection />
            <DemoLab />
            <Services />
            {/* <WhyUs /> */}
            <Process />
            {/* <Testimonials /> */}
            <FAQ />
            <CTASection />
        </div>
    );
};

export default Home;
