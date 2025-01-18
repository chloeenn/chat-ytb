import { auth } from "@clerk/nextjs/server";
import { Ellipsis, LogIn, LogOut } from "lucide-react";
import UrlUpload from "@/components/UrlUpload";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
export default async function Home() {
  const { userId } = await auth();
  // console.log(`PAGE.tsx -- userID: ${userId}`)
  const isAuth = !!userId;
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full  px-6 py-4 flex justify-between items-center shadow-lg">
        <a href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
          ChatYTB
        </a>
        <div className="flex space-x-4">
          {isAuth ? (
            <>
              <a href="/dashboard">
                <button className="rounded-full px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition duration-200">
                  Dashboard
                </button>
              </a>
              <a href='/sign-out'>
                <button className="rounded-full px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition duration-200">
                  <LogOut></LogOut>
                </button>

              </a>
            </>
          ) : (
            <>
              <a href="/sign-in">
                <button className="rounded-full px-4 py-2 text-gray-800 border border-gray-800 hover:bg-gray-100 transition duration-200">
                  Sign in
                </button>
              </a>
              <a href="/sign-up">
                <button className="rounded-full px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition duration-200">
                  Sign up
                </button>
              </a>
            </>
          )}
        </div>
      </nav>

      <main className="grow flex flex-col items-center justify-center text-center px-4">
        <Ellipsis size={48} strokeWidth={3} />
        <div className="flex items-center mb-1">
          <h1 className="font-bold text-5xl">Chat with YouTube</h1>
        </div>
        <p className="max-w-xl mt-1 text-lg text-slate-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        {isAuth ? (
          <UrlUpload />
        ) : (
          <a href="/sign-in">
            <Button className="m-2 text-xl">
              Login to get Started!
              <LogIn className="w-5 h-5 ml-2" />
            </Button>
          </a>

        )}

      </main>
      <footer className="w-full  py-4 text-center text-sm shadow-lg">
        &copy; {2025} ChatYTB. All rights reserved.
      </footer>
    </div>
    // </div>
  );
}
