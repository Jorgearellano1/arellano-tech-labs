import { useState, useEffect, useRef } from 'react';
import './AnimatedParallax.css';

const AnimatedParallax = () => {
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Create multiple layers with different speeds
    const layers = [
        { id: 1, speed: 0.5, size: 400, color: '#3b82f6', blur: 100, opacity: 0.15 },
        { id: 2, speed: 0.3, size: 300, color: '#a78bfa', blur: 80, opacity: 0.12 },
        { id: 3, speed: 0.7, size: 350, color: '#ec4899', blur: 90, opacity: 0.1 },
        { id: 4, speed: 0.4, size: 250, color: '#06b6d4', blur: 70, opacity: 0.13 },
        { id: 5, speed: 0.6, size: 320, color: '#8b5cf6', blur: 85, opacity: 0.11 },
    ];

    return (
        <div className="animated-parallax" ref={containerRef}>
            {layers.map((layer) => {
                const translateY = scrollY * layer.speed;
                const rotate = scrollY * 0.1 * (layer.id % 2 === 0 ? 1 : -1);
                const scale = 1 + (scrollY * 0.0001);

                return (
                    <div
                        key={layer.id}
                        className="parallax-layer"
                        style={{
                            transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                            width: `${layer.size}px`,
                            height: `${layer.size}px`,
                            background: layer.color,
                            filter: `blur(${layer.blur}px)`,
                            opacity: layer.opacity,
                            left: `${(layer.id * 20) % 80}%`,
                            top: `${(layer.id * 15) % 100}vh`,
                        }}
                    />
                );
            })}

            {/* Animated geometric shapes */}
            <div className="parallax-shapes">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`shape-${i}`}
                        className={`parallax-shape shape-${i % 3}`}
                        style={{
                            transform: `translateY(${scrollY * (0.2 + i * 0.1)}px) rotate(${scrollY * 0.05 * (i % 2 === 0 ? 1 : -1)}deg)`,
                            left: `${(i * 12) % 90}%`,
                            top: `${(i * 20) % 120}vh`,
                            animationDelay: `${i * 0.5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Floating particles */}
            <div className="parallax-particles">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={`particle-${i}`}
                        className="particle"
                        style={{
                            transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`,
                            left: `${(i * 5) % 100}%`,
                            top: `${(i * 8) % 150}vh`,
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: `${3 + (i % 4)}s`,
                        }}
                    />
                ))}
            </div>

            {/* Gradient overlay */}
            <div className="parallax-gradient" style={{
                opacity: Math.min(scrollY / 1000, 0.3)
            }} />
        </div>
    );
};

export default AnimatedParallax;
