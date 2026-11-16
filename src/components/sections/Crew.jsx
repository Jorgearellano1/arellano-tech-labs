import { ParallaxScene, Layer } from '../common/Parallax';
import Char from '../common/Char';

const ORDER = [['lupuna', 0.12], ['markup', 0.22], ['tari', 0.42], ['roko', 0.62], ['ushico', 0.7], ['mina', 0.36], ['bufi', 0.28], ['mayo', 0.5], ['pip', 0.95]];

/** Los dos repartos juntos (Legado Amazónico y Rokko), en movimiento. */
const Crew = () => (
    <ParallaxScene className="rd-crew">
        {ORDER.map(([id, depth]) => (
            <Layer key={id} depth={depth} travel={40 + depth * 80} className={`rd-crew-ch rd-crew-ch--${id}`}>
                <Char id={id} />
            </Layer>
        ))}
    </ParallaxScene>
);

export default Crew;
