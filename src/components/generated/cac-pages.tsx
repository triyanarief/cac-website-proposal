/** @jsxRuntime classic */
/** @jsx createLocalizedElement */
/** @jsxFrag React.Fragment */
import { createLocalizedElement, getLanguage, setLanguage, Language } from './cac-language';
import React, { useState } from 'react';
import { editorial, generalFaq, contact, testimonials, awards } from './cac-content';
type Props = {
  go: (path: string) => void;
  enquire: (mode: string, venue?: string) => void;
};
const LinkArrow = () => <span aria-hidden="true">↗</span>;
const StoryArrow = () => <svg className="story-link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.4" /></svg>;
export const GeneralFaq = ({
  go
}: Pick<Props, 'go'>) => <section className="section home-faq" id="general-faq"><div className="section-title"><div><span className="eyebrow">A FEW HELPFUL ANSWERS</span><h2>Before you<br /><em>make a plan.</em></h2></div><button className="link" onClick={() => go('visit/faq')}>Visitor FAQs <LinkArrow /></button></div>{generalFaq.map(([q, a]) => <details className="faq" key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</section>;
export const HomeStories = ({
  go
}: Pick<Props, 'go'>) => <section className="section home-stories" id="stories-testimonials"><div className="section-title"><div><span className="eyebrow">STORIES & TESTIMONIALS</span><h2>In their<br /><em>own words.</em></h2></div><button className="link" onClick={() => go('venues/theater/past-events')}>Explore past programmes <LinkArrow /></button></div><div className="testimonial-grid">{testimonials.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={'Watch ' + name + ' on YouTube'}><div className="testimonial-preview"><img src={'https://i.ytimg.com/vi/' + url.split('v=')[1] + '/maxresdefault.jpg'} alt={name + ' in the Artpreneur testimonial video'} loading="lazy" /><span className="video-play" aria-hidden="true">▷</span><span className="video-platform">YouTube</span></div><p className="testimonial-speaker">{name}</p><h3>{'Komentar ' + name + ' mengenai Ciputra Artpreneur'}</h3><strong>Watch on YouTube <StoryArrow /></strong></a>)}</div></section>;
export const HomeEnquiry = ({
  go
}: Pick<Props, 'go'>) => {
  const [venue, V] = useState('Theater'),
    [type, T] = useState('Performance');
  return <section className="section home-enquiry" id="home-enquiry"><div><span className="eyebrow">START AN ENQUIRY</span><h2>Tell us what<br /><em>you have in mind.</em></h2><p>Start with a space and an event type. You can add your requirements and review your enquiry on the next page.</p><a className="link" href={contact.whatsapp} target="_blank" rel="noreferrer">Chat with sales <LinkArrow /></a></div><form className="form-step" onSubmit={e => {
      e.preventDefault();
      go('enquiry?venue=' + venue.toLowerCase() + '&type=' + encodeURIComponent(type));
    }}><label>Preferred venue<select value={venue} onChange={e => V(e.target.value)}><option>Theater</option><option>Gallery</option><option>I’d like advice</option></select></label><label>Event type<select value={type} onChange={e => T(e.target.value)}>{['Performance', 'Corporate event', 'Exhibition', 'Product launch', 'Dinner', 'Other'].map(x => <option key={x}>{x}</option>)}</select></label><button className="btn" type="submit">Continue enquiry <LinkArrow /></button><p className="caption">A preferred date or venue is a request, not a reservation.</p></form></section>;
};
export const NewsCards = ({
  go,
  limit = 4
}: {
  go: (p: string) => void;
  limit?: number;
}) => <div className="news-grid">{editorial.slice(0, limit).map(x => <button key={x.id} className="news-card" onClick={() => go('news/' + x.id)}><div><img src={x.image} alt={x.title + ' illustrative image'} /><span>{x.imageLabel}</span></div><span className="eyebrow">{x.kind.toUpperCase()} / {x.tag}</span><h3>{x.title}</h3><p>{x.intro}</p><strong>Read story <StoryArrow /></strong></button>)}</div>;
export const HomeNews = ({
  go
}: Pick<Props, 'go'>) => <section className="section" id="news-articles"><div className="section-title"><div><span className="eyebrow">NEWS & ARTICLES</span><h2>More to<br /><em>discover.</em></h2></div><button className="link" onClick={() => go('news')}>All news & articles <LinkArrow /></button></div><NewsCards go={go} limit={2} /></section>;
export const NewsPage = ({
  go,
  category: filter = 'All'
}: Pick<Props, 'go'> & {
  category?: string;
}) => {
  return <><div className="page-head"><span className="eyebrow">NEWS & ARTICLES</span><h1>{filter === 'News' ? 'Artpreneur news' : filter === 'Article' ? 'Stories & guides' : 'Inside Artpreneur'}</h1><p>Programme news, stories and practical guides.</p></div><section className="section"><div className="tabs">{['All', 'News', 'Article'].map(x => <button key={x} className={filter === x ? 'active' : ''} aria-pressed={filter === x} onClick={() => go(x === 'All' ? 'news' : x === 'News' ? 'news/updates' : 'news/articles')}>{x === 'Article' ? 'Articles' : x}</button>)}</div><div className="news-grid news-list">{editorial.filter(x => filter === 'All' || x.kind === filter).map(x => <button key={x.id} className="news-card" onClick={() => go('news/' + x.id)}><div><img src={x.image} alt={x.title + ' illustrative image'} /><span>Illustration</span></div><span className="eyebrow">{x.kind.toUpperCase()} / {x.tag}</span><h3>{x.title}</h3><p>{x.intro}</p><strong>Read story <StoryArrow /></strong></button>)}</div></section></>;
};
export const ArticlePage = ({
  id,
  go
}: {
  id: string;
  go: (p: string) => void;
}) => {
  const x = editorial.find(n => n.id === id) || editorial[0];
  return <><div className="breadcrumb"><button onClick={() => go('news')}>News & articles</button><span>/</span><span>{x.kind}</span></div><div className="page-head"><span className="eyebrow">{x.tag}</span><h1>{x.title}</h1><p>{x.intro}</p></div><article className="section article-body"><figure><img src={x.image} alt={x.title + ' illustrative visual'} /><figcaption>Illustration</figcaption></figure><div className="article-copy">{x.body.map(p => <p key={p}>{p}</p>)}<a className="link" href={x.source} target="_blank" rel="noreferrer">Read the source information <LinkArrow /></a><button className="btn" onClick={() => go(x.target)}>{x.action}<LinkArrow /></button></div></article><section className="section"><div className="section-title"><h2>Keep exploring.</h2></div><NewsCards go={go} limit={2} /></section></>;
};
export const FacilitiesPage = ({
  go,
  enquire
}: Props) => <><div className="page-head"><span className="eyebrow">VENUES / FACILITIES</span><h1>Practical details.<br />Better preparation.</h1><p>Start with the published facilities, then confirm what your event needs.</p></div><section className="section"><div className="facility-grid"><article><span className="eyebrow">THEATER</span><h2>Built around<br /><em>performance.</em></h2><ul><li>1,157-seat oval auditorium</li><li>Modular stage</li><li>Orchestra pit</li><li>Fly tower</li></ul><button className="link" onClick={() => go('venues/theater/technical')}>Theater technical information <LinkArrow /></button></article><article><span className="eyebrow">GALLERY</span><h2>A flexible<br /><em>setting.</em></h2><ul><li>1,500 m² across three combinable halls</li><li>Published maximum: up to 2,000 guests, depending on configuration</li><li>60 × 12 m projection screen</li></ul><button className="link" onClick={() => go('venues/gallery/facilities')}>Gallery facilities <LinkArrow /></button></article></div><div className="facility-questions"><span className="eyebrow">CONFIRM FOR YOUR EVENT</span><h3>Plan the details with the venue team.</h3><p>Ask about power, AV requirements, backstage rooms, load-in access, setup timing, accessibility and the services included in your event arrangement.</p><button className="btn" onClick={() => enquire('Event enquiry')}>Discuss your requirements <LinkArrow /></button></div></section></>;
export const ContactPage = ({
  go
}: Pick<Props, 'go'>) => <><div className="page-head"><span className="eyebrow">CONTACT ARTPRENEUR</span><h1>Let’s talk.</h1><p>Ask about your visit, a programme or the space for your next event.</p></div><section className="section contact-grid"><div><span className="eyebrow">GENERAL ENQUIRIES</span><h2>A direct<br /><em>conversation.</em></h2><a href={contact.tel}>{contact.phone}</a><a href={contact.mail}>{contact.email}</a><a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp +62 819 9053 5251 ↗</a><p className="caption">For ticket changes or refunds, contact the ticketing partner for your event.</p></div><div><span className="eyebrow">FIND US</span><h3>Ciputra World 1</h3><p>Retail Podium, Levels 11–13<br />Jl. Prof. Dr. Satrio Kav. 3–5<br />Kuningan, South Jakarta 12940</p><button className="btn" onClick={() => go('visit/getting-here')}>Getting here <LinkArrow /></button><a className="link" href={contact.source} target="_blank" rel="noreferrer">Official contact information <LinkArrow /></a></div></section></>;
export const AboutModules = ({
  go,
  only
}: {
  go: (p: string) => void;
  only?: string;
}) => <>{(!only || only === 'vision') && <section className="section about-vision" id="vision"><span className="eyebrow">OUR VISION</span><h2>Explore. Experience.<br /><em>Celebrate.</em></h2><blockquote>“Ciputra Artpreneur aspires to be the venue choice for audiences in Jakarta to explore, experience and celebrate Indonesian and international events.”</blockquote><a className="link" href="https://www.ciputraartpreneur.com/about-us" target="_blank" rel="noreferrer">Artpreneur’s published vision <LinkArrow /></a></section>}{(!only || only === 'awards') && <section className="section" id="awards"><div className="section-title"><div><span className="eyebrow">AWARDS & RECOGNITION</span><h2>A record of<br /><em>recognition.</em></h2></div><a className="link" href="https://www.ciputraartpreneur.com/about-us" target="_blank" rel="noreferrer">Official award listing <LinkArrow /></a></div><div className="awards-list">{awards.map(([year, name, detail], i) => <div key={i}><span>{year}</span><div><h3>{name}</h3><p>{detail}</p></div></div>)}</div></section>}</>;