/** Empresas y productos. Las cuatro primeras (`big`) van destacadas. `url` solo cuando el sitio es público. */
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

export const clients = [
    { name: 'INPERCA', logo: inperca, big: true },
    { name: 'VAP Retail', logo: vapretail, big: true },
    { name: 'Planetarium Cusco', logo: planetarium, big: true, url: 'https://siriuscrs.com' },
    { name: 'Totemiq', big: true, url: 'https://ar.totemiq.art' },
    { name: 'VAP360', logo: vap360 },
    { name: 'Sirius', logo: sirius },
    { name: 'ERP Base', logo: erpbase },
    { name: 'Grupo BMN', logo: bmn, url: 'https://grupobmn.com' },
    { name: 'Clínica Santa Lucía', logo: santalucia },
    { name: 'Animalium', logo: animalium },
    { name: 'Procesadora de Metales Perú', logo: procesadora },
    { name: 'Ohwear Perú', logo: ohwear },
    { name: 'Makko', logo: makko }
];
