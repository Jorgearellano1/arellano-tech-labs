import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PhoneShell from '../PhoneShell';
import useDemoTheme from '../useDemoTheme';
import useMediaQuery from '../useMediaQuery';
import { accents } from '../data/palettes';
import { fontScales } from '../data/appThemes';
import ShopApp from '../apps/ShopApp';
import BookingApp from '../apps/BookingApp';
import AdminApp from '../apps/AdminApp';
import ArLauncherApp from '../apps/ArLauncherApp';
import './MobileDemo.css';

const APPS = [
    { id: 'shop', Comp: ShopApp },
    { id: 'booking', Comp: BookingApp },
    { id: 'admin', Comp: AdminApp },
    { id: 'ar', Comp: ArLauncherApp }
];

const AppIcon = ({ id }) => ({
    shop: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 2l-2 5v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-2-5zM4 7h16M16 11a4 4 0 0 1-8 0" /></svg>,
    booking: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>,
    admin: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /></svg>,
    ar: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" /></svg>
}[id]);

const MobileDemo = ({ preset = {} }) => {
    const { t, i18n } = useTranslation();
    const siteLang = i18n.language?.startsWith('en') ? 'en' : 'es';
    const isNarrow = useMediaQuery('(max-width: 640px)');
    const [app, setApp] = useState(preset.app || 'shop');
    const [lang, setLang] = useState(siteLang);
    const [appState, setAppState] = useState('normal');
    const theme = useDemoTheme({ palette: 'ambar', mode: preset.mode || 'light', accent: null, platform: 'ios' });
    const { state, set, vars, palette } = theme;

    useEffect(() => { if (preset.app) setApp(preset.app); }, [preset.app]);
    useEffect(() => { setLang(siteLang); }, [siteLang]);

    const current = APPS.find(a => a.id === app) || APPS[0];
    const AppComp = current.Comp;
    const accentHex = state.accent || palette.accent;

    // Traductor fijo al idioma elegido dentro del demo (independiente del sitio).
    const tt = (key, fallback) => {
        const v = i18n.getFixedT(lang)(key);
        return v === key && fallback !== undefined ? fallback : v;
    };

    const seg = (label, options, value, onChange, extraClass = '') => (
        <div className={`lab-control ${extraClass}`.trim()}>
            <span className="lab-control-label">{label}</span>
            <div className="lab-seg" role="group" aria-label={label}>
                {options.map(o => (
                    <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)} style={o.style} title={o.title}>
                        {o.icon}{o.label}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="mobile-demo">
            <div className="md-stage">
                <PhoneShell platform={state.platform} vars={vars} label={t('lab.mobile.phoneLabel')} className={`md-phone ${isNarrow ? 'phone--bare' : ''}`} data-scheme={vars.colorScheme}>
                    <AppComp
                        key={`${app}-${lang}`}
                        platform={state.platform}
                        lang={lang}
                        t={tt}
                        appState={appState}
                        mode={state.mode}
                        onSetMode={(m) => set('mode', m)}
                        accentHex={accentHex}
                    />
                </PhoneShell>
                <p className="md-caption">{t('lab.mobile.caption')}</p>
            </div>

            <aside className="lab-controls md-controls">
                <div className="lab-intro">
                    <h3>{t('lab.mobile.intro.title')}</h3>
                    <p>{t('lab.mobile.intro.body')}</p>
                </div>

                <div className="lab-control">
                    <span className="lab-control-label">{t('lab.mobile.app')}</span>
                    <div className="md-apps" role="group" aria-label={t('lab.mobile.app')}>
                        {APPS.map(a => (
                            <button key={a.id} type="button" className={`md-app ${app === a.id ? 'active' : ''}`} aria-pressed={app === a.id} onClick={() => setApp(a.id)}>
                                <span className="md-app-icon"><AppIcon id={a.id} /></span>
                                <span>
                                    <strong>{t(`lab.mobile.apps.${a.id}.label`)}</strong>
                                    <small>{t(`lab.mobile.apps.${a.id}.caption`)}</small>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md-controls-grid">
                    {seg(t('lab.controls.mode'), [
                        { id: 'light', label: t('lab.controls.light') },
                        { id: 'dark', label: t('lab.controls.dark') },
                        { id: 'oled', label: 'OLED' }
                    ], state.mode, (v) => set('mode', v))}

                    {seg(t('lab.controls.platform'), [
                        { id: 'ios', label: 'iOS' },
                        { id: 'android', label: 'Android' }
                    ], state.platform, (v) => set('platform', v))}

                    <div className="lab-control">
                        <span className="lab-control-label">{t('lab.controls.accent')}</span>
                        <div className="lab-swatches" role="group" aria-label={t('lab.controls.accent')}>
                            {accents.map(a => (
                                <button key={a.id} type="button" className="lab-swatch" style={{ '--sw': a.value }} aria-pressed={accentHex.toLowerCase() === a.value.toLowerCase()} aria-label={a.id} title={a.value} onClick={() => set('accent', a.value)} />
                            ))}
                            <label className="lab-swatch lab-swatch--custom" title={t('lab.controls.customColor')}>
                                <input type="color" value={accentHex} onChange={(e) => set('accent', e.target.value)} aria-label={t('lab.controls.customColor')} />
                            </label>
                        </div>
                    </div>

                    {seg(t('lab.controls.textSize'), fontScales.map(f => ({ id: f.id, label: f.label, style: { fontSize: `${12 * f.scale}px` }, title: `${Math.round(f.scale * 100)}%` })), state.fontScale, (v) => set('fontScale', v))}

                    {seg(t('lab.controls.density'), [
                        { id: 'comfortable', label: t('lab.controls.comfortable') },
                        { id: 'compact', label: t('lab.controls.compact') }
                    ], state.density, (v) => set('density', v))}

                    {seg(t('lab.controls.language'), [
                        { id: 'es', label: 'ES' },
                        { id: 'en', label: 'EN' }
                    ], lang, setLang)}

                    {seg(t('lab.controls.state'), [
                        { id: 'normal', label: t('lab.controls.states.normal') },
                        { id: 'loading', label: t('lab.controls.states.loading') },
                        { id: 'empty', label: t('lab.controls.states.empty') },
                        { id: 'error', label: t('lab.controls.states.error') }
                    ], appState, setAppState, 'md-control--wide')}
                </div>

                <p className="lab-hint">{t('lab.mobile.hint')}</p>
            </aside>
        </div>
    );
};

export default MobileDemo;
