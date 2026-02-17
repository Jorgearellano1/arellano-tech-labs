import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import './AnimatedCounter.css';

const AnimatedCounter = ({
    end,
    prefix = '',
    suffix = '',
    duration = 2.5,
    decimals = 0,
    className = ''
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <span ref={counterRef} className={`animated-counter ${className}`}>
            {isVisible ? (
                <CountUp
                    end={end}
                    duration={duration}
                    prefix={prefix}
                    suffix={suffix}
                    decimals={decimals}
                    useEasing={true}
                    easingFn={(t, b, c, d) => {
                        // easeOutExpo
                        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
                    }}
                />
            ) : (
                `${prefix}0${suffix}`
            )}
        </span>
    );
};

export default AnimatedCounter;
