import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './VantaNetBackground.css';

function colorBrightness(hex) {
  const c = new THREE.Color(hex);
  return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
}

/**
 * Vanta NET usa AdditiveBlending cuando brillo(color) > brillo(fondo). Sobre un
 * clear color claro, eso SUMA luz y las aristas se ven blancas. En light forzamos
 * siempre la rama "subtractive" (mezcla normal: fondo → color).
 */
function syncNetLineBlending(effect, theme) {
  if (!effect?.linesMesh?.material) return;
  const opts = effect.options;
  if (theme === 'light') {
    effect.blending = 'subtractive';
    effect.linesMesh.material.blending = THREE.NormalBlending;
  } else {
    const cb = colorBrightness(opts.color);
    const bb = colorBrightness(opts.backgroundColor);
    effect.blending = cb > bb ? 'additive' : 'subtractive';
    effect.linesMesh.material.blending =
      effect.blending === 'additive' ? THREE.AdditiveBlending : THREE.NormalBlending;
  }
  effect.linesMesh.material.needsUpdate = true;
}

const shared = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1.1,
  mouseCoeffX: 0.85,
  mouseCoeffY: 0.45,
};

/** @see https://www.vantajs.com/?effect=net */
const lightOpts = {
  ...shared,
  /* Móvil light: scaleMobile alto = menos píxeles (rendimiento). */
  scaleMobile: 2.2,
  /* Rosa legible; el blanco venía del AdditiveBlending (ver syncNetLineBlending) */
  color: 0xe07a9e,
  backgroundColor: 0xe8edf7,
  points: 10,
  maxDistance: 12,
  spacing: 14,
  showDots: true,
  speed: 0.5,
};

const darkOpts = {
  ...shared,
  /**
   * Solo móvil: Vanta usa `scaleMobile` en pantallas chicas (no toca `scale` del escritorio).
   * Valores altos bajan el devicePixelRatio del canvas y la red se ve “abultada”.
   * En oscuro bajamos scaleMobile; en claro se mantiene 2.2 por rendimiento.
   */
  scaleMobile: 1.22,
  color: 0xe8b547,
  backgroundColor: 0x060b14,
  points: 9,
  maxDistance: 20,
  spacing: 15,
  showDots: true,
  speed: 0.48,
};

function optsForTheme(theme) {
  return theme === 'dark' ? darkOpts : lightOpts;
}

/**
 * Vanta.js NET (WebGL particle network).
 * @see https://www.vantajs.com/
 */
export default function VantaNetBackground({ theme, reducedMotion }) {
  const elRef = useRef(null);
  const vantaRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    if (reducedMotion) {
      vantaRef.current?.destroy?.();
      vantaRef.current = null;
      return undefined;
    }

    let cancelled = false;

    (async () => {
      await import('vanta/dist/vanta.net.min.js');
      if (cancelled || !elRef.current) return;
      const VANTA = window.VANTA;
      if (!VANTA?.NET) return;

      const opts = optsForTheme(themeRef.current);
      if (vantaRef.current) {
        vantaRef.current.setOptions(opts);
        syncNetLineBlending(vantaRef.current, themeRef.current);
        vantaRef.current.resize?.();
      } else {
        vantaRef.current = VANTA.NET({
          el: elRef.current,
          THREE,
          ...opts,
        });
        syncNetLineBlending(vantaRef.current, themeRef.current);
      }
    })();

    return () => {
      cancelled = true;
      vantaRef.current?.destroy?.();
      vantaRef.current = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const effect = vantaRef.current;
    if (!effect) return;
    effect.setOptions(optsForTheme(theme));
    syncNetLineBlending(effect, theme);
    effect.resize?.();
  }, [theme, reducedMotion]);

  return (
    <div
      ref={elRef}
      className={`vanta-net-host${reducedMotion ? ' vanta-net-host--reduced' : ''}`}
      aria-hidden
    />
  );
}
