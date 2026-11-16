import { ParallaxScene, Layer } from '../common/Parallax';
import selva from '../../assets/animacion/selva.webp';
import lupuna from '../../assets/animacion/abuela-lupuna.webp';
import bufi from '../../assets/animacion/bufi.webp';
import tari from '../../assets/animacion/tari.webp';
import mayo from '../../assets/animacion/mayo.webp';
import ushico from '../../assets/animacion/ushico.webp';

/** Escena de selva con los personajes de Legado Amazónico a distinta profundidad. */
const AnimationStage = () => (
    <ParallaxScene className="rd-stage" aria-hidden="true">
        <Layer depth={0.1} travel={90} className="rd-stage-bg" style={{ backgroundImage: `url(${selva})` }} />
        <Layer depth={0.16} className="rd-ch rd-ch--lupuna"><img src={lupuna} alt="" loading="lazy" decoding="async" /></Layer>
        <Layer depth={0.26} className="rd-ch rd-ch--bufi"><img className="rd-float rd-float--b" src={bufi} alt="" loading="lazy" decoding="async" /></Layer>
        <Layer depth={0.36} className="rd-ch rd-ch--tari"><img src={tari} alt="" loading="lazy" decoding="async" /></Layer>
        <Layer depth={0.7} travel={150} className="rd-ch rd-ch--mayo"><img className="rd-float rd-float--c" src={mayo} alt="" loading="lazy" decoding="async" /></Layer>
        <Layer depth={0.58} travel={130} className="rd-ch rd-ch--ushico"><img className="rd-float" src={ushico} alt="" loading="lazy" decoding="async" /></Layer>
    </ParallaxScene>
);

export default AnimationStage;
