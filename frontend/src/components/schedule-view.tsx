"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

// Sample schedule data
const scheduleData = [
  {
    id: "1",
    title: "Lecture: Supply and Demand",
    date: "Monday, Oct 2",
    time: "10:00 AM - 11:15 AM",
    type: "lecture",
  },
  {
    id: "2",
    title: "Study Session: Price Elasticity",
    date: "Tuesday, Oct 3",
    time: "3:00 PM - 5:00 PM",
    type: "study",
  },
  {
    id: "3",
    title: "Problem Set 3 Due",
    date: "Friday, Oct 8",
    time: "11:59 PM",
    type: "assignment",
  },
  {
    id: "4",
    title: "Midterm Exam",
    date: "Sunday, Oct 15",
    time: "2:00 PM - 4:00 PM",
    type: "exam",
  },
  {
    id: "5",
    title: "Office Hours",
    date: "Wednesday, Oct 4",
    time: "1:00 PM - 3:00 PM",
    type: "office-hours",
  },
]

export function ScheduleView() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "study":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "assignment":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "exam":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "office-hours":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Class Schedule</h3>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {scheduleData.map((event) => (
              <div key={event.id} className="p-4 flex items-center gap-4">
                <div className="min-w-[100px]">
                  <p className="font-medium">{event.date}</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{event.title}</p>
                </div>
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(event.type)}`}>{event.type}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study Plan</CardTitle>
          <CardDescription>Recommended study schedule for upcoming exams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-3 border rounded-md">
              <p className="font-medium">Week 1: Review Supply and Demand</p>
              <p className="text-sm text-muted-foreground">Focus on price equilibrium and market forces</p>
            </div>
            <div className="p-3 border rounded-md">
              <p className="font-medium">Week 2: Price Elasticity</p>
              <p className="text-sm text-muted-foreground">Practice calculations and applications</p>
            </div>
            <div className="p-3 border rounded-md">
              <p className="font-medium">Week 3: Consumer and Producer Surplus</p>
              <p className="text-sm text-muted-foreground">Review concepts and work through problem sets</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
