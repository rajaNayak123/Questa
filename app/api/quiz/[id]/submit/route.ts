import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Correct context typings:
// context should be { params: { id: string } }
export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { answers } = await request.json();

    const quizId = context.params.id;
    const quiz = await prisma.quiz.findUnique({ 
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    await prisma.response.create({ 
      data: { 
        quizId: quizId,
        answers: {
          create: Object.entries(answers).map(([questionId, value]) => ({
            questionId,
            value: value as string,
          }))
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
