"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Search,
  Calendar,
  User,
  MessageCircle,
  Heart,
  Share2,
  BookOpen,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedText, ScrollReveal } from "@/components/animated-text"
import { AIAssistant } from "@/components/ai-assistant"

const blogPosts = [
  {
    id: 1,
    title: "Best Practices for Tobacco Curing in Zimbabwe",
    excerpt: "Learn the traditional and modern techniques for curing tobacco to achieve the best grades at auction...",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=500&fit=crop",
    author: "John Mukwena",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    date: "April 20, 2026",
    category: "Tobacco",
    readTime: "8 min read",
    likes: 245,
    comments: 34,
    featured: true,
  },
  {
    id: 2,
    title: "Maximizing Maize Yields: A Complete Guide",
    excerpt: "From soil preparation to harvest, discover how to maximize your maize production this season...",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop",
    author: "Grace Moyo",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    date: "April 18, 2026",
    category: "Maize",
    readTime: "6 min read",
    likes: 189,
    comments: 28,
    featured: true,
  },
  {
    id: 3,
    title: "Drip Irrigation: Saving Water, Boosting Profits",
    excerpt: "How modern drip irrigation systems are transforming farming in Zimbabwe's dry regions...",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=500&fit=crop",
    author: "Tendai Chikwanha",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    date: "April 15, 2026",
    category: "Irrigation",
    readTime: "5 min read",
    likes: 156,
    comments: 19,
  },
  {
    id: 4,
    title: "Understanding Cattle Feed Nutrition",
    excerpt: "A comprehensive guide to balanced nutrition for your livestock to maximize growth and health...",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=500&fit=crop",
    author: "Peter Dube",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    date: "April 12, 2026",
    category: "Livestock",
    readTime: "7 min read",
    likes: 203,
    comments: 41,
  },
  {
    id: 5,
    title: "Cotton Farming: From Seed to Sale",
    excerpt: "Everything you need to know about cotton farming in Zimbabwe, including the best varieties...",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&h=500&fit=crop",
    author: "Sarah Ncube",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    date: "April 10, 2026",
    category: "Cotton",
    readTime: "9 min read",
    likes: 178,
    comments: 23,
  },
  {
    id: 6,
    title: "Tractor Maintenance Tips for Every Farmer",
    excerpt: "Keep your farm equipment running smoothly with these essential maintenance tips...",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&h=500&fit=crop",
    author: "Mike Chirwa",
    authorImage: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop",
    date: "April 8, 2026",
    category: "Equipment",
    readTime: "4 min read",
    likes: 134,
    comments: 15,
  },
]

const categories = ["All", "Tobacco", "Maize", "Livestock", "Irrigation", "Cotton", "Equipment"]

const trendingTopics = [
  "Tobacco Auction Prices 2026",
  "Climate Smart Agriculture",
  "Solar-Powered Irrigation",
  "Organic Farming Methods",
  "Government Subsidies",
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4" />
              Community Blog
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              <AnimatedText text="Farming Stories & Insights" type="wave" />
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Join the conversation. Share your knowledge, learn from fellow farmers, and stay updated with the latest agricultural trends.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles, tips, and discussions..."
                className="pl-12 pr-4 py-6 rounded-full text-base bg-card border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Featured Articles</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-64">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Posts */}
            <div className="lg:col-span-2">
              {/* Category Tabs */}
              <ScrollReveal className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </ScrollReveal>

              {/* Posts Grid */}
              <div className="space-y-6">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                            {post.category}
                          </span>
                          <span className="text-muted-foreground text-xs">{post.readTime}</span>
                        </div>
                        <Link href={`/blog/${post.id}`}>
                          <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Image
                              src={post.authorImage}
                              alt={post.author}
                              width={28}
                              height={28}
                              className="rounded-full"
                            />
                            <span className="text-sm text-muted-foreground">{post.author}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{post.date}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleLike(post.id)}
                              className={`flex items-center gap-1 text-sm transition-colors ${
                                likedPosts.includes(post.id) ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                              {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                            </button>
                            <Link href={`/blog/${post.id}#comments`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                              <MessageCircle className="h-4 w-4" />
                              {post.comments}
                            </Link>
                            <button className="text-muted-foreground hover:text-primary">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Write Article CTA */}
              <ScrollReveal>
                <div className="bg-primary text-primary-foreground rounded-2xl p-6">
                  <h3 className="font-serif text-lg font-bold mb-2">Share Your Knowledge</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Have farming tips or experiences to share? Write an article and help fellow farmers succeed.
                  </p>
                  <Button variant="secondary" className="w-full rounded-full">
                    Write an Article
                  </Button>
                </div>
              </ScrollReveal>

              {/* Trending Topics */}
              <ScrollReveal delay={0.1}>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-serif text-lg font-bold text-foreground">Trending Topics</h3>
                  </div>
                  <ul className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <li key={index}>
                        <Link href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                          <span className="text-primary font-bold">{index + 1}</span>
                          {topic}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Newsletter */}
              <ScrollReveal delay={0.2}>
                <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">Weekly Digest</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Get the best farming tips delivered to your inbox every week.
                  </p>
                  <div className="space-y-3">
                    <Input placeholder="Your email address" className="rounded-full" />
                    <Button className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIAssistant />
    </main>
  )
}
