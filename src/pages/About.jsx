import SEO from '../components/SEO'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'
import { CONTACT, services } from '../data'
import about from '../content/about'
import { ReviewsSection, HireSection, ServiceIcon, dirClass } from '../components/Sections'
import RichText from '../components/RichText'
import { useReveal } from '../hooks/useReveal'
import { useHire } from '../components/HireModal'

// About page, built like a service page: title bar -> description with photo on the right (CV style)
// -> my services -> reviews -> form. Edit the text in src/content/about.js.
export default function About() {
  useReveal()
  const { openHire } = useHire()
  return <>
    <SEO
    title="About Naeem Arshad | Web Developer & Digital Solutions Specialist"
    description="Discover Naeem Arshad's experience in Shopify, WordPress, e-commerce, custom web development and digital services for businesses worldwide."
    path="/about"
    />

    <section className="service-hero service-hero-compact"><div className="container service-hero-row"><h1>{about.title}</h1><button type="button" className="button button-orange" onClick={() => openHire()}>Hire Me <ArrowRight size={18} /></button></div></section>

    <section className="section service-detail"><div className="container about-grid">
      <div className="about-text"><RichText text={about.description} />
        <button type="button" className="button button-orange" onClick={() => openHire()}>Hire Me <ArrowRight size={18} /></button></div>
      <aside className="about-card">
        <div className="about-photo"><img src={about.photo} alt={about.name} /></div>
        <b>{about.name}</b><span>{about.role}</span><small>{CONTACT.address}</small>
        <div className="about-links">
          <a href={CONTACT.whatsappChat} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a>
          <a href={`mailto:${CONTACT.email}`}><Mail size={16} /> Email</a>
        </div>
      </aside>
    </div></section>

    <section className="related-section"><div className="container"><span className="eyebrow">WHAT I DO</span><h2>My <em>services</em></h2>
      <div className="related-cards">{services.map((item, i) => <article className={`service-card ${dirClass(i, 3)}`} data-reveal key={item.slug}>
        <ServiceIcon service={item} /><h3>{item.title}</h3><p>{item.short}</p><Link className="card-link" to={`/services/${item.slug}`}>View service <ArrowRight size={17} /></Link>
      </article>)}</div>
    </div></section>

    <ReviewsSection />
    <HireSection />
  </>
}
