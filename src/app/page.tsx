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
    <>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <main className="grow flex flex-col items-center justify-center text-center ">
        <Ellipsis size={58} strokeWidth={3} />
        <div className="flex items-center mb-1">
          <h1 className="text-transparent bg-clip-text font-extrabold bg-gradient-to-r from-black via-pink-700 via-purple-500 to-indigo-700 font-bold text-6xl">Chat with YouTube</h1>
        </div>
        <p className="max-w-xl mt-1 text-xl text-slate-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        {isAuth ? (
          <div className="w-full mt-2">
            <UrlUpload />
          </div>

        ) : (
          <a href="/sign-in">
            <Button className="m-3 text-xl">
              Login to get Started!
              <LogIn className="w-6 h-6 ml-3" />
            </Button>
          </a>
        )}
      </main>
    </div>
    </>
  );
}
