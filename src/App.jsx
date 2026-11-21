import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicePage from './pages/ServicePage'
import About from './pages/About'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'
import Portfolio from './pages/Portfolio'
import PortfolioDetail from './pages/PortfolioDetail'
import { HireProvider } from './components/HireModal'
function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0)},[pathname]);return null}
export default function App(){return <HireProvider><ScrollToTop/><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/services/:slug" element={<ServicePage/>}/><Route path="/about" element={<About/>}/><Route path="/portfolio" element={<Portfolio/>}/><Route path="/portfolio/:slug" element={<PortfolioDetail/>}/><Route path="/reviews" element={<Reviews/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<div className="container not-found"><h1>Page not found</h1><a href="/">Return home</a></div>}/></Routes></main><Footer/></HireProvider>}
