"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Megaphone,
  Check,
  ArrowRight,
  Upload,
  CreditCard,
  Smartphone,
  Globe,
  Mail,
  Phone,
  FileImage,
  LayoutGrid,
  Video,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Target,
  Users,
  BarChart2,
  Zap,
  ShieldCheck,
  Globe2,
  BadgeCheck,
  Handshake,
  ChevronRight,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText, ScrollReveal } from "@/components/animated-text"
import { AIAssistant } from "@/components/ai-assistant"

const advantages = [
  {
    icon: Target,
    title: "Precision Audience Targeting",
    description:
      "Reach farmers, suppliers, and agribusinesses by region, crop type, and farming specialty. Your message lands where it matters most.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Users,
    title: "Zimbabwe's Largest Agri Community",
    description:
      "Connect with Zimbabwe's most active and engaged agricultural audience — from smallholder farmers to large commercial operations.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: BarChart2,
    title: "Measurable ROI",
    description:
      "Receive monthly performance reports with detailed analytics. Understand exactly how your campaigns are performing and optimize accordingly.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: Zap,
    title: "Fast Go-Live",
    description:
      "Your advertisement goes live within 24–48 hours of submitting materials and payment. Fast, simple, and hassle-free.",
    color: "bg-yellow-500/10 text-yellow-600",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Credible Platform",
    description:
      "Agri-Ad is a respected editorial voice in Zimbabwean agriculture. Advertising here builds brand authority and trust within the community.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Globe2,
    title: "Multi-Format Flexibility",
    description:
      "From banner ads and featured listings to video spots and sponsored articles — choose the format that best tells your brand story.",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: BadgeCheck,
    title: "Quality Content Environment",
    description:
      "Your ads appear alongside premium editorial content — expert articles, market reports, and guides — elevating your brand perception.",
    color: "bg-teal-500/10 text-teal-600",
  },
  {
    icon: Handshake,
    title: "Dedicated Support Team",
    description:
      "Our advertising specialists will guide you every step of the way — from creative advice to campaign planning and reporting.",
    color: "bg-rose-500/10 text-rose-600",
  },
]

const adFormats = [
  {
    id: "banner",
    name: "Banner Ad",
    icon: LayoutGrid,
    description: "Prominent placement at the top of key pages",
    sizes: ["728x90", "300x250", "970x250"],
    price: "$150",
    period: "per month",
    features: ["High visibility", "Above the fold", "All pages"],
  },
  {
    id: "featured",
    name: "Featured Listing",
    icon: FileImage,
    description: "Showcase your products in the marketplace spotlight",
    sizes: ["600x400", "1200x800"],
    price: "$250",
    period: "per month",
    features: ["Homepage placement", "Category pages", "Priority ranking"],
    popular: true,
  },
  {
    id: "video",
    name: "Video Ad",
    icon: Video,
    description: "Engaging video content in our video section",
    sizes: ["1920x1080", "1280x720"],
    price: "$400",
    period: "per month",
    features: ["Auto-play option", "15-30 seconds", "Video section"],
  },
  {
    id: "sponsored",
    name: "Sponsored Article",
    icon: MessageSquare,
    description: "Native content that tells your brand story",
    sizes: ["Full article"],
    price: "$500",
    period: "per article",
    features: ["Blog feature", "Social sharing", "Permanent archive"],
  },
]

const paymentMethods = [
  { name: "EcoCash", icon: Smartphone, description: "Mobile money payment" },
  { name: "Bank Transfer", icon: CreditCard, description: "Direct bank deposit" },
  { name: "PayPal", icon: Globe, description: "International payments" },
]

const adPlacements = [
  {
    name: "Homepage Hero",
    position: "Top banner on homepage",
    traffic: "100% of visitors",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
  },
  {
    name: "Sidebar",
    position: "Right column on all pages",
    traffic: "95% of visitors",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
  {
    name: "Marketplace Spotlight",
    position: "Featured products section",
    traffic: "80% of visitors",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=250&fit=crop",
  },
  {
    name: "Blog In-Article",
    position: "Within blog content",
    traffic: "60% of visitors",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop",
  },
]

const faqs = [
  {
    question: "How long does it take for my ad to go live?",
    answer:
      "Once we receive your payment and ad materials, your ad will be live within 24-48 hours. Rush processing is available for an additional fee.",
  },
  {
    question: "Can I change my ad content during the campaign?",
    answer:
      "Yes, you can request up to 2 content changes per month at no extra cost. Additional changes may incur a small editing fee.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "We accept JPG, PNG, GIF (for banners), and MP4 (for video ads). Maximum file size is 5MB for images and 50MB for videos.",
  },
  {
    question: "Do you offer discounts for long-term campaigns?",
    answer:
      "Yes! We offer 10% off for 3-month commitments and 20% off for 6-month or longer campaigns.",
  },
  {
    question: "Can I target specific audiences?",
    answer:
      "Absolutely. We can target by region (Harare, Bulawayo, etc.), farming type (tobacco, livestock, crops), or equipment interests.",
  },
]

const conditions = [
  "All advertisements must be related to agriculture, farming, or rural business",
  "Content must be appropriate and not misleading",
  "We reserve the right to reject ads that don't meet our standards",
  "Payment is required before ad placement",
  "Cancellations must be made 7 days before the next billing cycle",
  "Ad performance reports are provided monthly",
]

export default function AdvertisePage() {
  const [selectedFormat, setSelectedFormat] = useState("featured")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [formStep, setFormStep] = useState(1)
  const [showPricing, setShowPricing] = useState(false)

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, oklch(0.96 0.015 140) 0%, oklch(0.98 0.005 120) 50%, oklch(0.97 0.012 100) 100%)" }}>
      <Header />

      {/* Hero Section — NO stats */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Megaphone className="h-10 w-10 text-primary" />
            </motion.div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              <AnimatedText text="Advertise With Us" type="swash" />
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Grow your agricultural business by reaching Zimbabwe's most engaged farming community. Premium placements, expert support, measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 font-bold shadow-xl"
                onClick={() => {
                  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Start Advertising
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-bold border-primary/30 text-primary hover:bg-primary/5"
                onClick={() => {
                  setShowPricing(true)
                  setTimeout(() => {
                    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
                  }, 100)
                }}
              >
                View Pricing
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs font-black uppercase tracking-widest mb-4">
              Why Advertise With Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              <AnimatedText text="The Agri-Ad Advantage" type="wave" />
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              When you advertise with Agri-Ad, you're not just buying ad space — you're partnering with Zimbabwe's most trusted agricultural platform.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, index) => (
              <motion.div
                key={adv.title}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ y: -6 }}
              >
                <Card className="bg-white/70 backdrop-blur-sm border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${adv.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                      <adv.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2 leading-tight">
                      {adv.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {adv.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pricing Reveal CTA */}
          <ScrollReveal className="text-center mt-16">
            <Card className="inline-block border-primary/10 bg-white/75 backdrop-blur-sm rounded-3xl p-2 max-w-2xl mx-auto">
              <CardContent className="px-8 py-10">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  Ready to see pricing?
                </h3>
                <p className="text-muted-foreground mb-6">
                  We offer flexible packages to suit every budget — from startups to established agri-businesses. Click below to explore all formats, prices, and payment methods.
                </p>
                <Button
                  id="pricing-btn"
                  size="lg"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-10 font-bold shadow-xl hover:scale-105 transition-all active:scale-95"
                  onClick={() => {
                    setShowPricing(true)
                    setTimeout(() => {
                      document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
                    }, 100)
                  }}
                >
                  View Prices & Payment Methods
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing & Payment Section — revealed on button click */}
      <AnimatePresence>
        {showPricing && (
          <motion.div
            id="pricing"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {/* Ad Formats */}
            <section className="py-16 bg-muted/30 border-y border-border/50">
              <div className="container mx-auto px-4">
                <ScrollReveal className="text-center mb-12">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-xs font-semibold uppercase tracking-wider">
                      Pricing
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPricing(false)}
                    >
                      <X className="h-4 w-4 mr-1" /> Hide
                    </Button>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Choose Your Advertising Format
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Multiple options to suit your marketing goals and budget
                  </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {adFormats.map((format, index) => (
                    <motion.div
                      key={format.id}
                      className="group"
                      onClick={() => setSelectedFormat(format.id)}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className={`relative bg-white/70 backdrop-blur-sm transition-all cursor-pointer h-full border-2 ${
                        selectedFormat === format.id
                          ? "border-primary shadow-xl scale-[1.02]"
                          : "border-primary/10 hover:border-primary/50 shadow-sm"
                      }`}>
                        <CardContent className="pt-6">
                          {format.popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                              Most Popular
                            </span>
                          )}
                          <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                            <format.icon className="h-7 w-7 text-primary" />
                          </div>
                          <h3 className="font-serif text-xl font-bold text-foreground mb-2">{format.name}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{format.description}</p>
                          <div className="mb-4">
                            <span className="text-3xl font-bold text-primary">{format.price}</span>
                            <span className="text-muted-foreground text-sm">/{format.period}</span>
                          </div>
                          <ul className="space-y-2">
                            {format.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="h-4 w-4 text-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 pt-4 border-t border-primary/10">
                            <p className="text-xs text-muted-foreground">Sizes: {format.sizes.join(", ")}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Payment Methods */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <ScrollReveal>
                    <Card className="bg-white/70 backdrop-blur-sm border-primary/10 h-full">
                      <CardContent className="p-8">
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Payment Methods</h3>
                        <div className="space-y-4">
                          {paymentMethods.map((method, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/5 hover:border-primary/15 transition-all duration-300"
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <method.icon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground">{method.name}</h4>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <p className="mt-6 text-sm text-muted-foreground">
                          All prices are in USD. Local currency equivalent accepted via EcoCash at prevailing rates.
                        </p>
                      </CardContent>
                    </Card>
                  </ScrollReveal>

                  <ScrollReveal delay={0.1}>
                    <Card className="bg-white/70 backdrop-blur-sm border-primary/10 h-full">
                      <CardContent className="p-8">
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Terms & Conditions</h3>
                        <ul className="space-y-4">
                          {conditions.map((condition, index) => (
                            <motion.li
                              key={index}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{condition}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                </div>

                {/* Ad Placements */}
                <ScrollReveal className="text-center mt-16 mb-12">
                  <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Where Your Ads Will Appear</h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Strategic placements for maximum visibility and engagement
                  </p>
                </ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {adPlacements.map((placement, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-white/70 backdrop-blur-sm border-primary/10 hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full">
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={placement.image}
                            alt={placement.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">YOUR AD HERE</span>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-foreground mb-1">{placement.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{placement.position}</p>
                          <span className="text-xs text-primary font-medium">{placement.traffic}</span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto">
              Fill out the form below and our team will get back to you within 24 hours
            </p>
          </ScrollReveal>

          <motion.div
            className="max-w-2xl mx-auto bg-card text-foreground rounded-2xl p-8 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      formStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`h-1 mx-2 ${formStep > step ? "bg-primary" : "bg-muted"}`}
                      style={{ width: "80px" }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Contact Info */}
            {formStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-serif text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your Company" className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+263 77 123 4567" className="mt-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Ad Details */}
            {formStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-serif text-xl font-bold mb-6">Advertisement Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Select Ad Format</Label>
                    <RadioGroup
                      value={selectedFormat}
                      onValueChange={setSelectedFormat}
                      className="mt-2 grid grid-cols-2 gap-3"
                    >
                      {adFormats.map((format) => (
                        <div key={format.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={format.id} id={format.id} />
                          <Label htmlFor={format.id} className="cursor-pointer">
                            {format.name} — {format.price}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="duration">Campaign Duration</Label>
                    <select
                      id="duration"
                      className="w-full mt-1 px-3 py-2 bg-background border border-input rounded-md"
                    >
                      <option>1 Month</option>
                      <option>3 Months (10% off)</option>
                      <option>6 Months (20% off)</option>
                      <option>12 Months (30% off)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="description">What are you advertising?</Label>
                    <Textarea id="description" placeholder="Describe your product or service..." className="mt-1" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Upload & Payment */}
            {formStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-serif text-xl font-bold mb-6">Upload & Payment</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Upload Ad Creative</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground mb-2">Drag and drop your files here, or click to browse</p>
                      <p className="text-xs text-muted-foreground">Accepted: JPG, PNG, GIF, MP4 (Max 50MB)</p>
                    </div>
                  </div>
                  <div>
                    <Label>Preferred Payment Method</Label>
                    <RadioGroup defaultValue="ecocash" className="mt-2 space-y-2">
                      {paymentMethods.map((method) => (
                        <div key={method.name} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                          <RadioGroupItem value={method.name.toLowerCase()} id={method.name} />
                          <Label htmlFor={method.name} className="flex-1 cursor-pointer flex items-center gap-3">
                            <method.icon className="h-5 w-5 text-primary" />
                            {method.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {formStep > 1 ? (
                <Button variant="outline" onClick={() => setFormStep(formStep - 1)}>
                  Previous
                </Button>
              ) : (
                <div />
              )}
              {formStep < 3 ? (
                <Button onClick={() => setFormStep(formStep + 1)}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Submit Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              FAQ
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-xl border border-border overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-semibold text-foreground">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">Need Help Deciding?</h2>
            <p className="text-muted-foreground mb-6">
              Our advertising team is ready to help you create the perfect campaign for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="mailto:ads@mediaserv.co.zw">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link href="tel:+263772295191">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  )
}
