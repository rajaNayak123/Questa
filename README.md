# Questa - Quiz Creation Platform

A modern, full-stack quiz creation and sharing platform built with Next.js, TypeScript, and MongoDB. Create beautiful quizzes, share them with the world, and collect responses effortlessly.

[Questa Live URL](https://questa-tan.vercel.app/)

## ✨ Features

### 🔐 Authentication
- **Secure user authentication** with NextAuth.js
- Email and password-based signup/login
- Protected routes for quiz creators
- Persistent sessions across browser refreshes

### 📝 Quiz Creation
- **Intuitive quiz builder** with drag-and-drop interface
- Multiple question types:
  - Single-choice (multiple choice with radio buttons)
  - Text answers (short and long form)
- Rich quiz customization options
- Instant quiz link generation for sharing

### 🌐 Public Quiz Participation
- **No registration required** for quiz takers
- Clean, responsive quiz interface
- Real-time form validation
- Instant submission confirmation

### 📊 Response Management
- **Comprehensive analytics** for quiz creators
- View all responses with timestamps
- Export capabilities for further analysis
- Real-time response tracking

### 🎨 Modern UI/UX
- **Beautiful, responsive design** with Tailwind CSS
- Premium shadcn/ui components
- Smooth animations and micro-interactions
- Mobile-first responsive layout
- Apple-level design aesthetics

## 🚀 Tech Stack

- **Framework:** Next.js 13.5 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** MongoDB with Prisma ORM
- **Authentication:** NextAuth.js
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Date Handling:** date-fns

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/questa.git
   cd questa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   MONGODB_URI="mongodb://localhost:27017/questa"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-key"
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses MongoDB with Prisma ORM. Key models include:

- **User** - Authentication and user management
- **Quiz** - Quiz metadata and settings
- **Question** - Individual quiz questions with types and options
- **Response** - User submissions and answers

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Prisma Studio

## 📱 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js handlers

### Quizzes
- `GET /api/quizzes` - Get user's quizzes (authenticated)
- `POST /api/quizzes` - Create new quiz (authenticated)
- `GET /api/quizzes/[id]` - Get public quiz details

### Responses
- `POST /api/quizzes/[id]/responses` - Submit quiz response
- `GET /api/quizzes/[id]/responses` - Get quiz responses (authenticated creator only)


## 🔐 Sample Login Credentials

For testing purposes, you can create an account using any email and password combination. The current implementation uses a simplified authentication system.

**Sample Test Account:**
- **Email**: `test@example.com`
- **Password**: `password123`
- **Name**: `Test User`

## 🎯 Usage

### Creating a Quiz
1. Sign up or log in to your account
2. Click "Create New Quiz" from the dashboard
3. Add your quiz title and description
4. Add questions with various types
5. Publish and share your quiz link

### Taking a Quiz
1. Visit a shared quiz link
2. Answer all questions
3. Submit your response
4. View confirmation message

### Managing Responses
1. Go to your dashboard
2. Click "View Responses" on any quiz
3. See all submissions with timestamps
4. Export data for analysis

## 🔒 Security Features

- **Input validation** with Zod schemas
- **SQL injection protection** via Prisma ORM
- **Authentication middleware** for protected routes
- **CSRF protection** with NextAuth.js
- **Environment variable security**

## 🌟 Key Highlights

- **Clean code structure** following Next.js best practices
- **Scalable architecture** with proper separation of concerns
- **Responsive design** that works on all devices
- **Real-time features** for immediate feedback

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Prisma](https://prisma.io/) for type-safe database access
- [NextAuth.js](https://next-auth.js.org/) for authentication

---

**Built by Raja Nayak**
