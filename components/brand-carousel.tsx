"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import { Droplets, Wheat, Leaf, Tractor, Milk, Factory } from "lucide-react"

const brands = [
  { 
    name: "SeedCo", 
    logo: "https://tse1.mm.bing.net/th/id/OIP.qBqPwS1fjRV4M9K9-zWFlgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Wheat,
    tagline: "Seeds of Success",
    color: "from-green-500 to-emerald-600"
  },
  { 
    name: "Drip Tech", 
    logo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop",
    icon: Droplets,
    tagline: "Smart Irrigation",
    color: "from-blue-500 to-cyan-600"
  },
  { 
    name: "Tobacco Today", 
    logo: "https://tse3.mm.bing.net/th/id/OIP.IYy57xQaD3VIt-DRNCRqkgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Leaf,
    tagline: "Premium Leaf",
    color: "from-amber-700 to-orange-800"
  },
  { 
    name: "ProFeeds", 
    logo: "https://tse4.mm.bing.net/th/id/OIP.Q7YKmD8iepuwQbjN-n-7sgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Factory,
    tagline: "Quality Nutrition",
    color: "from-red-500 to-rose-600"
  },
  { 
    name: "Irvines Farm Equipment", 
    logo: "https://tse2.mm.bing.net/th/id/OIP.-GhwJ7UiQuVTIRWm_5oouwHaGP?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Tractor,
    tagline: "John Deere 5E Series Now Available",
    color: "from-yellow-500 to-amber-600"
  },
  { 
    name: "Cottco", 
    logo: "https://static.vecteezy.com/system/resources/thumbnails/037/995/719/small_2x/ai-generated-cotton-flower-branch-on-nature-photo.jpg",
    icon: Leaf,
    tagline: "Cotton Excellence",
    color: "from-gray-500 to-slate-600"
  },
  { 
    name: "ZimDairy", 
    logo: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=100&h=100&fit=crop",
    icon: Milk,
    tagline: "Dairy Solutions",
    color: "from-sky-500 to-blue-600"
  },
  { 
    name: "Agritex Solutions", 
    logo: "https://th.bing.com/th/id/R.72e10e5824440da553b51531740a0831?rik=rIpd6f2Mobtprw&riu=http%3a%2f%2fwww.pumpindustry.com.au%2fwp-content%2fuploads%2f2020%2f10%2fshutterstock_1018280029-e1602215828674.jpg&ehk=4h38PHHj3389%2fDQ5g368A8wUvAkgdpZ28c58riWVWS0%3d&risl=&pid=ImgRaw&r=0",
    icon: Droplets,
    tagline: "Irrigation Excellence",
    color: "from-blue-400 to-indigo-500"
  },
]

export function BrandCarousel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
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
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
            Our Partners
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
            Trusted by Leading Agricultural Brands
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Partnering with Zimbabwe&apos;s finest agricultural companies to bring you quality products and services
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Animation */}
      <div className="relative">
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, -1600] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {/* Triple the brands for seamless loop */}
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 group cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-40 bg-card rounded-2xl border border-border shadow-sm overflow-hidden group-hover:border-primary/50 group-hover:shadow-xl transition-all duration-300">
                {/* Brand Image */}
                <div className="relative h-24 overflow-hidden">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-60 group-hover:opacity-40 transition-opacity`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <brand.icon className="h-10 w-10 text-white drop-shadow-lg" />
                  </div>
                </div>
                
                {/* Brand Info */}
                <div className="p-3 text-center">
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {brand.tagline}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10" />
      </div>

      {/* Stats Row */}
      <motion.div 
        className="container mx-auto px-4 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <span className="block text-3xl font-bold text-primary">50+</span>
            <span className="text-sm text-muted-foreground">Partner Brands</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-primary">15K+</span>
            <span className="text-sm text-muted-foreground">Active Farmers</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-primary">100+</span>
            <span className="text-sm text-muted-foreground">Products Listed</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
