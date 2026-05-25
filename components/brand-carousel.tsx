"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Droplets, Wheat, Leaf, Tractor, Sprout, TrendingUp, Users, Award, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

const brands = [
  {
    name: "Tobacco Research Board",
    logo: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop",
    icon: Leaf,
    tagline: "Kutsaga — Advancing Tobacco Science",
    color: "from-emerald-700 to-green-900",
    badge: "Research",
  },
  {
    name: "TIMB",
    logo: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200&h=200&fit=crop",
    icon: TrendingUp,
    tagline: "Tobacco Industry & Marketing Board",
    color: "from-green-600 to-emerald-800",
    badge: "Regulatory",
  },
  {
    name: "Zimbabwe Tobacco Association",
    logo: "https://tse3.mm.bing.net/th/id/OIP.IYy57xQaD3VIt-DRNCRqkgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Users,
    tagline: "Championing Growers' Interests",
    color: "from-emerald-600 to-teal-700",
    badge: "Association",
  },
  {
    name: "ADMA",
    logo: "https://tse2.mm.bing.net/th/id/OIP.-GhwJ7UiQuVTIRWm_5oouwHaGP?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Tractor,
    tagline: "Agricultural Dealers & Manufacturers",
    color: "from-orange-600 to-amber-700",
    badge: "Trade",
  },
  {
    name: "Corporate 24",
    logo: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop",
    icon: Award,
    tagline: "Healthcare for Every Farmer",
    color: "from-blue-600 to-indigo-700",
    badge: "Healthcare",
  },
  {
    name: "Frecon Solar",
    logo: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&h=200&fit=crop",
    icon: Sparkles,
    tagline: "Powering Agriculture Sustainably",
    color: "from-yellow-500 to-amber-600",
    badge: "Energy",
  },
  {
    name: "Amcotts",
    logo: "https://static.vecteezy.com/system/resources/thumbnails/037/995/719/small_2x/ai-generated-cotton-flower-branch-on-nature-photo.jpg",
    icon: Sprout,
    tagline: "Cotton Industry Leaders",
    color: "from-emerald-600 to-green-700",
    badge: "Cotton",
  },
  {
    name: "LoadAgropower",
    logo: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=200&h=200&fit=crop",
    icon: Tractor,
    tagline: "Mechanised Farm Power",
    color: "from-green-700 to-emerald-900",
    badge: "Machinery",
  },
  {
    name: "Feedmix",
    logo: "https://tse4.mm.bing.net/th/id/OIP.Q7YKmD8iepuwQbjN-n-7sgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Wheat,
    tagline: "Quality Animal Nutrition",
    color: "from-orange-500 to-red-600",
    badge: "Nutrition",
  },
  {
    name: "FSG",
    logo: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=200&h=200&fit=crop",
    icon: Leaf,
    tagline: "Farm & Supply Group",
    color: "from-emerald-700 to-green-900",
    badge: "Supply",
  },
  {
    name: "SeedCo",
    logo: "https://tse1.mm.bing.net/th/id/OIP.qBqPwS1fjRV4M9K9-zWFlgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Sprout,
    tagline: "Seeds of Success",
    color: "from-green-500 to-emerald-700",
    badge: "Seeds",
  },
  {
    name: "CP Chemicals",
    logo: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=200&h=200&fit=crop",
    icon: Droplets,
    tagline: "Crop Protection Specialists",
    color: "from-blue-700 to-indigo-800",
    badge: "Chemicals",
  },
]

export function BrandCarousel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <TooltipProvider>
      <section ref={ref} className="py-16 bg-gradient-to-b from-muted/50 to-background overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23166534' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 mb-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border-primary/30 text-primary bg-primary/5">
              Our Partners
            </Badge>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
              Trusted by Leading Agricultural Organisations
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Partnering with Zimbabwe&apos;s finest agricultural companies, boards, and institutions to bring you quality products and services
            </p>
          </motion.div>
        </div>

        {/* Infinite Scroll Animation */}
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -2400] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear",
              },
            }}
          >
            {/* Triple the brands for seamless loop */}
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <motion.div
                    className="flex-shrink-0 group cursor-pointer"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-[180px] h-[140px] bg-card rounded-2xl border border-border shadow-sm overflow-hidden group-hover:border-primary/50 group-hover:shadow-xl transition-all duration-300 flex flex-col">
                      {/* Brand Image — fixed height */}
                      <div className="relative h-[80px] flex-shrink-0 overflow-hidden">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-70 group-hover:opacity-50 transition-opacity`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <brand.icon className="h-9 w-9 text-white drop-shadow-lg" />
                        </div>
                        {/* Badge overlay */}
                        <div className="absolute top-1.5 right-1.5">
                          <Badge className="text-[9px] px-1.5 py-0 h-4 bg-black/40 text-white border-white/20 backdrop-blur-sm">
                            {brand.badge}
                          </Badge>
                        </div>
                      </div>

                      {/* Brand Info — fixed height, centred */}
                      <div className="flex-1 flex flex-col items-center justify-center px-2 py-2 text-center">
                        <h3 className="font-bold text-[11px] text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
                          {brand.name}
                        </h3>
                        <p className="text-[9px] text-muted-foreground mt-0.5 line-clamp-1">
                          {brand.tagline}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[200px] text-center text-xs">
                  <p className="font-semibold">{brand.name}</p>
                  <p className="text-muted-foreground">{brand.tagline}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10" />
        </div>
      </section>
    </TooltipProvider>
  )
}
