"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { AuthForms } from '@/components/auth-forms'
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  LogOut, User, ArrowRight, Cloud, Shield, BarChart3, DollarSign, 
  Zap, Globe, Timer, Users, Lock, Check, Star, Building,
  Mail, Phone, MessageSquare, Send, MapPin, Clock, HeadphonesIcon, CheckCircle
} from 'lucide-react'
import { HeroBackground, AnimatedBackground } from '@/components/ui/animated-background'

export default function Home() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', subject: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleAuthAction = () => {
    if (user) {
      logout()
    } else {
      setShowAuthModal(true)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise(resolve => setTimeout(resolve, 1000))
    setContactSubmitted(true)
    setTimeout(() => {
      setContactSubmitted(false)
      setContactForm({ name: '', email: '', company: '', subject: '', message: '' })
    }, 3000)
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AquaCloud
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium transition-colors">
                Pricing
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium transition-colors">
                Contact
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <AnimatedThemeToggler />
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <User className="h-4 w-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <Button variant="ghost" onClick={handleAuthAction} className="text-red-600 hover:text-red-700">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" onClick={handleAuthAction}>Sign In</Button>
                  <Button onClick={handleAuthAction} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <HeroBackground className="pt-24 pb-20">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Transfer Data as<br />Naturally as Water Flows
              </span>
            </h1>
            
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Seamlessly move files between cloud platforms with enterprise-grade security, real-time progress tracking, and cost transparency.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" onClick={handleAuthAction} className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all">
                Start Free Trial
                <ArrowRight className="h-6 w-6 ml-2" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection('features')} className="px-12 py-6 text-xl font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-105 transition-all">
                Learn More
              </Button>
            </div>

            <p className="text-gray-500 dark:text-gray-400">
              No credit card required • 14-day free trial • Join 10,000+ companies
            </p>
          </div>
        </div>
      </HeroBackground>

      {/* Features Section */}
      <AnimatedBackground className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to move data between cloud platforms securely and efficiently
            </p>
          </div>

          {/* Main Features */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption and compliance with industry standards",
                features: ["AES-256 encryption", "SOC 2 compliance", "GDPR compliant", "End-to-end encryption"]
              },
              {
                icon: BarChart3,
                title: "Real-time Tracking", 
                description: "Monitor transfers with detailed progress and analytics",
                features: ["Live monitoring", "Transfer analytics", "Performance metrics", "Complete history"]
              },
              {
                icon: DollarSign,
                title: "Cost Transparency",
                description: "Clear pricing with no hidden fees or surprises",
                features: ["Upfront costs", "No hidden fees", "Detailed billing", "Cost optimization"]
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white/95 dark:bg-slate-800 rounded-2xl border-2 border-gray-300 dark:border-slate-600 p-8 shadow-2xl hover:shadow-3xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-6">
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center justify-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Optimized transfer speeds" },
              { icon: Globe, title: "Global Network", desc: "Worldwide infrastructure" },
              { icon: Timer, title: "Scheduled Transfers", desc: "Automated operations" },
              { icon: Users, title: "Team Collaboration", desc: "Share with your team" },
              { icon: Lock, title: "Access Controls", desc: "Granular permissions" },
              { icon: Cloud, title: "Multi-Cloud", desc: "20+ cloud providers" }
            ].map((feature, index) => (
              <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-all bg-white/95 dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-600 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{feature.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedBackground>

      {/* Pricing Section */}
      <AnimatedBackground className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Start free, scale as you grow.
            </p>
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full mt-4">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">14-day free trial • No credit card required</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter", price: "$9", period: "/month", icon: Users, popular: false,
                features: ["100GB transfers/month", "5 cloud connections", "Basic monitoring", "Email support"]
              },
              {
                name: "Professional", price: "$29", period: "/month", icon: Zap, popular: true,
                features: ["1TB transfers/month", "Unlimited connections", "Real-time analytics", "Priority support", "Team collaboration", "API access"]
              },
              {
                name: "Enterprise", price: "Custom", period: "", icon: Building, popular: false,
                features: ["Unlimited transfers", "All platforms", "Advanced analytics", "24/7 support", "SSO integration", "SLA guarantees"]
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white/95 dark:bg-slate-800 rounded-2xl border-2 p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 backdrop-blur-sm ${
                  plan.popular 
                    ? 'border-blue-400 dark:border-blue-500 ring-2 ring-blue-400 dark:ring-blue-500 ring-opacity-50' 
                    : 'border-gray-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl w-fit mx-auto mb-4">
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full py-3 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600' : ''}`} variant={plan.popular ? 'default' : 'outline'} onClick={handleAuthAction}>
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedBackground>

      {/* Contact Section */}
      <AnimatedBackground className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions? We're here to help. Reach out and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Send className="h-6 w-6 mr-3 text-blue-600" />
                Send us a Message
              </h3>
              
              {contactSubmitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-fit mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-gray-600 dark:text-gray-400">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 dark:text-gray-200 font-medium">Full Name</Label>
                      <Input value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-gray-200 font-medium">Email</Label>
                      <Input type="email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} required className="mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-gray-700 dark:text-gray-200 font-medium">Company</Label>
                    <Input value={contactForm.company} onChange={(e) => setContactForm({...contactForm, company: e.target.value})} className="mt-1" />
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-200 font-medium">Subject</Label>
                    <Input value={contactForm.subject} onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} required className="mt-1" />
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-200 font-medium">Message</Label>
                    <textarea className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white" rows={5} value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} required />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3">
                    Send Message
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              )}
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Other Ways to Reach Us</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, title: "Email", contact: "hello@aquacloud.com", desc: "24/7" },
                    { icon: Phone, title: "Phone", contact: "+1 (555) 123-4567", desc: "Mon-Fri 9AM-6PM EST" },
                    { icon: MessageSquare, title: "Live Chat", contact: "Available in app", desc: "Mon-Fri 9AM-6PM EST" }
                  ].map((method, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-all">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <method.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{method.title}</h4>
                          <p className="font-medium">{method.contact}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{method.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  Our Offices
                </h3>
                <div className="space-y-4">
                  {[
                    { city: "San Francisco", address: "123 Tech Street\nSan Francisco, CA 94105", time: "PST" },
                    { city: "New York", address: "456 Business Ave\nNew York, NY 10001", time: "EST" },
                    { city: "London", address: "789 Innovation Road\nLondon, EC1A 1BB, UK", time: "GMT" }
                  ].map((office, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-semibold">{office.city}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line mb-1">{office.address}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {office.time}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Support CTA */}
          <div className="text-center mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full w-fit mx-auto mb-6">
              <HeadphonesIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Need Immediate Help?</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any urgent issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                <HeadphonesIcon className="h-5 w-5 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" size="lg" className="px-8 border-blue-600 text-blue-600">
                <Users className="h-5 w-5 mr-2" />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </AnimatedBackground>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">AquaCloud</span>
            </div>
            <p className="text-gray-400 mb-6">Transfer data as naturally as water flows</p>
            <p className="text-sm text-gray-500">© 2024 AquaCloud. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthForms isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
