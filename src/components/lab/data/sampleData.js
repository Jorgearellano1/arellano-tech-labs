/**
 * Datos de ejemplo del laboratorio. Deterministas (sin Math.random)
 * para que el demo se vea igual en cada visita.
 */
export const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
export const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const categoryIds = ['apparel', 'footwear', 'accessories', 'home'];

/** Ventas mensuales (S/) por categoría, 12 meses × 4 categorías. */
export const salesByMonth = [
    [18200, 12400, 6100, 9300],
    [16900, 11800, 5800, 8700],
    [21500, 14200, 7400, 10100],
    [23800, 15100, 8200, 11400],
    [22100, 16900, 8900, 12600],
    [25400, 17300, 9600, 13100],
    [27900, 19800, 10400, 14800],
    [26300, 18400, 9900, 13900],
    [24700, 17900, 9100, 12800],
    [29800, 21200, 11700, 15600],
    [34500, 24900, 13900, 18200],
    [41200, 29600, 16800, 21900]
];

export const products = [
    { id: 1, name: 'Casaca Andes', category: 'apparel', units: 412, revenue: 61800, trend: 12.4, stock: 38 },
    { id: 2, name: 'Polo Costa', category: 'apparel', units: 1280, revenue: 44800, trend: 6.1, stock: 210 },
    { id: 3, name: 'Jean Selva', category: 'apparel', units: 690, revenue: 82800, trend: -3.2, stock: 74 },
    { id: 4, name: 'Chompa Puno', category: 'apparel', units: 355, revenue: 46150, trend: 18.9, stock: 22 },
    { id: 5, name: 'Vestido Lima', category: 'apparel', units: 298, revenue: 53640, trend: 4.7, stock: 41 },
    { id: 6, name: 'Zapatilla Urbana', category: 'footwear', units: 842, revenue: 151560, trend: 22.3, stock: 96 },
    { id: 7, name: 'Bota Trekking', category: 'footwear', units: 264, revenue: 79200, trend: 9.8, stock: 17 },
    { id: 8, name: 'Sandalia Playa', category: 'footwear', units: 731, revenue: 36550, trend: -8.4, stock: 143 },
    { id: 9, name: 'Mocasín Clásico', category: 'footwear', units: 189, revenue: 41580, trend: 1.2, stock: 33 },
    { id: 10, name: 'Zapatilla Running', category: 'footwear', units: 517, revenue: 108570, trend: 15.6, stock: 61 },
    { id: 11, name: 'Mochila 24L', category: 'accessories', units: 623, revenue: 62300, trend: 11.0, stock: 88 },
    { id: 12, name: 'Gorra Sol', category: 'accessories', units: 1104, revenue: 27600, trend: 3.4, stock: 302 },
    { id: 13, name: 'Reloj Minimal', category: 'accessories', units: 142, revenue: 56800, trend: 27.5, stock: 12 },
    { id: 14, name: 'Lentes Polarizados', category: 'accessories', units: 388, revenue: 42680, trend: 7.9, stock: 54 },
    { id: 15, name: 'Billetera Cuero', category: 'accessories', units: 476, revenue: 33320, trend: -1.5, stock: 120 },
    { id: 16, name: 'Lámpara Nórdica', category: 'home', units: 231, revenue: 41580, trend: 14.2, stock: 19 },
    { id: 17, name: 'Set Sábanas', category: 'home', units: 389, revenue: 58350, trend: 5.5, stock: 47 },
    { id: 18, name: 'Cojín Lino', category: 'home', units: 812, revenue: 32480, trend: 9.1, stock: 165 },
    { id: 19, name: 'Maceta Cerámica', category: 'home', units: 566, revenue: 22640, trend: 19.7, stock: 92 },
    { id: 20, name: 'Difusor Aroma', category: 'home', units: 447, revenue: 35760, trend: -4.8, stock: 71 },
    { id: 21, name: 'Camisa Lino', category: 'apparel', units: 402, revenue: 48240, trend: 8.3, stock: 58 },
    { id: 22, name: 'Zapato Oficina', category: 'footwear', units: 233, revenue: 55920, trend: -2.1, stock: 28 },
    { id: 23, name: 'Cinturón Trenzado', category: 'accessories', units: 517, revenue: 25850, trend: 2.6, stock: 134 },
    { id: 24, name: 'Espejo Redondo', category: 'home', units: 176, revenue: 38720, trend: 12.9, stock: 14 }
];

/** Órdenes para el panel de sistema (móvil y escritorio). */
export const orders = [
    { id: 'PE-10482', customer: 'Lucía Fernández', city: 'Lima', items: 3, total: 486, status: 'paid', minutesAgo: 4 },
    { id: 'PE-10481', customer: 'Marco Quispe', city: 'Cusco', items: 1, total: 189, status: 'pending', minutesAgo: 11 },
    { id: 'PE-10480', customer: 'Valeria Ríos', city: 'Arequipa', items: 5, total: 1240, status: 'shipped', minutesAgo: 27 },
    { id: 'PE-10479', customer: 'Diego Salas', city: 'Trujillo', items: 2, total: 312, status: 'paid', minutesAgo: 43 },
    { id: 'PE-10478', customer: 'Camila Torres', city: 'Lima', items: 4, total: 758, status: 'cancelled', minutesAgo: 68 },
    { id: 'PE-10477', customer: 'Renato Vega', city: 'Piura', items: 1, total: 95, status: 'shipped', minutesAgo: 95 },
    { id: 'PE-10476', customer: 'Andrea Paz', city: 'Lima', items: 2, total: 420, status: 'paid', minutesAgo: 130 },
    { id: 'PE-10475', customer: 'Sofía Huamán', city: 'Cusco', items: 6, total: 1585, status: 'pending', minutesAgo: 190 },
    { id: 'PE-10474', customer: 'Bruno Castro', city: 'Chiclayo', items: 1, total: 149, status: 'shipped', minutesAgo: 240 },
    { id: 'PE-10473', customer: 'Fabiola Meza', city: 'Lima', items: 3, total: 637, status: 'paid', minutesAgo: 310 }
];

/** Catálogo de la app tienda. Sin fotos: cada producto tiene un tono para su tarjeta. */
export const shopProducts = [
    { id: 's1', name: 'Zapatilla Urbana', price: 180, category: 'footwear', hue: 28, rating: 4.8, reviews: 212 },
    { id: 's2', name: 'Casaca Andes', price: 150, category: 'apparel', hue: 210, rating: 4.6, reviews: 98 },
    { id: 's3', name: 'Mochila 24L', price: 100, category: 'accessories', hue: 140, rating: 4.7, reviews: 143 },
    { id: 's4', name: 'Reloj Minimal', price: 400, category: 'accessories', hue: 260, rating: 4.9, reviews: 57 },
    { id: 's5', name: 'Bota Trekking', price: 300, category: 'footwear', hue: 18, rating: 4.5, reviews: 76 },
    { id: 's6', name: 'Lámpara Nórdica', price: 180, category: 'home', hue: 45, rating: 4.4, reviews: 39 },
    { id: 's7', name: 'Polo Costa', price: 35, category: 'apparel', hue: 190, rating: 4.3, reviews: 301 },
    { id: 's8', name: 'Lentes Polarizados', price: 110, category: 'accessories', hue: 320, rating: 4.6, reviews: 88 }
];

/** Servicios reservables y agenda. */
export const bookingServices = [
    { id: 'b1', name: { es: 'Consulta general', en: 'General consultation' }, minutes: 30, price: 80 },
    { id: 'b2', name: { es: 'Limpieza dental', en: 'Dental cleaning' }, minutes: 45, price: 120 },
    { id: 'b3', name: { es: 'Control anual', en: 'Annual check-up' }, minutes: 60, price: 150 }
];

/** Franjas del día: algunas ocupadas para que se note la lógica. */
export function slotsForDay(day) {
    const base = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
    return base.map((time, i) => ({ time, taken: (day * 7 + i * 3) % 5 === 0 }));
}

/** Nodos y aristas de la arquitectura de referencia. */
export const systemNodes = [
    { id: 'client', x: 60, y: 150, tech: ['React', 'Flutter'] },
    { id: 'cdn', x: 190, y: 150, tech: ['CloudFront', 'Vercel Edge'] },
    { id: 'api', x: 320, y: 150, tech: ['Node.js', 'Express', 'NestJS'] },
    { id: 'auth', x: 320, y: 50, tech: ['JWT', 'OAuth2'] },
    { id: 'cache', x: 450, y: 80, tech: ['Redis'] },
    { id: 'db', x: 450, y: 220, tech: ['PostgreSQL', 'MySQL'] },
    { id: 'queue', x: 580, y: 150, tech: ['RabbitMQ', 'BullMQ'] },
    { id: 'worker', x: 700, y: 150, tech: ['Node.js', 'Python'] }
];

export const systemEdges = [
    ['client', 'cdn'], ['cdn', 'api'], ['api', 'auth'], ['api', 'cache'], ['api', 'db'], ['api', 'queue'], ['queue', 'worker'], ['worker', 'db']
];

/** Latencias base (ms) por salto y región. */
export const hopLatency = {
    lima: { client: 0, cdn: 14, api: 22, auth: 6, cache: 3, db: 38, queue: 5, worker: 0 },
    virginia: { client: 0, cdn: 58, api: 96, auth: 6, cache: 3, db: 38, queue: 5, worker: 0 }
};

export const endpoints = [
    {
        id: 'orders', method: 'GET', path: '/api/v1/orders?status=paid&limit=3',
        response: {
            data: orders.filter(o => o.status === 'paid').slice(0, 3).map(o => ({ id: o.id, customer: o.customer, total: o.total, currency: 'PEN' })),
            meta: { total: 4, page: 1, limit: 3 }
        }
    },
    {
        id: 'booking', method: 'POST', path: '/api/v1/bookings',
        body: { serviceId: 'b2', date: '2026-09-03', time: '10:30', patient: { name: 'Lucía Fernández', phone: '+51 9•• ••• ••1' } },
        response: { id: 'BK-2291', status: 'confirmed', reminderAt: '2026-09-02T10:30:00-05:00', calendarUrl: 'https://calendar.app/BK-2291' }
    },
    {
        id: 'report', method: 'GET', path: '/api/v1/reports/sales?from=2026-01&to=2026-12',
        response: { currency: 'PEN', total: 927400, bestMonth: 'Dic', growthYoY: 0.186, byCategory: { apparel: 312300, footwear: 219500, accessories: 117800, home: 162900 } }
    }
];

/** Números medidos en este mismo sitio (build del 27 de agosto de 2026). */
export const perfBefore = { images: 8600, js: 530, requestsJs: 1, deps: 20, lcpHint: 'PNG 1 MB' };
export const perfAfter = { images: 848, js: 62, requestsJs: 5, deps: 10, lcpHint: 'WebP 59 KB' };
