import { useState } from 'react'
import { Star } from 'lucide-react'
import { CONTACT } from '../data'

// Visitors can send a review: star rating, short review, name, country and an optional photo.
// Reviews are NOT shown automatically. With CONTACT.reviewsEndpoint (src/data.js) they go to your Google Sheet and
// show on the website after you type YES in the Approved column. Without it, they come to your email (Formspree).

// Shrinks the chosen photo to a small JPEG so the upload is light and fast.
function shrink(file, max = 400) {
  return new Promise(resolve => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.85)
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null) }
    img.src = url
  })
}

// Reads a small image file as text (data URL) so it can be sent to the Google Sheet script.
function toDataUrl(blob) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => resolve('')
    reader.readAsDataURL(blob)
  })
}

export default function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [status, setStatus] = useState('') // '', rating, sending, ok, ok-nophoto, fail, mail
  const [detail, setDetail] = useState('') // reason why the Google Sheet did not accept the review

  async function submit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('_gotcha')) return // spam trap: real visitors never see this field
    if (!rating) { setStatus('rating'); return }

    const name = data.get('name'), country = data.get('country'), review = data.get('review')

    // Google Sheet (approval list): saves the review and the photo, and emails you.
    // The answer from Google is read, so the visitor only sees "Thank you" when it was really saved.
    if (CONTACT.reviewsEndpoint) {
      setStatus('sending')
      setDetail('')
      try {
        const file = data.get('photo')
        const small = file && file.size ? await shrink(file, 320) : null
        const photo = small ? await toDataUrl(small) : ''
        const res = await fetch(CONTACT.reviewsEndpoint, { method: 'POST', body: JSON.stringify({ name, country, rating, review, photo }) })
        const result = await res.json()
        if (result.ok) { form.reset(); setRating(0); setStatus('ok'); return }
        setDetail(String(result.error || 'The script answered with an error.'))
      } catch (err) {
        setDetail('The website could not reach the Google script. Check the link and that "Who has access" is set to Anyone.')
      }
      // Google did not save it: send it by email (Formspree) instead, so the review is not lost.
      if (!CONTACT.formEndpoint) { setStatus('fail'); return }
    }

    // No Formspree link yet: open the visitor's email app instead (no photo).
    if (!CONTACT.formEndpoint) {
      const body = `Name: ${name}\nCountry: ${country}\nRating: ${rating} / 5\nReview: ${review}`
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('New website review')}&body=${encodeURIComponent(body)}`
      setStatus('mail')
      return
    }

    setStatus('sending')
    const send = (photo) => {
      const body = new FormData()
      body.append('_subject', 'New website review')
      body.append('name', name)
      body.append('country', country)
      body.append('rating', `${rating} / 5`)
      body.append('review', review)
      if (photo) body.append('photo', photo, 'photo.jpg')
      return fetch(CONTACT.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body })
    }
    try {
      const file = data.get('photo')
      const small = file && file.size ? await shrink(file) : null
      let res = await send(small)
      let photoSent = !!small
      // If the photo upload is not accepted (some Formspree plans), send the review without it.
      if (!res.ok && small) { res = await send(null); photoSent = false }
      if (res.ok) { form.reset(); setRating(0); setStatus(small && !photoSent ? 'ok-nophoto' : 'ok') } else setStatus('fail')
    } catch { setStatus('fail') }
  }

  return <form className="hire-form" onSubmit={submit}>
    <div className="form-row">
      <label>Your name<input name="name" required maxLength="60" placeholder="Full name" /></label>
      <label>Country<input name="country" required maxLength="60" placeholder="For example: United States" /></label>
    </div>
    <div className="rating-field">
      <span>Your rating</span>
      <div className="rating-input" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map(n => <button type="button" key={n} className={n <= (hover || rating) ? 'on' : ''} onMouseEnter={() => setHover(n)} onClick={() => setRating(n)} aria-label={`${n} star${n > 1 ? 's' : ''}`}><Star size={28} fill="currentColor" /></button>)}
      </div>
    </div>
    <label>Short review<textarea name="review" rows="4" required maxLength="400" placeholder="How was your experience working with me? (up to 400 characters)" /></label>
    <label className="file-field">Your photo (optional)<input name="photo" type="file" accept="image/*" /></label>
    <label className="consent"><input type="checkbox" required /> I agree that my name, country, photo and review may be shown on this website.</label>
    <input className="hp" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" />
    <div className="form-actions"><button className="button button-orange" type="submit">Send my review</button></div>
    {status === 'rating' && <p className="form-note">Please choose a star rating.</p>}
    {status === 'sending' && <p className="form-note">Sending...</p>}
    {status === 'ok' && <p className="form-note">Thank you! Your review was sent. It will appear on the website after I check it.</p>}
    {status === 'ok-nophoto' && <p className="form-note">Thank you! Your review was sent, but the photo could not be attached. It will appear after I check it.</p>}
    {status === 'mail' && <p className="form-note">Your email message is ready. Please press send in your email app.</p>}
    {/* Shown only while you test on your own computer (npm run dev), never on the live website. */}
    {import.meta.env.DEV && detail && <p className="form-note"><b>Test info:</b> {detail}</p>}
    {status === 'fail' && <p className="form-note">Sorry, your review could not be sent. Please try again later or contact me on WhatsApp.</p>}
  </form>
}