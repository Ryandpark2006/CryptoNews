import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">404</h2>
                <p className="text-lg text-gray-600 mb-8">Page not found</p>
                <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                    Return Home
                </Link>
            </div>
        </div>
    )
} 