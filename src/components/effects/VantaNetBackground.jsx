import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './VantaNetBackground.css';

/* Incluye móvil en horizontal y tablets estrechas; solo escritorio ancho usa NET */
const MOBILE_MQ = '(max-width: 1024px)';

function colorBrightness(hex) {
  const c = new THREE.Color(hex);
  return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
}

/** Solo NET (modo claro): evita líneas blancas por AdditiveBlending. */
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

const netShared = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 1.1,
  mouseCoeffX: 0.85,
  mouseCoeffY: 0.45,
};

const netLightOpts = {
  ...netShared,
  color: 0xe07a9e,
  backgroundColor: 0xe8edf7,
  points: 10,
  maxDistance: 12,
  spacing: 14,
  showDots: true,
  speed: 0.5,
};

const netDarkOpts = {
  ...netShared,
  color: 0xe8b547,
  backgroundColor: 0x060b14,
  points: 9,
  maxDistance: 20,
  spacing: 15,
  showDots: true,
  speed: 0.48,
};

function netOptsForTheme(theme) {
  return theme === 'dark' ? netDarkOpts : netLightOpts;
}

/**
 * FOG en móvil/tablet — shader 2D estable en viewports estrechos (WAVES/NET suelen verse mal).
 * @see https://www.vantajs.com/
 */
const fogShared = {
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200,
  minWidth: 200,
  scale: 2,
  scaleMobile: 3,
  blurFactor: 0.58,
  zoom: 0.92,
  speed: 1.15,
  forceAnimate: true,
};

const fogLightOpts = {
  ...fogShared,
  baseColor: 0xe8edf7,
  lowlightColor: 0xb8c5e8,
  midtoneColor: 0xd97fa5,
  highlightColor: 0xf2d4a8,
};

const fogDarkOpts = {
  ...fogShared,
  baseColor: 0x060b14,
  lowlightColor: 0x0c1628,
  midtoneColor: 0x1e3a5c,
  highlightColor: 0xd4a84a,
};

function fogOptsForTheme(theme) {
  return theme === 'dark' ? fogDarkOpts : fogLightOpts;
}

function fogOptsWithMotion(fogOpts, reducedMotion) {
  if (!reducedMotion) return fogOpts;
  return { ...fogOpts, speed: 0 };
}

/**
 * Pantalla ancha (>1024px): NET. Tablet/móvil (≤1024px): FOG.
 */
export default function VantaNetBackground({ theme, reducedMotion }) {
  const elRef = useRef(null);
  const vantaRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const [useNarrow, setUseNarrow] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_MQ).matches : false
  );

  useLayoutEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setUseNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reducedMotion && !useNarrow) {
      vantaRef.current?.destroy?.();
      vantaRef.current = null;
      return undefined;
    }

    let cancelled = false;

    (async () => {
      vantaRef.current?.destroy?.();
      vantaRef.current = null;
      if (!elRef.current) return;

      const th = themeRef.current;

      if (useNarrow) {
        await import('vanta/dist/vanta.fog.min.js');
        if (cancelled || !elRef.current) return;
        const VANTA = window.VANTA;
        if (!VANTA?.FOG) return;
        const f = fogOptsWithMotion(fogOptsForTheme(th), reducedMotion);
        vantaRef.current = VANTA.FOG({
          el: elRef.current,
          THREE,
          ...f,
        });
        requestAnimationFrame(() => {
          vantaRef.current?.resize?.();
          requestAnimationFrame(() => vantaRef.current?.resize?.());
        });
      } else {
        await import('vanta/dist/vanta.net.min.js');
        if (cancelled || !elRef.current) return;
        const VANTA = window.VANTA;
        if (!VANTA?.NET) return;
        vantaRef.current = VANTA.NET({
          el: elRef.current,
          THREE,
          ...netOptsForTheme(th),
        });
        syncNetLineBlending(vantaRef.current, th);
      }
    })();

    return () => {
      cancelled = true;
      vantaRef.current?.destroy?.();
      vantaRef.current = null;
    };
  }, [reducedMotion, useNarrow]);

  useEffect(() => {
    if (reducedMotion && !useNarrow) return;
    const effect = vantaRef.current;
    if (!effect) return;

    if (useNarrow) {
      effect.setOptions(fogOptsWithMotion(fogOptsForTheme(theme), reducedMotion));
    } else {
      effect.setOptions(netOptsForTheme(theme));
      syncNetLineBlending(effect, theme);
    }
    effect.resize?.();
  }, [theme, reducedMotion, useNarrow]);

  const staticCssFallback = reducedMotion && !useNarrow;

  return (
    <div
      ref={elRef}
      className={`vanta-net-host${staticCssFallback ? ' vanta-net-host--reduced' : ''}`}
      aria-hidden
    />
  );
}
