"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Calendar, ArrowRight, Download, Share2, Search, Mail, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText, ScrollReveal } from "@/components/animated-text"
import { AIAssistant } from "@/components/ai-assistant"
import { ArticleCard } from "@/components/article-card"
import { IssueReader } from "@/components/issue-reader"

const magazineIssues = [
  {
    id: 1,
    title: "April 2026 Issue",
    cover: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=1100&fit=crop",
    highlights: ["Tobacco Season 2026 Preview", "New Irrigation Technologies", "Market Price Analysis"],
    date: "April 2026",
    latest: true,
  },
  {
    id: 2,
    title: "March 2026 Issue",
    cover: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=1100&fit=crop",
    highlights: ["Cotton Farming Guide", "Livestock Health Tips", "Equipment Financing"],
    date: "March 2026",
  },
  {
    id: 3,
    title: "February 2026 Issue",
    cover: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=1100&fit=crop",
    highlights: ["Dairy Production Boost", "Sustainable Farming", "Success Stories"],
    date: "February 2026",
  },
]

const categories = [
  "All",
  "Tobacco",
  "Livestock",
  "Crops",
  "Innovation",
  "Market",
]

const featuredArticles = [
  {
    title: "The Silent Revolution: Solar Irrigation in Matabeleland",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    readTime: "8 min read",
    date: "April 12, 2026",
    excerpt: "How small-scale farmers are defying drought using high-efficiency solar-powered drip systems...",
  },
  {
    title: "Tobacco 2026: Quality Trends and Grade Analysis",
    category: "Tobacco",
    image: "https://tse3.mm.bing.net/th/id/OIP.IYy57xQaD3VIt-DRNCRqkgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    readTime: "12 min read",
    date: "April 10, 2026",
    excerpt: "An in-depth look at this season's leaf quality and what it means for auction floor pricing...",
  },
  {
    title: "Maximizing Poultry Yield through Precision Nutrition",
    category: "Livestock",
    image: "https://tse4.mm.bing.net/th/id/OIP.Q7YKmD8iepuwQbjN-n-7sgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
    readTime: "6 min read",
    date: "April 08, 2026",
    excerpt: "New probiotic formulations are changing the game for poultry farmers in Mashonaland Central...",
  },
  {
    title: "The Rise of Certified Maize Varieties",
    category: "Crops",
    image: "https://tse1.mm.bing.net/th/id/OIP.qBqPwS1fjRV4M9K9-zWFlgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    readTime: "10 min read",
    date: "April 05, 2026",
    excerpt: "Why choosing the right seed is more critical than ever in the face of changing weather patterns...",
  },
]

export default function MagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isReaderOpen, setIsReaderOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArticles = featuredArticles.filter(art => 
    (selectedCategory === "All" || art.category === selectedCategory) &&
    (art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero with Glassmorphic Search */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-black uppercase tracking-widest mb-6 border border-primary/20"
            >
              <BookOpen className="h-4 w-4" />
              The Knowledge Center
            </motion.div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              <AnimatedText text="Fueling Growth Through" type="wave" className="block" />
              <span className="text-primary italic">Expert Insights</span>
            </h1>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto">
              Access Zimbabwe&apos;s most comprehensive repository of agricultural wisdom, technical guides, and market intelligence.
            </p>

            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-white shadow-2xl rounded-full blur-xl opacity-20" />
              <div className="relative flex items-center bg-card/80 backdrop-blur-xl border border-white/20 rounded-full p-2 shadow-xl">
                <Search className="ml-4 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search articles, guides, or market reports..." 
                  className="border-none bg-transparent focus-visible:ring-0 text-lg h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="rounded-full px-8 h-12 text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95">
                  Search
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Articles & Interactive Reader CTA */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <ScrollReveal>
                <span className="text-primary text-sm font-black uppercase tracking-[0.3em] mb-4 block">This Month&apos;s Edition</span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-[1.1]">
                  Inside the April 2026 <br />
                  <span className="text-secondary">Legacy Issue</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                  Discover how precision technology is intersecting with traditional Zimbabwean wisdom to create a more resilient agricultural future.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8 border-b border-border/50">
                  {magazineIssues[0].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-serif italic font-bold text-foreground">{h}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-8">
                  <Button size="lg" className="rounded-full px-8 shadow-xl hover:scale-105 transition-transform" onClick={() => setIsReaderOpen(true)}>
                    <BookOpen className="mr-2 h-5 w-5" />
                    Read Online Now
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-primary/20 text-primary hover:bg-primary/5">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5">
              <motion.div 
                className="relative group perspective-1000"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
                <motion.div 
                  className="relative transition-all duration-500 transform-style-3d group-hover:rotate-y-12"
                  whileHover={{ y: -10 }}
                >
                  <Image 
                    src={magazineIssues[0].cover}
                    alt="Latest Issue"
                    width={450}
                    height={600}
                    className="rounded-2xl shadow- [0px_10px_60px_rgba(0,0,0,0.5)] border border-white/20"
                  />
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-center p-3 font-black text-xs uppercase tracking-tighter leading-tight shadow-2xl rotate-12">
                    LATEST ISSUE
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The Knowledge Hub - Filterable Articles */}
      <section className="py-24 bg-card/30 border-y border-border/50 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1h98v98H1z' fill='none' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <ScrollReveal>
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">The Article Hub</h2>
              <p className="text-muted-foreground">Deep dives, tutorials, and expert analysis curated for your growth.</p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat 
                      ? "bg-primary text-white shadow-lg scale-105" 
                      : "bg-white/50 border border-border/50 text-muted-foreground hover:bg-white hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.title} {...article} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-24 text-muted-foreground italic font-serif text-xl border-2 border-dashed border-border/30 rounded-2xl">
              No matching articles found in our archives yet.
            </div>
          )}
        </div>
      </section>

      {/* Newsletter - High Impact CTAs */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-[2rem] p-12 md:p-20 relative overflow-hidden shadow-[0px_20px_100px_rgba(22,101,34,0.3)]">
            {/* Animated Shapes */}
            <motion.div 
              className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <ScrollReveal>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-8 border border-white/20">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">
                  Knowledge is the <br />
                  <span className="text-secondary italic">Final Input.</span>
                </h2>
                <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                  Join 15,000+ Zimbabwean farmers who receive our weekly curation of market reports and technical advice.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                  <Input 
                    placeholder="Enter your email address" 
                    className="h-14 px-6 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-secondary/50 text-lg"
                  />
                  <Button className="h-14 px-10 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-black tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">
                    SUBSCRIBE
                  </Button>
                </form>
                <div className="mt-8 flex items-center justify-center gap-6 text-primary-foreground text-xs font-bold uppercase tracking-[0.2em]">
                  <span className="flex items-center gap-2 saturate-0 opacity-50"><Bell className="h-3 w-3" /> No Spam</span>
                  <span className="flex items-center gap-2 saturate-0 opacity-50"><Bell className="h-3 w-3" /> Expert Handpicked</span>
                  <span className="flex items-center gap-2 saturate-0 opacity-50"><Bell className="h-3 w-3" /> Verified Data</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Reader Modal */}
      <IssueReader 
        isOpen={isReaderOpen} 
        onClose={() => setIsReaderOpen(false)} 
        issue={magazineIssues[0]} 
      />

      <Footer />
      <AIAssistant />
    </main>
  )
}
