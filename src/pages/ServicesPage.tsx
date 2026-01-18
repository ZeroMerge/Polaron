import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Truck, 
  Home, 
  Globe, 
  Zap, 
  Shield, 
  CheckCircle2,
  ArrowRight,
  ChevronDown
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  id: string
  title: string
  description: string
  longDescription: string
  features: string[]
  icon: React.ElementType
  image: string
  priceRange: string
  deliveryTime: string
  insurance: string
}

const ServicesPage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const [expandedService, setExpandedService] = useState<string | null>('enclosed')
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.services-hero-content',
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      // Service cards animations
      gsap.fromTo('.service-detail-card',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      // Comparison table animations
      gsap.fromTo('.comparison-row',
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: comparisonRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
    
    return () => ctx.revert()
  }, [])
  
  const services: Service[] = [
    {
      id: 'open',
      title: 'Open Transport',
      description: 'Cost-effective shipping for standard vehicles',
      longDescription: 'Our open transport service provides reliable, cost-effective shipping for standard vehicles. While your vehicle is exposed to the elements, our professional drivers and secure tie-downs ensure safe delivery. Ideal for daily drivers and non-collectible vehicles.',
      features: [
        'Most economical option',
        'Fast pickup and delivery',
        'Professional driver handling',
        'Full insurance coverage',
        'Real-time tracking'
      ],
      icon: Truck,
      image: '/images/services-fleet.jpg',
      priceRange: '$0.75 - $1.25 per mile',
      deliveryTime: '5-14 days',
      insurance: '$100,000 included'
    },
    {
      id: 'enclosed',
      title: 'Enclosed Transport',
      description: 'Maximum protection for premium vehicles',
      longDescription: 'Our enclosed transport service offers the ultimate protection for your Mercedes-Benz. Fully enclosed trailers shield your vehicle from weather, debris, and prying eyes. Climate-controlled options available for sensitive classic models.',
      features: [
        'Complete weather protection',
        'Climate control available',
        'Hydraulic lift gates',
        'Soft tie-downs only',
        'Dedicated handling',
        'Enhanced security'
      ],
      icon: Shield,
      image: '/images/services-enclosed.jpg',
      priceRange: '$1.50 - $2.50 per mile',
      deliveryTime: '7-21 days',
      insurance: '$2,000,000 included'
    },
    {
      id: 'door-to-door',
      title: 'Door-to-Door',
      description: 'Convenience delivered to your location',
      longDescription: 'Our white-glove door-to-door service eliminates the hassle of terminal visits. We pick up your vehicle from your specified location and deliver it directly to your destination. Perfect for busy professionals and collectors.',
      features: [
        'Pickup at your location',
        'Delivery to destination',
        'Flexible scheduling',
        'No terminal visits',
        'Personalized service',
        'Direct communication'
      ],
      icon: Home,
      image: '/images/services-door-to-door.jpg',
      priceRange: 'Custom quote',
      deliveryTime: 'As scheduled',
      insurance: '$2,000,000 included'
    },
    {
      id: 'expedited',
      title: 'Expedited Shipping',
      description: 'When time is critical, we deliver speed',
      longDescription: 'When you need your vehicle transported urgently, our expedited service ensures priority handling and faster delivery. Dedicated transport options available for time-sensitive moves and event deadlines.',
      features: [
        'Priority scheduling',
        'Guaranteed pickup',
        'Express delivery',
        'Dedicated team',
        '24/7 updates',
        'Flexible routing'
      ],
      icon: Zap,
      image: '/images/cta-car.jpg',
      priceRange: 'Premium rate',
      deliveryTime: '1-7 days',
      insurance: '$2,000,000 included'
    },
    {
      id: 'international',
      title: 'International',
      description: 'Global reach with local expertise',
      longDescription: 'Shipping your Mercedes-Benz internationally requires specialized knowledge. We handle customs documentation, port coordination, and regulatory compliance across 80+ countries. Air and ocean freight options available.',
      features: [
        'Customs documentation',
        'Port coordination',
        'Air & ocean freight',
        'Regulatory compliance',
        'Destination support',
        'Full tracking'
      ],
      icon: Globe,
      image: '/images/about-hero.jpg',
      priceRange: 'Custom quote',
      deliveryTime: '30-90 days',
      insurance: 'Full coverage'
    }
  ]
  
  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id)
  }
  
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-polaron-crimson/10 to-black" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Our Services
            </span>
            <h1 className="services-hero-content text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Transport Solutions for Every
              <span className="text-polaron-crimson"> Need</span>
            </h1>
            <p className="services-hero-content text-lg text-white/70 leading-relaxed">
              From standard open transport to white-glove enclosed shipping, we offer 
              comprehensive solutions tailored to your vehicle and requirements.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Detail Section */}
      <section ref={servicesRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-detail-card rounded-xl overflow-hidden border transition-all duration-500 ${
                  expandedService === service.id 
                    ? 'bg-white/[0.03] border-polaron-crimson/30' 
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Header - Always visible */}
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full p-6 flex items-center gap-6 text-left"
                >
                  <div className="w-16 h-16 rounded-lg bg-polaron-crimson/20 flex items-center justify-center flex-shrink-0">
                    <service.icon size={28} className="text-polaron-crimson" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{service.title}</h3>
                    <p className="text-white/60 text-sm">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-polaron-crimson font-medium hidden sm:block">{service.priceRange}</span>
                    <ChevronDown 
                      size={20} 
                      className={`text-white/60 transition-transform duration-300 ${
                        expandedService === service.id ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </button>
                
                {/* Expanded Content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  expandedService === service.id ? 'max-h-[1000px]' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Image and Description */}
                      <div>
                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">{service.longDescription}</p>
                      </div>
                      
                      {/* Details */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Service Features</h4>
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3 text-white/70 text-sm">
                              <CheckCircle2 size={16} className="text-polaron-crimson flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="text-xs text-white/50 mb-1">Price Range</div>
                            <div className="text-sm font-medium text-white">{service.priceRange}</div>
                          </div>
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="text-xs text-white/50 mb-1">Delivery Time</div>
                            <div className="text-sm font-medium text-white">{service.deliveryTime}</div>
                          </div>
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <div className="text-xs text-white/50 mb-1">Insurance</div>
                            <div className="text-sm font-medium text-white">{service.insurance}</div>
                          </div>
                        </div>
                        
                        <button className="w-full py-3 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-colors flex items-center justify-center gap-2">
                          Get Quote for {service.title}
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Comparison Table */}
      <section ref={comparisonRef} className="py-24 relative overflow-hidden bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Compare Services
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Choose the Right Service
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="comparison-row text-left py-4 px-4 text-white font-semibold">Feature</th>
                  <th className="comparison-row text-center py-4 px-4 text-white font-semibold">Open Transport</th>
                  <th className="comparison-row text-center py-4 px-4 text-white font-semibold">Enclosed Transport</th>
                  <th className="comparison-row text-center py-4 px-4 text-white font-semibold">Door-to-Door</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="comparison-row py-4 px-4 text-white/70 text-sm">Weather Protection</td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
                  </td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  </td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="comparison-row py-4 px-4 text-white/70 text-sm">Security</td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
                  </td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  </td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="comparison-row py-4 px-4 text-white/70 text-sm">Cost Effectiveness</td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  </td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
                  </td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="comparison-row py-4 px-4 text-white/70 text-sm">Convenience</td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
                  </td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
                  </td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="comparison-row py-4 px-4 text-white/70 text-sm">Speed</td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                  </td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
                  </td>
                  <td className="comparison-row py-4 px-4 text-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
                  </td>
                </tr>
                <tr>
                  <td className="comparison-row py-4 px-4 text-white/70 text-sm">Best For</td>
                  <td className="comparison-row py-4 px-4 text-center text-white/60 text-xs">Daily drivers</td>
                  <td className="comparison-row py-4 px-4 text-center text-white/60 text-xs">Premium & classics</td>
                  <td className="comparison-row py-4 px-4 text-center text-white/60 text-xs">Busy professionals</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-white/60">Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-white/60">Good</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-polaron-crimson/10 to-black border border-polaron-crimson/20 p-12 lg:p-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Our transport specialists can help you choose the right service for your vehicle and budget.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-all duration-300 hover:shadow-glow">
                Speak with a Specialist
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
