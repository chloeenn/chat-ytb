
# ChatYTB

Chat-YTB is an AI-powered chatbot that allows you to ask questions about YouTube videos :)

https://github.com/user-attachments/assets/d953edb1-322e-40c9-8937-ced2389aeb85

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chloeenn/chat-ytb.git
   cd chat-ytb
   ```

2. Install dependencies:
   ```bash
   npm install
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

## How It Works

Video Processing:
The app uses the YouTube API to fetch video metadata and transcripts. The transcript is processed and converted into vector embeddings using OpenAI's embeddings API. The embeddings are stored in Pinecone, a vector database, for efficient similarity search. 


Query Handling:
When a user asks a question, the query is also converted into an embedding.
Pinecone retrieves the most relevant parts of the video transcript based on the query.
OpenAI's language model generates a natural language response using the retrieved context.

