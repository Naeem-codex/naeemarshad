import { useState } from 'react'
import { Mail, MessageCircle } from 'lucide-react'
import { CONTACT, services } from '../data'

// Builds the same plain-text message for WhatsApp and for email.
function buildMessage(form) {
  const d = new FormData(form)
  return [
    'Hello Naeem, I would like to discuss a project.',
    `Name: ${d.get('name')}`,
    `Email: ${d.get('email')}`,
    `Service: ${d.get('service')}`,
    `Budget: ${d.get('budget') || 'Not sure yet'}`,
    `Project: ${d.get('details')}`
  ].join('\n')
}

// service = service title to pre-select (used on service pages and by the popup).
export default function HireForm({ service = '' }) {
  const [sent, setSent] = useState('')

  function sendWhatsApp(e) {
    e.preventDefault()
    window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(buildMessage(e.currentTarget))}`, '_blank', 'noopener')
    setSent('WhatsApp')
  }
  // If CONTACT.formEndpoint (src/data.js) is filled, the enquiry is sent straight to your email inbox.
  // If it is empty, the visitor's own email app opens instead.
  async function sendEmail(e) {
    const form = e.currentTarget.form
    if (!form.reportValidity()) return
    if (!CONTACT.formEndpoint) {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('Project enquiry from your website')}&body=${encodeURIComponent(buildMessage(form))}`
      setSent('email')
      return
    }
    setSent('sending')
    try {
      const res = await fetch(CONTACT.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
      if (res.ok) { form.reset(); setSent('email-ok') } else setSent('email-fail')
    } catch { setSent('email-fail') }
  }

  return <form className="hire-form" onSubmit={sendWhatsApp}>
    <div className="form-row">
      <label>Your name<input name="name" required placeholder="Full name" /></label>
      <label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label>
    </div>
    <div className="form-row">
      <label>Service<select name="service" required defaultValue={service}>
        <option value="" disabled>Select a service</option>
        {/* The list comes from src/data.js, so new services appear here automatically. */}
        {services.map(item => <option key={item.slug} value={item.title}>{item.title}</option>)}
        <option>Other</option>
      </select></label>
      <label>Estimated budget<input name="budget" placeholder="e.g. $300–$500" /></label>
    </div>
    <label>Tell me about your project<textarea name="details" rows="4" required placeholder="What do you need, and when would you like to start?" /></label>
    <div className="form-actions">
      <button className="button button-orange" type="submit"><MessageCircle size={17} /> Send on WhatsApp</button>
      <button className="button button-outline" type="button" onClick={sendEmail}><Mail size={17} /> Send by email</button>
    </div>
    {(sent === 'WhatsApp' || sent === 'email') && <p className="form-note">Your {sent} message is ready. Please press send there to complete your enquiry.</p>}
    {sent === 'sending' && <p className="form-note">Sending...</p>}
    {sent === 'email-ok' && <p className="form-note">Thank you! Your enquiry was sent. I will reply to your email soon.</p>}
    {sent === 'email-fail' && <p className="form-note">Sorry, it could not be sent. Please use WhatsApp instead.</p>}
    <p className="form-note">No payment details are collected here. We will agree on scope, milestones and a secure payment method before work starts.</p>
  </form>
}
