import { motion as Motion, useReducedMotion } from 'framer-motion';

const defaultTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

/**
 * Wraps section inner content for scroll-driven entrance (MotionSites-style).
 * Does not replace <section>; keep ids on the outer section for anchors.
 */
const SectionMotion = ({ children, className = '', delay = 0 }) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </Motion.div>
  );
};

export default SectionMotion;
