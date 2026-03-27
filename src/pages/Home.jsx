import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import WhyUs from '../components/sections/WhyUs';
import Process from '../components/sections/Process';
import FeaturedProjects from '../components/sections/FeaturedProjects';
// import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import CTASection from '../components/sections/CTASection';

/** Puente visual (blur) entre bloques de la home — continuidad sin cortar la lectura */
const SectionBridge = ({ variant = '' }) => (
    <div className={`section-bridge${variant ? ` ${variant}` : ''}`} role="presentation" />
);

const Home = () => {
    return (
        <div className="home-page-flow">
            <Hero />
            <SectionBridge variant="section-bridge--after-hero" />
            <Services />
            <SectionBridge />
            <WhyUs />
            <SectionBridge />
            <Process />
            <SectionBridge />
            <FeaturedProjects />
            <SectionBridge />
            {/* <Testimonials /> */}
            <FAQ />
            <SectionBridge />
            <CTASection />
        </div>
    );
};

export default Home;
