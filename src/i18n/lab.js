/**
 * Textos del Laboratorio (ES / EN). Se fusionan en config.js bajo la clave `lab`
 * y, para servicios y navegación, se añaden claves sueltas.
 */
const shopProducts = {
    es: { s1: 'Zapatilla Urbana', s2: 'Casaca Andes', s3: 'Mochila 24L', s4: 'Reloj Minimal', s5: 'Bota Trekking', s6: 'Lámpara Nórdica', s7: 'Polo Costa', s8: 'Lentes Polarizados' },
    en: { s1: 'Urban Sneaker', s2: 'Andes Jacket', s3: '24L Backpack', s4: 'Minimal Watch', s5: 'Trekking Boot', s6: 'Nordic Lamp', s7: 'Coast Tee', s8: 'Polarized Glasses' }
};

export const labEs = {
    title: 'Pruébalo en el',
    titleAccent: 'laboratorio',
    subtitle: 'No te contamos lo que hacemos: te lo damos para que lo toques. Cinco escenas, una por servicio, y todas funcionan.',
    tabs: {
        web: { label: 'Web', caption: 'Paleta, tabla y gráficos vivos' },
        ar: { label: 'Realidad aumentada', caption: 'Totemiq, en vivo' },
        mobile: { label: 'Apps móviles', caption: 'Un teléfono que obedece' },
        systems: { label: 'Sistemas', caption: 'Arquitectura que se mueve' },
        perf: { label: 'Optimización', caption: 'Medido en esta misma web' }
    },
    frame: { viewport: 'Tamaño de pantalla', desktop: 'Escritorio', tablet: 'Tablet', mobile: 'Móvil' },
    controls: {
        palette: 'Paleta', mode: 'Modo', light: 'Claro', dark: 'Oscuro', accent: 'Color de marca', customColor: 'Elegir un color',
        platform: 'Plataforma', textSize: 'Tamaño de texto', density: 'Densidad', comfortable: 'Cómoda', compact: 'Compacta',
        language: 'Idioma', state: 'Estado de la app',
        states: { normal: 'Normal', loading: 'Cargando', empty: 'Vacío', error: 'Error' }
    },
    web: {
        intro: { title: 'Un panel real, no una captura', body: 'Cambia la paleta y todo se recolorea al instante. Ordena la tabla, filtra por categoría y mira cómo los gráficos responden. Achica el marco para ver cómo se adapta.' },
        chartType: 'Tipo de gráfico', bars: 'Barras', lines: 'Líneas',
        applySite: 'Aplicar a toda la web', applySiteHint: 'Recolorea también esta página',
        hint: 'Todo lo que ves dentro del marco son componentes propios: gráficos SVG sin librerías, tabla con ordenamiento real y tokens de diseño que responden a la paleta.',
        dashboardTitle: 'Panel de ventas', period: 'Periodo', monthsShort: 'm', export: 'Exportar',
        kpi: { revenue: 'Ventas', orders: 'Órdenes', ticket: 'Ticket promedio', conversion: 'Conversión' },
        chartTitle: 'Ventas por mes', share: 'Participación',
        tableTitle: 'Productos', search: 'Buscar producto…', page: 'Página', noResults: 'Ningún producto coincide.',
        table: { product: 'Producto', category: 'Categoría', units: 'Unidades', revenue: 'Ingresos', trend: 'Tendencia', stock: 'Stock' },
        categories: { apparel: 'Ropa', footwear: 'Calzado', accessories: 'Accesorios', home: 'Hogar' }
    },
    ar: {
        intro: { title: 'Totemiq, en vivo', body: 'Esto no es un video: es la experiencia AR que construimos para Totemiq, cargada dentro del teléfono. La versión completa necesita la cámara de tu celular.' },
        steps: { scan: 'Escanea el QR con la cámara de tu celular.', allow: 'Permite el acceso a la cámara cuando lo pida.', point: 'Apunta a una obra o a una superficie plana y explora.' },
        qrAlt: 'Código QR para abrir ar.totemiq.art', qrTitle: 'Ábrelo en tu celular',
        openPhone: 'Abrir experiencia AR', openTab: 'Abrir en una pestaña', seeLauncher: 'Ver la app que lo lanza',
        cameraNote: 'Dentro de esta página el navegador bloquea la cámara de un sitio incrustado; por eso el QR. En tu celular corre completo.',
        phoneLabel: 'Teléfono con la experiencia AR de Totemiq', iframeTitle: 'Experiencia AR de Totemiq',
        loading: 'Conectando con ar.totemiq.art…', unavailable: 'La experiencia no respondió. Puedes abrirla directamente.', retry: 'Reintentar',
        mobileHint: 'Estás en un celular: la experiencia AR se ve mejor a pantalla completa y con tu cámara.', embedAnyway: 'Verla aquí de todos modos',
        live: 'En vivo desde ar.totemiq.art', offline: 'Sin conexión con la experiencia', connecting: 'Conectando…',
        galleryTitle: 'Capturas reales del proyecto'
    },
    mobile: {
        intro: { title: 'Un teléfono que obedece', body: 'Elige una app y cámbiale el tema, el color, la plataforma o el tamaño de texto. Todo se rehace al instante porque el sistema de diseño está hecho con tokens, no con colores sueltos.' },
        app: 'App', phoneLabel: 'Teléfono de demostración',
        apps: {
            shop: { label: 'Tienda', caption: 'Catálogo y carrito' },
            booking: { label: 'Reservas', caption: 'Agenda y confirmación' },
            admin: { label: 'Panel', caption: 'El sistema, en móvil' },
            ar: { label: 'Lanzador AR', caption: 'Escanea y abre' }
        },
        caption: 'Arrastra las filas hacia la izquierda, toca los campos y navega: los gestos son reales.',
        hint: 'iOS y Android no solo cambian de aspecto: cambian las curvas, la tipografía, la barra de pestañas y la transición entre pantallas.'
    },
    systems: {
        intro: { title: 'Arquitectura que se mueve', body: 'Esta es la arquitectura de referencia con la que construimos sistemas. Toca un componente para saber qué hace y lanza una petición para ver cuánto tarda en cada salto.' },
        region: 'Región del servidor', load: 'Carga', cache: 'Caché activa', cacheHint: 'Apágala y mira cuánto sube',
        simulate: 'Simular petición', running: 'Simulando…', totalLatency: 'Latencia total',
        verdict: { fast: 'Respuesta casi instantánea. Así se siente un sistema bien cacheado y cerca del usuario.', ok: 'Aceptable, pero cada salto suma. Aquí es donde entra la optimización.', slow: 'Esto es lo que pasa sin caché, lejos del usuario y bajo carga: la cola absorbe el pico y el usuario espera.' },
        seeAsApp: 'Ver el panel como app móvil',
        diagramLabel: 'Diagrama de arquitectura: cliente, CDN, API, autenticación, caché, base de datos, cola y worker',
        diagramHint: 'Toca un nodo para ver su rol. Los nodos apagados no participan con la configuración actual.',
        component: 'Componente', ifFails: 'Si falla:',
        nodes: {
            client: { name: 'Cliente', desc: 'La app web o móvil que usa la persona. Guarda estado local, valida antes de enviar y muestra cambios optimistas para que todo se sienta inmediato.', fail: 'la persona ve un error claro y puede reintentar sin perder lo que escribió.' },
            cdn: { name: 'CDN', desc: 'Red de servidores cerca del usuario que sirve los archivos estáticos y cachea respuestas. Es la razón por la que la primera carga es rápida aunque el servidor esté lejos.', fail: 'el tráfico pasa directo al origen: sigue funcionando, solo más lento.' },
            api: { name: 'API', desc: 'El punto de entrada. Valida cada petición, aplica reglas de negocio y coordina con los demás servicios. Sin estado, así que se puede replicar cuando hay carga.', fail: 'un balanceador desvía el tráfico a otra réplica; nadie se entera.' },
            auth: { name: 'Autenticación', desc: 'Verifica quién eres y qué puedes hacer. Emite tokens firmados con expiración corta y refresca sesiones sin pedir contraseña otra vez.', fail: 'las sesiones vigentes siguen válidas hasta que expiran; los nuevos inicios de sesión esperan.' },
            cache: { name: 'Caché', desc: 'Memoria ultrarrápida con las respuestas más consultadas. Una lectura aquí cuesta milisegundos en vez de decenas. Se invalida cuando el dato cambia.', fail: 'todo va a la base de datos: funciona, pero la latencia sube y la base sufre.' },
            db: { name: 'Base de datos', desc: 'La fuente de verdad. Relacional, con índices pensados para las consultas reales, respaldos automáticos y réplica de lectura para reportes.', fail: 'se promueve la réplica; las escrituras se pausan segundos, las lecturas siguen.' },
            queue: { name: 'Cola', desc: 'Amortiguador para tareas que no necesitan respuesta inmediata: correos, reportes, integraciones. Bajo carga absorbe el pico en vez de tumbar la API.', fail: 'los trabajos se acumulan y se procesan cuando vuelve; nada se pierde.' },
            worker: { name: 'Worker', desc: 'Procesos que consumen la cola: generan PDFs, envían notificaciones, sincronizan con terceros. Se escalan aparte de la API.', fail: 'la cola crece; se levantan más workers y se ponen al día.' }
        },
        notes: { edge: 'borde', load: 'con carga', jwt: 'token', hit: 'acierto', miss: 'fallo', query: 'consulta', async: 'asíncrono', response: 'respuesta' },
        endpoints: { orders: 'Órdenes', booking: 'Reservar', report: 'Reporte' }
    },
    perf: {
        intro: { title: 'Medido en esta misma web', body: 'No es un caso de estudio ajeno. Estos son los números de ajmptech.com antes y después de la optimización que hicimos al construir este laboratorio.' },
        toggle: 'Antes o después', before: 'Antes', after: 'Después', hero: 'Imagen más pesada',
        rows: { images: 'Imágenes', js: 'JavaScript', jsInitial: 'JS inicial', deps: 'Dependencias', chunks: 'Archivos JS' },
        tableTitle: 'Qué cambió',
        measuredNote: 'Medido en el build de producción del 27 de agosto de 2026: peso de imágenes en src/assets, tamaño del chunk inicial y dependencias declaradas.',
        compareTitle: 'Misma foto, 40 veces menos', sliderLabel: 'Comparar PNG y WebP',
        compareHint: 'Arrastra para comparar. La versión PNG original se descarga solo cuando corres la prueba de abajo.', compareLoaded: 'Ahora sí estás viendo el PNG original a la izquierda. ¿Notas la diferencia? Nosotros tampoco.',
        raceTitle: 'Pruébalo con tu conexión', raceBody: 'Descarga las dos versiones de la misma imagen desde tu red y compara cuánto tardan.',
        raceCta: 'Descargar y medir', racing: 'Midiendo…', raceAgain: 'Medir otra vez',
        raceVerdict: 'El WebP llegó {{x}} veces más rápido en tu conexión.', raceError: 'No se pudo completar la medición. Intenta de nuevo.',
        liveTitle: 'Esta visita, en números', liveBody: 'Datos reales de tu navegador sobre la carga de esta página.', liveWaiting: 'Esperando a que termine de cargar…',
        live: { ttfb: 'Primer byte', dcl: 'DOM listo', load: 'Carga completa', requests: 'Peticiones', transfer: 'Transferido', conn: 'Conexión', unknown: 'No informada' }
    },
    apps: {
        back: 'Atrás', continue: 'Continuar', delete: 'Eliminar', notifications: 'Notificaciones', swipeHint: 'Desliza una fila a la izquierda para eliminarla.',
        states: { emptyTitle: 'Nada por aquí', emptyBody: 'Cuando haya datos, aparecerán en esta lista.', errorTitle: 'Algo salió mal', errorBody: 'No pudimos cargar la información. Revisa tu conexión.', retry: 'Reintentar' },
        shop: {
            tabs: { home: 'Inicio', search: 'Buscar', cart: 'Carrito' },
            hello: 'Hola, Lucía', tagline: 'Novedades de esta semana', all: 'Todo', reviews: 'reseñas', inStock: 'En stock', size: 'Talla',
            desc: 'Materiales de primera, envío en 48 h a todo el país y devolución gratis durante 30 días.',
            addToCart: 'Agregar al carrito', added: 'Agregado al carrito', items: 'artículos', total: 'Total', checkout: 'Pagar',
            cartEmpty: 'Tu carrito está vacío', cartEmptyBody: 'Explora el catálogo y agrega lo que te guste.',
            successTitle: '¡Pedido confirmado!', successBody: 'Te enviamos el detalle por correo. Llega en 48 horas.', keepShopping: 'Seguir comprando',
            searchPlaceholder: 'Buscar productos…',
            products: shopProducts.es
        },
        booking: {
            tabs: { book: 'Reservar', mine: 'Mis citas' },
            title: 'Reserva una cita', subtitle: 'Elige el servicio para empezar', upcoming: 'próximas',
            pickDay: 'Elige el día', pickTime: 'Elige la hora', confirmTitle: 'Confirmar reserva',
            service: 'Servicio', when: 'Cuándo', duration: 'Duración', yourName: 'Tu nombre', namePlaceholder: 'Nombre y apellido', guest: 'Invitado',
            reminder: 'Te recordaremos por WhatsApp 24 horas antes.', confirmCta: 'Confirmar reserva', confirmedToast: 'Reserva confirmada',
            doneTitle: '¡Cita reservada!', seeMine: 'Ver mis citas', bookAnother: 'Reservar otra', confirmed: 'Confirmada', cancel: 'Cancelar',
            noAppointments: 'Sin citas próximas', noAppointmentsBody: 'Reserva una desde la pestaña Reservar.'
        },
        admin: {
            tabs: { dash: 'Panel', orders: 'Órdenes', settings: 'Ajustes' },
            title: 'Buenos días', subtitle: 'Resumen de hoy', recent: 'Órdenes recientes', seeAll: 'Ver todas', chartTitle: 'Ventas últimos 6 meses',
            kpi: { sales: 'Ventas hoy', orders: 'Órdenes', pending: 'Pendientes', attention: 'Requieren acción' },
            pendingCount: 'pendientes de pago', pullHint: 'Tira hacia abajo para actualizar. Desliza una orden a la izquierda para archivarla.',
            refreshing: 'Actualizando…', refreshed: 'Órdenes actualizadas', archive: 'Archivar', archived: 'Orden archivada', updated: 'Estado actualizado',
            status: { paid: 'Pagada', pending: 'Pendiente', shipped: 'Enviada', cancelled: 'Cancelada' },
            customer: 'Cliente', city: 'Ciudad', items: 'Artículos', total: 'Total', timeline: 'Seguimiento', markPaid: 'Marcar como pagada', markShipped: 'Marcar como enviada',
            darkMode: 'Modo oscuro', darkModeHint: 'Este interruptor cambia el tema del teléfono', notifications: 'Notificaciones', notificationsHint: 'Nuevas órdenes y pagos',
            brandColor: 'Color de marca', version: 'Versión', settingsHint: 'Los ajustes de la app hablan con el mismo sistema de tokens que los controles de afuera.'
        },
        ar: {
            kicker: 'Totems del Inca', title: 'Descubre la historia detrás de cada tótem', body: 'Apunta la cámara a una pieza y verás su reconstrucción en 3D con la historia de quien la talló.',
            scan: 'Escanear obra', scanning: 'Buscando marcadores…', detected: 'Obra detectada', match: 'Coincidencia',
            pieceName: 'Tótem del Sol · Sala 2', pieceBody: 'Talla en madera de cedro, 1,8 m. Representa al Inti y a los cuatro suyos del Tahuantinsuyo.',
            model: 'Modelo 3D', tracking: 'Seguimiento', trackingValue: 'Marcador + plano', openReal: 'Abrir la experiencia real'
        }
    }
};

export const labEn = {
    title: 'Try it in the',
    titleAccent: 'lab',
    subtitle: "We don't tell you what we do — we hand it to you. Five scenes, one per service, and every one of them works.",
    tabs: {
        web: { label: 'Web', caption: 'Live palette, table and charts' },
        ar: { label: 'Augmented reality', caption: 'Totemiq, live' },
        mobile: { label: 'Mobile apps', caption: 'A phone that obeys' },
        systems: { label: 'Systems', caption: 'Architecture in motion' },
        perf: { label: 'Optimization', caption: 'Measured on this very site' }
    },
    frame: { viewport: 'Screen size', desktop: 'Desktop', tablet: 'Tablet', mobile: 'Mobile' },
    controls: {
        palette: 'Palette', mode: 'Mode', light: 'Light', dark: 'Dark', accent: 'Brand color', customColor: 'Pick a color',
        platform: 'Platform', textSize: 'Text size', density: 'Density', comfortable: 'Comfortable', compact: 'Compact',
        language: 'Language', state: 'App state',
        states: { normal: 'Normal', loading: 'Loading', empty: 'Empty', error: 'Error' }
    },
    web: {
        intro: { title: 'A real dashboard, not a screenshot', body: 'Switch the palette and everything recolors instantly. Sort the table, filter by category and watch the charts respond. Shrink the frame to see it adapt.' },
        chartType: 'Chart type', bars: 'Bars', lines: 'Lines',
        applySite: 'Apply to the whole site', applySiteHint: 'Recolors this page too',
        hint: 'Everything inside the frame is our own: SVG charts with no libraries, a table with real sorting, and design tokens that follow the palette.',
        dashboardTitle: 'Sales dashboard', period: 'Period', monthsShort: 'm', export: 'Export',
        kpi: { revenue: 'Revenue', orders: 'Orders', ticket: 'Avg. ticket', conversion: 'Conversion' },
        chartTitle: 'Revenue by month', share: 'Share',
        tableTitle: 'Products', search: 'Search product…', page: 'Page', noResults: 'No product matches.',
        table: { product: 'Product', category: 'Category', units: 'Units', revenue: 'Revenue', trend: 'Trend', stock: 'Stock' },
        categories: { apparel: 'Apparel', footwear: 'Footwear', accessories: 'Accessories', home: 'Home' }
    },
    ar: {
        intro: { title: 'Totemiq, live', body: "This isn't a video: it's the AR experience we built for Totemiq, loaded inside the phone. The full version needs your phone's camera." },
        steps: { scan: 'Scan the QR with your phone camera.', allow: 'Allow camera access when asked.', point: 'Point at an artwork or a flat surface and explore.' },
        qrAlt: 'QR code to open ar.totemiq.art', qrTitle: 'Open it on your phone',
        openPhone: 'Open AR experience', openTab: 'Open in a new tab', seeLauncher: 'See the app that launches it',
        cameraNote: 'Inside this page the browser blocks the camera for an embedded site — hence the QR. On your phone it runs in full.',
        phoneLabel: "Phone showing Totemiq's AR experience", iframeTitle: 'Totemiq AR experience',
        loading: 'Connecting to ar.totemiq.art…', unavailable: "The experience didn't respond. You can open it directly.", retry: 'Retry',
        mobileHint: "You're on a phone: the AR experience works best full-screen with your camera.", embedAnyway: 'Show it here anyway',
        live: 'Live from ar.totemiq.art', offline: 'No connection to the experience', connecting: 'Connecting…',
        galleryTitle: 'Real captures from the project'
    },
    mobile: {
        intro: { title: 'A phone that obeys', body: 'Pick an app and change its theme, color, platform or text size. Everything rebuilds instantly because the design system is built on tokens, not loose colors.' },
        app: 'App', phoneLabel: 'Demo phone',
        apps: {
            shop: { label: 'Store', caption: 'Catalog and cart' },
            booking: { label: 'Booking', caption: 'Schedule and confirm' },
            admin: { label: 'Dashboard', caption: 'The system, on mobile' },
            ar: { label: 'AR launcher', caption: 'Scan and open' }
        },
        caption: 'Swipe rows left, tap fields and navigate: the gestures are real.',
        hint: "iOS and Android don't just look different: corners, typography, tab bar and screen transitions all change."
    },
    systems: {
        intro: { title: 'Architecture in motion', body: 'This is the reference architecture we build systems on. Tap a component to learn what it does, then fire a request to see how long each hop takes.' },
        region: 'Server region', load: 'Load', cache: 'Cache enabled', cacheHint: 'Turn it off and watch the number climb',
        simulate: 'Simulate request', running: 'Simulating…', totalLatency: 'Total latency',
        verdict: { fast: "Near-instant. That's what a well-cached system close to the user feels like.", ok: 'Acceptable, but every hop adds up. This is where optimization comes in.', slow: "This is what happens without cache, far from the user and under load: the queue absorbs the spike and the user waits." },
        seeAsApp: 'See the dashboard as a mobile app',
        diagramLabel: 'Architecture diagram: client, CDN, API, auth, cache, database, queue and worker',
        diagramHint: "Tap a node to see its role. Dimmed nodes don't take part with the current settings.",
        component: 'Component', ifFails: 'If it fails:',
        nodes: {
            client: { name: 'Client', desc: 'The web or mobile app the person uses. Keeps local state, validates before sending and shows optimistic updates so everything feels immediate.', fail: 'the person sees a clear error and can retry without losing what they typed.' },
            cdn: { name: 'CDN', desc: 'Servers near the user that deliver static files and cache responses. The reason the first load is fast even when the origin is far away.', fail: 'traffic goes straight to the origin: still works, just slower.' },
            api: { name: 'API', desc: 'The entry point. Validates every request, applies business rules and coordinates the other services. Stateless, so it can be replicated under load.', fail: 'a load balancer routes traffic to another replica; nobody notices.' },
            auth: { name: 'Auth', desc: 'Checks who you are and what you can do. Issues short-lived signed tokens and refreshes sessions without asking for the password again.', fail: 'active sessions stay valid until they expire; new sign-ins wait.' },
            cache: { name: 'Cache', desc: 'Ultra-fast memory holding the most-requested answers. A read here costs milliseconds instead of dozens. Invalidated when the data changes.', fail: 'everything hits the database: it works, but latency rises and the database strains.' },
            db: { name: 'Database', desc: 'The source of truth. Relational, with indexes designed for the real queries, automatic backups and a read replica for reports.', fail: 'the replica is promoted; writes pause for seconds, reads continue.' },
            queue: { name: 'Queue', desc: "A buffer for work that doesn't need an immediate answer: emails, reports, integrations. Under load it absorbs the spike instead of taking the API down.", fail: 'jobs pile up and get processed when it returns; nothing is lost.' },
            worker: { name: 'Worker', desc: 'Processes that consume the queue: generate PDFs, send notifications, sync with third parties. Scaled independently of the API.', fail: 'the queue grows; more workers spin up and catch up.' }
        },
        notes: { edge: 'edge', load: 'under load', jwt: 'token', hit: 'hit', miss: 'miss', query: 'query', async: 'async', response: 'response' },
        endpoints: { orders: 'Orders', booking: 'Book', report: 'Report' }
    },
    perf: {
        intro: { title: 'Measured on this very site', body: "Not someone else's case study. These are ajmptech.com's numbers before and after the optimization we did while building this lab." },
        toggle: 'Before or after', before: 'Before', after: 'After', hero: 'Heaviest image',
        rows: { images: 'Images', js: 'JavaScript', jsInitial: 'Initial JS', deps: 'Dependencies', chunks: 'JS files' },
        tableTitle: 'What changed',
        measuredNote: 'Measured on the production build of August 27, 2026: image weight in src/assets, initial chunk size and declared dependencies.',
        compareTitle: 'Same photo, 40× lighter', sliderLabel: 'Compare PNG and WebP',
        compareHint: 'Drag to compare. The original PNG only downloads when you run the test below.', compareLoaded: "Now you're really seeing the original PNG on the left. Spot the difference? Neither can we.",
        raceTitle: 'Test it on your connection', raceBody: 'Download both versions of the same image over your network and compare how long they take.',
        raceCta: 'Download and measure', racing: 'Measuring…', raceAgain: 'Measure again',
        raceVerdict: 'WebP arrived {{x}}× faster on your connection.', raceError: "Couldn't complete the measurement. Try again.",
        liveTitle: 'This visit, in numbers', liveBody: "Real data from your browser about this page's load.", liveWaiting: 'Waiting for the page to finish loading…',
        live: { ttfb: 'First byte', dcl: 'DOM ready', load: 'Fully loaded', requests: 'Requests', transfer: 'Transferred', conn: 'Connection', unknown: 'Not reported' }
    },
    apps: {
        back: 'Back', continue: 'Continue', delete: 'Delete', notifications: 'Notifications', swipeHint: 'Swipe a row left to delete it.',
        states: { emptyTitle: 'Nothing here yet', emptyBody: "When there's data, it will show up in this list.", errorTitle: 'Something went wrong', errorBody: "We couldn't load the data. Check your connection.", retry: 'Retry' },
        shop: {
            tabs: { home: 'Home', search: 'Search', cart: 'Cart' },
            hello: 'Hi, Lucía', tagline: "This week's new arrivals", all: 'All', reviews: 'reviews', inStock: 'In stock', size: 'Size',
            desc: 'Premium materials, 48-hour nationwide shipping and free returns for 30 days.',
            addToCart: 'Add to cart', added: 'Added to cart', items: 'items', total: 'Total', checkout: 'Checkout',
            cartEmpty: 'Your cart is empty', cartEmptyBody: 'Browse the catalog and add what you like.',
            successTitle: 'Order confirmed!', successBody: 'We emailed you the details. Arrives in 48 hours.', keepShopping: 'Keep shopping',
            searchPlaceholder: 'Search products…',
            products: shopProducts.en
        },
        booking: {
            tabs: { book: 'Book', mine: 'My visits' },
            title: 'Book a visit', subtitle: 'Pick a service to start', upcoming: 'upcoming',
            pickDay: 'Pick a day', pickTime: 'Pick a time', confirmTitle: 'Confirm booking',
            service: 'Service', when: 'When', duration: 'Duration', yourName: 'Your name', namePlaceholder: 'First and last name', guest: 'Guest',
            reminder: "We'll remind you on WhatsApp 24 hours before.", confirmCta: 'Confirm booking', confirmedToast: 'Booking confirmed',
            doneTitle: 'Visit booked!', seeMine: 'See my visits', bookAnother: 'Book another', confirmed: 'Confirmed', cancel: 'Cancel',
            noAppointments: 'No upcoming visits', noAppointmentsBody: 'Book one from the Book tab.'
        },
        admin: {
            tabs: { dash: 'Dashboard', orders: 'Orders', settings: 'Settings' },
            title: 'Good morning', subtitle: "Today's summary", recent: 'Recent orders', seeAll: 'See all', chartTitle: 'Revenue, last 6 months',
            kpi: { sales: 'Sales today', orders: 'Orders', pending: 'Pending', attention: 'Need action' },
            pendingCount: 'awaiting payment', pullHint: 'Pull down to refresh. Swipe an order left to archive it.',
            refreshing: 'Refreshing…', refreshed: 'Orders refreshed', archive: 'Archive', archived: 'Order archived', updated: 'Status updated',
            status: { paid: 'Paid', pending: 'Pending', shipped: 'Shipped', cancelled: 'Cancelled' },
            customer: 'Customer', city: 'City', items: 'Items', total: 'Total', timeline: 'Tracking', markPaid: 'Mark as paid', markShipped: 'Mark as shipped',
            darkMode: 'Dark mode', darkModeHint: "This switch changes the phone's theme", notifications: 'Notifications', notificationsHint: 'New orders and payments',
            brandColor: 'Brand color', version: 'Version', settingsHint: 'The in-app settings talk to the same token system as the controls outside.'
        },
        ar: {
            kicker: 'Totems del Inca', title: 'Discover the story behind every totem', body: "Point the camera at a piece and you'll see its 3D reconstruction with the story of who carved it.",
            scan: 'Scan artwork', scanning: 'Looking for markers…', detected: 'Artwork detected', match: 'Match',
            pieceName: 'Sun Totem · Room 2', pieceBody: 'Cedar wood carving, 1.8 m. Depicts Inti and the four suyus of the Tahuantinsuyo.',
            model: '3D model', tracking: 'Tracking', trackingValue: 'Marker + plane', openReal: 'Open the real experience'
        }
    }
};

export const extraEs = {
    nav: { lab: 'Laboratorio', projects: 'Proyectos' },
    services: {
        perf: { title: 'Optimización', description: 'Auditamos y aceleramos sitios existentes: imágenes, código, carga inicial y SEO técnico. Medimos antes y después.' },
        tryIt: 'Probar en el laboratorio'
    }
};

export const extraEn = {
    nav: { lab: 'Lab', projects: 'Projects' },
    services: {
        perf: { title: 'Optimization', description: 'We audit and speed up existing sites: images, code, initial load and technical SEO. Measured before and after.' },
        tryIt: 'Try it in the lab'
    }
};
