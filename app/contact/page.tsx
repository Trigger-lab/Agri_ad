"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText, ScrollReveal } from "@/components/animated-text"
import { AIAssistant } from "@/components/ai-assistant"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["14 Samora Machel Avenue", "Harare, Zimbabwe"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+263 788 402 106"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@agri-ad.co.zw", "support@agri-ad.co.zw"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Mon - Fri: 8:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"],
  },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <ScrollReveal>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-card rounded-xl border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-sm">{detail}</p>
                    ))}
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.2}>
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <form className="space-y-5">
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
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      className="mt-1 min-h-32"
                    />
                  </div>
                  <Button size="lg" className="w-full rounded-full">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">Find Us</h2>
          </ScrollReveal>
          <div className="h-96 bg-card rounded-2xl border border-border flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive Map</p>
              <p className="text-sm text-muted-foreground">14 Samora Machel Avenue, Harare</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  )
}
