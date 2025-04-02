# AI Journal

## Overview

AI Journal is a **full-stack AI-powered journal application** designed to help users capture, analyze, and reflect on their daily thoughts. With seamless AI integration, it provides **insights, mood tracking, and intelligent summaries** of journal entries, making it an advanced tool for self-reflection and personal growth.

## Live Demo

Visit the live app here: [AI Journal](https://ai-journal-ochre.vercel.app/)

## Tech Stack

AI Journal is built using modern web technologies:

- **Frontend**: Next.js, Tailwind CSS, ShadCN
- **Backend**: Node.js, Next.js API routes
- **Database**: Neon (PostgreSQL)
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI API
- **Deployment**: Vercel

## Features

- **AI-Powered Journaling**: Write entries and get AI-generated summaries, mood analysis, and reflections.
- **Personalized Insights**: Tracks patterns in journal entries over time.
- **Secure Authentication**: Uses NextAuth.js for secure login.
- **Responsive UI**: Styled with Tailwind CSS and ShadCN for a modern, sleek experience.
- **Cloud Database**: Stores user entries securely in PostgreSQL (Neon DB).
- **Seamless Deployment**: Hosted on Vercel for fast and reliable performance.


## Upcoming Features
- I'm pivoting to a new project but I will come back and add pagination as it is required here.

## Setup Instructions

### Prerequisites

- Node.js (latest LTS version recommended)
- A PostgreSQL database (using Neon or a local instance)
- An OpenAI API key for AI-powered features

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/ai-journal.git
   cd ai-journal
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add:

   ```env
   DATABASE_URL=your_neon_db_connection_string
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run database migrations:** (if using Prisma)

   ```sh
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app should now be running at `http://localhost:3000`

## Deployment

The app is deployed on Vercel. To deploy manually:

1. Push your code to GitHub.
2. Connect the repository to Vercel.
3. Set up environment variables in Vercel.
4. Deploy!

## Contributing

If you’d like to contribute:

1. Fork the repository.
2. Create a new branch (`feature/new-feature`).
3. Commit your changes.
4. Push the branch and open a PR.

## License

This project is licensed under the **MIT License**.

## Contact

For any inquiries or feedback, feel free to reach out or open an issue in the repository.
