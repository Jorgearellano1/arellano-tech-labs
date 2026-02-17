import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    ...props
}) => {
    const classes = `btn btn-${variant} btn-${size} ${className}`.trim();

    // If it's a router link
    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    // If it's an external link
    if (href) {
        return (
            <a
                href={href}
                className={classes}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            >
                {children}
            </a>
        );
    }

    // Default button
    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
