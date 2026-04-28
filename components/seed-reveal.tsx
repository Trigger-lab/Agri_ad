"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Sprout, Tractor } from "lucide-react"

interface SeedRevealProps {
  children: React.ReactNode
  className?: string
}

export function SeedReveal({ children, className = "" }: SeedRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div ref={ref} className={`relative ${className}`}>
      {/* Seed Animation Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm rounded-3xl"
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <motion.div className="relative">
          {/* Seed Container */}
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: [0, 1, 1, 0] } : { scale: 0 }}
            transition={{ duration: 2, times: [0, 0.3, 0.7, 1] }}
          >
            {/* Outer seed shell - left half */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-20 h-24 -translate-y-1/2 origin-right"
              style={{ 
                background: "linear-gradient(135deg, #8B4513 0%, #654321 100%)",
                borderRadius: "50% 0 0 50% / 50% 0 0 50%",
                transformOrigin: "right center"
              }}
              initial={{ x: "-100%", rotateY: 0 }}
              animate={isInView ? { 
                x: "-100%",
                rotateY: [0, 0, -90, -90],
              } : { rotateY: 0 }}
              transition={{ duration: 2, times: [0, 0.4, 0.6, 1] }}
            />
            
            {/* Outer seed shell - right half */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-20 h-24 -translate-y-1/2 origin-left"
              style={{ 
                background: "linear-gradient(-135deg, #8B4513 0%, #654321 100%)",
                borderRadius: "0 50% 50% 0 / 0 50% 50% 0",
                transformOrigin: "left center"
              }}
              initial={{ x: "0%", rotateY: 0 }}
              animate={isInView ? { 
                x: "0%",
                rotateY: [0, 0, 90, 90],
              } : { rotateY: 0 }}
              transition={{ duration: 2, times: [0, 0.4, 0.6, 1] }}
            />

            {/* Inner sprout */}
            <motion.div
              className="relative z-10 w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { 
                scale: [0, 0, 1.2, 1.5, 0],
                opacity: [0, 0, 1, 1, 0],
              } : { scale: 0 }}
              transition={{ duration: 2, times: [0, 0.4, 0.6, 0.8, 1] }}
            >
              <motion.div
                animate={isInView ? { rotate: [0, 0, 0, 360] } : { rotate: 0 }}
                transition={{ duration: 2, times: [0, 0.6, 0.8, 1] }}
              >
                <Sprout className="h-12 w-12 text-primary-foreground" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Explosion particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full"
              style={{
                background: i % 2 === 0 ? "var(--primary)" : "var(--secondary)",
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={isInView ? {
                x: Math.cos((i * Math.PI * 2) / 12) * 120,
                y: Math.sin((i * Math.PI * 2) / 12) * 120,
                opacity: [0, 0, 1, 1, 0],
                scale: [0, 0, 1, 0.5, 0],
              } : { opacity: 0 }}
              transition={{ duration: 2, times: [0, 0.5, 0.6, 0.8, 1] }}
            />
          ))}

          {/* Soil particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`soil-${i}`}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-800 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={isInView ? {
                x: (Math.random() - 0.5) * 100,
                y: Math.random() * 60 + 30,
                opacity: [0, 0, 1, 0],
              } : { opacity: 0 }}
              transition={{ duration: 2, times: [0, 0.4, 0.5, 1], delay: i * 0.02 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

interface TractorRevealProps {
  children: React.ReactNode
  className?: string
}

export function TractorReveal({ children, className = "" }: TractorRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Curtain/Cover being pulled */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-muted/80 z-10 flex items-center justify-center"
        initial={{ x: 0 }}
        animate={isInView ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
      >
        {/* Pattern on curtain */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              var(--primary) 20px,
              var(--primary) 21px
            )`,
          }} />
        </div>
        
        {/* Preview text */}
        <motion.div
          className="text-center text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Sprout className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm font-medium">Revealing content...</p>
        </motion.div>
      </motion.div>

      {/* Tractor pulling animation */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-0 z-20 pointer-events-none"
        initial={{ x: "-150px" }}
        animate={isInView ? { x: "calc(100vw + 150px)" } : { x: "-150px" }}
        transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex items-center">
          {/* Tractor */}
          <motion.div 
            className="relative"
            animate={{ y: [0, -2, 0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 0.3 }}
          >
            <div className="w-24 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden">
              {/* Tractor body shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
              <Tractor className="h-12 w-12 text-primary-foreground relative z-10" />
              
              {/* Exhaust smoke */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute -top-2 left-4 w-3 h-3 bg-muted-foreground/30 rounded-full"
                  animate={{ 
                    y: [-5, -20],
                    x: [0, -10],
                    opacity: [0.6, 0],
                    scale: [0.5, 1.5],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.8,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            
            {/* Wheels */}
            <motion.div 
              className="absolute -bottom-2 left-2 w-6 h-6 bg-foreground rounded-full border-2 border-muted"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
            />
            <motion.div 
              className="absolute -bottom-3 right-2 w-8 h-8 bg-foreground rounded-full border-2 border-muted"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
            />
          </motion.div>
          
          {/* Rope */}
          <div className="relative">
            <motion.div 
              className="w-20 h-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-full shadow-md"
              animate={{ scaleX: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
            />
            {/* Rope texture */}
            <div className="absolute inset-0 flex items-center justify-around">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-0.5 h-full bg-amber-800/50" />
              ))}
            </div>
          </div>
          
          {/* Connection point */}
          <motion.div 
            className="w-4 h-4 bg-amber-800 rounded-full shadow-lg border-2 border-amber-600"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Dust trail */}
      <motion.div
        className="absolute top-1/2 left-0 z-15 pointer-events-none"
        initial={{ x: "-100px", opacity: 0 }}
        animate={isInView ? { x: "calc(100vw + 100px)", opacity: [0, 0.5, 0] } : { x: "-100px" }}
        transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-8 h-8 bg-muted-foreground/20 rounded-full blur-md"
              animate={{ scale: [0.5, 1.5], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
