"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Tractor,
  Wheat,
  Droplets,
  ChevronDown,
  Leaf,
  Users,
  TrendingUp,
  Award,
  Sprout,
  Megaphone,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Header } from "@/components/header"
import { AdCard } from "@/components/ad-card"
import { VideoSection } from "@/components/video-section"
import { BrandCarousel } from "@/components/brand-carousel"
import { Footer } from "@/components/footer"
import { AnimatedText, ScrollReveal } from "@/components/animated-text"
import { SeedReveal, TractorReveal } from "@/components/seed-reveal"
import { AIAssistant } from "@/components/ai-assistant"
import { ContextualAdPopup } from "@/components/contextual-ad-popup"
import dynamic from "next/dynamic"

const QuantumNeuralNetwork = dynamic(
  () => import("@/components/quantum-neural-network"),
  { ssr: false }
)

const featuredAds = [
  {
    image: "https://tse4.mm.bing.net/th/id/OIP.Q7YKmD8iepuwQbjN-n-7sgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "Premium Cattle & Poultry Feed Solutions",
    sponsor: "ProFeeds Zimbabwe",
    category: "Animal Nutrition",
    description: "High-quality, locally formulated feeds for maximum yield. Trusted by over 5,000 farmers nationwide.",
    featured: true,
    animationType: "seed" as const,
  },
  {
    image: "https://tse2.mm.bing.net/th/id/OIP.-GhwJ7UiQuVTIRWm_5oouwHaGP?rs=1&pid=ImgDetMain&o=7&rm=3",
    title: "John Deere 5E Series Now Available",
    sponsor: "Irvines Farm Equipment",
    category: "Machinery",
    description: "Finance options available. Trade-in your old tractor today.",
    featured: true,
    animationType: "tractor" as const,
  },
  {
    image: "https://t3.ftcdn.net/jpg/10/06/35/58/360_F_1006355849_QtLftL1dfaa0dLwBiw6HySPsYGY6SHvE.jpg",
    title: "Kutsaga Certified Tobacco Seeds",
    sponsor: "Zimbabwe Seeds Co.",
    category: "Seeds & Crop Science",
    description: "High-yielding, disease-resistant tobacco varieties for the modern Zimbabwean farmer. Maximize your leaf quality and yield.",
    animationType: "zoom" as const,
  },
  {
    image: "https://th.bing.com/th/id/R.72e10e5824440da553b51531740a0831?rik=rIpd6f2Mobtprw&riu=http%3a%2f%2fwww.pumpindustry.com.au%2fwp-content%2fuploads%2f2020%2f10%2fshutterstock_1018280029-e1602215828674.jpg&ehk=4h38PHHj3389%2fDQ5g368A8wUvAkgdpZ28c58riWVWS0%3d&risl=&pid=ImgRaw&r=0",
    title: "Center Pivot Irrigation Systems",
    sponsor: "Agritex Solutions",
    category: "Hydraulic Engineering",
    description: "Maximize your land's potential with precise, automated watering cycles designed for large-scale operations.",
    animationType: "zoom" as const,
  },
]

const farmingTips = [
  {
    icon: Leaf,
    title: "Kutsaga Tobacco Seeds",
    description: "Premium yield-boosting tobacco varieties now available. Certified for success in Zimbabwe.",
    image: "https://t3.ftcdn.net/jpg/10/06/35/58/360_F_1006355849_QtLftL1dfaa0dLwBiw6HySPsYGY6SHvE.jpg",
    className: "col-start-1 row-start-1 md:col-span-2 md:row-span-2",
  },
  {
    icon: Wheat,
    title: "Dairy Farming",
    description: "Modern dairy techniques, herd management, and milk production optimization strategies.",
    image: "https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=800&h=800&fit=crop",
    className: "md:col-start-3 md:row-start-1 md:mt-12",
  },
  {
    icon: Droplets,
    title: "Agritex Solutions",
    description: "Center Pivot Irrigation Systems: Modernizing Zimbabwean fields with automated water technology.",
    image: "https://th.bing.com/th/id/R.72e10e5824440da553b51531740a0831?rik=rIpd6f2Mobtprw&riu=http%3a%2f%2fwww.pumpindustry.com.au%2fwp-content%2fuploads%2f2020%2f10%2fshutterstock_1018280029-e1602215828674.jpg&ehk=4h38PHHj3389%2fDQ5g368A8wUvAkgdpZ28c58riWVWS0%3d&risl=&pid=ImgRaw&r=0",
    className: "md:col-start-4 md:row-start-1",
  },
  {
    icon: Tractor,
    title: "Irvines Farm Equipment",
    description: "John Deere 5E Series Now Available. Finance options available. Trade-in today.",
    image: "https://tse2.mm.bing.net/th/id/OIP.-GhwJ7UiQuVTIRWm_5oouwHaGP?rs=1&pid=ImgDetMain&o=7&rm=3",
    className: "md:col-start-1 md:row-start-3 md:-mt-12",
  },
  {
    icon: Wheat,
    title: "Maize & Wheat",
    description: "Soil preparation, planting schedules, and pest management for grain crops.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=800&fit=crop",
    className: "md:col-start-2 md:row-start-3",
  },
  {
    icon: Leaf,
    title: "Cotton Farming",
    description: "Complete guide to cotton cultivation, from planting to ginning for best prices.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/037/995/719/small_2x/ai-generated-cotton-flower-branch-on-nature-photo.jpg",
    className: "md:col-start-3 md:row-start-3 md:mt-12",
  },
]

const agriVariables = [
  { text: "yield = crop * rain", size: "text-[11px] md:text-[13px]", top: "8%", left: "5%", duration: 18 },
  { text: "pH > 6.5", size: "text-[12px] md:text-[14px]", top: "25%", left: "82%", duration: 14 },
  { text: "N:P:K = 15:15:15", size: "text-[10px] md:text-[12px]", top: "72%", left: "10%", duration: 22 },
  { text: "temp <= 30°C", size: "text-[12px] md:text-[14px]", top: "15%", left: "75%", duration: 16 },
  { text: "ROI = CTR / CPC", size: "text-[11px] md:text-[13px]", top: "88%", left: "80%", duration: 20 },
  { text: "H2O + CO2 => glucose + O2", size: "text-[10px] md:text-[12px]", top: "45%", left: "4%", duration: 25 },
  { text: "cpc_value", size: "text-[11px] md:text-[13px]", top: "58%", left: "88%", duration: 17 },
  { text: "organic_matter >= 3%", size: "text-[11px] md:text-[13px]", top: "38%", left: "48%", duration: 21 },
  { text: "moisture = 65%", size: "text-[11px] md:text-[12px]", top: "84%", left: "38%", duration: 19 },
  { text: "CTR = clicks / impressions", size: "text-[10px] md:text-[12px]", top: "20%", left: "40%", duration: 23 },
]

const partners = [
  {
    name: "Tobacco Research Board",
    tagline: "Kutsaga — Advancing Tobacco Science",
    description: "Leading tobacco research institution in Zimbabwe, driving innovation in variety development, crop protection, and tobacco quality improvement.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    icon: Leaf,
    color: "bg-emerald-700",
  },
  {
    name: "TIMB",
    tagline: "Tobacco Industry & Marketing Board",
    description: "Regulating and promoting Zimbabwe's tobacco industry through oversight of production, curing standards, and fair auction marketing systems.",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    icon: TrendingUp,
    color: "bg-primary",
  },
  {
    name: "Zimbabwe Tobacco Association",
    tagline: "Championing Growers' Interests",
    description: "Representing tobacco growers across Zimbabwe, advocating for fair pricing, sustainable practices, and a prosperous future for the industry.",
    image: "https://tse3.mm.bing.net/th/id/OIP.IYy57xQaD3VIt-DRNCRqkgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Users,
    color: "bg-emerald-600",
  },
  {
    name: "ADMA",
    tagline: "Agricultural Dealers & Manufacturers",
    description: "Uniting dealers and manufacturers of agricultural inputs and equipment to support the growth and modernisation of Zimbabwean agriculture.",
    image: "https://tse2.mm.bing.net/th/id/OIP.-GhwJ7UiQuVTIRWm_5oouwHaGP?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Tractor,
    color: "bg-orange-600",
  },
  {
    name: "Corporate 24",
    tagline: "Healthcare for Every Farmer",
    description: "Zimbabwe's trusted health insurance and medical aid provider, ensuring farmers and agri-business employees access quality healthcare.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    icon: Award,
    color: "bg-blue-600",
  },
  {
    name: "Frecon Solar",
    tagline: "Powering Agriculture Sustainably",
    description: "Delivering reliable solar energy solutions to farms and agri-businesses across Zimbabwe, reducing costs and ensuring energy independence.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    icon: Sparkles,
    color: "bg-yellow-500",
  },
  {
    name: "Amcotts",
    tagline: "Cotton Industry Leaders",
    description: "A cornerstone of Zimbabwe's cotton sector, providing contract farming support, inputs financing, and lint marketing services.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/037/995/719/small_2x/ai-generated-cotton-flower-branch-on-nature-photo.jpg",
    icon: Sprout,
    color: "bg-emerald-600",
  },
  {
    name: "LoadAgropower",
    tagline: "Mechanised Farm Power",
    description: "Supplying powerful agricultural machinery, tractors, and implements to boost productivity across commercial and smallholder farms.",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80",
    icon: Tractor,
    color: "bg-primary",
  },
  {
    name: "Feedmix",
    tagline: "Quality Animal Nutrition",
    description: "Formulating scientifically balanced feeds for livestock and poultry, helping farmers maximise animal health, growth, and output.",
    image: "https://tse4.mm.bing.net/th/id/OIP.Q7YKmD8iepuwQbjN-n-7sgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Wheat,
    color: "bg-orange-500",
  },
  {
    name: "FSG",
    tagline: "Farm & Supply Group",
    description: "A leading agri-supply group providing seeds, chemicals, fertilisers, and farm management expertise to Zimbabwean producers.",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
    icon: Leaf,
    color: "bg-emerald-700",
  },
  {
    name: "SeedCo",
    tagline: "Seeds of Success",
    description: "Empowering farmers with high-yielding, climate-smart seed varieties. Leading the way in African seed research and crop improvement.",
    image: "https://tse1.mm.bing.net/th/id/OIP.qBqPwS1fjRV4M9K9-zWFlgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    icon: Sprout,
    color: "bg-emerald-600",
  },
  {
    name: "CP Chemicals",
    tagline: "Crop Protection Specialists",
    description: "Supplying premium agrochemicals, herbicides, pesticides, and fertilisers to protect and enhance crop yields across Zimbabwe.",
    image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=800&q=80",
    icon: Droplets,
    color: "bg-blue-700",
  },
]



export default function HomePage() {
  const [isPaused, setIsPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)

  // Drag-to-scroll and auto-scroll for Partners Section
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current
    if (!slider) return
    setIsDragging(true)
    setIsPaused(true)
    setStartX(e.pageX - slider.offsetLeft)
    setScrollLeft(slider.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const slider = sliderRef.current
    if (!slider) return
    const x = e.pageX - slider.offsetLeft
    const walk = (x - startX) * 1.5 // Drag speed multiplier
    slider.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsPaused(false)
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let animationFrameId: number

    const step = () => {
      if (!isPaused && !isDragging) {
        slider.scrollLeft += 1.2 // Auto scroll speed
        // If we scrolled past half the container width, wrap around to 0
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0
        }
      }
      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isPaused, isDragging])

  useEffect(() => {
    setMounted(true)
  }, [])
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Header />

      {/* Hero Section with Parallax */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop"
            alt="Zimbabwean agricultural landscape"
            fill
            className="object-cover"
            priority
          />
          {/* Green Glassmorphic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          {/* Animated Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {mounted && [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-secondary/30 blur-3xl"
                style={{
                  width: Math.random() * 200 + 100,
                  height: Math.random() * 200 + 100,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div className="relative z-10 container mx-auto px-4 text-center" style={{ opacity: heroOpacity }}>
          <div className="max-w-4xl mx-auto">
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-xs font-medium mb-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Leaf className="h-3.5 w-3.5 text-secondary" />
              Zimbabwe&apos;s Premier Agricultural Platform
            </motion.span>

            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              <AnimatedText
                text="Cultivating Success in"
                type="swash"
                className="block"
              />
              <motion.span
                className="text-secondary inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                Zimbabwe&apos;s
              </motion.span>{" "}
              <AnimatedText
                text="Agricultural Future"
                type="wave"
                delay={1}
                className="inline"
              />
            </h1>

            <motion.p
              className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Your digital companion for farming excellence. Connect with suppliers, discover insights, and grow your agricultural enterprise.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <Button
                size="lg"
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all"
                asChild
              >
                <Link href="/directory">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 px-8 py-6 text-base"
                asChild
              >
                <Link href="/magazine">Read The Magazine</Link>
              </Button>
            </motion.div>


          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <ChevronDown className="h-5 w-5 text-white/70" />
          </div>
        </motion.div>
      </section>

      {/* Brand Carousel */}
      <BrandCarousel />

      {/* Featured Ads Section with Seed Reveal */}
      <section className="py-20 relative">
        {/* Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
            }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(34,120,60,0.06) 0%, transparent 50%, rgba(180,140,30,0.04) 100%)" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border-secondary/40 text-secondary bg-secondary/5">
              Featured Partners
            </Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              <AnimatedText text="Marketplace Spotlight" type="wave" />
            </h2>
            <Separator className="my-4 max-w-[80px] mx-auto bg-primary/30" />
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Discover premium agricultural products, equipment, and services from Zimbabwe&apos;s trusted suppliers.
            </p>
          </ScrollReveal>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mx-auto flex w-fit rounded-full bg-muted">
              <TabsTrigger value="all" className="rounded-full text-xs font-semibold">All Products</TabsTrigger>
              <TabsTrigger value="seeds" className="rounded-full text-xs font-semibold">Seeds</TabsTrigger>
              <TabsTrigger value="equipment" className="rounded-full text-xs font-semibold">Equipment</TabsTrigger>
              <TabsTrigger value="feeds" className="rounded-full text-xs font-semibold">Feeds</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <SeedReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredAds.map((ad, index) => (
                    <AdCard key={index} {...ad} size={index < 2 ? "large" : "medium"} />
                  ))}
                </div>
              </SeedReveal>
            </TabsContent>
            <TabsContent value="seeds">
              <SeedReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredAds.filter(a => a.category?.toLowerCase().includes("seed")).map((ad, index) => (
                    <AdCard key={index} {...ad} size="large" />
                  ))}
                  {featuredAds.filter(a => a.category?.toLowerCase().includes("seed")).length === 0 && (
                    <Card className="col-span-4 text-center py-12">
                      <CardContent>
                        <p className="text-muted-foreground">Browse our directory for seed listings.</p>
                        <Button variant="outline" size="sm" className="mt-4 rounded-full" asChild>
                          <Link href="/directory">View Directory <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </SeedReveal>
            </TabsContent>
            <TabsContent value="equipment">
              <SeedReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredAds.filter(a => a.category?.toLowerCase().includes("machin")).map((ad, index) => (
                    <AdCard key={index} {...ad} size="large" />
                  ))}
                  {featuredAds.filter(a => a.category?.toLowerCase().includes("machin")).length === 0 && (
                    <Card className="col-span-4 text-center py-12">
                      <CardContent>
                        <p className="text-muted-foreground">Browse our directory for equipment listings.</p>
                        <Button variant="outline" size="sm" className="mt-4 rounded-full" asChild>
                          <Link href="/directory">View Directory <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </SeedReveal>
            </TabsContent>
            <TabsContent value="feeds">
              <SeedReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredAds.filter(a => a.category?.toLowerCase().includes("nutri")).map((ad, index) => (
                    <AdCard key={index} {...ad} size="large" />
                  ))}
                  {featuredAds.filter(a => a.category?.toLowerCase().includes("nutri")).length === 0 && (
                    <Card className="col-span-4 text-center py-12">
                      <CardContent>
                        <p className="text-muted-foreground">Browse our directory for feed listings.</p>
                        <Button variant="outline" size="sm" className="mt-4 rounded-full" asChild>
                          <Link href="/directory">View Directory <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </SeedReveal>
            </TabsContent>
          </Tabs>

          <ScrollReveal className="text-center mt-4">
            <Button variant="outline" size="lg" className="rounded-full" asChild>
              <Link href="/directory">
                View All Listings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Agricultural Hub - Clustered Design with Restored Glassmorphism */}
      <section className="py-24 relative overflow-hidden">
        {/* Tobacco Field Background with Intense Blur and Green Accents */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&q=80"
            alt="Tobacco Field Backdrop"
            fill
            className="object-cover blur-[16px] scale-110 opacity-60"
            priority
          />
          {/* Vibrancy Blobs */}
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-emerald-500/30 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-green-400/20 rounded-full blur-[120px] animate-pulse" />
          
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[100px] backdrop-saturate-[200%]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 via-transparent to-primary/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90" />

          {/* Drifting Agricultural and Ad Variables in Background */}
          {agriVariables.map((v, i) => (
            <motion.span
              key={i}
              className={`absolute font-mono font-bold select-none ${v.size} pointer-events-none z-0`}
              style={{
                top: v.top,
                left: v.left,
                color: i % 2 === 0 ? "rgba(110, 231, 183, 0.2)" : "rgba(253, 224, 71, 0.18)",
              }}
              animate={{
                y: [0, -25, 0],
                x: [0, 15, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: v.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {v.text}
            </motion.span>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="mb-16">
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-foreground leading-[0.9] tracking-tighter">
              AGRICULTURAL <br /> <span className="text-secondary opacity-90 drop-shadow-sm">HUB</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20 max-w-7xl mx-auto mt-12">
            {farmingTips.map((tip, index) => {
              return (
                <motion.div
                  key={index}
                  className="relative group w-full aspect-square max-w-[360px] mx-auto"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {/* Hexagon Outline/Line */}
                  <div className="absolute inset-0 z-0 p-[2px] transition-transform duration-700 group-hover:scale-105"
                    style={{
                      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                      background: "rgba(255, 255, 255, 0.4)",
                    }}
                  />

                  {/* Hexagon Image Container */}
                  <div 
                    className="relative w-full h-full overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-105"
                    style={{
                      clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                      margin: "2px",
                      width: "calc(100% - 4px)",
                      height: "calc(100% - 4px)",
                    }}
                  >
                    <Image
                      src={tip.image}
                      alt={tip.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-[12%] left-1/2 -translate-x-1/2 z-30">
                      <div className="w-10 h-10 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg backdrop-blur-md border border-white/40">
                        <tip.icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>

                  {/* Glassmorphic Content Card */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-20 pointer-events-none">
                    <motion.div 
                      className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 shadow-2xl w-full max-w-[280px] mt-24 text-left pointer-events-auto border border-white/30"
                      whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.25)" }}
                    >
                      <h3 className="font-sans text-lg font-bold text-white mb-2 leading-tight uppercase tracking-tight drop-shadow-md">
                        {tip.title}
                      </h3>
                      <p className="text-white/90 text-xs font-medium leading-relaxed mb-4 line-clamp-3">
                        {tip.description}
                      </p>
                      <Button variant="outline" size="sm" className="h-8 text-xs font-bold gap-2 group/btn rounded-lg border-white/50 bg-white/10 text-white hover:bg-white hover:text-primary transition-all" asChild>
                        <Link href="/magazine">
                          Learn More
                          <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Partners Section - Horizontal Slider */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#eaf2ec] to-[#f4f8f5] border-y border-emerald-950/5">
        {/* Interactive 3D Quantum Neural Network Background */}
        <QuantumNeuralNetwork className="opacity-70" />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-serif text-5xl md:text-7xl font-bold text-slate-900 mb-4 leading-none tracking-tighter uppercase">
              OUR <span className="text-emerald-600 opacity-90">PARTNERS</span>
            </h2>
            <p className="text-xl md:text-2xl font-serif text-emerald-800 italic">
              Trusted by Zimbabwe&apos;s Leading Agricultural Brands
            </p>
          </ScrollReveal>

          {/* Auto-Sliding/Draggable Container */}
          <div 
            ref={sliderRef}
            className="relative overflow-x-auto scrollbar-none pb-12 cursor-grab active:cursor-grabbing select-none"
            style={{ WebkitOverflowScrolling: "touch" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false)
              setIsDragging(false)
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div className="flex gap-6 md:gap-8 w-max">
              {/* Quadruple the partners for seamless loop */}
              {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-[300px]"
                >
                  <motion.div 
                    className="relative w-[300px] h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image 
                      src={partner.image}
                      alt={partner.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-95 pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:via-black/20" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <div className="mb-2">
                        <Badge className={`${partner.color} text-white px-3 py-0.5 text-[10px] border-none shadow-lg tracking-wide uppercase font-bold`}>
                          {partner.tagline}
                        </Badge>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 leading-tight">
                        {partner.name}
                      </h3>
                      
                      <div className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl mb-6 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <p className="text-white text-xs leading-relaxed font-medium line-clamp-3">
                          {partner.description}
                        </p>
                      </div>

                      <div className="flex gap-3 items-center">
                        <Button 
                          className={`${partner.color} hover:brightness-110 text-white rounded-full px-5 h-9 text-xs font-bold shadow-xl transition-all`}
                          asChild
                        >
                          <Link href={`/directory?q=${encodeURIComponent(partner.name)}`}>
                            View More
                          </Link>
                        </Button>
                        <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white">
                          <partner.icon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Gradient Overlays for smooth edges */}
            <div className="absolute left-0 top-0 bottom-12 w-24 bg-gradient-to-r from-[#eaf2ec] to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-12 w-24 bg-gradient-to-l from-[#f4f8f5] to-transparent pointer-events-none z-10" />
          </div>


        </div>
      </section>

      {/* Agricultural Manifesto Scroll Section */}
      <section className="py-32 relative overflow-hidden" style={{ background: "linear-gradient(180deg, oklch(0.97 0.012 130) 0%, oklch(0.98 0.005 120) 100%)" }}>
        {/* Decorative Background Blurs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(34,120,60,0.05) 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(180,140,30,0.04) 0%, transparent 70%)" }} />
        </div>
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm66 3c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-46-43c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm58 33c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM79 7c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm-54 2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zM27 44c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z' fill='%23166534' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />

        <div className="container mx-auto px-4 flex justify-center">
          <div className="relative w-full max-w-4xl">
            {/* The Scroll Header - Top Roller */}
            <motion.div 
              className="relative z-20 h-14 bg-gradient-to-b from-[#fdfcf0] to-[#f4f1d5] rounded-full shadow-xl border border-[#dcd8b4] flex items-center justify-center overflow-hidden"
              initial={{ scaleX: 0.8 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] opacity-10" />
              <div className="w-full h-px bg-white/40 absolute top-2" />
            </motion.div>

            {/* The Scroll Body - Unrolling Content */}
            <motion.div 
              className="relative z-10 bg-[#fdfcf0] border-x border-[#dcd8b4] shadow-2xl overflow-hidden origin-top"
              style={{
                backgroundImage: `url("https://www.transparenttextures.com/patterns/felt.png")`,
                backgroundBlendMode: "overlay",
              }}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: "auto", opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="px-8 md:px-20 py-20 bg-gradient-to-b from-[#fdfcf0] via-[#fdfcf0]/80 to-[#fdfcf0]">
                <div className="max-w-2xl mx-auto space-y-12">
                  <header className="text-center space-y-4">
                    <span className="text-primary/60 font-sans text-xs uppercase tracking-[0.3em] font-bold">Zimbabwe • Agriculture • Innovation</span>
                    <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#3d3a2e] leading-tight">
                      A Legacy of Growth: <br />
                      <span className="text-primary italic">Our Agricultural Manifesto</span>
                    </h2>
                    <div className="w-16 h-px bg-primary/20 mx-auto mt-8" />
                  </header>

                  <div className="font-serif text-xl md:text-2xl text-[#5d5a4e] leading-relaxed space-y-8 italic text-center md:text-left">
                    <p>
                      At the heart of Zimbabwe&apos;s identity lies a deep and enduring connection to the soil. Our fields are more than just land; they are the heritage of our past and the promise of our future prosperity.
                    </p>
                    <p>
                      We believe in the power of modern technology to transform traditional wisdom into global success. Through precision irrigation, certified crop science, and sustainable mechanics, we are empowering every farmer to become a leader of the new green revolution.
                    </p>
                    <p>
                      Agri-Ad is committed to bridging the gap between those who produce and those who provide. Together, we are not just growing crops; we are building a resilient, food-secure nation for generations to come.
                    </p>
                  </div>

                  <footer className="pt-12 text-center">
                    <div className="inline-block text-left">
                      <p className="font-sans text-[10px] uppercase tracking-widest text-[#8d8a7e] mb-1">Authenticated by</p>
                      <p className="font-serif text-2xl text-primary font-bold italic rotate-[-2deg]">The Agri-Ad Collective</p>
                    </div>
                  </footer>
                </div>
              </div>
              
              {/* Subtle Paper Texture Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />
            </motion.div>

            {/* The Scroll Footer - Bottom Roller */}
            <motion.div 
              className="relative z-20 h-12 bg-gradient-to-t from-[#fdfcf0] to-[#f4f1d5] rounded-full shadow-2xl border border-[#dcd8b4] -mt-5"
              initial={{ scaleX: 0.8 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] opacity-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Advertise With Us CTA */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Megaphone className="h-8 w-8 text-secondary" />
            </motion.div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              <AnimatedText text="Reach Zimbabwe's Farming Community" type="wave" />
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Advertise your products and services to over 15,000 active farmers. Multiple ad formats available with flexible pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8"
                asChild
              >
                <Link href="/advertise">
                  Start Advertising
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Additional Ads Grid */}
      <section className="py-20 relative" style={{ background: "linear-gradient(160deg, rgba(34,120,60,0.03) 0%, oklch(0.98 0.005 120) 50%, rgba(180,140,30,0.03) 100%)" }}>
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <Badge className="mb-3 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground">
              Sponsored Content
            </Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              More from Our Partners
            </h2>
            <Separator className="my-4 max-w-[60px] mx-auto bg-accent/40" />
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AdCard
              image="https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=400&h=300&fit=crop"
              title="Dairy Equipment & Supplies"
              sponsor="ZimDairy Solutions"
              category="Dairy"
              size="small"
              animationType="zoom"
            />
            <AdCard
              image="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop"
              title="Winter Wheat Seeds"
              sponsor="Seedco Zimbabwe"
              category="Seeds"
              size="small"
              animationType="seed"
            />
            <AdCard
              image="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400&h=300&fit=crop"
              title="Cotton Marketing"
              sponsor="Cottco Zimbabwe"
              category="Cotton"
              size="small"
              animationType="fade"
            />
            <AdCard
              image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop"
              title="SC513 Maize Seed"
              sponsor="Seedco Zimbabwe"
              category="Maize"
              size="small"
              animationType="tractor"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* AI Assistant */}
      <AIAssistant />

      {/* Contextual Ad Popup */}
      <ContextualAdPopup />
    </main>
  )
}
