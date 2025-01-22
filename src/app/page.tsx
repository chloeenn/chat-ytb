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
    <div className="w-screen min-h-screen ">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>
      <NavBar latestChatId={latestChatId} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <main className="grow flex flex-col items-center justify-center text-center ">
          <Ellipsis size={58} strokeWidth={3} />
          <div className="flex items-center mb-1">
            <h1 className="font-bold text-6xl ">Chat with YouTube</h1>
          </div>
          <p className="max-w-lg mt-1 text-lg text-slate-600">
            Ready to assist you with anything you need, from answering questions to summarizing long videos. 
          </p>
          {isAuth ? (
            <div className="w-full mt-2 ">
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
    </div>
  );
}

{/* <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div> */}