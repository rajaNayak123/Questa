import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { QuizView } from "@/components/quiz-view"

interface Props {
  params: { id: string }
  searchParams: { created?: string }
}

export default async function QuizPage({ params, searchParams }: Props) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
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

  return <QuizView quiz={quiz} showCreatedMessage={searchParams.created === "true"} />
}
