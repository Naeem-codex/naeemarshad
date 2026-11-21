import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react'
import { CONTACT, services } from '../data'
import { useHire } from './HireModal'

export default function Footer() {
  const { openHire } = useHire()
  return <footer className="footer"><div className="container footer-grid">
    <div className="footer-brand-column"><Link to="/" className="brand footer-brand"><span className="brand-mark">NA</span><span>Naeem Arshad<small>WEB DEVELOPMENT</small></span></Link><p>Practical digital services to help businesses build a stronger online presence.</p><div className="footer-contact"><a href={CONTACT.whatsappChat} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} />WhatsApp: {CONTACT.phone}</a><a href={`mailto:${CONTACT.email}`}><Mail size={16} />{CONTACT.email}</a><span><MapPin size={16} />{CONTACT.address}</span></div><div className="social-links">{Object.entries(CONTACT.socials).map(([name, url]) => <a key={name} href={url} target="_blank" rel="noreferrer">{name}</a>)}</div></div>
    <div><h3>Explore</h3><div className="footer-links"><Link to="/">Home</Link><Link to="/about">About Me</Link><Link to="/portfolio">Portfolio</Link><Link to="/reviews">Client Reviews</Link><Link to="/contact">Contact</Link><Link to="/#faq">FAQs</Link><button className="footer-hire" onClick={() => openHire()}>Hire Me ↗</button></div></div>
    <div><h3>Services</h3><div className="footer-links">{services.map(service => <Link key={service.slug} to={`/services/${service.slug}`}>{service.title}</Link>)}</div></div>
    <div><h3>Our Mission</h3><p>To help businesses and entrepreneurs grow with dependable website development, ecommerce solutions and thoughtful digital support.</p><Link className="text-link" to="/about">More about us <ArrowUpRight size={16} /></Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Naeem Arshad. All rights reserved.</span><span>Designed with purpose. Built for growth.</span></div></footer>
}
