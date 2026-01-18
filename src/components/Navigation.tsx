import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Quote', href: '/quote' },
    { name: 'The Club', href: '/club' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]
  
  const isActive = (href: string) => location.pathname === href
  
  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-polaron-crimson rounded flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">
                Polaron
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive(link.href) 
                      ? 'text-polaron-crimson' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-polaron-crimson transition-all duration-300 ${
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>
            
            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-polaron-crimson text-white text-sm font-medium rounded hover:bg-polaron-crimson/90 transition-all duration-300 hover:shadow-glow"
              >
                Get a Quote
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-lg font-medium py-2 transition-all duration-300 ${
                  isActive(link.href) 
                    ? 'text-polaron-crimson' 
                    : 'text-white/70 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/quote"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center px-6 py-3 bg-polaron-crimson text-white font-medium rounded mt-4"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
