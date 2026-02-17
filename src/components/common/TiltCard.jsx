import { useRef } from 'react';
import Atropos from 'atropos/react';
import 'atropos/css';
import './TiltCard.css';

const TiltCard = ({
    children,
    className = '',
    shadow = true,
    highlight = true,
    rotateXMax = 8, // Reduced for better performance
    rotateYMax = 8, // Reduced for better performance
    ...props
}) => {
    return (
        <Atropos
            className={`tilt-card ${className}`}
            shadow={shadow}
            highlight={highlight}
            rotateXMax={rotateXMax}
            rotateYMax={rotateYMax}
            {...props}
        >
            {children}
        </Atropos>
    );
};

export default TiltCard;
