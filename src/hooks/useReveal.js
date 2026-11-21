import { useEffect } from 'react'

// Replays the entrance animation whenever an element leaves and re-enters view.
// threshold is small so elements start animating as soon as they appear (no empty gaps).
export function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal],[data-hl]')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target
        if (entry.isIntersecting) { el.classList.remove('is-out'); el.classList.add('is-visible') }
        else {
          // Headlines (data-hl) play an exit animation when they leave the screen.
          if (el.hasAttribute('data-hl') && el.classList.contains('is-visible')) el.classList.add('is-out')
          el.classList.remove('is-visible')
        }
      })
    }, { threshold: 0.04, rootMargin: '0px 0px -4% 0px' })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  })
}
