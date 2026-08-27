import { useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import useSyncedTheme from '../../hooks/useSyncedTheme';

/** Debe ser estable durante toda la vida de la app (lo exige ParticlesProvider). */
const initEngine = async (engine) => { await loadSlim(engine); };

/**
 * Campo de partículas del hero (tsparticles): profundidad con parallax al mouse,
 * enlaces finos entre puntos y respeto a prefers-reduced-motion.
 */
const HeroParticles = () => {
    const theme = useSyncedTheme();

    const options = useMemo(() => ({
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        detectRetina: true,
        motion: { reduce: { value: true, factor: 4 } },
        particles: {
            number: { value: 70, density: { enable: true, width: 1440, height: 900 } },
            color: { value: theme === 'dark' ? ['#E8B547', '#F5C3D8', '#5EEAD4'] : ['#E8B547', '#D96998', '#4C6FC7'] },
            opacity: { value: { min: 0.25, max: 0.7 } },
            size: { value: { min: 1, max: 3 } },
            links: {
                enable: true,
                distance: 140,
                color: theme === 'dark' ? '#9fb3d9' : '#3d5daf',
                opacity: theme === 'dark' ? 0.16 : 0.12,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.55,
                direction: 'none',
                random: true,
                straight: false,
                outModes: { default: 'out' }
            }
        },
        interactivity: {
            detectsOn: 'window',
            events: {
                onHover: { enable: true, mode: ['parallax', 'grab'], parallax: { enable: true, force: 40, smooth: 18 } },
                resize: { enable: true }
            },
            modes: {
                grab: { distance: 180, links: { opacity: 0.35 } }
            }
        }
    }), [theme]);

    return (
        <ParticlesProvider init={initEngine}>
            <Particles id="hero-particles" className="hero-particles" options={options} />
        </ParticlesProvider>
    );
};

export default HeroParticles;
