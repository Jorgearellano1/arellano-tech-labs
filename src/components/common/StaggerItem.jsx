import { motion as Motion, useReducedMotion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const StaggerItem = ({ children, className = '', index = 0, style, ...rest }) => {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style} {...rest}>
        {children}
      </div>
    );
  }
  return (
    <Motion.div
      className={className}
      style={style}
      variants={itemVariants}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      {...rest}
    >
      {children}
    </Motion.div>
  );
};

export default StaggerItem;
