"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Sprout,
  Bot,
  User,
  Sparkles,
  Wheat,
  Tractor,
  Droplets,
  Leaf,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const suggestedQuestions = [
  { icon: Wheat, text: "Best tobacco planting time?" },
  { icon: Tractor, text: "Tractor maintenance tips" },
  { icon: Droplets, text: "Drip irrigation setup" },
  { icon: Leaf, text: "Organic pest control" },
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleSuggestion = (question: string) => {
    if (isLoading) return
    sendMessage({ text: question })
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full shadow-2xl hover:shadow-primary/30 transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Sprout className="h-5 w-5" />
        </motion.div>
        <span className="font-semibold text-sm">Ask AgriBot</span>
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Sparkles className="h-2.5 w-2.5 text-secondary-foreground" />
        </motion.div>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[420px] h-[80vh] md:h-[600px] max-h-[700px] bg-card rounded-t-3xl md:rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/80 p-4 text-primary-foreground">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-2 bg-white/20 rounded-full"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sprout className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg">AgriBot</h3>
                      <p className="text-xs text-primary-foreground/80">Your farming assistant</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-primary-foreground hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/30 to-background">
                {messages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                    >
                      <Bot className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Hello, I&apos;m AgriBot!
                    </h4>
                    <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                      I can help you with tobacco farming, cattle management, irrigation, crop diseases, and more.
                    </p>

                    {/* Suggested Questions */}
                    <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                      {suggestedQuestions.map((q, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleSuggestion(q.text)}
                          className="flex items-center gap-2 p-3 bg-card border border-border rounded-xl text-left text-xs hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                          <q.icon className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-foreground group-hover:text-primary transition-colors">
                            {q.text}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex gap-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-card border border-border rounded-bl-sm"
                        }`}
                      >
                        <div className="text-sm leading-relaxed">
                          {message.parts.map((part, partIndex) => {
                            if (part.type === "text") {
                              return <span key={partIndex}>{part.text}</span>
                            }
                            return null
                          })}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-secondary-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))
                )}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl rounded-bl-sm p-3">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border bg-background">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about farming..."
                    className="flex-1 rounded-full bg-muted/50 border-0 focus-visible:ring-primary"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="rounded-full bg-primary hover:bg-primary/90 flex-shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  AgriBot provides general guidance. Consult local experts for specific advice.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
