/** Empresas y productos, con el logo en blanco para fondo oscuro. `big`: las cuatro principales. `url` solo si el sitio es público. */
import inperca from '../assets/clients/blanco/inperca.png';
import vapretail from '../assets/clients/blanco/vapretail.png';
import planetarium from '../assets/clients/blanco/planetarium.png';
import vap360 from '../assets/clients/blanco/vap360.png';
import sirius from '../assets/clients/blanco/sirius.png';
import erpbase from '../assets/clients/blanco/erpbase.png';
import animalium from '../assets/clients/blanco/animalium.png';
import santalucia from '../assets/clients/blanco/santalucia.png';
import bmn from '../assets/clients/blanco/bmn.png';
import procesadora from '../assets/clients/blanco/procesadora.png';
import ohwear from '../assets/clients/blanco/ohwear.png';

export const clients = [
    { id: 'inperca', name: 'INPERCA', logo: inperca, big: true },
    { id: 'vapretail', name: 'VAP Retail', logo: vapretail, big: true },
    { id: 'planetarium', name: 'Planetarium Cusco', logo: planetarium, big: true, url: 'https://siriuscrs.com' },
    { id: 'totemiq', name: 'Totemiq', big: true, url: 'https://ar.totemiq.art' },
    { id: 'vap360', name: 'VAP360', logo: vap360 },
    { id: 'sirius', name: 'Sirius', logo: sirius },
    { id: 'erpbase', name: 'ERP Base', logo: erpbase },
    { id: 'bmn', name: 'Grupo BMN', logo: bmn, url: 'https://grupobmn.com' },
    { id: 'santalucia', name: 'Clínica Santa Lucía', logo: santalucia },
    { id: 'animalium', name: 'Animalium', logo: animalium },
    { id: 'procesadora', name: 'Procesadora de Metales Perú', logo: procesadora },
    { id: 'ohwear', name: 'Ohwear Perú', logo: ohwear }
];

export const clientById = (id) => clients.find((c) => c.id === id);
