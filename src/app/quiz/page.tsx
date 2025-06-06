"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import Link from "next/link";

const skillsOptions = [
  "Python",
  "JavaScript",
  "Machine Learning",
  "Web Development",
  "Data Analysis",
  "Writing",
  "Cybersecurity",
  "Design",
  "Marketing",
  "Project Management",
  "React",
  "Node.js",
  "SQL",
  "Excel",
  "Public Speaking",
  "Research",
  "Photography",
  "Video Editing",
  "Social Media",
  "Finance",
];

const interestAreas = [
  { value: "research", label: "Research & Analysis", icon: "🔬" },
  { value: "coding", label: "Software Development", icon: "💻" },
  { value: "management", label: "Leadership & Management", icon: "👔" },
  { value: "design", label: "Creative Design", icon: "🎨" },
  { value: "analytics", label: "Data Analytics", icon: "📊" },
  { value: "consulting", label: "Consulting & Strategy", icon: "💡" },
  { value: "healthcare", label: "Healthcare & Medicine", icon: "🏥" },
  { value: "education", label: "Education & Training", icon: "📚" },
];

const Quiz = () => {
  const [formData, setFormData] = useState({
    education: "",
    skills: [] as string[],
    interest: "",
    workStyle: [5],
  });

  const [availableSkills, setAvailableSkills] = useState(skillsOptions);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);

  const handleSkillAdd = (skill: string) => {
    if (!formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setAvailableSkills((prev) => prev.filter((s) => s !== skill));
    }
    setShowSkillsDropdown(false);
  };

  const handleSkillRemove = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
    setAvailableSkills((prev) => [...prev, skill].sort());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: Navigate to /result or call API
  };

  const isFormValid =
    formData.education && formData.skills.length > 0 && formData.interest;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Career Discovery Quiz
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Help us understand your profile to suggest the perfect career match
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-2 text-xl">
              <span>📋</span>
              Tell Us About Yourself
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Education Level */}
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span>🎓</span>
                  Education Level
                </Label>
                <Select
                  value={formData.education}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, education: value }))
                  }
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="associate">Associate Degree</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD/Doctorate</SelectItem>
                    <SelectItem value="other">Other/Self-taught</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Skills Multi-Select */}
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span>💼</span>
                  Skills & Technologies
                  <span className="text-sm font-normal text-slate-500">
                    (Select multiple)
                  </span>
                </Label>

                {/* Selected Skills */}
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    {formData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1 text-sm flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-600"
                      >
                        {skill}
                        <X
                          size={14}
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleSkillRemove(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Skills Dropdown */}
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 justify-start text-left"
                    onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                  >
                    {formData.skills.length === 0
                      ? "Click to select your skills..."
                      : `${formData.skills.length} skill${
                          formData.skills.length > 1 ? "s" : ""
                        } selected`}
                  </Button>

                  {showSkillsDropdown && (
                    <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white dark:bg-slate-800 border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {availableSkills.map((skill) => (
                        <div
                          key={skill}
                          className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-sm"
                          onClick={() => handleSkillAdd(skill)}
                        >
                          {skill}
                        </div>
                      ))}
                      {availableSkills.length === 0 && (
                        <div className="px-4 py-2 text-slate-500 text-sm">
                          All skills selected
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Interest Area */}
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span>❤️</span>
                  Primary Interest Area
                </Label>
                <RadioGroup
                  value={formData.interest}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, interest: value }))
                  }
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {interestAreas.map((area) => (
                    <div
                      key={area.value}
                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                    >
                      <RadioGroupItem value={area.value} id={area.value} />
                      <Label
                        htmlFor={area.value}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        <span className="text-lg">{area.icon}</span>
                        <span className="text-sm">{area.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Work Style Preference */}
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span>⚖️</span>
                  Work Style Preference
                </Label>
                <div className="px-4 py-6 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <Slider
                    value={formData.workStyle}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, workStyle: value }))
                    }
                    max={10}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-3 text-sm text-slate-600 dark:text-slate-300">
                    <span>🛠️ Hands-on Work</span>
                    <span className="font-semibold text-blue-600">
                      {formData.workStyle[0]}/10
                    </span>
                    <span>🔬 Research-heavy</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isFormValid}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 hover:scale-[1.02] transition-all duration-300 shadow-lg"
                >
                  <span className="mr-2">🚀</span>
                  Discover My Career Path
                </Button>

                {!isFormValid && (
                  <p className="text-center text-sm text-slate-500 mt-2">
                    Please fill in all required fields to continue
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="text-center mt-6 text-sm text-slate-500">
          Step 1 of 2 • Quiz Assessment
        </div>
      </div>
    </div>
  );
};

export default Quiz;
