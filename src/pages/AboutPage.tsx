import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield, Award, Users, Clock, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.about-hero-content',
        { opacity: 0, y: 50 },
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
      
      gsap.fromTo('.about-hero-image',
        { opacity: 0, scale: 1.1 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      // Content animations
      gsap.fromTo('.about-text',
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      // Values animations
      gsap.fromTo('.value-card',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      
      // Team animations
      gsap.fromTo('.team-content',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
    
    return () => ctx.revert()
  }, [])
  
  const values = [
    {
      icon: Shield,
      title: 'Asset Protection',
      description: 'Every vehicle is treated as a valuable investment, with comprehensive insurance and meticulous handling protocols.'
    },
    {
      icon: Award,
      title: 'Heritage & Precision',
      description: 'Drawing from decades of logistics expertise, we apply engineering-grade precision to every shipment.'
    },
    {
      icon: Users,
      title: 'Partnership Approach',
      description: 'We build long-term relationships with our clients, becoming their trusted transport partner for years.'
    },
    {
      icon: Clock,
      title: 'Reliability Above All',
      description: 'On-time delivery, transparent communication, and unwavering commitment to our commitments.'
    }
  ]
  
  const milestones = [
    { year: '2009', title: 'Founded', description: 'Polaron established with a focus on premium vehicle transport' },
    { year: '2012', title: 'Expansion', description: 'Extended services to international shipping across 30 countries' },
    { year: '2016', title: 'Mercedes Partnership', description: 'Became preferred transport partner for Mercedes-Benz collectors' },
    { year: '2020', title: 'Technology', description: 'Launched real-time tracking platform and digital booking system' },
    { year: '2024', title: 'Global Reach', description: 'Now serving 80+ countries with specialized Mercedes-Benz expertise' }
  ]
  
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-polaron-crimson/10 to-black" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="about-hero-content">
              <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
                About Polaron
              </span>
              <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
                Precision in
                <span className="text-polaron-crimson"> Every</span>
                <br />Shipment
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                For over 15 years, Polaron has been the trusted name in premium vehicle transport. 
                We specialize exclusively in high-value Mercedes-Benz vehicles, treating each shipment 
                as the investment asset it truly is.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-polaron-crimson/20 flex items-center justify-center">
                    <Shield size={20} className="text-polaron-crimson" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">$2M</div>
                    <div className="text-xs text-white/60">Insurance Coverage</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-polaron-crimson/20 flex items-center justify-center">
                    <Award size={20} className="text-polaron-crimson" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">15+</div>
                    <div className="text-xs text-white/60">Years Excellence</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="about-hero-image relative">
              <div className="absolute inset-0 bg-polaron-crimson/20 blur-3xl rounded-full transform scale-75" />
              <img
                src="/images/about-hero.jpg"
                alt="Polaron fleet on the road"
                className="relative w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section ref={contentRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
                Our Story
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">
                Built on a Foundation of Trust
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p className="about-text">
                  Polaron was founded with a simple yet powerful vision: to bring institutional-grade 
                  logistics precision to the world of premium vehicle transport. What began as a small 
                  operation focused on classic car collectors has evolved into a global network serving 
                  the most discerning Mercedes-Benz owners.
                </p>
                <p className="about-text">
                  Our specialization in Mercedes-Benz vehicles isn't just a marketing choice—it's the 
                  result of decades of accumulated expertise. We understand the unique requirements of 
                  these vehicles, from the precise loading angles needed for AMG models to the climate 
                  control requirements for classic SL convertibles.
                </p>
                <p className="about-text">
                  Today, Polaron operates across 80+ countries, serving private collectors, dealerships, 
                  and automotive investors who demand nothing less than perfection in vehicle transport.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="about-text flex items-center gap-2 text-white/80">
                  <CheckCircle2 size={18} className="text-polaron-crimson" />
                  <span className="text-sm">Licensed & Bonded</span>
                </div>
                <div className="about-text flex items-center gap-2 text-white/80">
                  <CheckCircle2 size={18} className="text-polaron-crimson" />
                  <span className="text-sm">FMCSA Compliant</span>
                </div>
                <div className="about-text flex items-center gap-2 text-white/80">
                  <CheckCircle2 size={18} className="text-polaron-crimson" />
                  <span className="text-sm">ISO 9001 Certified</span>
                </div>
              </div>
            </div>
            
            {/* Timeline */}
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className="about-text relative pl-8 border-l-2 border-polaron-crimson/30"
                >
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-polaron-crimson transform -translate-x-[7px]" />
                  <div className="text-polaron-crimson font-bold text-lg mb-1">{milestone.year}</div>
                  <h3 className="text-white font-semibold mb-1">{milestone.title}</h3>
                  <p className="text-white/60 text-sm">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section ref={valuesRef} className="py-24 relative overflow-hidden bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              The Polaron Difference
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              These principles guide every decision we make and every shipment we handle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-polaron-crimson/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-polaron-crimson/20 flex items-center justify-center mb-6 group-hover:bg-polaron-crimson/30 transition-colors">
                  <value.icon size={28} className="text-polaron-crimson" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section ref={teamRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="team-content">
              <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
                Our Team
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">
                Experts in Every Aspect
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Our team brings together logistics experts, Mercedes-Benz specialists, and customer 
                service professionals who share a passion for precision and excellence.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Every member of the Polaron team undergoes rigorous training in vehicle handling, 
                customer communication, and problem-solving. We don't just move vehicles—we protect 
                investments and preserve memories.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-3xl font-bold text-polaron-crimson mb-1">50+</div>
                  <div className="text-white/60 text-sm">Transport Specialists</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-3xl font-bold text-polaron-crimson mb-1">15+</div>
                  <div className="text-white/60 text-sm">Mercedes Experts</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-3xl font-bold text-polaron-crimson mb-1">24/7</div>
                  <div className="text-white/60 text-sm">Support Team</div>
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-3xl font-bold text-polaron-crimson mb-1">100%</div>
                  <div className="text-white/60 text-sm">Trained Drivers</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-polaron-crimson/20 blur-3xl rounded-full transform scale-75" />
              <img
                src="/images/about-team.jpg"
                alt="Polaron team"
                className="relative w-full h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
