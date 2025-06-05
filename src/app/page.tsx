import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🎯</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CareerAI
          </span>
        </div>

        <Link href="/quiz">
          <Button
            variant="outline"
            className="hover:scale-105 transition-transform"
          >
            Take Quiz
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="px-6 py-12 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>

          {/* Main Hero Content */}
          <div className="text-center space-y-8 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
              <span className="mr-2">✨</span>
              AI-Powered Career Discovery
            </div>

            {/* Headlines */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Find Your Ideal
                </span>
                <br />
                <span className="text-slate-800 dark:text-slate-100">
                  Career with AI
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Answer a few questions. Get tailored career suggestions backed
                by machine learning. Discover opportunities that match your
                skills, interests, and aspirations.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link href="/quiz">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <span className="mr-2">🚀</span>
                  Start Career Quiz
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="font-semibold text-lg">AI-Powered Analysis</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Advanced algorithms analyze your responses to suggest perfect
                  career matches
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-lg">Quick & Easy</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Complete the assessment in just 5 minutes and get instant
                  results
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-lg">Personalized Results</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Get detailed insights tailored specifically to your unique
                  profile
                </p>
              </div>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="mt-20 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Careers Matched
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Accuracy Rate
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-indigo-600">5min</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Average Time
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Career Options
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
