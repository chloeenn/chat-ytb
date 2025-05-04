
# ChatYTB


https://github.com/user-attachments/assets/d953edb1-322e-40c9-8937-ced2389aeb85

**ChatYTB** is a full-stack AI-powered web application that lets users paste YouTube URLs and ask questions about video content. It supports user authentication, YouTube transcript processing, and personalized chat history.

### Tech Stack

- **Frontend**: React (Next.js), TypeScript, Clerk
- **Backend**: Node.js, Express, FastAPI (Python)
- **AI/Vector Search**: OpenAI API, Pinecone
- **Database**: PostgreSQL with Drizzle ORM + Drizzle Kit Studio
- **Storage**: Amazon S3 (for storing transcripts)
- **Infrastructure**: Docker & Docker Compose

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chloeenn/chat-ytb.git
   cd chat-ytb
   ```

2. Run the App:

   ### Option 1: Run Frontend & Backend Separately 

   ```bash
   npm install
   npm run dev
   # App runs on http://localhost:3000
   ```

   ```bash
   cd src/transcript-backend
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000
   # Transcript API runs on http://localhost:8000
   ```

   ### Option 2: Run with Docker 

   ```bash
   docker-compose up --build
   ```


3. Set up environment variables:
   Create a `.env` file in the root directory and include the following variables:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-public-key
   CLERK_SECRET_KEY=your-clerk-public-key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   DATABASE_URL=your-neon-database-url
   NEXT_PUBLIC_S3_AWS_REGION=your-aws-region
   NEXT_PUBLIC_S3_ACCESS_KEY_ID=your-s3-access-key
   NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=your-s3-secret-key
   NEXT_PUBLIC_S3_BUCKET_NAME=your-s3-bucket-name
   PINECONE_ENVIRONMENT=your-pinecone-environment
   PINECONE_API_KEY=your-pinecone-api-key
   OPENAI_API_KEY=your-openai-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Access the app at `http://localhost:3000`.
