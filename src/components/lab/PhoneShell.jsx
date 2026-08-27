import { useEffect, useState } from 'react';
import './PhoneShell.css';

function useClock() {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(id);
    }, []);
    return now;
}

const SignalIcon = () => (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
        <rect x="0" y="7" width="3" height="4" rx="0.8" /><rect x="4.5" y="5" width="3" height="6" rx="0.8" /><rect x="9" y="2.5" width="3" height="8.5" rx="0.8" /><rect x="13.5" y="0" width="3" height="11" rx="0.8" />
    </svg>
);
const WifiIcon = () => (
    <svg width="15" height="11" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
        <path d="M2 6.5a15 15 0 0 1 20 0M5.5 10.5a10 10 0 0 1 13 0M9 14.5a5 5 0 0 1 6 0" /><circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
);
const BatteryIcon = () => (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden>
        <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="15" height="8" rx="1.6" fill="currentColor" /><path d="M23 4v4a2 2 0 0 0 0-4z" fill="currentColor" opacity="0.4" />
    </svg>
);

/**
 * Marco de teléfono. Renderiza cualquier cosa dentro de la pantalla.
 * platform: 'ios' | 'android'. `vars` son las variables --d-* de useDemoTheme.
 */
const PhoneShell = ({ platform = 'ios', vars = {}, children, className = '', label, ...rest }) => {
    const now = useClock();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: platform === 'ios' });

    return (
        <div className={`phone phone--${platform} ${className}`.trim()} style={vars} role="group" aria-label={label} {...rest}>
            <div className="phone-frame">
                <div className="phone-side phone-side--power" aria-hidden />
                <div className="phone-side phone-side--vol1" aria-hidden />
                <div className="phone-side phone-side--vol2" aria-hidden />
                <div className="phone-screen">
                    <div className="phone-statusbar" aria-hidden>
                        <span className="phone-time">{time.replace(/\s?[ap]\.?\s?m\.?/i, '')}</span>
                        {platform === 'ios' ? <span className="phone-island" /> : <span className="phone-punch" />}
                        <span className="phone-status-icons"><SignalIcon /><WifiIcon /><BatteryIcon /></span>
                    </div>
                    <div className="phone-content">
                        {children}
                    </div>
                    <div className="phone-home" aria-hidden>
                        {platform === 'ios' ? <span className="phone-home-bar" /> : (
                            <span className="phone-android-nav">
                                <i className="nav-back" /><i className="nav-home" /><i className="nav-recent" />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneShell;
