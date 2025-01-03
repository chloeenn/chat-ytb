import { useClerk, useSignUp } from "@clerk/clerk-react";
import { Button } from "../components/ui/button";
import { Send, Ellipsis } from "lucide-react";
import Link from "next/link";
import UrlUpload from "@/components/UrlUpload";
export default function Home() {

  return (
    <div className="w-screen min-h-screen">
      <nav className="float-right m-2">
        <Link href={'/sign-in'}>
          <Button className="rounded-full m-1">Sign in</Button>
        </Link>
        <Link href={'/sign-up'}>
          <Button className="rounded-full">Sign up</Button>
        </Link>
      </nav>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <Ellipsis size={48} strokeWidth={3} />
          <div className="flex item-center mb-1">
            <h1 className="font-bold text-5xl">Chat with Youtube</h1>
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <UrlUpload/>
        </div>


      </div>
    </div>
  );
}
