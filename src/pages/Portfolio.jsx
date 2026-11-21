import { Helmet } from 'react-helmet-async'
import { PortfolioSection, HireSection } from '../components/Sections'
import { useReveal } from '../hooks/useReveal'
export default function Portfolio(){useReveal();return <><Helmet><title>Portfolio | Naeem Arshad</title><meta name="description" content="Live websites and demo stores built by Naeem Arshad: Shopify, WordPress, WooCommerce and custom websites."/></Helmet><div className="page-heading"><div className="container"><span className="eyebrow">MY WORK</span><h1>Website <em>portfolio</em></h1><p>A selection of live websites and demo stores. Open any project to see its images, price and client review.</p></div></div><PortfolioSection/><HireSection/></>}
