"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Share2, Download, Maximize2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface IssueReaderProps {
  isOpen: boolean
  onClose: () => void
  issue: {
    title: string
    date: string
    cover: string
  }
}

export function IssueReader({ isOpen, onClose, issue }: IssueReaderProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 8 // Dummy pages for demonstration

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8"
        >
          <div className="absolute top-4 right-4 flex gap-2 z-50">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Download className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center">
            <header className="text-center mb-6 text-white/70">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">{issue.title}</h2>
              <p className="text-xs uppercase tracking-widest">{issue.date} • Page {currentPage + 1} of {totalPages}</p>
            </header>

            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden rounded-lg shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 50, rotateY: -10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -50, rotateY: 10 }}
                  transition={{ type: "spring", damping: 25, stiffness: 120 }}
                  className="relative w-full h-full max-h-[80vh] aspect-[3/4] bg-[#f4f1ea] overflow-hidden"
                >
                  {/* Page Content Simulation */}
                  <div className="absolute inset-0 p-8 md:p-12 font-serif text-[#3d3a2e] flex flex-col justify-between">
                    <div className="space-y-6">
                      {currentPage === 0 ? (
                        <div className="relative w-full h-full">
                          <Image src={issue.cover} alt="Cover" fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                             <Image
                                src="/mediaserv-logo-white.png"
                                alt="Mediaserv logo"
                                width={240}
                                height={150}
                                className="h-16 md:h-20 w-auto object-contain mb-4 drop-shadow-2xl"
                              />
                             <div className="w-20 h-1 bg-white mb-4" />
                             <p className="text-white font-sans font-bold tracking-[0.4em] uppercase text-sm">Quarterly Digest</p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6 animate-in fade-in duration-700">
                          <div className="flex justify-between items-end border-b border-black/10 pb-4">
                            <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-primary/60">Features // Technology</span>
                            <span className="text-3xl font-black opacity-10 font-sans">{currentPage + 1}</span>
                          </div>
                          <h3 className="text-3xl md:text-5xl font-bold leading-[1.1] mb-8">The Future of <span className="text-primary italic">Precision Farming</span></h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg leading-relaxed text-justify opacity-90">
                            <p>Zimbabwe&apos;s agricultural landscape is undergoing a digital renaissance. By integrating real-time telemetry from center-pivot systems with AI-driven crop stress analysis, farmers are seeing yields increase by 40% while reducing water consumption by half.</p>
                            <p>The synergy between legacy knowledge and modern hardware is the hallmark of the new Green Revolution. As we look toward 2030, the tools at our disposal are becoming as vital as the soil itself.</p>
                          </div>
                          <div className="relative h-64 w-full rounded-lg overflow-hidden grayscale contrast-125 opacity-20">
                             <Image src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800" alt="Tech" fill className="object-cover" />
                          </div>
                        </div>
                      )}
                    </div>
                    <footer className="flex items-center justify-between border-t border-black/10 pt-4 text-[10px] uppercase font-sans font-black tracking-widest text-black/30">
                      <span>Mediaserv Collective // Knowledge Center</span>
                      <span>Vol. 12 Issue 04</span>
                    </footer>
                  </div>
                  
                  {/* Subtle Paper Texture */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all disabled:opacity-0 disabled:pointer-events-none z-30"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all disabled:opacity-0 disabled:pointer-events-none z-30"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-8 flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPage === i ? "bg-primary w-8" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
