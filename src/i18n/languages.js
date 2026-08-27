/** Idiomas disponibles en el sitio. `locale` se usa para números, monedas y fechas. */
export const LANGUAGES = [
    { code: 'es', short: 'ES', name: 'Español', locale: 'es-PE' },
    { code: 'en', short: 'EN', name: 'English', locale: 'en-US' },
    { code: 'de', short: 'DE', name: 'Deutsch', locale: 'de-DE' },
    { code: 'fr', short: 'FR', name: 'Français', locale: 'fr-FR' },
    { code: 'it', short: 'IT', name: 'Italiano', locale: 'it-IT' }
];

export const LANGUAGE_CODES = LANGUAGES.map(l => l.code);

/** Código de idioma soportado a partir de cualquier valor (p. ej. "en-GB" → "en"). */
export function langOf(value) {
    const base = (value || 'es').toLowerCase().slice(0, 2);
    return LANGUAGE_CODES.includes(base) ? base : 'es';
}

export function localeFor(value) {
    return (LANGUAGES.find(l => l.code === langOf(value)) || LANGUAGES[0]).locale;
}
