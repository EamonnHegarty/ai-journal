# AI Journal

## Overview

AI Journal is a **full-stack AI-powered journal application** designed to help users capture, analyze, and reflect on their daily thoughts. Built with modern web technologies, it uses OpenAI's GPT models to provide **intelligent insights, mood analysis, and sentiment tracking** for journal entries, creating a powerful tool for personal reflection and growth.

## Live Demo

Visit the live app here: [AI Journal](https://ai-journal-ochre.vercel.app/)

## Key Features

- **AI-Powered Analysis**: Each journal entry is analyzed by GPT-3.5 to generate:

  - Mood detection
  - Sentiment scoring (-10 to 10 scale)
  - Entry summarization
  - Subject identification
  - Mood-based color coding
  - Negative content detection

- **Smart Search & Insights**: Ask questions about your journal history using natural language, with AI providing answers based on your past entries.

- **Visual Analytics**: Track your mood and sentiment trends over time through an interactive chart visualization.

- **Real-time Autosaving**: Never lose your thoughts with automatic saving as you write.

- **Responsive Design**: Fully optimized for all devices with a clean, intuitive interface.

- **Secure Authentication**: Uses Clerk for robust user management and authentication.

## Tech Stack

- **Frontend**:

  - [Next.js 15](https://nextjs.org/) (React framework with App Router)
  - [React 19](https://react.dev/) (Latest version)
  - [Tailwind CSS 4](https://tailwindcss.com/) (Utility-first CSS)
  - [Recharts](https://recharts.org/) (Data visualization)
  - [Lucide React](https://lucide.dev/) (Icon system)

- **Backend**:

  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) (Serverless functions)
  - [Prisma 6](https://www.prisma.io/) (ORM)
  - [Neon](https://neon.tech/) (Serverless PostgreSQL)
  - [LangChain](https://js.langchain.com/) (AI framework)
  - [OpenAI API](https://openai.com/api/) (GPT-3.5 Turbo)

- **Authentication**:
  - [Clerk](https://clerk.dev/) (Authentication and user management)

## How It Works

1. **User Authentication**: Sign up/login via Clerk's secure authentication system
2. **Journal Writing**: Create entries with real-time autosaving
3. **AI Analysis**: Entries are automatically analyzed by OpenAI's GPT-3.5
4. **Insight Generation**: AI provides mood analysis, summaries, and sentiment scores
5. **Reflection Tools**: Ask questions about your journal entries using natural language
6. **Trend Tracking**: View historical mood and sentiment data through visualizations

## Setup Instructions

### Prerequisites

- Node.js (v18.x or later)
- A PostgreSQL database (Neon recommended for serverless deployment)
- OpenAI API key
- Clerk account for authentication

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/ai-journal.git
   cd ai-journal
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory with:

   ```env
   # Database
   DATABASE_URL=your_neon_db_connection_string

   # Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # API Keys
   OPENAI_API_KEY=your_openai_api_key

   # Next Auth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_random_string_for_nextauth
   ```

4. **Initialize the database schema:**

   ```sh
   npx prisma db push
   ```

5. **Start the development server:**

   ```sh
   npm run dev
   ```

   The app will be running at `http://localhost:3000`

## Deployment

The application is deployed on Vercel. To deploy your own instance:

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy!

## Future Enhancements

- Pagination for journal entries (in progress)
- Entry deletion functionality
- Rich text editor with formatting options
- Custom tagging system for entries
- Export journal as PDF or markdown
- Enhanced analytics with more visualization options
- Mobile app versions (React Native)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the **MIT License**.

## Acknowledgements

- [OpenAI](https://openai.com/) for their powerful GPT models
- [Vercel](https://vercel.com/) for hosting
- [Neon](https://neon.tech/) for serverless PostgreSQL
- [Clerk](https://clerk.dev/) for authentication
- [LangChain](https://js.langchain.com/) for AI integrations
