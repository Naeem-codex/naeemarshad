import { Helmet } from 'react-helmet-async'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { CONTACT } from '../data'
import HireForm from '../components/HireForm'

// Contact page: quick contact options on the left, the same enquiry form as the Hire Me popup on the right.
export default function Contact() {
  return <>
    <Helmet><title>Contact Naeem Arshad | Hire a Web Developer</title><meta name="description" content="Contact Naeem Arshad for Shopify, ecommerce, WordPress and custom website development." /></Helmet>
    <div className="page-heading"><div className="container"><span className="eyebrow">GET IN TOUCH</span><h1>Let’s talk about <em>your project.</em></h1><p>Send your project details using the form, or contact me directly.</p></div></div>
    <section className="section contact-section"><div className="container contact-grid">
      <div className="contact-cards">
        <a href={CONTACT.whatsappChat} target="_blank" rel="noopener noreferrer"><MessageCircle /><span><b>Chat on WhatsApp</b><small>Fastest way to reach me</small></span></a>
        <a href={`tel:${CONTACT.phone}`}><Phone /><span><b>Call me</b><small>Tap to call</small></span></a>
        <a href={`mailto:${CONTACT.email}`}><Mail /><span><b>Email me</b><small>{CONTACT.email}</small></span></a>
        <div><MapPin /><span><b>Location</b><small>{CONTACT.address}</small></span></div>
      </div>
      <div className="contact-form-box">
        <h2>Hire me for your project</h2>
        <p className="modal-sub">Tell me about your project and send it by WhatsApp or email.</p>
        <HireForm />
      </div>
    </div></section>
  </>
}
