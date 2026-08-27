import { useCallback, useEffect, useMemo, useState } from 'react';
import { palettes, modes, inkFor, rgba } from './data/palettes';
import { platforms, fontScales, densities } from './data/appThemes';

/**
 * Estado de tema del laboratorio → variables CSS (--d-*) aplicadas
 * al nodo raíz de cada demo. Cambiar una opción recolorea todo lo
 * que hay dentro en el mismo frame, sin re-render de hijos.
 */
export const defaultThemeState = {
    palette: 'ambar',
    mode: 'light',
    accent: null,            // null → acento de la paleta
    platform: 'ios',
    fontScale: 'md',
    density: 'comfortable'
};

export function buildVars(state) {
    const palette = palettes.find(p => p.id === state.palette) || palettes[0];
    const mode = modes[state.mode] || modes.light;
    const platform = platforms[state.platform] || platforms.ios;
    const fs = (fontScales.find(f => f.id === state.fontScale) || fontScales[1]).scale;
    const density = (densities[state.density] || densities.comfortable).unit;
    const accent = state.accent || palette.accent;

    return {
        '--d-bg': state.mode === 'light' ? palette.tint.light : (state.mode === 'oled' ? palette.tint.oled : palette.tint.dark),
        '--d-surface': mode.surface,
        '--d-surface-2': mode.surface2,
        '--d-text': mode.text,
        '--d-text-2': mode.text2,
        '--d-muted': mode.muted,
        '--d-line': mode.line,
        '--d-line-strong': mode.lineStrong,
        '--d-shadow': mode.shadow,
        '--d-accent': accent,
        '--d-accent-ink': inkFor(accent),
        '--d-accent-soft': rgba(accent, mode.scheme === 'dark' ? 0.22 : 0.14),
        '--d-accent-line': rgba(accent, 0.35),
        '--d-secondary': palette.secondary,
        '--d-chart-1': palette.chart[0],
        '--d-chart-2': palette.chart[1],
        '--d-chart-3': palette.chart[2],
        '--d-chart-4': palette.chart[3],
        '--d-chart-5': palette.chart[4],
        '--d-font': platform.font,
        '--d-radius': platform.radius,
        '--d-radius-lg': platform.radiusLg,
        '--d-frame-radius': platform.frameRadius,
        '--d-font-scale': fs,
        '--d-density': density,
        colorScheme: mode.scheme
    };
}

export default function useDemoTheme(initial = {}) {
    const [state, setState] = useState({ ...defaultThemeState, ...initial });

    const set = useCallback((key, value) => {
        setState(prev => (prev[key] === value ? prev : { ...prev, [key]: value }));
    }, []);

    const vars = useMemo(() => buildVars(state), [state]);
    const palette = useMemo(() => palettes.find(p => p.id === state.palette) || palettes[0], [state.palette]);

    return { state, set, setState, vars, palette };
}

/**
 * Aplica (o retira) la paleta del demo a toda la página, escribiendo
 * sobre los tokens globales del sitio. Reversible: al desactivar se
 * eliminan las propiedades inline y el sitio vuelve a su CSS.
 */
const SITE_TOKENS = ['--color-cta-yellow', '--color-cta-yellow-hover', '--color-background-pink', '--color-background-yellow', '--shadow-cta'];

export function useApplyPaletteToSite(enabled, palette) {
    useEffect(() => {
        const root = document.documentElement;
        if (!enabled || !palette) {
            SITE_TOKENS.forEach(t => root.style.removeProperty(t));
            return undefined;
        }
        root.style.setProperty('--color-cta-yellow', palette.accent);
        root.style.setProperty('--color-cta-yellow-hover', palette.chart[0]);
        root.style.setProperty('--color-background-yellow', palette.accent);
        root.style.setProperty('--color-background-pink', palette.secondary);
        root.style.setProperty('--shadow-cta', `0 6px 16px ${rgba(palette.accent, 0.3)}`);
        return () => SITE_TOKENS.forEach(t => root.style.removeProperty(t));
    }, [enabled, palette]);
}
