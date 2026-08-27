import { useMemo, useState } from 'react';
import { AppHeader, TabBar, ScreenStack, SwipeRow, StateView, KeyboardMock, AppToast } from './shared/AppKit';
import { useStack, useAppToast } from './shared/hooks';
import { Icons } from './shared/icons';
import { shopProducts } from '../data/sampleData';
import { localeFor } from '../../../i18n/languages';
import './ShopApp.css';

const money = (n, lang) => new Intl.NumberFormat(localeFor(lang), { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 }).format(n);

const Tile = ({ p, onClick, lang, t }) => (
    <button type="button" className="shop-tile" onClick={onClick}>
        <span className="shop-tile-art" style={{ '--h': p.hue }} aria-hidden><i>{p.name.charAt(0)}</i></span>
        <span className="shop-tile-name">{t(`lab.apps.shop.products.${p.id}`, p.name)}</span>
        <span className="shop-tile-meta"><strong>{money(p.price, lang)}</strong><em>{Icons.star} {p.rating}</em></span>
    </button>
);

const ShopApp = ({ platform, lang, t, appState }) => {
    const [tab, setTab] = useState('home');
    const nav = useStack({ id: 'home' });
    const [cart, setCart] = useState([]);
    const [cat, setCat] = useState('all');
    const [query, setQuery] = useState('');
    const [kb, setKb] = useState(false);
    const [size, setSize] = useState('M');
    const [toast, setToast] = useAppToast();

    const cats = ['all', 'apparel', 'footwear', 'accessories', 'home'];
    const list = useMemo(() => shopProducts.filter(p => (cat === 'all' || p.category === cat) && (!query || p.name.toLowerCase().includes(query.toLowerCase()))), [cat, query]);
    const count = cart.reduce((a, c) => a + c.qty, 0);
    const total = cart.reduce((a, c) => a + c.qty * c.price, 0);

    const add = (p) => {
        setCart(prev => {
            const i = prev.findIndex(c => c.id === p.id && c.size === size);
            if (i >= 0) return prev.map((c, j) => (j === i ? { ...c, qty: c.qty + 1 } : c));
            return [...prev, { ...p, size, qty: 1 }];
        });
        setToast(t('lab.apps.shop.added'));
    };
    const changeQty = (id, sz, d) => setCart(prev => prev.map(c => (c.id === id && c.size === sz ? { ...c, qty: Math.max(1, c.qty + d) } : c)));
    const remove = (id, sz) => setCart(prev => prev.filter(c => !(c.id === id && c.size === sz)));

    const onTab = (id) => { setTab(id); nav.reset({ id }); setKb(false); };

    const tabs = [
        { id: 'home', label: t('lab.apps.shop.tabs.home'), icon: Icons.home },
        { id: 'search', label: t('lab.apps.shop.tabs.search'), icon: Icons.search },
        { id: 'cart', label: t('lab.apps.shop.tabs.cart'), icon: Icons.cart, badge: count }
    ];

    const stateLabels = {
        emptyTitle: t('lab.apps.states.emptyTitle'), emptyBody: t('lab.apps.states.emptyBody'),
        errorTitle: t('lab.apps.states.errorTitle'), errorBody: t('lab.apps.states.errorBody'), retry: t('lab.apps.states.retry')
    };

    const render = (screen) => {
        if (screen.id === 'product') {
            const p = screen.p;
            return (
                <>
                    <AppHeader title="" onBack={nav.pop} backLabel={t('lab.apps.back')} right={<span className="d-pill d-pill--good">{t('lab.apps.shop.inStock')}</span>} />
                    <div className="app-scroll">
                        <div className="shop-hero" style={{ '--h': p.hue }} aria-hidden><i>{p.name.charAt(0)}</i></div>
                        <div>
                            <h3 className="shop-name">{t(`lab.apps.shop.products.${p.id}`, p.name)}</h3>
                            <p className="shop-rating">{Icons.star} {p.rating} · {p.reviews} {t('lab.apps.shop.reviews')}</p>
                        </div>
                        <div className="shop-sizes" role="group" aria-label={t('lab.apps.shop.size')}>
                            {['S', 'M', 'L', 'XL'].map(s => (
                                <button key={s} type="button" className={`d-chip ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>{s}</button>
                            ))}
                        </div>
                        <p className="shop-desc">{t('lab.apps.shop.desc')}</p>
                    </div>
                    <div className="app-footer">
                        <strong>{money(p.price, lang)}</strong>
                        <button type="button" className="d-btn" onClick={() => add(p)}>{t('lab.apps.shop.addToCart')}</button>
                    </div>
                </>
            );
        }
        if (screen.id === 'success') {
            return (
                <div className="app-success">
                    <span className="app-success-icon">{Icons.check}</span>
                    <h3>{t('lab.apps.shop.successTitle')}</h3>
                    <p>{t('lab.apps.shop.successBody')}</p>
                    <button type="button" className="d-btn d-btn--soft" onClick={() => onTab('home')}>{t('lab.apps.shop.keepShopping')}</button>
                </div>
            );
        }
        if (screen.id === 'cart') {
            return (
                <>
                    <AppHeader title={t('lab.apps.shop.tabs.cart')} large subtitle={`${count} ${t('lab.apps.shop.items')}`} />
                    {cart.length === 0 ? (
                        <StateView state="empty" labels={{ ...stateLabels, emptyTitle: t('lab.apps.shop.cartEmpty'), emptyBody: t('lab.apps.shop.cartEmptyBody') }} />
                    ) : (
                        <>
                            <div className="app-scroll">
                                <p className="shop-swipe-hint">{t('lab.apps.swipeHint')}</p>
                                <div className="app-list">
                                    {cart.map(c => (
                                        <SwipeRow key={`${c.id}-${c.size}`} onDelete={() => remove(c.id, c.size)} deleteLabel={t('lab.apps.delete')}>
                                            <div className="app-row shop-cart-row">
                                                <span className="shop-cart-art" style={{ '--h': c.hue }} aria-hidden />
                                                <div className="app-row-main">
                                                    <span className="app-row-title">{t(`lab.apps.shop.products.${c.id}`, c.name)}</span>
                                                    <span className="app-row-sub">{t('lab.apps.shop.size')} {c.size} · {money(c.price, lang)}</span>
                                                </div>
                                                <div className="shop-qty">
                                                    <button type="button" onClick={() => changeQty(c.id, c.size, -1)} aria-label="−">−</button>
                                                    <span>{c.qty}</span>
                                                    <button type="button" onClick={() => changeQty(c.id, c.size, 1)} aria-label="+">+</button>
                                                </div>
                                            </div>
                                        </SwipeRow>
                                    ))}
                                </div>
                            </div>
                            <div className="app-footer">
                                <div className="shop-total"><span className="d-muted">{t('lab.apps.shop.total')}</span><strong>{money(total, lang)}</strong></div>
                                <button type="button" className="d-btn" onClick={() => { setCart([]); nav.push({ id: 'success' }); }}>{t('lab.apps.shop.checkout')}</button>
                            </div>
                        </>
                    )}
                </>
            );
        }
        if (screen.id === 'search') {
            return (
                <>
                    <AppHeader title={t('lab.apps.shop.tabs.search')} large />
                    <div className="app-scroll">
                        <input
                            className="d-input"
                            type="search"
                            placeholder={t('lab.apps.shop.searchPlaceholder')}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setKb(true)}
                            onBlur={() => setKb(false)}
                        />
                        {appState !== 'normal' ? <StateView state={appState} labels={stateLabels} /> : (
                            list.length === 0 ? <StateView state="empty" labels={stateLabels} /> : (
                                <div className="app-list">
                                    {list.map(p => (
                                        <button type="button" key={p.id} className="app-row" onClick={() => nav.push({ id: 'product', p })}>
                                            <span className="shop-cart-art" style={{ '--h': p.hue }} aria-hidden />
                                            <div className="app-row-main">
                                                <span className="app-row-title">{t(`lab.apps.shop.products.${p.id}`, p.name)}</span>
                                                <span className="app-row-sub">{t(`lab.web.categories.${p.category}`)}</span>
                                            </div>
                                            <div className="app-row-end"><strong>{money(p.price, lang)}</strong></div>
                                        </button>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                    <KeyboardMock visible={kb} platform={platform} />
                </>
            );
        }
        // home
        return (
            <>
                <AppHeader title={t('lab.apps.shop.hello')} subtitle={t('lab.apps.shop.tagline')} large right={<button type="button" className="shop-icon-btn" aria-label={t('lab.apps.notifications')}>{Icons.bell}</button>} />
                <div className="app-scroll">
                    <div className="app-chips" role="group">
                        {cats.map(c => (
                            <button key={c} type="button" className={`d-chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
                                {c === 'all' ? t('lab.apps.shop.all') : t(`lab.web.categories.${c}`)}
                            </button>
                        ))}
                    </div>
                    {appState !== 'normal' ? <StateView state={appState} labels={stateLabels} /> : (
                        <div className="shop-grid">
                            {list.map(p => <Tile key={p.id} p={p} lang={lang} t={t} onClick={() => nav.push({ id: 'product', p })} />)}
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="app shop-app">
            <ScreenStack nav={nav} platform={platform} render={render} />
            <AppToast message={toast} />
            <TabBar tabs={tabs} active={tab} onChange={onTab} platform={platform} />
        </div>
    );
};

export default ShopApp;
