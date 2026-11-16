import { createContext, useContext, useEffect, useRef } from 'react';
import { motion as Motion, useMotionValue, useSpring, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const Ctx = createContext(null);

/** Escena con parallax: las capas (<Layer>) se mueven según el cursor y el scroll, cada una a su profundidad. */
export function ParallaxScene({ children, className = '', ...rest }) {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
    const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

    useEffect(() => {
        if (reduce || !window.matchMedia('(pointer: fine)').matches) return undefined;
        const on = (e) => {
            mx.set(e.clientX / window.innerWidth - 0.5);
            my.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener('pointermove', on, { passive: true });
        return () => window.removeEventListener('pointermove', on);
    }, [reduce, mx, my]);

    return (
        <Ctx.Provider value={{ sx, sy, scrollYProgress, reduce }}>
            <div ref={ref} className={className} {...rest}>{children}</div>
        </Ctx.Provider>
    );
}

export function Layer({ depth = 0.3, travel = 110, className = '', children, ...rest }) {
    const { sx, sy, scrollYProgress, reduce } = useContext(Ctx);
    const x = useTransform(sx, (v) => v * depth * 30);
    const y = useTransform([sy, scrollYProgress], ([p, s]) => p * depth * 20 - (s - 0.5) * depth * travel);
    if (reduce) return <div className={className} {...rest}>{children}</div>;
    return <Motion.div className={className} style={{ x, y }} {...rest}>{children}</Motion.div>;
}
