"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, MapPin, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText, ScrollReveal } from "@/components/animated-text"
import { AIAssistant } from "@/components/ai-assistant"

const businesses = [
  {
    id: 1,
    name: "SeedCo Zimbabwe",
    category: "Seeds & Inputs",
    image: "https://tse1.mm.bing.net/th/id/OIP.qBqPwS1fjRV4M9K9-zWFlgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    location: "Harare",
    description: "Leading seed company with certified maize, tobacco, and wheat varieties.",
    featured: true,
  },
  {
    id: 2,
    name: "Drip Tech Solutions",
    category: "Irrigation",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop",
    location: "Bulawayo",
    description: "Specialists in drip irrigation systems and water management solutions.",
    featured: true,
  },
  {
    id: 3,
    name: "ProFeeds Zimbabwe",
    category: "Animal Feed",
    image: "https://tse4.mm.bing.net/th/id/OIP.Q7YKmD8iepuwQbjN-n-7sgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    location: "Harare",
    description: "Premium livestock feeds for cattle, poultry, and pigs.",
  },
  {
    id: 4,
    name: "Irvines Farm Equipment",
    category: "Machinery",
    image: "https://tse2.mm.bing.net/th/id/OIP.-GhwJ7UiQuVTIRWm_5oouwHaGP?rs=1&pid=ImgDetMain&o=7&rm=3",
    location: "Harare",
    description: "John Deere 5E Series Now Available. Finance options available. Trade-in your old tractor today.",
  },
  {
    id: 5,
    name: "Agritex Solutions",
    category: "Irrigation",
    image: "https://th.bing.com/th/id/R.72e10e5824440da553b51531740a0831?rik=rIpd6f2Mobtprw&riu=http%3a%2f%2fwww.pumpindustry.com.au%2fwp-content%2fuploads%2f2020%2f10%2fshutterstock_1018280029-e1602215828674.jpg&ehk=4h38PHHj3389%2fDQ5g368A8wUvAkgdpZ28c58riWVWS0%3d&risl=&pid=ImgRaw&r=0",
    location: "Kwekwe",
    description: "Center Pivot Irrigation Systems. Modernizing Zimbabwean fields with automated water technology.",
  },
  {
    id: 6,
    name: "Tobacco Today",
    category: "Tobacco Services",
    image: "https://t3.ftcdn.net/jpg/10/06/35/58/360_F_1006355849_QtLftL1dfaa0dLwBiw6HySPsYGY6SHvE.jpg",
    location: "Harare",
    description: "Tobacco grading, curing advice, and auction preparation services.",
  },
  {
    id: 7,
    name: "Cottco Zimbabwe",
    category: "Cotton Services",
    image: "https://static.vecteezy.com/system/resources/thumbnails/037/995/719/small_2x/ai-generated-cotton-flower-branch-on-nature-photo.jpg",
    location: "Sanyati",
    description: "Leading the sustainable growth of Zimbabwe's cotton industry through expert extension and marketing.",
  },
]

const categories = ["All", "Seeds & Inputs", "Irrigation", "Animal Feed", "Machinery", "Dairy", "Tobacco Services"]

function DirectoryContent() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "")

  // Sync URL param into search state
  useEffect(() => {
    const q = searchParams.get("q")
    if (q) setSearchQuery(q)
  }, [searchParams])

  const filteredBusinesses = businesses.filter((biz) => {
    const matchesCategory = selectedCategory === "All" || biz.category === selectedCategory
    const matchesSearch =
      biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biz.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(160deg, oklch(0.96 0.015 140) 0%, oklch(0.98 0.005 120) 50%, oklch(0.97 0.012 100) 100%)" }}>
      <Header />

      {/* Hero */}
      <section id="search" className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              <AnimatedText text="Business Directory" type="wave" />
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Find trusted agricultural suppliers, equipment dealers, and service providers across Zimbabwe.
            </p>

            {/* Search */}
            <form onSubmit={(e) => e.preventDefault()} id="listings" className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search businesses, products, or services..."
                className="pl-12 pr-4 py-6 rounded-full text-base bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-12 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(34,120,60,0.06) 0%, transparent 60%)" }} />
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <ScrollReveal className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    className="rounded-full font-semibold"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* Results */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredBusinesses.map((biz, index) => (
              <motion.div
                key={biz.id}
                className={`bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300 group ${
                  viewMode === "list" ? "flex" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`relative ${viewMode === "grid" ? "h-48" : "w-48 h-36"} flex-shrink-0`}>
                  <Image
                    src={biz.image}
                    alt={biz.name}
                    fill
                    className="object-cover"
                  />
                  {biz.featured && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1">
                  <span className="text-xs text-primary font-medium">{biz.category}</span>
                  <h3 className="font-serif text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                    {biz.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{biz.description}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{biz.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No businesses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  )
}

export default function DirectoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(160deg, oklch(0.96 0.015 140) 0%, oklch(0.98 0.005 120) 50%, oklch(0.97 0.012 100) 100%)" }}>
        <div className="text-muted-foreground animate-pulse font-serif text-lg">Loading Directory...</div>
      </div>
    }>
      <DirectoryContent />
    </Suspense>
  )
}
