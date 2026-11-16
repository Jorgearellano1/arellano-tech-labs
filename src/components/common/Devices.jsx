/** Marcos de dispositivo para mostrar capturas reales: navegador y teléfono. */
export const Browser = ({ url, children, className = '' }) => (
    <div className={`dv-browser ${className}`}>
        <div className="dv-bar"><i /><i /><i />{url && <span>{url}</span>}</div>
        <div className="dv-view">{children}</div>
    </div>
);

export const Phone = ({ children, className = '' }) => (
    <div className={`dv-phone ${className}`}><div className="dv-view">{children}</div></div>
);
