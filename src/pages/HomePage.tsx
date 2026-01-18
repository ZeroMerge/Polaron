import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Globe, 
  Shield, 
  MapPin, 
  Clock, 
  ChevronRight,
  Star,
  Quote,
  ArrowRight
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-headline', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      )
      
      gsap.fromTo('.hero-subheadline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.8 }
      )
      
      gsap.fromTo('.hero-cta',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 1 }
      )
      
      gsap.fromTo('.hero-image',
        { opacity: 0, x: 100, rotateY: 5 },
        { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
      )
      
      gsap.fromTo('.hero-stat',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(2)', delay: 1.2 }
      )
      
      // Features section animations
      gsap.fromTo('.feature-card',
        { opacity: 0, x: -50, rotate: -5 },
        { 
          opacity: 1, 
          x: 0, 
          rotate: 0, 
          duration: 0.6, 
          stagger: 0.12, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      gsap.fromTo('.feature-image',
        { opacity: 0, x: 50, scale: 1.1 },
        { 
          opacity: 1, 
          x: 0, 
          scale: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      // Services section animations
      gsap.fromTo('.service-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      // Process section animations
      gsap.fromTo('.process-step',
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      // Testimonials animations
      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 30, rotateY: -15 },
        { 
          opacity: 1, 
          y: 0, 
          rotateY: 0, 
          duration: 0.7, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      // CTA animations
      gsap.fromTo('.cta-content',
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      gsap.fromTo('.cta-image',
        { opacity: 0, x: 50, scale: 1.1 },
        { 
          opacity: 1, 
          x: 0, 
          scale: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
    
    return () => ctx.revert()
  }, [])
  
  const features = [
    {
      icon: Globe,
      title: 'Global Network',
      description: '80+ countries, seamless connections across continents.'
    },
    {
      icon: Shield,
      title: 'Expert Handling',
      description: 'Trained professionals, premium care for every vehicle.'
    },
    {
      icon: MapPin,
      title: 'Real-Time Tracking',
      description: 'Know where your vehicle is, at every moment.'
    }
  ]
  
  const services = [
    {
      title: 'Open Transport',
      description: 'Cost-effective, reliable shipping for standard vehicles.',
      image: '/images/services-fleet.jpg'
    },
    {
      title: 'Enclosed Transport',
      description: 'Maximum protection for premium and classic vehicles.',
      image: '/images/services-enclosed.jpg'
    },
    {
      title: 'Door-to-Door',
      description: 'Convenience delivered directly to your location.',
      image: '/images/services-door-to-door.jpg'
    },
    {
      title: 'Expedited',
      description: 'When time is critical, we deliver with speed.',
      image: '/images/cta-car.jpg'
    },
    {
      title: 'International',
      description: 'Global reach with local expertise and customs support.',
      image: '/images/about-hero.jpg'
    }
  ]
  
  const processSteps = [
    {
      number: '01',
      title: 'Get a Quote',
      description: 'Tell us about your vehicle and destination. Receive a detailed estimate within hours.'
    },
    {
      number: '02',
      title: 'Book Shipment',
      description: 'Confirm your details and schedule pickup at your convenience.'
    },
    {
      number: '03',
      title: 'Track & Relax',
      description: 'Monitor your vehicle in real-time. Updates at every milestone.'
    },
    {
      number: '04',
      title: 'Delivery',
      description: 'Receive your vehicle in pristine condition, hassle-free.'
    }
  ]
  
  const testimonials = [
    {
      quote: "Exceptional service from start to finish. My classic Mercedes arrived in perfect condition. The attention to detail and communication throughout the process was outstanding.",
      author: "James K.",
      role: "Classic Car Collector",
      avatar: "/images/avatar-1.jpg",
      rating: 5
    },
    {
      quote: "Professional, reliable, and communicative. Polaron handled my S-Class with the utmost care. Highly recommend their enclosed transport service.",
      author: "Sarah M.",
      role: "Dealership Owner",
      avatar: "/images/avatar-2.jpg",
      rating: 5
    },
    {
      quote: "The team went above and beyond for my international shipment. Every detail was handled with precision. Five stars doesn't begin to cover it.",
      author: "Michael T.",
      role: "Private Owner",
      avatar: "/images/avatar-3.jpg",
      rating: 5
    }
  ]
  
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-polaron-crimson/20" />
        
        {/* Particle Effect Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <div className="space-y-2 mb-6">
                <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
                  Secure Your
                </h1>
                <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight">
                  Vehicle's
                </h1>
                <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                  <span className="text-polaron-crimson">Journey</span>
                </h1>
              </div>
              
              <p className="hero-subheadline text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
                Premium transport solutions trusted across 80+ countries. Your Mercedes-Benz deserves the precision and care that only Polaron provides.
              </p>
              
              <div className="hero-cta flex flex-col sm:flex-row gap-4">
                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-all duration-300 hover:shadow-glow group"
                >
                  Get a Quote
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white font-medium rounded hover:bg-white/5 transition-all duration-300"
                >
                  Explore Services
                </Link>
              </div>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-12">
                <div className="hero-stat">
                  <div className="text-3xl font-bold text-white">80+</div>
                  <div className="text-sm text-white/60">Countries</div>
                </div>
                <div className="hero-stat">
                  <div className="text-3xl font-bold text-white">15+</div>
                  <div className="text-sm text-white/60">Years Experience</div>
                </div>
                <div className="hero-stat">
                  <div className="text-3xl font-bold text-white">50M+</div>
                  <div className="text-sm text-white/60">Insurance Coverage</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="hero-image relative">
                <div className="absolute inset-0 bg-polaron-crimson/20 blur-3xl rounded-full transform scale-75" />
                <img
                  src="/images/hero-car.jpg"
                  alt="Premium Mercedes-Benz vehicle"
                  className="relative w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-4 -left-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-polaron-crimson/20 rounded-full flex items-center justify-center">
                    <Shield size={20} className="text-polaron-crimson" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Fully Insured</div>
                    <div className="text-xs text-white/60">$2M Coverage</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-lg p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-polaron-crimson/20 rounded-full flex items-center justify-center">
                    <Clock size={20} className="text-polaron-crimson" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">24/7 Tracking</div>
                    <div className="text-xs text-white/60">Real-time Updates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <div className="mb-12">
                <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
                  Why Choose Polaron
                </span>
                <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
                  Excellence in Every Mile
                </h2>
                <p className="text-white/60 text-lg">
                  We treat every vehicle as an investment asset, not cargo. Precision, protection, and peace of mind.
                </p>
              </div>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="feature-card group flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-polaron-crimson/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-polaron-crimson/20 flex items-center justify-center flex-shrink-0 group-hover:bg-polaron-crimson/30 transition-colors">
                      <feature.icon size={24} className="text-polaron-crimson" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-white/60 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Image */}
            <div className="feature-image relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-polaron-crimson/20 to-transparent blur-3xl rounded-full transform scale-75" />
              <img
                src="/images/features-car.jpg"
                alt="Premium vehicle transport"
                className="relative w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section ref={servicesRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Our Services
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Comprehensive Solutions
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              From standard transport to white-glove enclosed shipping, we offer solutions for every need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-card group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-polaron-crimson/30 transition-all duration-500 ${
                  index === 1 ? 'lg:scale-105 lg:z-10' : ''
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/70 text-sm">{service.description}</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-polaron-crimson/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={18} className="text-polaron-crimson" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white font-medium rounded hover:bg-white/5 transition-all duration-300"
            >
              View All Services
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section ref={processRef} className="py-24 relative overflow-hidden bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Your Vehicle's Journey
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Four simple steps to secure, professional vehicle transport.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step relative">
                {/* Step Number */}
                <div className="w-16 h-16 rounded-full bg-polaron-crimson/20 border border-polaron-crimson/30 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-polaron-crimson">{step.number}</span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
                
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5">
                    <div className="w-full h-full bg-gradient-to-r from-polaron-crimson/50 to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">15+</div>
              <div className="text-white/60 text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">80+</div>
              <div className="text-white/60 text-sm">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">50M+</div>
              <div className="text-white/60 text-sm">Insurance Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/60 text-sm">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Testimonials
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Trusted by vehicle owners and collectors worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card relative p-8 rounded-xl bg-white/5 border border-white/10 hover:border-polaron-crimson/30 transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-2">
                  <Quote size={40} className="text-polaron-crimson/30" />
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-polaron-crimson fill-polaron-crimson" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-white/80 text-sm leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-polaron-crimson/30"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-polaron-crimson/10 to-black border border-polaron-crimson/20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            <div className="relative grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
              {/* Content */}
              <div className="cta-content">
                <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
                  Ready to Ship Your Vehicle?
                </h2>
                <p className="text-white/70 text-lg mb-8 max-w-lg">
                  Get a free quote in minutes. No obligations, just expert guidance for your Mercedes-Benz transport needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/quote"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-all duration-300 hover:shadow-glow group"
                  >
                    Get Your Free Quote
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white font-medium rounded hover:bg-white/5 transition-all duration-300"
                  >
                    Speak with an Expert
                  </Link>
                </div>
              </div>
              
              {/* Image */}
              <div className="cta-image hidden lg:block relative">
                <div className="absolute inset-0 bg-polaron-crimson/20 blur-3xl rounded-full transform scale-75" />
                <img
                  src="/images/cta-car.jpg"
                  alt="Premium vehicle transport"
                  className="relative w-full h-auto rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
