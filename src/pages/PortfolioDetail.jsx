import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { ArrowRight, ExternalLink, Star } from 'lucide-react'
import { portfolio } from '../data'
import { PortfolioCard, HireSection, dirClass } from '../components/Sections'
import { useReveal } from '../hooks/useReveal'
import { useHire } from '../components/HireModal'
import RichText from '../components/RichText'

// One portfolio project page (/portfolio/slug). Edit the content in src/content/portfolio/.
export default function PortfolioDetail() {
  const { slug } = useParams()
  const project = portfolio.find(item => item.slug === slug)
  const [active, setActive] = useState(0)
  const { openHire } = useHire()
  useReveal()

  if (!project) return <main className="container not-found"><h1>Project not found</h1><Link to="/portfolio">Back to portfolio</Link></main>

  const review = project.review
  const hasLink = project.link && project.link !== '#'
  const others = portfolio.filter(item => item.slug !== slug).slice(0, 3)

  return <>
    <SEO
    title={`${project.title} | Website Project Portfolio | Naeem Arshad`}
    description={project.short}
    path={`/portfolio/${slug}`}
    />

    <section className="service-hero service-hero-compact"><div className="container service-hero-row"><h1>{project.title}</h1><button type="button" className="button button-orange" onClick={() => openHire()}>Hire Me for a Similar Project <ArrowRight size={18} /></button></div></section>

    <section className="section service-detail">
      <div className="container project-grid">
        <div className="project-gallery">
          <a className="project-main" href={project.images[active]} target="_blank" rel="noreferrer" title="Open full size"><img src={project.images[active]} alt={`${project.title} image ${active + 1}`} /></a>
          {project.images.length > 1 && <div className="project-thumbs">{project.images.map((src, i) => <button type="button" key={i} className={i === active ? 'active' : ''} onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`}><img src={src} alt="" loading="lazy" /></button>)}</div>}
        </div>
        <aside className="project-info">
          <span className="portfolio-tag static">{project.type}</span>
          {project.price && <div className="project-price"><small>Project price</small><b>{project.price}</b></div>}
          {hasLink ? <a className="button button-orange" href={project.link} target="_blank" rel="noreferrer">Visit live website <ExternalLink size={16} /></a> : <p className="portfolio-soon">Live link coming soon</p>}
          {project.note && <small className="portfolio-note">{project.note}</small>}
        </aside>
      </div>
      <div className="container project-text"><h2>About this project</h2><RichText text={project.description} /></div>
    </section>

    {/* Customer review for this project (only shown when the project file has a review) */}
    {review && <section className="section project-review-section"><div className="container">
      <span className="eyebrow">CUSTOMER REVIEW</span><h2 className="project-review-title">What the client <em>said</em></h2>
      <div className="project-review">
        <div className="review-top"><span className="review-platform">{review.platform}</span><span className="stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating || 5 }, (_, n) => <Star key={n} size={16} fill="currentColor" />)}</span></div>
        <p className="review-quote">“{review.text}”</p>
        <div className="review-person">{review.image && <img src={review.image} alt={review.name} />}<div><b>{review.name}</b><small>{[review.role, review.country].filter(Boolean).join(' · ')}</small></div>
          {review.link && <a href={review.link} target="_blank" rel="noreferrer" aria-label="Open the review on the platform"><ExternalLink size={16} /></a>}</div>
        {review.screenshot && <a className="review-shot" href={review.screenshot} target="_blank" rel="noreferrer" title="Open full size"><img src={review.screenshot} alt={`Review from ${review.name}`} /></a>}
      </div>
    </div></section>}

    {others.length > 0 && <section className="section portfolio-section"><div className="container">
      <span className="eyebrow">MORE WORK</span><h2 className="project-review-title">Other <em>projects</em></h2>
      <div className="portfolio-grid">{others.map((item, i) => <PortfolioCard item={item} className={dirClass(i, 3)} key={item.slug} />)}</div>
    </div></section>}

    <HireSection />
  </>
}
