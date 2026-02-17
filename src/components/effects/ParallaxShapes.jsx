import './ParallaxShapes.css';

const ParallaxShapes = () => {
    return (
        <div className="parallax-shapes">
            {/* Simplified to 2 layers for better performance */}
            <div className="shape-layer shape-layer-1">
                <div className="shape shape-circle shape-1"></div>
                <div className="shape shape-blob shape-2"></div>
            </div>

            <div className="shape-layer shape-layer-2">
                <div className="shape shape-circle shape-3"></div>
            </div>
        </div>
    );
};

export default ParallaxShapes;
