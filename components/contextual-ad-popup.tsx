"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, ExternalLink, Sparkles, Sprout, Droplets, Tractor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ads = [
  {
    id: "tobacco",
    title: "Kutsaga Certified Tobacco Seeds",
    category: "Zimbabwe Seeds Co.",
    description: "High-yielding, disease-resistant tobacco varieties. Expertly bred for resilience and premium leaf quality.",
    image: "https://t3.ftcdn.net/jpg/10/06/35/58/360_F_1006355849_QtLftL1dfaa0dLwBiw6HySPsYGY6SHvE.jpg",
    cta: "Learn More",
    link: "/directory",
    color: "bg-secondary",
    icon: Sprout,
  },
  {
    id: "irrigation",
    title: "Center Pivot Irrigation Systems",
    category: "Agritex Solutions",
    description: "Don't depend on the rain. Modernize your farm with precision center pivot systems from Zimbabwe's leaders in irrigation.",
    image: "https://th.bing.com/th/id/R.72e10e5824440da553b51531740a0831?rik=rIpd6f2Mobtprw&riu=http%3a%2f%2fwww.pumpindustry.com.au%2fwp-content%2fuploads%2f2020%2f10%2fshutterstock_1018280029-e1602215828674.jpg&ehk=4h38PHHj3389%2fDQ5g368A8wUvAkgdpZ28c58riWVWS0%3d&risl=&pid=ImgRaw&r=0",
    cta: "Get a Quote",
    link: "/directory",
    color: "bg-blue-500",
    icon: Droplets,
  },
  {
    id: "feeds",
    title: "ProFeeds: Quality Nutrition",
    category: "Animal Nutrition",
    description: "Formulated for growth and efficiency. Our premium cattle and poultry feeds ensure your livestock achieves peak performance.",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=600&fit=crop",
    cta: "View Catalog",
    link: "/directory",
    color: "bg-orange-500",
    icon: Sparkles,
  },
  {
    id: "machinery",
    title: "John Deere 5E Series Now Available",
    category: "Irvines Farm Equipment",
    description: "Finance options available. Trade-in your old tractor today.",
    image: "https://tse2.mm.bing.net/th/id/OIP.-GhwJ7UiQuVTIRWm_5oouwHaGP?rs=1&pid=ImgDetMain&o=7&rm=3",
    cta: "Request Demo",
    link: "/directory",
    color: "bg-primary",
    icon: Tractor,
  },
]

const COOLDOWN_MS = 5 * 60 * 1000 // 5 minutes

export function ContextualAdPopup() {
  const [open, setOpen] = useState(false)
  const [currentAd, setCurrentAd] = useState(ads[0])
  const [mounted, setMounted] = useState(false)
  const dismissCount = useRef(0)
  const cooldownUntil = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show a new ad after a delay — respects 2-minute cooldown after 2 dismisses
  useEffect(() => {
    if (mounted && !open) {
      const now = Date.now()
      const remaining = cooldownUntil.current - now
      const delay = remaining > 0 ? remaining : 5000

      const timer = setTimeout(() => {
        const randomAd = ads[Math.floor(Math.random() * ads.length)]
        setCurrentAd(randomAd)
        setOpen(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [mounted, open])

  // Auto-dismiss after 6 seconds
  useEffect(() => {
    if (open) {
      const dismissTimer = setTimeout(() => {
        setOpen(false)
      }, 6000)
      return () => clearTimeout(dismissTimer)
    }
  }, [open])

  const handleDismiss = () => {
    dismissCount.current += 1
    if (dismissCount.current >= 2) {
      cooldownUntil.current = Date.now() + COOLDOWN_MS
      dismissCount.current = 0
    }
    setOpen(false)
  }

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] pointer-events-none max-w-[calc(100vw-2rem)]">
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-[280px] sm:w-[380px] bg-card/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
          >
            <div className="relative h-24 sm:h-40">
              <Image
                src={currentAd.image}
                alt={currentAd.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2 right-2 z-20">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full bg-black/20 hover:bg-black/40 text-white border border-white/20 backdrop-blur-md"
                  onClick={handleDismiss}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="absolute bottom-2 left-3 sm:bottom-3 sm:left-4 z-10">
                <Badge className={`${currentAd.color} text-white border-none px-2 py-0.5 text-[10px] font-semibold shadow-lg`}>
                  <currentAd.icon className="h-2.5 w-2.5 mr-1" />
                  {currentAd.category}
                </Badge>
              </div>
            </div>

            <div className="p-3 sm:p-5">
              <h3 className="font-serif text-base sm:text-xl font-bold text-foreground mb-1 leading-tight">
                {currentAd.title}
              </h3>
              <p className="text-muted-foreground text-[11px] sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                {currentAd.description}
              </p>

              <div className="flex gap-2">
                <Button className="rounded-full flex-1 h-8 sm:h-9 text-[11px] sm:text-xs font-semibold group relative overflow-hidden bg-primary hover:bg-primary/90 transition-all hover:shadow-lg" asChild>
                  <Link href={currentAd.link}>
                    <span className="relative z-10 flex items-center justify-center">
                      {currentAd.cta}
                      <ArrowRight className="ml-1.5 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="rounded-full h-8 sm:h-9 text-[10px] border-border/50 bg-white/5 hover:bg-white/10 transition-colors" asChild>
                  <Link href="/advertise">
                    Ads
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-muted/30 px-3 sm:px-5 py-1.5 sm:py-2 flex items-center justify-between border-t border-border/10">
              <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-semibold">Sponsored</span>
              <span className="flex items-center gap-1 text-[8px] text-muted-foreground hover:text-primary cursor-pointer transition-colors">
                Info <ExternalLink className="h-2 w-2" />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

