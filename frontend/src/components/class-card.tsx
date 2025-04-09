"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type ClassCardProps = {
  id: string
  name: string
  title: string
  progress: number
  upcoming: string
}

export function ClassCard({ id, name, title, progress, upcoming }: ClassCardProps) {
  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between">
          <span>{name}</span>
          <span className="text-sm font-normal text-muted-foreground">{progress}%</span>
        </CardTitle>
        <h3 className="text-lg font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="pb-2">
        <Progress value={progress} className="h-2" />
      </CardContent>
      {/*<CardFooter className="flex justify-between pt-2">
        <p className="text-sm text-muted-foreground">{upcoming}</p>
        <ArrowRight className="h-5 w-5 text-muted-foreground" />
      </CardFooter>*/}
    </Card>
  )
}
