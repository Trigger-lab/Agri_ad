"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/animated-text"

const videos = [
  {
    id: 1,
    title: "Modern Tobacco Farming Techniques",
    thumbnail: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=450&fit=crop",
    duration: "5:32",
    views: "12.4K",
  },
  {
    id: 2,
    title: "Irrigation Systems for Dry Seasons",
    thumbnail: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=450&fit=crop",
    duration: "8:15",
    views: "8.7K",
  },
  {
    id: 3,
    title: "Livestock Management Best Practices",
    thumbnail: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&h=450&fit=crop",
    duration: "6:48",
    views: "15.2K",
  },
]

export function VideoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeVideo, setActiveVideo] = useState(0)

  return (
    <section ref={ref} className="py-16 bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Video Library
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-background mb-3">
            Learn from the Experts
          </h2>
          <p className="text-background/70 text-sm max-w-xl mx-auto">
            Watch tutorials, guides, and success stories from Zimbabwe&apos;s top farmers and agronomists.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Player */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black group">
              <img
                src={videos[activeVideo].thumbnail}
                alt={videos[activeVideo].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.button
                  className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-2xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-8 w-8 text-secondary-foreground ml-1" />
                </motion.button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-serif text-xl font-bold">
                  {videos[activeVideo].title}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-white/70 text-sm">
                  <span>{videos[activeVideo].duration}</span>
                  <span>{videos[activeVideo].views} views</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video List */}
          <div className="space-y-4">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                className={`flex gap-4 p-3 rounded-xl cursor-pointer transition-all ${
                  activeVideo === index
                    ? "bg-primary/20 border border-primary/30"
                    : "bg-background/5 hover:bg-background/10"
                }`}
                onClick={() => setActiveVideo(index)}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ x: 5 }}
              >
                <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-background font-medium text-sm line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-background/50 text-xs mt-1">{video.views} views</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
