import { Helmet } from 'react-helmet-async'
import { Hero, PlatformMarquee, ServiceGrid, PortfolioSection, ReviewsSection, FAQSection, HireSection } from '../components/Sections'
import { useReveal } from '../hooks/useReveal'
export default function Home(){useReveal();return <><Helmet><title>Naeem Arshad | Shopify & Web Development</title><meta name="description" content="Professional Shopify, ecommerce, WordPress, WooCommerce and custom website development services by Naeem Arshad."/></Helmet><Hero/><PlatformMarquee/><ServiceGrid/><PortfolioSection preview/><ReviewsSection preview/><FAQSection/><HireSection/></>}
