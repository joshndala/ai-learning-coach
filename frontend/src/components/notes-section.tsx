"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, Sparkles } from "lucide-react"

export function NotesSection() {
  const [notes, setNotes] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSummarize = () => {
    if (!notes.trim()) return

    setIsLoading(true)

    // Simulate API call for summarization
    setTimeout(() => {
      setSummary(
        "This is a summary of the key points from your notes:\n\n1. Supply and demand determine market equilibrium\n2. Price elasticity measures responsiveness to price changes\n3. Consumer surplus is the difference between willingness to pay and actual price\n4. Producer surplus is the difference between market price and minimum selling price",
      )
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Class Notes</CardTitle>
          <CardDescription>Upload or paste your notes to organize and summarize them</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full gap-2">
              <Textarea
                placeholder="Paste your notes here..."
                className="min-h-[200px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" />
                Upload Notes
              </Button>
              <Button onClick={handleSummarize} disabled={!notes.trim() || isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                {isLoading ? "Summarizing..." : "Summarize Notes"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {summary && (
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>AI-generated summary of your notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line">{summary}</div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              Save Summary
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSummary("")}>
              Discard
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
