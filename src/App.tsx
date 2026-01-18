import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import QuotePage from './pages/QuotePage'
import BookPage from './pages/BookPage'
import ClubPage from './pages/ClubPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  return (
    <div className={`min-h-screen bg-black text-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Router>
        <ScrollToTop />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/club" element={<ClubPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
