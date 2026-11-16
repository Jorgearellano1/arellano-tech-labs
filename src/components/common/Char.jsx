import { useReducedMotion } from 'framer-motion';
import { CAST } from '../../data/cast';

/** Un personaje en movimiento (bucle animado) con su nombre al pasar el cursor. */
const Char = ({ id, className = '', label = true }) => {
    const reduce = useReducedMotion();
    const c = CAST[id];
    return (
        <figure className={`ch ${className}`}>
            <img src={reduce ? c.still : c.live} alt={c.name} loading="lazy" decoding="async" draggable="false" />
            {label && <figcaption>{c.name}</figcaption>}
        </figure>
    );
};

export default Char;
