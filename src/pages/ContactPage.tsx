import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  CheckCircle2
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ContactPage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    vehicleInterest: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero-content',
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
      
      gsap.fromTo('.contact-form-content',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
    
    return () => ctx.revert()
  }, [])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri 8AM-6PM EST'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@polaron.com',
      description: 'Response within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Transport Way, New York, NY 10001',
      description: 'By appointment only'
    },
    {
      icon: Clock,
      title: 'Emergency Line',
      content: '+1 (555) 999-HELP',
      description: '24/7 for active shipments'
    }
  ]
  
  const subjects = [
    'General Inquiry',
    'Get a Quote',
    'Book Shipment',
    'Track Vehicle',
    'Membership Inquiry',
    'Insurance Question',
    'Partnership Opportunity',
    'Other'
  ]
  
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-polaron-crimson/10 to-black" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Contact Us
            </span>
            <h1 className="contact-hero-content text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Let's Discuss Your
              <span className="text-polaron-crimson"> Transport</span>
            </h1>
            <p className="contact-hero-content text-lg text-white/70 leading-relaxed">
              Whether you're ready to ship or just exploring options, our specialists 
              are here to provide expert guidance tailored to your needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section ref={formRef} className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
                Get in Touch
              </span>
              <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-6">
                Reach Out Today
              </h2>
              <p className="text-white/70 leading-relaxed mb-12">
                Our team of Mercedes-Benz transport specialists is ready to assist you. 
                Whether you have questions about our services, need a custom quote, 
                or want to discuss a complex shipment, we're here to help.
              </p>
              
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-polaron-crimson/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={22} className="text-polaron-crimson" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                      <p className="text-white/80">{item.content}</p>
                      <p className="text-white/50 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Office Hours */}
              <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Monday - Friday</span>
                    <span className="text-white">8:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Saturday</span>
                    <span className="text-white">9:00 AM - 2:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-white/60">Emergency Line</span>
                    <span className="text-polaron-crimson">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form-content">
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">Send Us a Message</h3>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <CheckCircle2 size={32} className="text-green-500" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                    <p className="text-white/60">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Your first name"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Your last name"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-polaron-crimson transition-colors"
                      >
                        <option value="">Select a subject</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="vehicleInterest" className="block text-sm font-medium text-white mb-2">
                        Vehicle of Interest (Optional)
                      </label>
                      <input
                        type="text"
                        id="vehicleInterest"
                        name="vehicleInterest"
                        value={formData.vehicleInterest}
                        onChange={handleChange}
                        placeholder="e.g., 2023 S-Class 560"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your transport needs..."
                        rows={5}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors resize-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-4 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Send Message
                      <Send size={18} />
                    </button>
                    
                    <p className="text-white/40 text-xs text-center">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
