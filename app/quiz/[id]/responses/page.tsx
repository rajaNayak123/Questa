import { getServerSession } from "next-auth"
import { redirect, notFound } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Props {
  params: { id: string }
}

export default async function ResponsesPage({ params }: Props) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: {
      questions: {
        orderBy: { order: "asc" },
      },
      responses: {
        include: {
          answers: {
            include: {
              question: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })

  if (!quiz) {
    notFound()
  }

  if (quiz.creatorId !== session.user.id) {
    redirect("/dashboard")
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
        <p className="text-gray-600">Quiz Responses</p>
        <Badge variant="secondary" className="mt-2">
          {quiz.responses.length} responses
        </Badge>
      </div>

      {quiz.responses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h3 className="text-lg font-semibold mb-2">No responses yet</h3>
            <p className="text-gray-600">Share your quiz to start collecting responses</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {quiz.responses.map((response, responseIndex) => (
            <Card key={response.id}>
              <CardHeader>
                <CardTitle className="text-lg">Response #{responseIndex + 1}</CardTitle>
                <CardDescription>Submitted on {new Date(response.createdAt).toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quiz.questions.map((question) => {
                    const answer = response.answers.find((a) => a.questionId === question.id)
                    return (
                      <div key={question.id} className="border-l-4 border-blue-200 pl-4">
                        <p className="font-medium text-gray-900">{question.text}</p>
                        <p className="text-gray-600 mt-1">{answer?.value || "No answer provided"}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
