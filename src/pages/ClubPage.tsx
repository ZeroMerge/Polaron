import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Crown, 
  Shield, 
  Star, 
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Award,
  Headphones,
  FileText,
  Calendar
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ClubPage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const tiersRef = useRef<HTMLDivElement>(null)
  const [selectedTier] = useState<'collector' | 'ambassador' | 'legacy'>('collector')
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.club-hero-content',
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
      
      gsap.fromTo('.benefit-card',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      gsap.fromTo('.tier-card',
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tiersRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
    
    return () => ctx.revert()
  }, [])
  
  const benefits = [
    {
      icon: Shield,
      title: 'Priority Scheduling',
      description: 'Skip the queue with guaranteed pickup within 48 hours for domestic shipments.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Concierge',
      description: 'Your personal transport specialist available 24/7 for all your needs.'
    },
    {
      icon: UserCheck,
      title: 'Enhanced Insurance',
      description: 'Up to $5M coverage for high-value vehicles, automatically included.'
    },
    {
      icon: Award,
      title: 'Exclusive Events',
      description: 'Invitations to private Mercedes-Benz events and collector gatherings.'
    },
    {
      icon: FileText,
      title: 'Market Insights',
      description: 'Quarterly reports on Mercedes-Benz market trends and investment values.'
    },
    {
      icon: Calendar,
      title: 'Annual Transport Credit',
      description: 'Receive transport credits worth up to 10% of your annual membership fee.'
    }
  ]
  
  const tiers = {
    collector: {
      name: 'Collector',
      price: '$2,500',
      period: '/year',
      description: 'For passionate Mercedes-Benz owners',
      features: [
        'Priority scheduling (72 hours)',
        'Dedicated phone support',
        '$2M enhanced insurance',
        'Quarterly market reports',
        '5% annual transport credit',
        'Member-only content access'
      ],
      color: 'from-polaron-crimson to-polaron-crimson/70',
      popular: false
    },
    ambassador: {
      name: 'Ambassador',
      price: '$5,000',
      period: '/year',
      description: 'For serious collectors and investors',
      features: [
        'Priority scheduling (48 hours)',
        'Dedicated concierge',
        '$3.5M enhanced insurance',
        'Monthly market reports',
        '7% annual transport credit',
        'Exclusive event invitations',
        'Complimentary first shipment'
      ],
      color: 'from-amber-500 to-amber-600',
      popular: true
    },
    legacy: {
      name: 'Legacy',
      price: '$10,000',
      period: '/year',
      description: 'For elite collectors and institutions',
      features: [
        'Priority scheduling (24 hours)',
        'Personal account manager',
        '$5M enhanced insurance',
        'Weekly market insights',
        '10% annual transport credit',
        'VIP event access',
        'Three complimentary shipments',
        'White-glove service guarantee'
      ],
      color: 'from-purple-500 to-purple-600',
      popular: false
    }
  }
  
  const handleApply = (tier: string) => {
    // Handle application
    console.log(`Applying for ${tier} membership`)
  }
  
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-polaron-crimson/10 to-black" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="club-hero-content">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-full bg-polaron-crimson/20 flex items-center justify-center">
                  <Crown size={28} className="text-polaron-crimson" />
                </div>
                <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase">
                  Exclusive Access
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
                The Polaron
                <span className="text-polaron-crimson"> Club</span>
              </h1>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                An exclusive membership ecosystem for discerning Mercedes-Benz owners. 
                Priority access, enhanced services, and insider privileges await.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('tiers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-all duration-300 hover:shadow-glow"
                >
                  Explore Memberships
                  <ArrowRight size={18} />
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white font-medium rounded hover:bg-white/5 transition-all duration-300">
                  Schedule Call
                </button>
              </div>
              
              <div className="flex flex-wrap gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-white/60 text-sm">Active Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">$2B+</div>
                  <div className="text-white/60 text-sm">Assets Protected</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-white/60 text-sm">Retention Rate</div>
                </div>
              </div>
            </div>
            
            <div className="club-hero-content relative">
              <div className="absolute inset-0 bg-polaron-crimson/20 blur-3xl rounded-full transform scale-75" />
              <img
                src="/images/club-showroom.jpg"
                alt="Exclusive car collection"
                className="relative w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Member Benefits
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Exclusive Privileges
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Membership unlocks a world of premium services and insider access designed 
              for the serious Mercedes-Benz collector.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card p-6 rounded-xl bg-white/5 border border-white/10 hover:border-polaron-crimson/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-lg bg-polaron-crimson/20 flex items-center justify-center mb-6 group-hover:bg-polaron-crimson/30 transition-colors">
                  <benefit.icon size={28} className="text-polaron-crimson" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Membership Tiers */}
      <section id="tiers" ref={tiersRef} className="py-24 relative overflow-hidden bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Membership Tiers
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Choose Your Level
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Three tiers designed to match your collection and transport needs.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {Object.entries(tiers).map(([key, tier]) => (
              <div
                key={key}
                className={`tier-card relative rounded-2xl overflow-hidden border transition-all duration-500 ${
                  selectedTier === key 
                    ? 'border-polaron-crimson/50 scale-105 z-10' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Header */}
                <div className={`p-6 bg-gradient-to-r ${tier.color} relative`}>
                  {tier.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/30 rounded-full text-xs text-white font-medium">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-white/70">{tier.period}</span>
                  </div>
                  <p className="text-white/80 text-sm mt-2">{tier.description}</p>
                </div>
                
                {/* Features */}
                <div className="p-6 bg-black">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 size={16} className="text-polaron-crimson flex-shrink-0 mt-0.5" />
                        <span className="text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => handleApply(key)}
                    className={`w-full mt-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                      selectedTier === key
                        ? 'bg-polaron-crimson text-white hover:bg-polaron-crimson/90'
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Comparison Table */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-white text-center mb-8">Compare All Benefits</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-white font-semibold">Benefit</th>
                    <th className="text-center py-4 px-4 text-white font-semibold">Collector</th>
                    <th className="text-center py-4 px-4 text-white font-semibold">Ambassador</th>
                    <th className="text-center py-4 px-4 text-white font-semibold">Legacy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-white/70 text-sm">Priority Scheduling</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">72 hours</td>
                    <td className="py-4 px-4 text-center text-polaron-crimson text-sm">48 hours</td>
                    <td className="py-4 px-4 text-center text-polaron-crimson text-sm">24 hours</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-white/70 text-sm">Insurance Coverage</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">$2M</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">$3.5M</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">$5M</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-white/70 text-sm">Dedicated Support</td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block w-2 h-2 rounded-full text-green-500">Manager</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-white/70 text-sm">Event Access</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">—</td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500">VIP</span>
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-white/70 text-sm">Annual Transport Credit</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">5%</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">7%</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">10%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-4 text-white/70 text-sm">Complimentary Shipments</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">—</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">1</td>
                    <td className="py-4 px-4 text-center text-white/50 text-sm">3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      {/* Application CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-polaron-crimson/10 to-black border border-polaron-crimson/20 p-12">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 mx-auto rounded-full bg-polaron-crimson/20 flex items-center justify-center mb-6">
                <Star size={32} className="text-polaron-crimson" />
              </div>
              <h2 className="text-3xl font-semibold text-white mb-4">
                Ready to Join?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Membership applications are reviewed within 48 hours. 
                Start your journey with Polaron Club today.
              </p>
              <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-all duration-300 hover:shadow-glow">
                Apply for Membership
                <ArrowRight size={18} />
              </button>
              <p className="text-white/40 text-sm mt-4">
                No application fees. Annual membership begins upon approval.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ClubPage
