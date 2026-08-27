/**
 * Paletas seleccionables del laboratorio.
 * Cada una define acento, secundario, serie de gráficos y un tinte de fondo por modo.
 */
export const palettes = [
    {
        id: 'ambar',
        name: { es: 'Ámbar', en: 'Amber', de: 'Bernstein', fr: 'Ambre', it: 'Ambra' },
        accent: '#E8B547',
        secondary: '#D96998',
        chart: ['#E8B547', '#D96998', '#4C6FC7', '#3E7A55', '#8B5CF6'],
        tint: { light: '#FBF7EC', dark: '#17140C', oled: '#000000' }
    },
    {
        id: 'oceano',
        name: { es: 'Océano', en: 'Ocean', de: 'Ozean', fr: 'Océan', it: 'Oceano' },
        accent: '#0E7C9B',
        secondary: '#5EEAD4',
        chart: ['#0E7C9B', '#5EEAD4', '#2563EB', '#F59E0B', '#6366F1'],
        tint: { light: '#EEF6F8', dark: '#0A1519', oled: '#000000' }
    },
    {
        id: 'bosque',
        name: { es: 'Bosque', en: 'Forest', de: 'Wald', fr: 'Forêt', it: 'Bosco' },
        accent: '#2F7A4A',
        secondary: '#B7E4C7',
        chart: ['#2F7A4A', '#8FBC8F', '#D4A574', '#3B82F6', '#EF6F6C'],
        tint: { light: '#EFF6F0', dark: '#0C1610', oled: '#000000' }
    },
    {
        id: 'orquidea',
        name: { es: 'Orquídea', en: 'Orchid', de: 'Orchidee', fr: 'Orchidée', it: 'Orchidea' },
        accent: '#B4479A',
        secondary: '#F9A8D4',
        chart: ['#B4479A', '#F9A8D4', '#7C3AED', '#F59E0B', '#0EA5E9'],
        tint: { light: '#F9EFF6', dark: '#170C14', oled: '#000000' }
    },
    {
        id: 'grafito',
        name: { es: 'Grafito', en: 'Graphite', de: 'Graphit', fr: 'Graphite', it: 'Grafite' },
        accent: '#1F2937',
        secondary: '#9CA3AF',
        chart: ['#1F2937', '#6B7280', '#9CA3AF', '#D1D5DB', '#E8B547'],
        tint: { light: '#F3F4F6', dark: '#0F1115', oled: '#000000' }
    }
];

/** Neutros por modo. Independientes de la paleta. */
export const modes = {
    light: {
        bg: '#F6F7FB', surface: '#FFFFFF', surface2: '#EEF0F6',
        text: '#141620', text2: '#3C4256', muted: '#6B7286',
        line: '#DEE2EC', lineStrong: '#C9CFDD',
        shadow: '0 1px 2px rgba(20,30,70,.06), 0 10px 28px -14px rgba(20,30,70,.22)',
        scheme: 'light'
    },
    dark: {
        bg: '#10131A', surface: '#181C25', surface2: '#212631',
        text: '#EDEFF5', text2: '#C2C7D5', muted: '#8C94A8',
        line: '#2A3040', lineStrong: '#3A4256',
        shadow: '0 1px 2px rgba(0,0,0,.4), 0 10px 28px -14px rgba(0,0,0,.7)',
        scheme: 'dark'
    },
    oled: {
        bg: '#000000', surface: '#0B0B0D', surface2: '#151518',
        text: '#F2F2F4', text2: '#C8C8CE', muted: '#8A8A94',
        line: '#1F1F24', lineStrong: '#2E2E35',
        shadow: '0 1px 2px rgba(0,0,0,.6), 0 10px 28px -14px rgba(0,0,0,.9)',
        scheme: 'dark'
    }
};

/** Acentos rápidos para el teléfono. */
export const accents = [
    { id: 'ambar', value: '#E8B547' },
    { id: 'coral', value: '#EF6F6C' },
    { id: 'indigo', value: '#4F46E5' },
    { id: 'teal', value: '#0D9488' },
    { id: 'rosa', value: '#DB2777' },
    { id: 'carbon', value: '#1F2937' }
];

export function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Luminancia relativa → texto negro o blanco sobre un color. */
export function inkFor(hex) {
    const [r, g, b] = hexToRgb(hex).map(v => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return L > 0.42 ? '#111318' : '#FFFFFF';
}

export function rgba(hex, a) {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
