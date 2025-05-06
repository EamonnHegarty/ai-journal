export const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          AI Journal is a full-stack application that combines journaling with
          AI-powered analysis. Built with Next.js 15, React 19, and OpenAI's GPT
          models, it allows users to:
        </p>
        <ul className="list-disc pl-5">
          <li>Write journal entries with real-time autosaving</li>
          <li>Receive AI-generated analysis of mood, sentiment, and topics</li>
          <li>Ask questions about past journal entries</li>
          <li>Visualize mood and sentiment trends over time</li>
        </ul>
        <p className="mt-4">
          This documentation explains how the app works internally, covering
          both frontend and backend implementation details.
        </p>
      </>
    ),
  },
  {
    id: "architecture",
    title: "Architecture Overview",
    content: (
      <>
        <h3 className="mt-6 text-xl font-semibold text-gray-900">Tech Stack</h3>
        <p>AI Journal uses a modern technology stack:</p>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-900">Frontend</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Next.js 15 (React framework with App Router)</li>
              <li>React 19</li>
              <li>Tailwind CSS 4</li>
              <li>Recharts (for data visualization)</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-900">Backend</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Next.js API Routes (serverless functions)</li>
              <li>Prisma 6 (ORM)</li>
              <li>Neon (serverless PostgreSQL)</li>
              <li>LangChain (AI framework)</li>
              <li>OpenAI API (GPT-3.5 Turbo)</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-900">Authentication</h4>
            <ul className="list-disc pl-5 text-sm">
              <li>Clerk (user management)</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-semibold text-gray-900">
          Directory Structure
        </h3>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm">
          {`/
  ├── app/                    # Next.js App Router structure
  │   ├── (dashboard)/        # Dashboard routes (authenticated)
  │   ├── api/                # API routes
  │   ├── sign-in/            # Authentication routes
  │   └── sign-up/            # Authentication routes
  ├── components/             # React components
  ├── prisma/                 # Database schema
  ├── public/                 # Static assets
  └── utils/                  # Shared utilities
      ├── ai.ts               # AI-related functionality
      ├── api.ts              # Frontend API clients
      ├── auth.ts             # Authentication utilities
      └── db.ts               # Database connection`}
        </pre>

        <h3 className="mt-8 text-xl font-semibold text-gray-900">Data Flow</h3>
        <ol className="mt-4 list-decimal pl-5">
          <li>User authenticates with Clerk</li>
          <li>
            Frontend React components make API calls to Next.js API routes
          </li>
          <li>API routes interact with the database via Prisma</li>
          <li>AI analysis is performed using OpenAI via LangChain</li>
          <li>Results are returned to the frontend for display</li>
        </ol>
      </>
    ),
  },
  {
    id: "authentication",
    title: "Authentication Flow",
    content: (
      <>
        <p>AI Journal uses Clerk for authentication and user management:</p>
        <ol className="mt-4 list-decimal pl-5">
          <li>
            New users navigate to <code>/sign-up</code> to create an account
          </li>
          <li>
            Returning users authenticate at <code>/sign-in</code>
          </li>
          <li>
            Upon successful authentication, Clerk redirects to{" "}
            <code>/new-user</code> for first-time users
          </li>
          <li>
            The <code>/new-user</code> route:
            <ul className="list-disc pl-5">
              <li>Creates a new user record in the database if none exists</li>
              <li>Links the Clerk ID with the database user</li>
              <li>
                Redirects to <code>/journal</code>
              </li>
            </ul>
          </li>
        </ol>
        <p className="mt-4">
          The authentication state is managed by Clerk's SDK and enforced by the
          custom middleware:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm">
          {`// middleware.ts
  import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
  
  const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
  
  export default clerkMiddleware(async (auth, request) => {
    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  });`}
        </pre>
        <p className="mt-4">
          This middleware protects all routes except the explicitly public ones.
        </p>
      </>
    ),
  },
  {
    id: "journal-system",
    title: "Journal Entry System",
    content: (
      <>
        <h3 className="mt-6 text-xl font-semibold text-gray-900">
          Creating Entries
        </h3>
        <ol className="mt-4 list-decimal pl-5">
          <li>User clicks "New Entry" on the journal page</li>
          <li>
            Frontend calls the <code>/api/journal</code> endpoint (POST)
          </li>
          <li>Server creates a new entry with default content</li>
          <li>AI analysis is performed on the default content</li>
          <li>Analysis results are stored in the database</li>
          <li>Entry ID is returned to the frontend</li>
          <li>User is redirected to the entry editor</li>
        </ol>

        <h3 className="mt-8 text-xl font-semibold text-gray-900">
          Editing Entries
        </h3>
        <ol className="mt-4 list-decimal pl-5">
          <li>User types in the editor</li>
          <li>
            <code>useAutosave</code> hook triggers after typing pauses
          </li>
          <li>
            Editor calls <code>/api/journal/:id</code> endpoint (PATCH)
          </li>
          <li>Server updates the entry content</li>
          <li>New AI analysis is performed</li>
          <li>Analysis results are updated or created</li>
          <li>Updated entry and analysis are returned to the frontend</li>
        </ol>

        <h3 className="mt-8 text-xl font-semibold text-gray-900">
          Listing Entries
        </h3>
        <ol className="mt-4 list-decimal pl-5">
          <li>
            Journal page loads and calls <code>/api/journal</code> endpoint
            (GET)
          </li>
          <li>Server retrieves entries for the current user</li>
          <li>Entries are ordered by creation date (newest first)</li>
          <li>Pagination is applied based on query parameters</li>
          <li>Entries with their analysis are returned to the frontend</li>
          <li>Frontend displays the entries as cards</li>
        </ol>
      </>
    ),
  },
  {
    id: "ai-analysis",
    title: "AI Analysis",
    content: (
      <>
        <p>
          AI analysis is performed using OpenAI's GPT-3.5 Turbo model via
          LangChain:
        </p>

        <h3 className="mt-6 text-xl font-semibold text-gray-900">
          Analysis Process
        </h3>
        <ol className="mt-4 list-decimal pl-5">
          <li>
            Entry content is sent to the <code>analyze</code> function
          </li>
          <li>A prompt template is created with format instructions</li>
          <li>The OpenAI model processes the content</li>
          <li>
            Result is parsed into a structured format:
            <ul className="list-disc pl-5">
              <li>Sentiment score (-10 to 10)</li>
              <li>Mood</li>
              <li>Summary</li>
              <li>Subject</li>
              <li>Color (hexadecimal)</li>
              <li>Negative flag (boolean)</li>
            </ul>
          </li>
          <li>Parsed result is stored in the database</li>
        </ol>

        <h3 className="mt-8 text-xl font-semibold text-gray-900">
          Question Answering
        </h3>
        <ol className="mt-4 list-decimal pl-5">
          <li>User submits a question about their journal entries</li>
          <li>
            Question is sent to the <code>/api/question</code> endpoint
          </li>
          <li>Server retrieves all user entries</li>
          <li>Entries are converted to LangChain documents</li>
          <li>Relevant entries are found using vector similarity search</li>
          <li>GPT-3.5 processes the question and relevant entries</li>
          <li>Answer is returned to the frontend</li>
        </ol>
      </>
    ),
  },
  {
    id: "api-reference",
    title: "API Reference",
    content: (
      <>
        <h3 className="mt-6 text-xl font-semibold text-gray-900">
          Journal API
        </h3>

        <div className="mt-4 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-900">Create Entry</h4>
            <div className="space-y-2">
              <p>
                <strong>Endpoint:</strong> <code>/api/journal</code> (POST)
              </p>
              <p>
                <strong>Authentication:</strong> Required
              </p>
              <p>
                <strong>Response:</strong> New journal entry object
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-900">Update Entry</h4>
            <div className="space-y-2">
              <p>
                <strong>Endpoint:</strong> <code>/api/journal/:id</code> (PATCH)
              </p>
              <p>
                <strong>Authentication:</strong> Required
              </p>
              <p>
                <strong>Request Body:</strong>{" "}
                <code>{"{ content: string }"}</code>
              </p>
              <p>
                <strong>Response:</strong> Updated entry with analysis
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-900">List Entries</h4>
            <div className="space-y-2">
              <p>
                <strong>Endpoint:</strong> <code>/api/journal</code> (GET)
              </p>
              <p>
                <strong>Authentication:</strong> Required
              </p>
              <p>
                <strong>Query Parameters:</strong>
              </p>
              <ul className="list-disc pl-5">
                <li>
                  <code>page</code>: Page number (default: 1)
                </li>
                <li>
                  <code>pageSize</code>: Items per page (default: 6)
                </li>
              </ul>
              <p>
                <strong>Response:</strong>
              </p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm">
                {`{
    "data": [/* entry objects */],
    "pagination": {
      "page": number,
      "pageSize": number,
      "total": number,
      "totalPages": number
    }
  }`}
              </pre>
            </div>
          </div>
        </div>

        <h3 className="mt-8 text-xl font-semibold text-gray-900">
          Question API
        </h3>

        <div className="mt-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-900">Ask Question</h4>
            <div className="space-y-2">
              <p>
                <strong>Endpoint:</strong> <code>/api/question</code> (POST)
              </p>
              <p>
                <strong>Authentication:</strong> Required
              </p>
              <p>
                <strong>Request Body:</strong>{" "}
                <code>{"{ question: string }"}</code>
              </p>
              <p>
                <strong>Response:</strong> <code>{"{ answer: string }"}</code>
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "database-schema",
    title: "Database Schema",
    content: (
      <>
        <p>AI Journal uses a PostgreSQL database with three main tables:</p>

        <div className="mt-6 space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-900">User</h4>
            <ul className="list-disc pl-5">
              <li>
                <code>id</code>: UUID (primary key)
              </li>
              <li>
                <code>createdAt</code>: DateTime
              </li>
              <li>
                <code>updatedAt</code>: DateTime
              </li>
              <li>
                <code>clerkId</code>: String (unique)
              </li>
              <li>
                <code>email</code>: String (unique)
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-900">JournalEntry</h4>
            <ul className="list-disc pl-5">
              <li>
                <code>id</code>: UUID (primary key)
              </li>
              <li>
                <code>createdAt</code>: DateTime
              </li>
              <li>
                <code>updatedAt</code>: DateTime
              </li>
              <li>
                <code>userId</code>: Foreign key to User
              </li>
              <li>
                <code>content</code>: Text
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h4 className="mb-2 font-semibold text-gray-900">Analysis</h4>
            <ul className="list-disc pl-5">
              <li>
                <code>id</code>: UUID (primary key)
              </li>
              <li>
                <code>createdAt</code>: DateTime
              </li>
              <li>
                <code>updatedAt</code>: DateTime
              </li>
              <li>
                <code>entryId</code>: Foreign key to JournalEntry (unique)
              </li>
              <li>
                <code>userId</code>: Foreign key to User
              </li>
              <li>
                <code>mood</code>: Text
              </li>
              <li>
                <code>summary</code>: Text
              </li>
              <li>
                <code>color</code>: String
              </li>
              <li>
                <code>negative</code>: Boolean
              </li>
              <li>
                <code>subject</code>: String
              </li>
              <li>
                <code>sentimentScore</code>: Float
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "components",
    title: "Components",
    content: (
      <>
        <h3 className="mt-6 text-xl font-semibold text-gray-900">
          Key Component Structure
        </h3>
        <ul className="mt-4 list-disc pl-5">
          <li>
            <code>Editor.tsx</code>: Handles journal entry editing and displays
            analysis
          </li>
          <li>
            <code>EntryCard.tsx</code>: Displays journal entry summary in card
            format
          </li>
          <li>
            <code>HistoryChart.tsx</code>: Visualizes mood and sentiment trends
          </li>
          <li>
            <code>JournalPageComponent.tsx</code>: Client-side journal listing
            with pagination
          </li>
          <li>
            <code>NewEntryCard.tsx</code>: Card for creating new entries
          </li>
          <li>
            <code>PaginationComponent.tsx</code>: Handles pagination UI and
            logic
          </li>
          <li>
            <code>Question.tsx</code>: Interface for asking questions about
            journal entries
          </li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold text-gray-900">
          Editor Component
        </h3>
        <p className="mt-4">
          The Editor component is the core of the journal experience:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm">
          {`// Simplified editor structure
  const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content);
    const [analysis, setAnalysis] = useState(entry.analysis);
  
    useAutosave({
      data: value,
      onSave: async (_value) => {
        const data = await updateEntry(entry.id, _value);
        setAnalysis(data.analysis);
      },
    });
  
    return (
      <div className="flex h-full w-full flex-col lg:flex-row">
        {/* Text editor area */}
        <div className="h-1/2 w-full lg:h-full lg:w-2/3">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        
        {/* Analysis panel */}
        <div className="h-1/2 w-full lg:h-full lg:w-1/3">
          <div style={{ backgroundColor: analysis.color }}>
            <h2>Analysis</h2>
          </div>
          <ul>
            {/* Analysis data display */}
          </ul>
        </div>
      </div>
    );
  };`}
        </pre>
      </>
    ),
  },
  {
    id: "deployment",
    title: "Deployment",
    content: (
      <>
        <p>AI Journal is designed for deployment on Vercel:</p>

        <h3 className="mt-6 text-xl font-semibold text-gray-900">
          Environment Variables
        </h3>
        <p className="mt-4">Required environment variables:</p>
        <ul className="list-disc pl-5">
          <li>
            <code>DATABASE_URL</code>: Neon PostgreSQL connection string
          </li>
          <li>
            <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>: Clerk public key
          </li>
          <li>
            <code>CLERK_SECRET_KEY</code>: Clerk secret key
          </li>
          <li>
            <code>OPENAI_API_KEY</code>: OpenAI API key
          </li>
        </ul>

        <h3 className="mt-8 text-xl font-semibold text-gray-900">
          Deployment Steps
        </h3>
        <ol className="mt-4 list-decimal pl-5">
          <li>Push code to a GitHub repository</li>
          <li>Import the repository in Vercel</li>
          <li>Configure the environment variables</li>
          <li>Deploy the application</li>
        </ol>
      </>
    ),
  },
];
