import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Trophy,
  Target,
  RefreshCw,
  Home,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// Mock data - replace with API call later
const result = {
  topCareer: "AI Research Scientist",
  confidence: 91,
  alternatives: ["Machine Learning Engineer", "Data Scientist"],
  matchReasons: [
    "Strong background in Python & Machine Learning",
    "Research-oriented work style preference",
    "Advanced education level matches requirements",
  ],
  salaryRange: "$95,000 - $180,000",
  growthRate: "22% (Much faster than average)",
};

const Result = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Analysis Complete
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Your Career Match Results
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Based on your responses, we've found your perfect career path
          </p>
        </div>

        <div className="grid gap-8">
          {/* Top Career Match */}
          <Card className="relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12"></div>

            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Trophy className="w-8 h-8 text-yellow-300" />
                  Best Career Match
                </CardTitle>
                <Badge className="bg-yellow-300 text-yellow-800 px-3 py-1">
                  Top Pick
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  {result.topCareer}
                </h2>

                {/* Confidence Score */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Match Confidence</span>
                    <span className="font-bold text-lg">
                      {result.confidence}%
                    </span>
                  </div>
                  <Progress
                    value={result.confidence}
                    className="h-3 bg-white/20"
                  />
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold">
                      {result.salaryRange}
                    </div>
                    <div className="text-sm opacity-90">Average Salary</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      {result.growthRate.split(" ")[0]}
                    </div>
                    <div className="text-sm opacity-90">Job Growth</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why This Match */}
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="w-6 h-6 text-blue-600" />
                Why This Career Fits You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.matchReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700 dark:text-slate-300">
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Alternative Careers */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">
              Other Great Matches
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {result.alternatives.map((career, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-2xl">
                        {index === 0 ? "🔧" : "📊"}
                      </span>
                    </div>
                    <h4 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
                      {career}
                    </h4>
                    <div className="flex items-center justify-center gap-2">
                      <Progress
                        value={85 - index * 10}
                        className="flex-1 h-2"
                      />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {85 - index * 10}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/quiz">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Retake Quiz
              </Button>
            </Link>

            <Link href="/">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
            <p>
              💡 Results are based on AI analysis of your responses and current
              market trends
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
