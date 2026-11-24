import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { ArrowRight } from 'lucide-react'
import { services, commonFaqs } from '../data'
import { FAQSection, ReviewsSection, HireSection, ServiceIcon, dirClass } from '../components/Sections'
import { useReveal } from '../hooks/useReveal'
import { useHire } from '../components/HireModal'
import RichText from '../components/RichText'

// Page order (same for every service): title bar -> full description -> FAQs -> related services -> reviews -> form.
// Edit the text of each service in src/content/services/ (one file per service).
export default function ServicePage() {
  const { slug } = useParams()
  const service = services.find(item => item.slug === slug)
  useReveal()
  const { openHire } = useHire()

  if (!service) return <main className="container not-found"><h1>Service not found</h1><Link to="/">Back to home</Link></main>

  // Related services: same category first, then the others.
  const related = services.filter(item => item.slug !== slug)
    .sort((a, b) => (b.category === service.category) - (a.category === service.category)).slice(0, 3)

  return <>
    <SEO
  title={service.seoTitle || `${service.title} | Naeem Arshad`}
  description={service.seoDescription || service.short}
  path={`/services/${slug}`}
  />

    {/* 1. Title bar with Hire Me (opens the popup on this page) */}
    <section className="service-hero service-hero-compact"><div className="container service-hero-row"><h1>{service.title}</h1><button type="button" className="button button-orange" onClick={() => openHire(service.title)}>Hire Me <ArrowRight size={18} /></button></div></section>

    {/* 2. Full description, directly under the title */}
    <section className="section service-detail"><div className="container service-desc-full">
      <RichText text={service.description} />
      <button type="button" className="button button-orange" onClick={() => openHire(service.title)}>Hire Me for This Service <ArrowRight size={18} /></button>
    </div></section>

    {/* 3. FAQs: this service's FAQs first, then the common FAQs (src/content/services/index.js) */}
    <FAQSection items={[...service.faqs, ...commonFaqs]} title="Frequently asked questions" id="service-faq" />

    {/* 4. Related services */}
    <section className="related-section"><div className="container"><span className="eyebrow">EXPLORE MORE</span><h2>Related <em>services</em></h2>
      <div className="related-cards">{related.map((item, i) => <article className={`service-card ${dirClass(i, 3)}`} data-reveal key={item.slug}>
        <ServiceIcon service={item} /><h3>{item.title}</h3><p>{item.short}</p><Link className="card-link" to={`/services/${item.slug}`}>View service <ArrowRight size={17} /></Link>
      </article>)}</div>
    </div></section>

    {/* 5. Client reviews  6. Hire Me form */}
    <ReviewsSection />
    <HireSection service={service.title} />
  </>
}
