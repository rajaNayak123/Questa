import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface Props {
  params: { id: string }
}

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { answers } = await request.json()

    const quiz = await prisma.quiz.findUnique({
      where: { id: params.id },
      include: { questions: true },
    })

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
    }

    // Create response with answers
    const response = await prisma.response.create({
      data: {
        quizId: quiz.id,
        answers: {
          create: Object.entries(answers).map(([questionId, value]) => ({
            questionId,
            value: value as string,
          })),
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error submitting quiz:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
