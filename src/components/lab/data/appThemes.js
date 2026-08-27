/** Opciones del teléfono: plataforma, tamaño de texto y densidad. */
export const platforms = {
    ios: {
        id: 'ios',
        label: 'iOS',
        font: "-apple-system, 'SF Pro Text', 'Helvetica Neue', 'Space Grotesk', sans-serif",
        radius: '14px',
        radiusLg: '22px',
        frameRadius: '46px',
        tabStyle: 'ios'
    },
    android: {
        id: 'android',
        label: 'Android',
        font: "Roboto, 'Google Sans', 'Segoe UI', 'Space Grotesk', sans-serif",
        radius: '18px',
        radiusLg: '28px',
        frameRadius: '30px',
        tabStyle: 'material'
    }
};

export const fontScales = [
    { id: 'xs', label: 'A', scale: 0.88 },
    { id: 'md', label: 'A', scale: 1 },
    { id: 'lg', label: 'A', scale: 1.12 },
    { id: 'xl', label: 'A', scale: 1.26 }
];

export const densities = {
    comfortable: { id: 'comfortable', unit: 1 },
    compact: { id: 'compact', unit: 0.78 }
};
