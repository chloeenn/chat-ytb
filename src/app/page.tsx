import { useClerk, useSignUp } from "@clerk/clerk-react";
import { Button } from "../components/ui/button";
import { Send, Ellipsis } from "lucide-react";
import Link from "next/link";
import UrlUpload from "@/components/UrlUpload";
export default function Home() {

  return (
    <div className="w-screen min-h-screen">
      <nav className="w-fullbg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 flex justify-between items-center shadow-lg">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
          ChatYTB
        </Link>
        <div className="flex space-x-4">
          <Link href="/sign-in">
            <button className="rounded-full px-4 py-2 text-gray-800 border border-gray-800 hover:bg-gray-100 transition duration-200">
              Sign in
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="rounded-full px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition duration-200">
              Sign up
            </button>
          </Link>
        </div>
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
          <UrlUpload />
        </div>
      </div>
    </div>
  );
}
