
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Custom404() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mb-4 select-none">
        404
      </h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 uppercase tracking-widest">
        Page Not Found
      </h2>
      <p className="text-gray-400 max-w-md mb-8">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/">
        <Button className="inline-block bg-purple-600 hover:bg-pink-600 transition-colors duration-300 text-white  rounded-md shadow-lg font-bold">
           Homepage
        </Button>
      </Link>
    </main>
  )
}
