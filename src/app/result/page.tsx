"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Trophy,
  Target,
  RefreshCw,
  Home,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const Result = () => {
  const searchParams = useSearchParams();

  // Extract data from query parameters
  const topCareer = searchParams.get("career") || "Software Developer";
  const confidence = parseInt(searchParams.get("confidence") || "75");
  const alt1 = searchParams.get("alt1") || "Web Developer";
  const alt2 = searchParams.get("alt2") || "UI/UX Designer";
  const salaryRange = searchParams.get("salary") || "$60,000 - $120,000";
  const growthRate = searchParams.get("growth") || "15% (Faster than average)";

  // Parse match reasons from JSON string
  let matchReasons = [
    "Your skills align with this career path",
    "Good match for your education level",
    "Fits your work style preference",
  ];

  try {
    const reasonsParam = searchParams.get("reasons");
    if (reasonsParam) {
      matchReasons = JSON.parse(reasonsParam);
    }
  } catch (error) {
    console.error("Error parsing match reasons:", error);
  }

  const alternatives = [alt1, alt2].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm font-semibold mb-6 shadow-lg">
            <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
            Analysis Complete - Results Ready!
          </div>
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-tight">
            Your Perfect Career Match
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Our AI has analyzed your profile and found the ideal career path for
            you
          </p>
        </div>

        <div className="grid gap-8">
          {/* Top Career Match */}
          <Card className="relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white rounded-3xl">
            {/* Add floating gradient orbs */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full transform translate-x-20 -translate-y-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full transform -translate-x-16 translate-y-16 animate-pulse delay-1000"></div>

            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-3xl font-bold">
                  <div className="p-2 bg-yellow-400 rounded-xl">
                    <Trophy className="w-8 h-8 text-yellow-800" />
                  </div>
                  Perfect Career Match
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className="bg-yellow-400 text-yellow-900 px-4 py-2 text-sm font-bold rounded-full shadow-lg">
                    🎯 Top Pick
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-8 pb-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">{topCareer}</h2>

                {/* Confidence Score */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Match Confidence</span>
                    <span className="font-bold text-lg">{confidence}%</span>
                  </div>
                  <Progress value={confidence} className="h-3 bg-white/20" />
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold">{salaryRange}</div>
                    <div className="text-sm opacity-90">Average Salary</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      {growthRate.split(" ")[0]}
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
                {matchReasons.map((reason, index) => (
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
          {alternatives.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">
                Other Great Matches
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {alternatives.map((career, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 backdrop-blur-md rounded-2xl overflow-hidden"
                  >
                    <CardContent className="p-8 text-center space-y-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                        <span className="text-3xl">
                          {index === 0 ? "🔧" : "📊"}
                        </span>
                      </div>

                      <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100 group-hover:text-purple-600 transition-colors">
                        {career}
                      </h4>

                      <div className="space-y-3">
                        <Progress
                          value={85 - index * 10}
                          className="h-3 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden"
                        />
                        <span className="text-lg font-bold text-purple-600">
                          {85 - index * 10}% Match
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-8" />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/quiz">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-8 text-lg font-semibold border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 hover:scale-105 transition-all duration-300 flex items-center gap-3 rounded-xl shadow-lg"
              >
                <RefreshCw className="w-5 h-5" />
                Retake Quiz
              </Button>
            </Link>

            <Link href="/">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-2xl rounded-xl border-0"
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
