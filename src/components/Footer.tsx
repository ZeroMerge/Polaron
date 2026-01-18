import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp, Phone, Mail, MapPin } from 'lucide-react'
import { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Get a Quote', href: '/quote' },
    { name: 'Contact', href: '/contact' },
  ]
  
  const services = [
    { name: 'Open Transport', href: '/services' },
    { name: 'Enclosed Transport', href: '/services' },
    { name: 'Door-to-Door', href: '/services' },
    { name: 'International', href: '/services' },
    { name: 'Expedited', href: '/services' },
  ]
  
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
  ]
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setEmail('')
  }
  
  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-polaron-crimson rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">
                Polaron
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your vehicle's journey, our commitment. Premium transport solutions trusted across 80+ countries.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-polaron-crimson hover:bg-polaron-crimson/10 transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-polaron-crimson mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-polaron-crimson mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">info@polaron.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-polaron-crimson mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">123 Transport Way<br />New York, NY 10001</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mt-6">
              <p className="text-white/60 text-sm mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-polaron-crimson text-white text-sm font-medium rounded hover:bg-polaron-crimson/90 transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2024 Polaron. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-white/40 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/40 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-polaron-crimson rounded-full flex items-center justify-center text-white shadow-glow hover:shadow-glow-lg hover:scale-110 transition-all duration-300 z-40"
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  )
}

export default Footer
