import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-gray-900">
          ENS Agent Chat
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with AI agents through ENS domains. Experience the future of personalized AI interactions.
        </p>
        <Link
          href="/agent-nft"
          className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
