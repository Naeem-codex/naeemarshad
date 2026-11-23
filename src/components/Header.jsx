import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Menu, X, MessageCircle } from 'lucide-react'
import { CONTACT, services } from '../data'
import { useHire } from './HireModal'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const { openHire } = useHire()
  // Hover only opens the menu on computers (mouse). On phones and tablets a tap opens and closes it.
  const canHover = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches

  return <header className="site-header">
    {/* Top strip: service names scroll right to left (click = that service page).
        The WhatsApp number is shown here only, blinking, and opens a WhatsApp chat. */}
    <div className="top-strip">
      <div className="top-services-marquee" aria-label="Services">
        <div className="top-services-track">
          {/* The list is shown twice so the scrolling repeats without a gap. */}
          {[0, 1].map(copy => <div className="top-services-set" key={copy} aria-hidden={copy === 1}>
            {services.map(service => <Link key={service.slug} to={`/services/${service.slug}`} tabIndex={copy === 1 ? -1 : 0}>{service.nav}</Link>)}
          </div>)}
        </div>
      </div>
      <a className="top-whatsapp" href={CONTACT.whatsappChat} target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp">
        <MessageCircle size={15} /> WhatsApp: {CONTACT.phone}
      </a>
    </div>

    <div className="nav-wrap container">
      <Link className="brand" to="/" onClick={() => setOpen(false)}>
        <img className="brand-photo" src="/naeem.jpg" alt="Naeem Arshad" /><span>Naeem Arshad<small>WEB DEVELOPMENT</small></span>
      </Link>
      <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'main-nav open' : 'main-nav'}>
        <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
        <div className="service-nav" onMouseEnter={() => { if (canHover()) setDrop(true) }} onMouseLeave={() => { if (canHover()) setDrop(false) }}>
          <button className="nav-dropdown" onClick={() => setDrop(open => (canHover() ? true : !open))} aria-expanded={drop}>Services <ChevronDown size={16} /></button>
          {drop && <div className="dropdown-menu">{services.map(service => <Link key={service.slug} to={`/services/${service.slug}`} onClick={() => { setDrop(false); setOpen(false) }}>{service.title}</Link>)}</div>}
        </div>
        <NavLink to="/about" onClick={() => setOpen(false)}>About Me</NavLink>
        <NavLink to="/portfolio" onClick={() => setOpen(false)}>Portfolio</NavLink>
        <NavLink to="/reviews" onClick={() => setOpen(false)}>Client Reviews</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
        {/* Opens the Hire Me popup on the current page (no redirect). */}
        <button className="nav-cta" onClick={() => { openHire(); setOpen(false) }}>Hire Me <span>↗</span></button>
      </nav>
    </div>
  </header>
}
