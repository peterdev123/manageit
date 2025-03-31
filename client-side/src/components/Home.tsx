'use client';

export default function HomeComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <main className="w-full max-w-4xl px-4">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            ManageIt
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple and effective budget management
          </p>
          
          <div className="flex gap-4 justify-center mt-8">
            <a
              href="/auth/login"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Login
            </a>
            <a
              href="/auth/signup"
              className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-50 transition-colors"
            >
              Sign Up
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
