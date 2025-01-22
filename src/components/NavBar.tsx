"use client";

import { useAuth } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
type Props = {
    latestChatId: number | null; 
};

const NavBar = ({ latestChatId }: Props) => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="flex top-0 left-0 w-full border px-6 py-4 flex justify-between items-center">
            <div className="flex text-2xl m-2 font-bold text-black hover:text-gray-600">
                <a href="/">
                    ChatYTB
                </a>
            </div>
            <ul>
                <li className="flex space-x-4">
                    {isSignedIn ? (
                        <>
                            <a href={`/chat/${latestChatId}` as string}>
                                <button className="rounded-full px-4 py-2 bg-black border border-black text-white hover:bg-gray-700 transition duration-200">
                                    History
                                </button>
                            </a>
                            <SignOutButton>
                                <button className="rounded-full px-4 py-2 bg-white border border-black text-black hover:bg-slate-50 transition duration-200">
                                    Sign Out
                                </button>
                            </SignOutButton>
                        </>
                    ) : (
                        <>
                            <a href="/sign-in">
                                <button className="rounded-full px-4 py-2 text-black border border-gray-800 hover:bg-gray-100 transition duration-200">
                                    Sign In
                                </button>
                            </a>
                            <a href="/sign-up">
                                <button className="rounded-full px-4 py-2 bg-black text-white hover:bg-gray-700 transition duration-200">
                                    Sign Up
                                </button>
                            </a>
                        </>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
