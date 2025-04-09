"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChatInterface } from "@/components/chat-interface"
import { NotesSection } from "@/components/notes-section"
import { ScheduleView } from "@/components/schedule-view"
import { QuizSection } from "@/components/quiz-section"

// Sample class data
const classData = {
  id: "1",
  name: "ECON 202",
  title: "Microeconomics",
  description:
    "This course introduces the economic way of thinking and the functioning of a market economy. It provides an introduction to microeconomics and explains how prices and quantities are determined in product and factor markets.",
  instructor: "Dr. Sarah Johnson",
  schedule: "Mon, Wed, Fri 10:00 AM - 11:15 AM",
  location: "Economics Building, Room 305",
  upcoming: [
    { id: "1", title: "Midterm Exam", date: "Oct 15, 2023", type: "exam" },
    { id: "2", title: "Problem Set 3", date: "Oct 8, 2023", type: "assignment" },
    { id: "3", title: "Market Analysis Project", date: "Oct 22, 2023", type: "project" },
  ],
}

export default function ClassPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">AI Learning Coach</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h2 className="text-3xl font-bold">
            {classData.name} – {classData.title}
          </h2>
          <p className="text-muted-foreground">
            {classData.instructor} • {classData.schedule}
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="study-buddy">Study Buddy</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="quiz">Quiz / Review</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Course Summary</CardTitle>
                <CardDescription>Key information about this course</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Description</h3>
                  <p>{classData.description}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p>{classData.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {classData.upcoming.map((item) => (
                    <li key={item.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{item.type}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="study-buddy">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="notes">
            <NotesSection />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleView />
          </TabsContent>

          <TabsContent value="quiz">
            <QuizSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
