import SEO from '../components/SEO'
import { PortfolioSection, HireSection } from '../components/Sections'
import { useReveal } from '../hooks/useReveal'
export default function Portfolio(){useReveal();return <><SEO
  title="Website Portfolio | Shopify, WordPress & E-commerce Projects | Naeem Arshad"
  description="Explore websites and online stores developed by Naeem Arshad, including Shopify stores, WordPress websites, WooCommerce projects and custom web development."
  path="/portfolio"
/><div className="page-heading"><div className="container"><span className="eyebrow">MY WORK</span><h1>Website <em>portfolio</em></h1><p>A selection of live websites and demo stores. Open any project to see its images, price and client review.</p></div></div><PortfolioSection/><HireSection/></>}
