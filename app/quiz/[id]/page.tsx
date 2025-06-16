import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { QuizView } from "@/components/quiz-view"

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ created?: string }>
}) {
  const { id } = await params
  const { created } = await searchParams

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: {
        orderBy: { order: "asc" },
      },
      creator: {
        select: { name: true },
      },
    },
  })

  if (!quiz) {
    notFound()
  }

  return <QuizView quiz={quiz} showCreatedMessage={created === "true"} />
}
