export const SCENE_IDS = ['web', 'ar', 'mobile', 'systems', 'perf'];

/** Abre una escena del laboratorio desde cualquier parte del sitio. */
export function openLab(scene, extra = {}) {
    window.dispatchEvent(new CustomEvent('lab:open', { detail: { scene, ...extra } }));
    const el = document.getElementById('laboratorio');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
