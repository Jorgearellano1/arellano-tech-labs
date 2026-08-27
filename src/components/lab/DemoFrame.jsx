import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DEVICES = [
    { id: 'desktop', width: '100%', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" strokeLinecap="round" /></svg>
    ) },
    { id: 'tablet', width: '760px', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M12 18h.01" strokeLinecap="round" /></svg>
    ) },
    { id: 'mobile', width: '400px', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M12 18h.01" strokeLinecap="round" /></svg>
    ) }
];

/**
 * Marco con selector de viewport. El contenido usa container queries
 * (container-name: demo), así que se reacomoda de verdad al cambiar de ancho.
 */
const DemoFrame = ({ children, className = '', initial = 'desktop', toolbarExtra = null }) => {
    const { t } = useTranslation();
    const [device, setDevice] = useState(initial);
    const current = DEVICES.find(d => d.id === device) || DEVICES[0];

    return (
        <div className={`demo-frame ${className}`.trim()} data-device={device}>
            <div className="demo-frame-toolbar">
                <div className="demo-frame-dots" aria-hidden>
                    <span /><span /><span />
                </div>
                <div className="demo-frame-devices" role="group" aria-label={t('lab.frame.viewport')}>
                    {DEVICES.map(d => (
                        <button
                            key={d.id}
                            type="button"
                            className={`demo-frame-device ${device === d.id ? 'active' : ''}`}
                            onClick={() => setDevice(d.id)}
                            aria-pressed={device === d.id}
                            title={t(`lab.frame.${d.id}`)}
                        >
                            {d.icon}
                            <span className="sr-only">{t(`lab.frame.${d.id}`)}</span>
                        </button>
                    ))}
                </div>
                <div className="demo-frame-toolbar-extra">{toolbarExtra}</div>
            </div>
            <div className="demo-frame-viewport-wrap">
                <div className="demo-frame-viewport" style={{ maxWidth: current.width }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DemoFrame;
