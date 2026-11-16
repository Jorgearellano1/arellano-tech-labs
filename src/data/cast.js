/** Personajes de las dos series. `live`: bucle animado exportado del motor de la serie. `still`: imagen fija (movimiento reducido). */
import ushico from '../assets/animacion/vivo/ushico.webp';
import mayo from '../assets/animacion/vivo/mayo.webp';
import tari from '../assets/animacion/vivo/tari.webp';
import bufi from '../assets/animacion/vivo/bufi.webp';
import lupuna from '../assets/animacion/vivo/lupuna.webp';
import roko from '../assets/animacion/vivo/roko.webp';
import mina from '../assets/animacion/vivo/mina.webp';
import pip from '../assets/animacion/vivo/pip.webp';
import markup from '../assets/animacion/vivo/markup.webp';
import ushicoS from '../assets/animacion/ushico.webp';
import mayoS from '../assets/animacion/mayo.webp';
import tariS from '../assets/animacion/tari.webp';
import bufiS from '../assets/animacion/bufi.webp';
import lupunaS from '../assets/animacion/abuela-lupuna.webp';
import rokoS from '../assets/animacion/roko.webp';
import minaS from '../assets/animacion/mina.webp';
import pipS from '../assets/animacion/pip.webp';
import markupS from '../assets/animacion/markup.webp';

export const CAST = {
    ushico: { name: 'Ushico', live: ushico, still: ushicoS, serie: 'legado' },
    mayo: { name: 'Mayo', live: mayo, still: mayoS, serie: 'legado' },
    tari: { name: 'Tari', live: tari, still: tariS, serie: 'legado' },
    bufi: { name: 'Bufi', live: bufi, still: bufiS, serie: 'legado' },
    lupuna: { name: 'Abuela Lupuna', live: lupuna, still: lupunaS, serie: 'legado' },
    roko: { name: 'Roko', live: roko, still: rokoS, serie: 'rokko' },
    pip: { name: 'Pip', live: pip, still: pipS, serie: 'rokko' },
    mina: { name: 'Mina', live: mina, still: minaS, serie: 'rokko' },
    markup: { name: 'Mr. Markup', live: markup, still: markupS, serie: 'rokko' }
};
