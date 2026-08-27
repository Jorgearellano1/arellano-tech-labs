import { useMemo, useState } from 'react';
import { AppHeader, TabBar, ScreenStack, SwipeRow, StateView, PullToRefresh, AppToast } from './shared/AppKit';
import { useStack, useAppToast } from './shared/hooks';
import { Icons } from './shared/icons';
import BarChart from '../charts/BarChart';
import { orders as seedOrders, salesByMonth, monthLabelsFor } from '../data/sampleData';
import { localeFor } from '../../../i18n/languages';
import './AdminApp.css';

const money = (n, lang) => new Intl.NumberFormat(localeFor(lang), { style: 'currency', currency: 'PEN', maximumFractionDigits: 0 }).format(n);
const STATUS_PILL = { paid: 'd-pill--good', pending: 'd-pill--warn', shipped: 'd-pill--info', cancelled: 'd-pill--bad' };

const AdminApp = ({ platform, lang, t, appState, mode, onSetMode, accentHex }) => {
    const [tab, setTab] = useState('dash');
    const nav = useStack({ id: 'dash' });
    const [orders, setOrders] = useState(seedOrders);
    const [filter, setFilter] = useState('all');
    const [notif, setNotif] = useState(true);
    const [toast, setToast] = useAppToast();

    const list = useMemo(() => orders.filter(o => filter === 'all' || o.status === filter), [orders, filter]);
    const revenueToday = orders.filter(o => o.status !== 'cancelled').reduce((a, o) => a + o.total, 0);
    const pending = orders.filter(o => o.status === 'pending').length;
    const monthLabels = monthLabelsFor(localeFor(lang));
    const chartData = salesByMonth.slice(6).map((r, i) => ({ label: monthLabels[6 + i], values: [r.reduce((a, b) => a + b, 0)] }));

    const onTab = (id) => { setTab(id); nav.reset({ id }); };
    const ago = (m) => (m < 60 ? `${m} min` : `${Math.round(m / 60)} h`);
    const advance = (id) => {
        setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: o.status === 'pending' ? 'paid' : o.status === 'paid' ? 'shipped' : o.status } : o)));
        setToast(t('lab.apps.admin.updated'));
    };

    const tabs = [
        { id: 'dash', label: t('lab.apps.admin.tabs.dash'), icon: Icons.chart },
        { id: 'orders', label: t('lab.apps.admin.tabs.orders'), icon: Icons.list, badge: pending },
        { id: 'settings', label: t('lab.apps.admin.tabs.settings'), icon: Icons.settings }
    ];

    const stateLabels = {
        emptyTitle: t('lab.apps.states.emptyTitle'), emptyBody: t('lab.apps.states.emptyBody'),
        errorTitle: t('lab.apps.states.errorTitle'), errorBody: t('lab.apps.states.errorBody'), retry: t('lab.apps.states.retry')
    };

    const OrderRow = ({ o, onClick }) => (
        <button type="button" className="app-row" onClick={onClick}>
            <span className="app-avatar">{o.customer.split(' ').map(w => w[0]).join('')}</span>
            <div className="app-row-main">
                <span className="app-row-title">{o.customer}</span>
                <span className="app-row-sub">{o.id} · {o.city} · {ago(o.minutesAgo)}</span>
            </div>
            <div className="app-row-end">
                <strong>{money(o.total, lang)}</strong>
                <span className={`d-pill ${STATUS_PILL[o.status]}`}>{t(`lab.apps.admin.status.${o.status}`)}</span>
            </div>
        </button>
    );

    const render = (screen) => {
        if (screen.id === 'order') {
            const o = orders.find(x => x.id === screen.orderId) || screen.o;
            return (
                <>
                    <AppHeader title={o.id} onBack={nav.pop} backLabel={t('lab.apps.back')} right={<span className={`d-pill ${STATUS_PILL[o.status]}`}>{t(`lab.apps.admin.status.${o.status}`)}</span>} />
                    <div className="app-scroll">
                        <div className="app-card ad-detail">
                            <div><span className="d-muted">{t('lab.apps.admin.customer')}</span><strong>{o.customer}</strong></div>
                            <div><span className="d-muted">{t('lab.apps.admin.city')}</span><strong>{o.city}</strong></div>
                            <div><span className="d-muted">{t('lab.apps.admin.items')}</span><strong>{o.items}</strong></div>
                            <div><span className="d-muted">{t('lab.apps.admin.total')}</span><strong>{money(o.total, lang)}</strong></div>
                        </div>
                        <div className="app-card">
                            <div className="d-card-title"><span>{t('lab.apps.admin.timeline')}</span></div>
                            <ol className="ad-timeline">
                                <li className="done"><b /><span>{t('lab.apps.admin.status.pending')}</span></li>
                                <li className={['paid', 'shipped'].includes(o.status) ? 'done' : ''}><b /><span>{t('lab.apps.admin.status.paid')}</span></li>
                                <li className={o.status === 'shipped' ? 'done' : ''}><b /><span>{t('lab.apps.admin.status.shipped')}</span></li>
                            </ol>
                        </div>
                    </div>
                    {['pending', 'paid'].includes(o.status) && (
                        <div className="app-footer">
                            <button type="button" className="d-btn" onClick={() => advance(o.id)}>
                                {o.status === 'pending' ? t('lab.apps.admin.markPaid') : t('lab.apps.admin.markShipped')}
                            </button>
                        </div>
                    )}
                </>
            );
        }
        if (screen.id === 'orders') {
            return (
                <>
                    <AppHeader title={t('lab.apps.admin.tabs.orders')} large subtitle={`${pending} ${t('lab.apps.admin.pendingCount')}`} />
                    <div className="app-scroll">
                        <div className="app-chips" role="group">
                            {['all', 'pending', 'paid', 'shipped', 'cancelled'].map(s => (
                                <button key={s} type="button" className={`d-chip ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
                                    {s === 'all' ? t('lab.apps.shop.all') : t(`lab.apps.admin.status.${s}`)}
                                </button>
                            ))}
                        </div>
                        {appState !== 'normal' ? <StateView state={appState} labels={stateLabels} /> : list.length === 0 ? <StateView state="empty" labels={stateLabels} /> : (
                            <PullToRefresh onRefresh={() => setToast(t('lab.apps.admin.refreshed'))} label={t('lab.apps.admin.refreshing')}>
                                <p className="ad-hint">{t('lab.apps.admin.pullHint')}</p>
                                <div className="app-list">
                                    {list.map(o => (
                                        <SwipeRow key={o.id} onDelete={() => { setOrders(prev => prev.filter(x => x.id !== o.id)); setToast(t('lab.apps.admin.archived')); }} deleteLabel={t('lab.apps.admin.archive')}>
                                            <OrderRow o={o} onClick={() => nav.push({ id: 'order', orderId: o.id, o })} />
                                        </SwipeRow>
                                    ))}
                                </div>
                            </PullToRefresh>
                        )}
                    </div>
                </>
            );
        }
        if (screen.id === 'settings') {
            return (
                <>
                    <AppHeader title={t('lab.apps.admin.tabs.settings')} large />
                    <div className="app-scroll">
                        <div className="app-card ad-settings">
                            <label className="ad-toggle">
                                <span>{t('lab.apps.admin.darkMode')}<small>{t('lab.apps.admin.darkModeHint')}</small></span>
                                <input type="checkbox" checked={mode !== 'light'} onChange={(e) => onSetMode?.(e.target.checked ? 'dark' : 'light')} />
                                <i />
                            </label>
                            <label className="ad-toggle">
                                <span>{t('lab.apps.admin.notifications')}<small>{t('lab.apps.admin.notificationsHint')}</small></span>
                                <input type="checkbox" checked={notif} onChange={(e) => setNotif(e.target.checked)} />
                                <i />
                            </label>
                            <div className="ad-setting-row">
                                <span>{t('lab.apps.admin.brandColor')}</span>
                                <span className="ad-swatch" style={{ background: accentHex }} aria-hidden />
                            </div>
                            <div className="ad-setting-row">
                                <span>{t('lab.apps.admin.version')}</span>
                                <span className="d-muted">2.4.0 · {platform === 'ios' ? 'iOS' : 'Android'}</span>
                            </div>
                        </div>
                        <p className="ad-hint">{t('lab.apps.admin.settingsHint')}</p>
                    </div>
                </>
            );
        }
        // dash
        return (
            <>
                <AppHeader title={t('lab.apps.admin.title')} large subtitle={t('lab.apps.admin.subtitle')} right={<button type="button" className="shop-icon-btn ad-icon-btn" aria-label={t('lab.apps.notifications')}>{Icons.bell}</button>} />
                <div className="app-scroll">
                    {appState !== 'normal' ? <StateView state={appState} labels={stateLabels} /> : (
                        <>
                            <div className="ad-kpis">
                                <div className="app-card ad-kpi"><span className="d-muted">{t('lab.apps.admin.kpi.sales')}</span><strong>{money(revenueToday, lang)}</strong><em>▲ 8.2%</em></div>
                                <div className="app-card ad-kpi"><span className="d-muted">{t('lab.apps.admin.kpi.orders')}</span><strong>{orders.length}</strong><em>▲ 3</em></div>
                                <div className="app-card ad-kpi"><span className="d-muted">{t('lab.apps.admin.kpi.pending')}</span><strong>{pending}</strong><em className="warn">{t('lab.apps.admin.kpi.attention')}</em></div>
                            </div>
                            <div className="app-card">
                                <div className="d-card-title"><span>{t('lab.apps.admin.chartTitle')}</span></div>
                                <BarChart data={chartData} series={[{ name: t('lab.web.kpi.revenue'), color: 'var(--d-accent)' }]} height={150} showLegend={false} locale={localeFor(lang)} ariaLabel={t('lab.apps.admin.chartTitle')} />
                            </div>
                            <div className="d-card-title"><span>{t('lab.apps.admin.recent')}</span><button type="button" className="ad-link" onClick={() => onTab('orders')}>{t('lab.apps.admin.seeAll')} →</button></div>
                            <div className="app-list">
                                {orders.slice(0, 3).map(o => <OrderRow key={o.id} o={o} onClick={() => nav.push({ id: 'order', orderId: o.id, o })} />)}
                            </div>
                        </>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="app admin-app">
            <ScreenStack nav={nav} platform={platform} render={render} />
            <AppToast message={toast} />
            <TabBar tabs={tabs} active={tab} onChange={onTab} platform={platform} />
        </div>
    );
};

export default AdminApp;
