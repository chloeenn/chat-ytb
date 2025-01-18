import { auth } from "@clerk/nextjs/server";
import { Ellipsis, LogIn, LogOut } from "lucide-react";
import UrlUpload from "@/components/UrlUpload";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const { userId } = await auth();
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
      <main className="grow flex flex-col items-center justify-center text-center px-4">
        <Ellipsis size={48} strokeWidth={3} />
        <div className="flex items-center mb-1">
          <h1 className="font-bold text-5xl">Chat with YouTube</h1>
        </div>
        <p className="max-w-xl mt-1 text-lg text-slate-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        {isAuth ? (
          <div className="w-1/2">
            <UrlUpload />
          </div>

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
  );
}
