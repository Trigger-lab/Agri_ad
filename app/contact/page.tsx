"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, Leaf, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText, ScrollReveal } from "@/components/animated-text"
import { AIAssistant } from "@/components/ai-assistant"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Mediaserv Advertising", "40 St Athana Rd Bluffhill", "Harare, Zimbabwe"],
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+263772295191", "+263771416655"],
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@mediaserv.co.zw", "ads@mediaserv.co.zw"],
    color: "bg-secondary/10 text-secondary-foreground",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Mon - Fri: 8:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"],
    color: "bg-accent/10 text-accent",
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, oklch(0.96 0.015 140) 0%, oklch(0.98 0.005 120) 50%, oklch(0.97 0.012 100) 100%)" }}>
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(34,120,60,0.12) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(180,140,30,0.10) 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='0.03'%3E%3Cpath d='M20 20c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border-primary/30 text-primary bg-primary/5">
              <Leaf className="h-3 w-3 mr-1.5" /> Connect With Our Team
            </Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              <AnimatedText text="Get In Touch" type="wave" />
            </h1>
            <p className="text-muted-foreground text-lg">
              Have questions or want to partner with us? We&apos;d love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full opacity-30" style={{ background: "radial-gradient(ellipse, rgba(34,120,60,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ScrollReveal>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {contactInfo.map((info, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <Card className="h-full border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
                      <CardContent className="pt-6">
                        <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center mb-4`}>
                          <info.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.2}>
              <Card className="border-primary/15 shadow-xl bg-white/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Send Us a Message</CardTitle>
                  <Separator className="mt-2 bg-primary/10" />
                </CardHeader>
                <CardContent>
                  <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us more about your inquiry..." className="mt-1 min-h-32" />
                    </div>
                    <Button size="lg" className="w-full rounded-full">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Interactive Map & GPS Navigation */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(34,120,60,0.05) 50%, transparent)" }} />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">Find Us</h2>
          </ScrollReveal>
          <Card className="overflow-hidden border border-emerald-500/10 shadow-[0_20px_50px_rgba(22,101,52,0.08)] bg-white/70 backdrop-blur-md rounded-[2.5rem]">
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[500px]">
              {/* Directions Panel */}
              <div className="p-8 lg:p-10 lg:col-span-2 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white via-white/80 to-emerald-50/20">
                {/* Subtle top decoration glow */}
                <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
                
                <div className="space-y-8 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="flex p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-800 shadow-inner">
                      <Compass className="h-6 w-6 animate-[spin_10s_linear_infinite]" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-700">HQ Location</span>
                      <h3 className="font-serif text-2xl font-black text-foreground leading-none mt-1">Visit Our Office</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Come visit us at our offices in Bluffhill. We're always happy to have a conversation, share a coffee, and build strategies together.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Address Detail Card */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100/50 hover:bg-emerald-50/50 transition-all duration-300">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-emerald-700">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-800/60 uppercase tracking-wider">Address</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">40 St Athana Rd, Bluffhill</p>
                        <p className="text-xs text-muted-foreground">Harare, Zimbabwe</p>
                      </div>
                    </div>
                    
                    {/* Status / Working Hours Card */}
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/30 border border-emerald-100/50 hover:bg-emerald-50/50 transition-all duration-300">
                      <div className="p-2 bg-white rounded-xl shadow-sm text-emerald-700">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-emerald-800/60 uppercase tracking-wider">Working Hours</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">Mon - Fri: 8:00 AM - 5:00 PM</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-medium text-emerald-700">Location Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 relative z-10">
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=40+St+Athana+Rd+Bluffhill+Harare+Zimbabwe" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex w-full items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 via-primary to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-primary-foreground px-6 py-4 rounded-2xl font-bold text-sm shadow-[0_10px_20px_rgba(22,101,52,0.15)] hover:shadow-[0_15px_30px_rgba(22,101,52,0.25)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <Compass className="h-5 w-5 transition-transform group-hover:rotate-45 duration-300" />
                    <span>Track Live Route & Navigate</span>
                  </a>
                  <p className="text-[10px] text-muted-foreground/80 text-center mt-2.5 font-medium">
                    Integrates with Google Maps for real-time turn-by-turn directions
                  </p>
                </div>
              </div>

              {/* Interactive Iframe Map */}
              <div className="lg:col-span-3 h-[400px] lg:h-auto relative border-t lg:border-t-0 lg:border-l border-emerald-100 overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500 z-10" />
                <iframe 
                  src="https://maps.google.com/maps?q=40%20St%20Athana%20Rd%20Bluffhill%20Harare%20Zimbabwe&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[400px] lg:min-h-full transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  )
}
