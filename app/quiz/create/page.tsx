"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Trash2 } from "lucide-react"

interface Question {
  text: string
  type: "SINGLE_CHOICE" | "TEXT"
  options: string[]
}

export default function CreateQuizPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
  })

  const [questions, setQuestions] = useState<Question[]>([
    { text: "", type: "SINGLE_CHOICE" as const, options: ["", ""] },
  ])

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!session) {
    router.push("/auth/signin")
    return null
  }

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "SINGLE_CHOICE", options: ["", ""] }])
  }

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions]
    updated[index] = { ...updated[index], [field]: value }
    setQuestions(updated)
  }

  const addOption = (questionIndex: number) => {
    const updated = [...questions]
    updated[questionIndex].options.push("")
    setQuestions(updated)
  }

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions]
    if (updated[questionIndex].options.length > 2) {
      updated[questionIndex].options.splice(optionIndex, 1)
      setQuestions(updated)
    }
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions]
    updated[questionIndex].options[optionIndex] = value
    setQuestions(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validation
    if (!quiz.title.trim()) {
      setError("Quiz title is required")
      setLoading(false)
      return
    }

    if (questions.length < 2) {
      setError("At least 2 questions are required")
      setLoading(false)
      return
    }

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i]
      if (!question.text.trim()) {
        setError(`Question ${i + 1} text is required`)
        setLoading(false)
        return
      }

      if (question.type === "SINGLE_CHOICE") {
        const validOptions = question.options.filter((opt) => opt.trim())
        if (validOptions.length < 2) {
          setError(`Question ${i + 1} must have at least 2 options`)
          setLoading(false)
          return
        }
      }
    }

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: quiz.title,
          description: quiz.description,
          questions: questions.map((q, index) => ({
            ...q,
            order: index,
            options: q.type === "SINGLE_CHOICE" ? q.options.filter((opt) => opt.trim()) : [],
          })),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/quiz/${data.id}?created=true`)
      } else {
        const data = await response.json()
        setError(data.error || "Failed to create quiz")
      }
    } catch (error) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Quiz</h1>
        <p className="text-gray-600">Build an engaging quiz to share with your audience</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Quiz Details */}
        <Card>
          <CardHeader>
            <CardTitle>Quiz Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                placeholder="Enter quiz title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={quiz.description}
                onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                placeholder="Enter quiz description (optional)"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Questions</h2>
            <Button type="button" onClick={addQuestion} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>

          {questions.map((question, questionIndex) => (
            <Card key={questionIndex}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                  {questions.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(questionIndex)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Question Text *</Label>
                  <Input
                    value={question.text}
                    onChange={(e) => updateQuestion(questionIndex, "text", e.target.value)}
                    placeholder="Enter your question"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select
                    value={question.type}
                    onValueChange={(value: "SINGLE_CHOICE" | "TEXT") => updateQuestion(questionIndex, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SINGLE_CHOICE">Single Choice</SelectItem>
                      <SelectItem value="TEXT">Text Answer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {question.type === "SINGLE_CHOICE" && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Options</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => addOption(questionIndex)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add Option
                      </Button>
                    </div>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                        {question.options.length > 2 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(questionIndex, optionIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Quiz"}
          </Button>
        </div>
      </form>
    </div>
  )
}
