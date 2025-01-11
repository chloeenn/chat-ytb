import { auth } from "@clerk/nextjs/server";
import { Ellipsis } from "lucide-react";
import UrlUpload from "@/components/UrlUpload";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="w-screen min-h-screen">
      {/* Navigation Bar */}
      <nav className="w-full from-gray-800 to-gray-900 px-6 py-4 flex justify-between items-center shadow-lg">
        <a href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
          ChatYTB
        </a>
        <div className="flex space-x-4">
          {!userId ? (
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
          ) : (
            <a href="/dashboard">
              <button className="rounded-full px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition duration-200">
                Dashboard
              </button>
            </a>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <Ellipsis size={48} strokeWidth={3} />
          <div className="flex items-center mb-1">
            <h1 className="font-bold text-5xl">Chat with YouTube</h1>
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
