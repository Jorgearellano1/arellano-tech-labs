import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import './ParticleBackground.css';

const ParticleBackground = ({ theme = 'dark' }) => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const options = {
        background: {
            color: {
                value: 'transparent',
            },
        },
        fpsLimit: 60, // Reduced from 120 for better performance
        interactivity: {
            events: {
                onClick: {
                    enable: false, // Disabled for performance
                },
                onHover: {
                    enable: true,
                    mode: 'grab',
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 120,
                    links: {
                        opacity: 0.4,
                    },
                },
            },
        },
        particles: {
            color: {
                value: theme === 'dark' ? '#00d9ff' : '#3b82f6',
            },
            links: {
                color: theme === 'dark' ? '#00d9ff' : '#3b82f6',
                distance: 150,
                enable: true,
                opacity: 0.2, // Reduced opacity
                width: 1,
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: {
                    default: 'bounce',
                },
                random: false,
                speed: 0.5, // Slower for smoother performance
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 1000,
                },
                value: 40, // Reduced from 80 for better performance
            },
            opacity: {
                value: 0.4, // Reduced opacity
            },
            shape: {
                type: 'circle',
            },
            size: {
                value: { min: 1, max: 2 }, // Smaller particles
            },
        },
        detectRetina: true,
    };

    return (
        <Particles
            className="particle-background"
            init={particlesInit}
            options={options}
        />
    );
};

export default ParticleBackground;
