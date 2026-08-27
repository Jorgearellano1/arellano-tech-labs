import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import SectionMotion from '../common/SectionMotion';
import './Process.css';

const STEPS = ['discovery', 'strategy', 'development', 'launch'];

/**
 * Libro abierto: página izquierda = índice; página derecha = capítulo actual.
 * Cambiar de capítulo pasa la página (rotateY desde el lomo).
 */
const Process = () => {
    const { t } = useTranslation();
    const reduce = useReducedMotion();
    const [page, setPage] = useState(0);
    const [dir, setDir] = useState(1);

    const go = useCallback((next) => {
        const n = (next + STEPS.length) % STEPS.length;
        setDir(n > page || (page === STEPS.length - 1 && n === 0) ? 1 : -1);
        setPage(n);
    }, [page]);

    const onKey = (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(page + 1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(page - 1); }
    };

    const variants = reduce
        ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
        : {
            enter: (d) => ({ rotateY: d > 0 ? -100 : 0, opacity: d > 0 ? 0.2 : 1, x: d > 0 ? 0 : 0 }),
            center: { rotateY: 0, opacity: 1, x: 0 },
            exit: (d) => ({ rotateY: d > 0 ? 0 : -100, opacity: d > 0 ? 1 : 0.2 })
        };

    const id = STEPS[page];

    return (
        <section className="section section-surface-alt process" id="proceso">
            <SectionMotion className="section-motion-inner">
                <div className="container container--wide">
                    <div className="section-header">
                        <h2 className="section-title">
                            {t('process.title')} <span className="gradient-text">{t('process.titleAccent')}</span>
                        </h2>
                        <p className="section-subtitle">{t('process.subtitle')}</p>
                    </div>

                    <div className="book" onKeyDown={onKey}>
                        <div className="book-page book-page--left">
                            <span className="book-kicker">{t('process.bookIndex')}</span>
                            <ol className="book-index" role="tablist" aria-label={t('process.title')}>
                                {STEPS.map((s, i) => (
                                    <li key={s}>
                                        <button
                                            type="button"
                                            role="tab"
                                            aria-selected={i === page}
                                            className={`book-index-item ${i === page ? 'active' : ''}`}
                                            onClick={() => go(i)}
                                        >
                                            <span className="book-index-num">0{i + 1}</span>
                                            <span className="book-index-title">{t(`process.steps.${s}.title`)}</span>
                                            <span className="book-index-dots" aria-hidden />
                                            <span className="book-index-page" aria-hidden>{i + 1}</span>
                                        </button>
                                    </li>
                                ))}
                            </ol>
                            <p className="book-hint">{t('process.bookHint')}</p>
                        </div>

                        <div className="book-spine" aria-hidden />

                        <div className="book-page book-page--right">
                            <div className="book-sheet-stack" aria-hidden><i /><i /><i /></div>
                            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
                                <Motion.article
                                    key={id}
                                    className="book-chapter"
                                    custom={dir}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: reduce ? 0.15 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    role="tabpanel"
                                    aria-live="polite"
                                >
                                    <span className="book-chapter-num">0{page + 1}</span>
                                    <h3 className="book-chapter-title">{t(`process.steps.${id}.title`)}</h3>
                                    <p className="book-chapter-text">{t(`process.steps.${id}.description`)}</p>
                                    <ul className="book-chapter-list">
                                        {[0, 1, 2].map(k => <li key={k}>{t(`process.details.${id}.${k}`)}</li>)}
                                    </ul>
                                </Motion.article>
                            </AnimatePresence>

                            <div className="book-nav">
                                <span className="book-folio">{t('process.chapter')} {page + 1} / {STEPS.length}</span>
                                <div>
                                    <button type="button" className="book-arrow" onClick={() => go(page - 1)} aria-label={t('process.prev')}>←</button>
                                    <button type="button" className="book-arrow" onClick={() => go(page + 1)} aria-label={t('process.next')}>→</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionMotion>
        </section>
    );
};

export default Process;
