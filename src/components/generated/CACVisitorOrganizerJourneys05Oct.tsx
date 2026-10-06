import React, { useEffect, useRef, useState } from 'react';
import './cac.css';
import './cac-expanded.css';
import { programmes, programmeStatus, Programme } from './cac-programmes';
import { editorial, contact, social } from './cac-content';
import { HomeStories, HomeEnquiry, HomeNews, GeneralFaq, NewsPage, ArticlePage, FacilitiesPage, ContactPage, AboutModules } from './cac-pages';
const img = {
  theater: "https://storage.googleapis.com/storage.magicpath.ai/component-assets/457842786541146112/457842786541146113/27e419313fe527f716957331d9ecbf9d612a1e25050dd1849354536ef4642cdc.webp",
  gallery: "https://storage.googleapis.com/storage.magicpath.ai/component-assets/457842786541146112/457842786541146113/71147fdb679d06631699114500bbfc3d5bc3e14f496ca3be2ed9170c3a9f5b54.webp",
  museum: "https://storage.googleapis.com/storage.magicpath.ai/component-assets/457842786541146112/457842786541146113/255f73b8c32a441f171b11f4c7c9c7fab06a0255c5d23f3217db192d633eed28.webp"
};
const official = 'https://www.ciputraartpreneur.com';
const spaces = [{
  id: 'theater',
  name: 'Theater',
  tag: 'PERFORMANCES & PRESENTATIONS',
  head: 'A place to hold the room.',
  copy: 'An oval auditorium with a modular stage, orchestra pit and fly tower. Explore the setting for your next performance or gathering.',
  stat: '1,157',
  unit: 'seats',
  plan: 'https://ciputraartpreneur.com/assets/files/680076Floorplan-Theater-with-measurement.pdf'
}, {
  id: 'gallery',
  name: 'Gallery',
  tag: 'EXHIBITIONS & GATHERINGS',
  head: 'Room for your point of view.',
  copy: 'Three combinable halls for exhibitions, launches and gatherings. Start with the space, then discuss the setup your event needs.',
  stat: '1,500',
  unit: 'm² of gallery space',
  plan: 'https://ciputraartpreneur.com/assets/files/431108Floorplan-Gallery-with-measurement.pdf'
}, {
  id: 'museum',
  name: 'Museum',
  tag: 'HENDRA GUNAWAN COLLECTION',
  head: 'An encounter with Indonesian art.',
  copy: 'A collection of 32 paintings and 18 sketches by Hendra Gunawan. The museum is temporarily closed to visitors.',
  stat: 'Temporarily',
  unit: 'closed to visitors',
  plan: ''
}];
const stories = [{
  title: 'Beauty and the Beast',
  type: 'Performing arts',
  year: '2015',
  copy: 'The touring Broadway production came to the Theater in May 2015.',
  url: 'https://www.ciputraentrepreneurship.com/ce-news/tur-dunia-broadway-akan-singgahi-ciputra-artpreneur'
}, {
  title: 'Artpreneur Talk',
  type: 'Corporate',
  year: '2018',
  copy: 'An entrepreneurship programme at Ciputra Artpreneur Theatre.',
  url: 'https://www.ciputra.com/wp-content/uploads/2018/05/Ciputra-Newsletter-Edisi-April-2018-Low-Res.pdf'
}];
const A = ({
  up = false
}: {
  up?: boolean;
}) => <svg aria-hidden="true" width="21" height="21" viewBox="0 0 24 24" fill="none"><path d={up ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.5" /></svg>;
const I = ({
  type
}: {
  type: string;
}) => <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{type === 'calendar' ? <><rect x="4" y="5" width="16" height="16" rx="1" /><path d="M8 2v6m8-6v6M4 10h16m-12 4h3m2 0h3" /></> : type === 'pin' ? <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></> : type === 'search' ? <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></> : <path d="m4 12 5 5L20 6" />}</svg>;
const Btn = ({
  children,
  onClick,
  outline = false,
  light = false
}: {
  children: React.ReactNode;
  onClick: () => void;
  outline?: boolean;
  light?: boolean;
}) => <button className={'btn' + (outline ? ' outline' : '') + (light ? ' light' : '')} onClick={onClick}>{children}<A /></button>;
function Dialog({
  title,
  close,
  children
}: {
  title: string;
  close: () => void;
  children: React.ReactNode;
}) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prior = document.activeElement as HTMLElement;
    (r.current?.querySelector('button,a,input') as HTMLElement)?.focus();
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const a = Array.from(r.current?.querySelectorAll('button,a,input') || []) as HTMLElement[];
        if (e.shiftKey && document.activeElement === a[0]) {
          e.preventDefault();
          a[a.length - 1]?.focus();
        } else if (!e.shiftKey && document.activeElement === a[a.length - 1]) {
          e.preventDefault();
          a[0]?.focus();
        }
      }
    };
    document.addEventListener('keydown', fn);
    return () => {
      document.removeEventListener('keydown', fn);
      prior?.focus();
    };
  }, []);
  return <div className="overlay" onClick={close}><div ref={r} tabIndex={-1} className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}><button className="close" aria-label="Close dialog" onClick={close}>×</button>{children}</div></div>;
}
const routeNames = ['home', 'events', 'event', 'venues', 'venue', 'plan', 'visit', 'enquiry', 'about', 'facilities', 'news', 'article', 'contact', 'vision', 'awards', 'not-found'];
const venueViews: Record<string, string> = {
  overview: 'Overview',
  layouts: 'Configurations',
  specifications: 'Specifications',
  facilities: 'Facilities',
  technical: 'Technical info',
  support: 'Service support',
  'past-events': 'Past events'
};
const visitViews: Record<string, string> = {
  'getting-here': 'Getting here',
  'parking-arrival': 'Parking & arrival',
  accessibility: 'Accessibility',
  faq: 'FAQs'
};
const readRoute = (raw = typeof window !== 'undefined' ? window.location.hash.slice(1) : 'home') => {
  const [path, query = ''] = raw.split('?');
  const bits = path.split('/').filter(Boolean);
  const params = new URLSearchParams(query);
  let page = bits[0] || 'home',
    event = 'undertale',
    venue = 'theater',
    vt = 'Overview',
    at = 'Getting here',
    article = editorial[0].id,
    newsCategory = 'All',
    mode = 'Site visit';
  if (page === 'events' && bits[1]) {
    page = 'event';
    event = bits[1];
  }
  if (page === 'venues' && bits[1]) {
    if (bits[1] === 'facilities') page = 'facilities';else {
      page = 'venue';
      venue = bits[1];
      vt = venueViews[bits[2]] || 'Overview';
    }
  }
  if (page === 'news' && bits[1]) {
    if (bits[1] === 'updates') newsCategory = 'News';else if (bits[1] === 'articles') newsCategory = 'Article';else {
      page = 'article';
      article = bits[1];
    }
  }
  if (page === 'about' && bits[1]) page = bits[1] === 'vision' ? 'vision' : 'awards';
  if (page === 'visit' && bits[1]) at = visitViews[bits[1]] || 'Getting here';
  if (page === 'site-visit') page = 'enquiry';else if (page === 'enquiry') mode = 'Event enquiry';
  if (page === 'event' && !programmes.some(x => x.id === event)) page = 'not-found';
  if (page === 'venue' && !['theater', 'gallery', 'museum'].includes(venue)) page = 'not-found';
  if (page === 'article' && !editorial.some(x => x.id === article)) page = 'not-found';
  return {
    page: routeNames.includes(page) ? page : 'not-found',
    event,
    venue,
    vt,
    at,
    article,
    newsCategory,
    mode,
    visitChild: bits[0] === 'visit' && !!bits[1],
    section: params.get('section') || 'Overview',
    status: params.get('status') || 'All',
    type: params.get('type') || 'All types',
    session: params.get('session') === '1' ? 1 : 0,
    preferredVenue: params.get('venue'),
    eventType: params.get('eventType') || params.get('type')
  };
};
export const CACVisitorOrganizerJourneys05Oct = () => {
  const initial = useRef(readRoute()).current;
  const [page, P] = useState(initial.page),
    [eventId, E] = useState(initial.event),
    [venueId, V] = useState(initial.venue),
    [menu, M] = useState(false),
    [filter, SF] = useState(initial.status),
    [type, ST] = useState(initial.type),
    [q, Q] = useState(''),
    [eventTab, SET] = useState(initial.section),
    [venueTab, SVT] = useState(initial.vt),
    [visitTab, SAT] = useState(initial.at),
    [visitChild, VC] = useState(initial.visitChild),
    [articleId, ART] = useState(initial.article),
    [newsCategory, NC] = useState(initial.newsCategory),
    [occasion, O] = useState('Performance'),
    [caseFilter, CF] = useState('All'),
    [modal, MD] = useState(''),
    [time, STM] = useState(initial.session),
    [step, S] = useState(1),
    [mode, MODE] = useState(initial.mode),
    [reduce, R] = useState(false),
    [hero, H] = useState(0),
    [saved, SAVE] = useState(false),
    [homeEventTab, HET] = useState('Upcoming');
  const [form, FORM] = useState({
    venue: initial.preferredVenue ? initial.preferredVenue === 'gallery' ? 'Gallery' : initial.preferredVenue === 'theater' ? 'Theater' : 'I’d like advice' : 'Theater',
    type: initial.eventType && initial.eventType !== 'All types' ? initial.eventType : 'Performance',
    guests: '',
    date: '',
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const heading = useRef<HTMLHeadingElement>(null),
    first = useRef(true);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    R(m.matches);
    const f = () => R(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  const applyRoute = (r: ReturnType<typeof readRoute>) => {
    P(r.page);
    E(r.event);
    V(r.venue);
    SET(r.section);
    SVT(r.vt);
    SAT(r.at);
    VC(r.visitChild);
    ART(r.article);
    NC(r.newsCategory);
    SF(r.status);
    ST(r.type);
    STM(r.session);
    MODE(r.mode);
    M(false);
    MD('');
    if (r.preferredVenue) FORM(f => ({
      ...f,
      venue: r.preferredVenue === 'gallery' ? 'Gallery' : r.preferredVenue === 'theater' ? 'Theater' : 'I’d like advice',
      type: r.eventType && r.eventType !== 'All types' ? r.eventType : f.type
    }));
  };
  useEffect(() => {
    const fn = () => applyRoute(readRoute());
    window.addEventListener('hashchange', fn);
    window.addEventListener('popstate', fn);
    return () => {
      window.removeEventListener('hashchange', fn);
      window.removeEventListener('popstate', fn);
    };
  }, []);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    const target = document.querySelector('.cac .main h1') as HTMLElement | null;
    target?.setAttribute('tabindex', '-1');
    target?.focus({
      preventScroll: true
    });
  }, [page, eventId, venueId, articleId, venueTab, visitTab, newsCategory]);
  const go = (path: string) => {
    const r = readRoute(path);
    if (r.page === 'enquiry') S(1);
    window.history.pushState(null, '', '#' + path);
    applyRoute(r);
  };
  const openEvent = (id: string) => {
    S(1);
    SAVE(false);
    go('events/' + id);
  };
  const openVenue = (id: string) => go('venues/' + id);
  const enquire = (m: string, v = 'Theater') => {
    S(1);
    FORM(f => ({
      ...f,
      venue: v
    }));
    go((m === 'Site visit' ? 'site-visit' : 'enquiry') + '?venue=' + encodeURIComponent(v.toLowerCase()));
  };
  const F = (f: string) => {
    SF(f);
    window.history.replaceState(null, '', '#events?status=' + encodeURIComponent(f) + '&type=' + encodeURIComponent(type));
  };
  const T = (t: string) => {
    ST(t);
    window.history.replaceState(null, '', '#events?status=' + encodeURIComponent(filter) + '&type=' + encodeURIComponent(t));
  };
  const ET = (tab: string) => {
    SET(tab);
    window.history.replaceState(null, '', '#events/' + eventId + '?section=' + encodeURIComponent(tab) + '&session=' + time);
  };
  const VT = (tab: string) => {
    const slug = Object.keys(venueViews).find(k => venueViews[k] === tab) || 'overview';
    go('venues/' + venueId + (slug === 'overview' ? '' : '/' + slug));
  };
  const AT = (tab: string) => {
    const slug = Object.keys(visitViews).find(k => visitViews[k] === tab) || 'getting-here';
    go('visit/' + slug);
  };
  const TM = (n: number) => {
    STM(n);
    window.history.replaceState(null, '', '#events/' + eventId + '?section=' + encodeURIComponent(eventTab) + '&session=' + n);
  };
  const e = programmes.find(x => x.id === eventId) || programmes[0],
    v = spaces.find(x => x.id === venueId) || spaces[0];
  const result = programmes.filter(x => (filter === 'All' || programmeStatus(x) === filter) && (type === 'All types' || x.type === type) && (x.title + ' ' + x.sub).toLowerCase().includes(q.toLowerCase()));
  const change = (key: string, value: string) => FORM({
    ...form,
    [key]: value
  });
  const Head = ({
    k,
    title,
    copy
  }: {
    k: string;
    title: string;
    copy: string;
  }) => <div className="page-head"><span className="eyebrow">{k}</span><h1 ref={heading} tabIndex={-1}>{title}</h1><p>{copy}</p></div>;
  const EventCard = ({
    item
  }: {
    item: Programme;
  }) => <button className="event-card image-card" aria-label={'View ' + item.title} onClick={() => openEvent(item.id)}><div className="programme-image"><img src={item.image} alt={item.imageAlt} /><div className="programme-badges"><span>{programmeStatus(item)}</span>{item.sample && <span className="sample-badge">Contoh program</span>}</div><span className="round"><A up /></span><span className="image-credit-label">Illustration</span></div><div className="event-meta"><span>{item.sample ? 'Contoh: ' : ''}{item.date}</span><span>{item.venue}</span></div><h3>{item.title}</h3><p className="programme-subtitle">{item.sub}</p><p className="programme-excerpt">{item.copy}</p><div className="programme-card-bottom"><span>{item.type}</span><span>Explore programme <A /></span></div></button>;
  const Notice = () => <div className="notice"><span className="dot" /><div><strong>Museum temporarily closed</strong><span>Check for reopening updates before planning a museum visit.</span></div></div>;
  const escapeIcs = (x: string) => x.replace(/[,;]/g, m => '\\' + m).replace(/\n/g, '\\n');
  const endDay = new Date(e.end + 'T00:00:00Z');
  endDay.setUTCDate(endDay.getUTCDate() + 1);
  const icsDates = e.id === 'undertale' ? `DTSTART:${time === 0 ? '20261011T070000Z' : '20261011T120000Z'}\r\nDTEND:${time === 0 ? '20261011T090000Z' : '20261011T140000Z'}` : `DTSTART;VALUE=DATE:${e.start.replace(/-/g, '')}\r\nDTEND;VALUE=DATE:${endDay.toISOString().slice(0, 10).replace(/-/g, '')}`;
  const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Ciputra Artpreneur//Event Calendar//EN\r\nBEGIN:VEVENT\r\nUID:${e.id}-${e.start}-${time}@ciputraartpreneur.com\r\nDTSTAMP:20261005T000000Z\r\n${icsDates}\r\nSUMMARY:${escapeIcs(e.title + ' - ' + e.sub)}\r\nLOCATION:${escapeIcs(e.venue + ' - Ciputra Artpreneur Jakarta')}\r\nDESCRIPTION:Check the official event page for updates. This reminder does not reserve a seat.\r\nEND:VEVENT\r\nEND:VCALENDAR`;
  return <div className="cac-shell"><div className={'cac' + (reduce ? ' reduced' : '') + (page === 'event' ? ' event-page' : '')}><a className="skip" href="#main" onClick={ev => {
        ev.preventDefault();
        const main = document.querySelector('.cac .main') as HTMLElement;
        main?.setAttribute('tabindex', '-1');
        main?.focus();
      }}>Skip to content</a>
<header className="header"><button className="brand" onClick={() => go('home')} aria-label="Ciputra Artpreneur home"><span className="brand-mark" aria-hidden="true">c<span>a</span></span><span>CIPUTRA<br />ARTPRENEUR</span></button><nav className="desktop-nav" aria-label="Main navigation">{[['What’s on', 'events'], ['Venues', 'venues'], ['Visit', 'visit'], ['News', 'news'], ['About', 'about']].map(([t, p]) => <button key={p} className={page === p ? 'active' : ''} onClick={() => go(p)}>{t}</button>)}</nav><div className="header-right"><button className="plan-btn" onClick={() => go('plan')}>Plan an event <A up /></button><button className="menu-btn" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => M(!menu)}>{menu ? '×' : <><span /><span /></>}</button></div></header>
{menu && <nav className="mobile-nav" aria-label="Mobile navigation">{[['What’s on', 'events'], ['Venues', 'venues'], ['Facilities', 'venues/facilities'], ['Plan your visit', 'visit'], ['News & articles', 'news'], ['About Artpreneur', 'about'], ['Plan an event', 'plan'], ['Contact', 'contact']].map(([t, p], i) => <button key={p} onClick={() => go(p)}><small>0{i + 1}</small>{t}<A /></button>)}</nav>}
<main id="main" className="main" key={page}>
{page === 'home' && <><section className="hero"><div className="hero-image" key={hero}><img src={hero === 0 ? img.theater : img.gallery} alt={hero === 0 ? 'Ciputra Artpreneur Theater, red seating and faceted ceiling' : 'Ciputra Artpreneur Gallery exhibition interior'} /></div><div className="hero-copy"><span className="eyebrow">THEATER. GALLERY. MUSEUM. JAKARTA.</span><h1 ref={heading} tabIndex={-1}>Art moves us.<br /><em>Together.</em></h1><p>A performance to remember.<br />A space for your next idea.</p><div className="hero-actions"><Btn light onClick={() => go('events')}>Find an event</Btn><Btn outline onClick={() => go('plan')}>Plan an event</Btn></div></div><div className="hero-bottom"><span>COME FOR THE ART. STAY FOR THE EXPERIENCE.</span><div className="slide-control"><span>{hero === 0 ? '01 / THE THEATER' : '02 / THE GALLERY'}</span><button aria-label="Previous space photograph" onClick={() => H(hero === 0 ? 1 : 0)}>←</button><button aria-label="Next space photograph" onClick={() => H(hero === 0 ? 1 : 0)}>→</button></div></div></section><div className="utility"><span><I type="pin" />Ciputra World 1, Jakarta</span><button onClick={() => go('visit')}>Your visit starts here <A /></button><button onClick={() => openVenue('museum')}><span className="dot" />Museum temporarily closed <A /></button></div><section className="section"><div className="section-title"><div><span className="eyebrow">ON THE CALENDAR</span><h2>Be part of<br /><em>what happens next.</em></h2></div><button className="link" onClick={() => go('events')}>Explore what’s on <A /></button></div><div className="tabs home-programme-tabs">{['Ongoing', 'Upcoming'].map(x => <button key={x} className={homeEventTab === x ? 'active' : ''} aria-pressed={homeEventTab === x} onClick={() => HET(x)}>{x}</button>)}</div><div className="event-grid">{programmes.filter(x => programmeStatus(x) === homeEventTab).slice(0, 3).map(item => <EventCard key={item.id} item={item} />)}</div></section><HomeStories go={go} /><section className="space-feature"><div className="feature-photo"><img src={img.gallery} alt="An exhibition in Ciputra Artpreneur Gallery" loading="lazy" /><span>THE GALLERY · ARCHIVE PHOTOGRAPH</span></div><div className="feature-copy"><span className="eyebrow">A SPACE FOR YOUR IDEAS</span><h2>Imagine it.<br /><em>Make room for it.</em></h2><p>Start with your event. Explore the Theater and Gallery, compare the facts, and talk through what’s possible with our team.</p><Btn light onClick={() => go('venues')}>Explore the venues</Btn><button className="link" onClick={() => enquire('Site visit')}>Request a site visit <A up /></button></div></section><section className="section"><div className="section-title"><div><span className="eyebrow">THREE DIFFERENT PERSPECTIVES</span><h2>Find your space.</h2></div><span className="caption">Art, performance and possibility<br />at Ciputra Artpreneur</span></div>{spaces.map((s, i) => <button className="venue-line" key={s.id} onClick={() => openVenue(s.id)}><span>0{i + 1}</span><h3>{s.name}</h3><span className="venue-line-stat">{s.stat}<small>{s.unit}</small></span><A up /></button>)}</section><HomeEnquiry go={go} /><HomeNews go={go} /><GeneralFaq go={go} /><section className="visit-band"><span className="eyebrow">COME A LITTLE CLOSER</span><h2>Your evening starts<br /><em>before the curtain.</em></h2><Btn onClick={() => go('visit')}>Plan your visit</Btn></section></>}
{page === 'events' && <><Head k="DISCOVER ARTPRENEUR" title="What’s on" copy="Performances, conversations and exhibitions. Find something that moves you." /><section className="section listing"><div className="tabs" aria-label="Filter event dates">{['All', 'Ongoing', 'Upcoming', 'Past'].map(x => <button key={x} className={filter === x ? 'active' : ''} aria-pressed={filter === x} onClick={() => F(x)}>{x}</button>)}</div><div className="filter-bar"><label className="search"><I type="search" /><input aria-label="Search events" value={q} onChange={x => Q(x.target.value)} placeholder="Search by event or programme" />{q && <button aria-label="Clear search" onClick={() => Q('')}>×</button>}</label><label className="select-label">Type<select value={type} onChange={x => T(x.target.value)} aria-label="Event type">{['All types', 'Performance', 'Talks & ideas', 'Exhibition', 'Workshop'].map(x => <option key={x}>{x}</option>)}</select></label></div><div className="result-count" role="status" aria-live="polite">{result.length} {result.length === 1 ? 'event' : 'events'}{q ? ' matching “' + q + '”' : ''}</div>{result.length ? <div className="event-grid">{result.map(item => <EventCard key={item.id} item={item} />)}</div> : <div className="empty"><I type="calendar" /><h2>{filter === 'Past' ? 'Looking for an earlier event?' : 'No events in this selection.'}</h2><p>{filter === 'Past' ? 'Explore documented programmes in our venue stories.' : 'Try another event type or browse the upcoming programme.'}</p><Btn onClick={() => {
                F('Upcoming');
                T('All types');
                Q('');
              }}>See upcoming events</Btn>{filter === 'Past' && <button className="link" onClick={() => {
                go('venues/theater/past-events');
              }}>Explore venue stories <A /></button>}</div>}</section></>}
{page === 'event' && <><div className="breadcrumb"><button onClick={() => go('events')}>What’s on</button><span>/</span><span>{e.title}</span></div><section className="event-top"><div className="event-art photo-event-art"><img src={e.image} alt={e.imageAlt} /><div className="event-art-shade" /><span className="eyebrow">{e.type.toUpperCase()} · {e.venue.toUpperCase()}</span>{e.sample && <span className="sample-badge">Contoh program</span>}<h1 ref={heading} tabIndex={-1}>{e.title}<em>{e.sub}</em></h1><div className="event-art-bottom"><span>{e.sample ? 'Contoh: ' : ''}{e.date}</span><span>Illustration</span></div></div><div className="event-booking"><span className="eyebrow">{e.sample ? 'CONTOH PROGRAM' : programmeStatus(e) === 'Past' ? 'PROGRAMME ARCHIVE' : 'YOUR NEXT EXPERIENCE'}</span><h2>{e.sub}</h2><div className="info-row"><I type="calendar" /><div><strong>{e.sample ? 'Contoh jadwal: ' : ''}{e.date}</strong>{e.times.length > 0 && <span>Two performances</span>}</div></div><div className="info-row"><I type="pin" /><div><strong>{e.venue}</strong><span>Ciputra World 1, Jakarta</span></div></div>{e.times.length > 0 && <fieldset className="sessions"><legend>Choose a performance</legend>{e.times.map((t, i) => <button key={t} className={time === i ? 'active' : ''} aria-pressed={time === i} onClick={() => TM(i)}>{t}<span>{time === i ? 'Selected' : 'Select'}</span></button>)}</fieldset>}{e.sample ? <><div className="sample-notice"><strong>Contoh program</strong><p>Konsep acara dan jadwal ilustratif untuk katalog ini. Bukan agenda atau tiket resmi Ciputra Artpreneur.</p></div><Btn onClick={() => go('events')}>Explore other programmes</Btn></> : <><Btn onClick={() => MD('ticket')}>{e.id === 'undertale' ? 'Get tickets' : 'Visit organiser'}</Btn><p className="caption">See {e.partner} for current availability, prices and booking details.</p></>}{!e.sample && programmeStatus(e) !== 'Past' && <button className="link" onClick={() => MD('calendar')}><I type="calendar" />{saved ? 'Calendar reminder ready' : 'Add to calendar'}</button>}</div></section><section className="section detail-grid"><div><div className="tabs">{['Overview', 'Schedule', 'Venue', 'FAQs'].map(t => <button key={t} className={eventTab === t ? 'active' : ''} aria-pressed={eventTab === t} onClick={() => ET(t)}>{t}</button>)}</div><div className="tab-content" key={eventTab}>{eventTab === 'Overview' && <><span className="eyebrow">ABOUT THE EXPERIENCE</span><h2>A reason<br /><em>to be here.</em></h2><p className="lede">{e.copy}</p><p>{e.description}</p><ul className="programme-highlights">{e.highlights.map(h => <li key={h}><I type="check" />{h}</li>)}</ul><div className="fact-grid"><div><span>Duration</span><strong>{e.duration}</strong></div><div><span>Programme details</span>{e.sample ? <strong>Contoh program · jadwal ilustratif</strong> : <a href={e.url} target="_blank" rel="noreferrer">Official event information ↗</a>}</div></div></>}{eventTab === 'Schedule' && <><h2>Make time for it.</h2><p>{e.sample ? 'Contoh jadwal: ' : ''}{e.date}</p>{e.times.length ? e.times.map((t, i) => <button className={'schedule-row ' + (time === i ? 'active' : '')} key={t} onClick={() => TM(i)}><strong>{i === 0 ? 'Matinee' : 'Evening'}</strong><span>{t}</span><span>{time === i ? 'Selected' : 'Select'} <A /></span></button>) : <p>{e.sample ? 'This sample programme shows a ' + e.duration.toLowerCase() + ' format. No public booking is offered.' : 'The organiser has the complete running order and attendance information.'}</p>}<p className="caption">Check the organiser’s doors-open and late-entry guidance before travelling.</p></>}{eventTab === 'Venue' && e.venue === 'Theater' && <><img className="detail-photo" src={img.theater} alt="Ciputra Artpreneur Theater auditorium" /><h2>The Theater</h2><p>{e.sample ? 'The Theater is the proposed setting for this sample programme. It does not indicate an actual booking.' : 'At Ciputra World 1, Jakarta. Find directions and arrival guidance before your visit.'}</p><Btn onClick={() => go('visit')}>Plan your visit</Btn></>}{eventTab === 'Venue' && e.venue !== 'Theater' && <><h2>{e.venue}</h2><p>{e.sample ? 'A proposed setting for this sample programme. Confirm feasibility and arrangements with the venue team.' : 'The event takes place at Ciputra Artpreneur, Ciputra World 1. Confirm the specific event space and arrival instructions with the organiser.'}</p><Btn onClick={() => go('visit')}>Plan your visit</Btn></>}{eventTab === 'FAQs' && <><h2>Before you go.</h2>{[[e.id === 'undertale' ? 'Is there an age limit?' : 'Where can I find admission details?', e.id === 'undertale' ? 'Children under 6 are not admitted. Every guest aged 6 and over needs a standard ticket.' : e.sample ? 'This is an illustrative programme concept. No admission or registration is offered.' : 'Check the organiser’s published attendance information before registering.'], ['Where do I buy tickets?', e.sample ? 'This is a sample programme. No tickets, registration or booking are available.' : `Follow the official event link to ${e.partner}. Your booking and payment take place on their website.`], ['Can I take photographs?', e.id === 'undertale' ? 'Photography and video recording are not permitted during this performance.' : e.sample ? 'Photography arrangements are not set for this programme concept.' : 'Please follow the organiser’s photography rules.'], ['What if I need accessibility assistance?', 'Contact the venue before booking to discuss access and seating needs.']].map(([a, b]) => <details className="faq" key={a}><summary>{a}<span>+</span></summary><p>{b}</p></details>)}</>}</div></div><aside className="arrival-card"><span className="eyebrow">BEFORE THE EVENT</span><h3>One less thing<br />to think about.</h3><p>Find your way here, plan your arrival and ask about access.</p><button className="link" onClick={() => go('visit/getting-here')}>Getting here <A /></button><button className="link" onClick={() => go('contact')}>Contact us <A /></button><a className="link" href={contact.whatsapp} target="_blank" rel="noreferrer">Direct chat <A up /></a><div className="card-rule" /><span className="caption">MUSEUM UPDATE</span><p>The museum is temporarily closed. Check for reopening updates before visiting.</p></aside></section></>}
{page === 'venues' && <><Head k="PLAN SOMETHING AT ARTPRENEUR" title="A space for every idea." copy="Start with the setting. Explore the practical details, then shape the event with our team." /><div className="hub-links"><button onClick={() => go('venues/facilities')}>Facilities & services ↗</button></div><section className="section venue-index">{spaces.map((s, i) => <article className="venue-item" key={s.id}><button className="venue-photo" onClick={() => openVenue(s.id)}><img src={img[s.id as keyof typeof img]} alt={`Ciputra Artpreneur ${s.name}`} /><span className="round"><A up /></span></button><div><span className="eyebrow">0{i + 1} / {s.tag}</span><h2>{s.name}</h2><p>{s.copy}</p><div className="venue-metric"><strong>{s.stat}</strong><span>{s.unit}</span></div><button className="link" onClick={() => openVenue(s.id)}>Explore the {s.name.toLowerCase()} <A /></button></div></article>)}</section></>}
{page === 'venue' && <><div className="breadcrumb"><button onClick={() => go('venues')}>Venues</button><span>/</span><span>{v.name}</span></div><section className="venue-hero"><img src={img[v.id as keyof typeof img]} alt={`Interior of Ciputra Artpreneur ${v.name}`} /><div><span className="eyebrow">{v.tag}</span><h1 ref={heading} tabIndex={-1}>{v.name}</h1><p>{v.head}</p></div><button className="photo-expand" onClick={() => MD('photo')}>View space <A up /></button></section>{venueId === 'museum' && <Notice />}<div className="venue-summary"><div><strong>{v.stat}</strong><span>{v.unit}</span></div><div><span>LOCATION</span><strong>Ciputra World 1</strong><span>Jakarta</span></div>{venueId !== 'museum' && <Btn onClick={() => enquire('Site visit', v.name)}>Request a site visit</Btn>}</div><section className="section venue-detail"><div className="tabs">{['Overview', 'Configurations', 'Specifications', 'Facilities', 'Technical info', 'Service support', 'Past events'].map(t => <button key={t} className={venueTab === t ? 'active' : ''} aria-pressed={venueTab === t} onClick={() => VT(t)}>{t === 'Configurations' ? 'Layouts' : t}</button>)}</div><div className="detail-grid"><div className="tab-content" key={venueTab}>{venueId === 'museum' && !['Overview', 'Specifications'].includes(venueTab) && <><span className="eyebrow">MUSEUM / {venueTab === 'Configurations' ? 'LAYOUTS' : venueTab.toUpperCase()}</span><h2>{venueTab === 'Configurations' ? 'Layouts' : venueTab}</h2><p className="lede">The museum is temporarily closed to visitors.</p><p>{venueTab === 'Past events' ? 'Ask the Artpreneur team for approved museum programme references and reopening information.' : 'Please ask the Artpreneur team for current museum information before planning a visit or discussing an event.'}</p><p className="caption">Museum layouts, technical specifications and event services are not currently confirmed here.</p><button className="btn" onClick={() => go('contact')}>Ask about the museum <A /></button></>}{venueTab === 'Overview' && <><span className="eyebrow">THE SPACE</span><h2>{v.head}</h2><p className="lede">{v.copy}</p><img className="detail-photo" src={img[v.id as keyof typeof img]} alt={`${v.name}, archive photograph`} /><p className="caption">Archive photograph. Explore the current space with the venue team.</p>{venueId !== 'museum' && <div className="fact-grid"><div><span>First, check the fit</span><strong>Space and audience</strong><button className="link" onClick={() => VT('Specifications')}>See the facts <A /></button></div><div><span>Then, picture the event</span><strong>Setup and production</strong><button className="link" onClick={() => VT('Configurations')}>Explore configurations <A /></button></div></div>}</>}{venueTab === 'Configurations' && venueId !== 'museum' && <><span className="eyebrow">START WITH YOUR EVENT</span><h2>Configurations<br /><em>& layouts.</em></h2><div className="chips">{['Performance', 'Corporate event', 'Exhibition', 'Dinner'].map(x => <button key={x} className={occasion === x ? 'active' : ''} aria-pressed={occasion === x} onClick={() => O(x)}>{x}</button>)}</div><div className="configuration"><img src={img[v.id as keyof typeof img]} alt={`${v.name} interior reference`} /><div><span className="eyebrow">{occasion.toUpperCase()}</span><h3>Shape the setup<br />around your brief.</h3><p>Share your audience size, production needs and preferred date. The venue team can advise on a suitable arrangement.</p><Btn onClick={() => {
                        FORM({
                          ...form,
                          type: occasion,
                          venue: v.name
                        });
                        MODE('Event enquiry');
                        S(1);
                        go('enquiry');
                      }}>Discuss this setup</Btn></div></div><p className="caption">Final layout and capacity depend on the configuration and venue approval.</p><a className="resource" href={v.plan} target="_blank" rel="noreferrer"><span><strong>View the published floor plan</strong><small>Measured venue drawing · PDF</small></span><A up /></a></>}{venueTab === 'Specifications' && <><span className="eyebrow">INFORMATION FOR YOUR TEAM</span><h2>Check the fit.</h2><dl className="specs"><div><dt>Space</dt><dd>{v.name}</dd></div>{venueId === 'theater' ? <><div><dt>Seating capacity</dt><dd>1,157 seats</dd></div><div><dt>Stage</dt><dd>Modular stage</dd></div><div><dt>Production facilities</dt><dd>Orchestra pit and fly tower</dd></div><div><dt>Location</dt><dd>Level 13</dd></div></> : venueId === 'gallery' ? <><div><dt>Total area</dt><dd>1,500 m²</dd></div><div><dt>Published maximum</dt><dd>Up to 2,000 guests<small>Subject to configuration</small></dd></div><div><dt>Spaces</dt><dd>Three combinable halls</dd></div><div><dt>Projection screen</dt><dd>60 × 12 m</dd></div></> : <><div><dt>Visitor status</dt><dd>Temporarily closed</dd></div><div><dt>Collection</dt><dd>32 paintings, 18 sketches<br />by Hendra Gunawan</dd></div></>}</dl>{v.plan && <a className="resource" href={v.plan} target="_blank" rel="noreferrer"><span><strong>Published {v.name.toLowerCase()} floor plan</strong><small>Measured venue drawing · PDF</small></span><A up /></a>}{venueId !== 'museum' && <div className="production-list"><h3>Bring your production questions.</h3>{['Dimensions and clearances', 'Power, sound and lighting requirements', 'Load-in route and setup schedule', 'Backstage facilities and service support', 'Accessible routes and seating arrangements'].map(x => <span key={x}><I type="check" />{x}</span>)}</div>}<a className="link" href={official + '/ciputra-artpreneur-' + v.id} target="_blank" rel="noreferrer">Official venue information <A up /></a></>}{venueTab === 'Facilities' && venueId !== 'museum' && <><span className="eyebrow">FACILITIES / {v.name.toUpperCase()}</span><h2>Prepare the space.</h2><p className="lede">{venueId === 'theater' ? 'Theater facilities support performance and presentation.' : 'Three combinable halls allow the Gallery to accommodate different event arrangements.'}</p><div className="facility-detail-list">{(venueId === 'theater' ? [['Auditorium', '1,157 seats in an oval hall'], ['Stage', 'Modular stage, orchestra pit and fly tower'], ['Location', 'Theater on Level 13']] : [['Gallery space', '1,500 m² across three combinable halls'], ['Projection', '60 × 12 m screen'], ['Capacity', 'Published maximum up to 2,000 guests, subject to configuration']]).map(([a, b]) => <div key={a}><h3>{a}</h3><p>{b}</p></div>)}</div><p>Confirm the equipment and service scope for your event with the venue team.</p><button className="btn" onClick={() => enquire('Event enquiry', v.name)}>Discuss facilities <A /></button></>}
{venueTab === 'Technical info' && venueId !== 'museum' && <><span className="eyebrow">TECHNICAL INFORMATION</span><h2>Bring the right<br /><em>questions.</em></h2><p className="lede">Use the published floor plan as a starting point. Confirm production requirements against the current venue specification.</p><a className="resource" href={v.plan} target="_blank" rel="noreferrer"><span><strong>{v.name} measured floor plan</strong><small>Official venue PDF</small></span><A up /></a><div className="production-list"><h3>Production checklist</h3>{['Stage and floor dimensions; clearances and rigging needs', 'Sound, lighting, projection and power requirements', 'Load-in route, access times and setup schedule', 'Backstage, dressing and preparation spaces', 'Accessible audience routes and seating arrangements'].map(x => <span key={x}><I type="check" />{x}</span>)}</div><p className="caption">Specifications and included equipment must be confirmed for the proposed event. A floor-plan download does not confirm feasibility.</p><button className="btn" onClick={() => enquire('Event enquiry', v.name)}>Ask a technical question <A /></button></>}
{venueTab === 'Service support' && venueId !== 'museum' && <><span className="eyebrow">SERVICE SUPPORT</span><h2>Plan it<br /><em>with the team.</em></h2><p className="lede">Share your event brief so the right operational questions can be discussed before a booking.</p><div className="arrival-steps">{[['01', 'Clarify the event', 'Venue, audience size, preferred date and the experience you want to create.'], ['02', 'Review the requirements', 'Production, access, setup, breakdown and any event-specific service needs.'], ['03', 'Confirm the next step', 'A site visit or a detailed feasibility discussion with the venue team.']].map(([n, a, b]) => <div key={n}><span>{n}</span><h3>{a}</h3><p>{b}</p></div>)}</div><button className="btn" onClick={() => enquire('Site visit', v.name)}>Request a site visit <A /></button><a className="link" href={contact.whatsapp} target="_blank" rel="noreferrer">Chat with sales <A up /></a></>}
{venueTab === 'Past events' && venueId === 'theater' && <><span className="eyebrow">DOCUMENTED PROGRAMMES</span><h2>See what’s<br /><em>come to life here.</em></h2><div className="chips">{['All', 'Performing arts', 'Corporate', 'Exhibition'].map(x => <button key={x} className={caseFilter === x ? 'active' : ''} aria-pressed={caseFilter === x} onClick={() => CF(x)}>{x}</button>)}</div>{stories.filter(x => caseFilter === 'All' || x.type === caseFilter).map(x => <article className="case" key={x.title}><span>{x.year}<small>{x.type}</small></span><div><h3>{x.title}</h3><p>{x.copy}</p><a className="link" href={x.url} target="_blank" rel="noreferrer">Read the published story <A up /></a></div></article>)}{!stories.some(x => caseFilter === 'All' || x.type === caseFilter) && <div className="empty archive-empty"><h3>No published references in this category.</h3><p>Ask the venue team for examples that match your brief.</p><button className="link" onClick={() => CF('All')}>Show all references <A /></button></div>}<p className="caption">Theater programme archive. Examples show past use, not current availability.</p></>}{venueTab === 'Past events' && venueId === 'gallery' && <><span className="eyebrow">INSPIRATION / EVENT REFERENCES</span><h2>Picture your event<br /><em>in the Gallery.</em></h2><div className="chips">{['All', 'Corporate', 'Exhibition', 'Performing arts', 'Talks & ideas'].map(x => <button key={x} className={caseFilter === x ? 'active' : ''} onClick={() => CF(x)} aria-pressed={caseFilter === x}>{x}</button>)}</div>{programmes.filter(x => x.sample && x.venue === 'Gallery' && programmeStatus(x) === 'Past' && (caseFilter === 'All' || caseFilter === x.type)).map(x => <article className="inspiration-sample" key={x.id}><img src={x.image} alt={x.imageAlt} /><div><span className="sample-badge">Contoh program</span><h3>{x.title}</h3><p>{x.copy}</p><button className="link" onClick={() => openEvent(x.id)}>Explore programme concept <A /></button></div></article>)}{!programmes.some(x => x.sample && x.venue === 'Gallery' && programmeStatus(x) === 'Past' && (caseFilter === 'All' || caseFilter === x.type)) && <div className="empty archive-empty"><h3>Find a reference for your event.</h3><p>Ask the venue team for published Gallery examples in this category.</p><button className="link" onClick={() => CF('All')}>Show all examples <A /></button></div>}<p className="caption">Programme concepts are illustrative and are not documentation of past Gallery bookings. Request approved event references from the venue.</p><Btn onClick={() => enquire('Event enquiry', 'Gallery')}>Request event references</Btn></>}</div><aside className="enquire-card"><span className="eyebrow">{venueId === 'museum' ? 'MUSEUM INFORMATION' : 'LET’S TALK ABOUT YOUR EVENT'}</span><h3>{venueId === 'museum' ? 'Stay curious.' : 'The next step is a conversation.'}</h3><p>{venueId === 'museum' ? 'Please confirm reopening information with our team before visiting.' : 'Share your idea or request a visit to explore the space in person.'}</p>{venueId === 'museum' ? <a className="btn light" href={official + '/contact-us'} target="_blank" rel="noreferrer">Contact the venue <A up /></a> : <><Btn light onClick={() => enquire('Site visit', v.name)}>Request a site visit</Btn><button className="link" onClick={() => enquire('Event enquiry', v.name)}>Send a message <A /></button><a className="link" href={contact.whatsapp} target="_blank" rel="noreferrer">Chat with sales <A up /></a><div className="card-rule" /><p className="caption">Dates and configurations are subject to the venue team’s confirmation.</p></>}</aside></div></section></>}
{page === 'plan' && <><Head k="FOR ORGANISERS & CREATORS" title="Give your idea a place." copy="Explore the venue. Check what matters. Start a conversation." /><section className="section plan-venue-chooser"><span className="eyebrow">01 / SELECT A VENUE</span><div>{spaces.map(x => <button key={x.id} onClick={() => openVenue(x.id)}><strong>{x.name}</strong><span>{x.id === 'museum' ? 'Temporarily closed' : x.stat + ' ' + x.unit}</span><A up /></button>)}</div></section><section className="plan-hero"><img src={img.gallery} alt="Ciputra Artpreneur Gallery" /><div><span className="eyebrow">YOUR EVENT STARTS HERE</span><h2>What are you<br /><em>bringing to life?</em></h2><div className="occasion-list">{['Performance', 'Corporate event', 'Exhibition', 'Product launch', 'Dinner'].map(x => <button key={x} onClick={() => {
                  O(x);
                  go('venues/' + (x === 'Performance' ? 'theater' : 'gallery') + '/layouts');
                }}>{x}<A up /></button>)}</div></div></section><section className="section"><div className="section-title"><h2>A little clarity.<br /><em>A confident next step.</em></h2></div><div className="plan-steps">{[['01', 'Explore the spaces', 'Compare the Theater and Gallery with their published capacities and areas.', 'View venues', () => go('venues')], ['02', 'Check the practical details', 'Bring your production needs, layout questions and access requirements.', 'View specifications', () => {
                go('venues/theater/specifications');
              }], ['03', 'Speak with the team', 'Choose an enquiry or a site visit. A preferred date is a request.', 'Start an enquiry', () => enquire('Event enquiry')]].map(([n, t, d, b, f]) => <article key={n as string}><span>{n as string}</span><h3>{t as string}</h3><p>{d as string}</p><button className="link" onClick={f as () => void}>{b as string}<A /></button></article>)}</div></section></>}
{page === 'visit' && <><Head k="MAKE YOUR WAY HERE" title={visitChild ? visitTab === 'FAQs' ? 'Visitor FAQs' : visitTab : 'Plan your visit'} copy="From the city to your seat. A few things to know before you arrive." /><Notice /><section className="section detail-grid"><div><div className="tabs">{['Getting here', 'Parking & arrival', 'Accessibility', 'FAQs'].map(t => <button key={t} className={visitTab === t ? 'active' : ''} aria-pressed={visitTab === t} onClick={() => AT(t)}>{t}</button>)}</div><div className="tab-content" key={visitTab}>{visitTab === 'Getting here' && <><span className="eyebrow">IN THE HEART OF KUNINGAN</span><h2>See you at<br /><em>Ciputra World 1.</em></h2><p className="lede">Retail Podium, Levels 11–13<br />Jl. Prof. Dr. Satrio Kav. 3–5<br />Kuningan, South Jakarta 12940</p><p>From Lotte Shopping Avenue, use the Satrio or Avenue lifts to Level 11, or the escalator near XXI on Level 4.</p><a className="btn" href="https://www.google.com/maps?ll=-6.224106,106.823897&z=16&t=m&hl=en-US&gl=ID&mapclient=embed&cid=2071273731392965281" target="_blank" rel="noreferrer">Open directions <A up /></a></>}{visitTab === 'Parking & arrival' && <><span className="eyebrow">BEFORE THE CURTAIN</span><h2>Arrive with<br /><em>time to spare.</em></h2><div className="arrival-steps">{[['01', 'By car', 'Take the West Ramp from Jl. Prof. Dr. Satrio to Lobby 11.'], ['02', 'Parking', 'Parking is available on Levels 8, 9, 10 and 11, with escalator access.'], ['03', 'At the event', 'Keep your ticket ready and follow the organiser’s admission instructions.']].map(([n, t, c]) => <div key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></div>)}</div><p className="caption">Doors-open and late-entry arrangements vary by event.</p></>}{visitTab === 'Accessibility' && <><span className="eyebrow">LET’S PLAN YOUR ARRIVAL</span><h2>Tell us what<br /><em>you need.</em></h2><p className="lede">If you need step-free access, assistance on arrival or advice about seating, contact the venue before booking.</p><p>The team can help you check the appropriate route and arrangements for your event.</p><a className="link" href="tel:+622129889889">Call +62 21 2988 9889 <A up /></a><a className="link" href="mailto:info@ciputraartpreneur.com">info@ciputraartpreneur.com <A up /></a></>}{visitTab === 'FAQs' && <><h2>A few helpful answers.</h2>{[['Is the museum open?', 'The museum is temporarily closed. Check the official museum page for reopening information.'], ['Where can I buy tickets?', 'Open your chosen event and follow its official ticketing link. Purchases take place with the ticketing partner.'], ['What time should I arrive?', 'Check your event’s admission instructions. Doors-open and late-entry policies vary by organiser.'], ['Where is Lost & Found?', 'Please contact the Ciputra Artpreneur office on Level 10.'], ['How can I ask about access?', 'Contact the venue before booking to discuss your route and seating requirements.']].map(([a, b]) => <details className="faq" key={a}><summary>{a}<span>+</span></summary><p>{b}</p></details>)}</>}</div></div><aside className="address-card"><img src={img.theater} alt="The Ciputra Artpreneur Theater" /><div><span className="eyebrow">CIPUTRA ARTPRENEUR</span><h3>Kuningan.<br />Jakarta.</h3><p>Ciputra World 1<br />Retail Podium, Levels 11–13</p><button className="link" onClick={() => go('events')}>Find your event <A /></button><div className="card-rule" /><a href={official + '/contact-us'} target="_blank" rel="noreferrer">Official visitor information ↗</a></div></aside></section></>}
{page === 'enquiry' && <><div className="breadcrumb"><button onClick={() => go('plan')}>Plan an event</button><span>/</span><span>{mode}</span></div><section className="enquiry-layout"><aside><span className="eyebrow">LET’S MAKE A START</span><h1 ref={heading} tabIndex={-1}>{mode === 'Site visit' ? 'Meet the space.' : 'Tell us your idea.'}</h1><p>{mode === 'Site visit' ? 'Request a visit and talk through your event in person.' : 'Share your event needs so the venue team can discuss the right next step.'}</p><img src={form.venue === 'Gallery' ? img.gallery : img.theater} alt="Ciputra Artpreneur venue interior" /><div className="enquiry-aside-bottom"><span>BEFORE YOU BOOK</span><p>Preferred dates and configurations are subject to confirmation.</p></div></aside><div className="form-wrap"><div className="progress" aria-label="Enquiry progress">{['Your event', 'Your details', 'Review'].map((t, i) => <div className={step >= i + 1 ? 'active' : ''} key={t}><span>{step > i + 1 ? '✓' : i + 1}</span><strong>{t}</strong></div>)}</div><form onSubmit={ev => {
                ev.preventDefault();
                if (step < 3) S(step + 1);
              }}><div className="form-step" key={step}>{step === 1 && <><span className="eyebrow">01 / YOUR EVENT</span><h2>A few details<br /><em>to get started.</em></h2><label>What would you like to do?<select value={mode} onChange={x => MODE(x.target.value)}><option>Site visit</option><option>Event enquiry</option></select></label><div className="two-fields"><label>Preferred venue<select value={form.venue} onChange={x => change('venue', x.target.value)}><option>Theater</option><option>Gallery</option><option>I’d like advice</option></select></label><label>Event type<select value={form.type} onChange={x => change('type', x.target.value)}>{['Performance', 'Corporate event', 'Exhibition', 'Product launch', 'Dinner', 'Other'].map(x => <option key={x}>{x}</option>)}</select></label></div><div className="two-fields"><label>Estimated guests<input type="number" min="1" max="100000" placeholder="e.g. 300" value={form.guests} onChange={x => change('guests', x.target.value)} /></label><label>{mode === 'Site visit' ? 'Preferred visit date' : 'Preferred event date'}<input type="date" value={form.date} onChange={x => change('date', x.target.value)} /></label></div><p className="caption">Not sure about the date or audience size? You can leave these blank.</p></>}{step === 2 && <><span className="eyebrow">02 / YOUR DETAILS</span><h2>A little about you.</h2><label>Your name *<input required autoComplete="name" placeholder="Full name" value={form.name} onChange={x => change('name', x.target.value)} /></label><div className="two-fields"><label>Company or organisation<input autoComplete="organization" placeholder="Organisation" value={form.company} onChange={x => change('company', x.target.value)} /></label><label>Email *<input type="email" required autoComplete="email" placeholder="you@company.com" value={form.email} onChange={x => change('email', x.target.value)} /></label></div><label>Anything else we should know?<textarea rows={4} placeholder="Your event idea, production needs or access questions" value={form.message} onChange={x => change('message', x.target.value)} /></label><p className="caption">Required fields are marked with an asterisk.</p></>}{step === 3 && <><span className="eyebrow">03 / REVIEW</span><h2>Your enquiry<br /><em>at a glance.</em></h2><dl className="review-list">{[['Request', mode], ['Venue', form.venue], ['Event', form.type], ['Guests', form.guests || 'To discuss'], ['Preferred date', form.date || 'Flexible'], ['Name', form.name], ['Organisation', form.company || '—'], ['Email', form.email], ['Message', form.message || '—']].map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl><div className="review-note"><strong>Ready for a conversation.</strong><p>Review these details before contacting the venue. A preferred date does not reserve the space.</p></div><button type="button" className="btn" onClick={() => go('contact')}>Continue to contact options <A /></button></>}</div><div className="form-controls">{step > 1 ? <button type="button" className="link" onClick={() => S(step - 1)}>← {step === 3 ? 'Edit details' : 'Back'}</button> : <span />}{step < 3 && <button className="btn" type="submit">{step === 1 ? 'Continue' : 'Review enquiry'}<A /></button>}</div></form></div></section></>}
{page === 'not-found' && <><Head k="CIPUTRA ARTPRENEUR" title="Page not found" copy="Choose a programme or venue to continue exploring." /><section className="section"><Btn onClick={() => go('events')}>Explore events</Btn></section></>}
{page === 'news' && <NewsPage go={go} category={newsCategory} />}
{page === 'article' && <ArticlePage id={articleId} go={go} />}
{page === 'facilities' && <FacilitiesPage go={go} enquire={enquire} />}
{page === 'contact' && <ContactPage go={go} />}
{page === 'vision' && <><Head k="ABOUT / VISION" title="Our vision" copy="Artpreneur’s published direction." /><AboutModules go={go} only="vision" /></>}
{page === 'awards' && <><Head k="ABOUT / AWARDS" title="Awards & recognition" copy="Recognition listed by Ciputra Artpreneur." /><AboutModules go={go} only="awards" /></>}
{page === 'about' && <><Head k="ABOUT CIPUTRA ARTPRENEUR" title="Art. People. Possibility." copy="A place for art and performance at Ciputra World 1, Jakarta." /><section className="about-grid"><img src={img.museum} alt="Hendra Gunawan collection inside Ciputra Artpreneur Museum" /><div><span className="eyebrow">A PLACE TO EXPERIENCE ART</span><h2>Different spaces.<br /><em>Shared curiosity.</em></h2><p>The Theater, Gallery and Museum offer different ways to encounter art under one roof. Explore a performance, picture an event, or learn about the Hendra Gunawan collection.</p><Notice /><Btn onClick={() => go('venues')}>Explore Artpreneur</Btn></div></section><div className="hub-links"><button onClick={() => go('about/vision')}>Our vision ↗</button><button onClick={() => go('about/awards')}>Awards & recognition ↗</button></div><AboutModules go={go} /></>}
</main><footer className="footer"><div className="footer-top"><div><span className="eyebrow">CIPUTRA ARTPRENEUR</span><h2>See you<br /><em>here.</em></h2></div><div className="footer-address"><span>Ciputra World 1, Jakarta</span><p>Retail Podium, Levels 11–13<br />Jl. Prof. Dr. Satrio Kav. 3–5<br />Kuningan, South Jakarta 12940</p><button className="link" onClick={() => go('visit')}>Plan your visit <A /></button></div><div className="footer-links">{[['What’s on', 'events'], ['Our venues', 'venues'], ['Facilities', 'venues/facilities'], ['News & articles', 'news'], ['Plan an event', 'plan'], ['About Artpreneur', 'about'], ['Contact', 'contact']].map(([t, p]) => <button key={p} onClick={() => go(p)}>{t}<A up /></button>)}</div></div><div className="footer-contact-row"><div><a href={contact.tel}>{contact.phone}</a><a href={contact.mail}>{contact.email}</a><a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a></div><div>{social.map(([label, url]) => <a href={url} key={label} target="_blank" rel="noreferrer">{label} ↗</a>)}</div></div><div className="footer-bottom"><span>Art connects us.</span><div><button aria-pressed={reduce} onClick={() => R(!reduce)}>{reduce ? 'Motion reduced' : 'Reduce motion'}</button><button onClick={() => MD('credits')}>Photography credits</button><a href={official} target="_blank" rel="noreferrer">Official website ↗</a></div></div></footer>
{page === 'event' && !e.sample && programmeStatus(e) !== 'Past' && <div className="mobile-ticket"><div><strong>{e.short}</strong><span>{e.times.length ? e.times[time] : e.venue}</span></div><button className="btn" onClick={() => MD('ticket')}>{e.id === 'undertale' ? 'Get tickets' : 'Event details'}<A up /></button></div>}
{modal === 'ticket' && !e.sample && <Dialog title="Continue to official ticketing" close={() => MD('')}><span className="modal-icon"><A up /></span><span className="eyebrow">YOUR NEXT STEP</span><h2>Continue with<br />{e.partner}.</h2><p>You’re leaving Ciputra Artpreneur to view {e.id === 'undertale' ? 'tickets' : 'event information'} on {e.partner}.</p><div className="handoff-event"><strong>{e.title}</strong><span>{e.date}{e.times.length ? ' · ' + e.times[time] : ''}</span><span>{e.venue}</span></div><p className="caption">Check current prices, fees and availability with the partner. No seat is reserved until they confirm your booking.</p><a className="btn" href={e.ticket} target="_blank" rel="noreferrer">Continue to {e.partner}<A up /></a><button className="link" onClick={() => MD('')}>Back to event details</button></Dialog>}
{modal === 'calendar' && !e.sample && <Dialog title="Add event to calendar" close={() => MD('')}><span className="modal-icon"><I type="calendar" /></span><span className="eyebrow">KEEP THE DATE</span><h2>A reminder<br /><em>to be there.</em></h2><p>{e.title}: {e.sub}<br />{e.date}{e.times.length ? ' · ' + e.times[time] : ' · All-day reminder'}</p><p className="caption">This adds a reminder, not a ticket or seat reservation.</p><a className="btn" download={e.id + '-' + e.start + '.ics'} href={'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics)} onClick={() => SAVE(true)}>Download calendar event <A /></a><button className="link" onClick={() => MD('')}>Return to event</button></Dialog>}
{modal === 'photo' && <Dialog title={`${v.name} photograph`} close={() => MD('')}><img className="lightbox-img" src={img[v.id as keyof typeof img]} alt={`Ciputra Artpreneur ${v.name}`} /><h3>{v.name}</h3><p className="caption">Archive photograph. See Photography credits for the original and licence.</p></Dialog>}
{modal === 'credits' && <Dialog title="Photography credits" close={() => MD('')}><span className="eyebrow">PHOTOGRAPHY</span><h2>The real spaces.</h2><p>Venue photographs reproduced under CC BY-SA 4.0. Images are resized, compressed and cropped for display. Photo adaptations retain that licence.</p>{[['Theater', 'Keziacleveland17', 'Balcony_at_Theater.jpg'], ['Gallery', 'Ciputra Artpreneur', 'Ciputra_Artpreneur_Gallery.jpg'], ['Museum', 'Ciputra Artpreneur', 'Ciputra_Artpreneur_Museum.jpg']].map(([p, a, f]) => <div className="credit" key={p}><strong>{p}</strong><span>{a}</span><a href={'https://commons.wikimedia.org/wiki/File:' + f} target="_blank" rel="noreferrer">Original photograph ↗</a></div>)}<a className="link" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0 licence <A up /></a></Dialog>}
</div></div>;
};