"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/animated-text"
import { AIAssistant } from "@/components/ai-assistant"

// Sample blog post data
const post = {
  id: 1,
  title: "Best Practices for Tobacco Curing in Zimbabwe",
  content: `
    <p>Tobacco curing is one of the most critical steps in tobacco farming, directly impacting the quality and price of your crop at auction. In this comprehensive guide, we'll explore both traditional and modern curing techniques used by successful Zimbabwean farmers.</p>
    
    <h2>Understanding the Curing Process</h2>
    <p>Curing is the process of drying tobacco leaves while allowing chemical changes to occur that develop the characteristic flavor, aroma, and color of cured tobacco. The main types of curing used in Zimbabwe are:</p>
    <ul>
      <li><strong>Flue-curing:</strong> The most common method for Virginia tobacco</li>
      <li><strong>Air-curing:</strong> Used for Burley and some dark tobaccos</li>
      <li><strong>Fire-curing:</strong> Traditional method still used in some regions</li>
    </ul>
    
    <h2>Flue-Curing: The Gold Standard</h2>
    <p>For Virginia tobacco, flue-curing remains the preferred method. The process involves three stages: yellowing, fixing color, and drying the stem. Each stage requires careful temperature and humidity control.</p>
    
    <h3>Stage 1: Yellowing (36-72 hours)</h3>
    <p>Start with temperatures around 35°C and high humidity (85-90%). The leaves should turn from green to lemon-yellow. Monitor closely to prevent spotting.</p>
    
    <h3>Stage 2: Fixing Color (24-48 hours)</h3>
    <p>Gradually increase temperature to 55°C while reducing humidity to 60-65%. This fixes the yellow color and begins drying the leaf lamina.</p>
    
    <h3>Stage 3: Drying (24-48 hours)</h3>
    <p>Raise temperature to 70°C with humidity at 15-20% to completely dry the midrib. The leaves should be crispy but not brittle.</p>
    
    <h2>Common Mistakes to Avoid</h2>
    <p>Many farmers lose significant value due to curing errors. Here are the most common mistakes:</p>
    <ul>
      <li>Starting the curing process too early or too late</li>
      <li>Overloading the barn</li>
      <li>Inconsistent temperature control</li>
      <li>Inadequate ventilation</li>
      <li>Rushing the yellowing phase</li>
    </ul>
    
    <h2>Tips for Success</h2>
    <p>Based on interviews with award-winning tobacco farmers, here are their top recommendations:</p>
    <ol>
      <li>Harvest leaves at the right maturity stage</li>
      <li>Sort leaves by position and ripeness before curing</li>
      <li>Maintain your curing barn equipment before the season</li>
      <li>Keep detailed records of each curing cycle</li>
      <li>Join a local farmers' group to share experiences</li>
    </ol>
    
    <p>By following these best practices, you can achieve consistent, high-quality cured tobacco that commands premium prices at auction.</p>
  `,
  image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=600&fit=crop",
  author: "John Mukwena",
  authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  authorBio: "Agricultural Extension Officer with 15 years of experience in tobacco farming. Based in Mashonaland Central.",
  date: "April 20, 2026",
  category: "Tobacco",
  readTime: "8 min read",
  likes: 245,
  views: 3421,
}

const comments = [
  {
    id: 1,
    author: "Grace Moyo",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    content: "This is exactly what I needed! I've been struggling with the yellowing stage. The temperature guidelines are very helpful. Thank you for sharing!",
    date: "April 21, 2026",
    likes: 12,
    replies: [
      {
        id: 11,
        author: "John Mukwena",
        authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        content: "Glad it helped, Grace! Feel free to reach out if you have more questions about the yellowing process.",
        date: "April 21, 2026",
        likes: 5,
      },
    ],
  },
  {
    id: 2,
    author: "Peter Dube",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    content: "Great article! One thing I'd add is the importance of checking your thermometers regularly. I lost a whole barn last season because my thermometer was reading 10 degrees lower than actual.",
    date: "April 20, 2026",
    likes: 28,
    replies: [],
  },
  {
    id: 3,
    author: "Sarah Ncube",
    authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    content: "Can you write a similar guide for Burley tobacco air-curing? The techniques are quite different and there's not much information available.",
    date: "April 20, 2026",
    likes: 15,
    replies: [],
  },
]

export default function BlogPostPage() {
  const [newComment, setNewComment] = useState("")
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [localComments, setLocalComments] = useState(comments)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = () => {
    if (!newComment.trim()) return
    
    const comment = {
      id: Date.now(),
      author: "You",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      content: newComment,
      date: "Just now",
      likes: 0,
      replies: [],
    }
    
    setLocalComments([comment, ...localComments])
    setNewComment("")
  }

  const handleReply = (commentId: number) => {
    if (!replyContent.trim()) return
    
    setLocalComments(localComments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, {
            id: Date.now(),
            author: "You",
            authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            content: replyContent,
            date: "Just now",
            likes: 0,
          }]
        }
      }
      return comment
    }))
    
    setReplyingTo(null)
    setReplyContent("")
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Article Header */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 max-w-4xl">
              {post.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${liked ? "text-red-500 border-red-500" : ""}`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                  {post.likes + (liked ? 1 : 0)}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full ${bookmarked ? "text-primary border-primary" : ""}`}
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Image */}
      <ScrollReveal className="container mx-auto px-4 mb-12">
        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </ScrollReveal>

      {/* Article Content */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <article 
                  className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </ScrollReveal>

              {/* Tags */}
              <ScrollReveal className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {["Tobacco", "Curing", "Farming Tips", "Zimbabwe Agriculture"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors">
                      #{tag.replace(" ", "")}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              {/* Author Bio */}
              <ScrollReveal className="mt-8 p-6 bg-muted/50 rounded-2xl">
                <div className="flex items-start gap-4">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">{post.author}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{post.authorBio}</p>
                    <Button variant="outline" size="sm" className="rounded-full">
                      Follow Author
                    </Button>
                  </div>
                </div>
              </ScrollReveal>

              {/* Comments Section */}
              <section id="comments" className="mt-12">
                <ScrollReveal>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    Comments ({localComments.length})
                  </h2>
                </ScrollReveal>

                {/* Comment Form */}
                <ScrollReveal className="mb-8">
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <Textarea
                      placeholder="Share your thoughts or experiences..."
                      className="mb-3 min-h-24 resize-none"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleSubmitComment} className="rounded-full">
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Comments List */}
                <div className="space-y-6">
                  {localComments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      className="bg-card rounded-xl p-5 border border-border"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={comment.authorImage} />
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-medium text-foreground">{comment.author}</span>
                              <span className="text-muted-foreground text-sm ml-2">{comment.date}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-muted-foreground mb-3">{comment.content}</p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                              {comment.likes}
                            </button>
                            <button 
                              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                            >
                              <Reply className="h-4 w-4" />
                              Reply
                            </button>
                          </div>

                          {/* Reply Form */}
                          {replyingTo === comment.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-4 pl-4 border-l-2 border-primary/30"
                            >
                              <Textarea
                                placeholder="Write a reply..."
                                className="mb-2 min-h-16 resize-none text-sm"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleReply(comment.id)}>Reply</Button>
                                <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>Cancel</Button>
                              </div>
                            </motion.div>
                          )}

                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="mt-4 space-y-4 pl-4 border-l-2 border-border">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={reply.authorImage} />
                                    <AvatarFallback>{reply.author[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium text-sm text-foreground">{reply.author}</span>
                                      <span className="text-muted-foreground text-xs">{reply.date}</span>
                                    </div>
                                    <p className="text-muted-foreground text-sm">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScrollReveal>
                <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-4">Article Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views</span>
                      <span className="font-medium text-foreground">{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Likes</span>
                      <span className="font-medium text-foreground">{post.likes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Comments</span>
                      <span className="font-medium text-foreground">{localComments.length}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
