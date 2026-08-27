import { useMemo, useState } from 'react';
import { AppHeader, TabBar, ScreenStack, SwipeRow, StateView, KeyboardMock, AppToast } from './shared/AppKit';
import { useStack, useAppToast } from './shared/hooks';
import { Icons } from './shared/icons';
import { bookingServices, slotsForDay, weekdayInitialsFor } from '../data/sampleData';
import { localeFor } from '../../../i18n/languages';
import './BookingApp.css';

function monthGrid(year, month) {
    const first = new Date(year, month, 1);
    const days = new Date(year, month + 1, 0).getDate();
    const offset = (first.getDay() + 6) % 7; // lunes = 0
    return { offset, days };
}

const BookingApp = ({ platform, lang, t, appState }) => {
    const [tab, setTab] = useState('book');
    const nav = useStack({ id: 'services' });
    const [service, setService] = useState(null);
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(null);
    const [name, setName] = useState('');
    const [kb, setKb] = useState(false);
    const [appointments, setAppointments] = useState([
        { id: 'a1', service: bookingServices[0], day: 12, time: '10:30', name: 'Lucía F.' }
    ]);
    const [toast, setToast] = useAppToast();

    const today = useMemo(() => new Date(), []);
    const [monthOffset, setMonthOffset] = useState(0);
    const viewDate = useMemo(() => new Date(today.getFullYear(), today.getMonth() + monthOffset, 1), [today, monthOffset]);
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const isCurrentMonth = monthOffset === 0;
    const { offset, days } = monthGrid(year, month);
    const rawMonth = new Intl.DateTimeFormat(localeFor(lang), { month: 'long', year: 'numeric' }).format(viewDate);
    const monthName = rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1);
    const weekdays = weekdayInitialsFor(localeFor(lang));

    const onTab = (id) => { setTab(id); nav.reset({ id: id === 'book' ? 'services' : 'mine' }); setKb(false); };

    const confirm = () => {
        setAppointments(prev => [{ id: `a${Date.now()}`, service, day, time, name: name || t('lab.apps.booking.guest') }, ...prev]);
        setToast(t('lab.apps.booking.confirmedToast'));
        nav.push({ id: 'done' });
    };

    const restart = () => { setService(null); setDay(null); setTime(null); setName(''); onTab('book'); };

    const tabs = [
        { id: 'book', label: t('lab.apps.booking.tabs.book'), icon: Icons.calendar },
        { id: 'mine', label: t('lab.apps.booking.tabs.mine'), icon: Icons.list, badge: appointments.length }
    ];

    const stateLabels = {
        emptyTitle: t('lab.apps.states.emptyTitle'), emptyBody: t('lab.apps.states.emptyBody'),
        errorTitle: t('lab.apps.states.errorTitle'), errorBody: t('lab.apps.states.errorBody'), retry: t('lab.apps.states.retry')
    };

    const render = (screen) => {
        if (screen.id === 'mine') {
            return (
                <>
                    <AppHeader title={t('lab.apps.booking.tabs.mine')} large subtitle={`${appointments.length} ${t('lab.apps.booking.upcoming')}`} />
                    {appointments.length === 0 ? <StateView state="empty" labels={{ ...stateLabels, emptyTitle: t('lab.apps.booking.noAppointments'), emptyBody: t('lab.apps.booking.noAppointmentsBody') }} /> : (
                        <div className="app-scroll">
                            <p className="bk-hint">{t('lab.apps.swipeHint')}</p>
                            <div className="app-list">
                                {appointments.map(a => (
                                    <SwipeRow key={a.id} onDelete={() => setAppointments(prev => prev.filter(x => x.id !== a.id))} deleteLabel={t('lab.apps.booking.cancel')}>
                                        <div className="app-row">
                                            <span className="bk-date"><b>{a.day}</b><small>{monthName.slice(0, 3)}</small></span>
                                            <div className="app-row-main">
                                                <span className="app-row-title">{a.service.name[lang] || a.service.name.en}</span>
                                                <span className="app-row-sub">{a.time} · {a.service.minutes} min · {a.name}</span>
                                            </div>
                                            <span className="d-pill d-pill--good">{t('lab.apps.booking.confirmed')}</span>
                                        </div>
                                    </SwipeRow>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            );
        }
        if (screen.id === 'calendar') {
            return (
                <>
                    <AppHeader title={t('lab.apps.booking.pickDay')} onBack={nav.pop} backLabel={t('lab.apps.back')} />
                    <div className="app-scroll">
                        <div className="app-card bk-cal">
                            <div className="bk-cal-head">
                                <button type="button" className="bk-cal-nav" disabled={monthOffset === 0} onClick={() => { setMonthOffset(o => o - 1); setDay(null); setTime(null); }} aria-label="‹">‹</button>
                                <strong>{monthName}</strong>
                                <button type="button" className="bk-cal-nav" disabled={monthOffset >= 2} onClick={() => { setMonthOffset(o => o + 1); setDay(null); setTime(null); }} aria-label="›">›</button>
                            </div>
                            <div className="bk-cal-grid" role="grid">
                                {weekdays.map((w, i) => <span key={i} className="bk-cal-wd">{w}</span>)}
                                {Array.from({ length: offset }).map((_, i) => <span key={`o${i}`} />)}
                                {Array.from({ length: days }).map((_, i) => {
                                    const d = i + 1;
                                    const past = isCurrentMonth && d < today.getDate();
                                    const weekend = (offset + i) % 7 >= 5;
                                    return (
                                        <button
                                            key={d}
                                            type="button"
                                            className={`bk-day ${day === d ? 'active' : ''} ${isCurrentMonth && d === today.getDate() ? 'today' : ''}`}
                                            disabled={past || weekend}
                                            onClick={() => { setDay(d); setTime(null); }}
                                        >{d}</button>
                                    );
                                })}
                            </div>
                        </div>
                        {day && (
                            <div className="app-card">
                                <div className="d-card-title"><span>{t('lab.apps.booking.pickTime')}</span><span className="d-muted">{day} {monthName.slice(0, 3)}</span></div>
                                <div className="bk-slots">
                                    {slotsForDay(day).map(s => (
                                        <button key={s.time} type="button" className={`d-chip ${time === s.time ? 'active' : ''}`} disabled={s.taken} onClick={() => setTime(s.time)}>{s.time}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="app-footer">
                        <button type="button" className="d-btn" disabled={!day || !time} onClick={() => nav.push({ id: 'confirm' })}>{t('lab.apps.continue')}</button>
                    </div>
                </>
            );
        }
        if (screen.id === 'confirm') {
            return (
                <>
                    <AppHeader title={t('lab.apps.booking.confirmTitle')} onBack={nav.pop} backLabel={t('lab.apps.back')} />
                    <div className="app-scroll">
                        <div className="app-card bk-summary">
                            <div><span className="d-muted">{t('lab.apps.booking.service')}</span><strong>{service.name[lang] || service.name.en}</strong></div>
                            <div><span className="d-muted">{t('lab.apps.booking.when')}</span><strong>{day} {monthName} · {time}</strong></div>
                            <div><span className="d-muted">{t('lab.apps.booking.duration')}</span><strong>{service.minutes} min · S/ {service.price}</strong></div>
                        </div>
                        <label className="bk-field">
                            <span>{t('lab.apps.booking.yourName')}</span>
                            <input className="d-input" value={name} onChange={(e) => setName(e.target.value)} onFocus={() => setKb(true)} onBlur={() => setKb(false)} placeholder={t('lab.apps.booking.namePlaceholder')} />
                        </label>
                        <p className="bk-hint">{t('lab.apps.booking.reminder')}</p>
                    </div>
                    <div className="app-footer">
                        <button type="button" className="d-btn" onClick={confirm}>{t('lab.apps.booking.confirmCta')}</button>
                    </div>
                    <KeyboardMock visible={kb} platform={platform} />
                </>
            );
        }
        if (screen.id === 'done') {
            return (
                <div className="app-success">
                    <span className="app-success-icon">{Icons.check}</span>
                    <h3>{t('lab.apps.booking.doneTitle')}</h3>
                    <p>{day} {monthName} · {time}</p>
                    <button type="button" className="d-btn d-btn--soft" onClick={() => onTab('mine')}>{t('lab.apps.booking.seeMine')}</button>
                    <button type="button" className="d-btn d-btn--ghost" onClick={restart}>{t('lab.apps.booking.bookAnother')}</button>
                </div>
            );
        }
        // services
        return (
            <>
                <AppHeader title={t('lab.apps.booking.title')} large subtitle={t('lab.apps.booking.subtitle')} />
                <div className="app-scroll">
                    {appState !== 'normal' ? <StateView state={appState} labels={stateLabels} /> : (
                        <div className="app-list">
                            {bookingServices.map(s => (
                                <button key={s.id} type="button" className={`app-row ${service?.id === s.id ? 'bk-selected' : ''}`} onClick={() => { setService(s); nav.push({ id: 'calendar' }); }}>
                                    <span className="app-avatar">{s.minutes}′</span>
                                    <div className="app-row-main">
                                        <span className="app-row-title">{s.name[lang] || s.name.en}</span>
                                        <span className="app-row-sub">{s.minutes} min</span>
                                    </div>
                                    <div className="app-row-end"><strong>S/ {s.price}</strong></div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="app booking-app">
            <ScreenStack nav={nav} platform={platform} render={render} />
            <AppToast message={toast} />
            <TabBar tabs={tabs} active={tab} onChange={onTab} platform={platform} />
        </div>
    );
};

export default BookingApp;
