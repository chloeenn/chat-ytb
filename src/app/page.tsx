import { auth } from "@clerk/nextjs/server";
import { Ellipsis, LogIn } from "lucide-react";
import UrlUpload from "@/components/UrlUpload";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  let latestChatId: number | null = null;

  if (userId) {
    const latestChat = await db.select().from(chats).where(eq(chats.userId, userId)).orderBy(chats.createdAt).limit(1);
    latestChatId = latestChat.length > 0 ? latestChat[0].id : null;
  }

  return (
    <>
      <NavBar latestChatId={latestChatId} />
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
