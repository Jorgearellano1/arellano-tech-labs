import { ParallaxScene, Layer } from '../common/Parallax';
import ushico from '../../assets/animacion/ushico.webp';
import mayo from '../../assets/animacion/mayo.webp';
import tari from '../../assets/animacion/tari.webp';
import bufi from '../../assets/animacion/bufi.webp';
import lupuna from '../../assets/animacion/abuela-lupuna.webp';
import roko from '../../assets/animacion/roko.webp';
import mina from '../../assets/animacion/mina.webp';
import pip from '../../assets/animacion/pip.webp';
import markup from '../../assets/animacion/markup.webp';

const CAST = [
    ['lupuna', lupuna, 0.12, ''], ['markup', markup, 0.22, ''], ['bufi', bufi, 0.28, 'rd-float--b'],
    ['mina', mina, 0.36, ''], ['tari', tari, 0.42, ''], ['mayo', mayo, 0.5, 'rd-float--c'],
    ['roko', roko, 0.62, 'rd-float'], ['ushico', ushico, 0.7, 'rd-float rd-float--b'], ['pip', pip, 0.95, 'rd-float rd-float--c']
];

/** Los dos repartos juntos (Legado Amazónico y Rokko), cada personaje a su profundidad. */
const Crew = () => (
    <ParallaxScene className="rd-crew" aria-hidden="true">
        {CAST.map(([id, src, depth, anim]) => (
            <Layer key={id} depth={depth} travel={60 + depth * 110} className={`rd-crew-ch rd-crew-ch--${id}`}>
                <img className={anim} src={src} alt="" loading="lazy" decoding="async" />
            </Layer>
        ))}
    </ParallaxScene>
);

export default Crew;
