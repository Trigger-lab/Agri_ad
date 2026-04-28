"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Sprout, Tractor, Eye } from "lucide-react"

interface AdCardProps {
  image: string
  title: string
  sponsor: string
  category: string
  description?: string
  featured?: boolean
  size?: "small" | "medium" | "large"
  className?: string
  animationType?: "seed" | "tractor" | "fade" | "zoom"
}

export function AdCard({
  image,
  title,
  sponsor,
  category,
  description,
  featured = false,
  size = "medium",
  className,
  animationType = "fade"
}: AdCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isRevealed, setIsRevealed] = useState(false)
  const [showContent, setShowContent] = useState(animationType === "fade" || animationType === "zoom")

  const sizeClasses = {
    small: "h-48",
    medium: "h-64",
    large: "h-80 md:h-96",
  }

  // Auto-reveal for seed and tractor animations
  const triggerReveal = () => {
    if (!isRevealed && (animationType === "seed" || animationType === "tractor")) {
      setIsRevealed(true)
      setTimeout(() => setShowContent(true), animationType === "seed" ? 1500 : 1200)
    }
  }

  // Trigger on view
  if (isInView && !isRevealed && (animationType === "seed" || animationType === "tractor")) {
    setTimeout(triggerReveal, 300)
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-shadow cursor-pointer",
        sizeClasses[size],
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Blurred Background - Always visible as base */}
      <div className="absolute inset-0 -m-4">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover scale-125 blur-xl opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
      </div>

      {/* Seed Animation Overlay */}
      <AnimatePresence>
        {animationType === "seed" && !showContent && isInView && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-card/90 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div className="relative">
              {/* Seed shell breaking */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1, 1] }}
                transition={{ duration: 0.5, times: [0, 0.5, 1] }}
              >
                {/* Left shell */}
                <motion.div
                  className="absolute w-8 h-12 bg-gradient-to-br from-amber-700 to-amber-900 rounded-l-full"
                  style={{ left: "-16px", top: "-24px" }}
                  animate={{ 
                    x: [-16, -16, -40],
                    rotateZ: [0, 0, -30],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 1.5, times: [0, 0.3, 1] }}
                />
                {/* Right shell */}
                <motion.div
                  className="absolute w-8 h-12 bg-gradient-to-bl from-amber-700 to-amber-900 rounded-r-full"
                  style={{ right: "-16px", top: "-24px" }}
                  animate={{ 
                    x: [16, 16, 40],
                    rotateZ: [0, 0, 30],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ duration: 1.5, times: [0, 0.3, 1] }}
                />
              </motion.div>

              {/* Sprout emerging */}
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 0, 1.2, 1],
                  opacity: [0, 0, 1, 1]
                }}
                transition={{ duration: 1.5, times: [0, 0.3, 0.6, 1] }}
              >
                <Sprout className="h-8 w-8 text-primary-foreground" />
              </motion.div>

              {/* Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-2 h-2 bg-secondary rounded-full"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 8) * 50,
                    y: Math.sin((i * Math.PI * 2) / 8) * 50,
                    opacity: [0, 0, 1, 0],
                  }}
                  transition={{ duration: 1.5, times: [0, 0.3, 0.5, 1] }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tractor Animation Overlay */}
      <AnimatePresence>
        {animationType === "tractor" && !showContent && isInView && (
          <motion.div
            className="absolute inset-0 z-30 overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Cover being pulled away */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center"
              animate={{ x: [0, 0, "100%"] }}
              transition={{ duration: 1.2, times: [0, 0.2, 1], ease: "easeInOut" }}
            >
              <Eye className="h-8 w-8 text-muted-foreground animate-pulse" />
            </motion.div>

            {/* Tractor */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 flex items-center"
              animate={{ x: ["-80px", "-80px", "calc(100% + 80px)"] }}
              transition={{ duration: 1.2, times: [0, 0.1, 1], ease: "easeInOut" }}
            >
              <motion.div 
                className="w-14 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg"
                animate={{ y: [0, -1, 0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
              >
                <Tractor className="h-7 w-7 text-primary-foreground" />
              </motion.div>
              <div className="w-8 h-1 bg-amber-600 rounded" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Image - Revealed content */}
      <motion.div 
        className="absolute inset-0 z-10"
        initial={{ opacity: animationType === "fade" || animationType === "zoom" ? 0 : 1 }}
        animate={{ 
          opacity: showContent ? 1 : (animationType === "fade" || animationType === "zoom" ? 0 : 1),
          scale: animationType === "zoom" && !showContent ? 0.8 : 1
        }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </motion.div>

      {/* Featured Badge */}
      {featured && (
        <motion.div
          className="absolute top-3 left-3 z-20"
          initial={{ scale: 0 }}
          animate={showContent ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full shadow-lg">
            Featured
          </span>
        </motion.div>
      )}

      {/* Category Badge */}
      <motion.div
        className="absolute top-3 right-3 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ delay: 0.4 }}
      >
        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
          {category}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-white/70 text-xs mb-1">{sponsor}</p>
        <h3 className="text-white font-serif font-bold text-lg leading-tight mb-1 line-clamp-2">
          {title}
        </h3>
        {description && size !== "small" && (
          <p className="text-white/80 text-sm line-clamp-2 mt-2">{description}</p>
        )}
      </motion.div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors z-15 pointer-events-none" />
    </motion.div>
  )
}
