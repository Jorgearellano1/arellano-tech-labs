import { motion as Motion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <Motion.div
            className="scroll-progress-bar"
            style={{ scaleX }}
        />
    );
};

export default ScrollProgress;
