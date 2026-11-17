/** Empresas y productos. `logo`: a color (para fondo blanco). `white`: en blanco (para fondo azul). `url` solo si el sitio es público. */
import inperca from '../assets/clients/inperca.png';
import vapretail from '../assets/clients/vapretail.png';
import planetarium from '../assets/clients/planetarium.png';
import vap360 from '../assets/clients/vap360.svg';
import sirius from '../assets/clients/sirius.svg';
import erpbase from '../assets/clients/erpbase.svg';
import animalium from '../assets/clients/animalium.svg';
import santalucia from '../assets/clients/santalucia.webp';
import bmn from '../assets/clients/bmn.png';
import procesadora from '../assets/clients/procesadora.png';
import ohwear from '../assets/clients/ohwear.png';
import makko from '../assets/clients/makko.svg';
import legado from '../assets/clients/legado.webp';
import inpercaW from '../assets/clients/blanco/inperca.png';
import vapretailW from '../assets/clients/blanco/vapretail.png';
import planetariumW from '../assets/clients/blanco/planetarium.png';

export const clients = [
    { id: 'inperca', name: 'INPERCA', logo: inperca, white: inpercaW },
    { id: 'vapretail', name: 'VAP Retail', logo: vapretail, white: vapretailW },
    { id: 'planetarium', name: 'Planetarium Cusco', logo: planetarium, white: planetariumW },
    { id: 'legado', name: 'Grupo Legado Amazónico', logo: legado },
    { id: 'totemiq', name: 'Totemiq' },
    { id: 'totems', name: 'Tótems del Inca' },
    { id: 'vap360', name: 'VAP360', logo: vap360 },
    { id: 'sirius', name: 'Sirius', logo: sirius },
    { id: 'erpbase', name: 'ERP Base', logo: erpbase },
    { id: 'bmn', name: 'Grupo BMN', logo: bmn },
    { id: 'santalucia', name: 'Clínica Santa Lucía', logo: santalucia },
    { id: 'animalium', name: 'Animalium', logo: animalium },
    { id: 'procesadora', name: 'Procesadora de Metales Perú', logo: procesadora },
    { id: 'ohwear', name: 'Ohwear Perú', logo: ohwear },
    { id: 'makko', name: 'Makko', logo: makko }
];

export const clientById = (id) => clients.find((c) => c.id === id);
