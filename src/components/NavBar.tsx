import { auth } from "@clerk/nextjs/server";
import { LogOut } from "lucide-react"
type Props = {
    isAuth?: boolean;
}
const NavBar = async ({ isAuth }: Props) => {
    const userId = auth();
    isAuth = !!userId;
    return (
        <nav className="flex top-0 left-0 w-full  px-6 py-4 flex justify-between items-center shadow-lg">
            <div className="flex text-2xl font-bold text-gray-800 hover:text-gray-600 ">
                <a href="/"  >
                    ChatYTB
                </a>
            </div>
            <ul>
                <li className="flex space-x-4">
                    {isAuth ? (
                        <>
                            <a href="/dashboard">
                                <button className="rounded-full px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition duration-200">
                                    Dashboard
                                </button>
                            </a>
                            <a href="/">
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
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;