import Hero from '../components/sections/Hero';
import ClientLogos from '../components/sections/ClientLogos';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import AnimationSection from '../components/sections/AnimationSection';
import Outro from '../components/sections/Outro';
// Fuera de la home (se conservan los componentes; reactivar con una línea):
// import DemoLab from '../components/lab/DemoLab';
// import Services from '../components/sections/Services';
// import Process from '../components/sections/Process';
// import FAQ from '../components/sections/FAQ';
// import WordMarquee from '../components/sections/WordMarquee';

const Home = () => (
    <div className="home-page-flow">
        <Hero />
        <div className="hm-body">
            <ClientLogos />
            <FeaturedProjects />
            <AnimationSection />
            <Outro />
        </div>
    </div>
);

export default Home;
