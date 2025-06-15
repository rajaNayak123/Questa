import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Share2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Create and Share Quizzes with Ease</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Build engaging quizzes, share them with the world, and collect responses from your audience.
        </p>
        <div className="space-x-4">
          <Link href="/auth/signup">
            <Button size="lg">Get Started Free</Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CheckCircle className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Easy Quiz Creation</CardTitle>
            <CardDescription>
              Create quizzes with multiple question types including single-choice and text answers.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Share2 className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Public Sharing</CardTitle>
            <CardDescription>
              Share your quizzes with a simple link. No registration required for participants.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Response Analytics</CardTitle>
            <CardDescription>
              View and analyze all responses to your quizzes in one convenient dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to create your first quiz?</h2>
        <p className="text-gray-600 mb-6">Join thousands of users who trust Questa for their quiz needs.</p>
        <Link href="/auth/signup">
          <Button size="lg">Start Creating Now</Button>
        </Link>
      </div>
    </div>
  )
}
