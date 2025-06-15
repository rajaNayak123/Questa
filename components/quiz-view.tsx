"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Share2, CheckCircle } from "lucide-react"

interface QuizViewProps {
  quiz: {
    id: string
    title: string
    description: string | null
    creator: { name: string | null }
    questions: Array<{
      id: string
      text: string
      type: string
      options: string[]
      order: number
    }>
  }
  showCreatedMessage?: boolean
}

export function QuizView({ quiz, showCreatedMessage }: QuizViewProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validate all questions are answered
    const unansweredQuestions = quiz.questions.filter((q) => !answers[q.id])
    if (unansweredQuestions.length > 0) {
      setError("Please answer all questions before submitting")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/quiz/${quiz.id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to submit quiz")
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
            <p className="text-gray-600 text-center">Your response has been submitted successfully.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showCreatedMessage && (
        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Quiz created successfully! Share the link below to let others take your quiz.
          </AlertDescription>
        </Alert>
      )}

      {showCreatedMessage && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Share Your Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button onClick={copyToClipboard} variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          {quiz.description && <CardDescription className="text-base">{quiz.description}</CardDescription>}
          <p className="text-sm text-gray-500">Created by {quiz.creator.name || "Anonymous"}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {quiz.questions.map((question, index) => (
              <div key={question.id} className="space-y-4">
                <Label className="text-base font-medium">
                  {index + 1}. {question.text}
                </Label>

                {question.type === "SINGLE_CHOICE" ? (
                  <RadioGroup
                    value={answers[question.id] || ""}
                    onValueChange={(value) => handleAnswerChange(question.id, value)}
                  >
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                        <Label htmlFor={`${question.id}-${optionIndex}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <Input
                    value={answers[question.id] || ""}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder="Enter your answer"
                  />
                )}
              </div>
            ))}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Quiz"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
