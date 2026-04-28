"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Megaphone,
  Users,
  Eye,
  TrendingUp,
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText, ScrollReveal } from "@/components/animated-text"
import { AIAssistant } from "@/components/ai-assistant"

const stats = [
  { icon: Users, value: "15,000+", label: "Monthly Visitors" },
  { icon: Eye, value: "250,000+", label: "Page Views" },
  { icon: TrendingUp, value: "45%", label: "Avg. Engagement" },
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
    answer: "Once we receive your payment and ad materials, your ad will be live within 24-48 hours. Rush processing is available for an additional fee.",
  },
  {
    question: "Can I change my ad content during the campaign?",
    answer: "Yes, you can request up to 2 content changes per month at no extra cost. Additional changes may incur a small editing fee.",
  },
  {
    question: "What file formats do you accept?",
    answer: "We accept JPG, PNG, GIF (for banners), and MP4 (for video ads). Maximum file size is 5MB for images and 50MB for videos.",
  },
  {
    question: "Do you offer discounts for long-term campaigns?",
    answer: "Yes! We offer 10% off for 3-month commitments and 20% off for 6-month or longer campaigns.",
  },
  {
    question: "Can I target specific audiences?",
    answer: "Absolutely. We can target by region (Harare, Bulawayo, etc.), farming type (tobacco, livestock, crops), or equipment interests.",
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

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
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
            <p className="text-muted-foreground text-lg mb-8">
              Reach Zimbabwe&apos;s most engaged farming community. Connect with over 15,000 active farmers and agricultural businesses.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mx-auto mb-3">
                    <stat.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="block text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ad Formats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              Ad Formats
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Advertising Format
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Multiple options to suit your marketing goals and budget
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adFormats.map((format, index) => (
              <motion.div
                key={format.id}
                className={`relative bg-card rounded-2xl p-6 border-2 transition-all cursor-pointer ${
                  selectedFormat === format.id
                    ? "border-primary shadow-xl"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedFormat(format.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
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
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Sizes: {format.sizes.join(", ")}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Placements Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              Ad Placements
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Where Your Ads Will Appear
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Strategic placements for maximum visibility and engagement
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adPlacements.map((placement, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-xl overflow-hidden border border-border group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
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
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{placement.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{placement.position}</p>
                  <span className="text-xs text-primary font-medium">{placement.traffic}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Conditions + Payment Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Terms & Conditions */}
            <ScrollReveal>
              <div className="bg-card rounded-2xl p-8 border border-border h-full">
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
              </div>
            </ScrollReveal>

            {/* Payment Methods */}
            <ScrollReveal delay={0.1}>
              <div className="bg-card rounded-2xl p-8 border border-border h-full">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Payment Methods</h3>
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl"
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
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
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
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
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
                      formStep >= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-full h-1 mx-2 ${
                        formStep > step ? "bg-primary" : "bg-muted"
                      }`}
                      style={{ width: "80px" }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Contact Info */}
            {formStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
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
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="font-serif text-xl font-bold mb-6">Advertisement Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Select Ad Format</Label>
                    <RadioGroup defaultValue={selectedFormat} className="mt-2 grid grid-cols-2 gap-3">
                      {adFormats.map((format) => (
                        <div key={format.id} className="flex items-center space-x-2">
                          <RadioGroupItem value={format.id} id={format.id} />
                          <Label htmlFor={format.id} className="cursor-pointer">
                            {format.name} - {format.price}
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
                    <Textarea
                      id="description"
                      placeholder="Describe your product or service..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Upload & Payment */}
            {formStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="font-serif text-xl font-bold mb-6">Upload & Payment</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Upload Ad Creative</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground mb-2">
                        Drag and drop your files here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Accepted: JPG, PNG, GIF, MP4 (Max 50MB)
                      </p>
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
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Help Deciding?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our advertising team is ready to help you create the perfect campaign for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full" asChild>
                <Link href="mailto:ads@agri-ad.co.zw">
                  <Mail className="mr-2 h-5 w-5" />
                  Email Us
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link href="tel:+263242123456">
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
