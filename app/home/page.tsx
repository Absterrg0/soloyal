'use client';

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    router.push('/signin');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {session.user.name}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to your Dashboard! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              You've successfully signed in with Google using better-auth.
            </p>
            
            <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{session.user.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{session.user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ID:</span>
                  <span className="font-mono text-sm">{session.user.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}