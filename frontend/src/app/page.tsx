import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">AI Learning Coach</h1>
        </div>
        <p className="text-muted-foreground">Your personal study companion</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your email to receive a magic link for signing in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <Input id="email" type="email" placeholder="you@university.edu" className="w-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign in with Magic Link</Button>
        </CardFooter>
      </Card>

      <p className="mt-4 text-sm text-muted-foreground">No account? We'll create one for you automatically.</p>
    </div>
  )
}
