"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Leaf, Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react"
import { ScrollReveal } from "@/components/animated-text"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <ScrollReveal delay={0}>
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                className="p-2 bg-primary rounded-full"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <span className="font-serif text-xl font-bold">
                Mediaserv <span className="text-secondary">Advertising</span>
              </span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Zimbabwe&apos;s premier digital platform connecting farmers with suppliers, knowledge, and opportunities for agricultural success.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="p-2.5 bg-background/10 rounded-full hover:bg-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal delay={0.1}>
            <h4 className="font-semibold text-base mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-background/70">
              {[
                { name: "Marketplace", href: "/directory" },
                { name: "Knowledge Center", href: "/magazine" },
                { name: "Blog", href: "/blog" },
                { name: "Weather Updates", href: "/weather" },
                { name: "Market Prices", href: "/prices" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal delay={0.2}>
            <h4 className="font-semibold text-base mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-background/70">
              {[
                { name: "Advertise With Us", href: "/advertise" },
                { name: "List Your Products", href: "/advertise" },
                { name: "Premium Membership", href: "/premium" },
                { name: "Agricultural Consulting", href: "/consulting" },
                { name: "Business Directory", href: "/directory" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.3}>
            <h4 className="font-semibold text-base mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm text-background/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Mediaserv Advertising</p>
                  <p className="text-background/70 text-xs">40 St Athana Rd Bluffhill, Harare, Zimbabwe</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>+263772295191 / +263771416655</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <span>hello@mediaserv.co.zw</span>
              </li>
            </ul>
          </ScrollReveal>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2026 Mediaserv Advertising. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-background transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-background transition-colors">
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
