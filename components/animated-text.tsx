"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  type?: "wave" | "reveal" | "swash" | "typewriter"
}

export function AnimatedText({
  text,
  className = "",
  once = true,
  delay = 0,
  type = "wave"
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  const words = text.split(" ")

  if (type === "wave") {
    return (
      <motion.span
        ref={ref}
        className={`inline-flex flex-wrap ${className}`}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.05, delayChildren: delay } },
          hidden: {}
        }}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex mr-[0.25em]">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={{
                  hidden: { y: 50, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
                transition={{ type: "spring", damping: 12, stiffness: 100 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    )
  }

  if (type === "swash") {
    return (
      <motion.span
        ref={ref}
        className={`inline-flex flex-wrap ${className}`}
        initial="hidden"
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.03, delayChildren: delay } },
          hidden: {}
        }}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex mr-[0.25em]">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    scale: 0.5, 
                    rotate: -45,
                    filter: "blur(10px)"
                  },
                  visible: { 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    filter: "blur(0px)"
                  }
                }}
                transition={{ 
                  type: "spring", 
                  damping: 15, 
                  stiffness: 150 
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    )
  }

  if (type === "reveal") {
    return (
      <motion.span
        ref={ref}
        className={`inline-block overflow-hidden ${className}`}
      >
        <motion.span
          className="inline-block"
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : { y: "100%" }}
          transition={{ duration: 0.5, delay, ease: "easeOut" }}
        >
          {text}
        </motion.span>
      </motion.span>
    )
  }

  // Typewriter
  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          transition={{ duration: 0.05, delay: delay + index * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up"
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const directionVariants = {
    up: { hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    down: { hidden: { y: -60, opacity: 0 }, visible: { y: 0, opacity: 1 } },
    left: { hidden: { x: -60, opacity: 0 }, visible: { x: 0, opacity: 1 } },
    right: { hidden: { x: 60, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={directionVariants[direction]}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
