"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Brain, FileText, Plus, Upload } from "lucide-react"

type Question = {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

type Reference = {
  id: string
  title: string
  type: "note" | "syllabus" | "document"
  date: string
}

export function QuizSection() {
  const [quizGenerated, setQuizGenerated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  // Sample reference materials
  const [references, setReferences] = useState<Reference[]>([
    { id: "1", title: "Lecture Notes - Supply and Demand", type: "note", date: "Oct 1, 2023" },
    { id: "2", title: "Course Syllabus", type: "syllabus", date: "Sep 15, 2023" },
    { id: "3", title: "Textbook Chapter 3", type: "document", date: "Oct 5, 2023" },
  ])

  const handleGenerateQuiz = () => {
    setIsLoading(true)

    // Simulate API call to generate quiz
    setTimeout(() => {
      setQuestions([
        {
          id: "q1",
          question: "What happens to the equilibrium price when demand increases and supply remains constant?",
          options: [
            "Price increases",
            "Price decreases",
            "Price remains the same",
            "Cannot be determined without more information",
          ],
          correctAnswer: 0,
        },
        {
          id: "q2",
          question: "Which of the following is NOT a determinant of demand?",
          options: ["Consumer income", "Price of related goods", "Technology", "Consumer preferences"],
          correctAnswer: 2,
        },
        {
          id: "q3",
          question: "If the price elasticity of demand for a good is 0.5, the demand is:",
          options: ["Elastic", "Inelastic", "Unit elastic", "Perfectly elastic"],
          correctAnswer: 1,
        },
        {
          id: "q4",
          question: "Consumer surplus is defined as:",
          options: [
            "The difference between what consumers pay and what producers receive",
            "The difference between what consumers are willing to pay and what they actually pay",
            "The total revenue received by producers",
            "The total utility derived from consuming a good",
          ],
          correctAnswer: 1,
        },
        {
          id: "q5",
          question: "In a perfectly competitive market, firms are:",
          options: ["Price makers", "Price takers", "Monopolists", "Oligopolists"],
          correctAnswer: 1,
        },
      ])
      setQuizGenerated(true)
      setIsLoading(false)
    }, 2000)
  }

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    })
  }

  const handleSubmitQuiz = () => {
    setShowResults(true)
  }

  const handleResetQuiz = () => {
    setQuizGenerated(false)
    setQuestions([])
    setAnswers({})
    setShowResults(false)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++
      }
    })
    return correct
  }

  const handleAddReference = () => {
    setShowUploadDialog(true)
    // In a real app, this would open a file upload dialog
    // For now, we'll just simulate adding a new reference
    setTimeout(() => {
      const newReference: Reference = {
        id: (references.length + 1).toString(),
        title: "Additional Study Material",
        type: "document",
        date: new Date().toLocaleDateString(),
      }
      setReferences([...references, newReference])
      setShowUploadDialog(false)
    }, 1000)
  }

  if (!quizGenerated) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quiz Generation Card - Takes 2/3 of space on desktop */}
        <div className="md:col-span-2">
          <Card className="text-center p-6 h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Practice Quiz</CardTitle>
              <CardDescription>Generate a practice quiz based on the course material</CardDescription>
            </CardHeader>
            <CardContent className="py-10">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <p className="mb-6">
                Test your knowledge with a personalized quiz generated by AI based on your course material.
              </p>
              <Button onClick={handleGenerateQuiz} disabled={isLoading} size="lg">
                {isLoading ? "Generating Quiz..." : "Generate Practice Quiz"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Reference Materials Card - Takes 1/3 of space on desktop */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Reference Materials</CardTitle>
                <Button variant="outline" size="icon" onClick={handleAddReference} disabled={showUploadDialog}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Materials used to generate the quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {references.map((reference) => (
                  <div key={reference.id} className="flex items-start gap-3 p-2 rounded-md border">
                    <div className="mt-1">
                      {reference.type === "note" && <FileText className="h-4 w-4 text-blue-500" />}
                      {reference.type === "syllabus" && <FileText className="h-4 w-4 text-green-500" />}
                      {reference.type === "document" && <FileText className="h-4 w-4 text-purple-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{reference.title}</p>
                      <p className="text-xs text-muted-foreground">{reference.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {showUploadDialog && (
                <div className="mt-4 p-4 border rounded-md bg-muted/30 flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Uploading reference material...</p>
                  </div>
                </div>
              )}
              
              {references.length === 0 && !showUploadDialog && (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No reference materials available</p>
                  <Button variant="link" onClick={handleAddReference} className="mt-2">
                    Add Reference Material
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Practice Quiz</h3>
        <Button variant="outline" onClick={handleResetQuiz}>
          Generate New Quiz
        </Button>
      </div>

      {questions.map((question, index) => (
        <Card key={question.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="text-lg">Question {index + 1}</CardTitle>
            <CardDescription className="text-base font-medium text-foreground">{question.question}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <RadioGroup
              value={answers[question.id]?.toString()}
              onValueChange={(value) => handleAnswerChange(question.id, Number.parseInt(value))}
            >
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem
                    value={optionIndex.toString()}
                    id={`${question.id}-option-${optionIndex}`}
                    disabled={showResults}
                    className={
                      showResults
                        ? optionIndex === question.correctAnswer
                          ? "border-green-500 text-green-500"
                          : answers[question.id] === optionIndex
                            ? "border-red-500 text-red-500"
                            : ""
                        : ""
                    }
                  />
                  <Label
                    htmlFor={`${question.id}-option-${optionIndex}`}
                    className={
                      showResults
                        ? optionIndex === question.correctAnswer
                          ? "text-green-600 dark:text-green-400"
                          : answers[question.id] === optionIndex
                            ? "text-red-600 dark:text-red-400"
                            : ""
                        : ""
                    }
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showResults && (
              <div
                className={`mt-2 p-2 rounded ${
                  answers[question.id] === question.correctAnswer
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                }`}
              >
                {answers[question.id] === question.correctAnswer
                  ? "Correct!"
                  : `Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {!showResults ? (
        <Button
          onClick={handleSubmitQuiz}
          disabled={Object.keys(answers).length !== questions.length}
          className="w-full"
        >
          Submit Quiz
        </Button>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">
              Your score: {calculateScore()} out of {questions.length} (
              {Math.round((calculateScore() / questions.length) * 100)}%)
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleResetQuiz} className="w-full">
              Try Another Quiz
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
