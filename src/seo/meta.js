/** Título y descripción por ruta. Lo usan <Seo> (en el navegador) y scripts/seo-pages.mjs (en el build). */
export const SITE = { name: 'AJM Technology', url: 'https://ajmptech.com' };

export const ROUTE_META = {
    '/': {
        title: 'AJM Technology · Software y animación',
        description: 'Estudio que construye plataformas, tiendas y apps en producción, y anima series con personajes propios.'
    },
    '/proyectos': {
        title: 'Proyectos · AJM Technology',
        description: 'Plataformas, sitios, tiendas y apps hechos por AJM Technology, con enlace a cada sitio.'
    },
    '/animacion': {
        title: 'Animación · AJM Technology',
        description: 'Series animadas con personajes propios: Ushico y el bosque de Atalaya, y Rokko.'
    },
    '/nosotros': {
        title: 'Nosotros · AJM Technology',
        description: 'Quiénes somos y cómo trabajamos en AJM Technology.'
    },
    '/contacto': {
        title: 'Contacto · AJM Technology',
        description: 'Cuéntanos tu proyecto. Escríbenos a contacto@ajmptech.com.'
    }
};

export const projectMeta = (name, description) => ({
    title: `${name} · AJM Technology`,
    description
});
