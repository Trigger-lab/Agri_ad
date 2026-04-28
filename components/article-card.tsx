"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, ArrowRight, Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ArticleCardProps {
  title: string
  category: string
  image: string
  readTime: string
  date: string
  excerpt: string
  index: number
}

export function ArticleCard({ title, category, image, readTime, date, excerpt, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden group border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge className="absolute top-3 left-3 bg-primary/90 text-white border-none backdrop-blur-md">
            {category}
          </Badge>
          <button className="absolute bottom-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
        <CardContent className="p-5">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
            <span>{date}</span>
            <span className="w-1 h-1 bg-primary rounded-full" />
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTime}
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {excerpt}
          </p>
        </CardContent>
        <CardFooter className="px-5 py-4 bg-muted/30 border-t border-border/10 flex justify-between items-center">
          <span className="text-xs font-bold text-primary flex items-center group-hover:gap-2 transition-all">
            Read Full Article
            <ArrowRight className="h-3 w-3 ml-1" />
          </span>
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-muted overflow-hidden">
                <Image src={`https://i.pravatar.cc/100?u=${i + index}`} alt="Author" width={24} height={24} />
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
