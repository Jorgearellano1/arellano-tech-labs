/** Logo AJM: símbolo (A abierta con cuña amarilla) + nombre. Colores por tokens, sirve en ambos temas. */
const Logo = ({ wordmark = true, size = 34, className = '' }) => (
    <span className={`rd-logo ${className}`}>
        <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
            <rect width="100" height="100" rx="22" fill="var(--color-text-primary)" />
            <path d="M24 76 50 22l26 54" fill="none" stroke="var(--surface-page)" strokeWidth="13" strokeMiterlimit="6" />
            <path fill="var(--color-cta-yellow)" d="M50 52 62 78H38Z" />
        </svg>
        {wordmark && (
            <span className="rd-logo-text">
                AJM<small>Technology</small>
            </span>
        )}
    </span>
);

export default Logo;
