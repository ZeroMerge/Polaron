import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  CreditCard, 
  CheckCircle2,
  Car,
  User,
  MapPin,
  Shield,
  FileText,
  Truck
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface BookingForm {
  quoteId: string
  pickupAddress: string
  pickupCity: string
  pickupState: string
  pickupZip: string
  deliveryAddress: string
  deliveryCity: string
  deliveryState: string
  deliveryZip: string
  pickupDate: string
  deliveryDate: string
  flexibleDates: boolean
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
  vehicleColor: string
  vin: string
  condition: string
  modifications: string
  specialInstructions: string
  addOns: {
    expedited: boolean
    topLoad: boolean
    extraInsurance: boolean
    enclosed: boolean
  }
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
  billingZip: string
  agreeTerms: boolean
}

const BookPage = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  
  const [formData, setFormData] = useState<BookingForm>({
    quoteId: 'PQ-2024-1234',
    pickupAddress: '',
    pickupCity: '',
    pickupState: '',
    pickupZip: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryZip: '',
    pickupDate: '',
    deliveryDate: '',
    flexibleDates: false,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    vehicleMake: 'Mercedes-Benz',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    vin: '',
    condition: 'excellent',
    modifications: '',
    specialInstructions: '',
    addOns: {
      expedited: false,
      topLoad: false,
      extraInsurance: false,
      enclosed: false
    },
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingZip: '',
    agreeTerms: false
  })
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.book-hero-content',
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
      
      gsap.fromTo('.book-form-content',
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
    { number: 1, title: 'Locations', icon: MapPin },
    { number: 2, title: 'Schedule', icon: Calendar },
    { number: 3, title: 'Vehicle', icon: Car },
    { number: 4, title: 'Contact', icon: User },
    { number: 5, title: 'Payment', icon: CreditCard },
    { number: 6, title: 'Confirm', icon: CheckCircle2 }
  ]
  
  const handleInputChange = (field: keyof BookingForm | string, value: any) => {
    if (field.startsWith('addOns.')) {
      const addonField = field.replace('addOns.', '') as keyof BookingForm['addOns']
      setFormData(prev => ({
        ...prev,
        addOns: {
          ...prev.addOns,
          [addonField]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }
  
  const handleNext = () => {
    if (currentStep < 6 && isStepValid(currentStep)) {
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
        return formData.pickupAddress.length > 3 && formData.deliveryAddress.length > 3
      case 2:
        return formData.pickupDate !== '' && formData.deliveryDate !== ''
      case 3:
        return formData.vehicleModel !== '' && formData.vehicleYear !== ''
      case 4:
        return formData.firstName !== '' && formData.lastName !== '' && formData.email.includes('@') && formData.phone.length > 9
      case 5:
        return formData.cardNumber.length >= 15 && formData.cardName !== '' && formData.expiryDate.length >= 4 && formData.cvv.length >= 3 && formData.agreeTerms
      default:
        return true
    }
  }
  
  const handleBooking = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setBookingConfirmed(true)
    }, 2000)
  }
  
  const calculateDeposit = () => {
    const base = 1500 // Mock base price
    const multiplier = formData.addOns.enclosed ? 1.8 : formData.addOns.expedited ? 1.3 : 1.0
    return Math.round(base * multiplier * 0.25)
  }
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-lg bg-polaron-crimson/10 border border-polaron-crimson/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-polaron-crimson/20 flex items-center justify-center">
                  <span className="text-polaron-crimson text-sm font-bold">!</span>
                </div>
                <div>
                  <div className="text-white font-medium">Quote Reference</div>
                  <div className="text-white/60 text-sm">{formData.quoteId}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-polaron-crimson" />
                Pickup Location
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.pickupAddress}
                  onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                  placeholder="Street Address"
                  className="sm:col-span-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
                <input
                  type="text"
                  value={formData.pickupCity}
                  onChange={(e) => handleInputChange('pickupCity', e.target.value)}
                  placeholder="City"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
                <input
                  type="text"
                  value={formData.pickupState}
                  onChange={(e) => handleInputChange('pickupState', e.target.value)}
                  placeholder="State"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
                <input
                  type="text"
                  value={formData.pickupZip}
                  onChange={(e) => handleInputChange('pickupZip', e.target.value)}
                  placeholder="ZIP Code"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-polaron-crimson" />
                Delivery Location
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.deliveryAddress}
                  onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                  placeholder="Street Address"
                  className="sm:col-span-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
                <input
                  type="text"
                  value={formData.deliveryCity}
                  onChange={(e) => handleInputChange('deliveryCity', e.target.value)}
                  placeholder="City"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
                <input
                  type="text"
                  value={formData.deliveryState}
                  onChange={(e) => handleInputChange('deliveryState', e.target.value)}
                  placeholder="State"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
                <input
                  type="text"
                  value={formData.deliveryZip}
                  onChange={(e) => handleInputChange('deliveryZip', e.target.value)}
                  placeholder="ZIP Code"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Preferred Pickup Date</label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-polaron-crimson transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Preferred Delivery Date</label>
              <input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-polaron-crimson transition-colors"
              />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.flexibleDates}
                onChange={(e) => handleInputChange('flexibleDates', e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-polaron-crimson focus:ring-polaron-crimson"
              />
              <span className="text-white/70 text-sm">I have flexible dates (may reduce cost)</span>
            </label>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-polaron-crimson/20 flex items-center justify-center">
                  <span className="text-polaron-crimson font-bold">MB</span>
                </div>
                <div>
                  <div className="text-white font-medium">Mercedes-Benz</div>
                  <div className="text-white/60 text-sm">Specialized transport</div>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                As Mercedes-Benz transport specialists, we understand the unique requirements 
                of your vehicle. All our services include specialized handling protocols.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Model</label>
                <input
                  type="text"
                  value={formData.vehicleModel}
                  onChange={(e) => handleInputChange('vehicleModel', e.target.value)}
                  placeholder="e.g., S-Class 560"
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
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Color</label>
                <input
                  type="text"
                  value={formData.vehicleColor}
                  onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
                  placeholder="e.g., Obsidian Black"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">VIN (Optional)</label>
                <input
                  type="text"
                  value={formData.vin}
                  onChange={(e) => handleInputChange('vin', e.target.value)}
                  placeholder="Vehicle Identification Number"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => handleInputChange('condition', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-polaron-crimson transition-colors"
              >
                <option value="excellent">Excellent - Showroom condition</option>
                <option value="good">Good - Minor wear, no damage</option>
                <option value="fair">Fair - Some cosmetic issues</option>
                <option value="restored">Fully Restored - Classic restored</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Modifications (Optional)</label>
              <textarea
                value={formData.modifications}
                onChange={(e) => handleInputChange('modifications', e.target.value)}
                placeholder="List any aftermarket modifications or special features"
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Special Instructions (Optional)</label>
              <textarea
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                placeholder="Any specific requirements for pickup or delivery"
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors resize-none"
              />
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
          </div>
        )
        
      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/60">Deposit Required</span>
                <span className="text-2xl font-bold text-white">${calculateDeposit().toLocaleString()}</span>
              </div>
              <div className="text-white/50 text-xs">
                25% deposit to secure your booking. Remaining balance due at delivery.
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Card Number</label>
              <input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Cardholder Name</label>
              <input
                type="text"
                value={formData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value)}
                placeholder="Name on card"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Expiry</label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">CVV</label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">ZIP</label>
                <input
                  type="text"
                  value={formData.billingZip}
                  onChange={(e) => handleInputChange('billingZip', e.target.value)}
                  placeholder="12345"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-polaron-crimson transition-colors"
                />
              </div>
            </div>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-polaron-crimson focus:ring-polaron-crimson mt-0.5"
              />
              <span className="text-white/70 text-sm">
                I agree to the <a href="#" className="text-polaron-crimson hover:underline">Terms of Service</a> and 
                <a href="#" className="text-polaron-crimson hover:underline">Privacy Policy</a>. I authorize Polaron 
                to charge my card for the deposit amount.
              </span>
            </label>
            
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Shield size={16} className="text-polaron-crimson" />
                <span className="text-white font-medium text-sm">Secure Payment</span>
              </div>
              <p className="text-white/50 text-xs">
                Your payment information is encrypted and processed securely. We never store 
                your full card number on our servers.
              </p>
            </div>
          </div>
        )
        
      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-polaron-crimson/20 flex items-center justify-center mb-4">
                <FileText size={32} className="text-polaron-crimson" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Review Your Booking</h3>
              <p className="text-white/60">Please review all details before confirming.</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                  <MapPin size={16} className="text-polaron-crimson" />
                  Transport Details
                </h4>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-white/50">From:</span>
                    <span className="text-white ml-2">{formData.pickupAddress}, {formData.pickupCity}</span>
                  </div>
                  <div>
                    <span className="text-white/50">To:</span>
                    <span className="text-white ml-2">{formData.deliveryAddress}, {formData.deliveryCity}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Pickup:</span>
                    <span className="text-white ml-2">{formData.pickupDate}</span>
                  </div>
                  <div>
                    <span className="text-white/50">Delivery:</span>
                    <span className="text-white ml-2">{formData.deliveryDate}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                  <Car size={16} className="text-polaron-crimson" />
                  Vehicle Information
                </h4>
                <div className="text-sm">
                  <div className="text-white">{formData.vehicleYear} Mercedes-Benz {formData.vehicleModel}</div>
                  <div className="text-white/50">Color: {formData.vehicleColor || 'Not specified'}</div>
                  {formData.vin && <div className="text-white/50">VIN: {formData.vin}</div>}
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                  <User size={16} className="text-polaron-crimson" />
                  Contact Information
                </h4>
                <div className="text-sm">
                  <div className="text-white">{formData.firstName} {formData.lastName}</div>
                  <div className="text-white/50">{formData.email}</div>
                  <div className="text-white/50">{formData.phone}</div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                  <Truck size={16} className="text-polaron-crimson" />
                  Add-ons
                </h4>
                <div className="space-y-1 text-sm">
                  {formData.addOns.enclosed && <div className="text-white">Enclosed Transport</div>}
                  {formData.addOns.expedited && <div className="text-white">Expedited Shipping</div>}
                  {formData.addOns.topLoad && <div className="text-white">Top Load Priority</div>}
                  {formData.addOns.extraInsurance && <div className="text-white">Enhanced Insurance</div>}
                  {!formData.addOns.enclosed && !formData.addOns.expedited && !formData.addOns.topLoad && !formData.addOns.extraInsurance && (
                    <div className="text-white/50">No add-ons selected</div>
                  )}
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-polaron-crimson/10 border border-polaron-crimson/20">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Deposit Due Now</span>
                  <span className="text-2xl font-bold text-polaron-crimson">${calculateDeposit().toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleBooking}
              disabled={isProcessing}
              className="w-full py-4 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-all duration-300 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Confirm Booking & Pay Deposit'}
            </button>
          </div>
        )
        
      default:
        return null
    }
  }
  
  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-semibold text-white mb-4">Booking Confirmed!</h2>
          <p className="text-white/70 mb-2">Your shipment has been successfully booked.</p>
          <p className="text-white/50 text-sm mb-6">Confirmation email sent to {formData.email}</p>
          
          <div className="p-4 rounded-lg bg-white/5 border border-white/10 mb-6">
            <div className="text-white/50 text-sm mb-1">Booking Reference</div>
            <div className="text-xl font-bold text-polaron-crimson">PB-2024-{Math.floor(Math.random() * 9999)}</div>
          </div>
          
          <p className="text-white/50 text-sm mb-6">
            Our team will contact you within 24 hours to finalize pickup details and 
            provide tracking information.
          </p>
          
          <button className="w-full py-3 bg-polaron-crimson text-white font-medium rounded hover:bg-polaron-crimson/90 transition-colors">
            View Booking Details
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[40vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-polaron-crimson/10 to-black" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-polaron-crimson text-sm font-medium tracking-wider uppercase mb-4 block">
              Book Shipment
            </span>
            <h1 className="book-hero-content text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Secure Your
              <span className="text-polaron-crimson"> Transport</span>
            </h1>
            <p className="book-hero-content text-lg text-white/70 leading-relaxed">
              Complete your booking in minutes. Our streamlined process ensures 
              your Mercedes-Benz is scheduled for transport with precision.
            </p>
          </div>
        </div>
      </section>
      
      {/* Booking Form Section */}
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
                Step {currentStep} of 6
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
              
              {currentStep < 6 ? (
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
                  onClick={handleBooking}
                  disabled={!isStepValid(currentStep) || isProcessing}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isStepValid(currentStep)
                      ? 'bg-polaron-crimson text-white hover:bg-polaron-crimson/90'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Confirm Booking'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BookPage
