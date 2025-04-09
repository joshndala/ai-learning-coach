import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ArrowRight, BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Progress } from "@/components/ui/progress"

// Sample class data
const classes = [
  {
    id: "1",
    name: "ECON 202",
    title: "Microeconomics",
    progress: 65,
    upcoming: "Midterm Exam in 5 days",
  },
  {
    id: "2",
    name: "CS 101",
    title: "Introduction to Programming",
    progress: 80,
    upcoming: "Assignment due tomorrow",
  },
  {
    id: "3",
    name: "MATH 301",
    title: "Linear Algebra",
    progress: 45,
    upcoming: "Quiz on Friday",
  },
  {
    id: "4",
    name: "PSYCH 110",
    title: "Introduction to Psychology",
    progress: 30,
    upcoming: "Research paper due in 2 weeks",
  },
]

export default function DashboardPage() {
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

      <main className="container px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Your Classes</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Class
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((classItem) => (
            <Link href={`/classes/${classItem.id}`} key={classItem.id} className="block">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between">
                    <span>{classItem.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">{classItem.progress}%</span>
                  </CardTitle>
                  <h3 className="text-lg font-medium">{classItem.title}</h3>
                </CardHeader>
                <CardContent className="pb-2">
                  <Progress value={classItem.progress} className="h-2" />
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <p className="text-sm text-muted-foreground">{classItem.upcoming}</p>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
