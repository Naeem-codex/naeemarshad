import { useEffect, useState } from 'react'
import { CONTACT, reviews as fixedReviews } from '../data'

// Reviews you approved in your Google Sheet (Approved = YES) + the reviews written in src/data.js.
// The sheet link is CONTACT.reviewsEndpoint in src/data.js. If it is empty, only src/data.js reviews show.
let cache = null // fetched once per page load

const valid = r => r && typeof r.name === 'string' && typeof r.quote === 'string' && r.rating >= 1 && r.rating <= 5

export function useAllReviews() {
  const [approved, setApproved] = useState(cache || [])
  useEffect(() => {
    if (!CONTACT.reviewsEndpoint || cache) return
    let live = true
    fetch(CONTACT.reviewsEndpoint)
      .then(res => res.json())
      .then(data => {
        const list = (data.reviews || []).filter(valid).map(r => ({
          id: r.id, platform: 'Website', name: r.name.slice(0, 60), country: String(r.country || '').slice(0, 60), role: '',
          rating: Math.round(r.rating), quote: r.quote.slice(0, 400), link: '',
          // Only photos stored in your own Google Drive are accepted.
          image: String(r.image || '').startsWith('https://drive.google.com/') ? r.image : ''
        }))
        cache = list
        if (live) setApproved(list)
      })
      .catch(() => {}) // if the sheet cannot be reached, the website still shows the reviews from data.js
    return () => { live = false }
  }, [])
  return [...approved, ...fixedReviews]
}
