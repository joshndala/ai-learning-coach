"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { SendHorizontal, Bot } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI tutor for this class. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm your AI tutor. I'm here to help you understand the concepts in this class. What specific topic would you like to explore?",
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <Card className="h-[calc(100vh-220px)] flex flex-col">
      <CardHeader>
        <CardTitle>Ask your AI tutor anything</CardTitle>
        <CardDescription>Your personal study buddy is here to help with any questions about this class</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {message.sender === "assistant" && (
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-6 w-6">
                    <Bot className="h-4 w-4" />
                  </Avatar>
                  <span className="text-xs font-medium">AI Tutor</span>
                </div>
              )}
              <p>{message.content}</p>
              <div
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          className="flex w-full items-center space-x-2"
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
        >
          <Input
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
