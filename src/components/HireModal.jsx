import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import HireForm from './HireForm'
import ReviewForm from './ReviewForm'

// Shared popups: "Hire Me" (openHire) and "Write a review" (openReview).
// Both open on the current page, so the visitor never leaves what they are reading.
const HireContext = createContext({ openHire: () => {}, openReview: () => {} })
export const useHire = () => useContext(HireContext)

export function HireProvider({ children }) {
  const [state, setState] = useState(null)        // Hire Me popup: null = closed
  const [reviewOpen, setReviewOpen] = useState(false) // review popup
  // openHire('Service name') pre-selects that service in the form.
  const openHire = useCallback((service) => setState({ service: typeof service === 'string' ? service : '' }), [])
  const openReview = useCallback(() => setReviewOpen(true), [])
  const close = useCallback(() => { setState(null); setReviewOpen(false) }, [])
  const isOpen = !!state || reviewOpen

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [isOpen, close])

  const shell = (title, sub, form) => <div className="hire-modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
    <div className="hire-modal-box">
      <button className="modal-close" onClick={close} aria-label="Close form"><X size={18} /></button>
      <h2>{title}</h2>
      <p className="modal-sub">{sub}</p>
      {form}
    </div>
  </div>

  return <HireContext.Provider value={{ openHire, openReview }}>
    {children}
    {state && shell('Hire me for your project', 'Tell me about your project and send it by WhatsApp or email.', <HireForm service={state.service} />)}
    {reviewOpen && shell('Write a review', 'Share your experience in a few words. I read every review before it is shown on the website.', <ReviewForm />)}
  </HireContext.Provider>
}
