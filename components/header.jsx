''
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./ui/button"
import { checkUser } from "@/lib/checkuser"
import { PenBox, LayoutDashboard } from "lucide-react";
// import { ModeToggle } from "./ui/ModeToggle"
const Header =  async () => {
try {
    await checkUser(); // Try creating/checking user in DB
  } catch (err) {
    console.error("Header: checkUser failed", err);
    // Don't crash the render — just skip DB stuff
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between ">
          {/* Left Section - Logo & Desktop Navigation */}
          <div className="flex items-center gap-2  sm:gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-1 sm:space-x-2 mr-2 sm:mr-0"
            >
              <span className="text-lg sm:text-2xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-green-800 to-green-500 dark:from-green-300 dark:to-green-200 bg-clip-text text-transparent">
                  Finzo
                </span>
              </span>
            </Link>
             <div className="hidden md:flex items-center px-6 ml-14 space-x-8">
          <SignedOut>
            <a href="#features" className="text-slate-50 hover:text-green-500">
              Home
            </a>
             <a href="#features" className="text-slate-50 hover:text-green-500">
              Features
            </a>
            <a
              href="#testimonials"
              className="text-slate-50 hover:text-green-500"
            >
              Blogs
            </a>
          </SignedOut>
        </div>
          </div>

         
          

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <Link
              href="/transaction/create">
              <Button className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
        </div>
      </div>
    </nav>
  )
}

export default Header