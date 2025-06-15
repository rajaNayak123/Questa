import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, questions } = await request.json()

    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        creatorId: session.user.id,
        questions: {
          create: questions.map((q: any) => ({
            text: q.text,
            type: q.type,
            options: q.options || [],
            order: q.order,
          })),
        },
      },
      include: {
        questions: true,
      },
    })

    return NextResponse.json(quiz)
  } catch (error) {
    console.error("Error creating quiz:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
