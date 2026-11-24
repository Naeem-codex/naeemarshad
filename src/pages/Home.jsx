import SEO from '../components/SEO'
import { Hero, PlatformMarquee, ServiceGrid, PortfolioSection, ReviewsSection, FAQSection, HireSection } from '../components/Sections'
import { useReveal } from '../hooks/useReveal'
export default function Home(){useReveal();return <><SEO
  title="Naeem Arshad | Shopify, WordPress, E-commerce & Full-Stack Developer (MERN)"
  description="Naeem Arshad offers professional web development, Shopify, WordPress, WooCommerce, e-commerce and custom MERN stack solutions for businesses worldwide."
  path="/"/><Hero/><PlatformMarquee/><ServiceGrid/><PortfolioSection preview/><ReviewsSection preview/><FAQSection/><HireSection/></>}
