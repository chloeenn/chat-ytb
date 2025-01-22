
# ChatYTB


https://github.com/user-attachments/assets/d953edb1-322e-40c9-8937-ced2389aeb85

ChatYTB is a full-stack web application that allows users to input YouTube URLs and ask questions about the video content. It supports authenticated users and provides a personalized chat history. The application leverages technologies such as PostgreSQL, Express, React, Node.js, TypeScript, Amazon S3, Pinecone, and Clerk for authentication.

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

## Usage

1. Sign in.
2. Input a YouTube URL to retrieve its transcript.
3. Ask questions about the video content.
4. For registered users, view your chat history.

## Acknowledgements

- [Clerk](https://clerk.dev) for authentication.
- [Pinecone](https://www.pinecone.io) for vector database services.
- [YouTube Data API](https://developers.google.com/youtube/v3) for transcript retrieval.
- [Amazon S3](https://aws.amazon.com/s3/) for storage solutions.




