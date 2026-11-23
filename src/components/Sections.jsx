import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { ArrowRight, Star, Quote, ExternalLink, Mail, MessageCircle, Phone } from 'lucide-react'
import { platforms, services, reviews, homeFaqs, portfolio, CONTACT } from '../data'
import { useHire } from './HireModal'
import { useAllReviews } from '../hooks/useAllReviews'
import HireForm from './HireForm'
import { useReveal } from '../hooks/useReveal'

// Two-line headline: line 1 flies in from the right and leaves to the left,
// line 2 flies in from the left and leaves to the right (also when scrolling back up).
// Edit the title / text where <SectionHeading> is used below.
function SectionHeading({ title, text }) {
  return <div className="section-heading hl-heading"><h2 className="hl hl-right" data-hl>{title}</h2><p className="hl hl-left" data-hl>{text}</p></div>
}

// Picks the entrance direction of a grid item from its column/row, so the left column
// comes from the left, the right column from the right, and the middle ones from top/bottom.
export const dirClass = (i, cols) => {
  const c = i % cols, r = Math.floor(i / cols)
  if (c === 0) return 'from-left'
  if (c === cols - 1) return 'from-right'
  return r % 2 === 0 ? 'from-top' : 'from-bottom'
}

// Shows one text at a time. Every 4 seconds the text slides out to the right
// and the next one slides in from the left, then the list repeats forever.
function Rotator({ items, as: Tag = 'div', delay = 0, render }) {
  const [i, setI] = useState(0)
  const [out, setOut] = useState(false)
  useEffect(() => {
    let t2
    const t1 = setInterval(() => {
      setOut(true)
      t2 = setTimeout(() => { setI(v => (v + 1) % items.length); setOut(false) }, 450)
    }, 7000)
    return () => { clearInterval(t1); clearTimeout(t2) }
  }, [items.length])
  return <Tag className={out ? 'rotator rotator-out' : 'rotator rotator-in'} style={{ '--rot-delay': `${delay}ms` }}>{render ? render(items[i]) : items[i]}</Tag>
}

// HERO TEXTS: edit or add lines here. Each list rotates every 4 seconds.


const heroEyebrows = [
  'AVAILABLE FOR NEW PROJECTS',
  'SHOPIFY & WORDPRESS SPECIALIST',
  'CUSTOM WEB DEVELOPMENT & DESIGN'
]

const heroHeadlines = [
  ['Ready to grow your business ', 'online?', ' Let’s build something great.'],
  ['Turn your ideas into ', 'powerful online stores', ' that sell.'],
  ['Stand out with a ', 'website that works', ' as hard as you do.']
]

const heroIntros = [
  'I’m Naeem Arshad, a web developer and designer helping businesses build a strong online presence. I create modern, responsive and professional websites that showcase your brand, attract customers and support business growth.',

  'Looking to launch or improve your online store? I build and customize Shopify and WooCommerce stores with professional designs, smooth shopping experiences and the features your business needs to sell online.',

  'Need more than a basic website? I develop custom, responsive websites tailored to your goals, combining clean design, reliable functionality and user-friendly experiences to help your business move forward.'
]



// TEXT UNDER THE PHOTO: edit these three lines (the 5 stars come after them).
const heroName = 'NAEEM ARSHAD'
const heroRole = 'WEB DEVELOPER AND DESIGNER'
const heroRating = '5-star client satisfaction'

export function Hero() {
  const { openHire } = useHire()
  return <section className="hero-section">
    <div className="container hero-grid">
      <div className="hero-copy">
        <Rotator items={heroEyebrows} render={t => <span className="eyebrow"><i className="availability-dot" /> {t}</span>} />
        <Rotator as="h1" items={heroHeadlines} delay={120} render={([a, b, c]) => <>{a}<em>{b}</em>{c}</>} />
        <Rotator as="p" items={heroIntros} delay={240} />
        <div className="hero-actions"><button type="button" onClick={() => openHire()} className="button button-orange">Discuss Your Project <ArrowRight size={18} /></button><Link to="/portfolio" className="button button-outline">View My Work</Link></div>
      </div>
      <div className="hero-visual">
        <div className="portrait-frame"><img src={`${import.meta.env.BASE_URL}naeem.jpg`} alt="Naeem Arshad - Web Developer" /></div>
        <div className="portrait-caption"><b>{heroName}</b><span>{heroRole}</span><small>{heroRating}</small><div className="portrait-stars" aria-label="5 star client satisfaction">{[0, 1, 2, 3, 4].map(n => <Star key={n} size={18} fill="currentColor" />)}</div></div>
      </div>
    </div>
  </section>
}

// One platform badge. If the logo file is missing or fails to load, the platform name is shown as text.
function PlatformPill({ platform }) {
  const [failed, setFailed] = useState(false)
  return <span className="platform-pill">
    {platform.logo && !failed
      ? <img src={platform.logo} alt={`${platform.name} logo`} loading="lazy" onError={() => setFailed(true)} />
      : <strong className="platform-wordmark">{platform.name}</strong>}
    {platform.logo && !failed && <b>{platform.name}</b>}
  </span>
}

export function PlatformMarquee() {
  // The list is repeated so the slow ticker loops without a gap.
  const repeated = [...platforms, ...platforms]
  return <section className="platform-section">
    <div className="container platform-heading"><span className="eyebrow">FREELANCE MARKETPLACES</span><p>Connect with me through trusted freelance platforms</p></div>
    <div className="marquee-shell" aria-label="Freelance platforms">
      <div className="marquee-track">{repeated.map((platform, i) => <PlatformPill platform={platform} key={`${platform.name}-${i}`} />)}</div>
    </div>
  </section>
}

// Service logo (e.g. Shopify, WordPress). Falls back to the lucide icon when there is no logo.
export function ServiceIcon({ service }) {
  const [failed, setFailed] = useState(false)
  const Icon = Icons[service.icon] || Icons.Code
  if (service.logo && !failed) return <div className="service-icon logo"><img src={service.logo} alt={`${service.title} logo`} loading="lazy" onError={() => setFailed(true)} /></div>
  return <div className="service-icon"><Icon size={27} /></div>
}

export function ServiceGrid() {
  return <section className="section services-section" id="services"><div className="container">
    <SectionHeading title={<>Services built around <em>your business</em></>} text="Practical digital services to launch and grow your business online." />
    <div className="services-grid">{services.map((service, i) => <article className={`service-card ${dirClass(i, 4)}`} data-reveal key={service.slug}>
      <ServiceIcon service={service} /><span className="service-category">{service.category}</span><h3>{service.title}</h3><p>{service.short}</p><Link className="card-link" to={`/services/${service.slug}`}>View service <ArrowRight size={17} /></Link>
    </article>)}</div>
  </div></section>
}

// One portfolio card. Click opens that project's own page (/portfolio/slug).
// Projects come from src/content/portfolio/ (one file per project).
export function PortfolioCard({ item, className = '' }) {
  return <Link to={`/portfolio/${item.slug}`} className={`portfolio-card ${className}`} data-reveal>
    <div className="portfolio-img"><img src={item.images[0]} alt={item.title} loading="lazy" /><span className="portfolio-tag">{item.type}</span>{item.price && <span className="portfolio-price">{item.price}</span>}</div>
    <div className="portfolio-body"><h3>{item.title}</h3><p>{item.short}</p><span className="card-link">View project details <ArrowRight size={16} /></span></div>
  </Link>
}

export function PortfolioSection({ preview = false }) {
  const items = preview ? portfolio.slice(0, 3) : portfolio
  return <section className="section portfolio-section" id="portfolio"><div className="container">
    <SectionHeading title={<>Portfolio & <em>live projects</em></>} text="Real websites and demo stores I have built." />
    <div className="portfolio-grid">{items.map((item, i) => <PortfolioCard item={item} className={dirClass(i, 3)} key={item.slug} />)}</div>
    {preview && <div className="center-action"><Link to="/portfolio" className="button button-outline">View full portfolio <ArrowRight size={17} /></Link></div>}
  </div></section>
}

export function ReviewsSection({ preview = false }) {
  // Reconnect reveal observation when the rotating review order changes.
  useReveal()
  const { openReview } = useHire()
  const allReviews = useAllReviews()
  const [rotation, setRotation] = useState(0)
  // Reorder the six review tiles once per minute; every tile keeps its own directional reveal.
  useEffect(() => {
    const timer = setInterval(() => setRotation(value => (value + 1) % Math.max(allReviews.length, 1)), 60000)
    return () => clearInterval(timer)
  }, [allReviews.length])
  const rotated = [...allReviews.slice(rotation), ...allReviews.slice(0, rotation)]
  const orderedReviews = preview ? rotated.slice(0, 6) : rotated
  return <section className="section reviews-section" id="reviews"><div className="container">
    <SectionHeading title={<>Client feedback & <em>reviews</em></>} text="What clients say about working with me." />
    <div className="reviews-grid">{orderedReviews.map((review, i) => <article className={`review-card review-direction-${i % 6}`} data-reveal key={`${review.id}-${rotation}`}>
      <div className="review-top"><span className="review-platform">{review.platform}</span><span className="stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, n) => <Star key={n} size={13} fill="currentColor" />)}</span></div>
      <Quote className="quote-icon" /><p className="review-quote">“{review.quote}”</p>
      <div className="review-person">{review.image ? <img src={review.image} alt={review.name} referrerPolicy="no-referrer" /> : <span className="avatar-initial">{review.name[0]}</span>}<div><b>{review.name}</b><small>{[review.role, review.country].filter(Boolean).join(' · ')}</small></div>{review.link && review.link !== '#' && <a href={review.link} target="_blank" rel="noreferrer" aria-label="Open review profile"><ExternalLink size={16} /></a>}</div>
      {review.sample && <small className="demo-label">SAMPLE REVIEW — REPLACE BEFORE PUBLISHING</small>}
    </article>)}</div>
    <div className="center-action">
      {preview && <Link to="/reviews" className="button button-outline">See all reviews <ArrowRight size={17} /></Link>}
      <button type="button" className="button button-orange" onClick={() => openReview()}><Star size={16} fill="currentColor" /> Write a review</button>
    </div>
  </div></section>
}

export function FAQSection({ items = homeFaqs, title = 'Frequently asked questions', id = 'faq' }) {
  const { openHire } = useHire()
  const [active, setActive] = useState(0)
  return <section className="section faq-section" id={id}><div className="container faq-layout">
    <div className="faq-intro" data-reveal="left"><span className="eyebrow">GOOD TO KNOW</span><h2>{title.split(' ').slice(0, -1).join(' ')} <em>{title.split(' ').slice(-1)}</em></h2><p>Have another question? Send me a message and I’ll be happy to help.</p><button type="button" className="text-link" onClick={() => openHire()}>Ask about your project <ArrowRight size={16} /></button></div>
    <div className="faq-list" data-reveal="right">{items.map(([question, answer], i) => <div className={`faq-item ${active === i ? 'active' : ''}`} key={question}><button onClick={() => setActive(active === i ? -1 : i)}><span>{question}</span><b>{active === i ? '−' : '+'}</b></button>{active === i && <p>{answer}</p>}</div>)}</div>
  </div></section>
}

export function HireSection({ service = '' }) {
  return <section className="section hire-section" id="hire"><div className="container hire-grid">
    <div className="hire-intro" data-reveal="left"><span className="eyebrow">LET’S WORK TOGETHER</span><h2>Have a project in <em>mind?</em></h2><p>Tell me a little about your business and what you want to achieve. I’ll get back to you to discuss the best next step.</p><div className="hire-direct"><b>Prefer a quicker way?</b><div className="quick-contact"><a href={CONTACT.whatsappChat} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp chat</a><a href={`tel:${CONTACT.phone}`}><Phone size={16} /> Call me</a><a href={`mailto:${CONTACT.email}`}><Mail size={16} /> Email me</a></div></div></div>
    <div className="hire-form-wrap" data-reveal="right"><HireForm service={service} /></div>
  </div></section>
}
