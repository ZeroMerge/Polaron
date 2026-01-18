import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Car, 
  Truck, 
  Clock, 
  CheckCircle2,
  Info,
  ArrowRight,
  Calculator,
  Shield
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface QuoteForm {
  origin: string
  destination: string
  vehicleType: string
  shippingMethod: string
  timeframe: string
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleModel: string
  vehicleYear: string
  condition: string
}

const QuotePage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [quote, setQuote] = useState<{
    basePrice: number
    distance: number
    methodMultiplier: number
    timeframeMultiplier: number
    total: number
    range: string
  } | null>(null)
  
  const [formData, setFormData] = useState<QuoteForm>({
    origin: '',
    destination: '',
    vehicleType: '',
    shippingMethod: '',
    timeframe: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleModel: '',
    vehicleYear: '',
    condition: ''
  })
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.quote-hero-content',
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
      
      gsap.fromTo('.quote-form-content',
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
  
  const steps = [
    { number: 1, title: 'Route', icon: MapPin },
    { number: 2, title: 'Vehicle', icon: Car },
    { number: 3, title: 'Shipping', icon: Truck },
    { number: 4, title: 'Contact', icon: Info },
    { number: 5, title: 'Quote', icon: Calculator }
  ]
  
  const vehicleTypes = [
    { value: 'sedan', label: 'Sedan/Coupe', icon: Car },
    { value: 'suv', label: 'SUV/Truck', icon: Truck },
    { value: 'classic', label: 'Classic Mercedes', icon: Car },
    { value: 'amg', label: 'AMG Performance', icon: Car },
    { value: 'convertible', label: 'Convertible', icon: Car },
    { value: 'limited', label: 'Limited Edition', icon: Car }
  ]
  
  const shippingMethods = [
    { 
      value: 'open', 
      label: 'Open Transport', 
      description: 'Cost-effective for standard vehicles',
      price: 1.0
    },
    { 
      value: 'enclosed', 
      label: 'Enclosed Transport', 
      description: 'Premium protection for valuable vehicles',
      price: 1.8
    },
    { 
      value: 'single', 
      label: 'Single Carrier', 
      description: 'Dedicated transport for ultimate protection',
      price: 2.5
    }
  ]
  
  const timeframes = [
    { value: 'standard', label: 'Standard (7-14 days)', multiplier: 1.0 },
    { value: 'expedited', label: 'Expedited (3-7 days)', multiplier: 1.3 },
    { value: 'rush', label: 'Rush (1-3 days)', multiplier: 1.6 }
  ]
  
  const conditions = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'restored', label: 'Fully Restored' }
  ]
  
  const handleInputChange = (field: keyof QuoteForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  const calculateDistance = (origin: string, destination: string): number => {
    // Mock distance calculation - in real app, this would use a mapping API
    const distances: Record<string, number> = {
      'new-york-los-angeles': 2800,
      'new-york-miami': 1300,
      'new-york-chicago': 800,
      'los-angeles-chicago': 2000,
      'los-angeles-miami': 2700,
      'chicago-miami': 1400,
      'new-york-london': 3500,
      'los-angeles-tokyo': 5500,
      'miami-sao-paulo': 4200
    }
    
    const key = `${origin.toLowerCase().replace(/\s+/g, '-')}-${destination.toLowerCase().replace(/\s+/g, '-')}`
    return distances[key] || Math.floor(Math.random() * 2000) + 500
  }
  
  const calculateQuote = () => {
    setIsCalculating(true)
    
    // Simulate API call
    setTimeout(() => {
      const distance = calculateDistance(formData.origin, formData.destination)
      const method = shippingMethods.find(m => m.value === formData.shippingMethod)
      const timeframe = timeframes.find(t => t.value === formData.timeframe)
      
      const basePrice = distance * 0.85 // Base rate per mile
      const methodMultiplier = method?.price || 1.0
      const timeframeMultiplier = timeframe?.multiplier || 1.0
      
      const total = basePrice * methodMultiplier * timeframeMultiplier
      const min = total * 0.9
      const max = total * 1.1
      
      setQuote({
        basePrice,
        distance,
        methodMultiplier,
        timeframeMultiplier,
        total,
        range: `$${min.toLocaleString()} - $${max.toLocaleString()}`
      })
      
      setIsCalculating(false)
      setShowResult(true)
    }, 1500)
  }
  
  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.origin.length > 2 && formData.destination.length > 2
      case 2:
        return formData.vehicleType !== '' && formData.vehicleModel !== '' && formData.vehicleYear !== ''
      case 3:
        return formData.shippingMethod !== '' && formData.timeframe !== ''
      case 4:
        return formData.firstName !== '' && formData.lastName !== '' && formData.email.includes('@') && formData.phone.length > 9
      default:
        return true
    }
  }
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Origin Location</label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
                placeholder="e.g., New York, NY"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Destination Location</label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                placeholder="e.g., Los Angeles, CA"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
              />
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-white mb-3">Vehicle Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {vehicleTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleInputChange('vehicleType', type.value)}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      formData.vehicleType === type.value
                        ? 'bg-polaron-crimson/20 border-polaron-crimson text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    <type.icon size={24} className="mx-auto mb-2" />
                    <div className="text-xs">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Vehicle Model</label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                  placeholder="e.g., S-Class, SL550"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Year</label>
                <input
                  type="text"
                  value={formData.vehicleYear}
                  onChange={(e) => handleInputChange('vehicleYear', e.target.value)}
                  placeholder="e.g., 2023"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-3">Vehicle Condition</label>
              <div className="flex flex-wrap gap-3">
                {conditions.map((condition) => (
                  <button
                    key={condition.value}
                    onClick={() => handleInputChange('condition', condition.value)}
                    className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                      formData.condition === condition.value
                        ? 'bg-polaron-crimson/20 border-polaron-crimson text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-white mb-3">Shipping Method</label>
              <div className="space-y-3">
                {shippingMethods.map((method) => (
                  <button
                    key={method.value}
                    onClick={() => handleInputChange('shippingMethod', method.value)}
                    className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                      formData.shippingMethod === method.value
                        ? 'bg-polaron-crimson/20 border-polaron-crimson'
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">{method.label}</div>
                        <div className="text-white/60 text-sm">{method.description}</div>
                      </div>
                      <div className="text-polaron-crimson font-medium text-sm">
                        {method.price === 1.0 ? 'Base rate' : `${method.price}x base rate`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-3">Timeframe</label>
              <div className="space-y-3">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe.value}
                    onClick={() => handleInputChange('timeframe', timeframe.value)}
                    className={`w-full p-4 rounded-lg border text-left transition-all duration-300 ${
                      formData.timeframe === timeframe.value
                        ? 'bg-polaron-crimson/20 border-polaron-crimson'
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-white">{timeframe.label}</div>
                      <div className="text-polaron-crimson font-medium text-sm">
                        {timeframe.multiplier === 1.0 ? 'No extra cost' : `${timeframe.multiplier}x cost`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Your first name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Your last name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
              />
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-polaron-crimson/10 border border-polaron-crimson/20">
              <Info size={18} className="text-polaron-crimson flex-shrink-0 mt-0.5" />
              <p className="text-white/70 text-sm">
                Your information is secure and will only be used to provide your quote. 
                We never share your data with third parties.
              </p>
            </div>
          </div>
        )
        
      case 5:
        if (showResult && quote) {
          return (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Your Quote is Ready</h3>
                <p className="text-white/60">Based on your requirements, here's your estimated cost.</p>
              </div>
              
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-polaron-crimson mb-2">{quote.range}</div>
                  <div className="text-white/60 text-sm">Estimated Total Cost</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Distance</span>
                    <span className="text-white">{quote.distance.toLocaleString()} miles</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Base Rate</span>
                    <span className="text-white">${quote.basePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Shipping Method</span>
                    <span className="text-white">{quote.methodMultiplier}x</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Timeframe</span>
                    <span className="text-white">{quote.timeframeMultiplier}x</span>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white font-medium">Estimated Total</span>
                      <span className="text-polaron-crimson font-semibold">{quote.range}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/60 text-sm text-center">
                  This is an estimate. Final pricing may vary based on exact locations, 
                  vehicle specifications, and current market conditions.
                </p>
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-colors">
                  Proceed to Booking
                </button>
                <button 
                  onClick={() => setShowResult(false)}
                  className="px-6 py-3 border border-white/20 text-white font-medium rounded hover:bg-white/5 transition-colors"
                >
                  Modify Quote
                </button>
              </div>
            </div>
          )
        }
        
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <Calculator size={48} className="mx-auto text-polaron-crimson mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Calculate Your Quote</h3>
              <p className="text-white/60">Review your information and get your instant estimate.</p>
            </div>
            
            <div className="space-y-4 p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-white/50 mb-1">Route</div>
                  <div className="text-white">{formData.origin} → {formData.destination}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">Vehicle</div>
                  <div className="text-white">{formData.vehicleYear} {formData.vehicleModel}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">Shipping Method</div>
                  <div className="text-white">{shippingMethods.find(m => m.value === formData.shippingMethod)?.label}</div>
                </div>
                <div>
                  <div className="text-white/50 mb-1">Timeframe</div>
                  <div className="text-white">{timeframes.find(t => t.value === formData.timeframe)?.label}</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={calculateQuote}
              disabled={isCalculating}
              className="w-full py-4 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  Get Instant Quote
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        )
        
      default:
        return null
    }
  }
  
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[40vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-polaron-crimson/10 to-black" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Get a Quote
            </span>
            <h1 className="quote-hero-content text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Instant Quote for Your
              <span className="text-polaron-crimson"> Mercedes-Benz</span>
            </h1>
            <p className="quote-hero-content text-lg text-white/70 leading-relaxed">
              Get a detailed estimate in minutes. No obligations, just expert guidance 
              tailored to your vehicle transport needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Quote Form Section */}
      <section ref={formRef} className="py-24 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep > step.number
                        ? 'bg-polaron-crimson'
                        : currentStep === step.number
                        ? 'bg-polaron-crimson/20 border-2 border-polaron-crimson'
                        : 'bg-white/5 border border-white/20'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 size={20} className="text-white" />
                    ) : (
                      <step.icon size={20} className={currentStep === step.number ? 'text-polaron-crimson' : 'text-white/50'} />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-0.5 mx-2 transition-colors duration-300 ${
                      currentStep > step.number ? 'bg-polaron-crimson' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`text-xs transition-colors duration-300 ${
                    currentStep >= step.number ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>
          
          {/* Form Card */}
          <div className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/10">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">
                {steps[currentStep - 1]?.title}
              </h2>
              <p className="text-white/60 text-sm mt-1">
                Step {currentStep} of 5
              </p>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {renderStep()}
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentStep === 1
                    ? 'text-white/30 cursor-not-allowed'
                    : 'text-white hover:bg-white/5'
                }`}
              >
                <ChevronLeft size={16} />
                Back
              </button>
              
              {currentStep < 5 ? (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isStepValid(currentStep)
                      ? 'bg-polaron-crimson text-white hover:bg-polaron-crimson/90'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={calculateQuote}
                  disabled={!isStepValid(currentStep) || isCalculating}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isStepValid(currentStep)
                      ? 'bg-polaron-crimson text-white hover:bg-polaron-crimson/90'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {isCalculating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      Get Quote
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-polaron-crimson/20 flex items-center justify-center mb-3">
                <Shield size={20} className="text-polaron-crimson" />
              </div>
              <div className="text-white font-medium text-sm">Fully Insured</div>
              <div className="text-white/50 text-xs">$2M coverage</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-polaron-crimson/20 flex items-center justify-center mb-3">
                <Clock size={20} className="text-polaron-crimson" />
              </div>
              <div className="text-white font-medium text-sm">Instant Quote</div>
              <div className="text-white/50 text-xs">No waiting</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-polaron-crimson/20 flex items-center justify-center mb-3">
                <CheckCircle2 size={20} className="text-polaron-crimson" />
              </div>
              <div className="text-white font-medium text-sm">No Obligation</div>
              <div className="text-white/50 text-xs">Free quote</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default QuotePage
