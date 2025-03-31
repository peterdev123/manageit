"use client";

export default function HomeComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-600">ManageIt</h2>
          <div className="flex gap-4">
            <a href="/auth/login" className="text-gray-600 hover:text-blue-600">
              Login
            </a>
            <a
              href="/auth/signup"
              className="text-gray-600 hover:text-blue-600"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>
      <main className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Manage Your Budget
              <br />
              <span className="text-blue-600">With Ease</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Save and plan your finances with the 50-30-20 rule and worry no
              longer about budgetting.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="/auth/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </a>
              <a
                href="/auth/login"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Login
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="rounded-2xl overflow-hidden">
              <img
                src="assets/image/hero.jpg"
                alt="Budget Management"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>© 2025 ManageIt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
