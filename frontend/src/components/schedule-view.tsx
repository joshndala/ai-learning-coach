"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"

// Sample schedule data
const scheduleData = [
  {
    id: "1",
    title: "Lecture: Supply and Demand",
    date: "Monday, Oct 2",
    time: "10:00 AM - 11:15 AM",
    type: "lecture",
    fullDate: new Date(2023, 9, 2), // October 2, 2023 (month is 0-indexed)
  },
  {
    id: "2",
    title: "Study Session: Price Elasticity",
    date: "Tuesday, Oct 3",
    time: "3:00 PM - 5:00 PM",
    type: "study",
    fullDate: new Date(2023, 9, 3),
  },
  {
    id: "3",
    title: "Problem Set 3 Due",
    date: "Friday, Oct 8",
    time: "11:59 PM",
    type: "assignment",
    fullDate: new Date(2023, 9, 8),
  },
  {
    id: "4",
    title: "Midterm Exam",
    date: "Sunday, Oct 15",
    time: "2:00 PM - 4:00 PM",
    type: "exam",
    fullDate: new Date(2023, 9, 15),
  },
  {
    id: "5",
    title: "Office Hours",
    date: "Wednesday, Oct 4",
    time: "1:00 PM - 3:00 PM",
    type: "office-hours",
    fullDate: new Date(2023, 9, 4),
  },
]

export function ScheduleView() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 9, 1)) // October 2023

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

  // Calendar functions
  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDay = (day: number) => {
    return scheduleData.filter(
      (event) =>
        event.fullDate.getDate() === day &&
        event.fullDate.getMonth() === currentMonth.getMonth() &&
        event.fullDate.getFullYear() === currentMonth.getFullYear()
    )
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Class Schedule</h3>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {/* Responsive layout: List on left, Calendar on right for laptop/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* List View - Takes 1/3 of space on desktop */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
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
        </div>

        {/* Calendar View - Takes 2/3 of space on desktop */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day) => (
                  <div key={day} className="text-center font-medium py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: firstDayOfMonth(currentMonth) }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-24 border rounded-md" />
                ))}
                {Array.from({ length: daysInMonth(currentMonth) }).map((_, index) => {
                  const day = index + 1
                  const events = getEventsForDay(day)
                  return (
                    <div key={day} className="h-24 border rounded-md p-1 overflow-hidden">
                      <div className="font-medium">{day}</div>
                      <div className="space-y-1 mt-1">
                        {events.map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate ${getTypeColor(event.type)}`}
                            title={`${event.title} - ${event.time}`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Study Plan - Full width */}
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
