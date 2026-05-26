"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  Leaf, 
  Search, 
  ChevronDown, 
  Home, 
  BookOpen, 
  FolderHeart, 
  PenSquare, 
  Megaphone, 
  Mail, 
  DollarSign, 
  UserCheck, 
  Compass,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Magazine", href: "/magazine" },
  { name: "Directory", href: "/directory" },
  { name: "Blog", href: "/blog" },
  { name: "Advertise", href: "/advertise" },
  { name: "Contact", href: "/contact" },
]

const quickNavGroups = [
  {
    title: "Core Pages",
    items: [
      { label: "Home", sub: "Platform Overview", href: "/#hero", icon: Home },
      { label: "Magazine", sub: "Publications & Guides", href: "/magazine#latest", icon: BookOpen },
      { label: "Directory", sub: "Agricultural Marketplace", href: "/directory#listings", icon: FolderHeart },
      { label: "Blog", sub: "Farming Tips & Stories", href: "/blog#posts", icon: PenSquare },
      { label: "Advertise", sub: "Grow Your Agri-Business", href: "/advertise#advantages", icon: Megaphone },
      { label: "Contact Us", sub: "Connect With Our Team", href: "/contact", icon: Mail },
    ]
  },
  {
    title: "Quick Actions",
    items: [
      { label: "Pricing Packages", sub: "Explore Packages", href: "/advertise#pricing", icon: DollarSign },
      { label: "Apply to Advertise", sub: "Submit Application", href: "/advertise#apply", icon: UserCheck },
      { label: "Search Directory", sub: "Find Suppliers & Products", href: "/directory#search", icon: Search },
      { label: "Featured Articles", sub: "Latest Knowledge Hub", href: "/magazine#articles", icon: Compass },
    ]
  }
]

const bgVariables = [
  { text: "yield = crop * rain", size: "text-[9px]", top: "10%", left: "4%", duration: 14 },
  { text: "ROI = CTR / CPC", size: "text-[8px]", top: "28%", left: "72%", duration: 17 },
  { text: "pH > 6.5", size: "text-[10px]", top: "48%", left: "8%", duration: 12 },
  { text: "H2O + CO2", size: "text-[9px]", top: "64%", left: "78%", duration: 15 },
  { text: "soil === 'loam'", size: "text-[8px]", top: "82%", left: "15%", duration: 19 },
  { text: "temp <= 30", size: "text-[10px]", top: "72%", left: "50%", duration: 11 },
  { text: "cpc_value", size: "text-[9px]", top: "15%", left: "42%", duration: 16 },
  { text: "NPK = 15:15:15", size: "text-[8px]", top: "88%", left: "68%", duration: 18 },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(true)
  const [showSearch, setShowSearch] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Header is always opaque and clear to ensure high contrast against gradient page backgrounds
    setScrolled(true)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!searchValue.trim()) return
    // Search directory by default; magazine if on magazine page
    if (pathname === "/magazine") {
      router.push(`/magazine?q=${encodeURIComponent(searchValue.trim())}`)
    } else {
      router.push(`/directory?q=${encodeURIComponent(searchValue.trim())}`)
    }
    setShowSearch(false)
    setSearchValue("")
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
    if (e.key === "Escape") {
      setShowSearch(false)
      setSearchValue("")
    }
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-md border-b border-primary/15 backdrop-blur-xl"
      style={{
        background: "linear-gradient(90deg, rgba(34,120,60,0.08) 0%, rgba(255,255,255,0.92) 50%, rgba(180,140,30,0.06) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-primary rounded-full"
            >
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <span className={`font-serif text-xl font-bold ${scrolled ? "text-foreground" : "text-white"}`}>
              Mediaserv <span className="text-secondary">Advertising</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-bold rounded-full transition-all ${
                    isActive(item.href)
                      ? scrolled
                        ? "text-primary bg-primary/10"
                        : "text-white bg-white/20"
                      : scrolled
                      ? "text-foreground hover:text-primary hover:bg-primary/10"
                      : "text-white/90 hover:text-white hover:bg-white/15"
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-secondary rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Input
                      ref={searchInputRef}
                      placeholder={pathname === "/magazine" ? "Search articles..." : "Search directory..."}
                      className={`h-9 ${scrolled ? "bg-background/80" : "bg-white/15 border-white/30 text-white placeholder:text-white/60"} backdrop-blur-sm`}
                      autoFocus
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                type={showSearch ? "submit" : "button"}
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (!showSearch) {
                    setShowSearch(true)
                    setTimeout(() => searchInputRef.current?.focus(), 100)
                  } else {
                    handleSearch()
                  }
                }}
                className={scrolled ? "text-foreground hover:text-primary" : "text-white hover:bg-white/15"}
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>

            {/* Quick Nav Dropdown */}
            <div ref={dropdownRef} className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDropdown(!showDropdown)}
                className={`gap-2 font-bold text-xs rounded-full px-4 py-1.5 transition-all shadow-sm ${
                  scrolled
                    ? "bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 hover:border-primary/40"
                    : "bg-white/10 hover:bg-white/20 text-white border-white/25 hover:border-white/40"
                }`}
              >
                <Compass className="h-3.5 w-3.5" />
                Quick Nav
                <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`} />
              </Button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    style={{
                      background: "linear-gradient(160deg, rgba(15,60,20,0.97) 0%, rgba(20,80,30,0.95) 40%, rgba(10,45,15,0.98) 100%)",
                      border: "1px solid rgba(80,180,80,0.22)",
                      boxShadow: "0 16px 56px 0 rgba(10,50,10,0.55), 0 2px 12px 0 rgba(0,0,0,0.30), inset 0 1px 0 rgba(120,220,120,0.15)",
                    }}
                    className="absolute right-0 top-full mt-3 w-80 rounded-2xl overflow-hidden z-50 p-3"
                  >
                    {/* Deep fading green layers */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                      {/* Top-left bright green fade */}
                      <motion.div
                        className="absolute -top-12 -left-12 w-48 h-48 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(34,160,60,0.35) 0%, transparent 65%)" }}
                        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 1, 0.55] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {/* Bottom-right deep fade */}
                      <motion.div
                        className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(20,100,40,0.45) 0%, transparent 65%)" }}
                        animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0.85, 0.4] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                      />
                      {/* Center sweep shimmer */}
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(135deg, transparent 30%, rgba(40,160,80,0.07) 50%, transparent 70%)" }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      />
                      {/* Top highlight line */}
                      <div className="absolute top-0 left-6 right-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(120,220,120,0.5), transparent)" }} />
                      {/* Bottom subtle line */}
                      <div className="absolute bottom-0 left-10 right-10 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(40,160,80,0.25), transparent)" }} />

                      {/* Moving agricultural variables */}
                      {bgVariables.map((v, i) => (
                        <motion.span
                          key={i}
                          className={`absolute font-mono font-bold select-none ${v.size}`}
                          style={{ top: v.top, left: v.left, color: "rgba(100,220,100,0.22)" }}
                          animate={{
                            y: [0, -18, 0],
                            x: [0, 12, 0],
                            opacity: [0.15, 0.55, 0.15],
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

                    <div className="relative z-10 space-y-4">
                      {quickNavGroups.map((group) => (
                        <div key={group.title} className="space-y-1">
                          <p className="text-[9px] uppercase tracking-[0.18em] font-black px-2.5 pb-0.5" style={{ color: "rgba(120,220,120,0.55)" }}>
                            {group.title}
                          </p>
                          <div className="space-y-0.5">
                            {group.items.map((item) => {
                              const Icon = item.icon
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setShowDropdown(false)}
                                  className="flex items-center gap-3 p-2 rounded-xl group/item transition-all"
                                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(60,180,80,0.14)")}
                                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                                >
                                  <div
                                    className="flex-shrink-0 p-1.5 rounded-lg transition-all group-hover/item:scale-110"
                                    style={{ background: "rgba(60,180,80,0.18)", border: "1px solid rgba(100,220,100,0.2)" }}
                                  >
                                    <Icon className="h-4 w-4" style={{ color: "rgba(120,240,120,0.9)" }} />
                                  </div>
                                  <div className="flex-grow text-left">
                                    <span className="block text-xs font-bold transition-colors" style={{ color: "rgba(220,255,220,0.92)" }}>
                                      {item.label}
                                    </span>
                                    <span className="block text-[10px] font-medium leading-none mt-0.5" style={{ color: "rgba(130,200,130,0.5)" }}>
                                      {item.sub}
                                    </span>
                                  </div>
                                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover/item:opacity-60 group-hover/item:translate-x-0 transition-all self-center" style={{ color: "rgba(120,240,120,0.8)" }} />
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              size="sm"
              className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
              asChild
            >
              <Link href="/advertise">Post Ad</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary/15 relative overflow-hidden backdrop-blur-xl"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,250,242,0.98) 100%)",
            }}
          >
            {/* Floating Mediaserv Variables in Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04] select-none">
              {bgVariables.map((v, i) => (
                <motion.span
                  key={i}
                  className={`absolute font-mono font-bold select-none ${v.size} text-primary`}
                  style={{ top: v.top, left: v.left }}
                  animate={{
                    y: [0, -25, 0],
                    x: [0, 15, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: v.duration * 1.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {v.text}
                </motion.span>
              ))}
            </div>

            <div className="relative z-10 container mx-auto px-4 py-4 flex flex-col gap-1">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-9 h-10 bg-muted/50 rounded-full border-border/50"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <Button type="submit" size="sm" className="rounded-full px-4 font-bold">
                  Go
                </Button>
              </form>

              {/* Nav links */}
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {item.name}
                    {isActive(item.href) && (
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Quick Nav */}
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-4 mb-2">Quick Navigate</p>
                <div className="grid grid-cols-2 gap-1.5 px-2">
                  {quickNavGroups.flatMap(g => g.items).map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all font-medium"
                      >
                        <Icon className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              <Button className="mt-4 w-full rounded-full bg-secondary text-secondary-foreground font-bold" asChild>
                <Link href="/advertise" onClick={() => setIsOpen(false)}>Post Your Ad</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
