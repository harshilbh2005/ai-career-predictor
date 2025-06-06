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
import { X, Loader2, ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

interface ValidationErrors {
  education?: string;
  skills?: string;
  interest?: string;
}

const Quiz = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

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

      // Clear skills error if exists
      if (errors.skills) {
        setErrors((prev) => ({ ...prev, skills: undefined }));
      }
    }
    // Keep dropdown open for better UX
  };

  const handleSkillRemove = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
    setAvailableSkills((prev) => [...prev, skill].sort());
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validate education
    if (!formData.education) {
      newErrors.education = "Please select your education level";
    }

    // Validate skills
    if (formData.skills.length === 0) {
      newErrors.skills = "Please select at least one skill";
    }

    // Validate interest
    if (!formData.interest) {
      newErrors.interest = "Please select your primary interest area";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      console.log("Form Data:", formData);

      // Call the prediction API
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const result = await response.json();

      // Create URL with query parameters
      const params = new URLSearchParams({
        career: result.topCareer,
        confidence: result.confidence.toString(),
        alt1: result.alternatives[0] || "",
        alt2: result.alternatives[1] || "",
        reasons: JSON.stringify(result.matchReasons),
        salary: result.salaryRange,
        growth: result.growthRate,
      });

      // Navigate to result page with data
      router.push(`/result?${params.toString()}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

        <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl overflow-hidden">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span>📋</span>
              Tell Us About Yourself
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Complete all fields to get your personalized career recommendation
            </p>
          </CardHeader>

          <CardContent className="space-y-8 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Education Level */}
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span>🎓</span>
                  Education Level
                  <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.education}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, education: value }));
                    // Clear error when user selects
                    if (errors.education) {
                      setErrors((prev) => ({ ...prev, education: undefined }));
                    }
                  }}
                >
                  <SelectTrigger
                    className={`h-12 text-base ${
                      errors.education ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="associate">Associate Degree</SelectItem>
                    <SelectItem value="bachelor">
                      Bachelor&apos;s Degree
                    </SelectItem>
                    <SelectItem value="master">Master&apos;s Degree</SelectItem>
                    <SelectItem value="phd">PhD/Doctorate</SelectItem>
                    <SelectItem value="other">Other/Self-taught</SelectItem>
                  </SelectContent>
                </Select>
                {errors.education && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.education}
                  </p>
                )}
              </div>

              {/* Skills Multi-Select */}
              <div className="space-y-3">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span>💼</span>
                  Skills & Technologies
                  <span className="text-red-500">*</span>
                  <span className="text-sm font-normal text-slate-500">
                    (Select multiple)
                  </span>
                </Label>

                {/* Selected Skills */}
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-blue-100 dark:border-slate-600">
                    {formData.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-2 text-sm flex items-center gap-2 bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                      >
                        {skill}
                        <X
                          size={14}
                          className="cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => handleSkillRemove(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Enhanced Skills Dropdown */}
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className={`w-full h-12 justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      errors.skills ? "border-red-500" : "border-slate-200 dark:border-slate-600"
                    }`}
                    onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                  >
                    <span className="text-slate-700 dark:text-slate-300">
                      {formData.skills.length === 0
                        ? "Click to select your skills..."
                        : `${formData.skills.length} skill${
                            formData.skills.length > 1 ? "s" : ""
                          } selected`}
                    </span>
                    <div className="flex items-center gap-2">
                      {availableSkills.length > 0 && (
                        <Plus size={16} className="text-blue-600" />
                      )}
                      <ChevronDown
                        size={16}
                        className={`transition-transform text-slate-400 ${
                          showSkillsDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </Button>

                  {showSkillsDropdown && (
                    <div className="absolute top-full left-0 right-0 z-10 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                      <div className="p-3 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-750">
                        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                          Click skills to add them to your profile
                        </p>
                      </div>
                      {availableSkills.map((skill) => (
                        <div
                          key={skill}
                          className="px-4 py-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm flex items-center justify-between group border-b border-slate-50 dark:border-slate-750 last:border-b-0 transition-colors"
                          onClick={() => handleSkillAdd(skill)}
                        >
                          <span className="text-slate-700 dark:text-slate-300">{skill}</span>
                          <Plus
                            size={14}
                            className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      ))}
                      {availableSkills.length === 0 && (
                        <div className="px-4 py-6 text-slate-500 text-sm text-center">
                          <div className="text-2xl mb-2">🎉</div>
                          <div>All skills selected!</div>
                          <div className="text-xs mt-1">You can remove skills by clicking the ✕ on them above.</div>
                        </div>
                      )}
                      <div className="p-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-750">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs hover:bg-white dark:hover:bg-slate-800 transition-colors"
                          onClick={() => setShowSkillsDropdown(false)}
                        >
                          Done Adding Skills
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {errors.skills && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.skills}
                  </p>
                )}

                {/* Skills Helper Text */}
                <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-600">
                  <p className="text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <span>💡</span>
                    <span>Tip: Select all skills you have experience with. You can always add more by clicking the dropdown again.</span>
                  </p>
                </div>
              </div>

              {/* Interest Area */}
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span>❤️</span>
                  Primary Interest Area
                  <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.interest}
                  onValueChange={(value) => {
                    setFormData((prev) => ({ ...prev, interest: value }));
                    // Clear error when user selects
                    if (errors.interest) {
                      setErrors((prev) => ({ ...prev, interest: undefined }));
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  {interestAreas.map((area) => (
                    <div
                      key={area.value}
                      className={`flex items-center space-x-3 p-4 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-all duration-200 hover:shadow-sm ${
                        formData.interest === area.value 
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm" 
                          : errors.interest 
                            ? "border-red-200" 
                            : "border-slate-200 dark:border-slate-600"
                      }`}
                    >
                      <RadioGroupItem value={area.value} id={area.value} />
                      <Label
                        htmlFor={area.value}
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <span className="text-xl">{area.icon}</span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{area.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {errors.interest && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.interest}
                  </p>
                )}
              </div>

              {/* Work Style Preference */}
              <div className="space-y-4">
                <Label className="text-base font-semibold flex items-center gap-2">
                  <span>⚖️</span>
                  Work Style Preference
                  <span className="text-xs text-slate-500 font-normal">
                    (Optional)
                  </span>
                </Label>
                <div className="px-6 py-6 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
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
                  <div className="flex justify-between items-center mt-4 text-sm">
                    <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <span>🛠️</span>
                      <span>Hands-on Work</span>
                    </span>
                    <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-blue-200 dark:border-slate-600">
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {formData.workStyle[0]}/10
                      </span>
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <span>🔬</span>
                      <span>Research-heavy</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25 hover:scale-[1.02] rounded-xl border-0"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Analyzing Your Profile...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mr-3 text-2xl">🚀</span>
                      <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Discover My Career Path
                      </span>
                    </>
                  )}
                </Button>

                {/* Form Status */}
                <div className="mt-4 text-center">
                  {!isFormValid &&
                    !isLoading &&
                    Object.keys(errors).length === 0 && (
                      <p className="text-sm text-slate-500">
                        Please fill in all required fields (*) to continue
                      </p>
                    )}
                  {isFormValid && (
                    <p className="text-sm text-green-600 flex items-center justify-center gap-1">
                      <span>✅</span>
                      Ready to discover your career path!
                    </p>
                  )}
                </div>
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
