import { useEffect, useRef } from 'react';
import useSyncedTheme from '../../hooks/useSyncedTheme';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/**
 * Video de fondo del hero. Generado con scripts/make-hero-video.py.
 * - Se pausa cuando el hero sale de pantalla (no gasta CPU al hacer scroll).
 * - Con "reducir movimiento" muestra solo el poster.
 */
const HeroVideo = () => {
    const theme = useSyncedTheme();
    const reduce = usePrefersReducedMotion();
    const ref = useRef(null);
    const src = `/video/hero-${theme}.mp4`;
    const poster = `/video/hero-${theme}.webp`;

    useEffect(() => {
        const el = ref.current;
        if (!el || reduce || !('IntersectionObserver' in window)) return undefined;
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) el.play().catch(() => {});
            else el.pause();
        }, { threshold: 0.05 });
        io.observe(el);
        return () => io.disconnect();
    }, [reduce, theme]);

    if (reduce) {
        return <img className="hero-video" src={poster} alt="" aria-hidden decoding="async" />;
    }

    return (
        <video
            key={theme}
            ref={ref}
            className="hero-video"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-hidden
            tabIndex={-1}
        />
    );
};

export default HeroVideo;
