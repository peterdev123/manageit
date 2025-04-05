"use client";

import Image from 'next/image';

export default function HomeComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="py-4 px-6 border-b sticky top-0 bg-white/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <span className="text-blue-800">💼</span> ManageIt
          </h2>
          <div className="flex gap-3 w-full sm:w-auto justify-center">
            <a
              href="/auth/login"
              className="px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium border-2 border-transparent hover:border-blue-600 w-full sm:w-auto text-center"
            >
              Login
            </a>
            <a
              href="/auth/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full sm:w-auto text-center"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Smart Budget Management
              <br />
              <span className="text-blue-600">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Take control of your finances with our intuitive 50-30-20
              budgeting system. Track, save, and achieve your financial goals
              with ease.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="/auth/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                Get Started <span>→</span>
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
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/image/hero.jpg"
                alt="Budget Management"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose ManageIt?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "📊",
                  title: "50/30/20 Rule",
                  description:
                    "Smart budget allocation for needs, wants, and savings",
                },
                {
                  icon: "📱",
                  title: "Easy Tracking",
                  description:
                    "Monitor your spending habits with our intuitive interface",
                },
                {
                  icon: "🎯",
                  title: "Goal Setting",
                  description:
                    "Set and achieve your financial goals with confidence",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-20 bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-900">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already managing their budgets smarter with the 50/30/20 rule. Start your journey to financial freedom today.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/auth/signup"
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-indigo-50 transition-colors font-medium text-lg flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                Get Started Now <span>→</span>
              </a>
              <a
                href="/auth/login"
                className="bg-transparent text-white border-2 border-white/80 px-8 py-4 rounded-lg hover:bg-white/20 transition-colors font-medium text-lg backdrop-blur-sm"
              >
                Login to Account
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                <span className="text-blue-800">💼</span> ManageIt
              </h3>
              <p className="text-gray-600">
                Smart budget management for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a
                  href="/auth/login"
                  className="block text-gray-600 hover:text-blue-600"
                >
                  Login
                </a>
                <a
                  href="/auth/signup"
                  className="block text-gray-600 hover:text-blue-600"
                >
                  Sign Up
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-600">petersylvan@gmail.com</p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>© 2025 ManageIt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
