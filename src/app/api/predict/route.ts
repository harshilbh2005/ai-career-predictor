import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const formData = await req.json();
    const { education, skills, interest, workStyle } = formData;

    // Mock prediction logic based on user input
    let topCareer = "Software Developer";
    let confidence = 75;
    let alternatives = ["Web Developer", "UI/UX Designer"];
    let matchReasons = [
      "Your skills align with this career path",
      "Good match for your education level",
      "Fits your work style preference",
    ];
    let salaryRange = "$60,000 - $120,000";
    let growthRate = "15% (Faster than average)";

    // Simple logic based on interest and skills
    if (interest === "research" || interest === "analytics") {
      if (skills.includes("Python") || skills.includes("Machine Learning")) {
        topCareer = "AI Research Scientist";
        confidence = 91;
        alternatives = ["Machine Learning Engineer", "Data Scientist"];
        matchReasons = [
          "Strong background in Python & Machine Learning",
          "Research-oriented work style preference",
          "Advanced education level matches requirements",
        ];
        salaryRange = "$95,000 - $180,000";
        growthRate = "22% (Much faster than average)";
      } else if (skills.includes("Data Analysis") || skills.includes("SQL")) {
        topCareer = "Data Scientist";
        confidence = 88;
        alternatives = ["Data Analyst", "Business Intelligence Analyst"];
        matchReasons = [
          "Strong analytical skills",
          "Experience with data tools",
          "Research-focused mindset",
        ];
        salaryRange = "$70,000 - $150,000";
        growthRate = "25% (Much faster than average)";
      }
    } else if (interest === "coding") {
      if (skills.includes("JavaScript") || skills.includes("React")) {
        topCareer = "Frontend Developer";
        confidence = 85;
        alternatives = ["Full Stack Developer", "UI Developer"];
        matchReasons = [
          "Strong JavaScript and React skills",
          "Coding-focused interest",
          "Good fit for development work",
        ];
        salaryRange = "$65,000 - $130,000";
        growthRate = "13% (Faster than average)";
      } else if (skills.includes("Python") || skills.includes("Node.js")) {
        topCareer = "Backend Developer";
        confidence = 83;
        alternatives = ["Full Stack Developer", "DevOps Engineer"];
        matchReasons = [
          "Strong backend programming skills",
          "Server-side development experience",
          "Technical problem-solving focus",
        ];
        salaryRange = "$70,000 - $140,000";
        growthRate = "13% (Faster than average)";
      }
    } else if (interest === "design") {
      topCareer = "UX/UI Designer";
      confidence = 82;
      alternatives = ["Product Designer", "Graphic Designer"];
      matchReasons = [
        "Creative design interests",
        "User-focused thinking",
        "Visual problem-solving skills",
      ];
      salaryRange = "$55,000 - $110,000";
      growthRate = "8% (As fast as average)";
    } else if (interest === "management") {
      topCareer = "Product Manager";
      confidence = 80;
      alternatives = ["Project Manager", "Business Analyst"];
      matchReasons = [
        "Leadership and management interest",
        "Strategic thinking abilities",
        "Cross-functional collaboration skills",
      ];
      salaryRange = "$75,000 - $150,000";
      growthRate = "19% (Much faster than average)";
    }

    // Adjust confidence based on education level
    if (education === "phd") {
      confidence = Math.min(confidence + 5, 95);
    } else if (education === "master") {
      confidence = Math.min(confidence + 3, 93);
    } else if (education === "high-school") {
      confidence = Math.max(confidence - 5, 65);
    }

    // Adjust confidence based on work style (research vs hands-on)
    const workStyleValue = workStyle[0];
    if (topCareer.includes("Research") && workStyleValue > 7) {
      confidence = Math.min(confidence + 3, 95);
    } else if (!topCareer.includes("Research") && workStyleValue < 4) {
      confidence = Math.min(confidence + 2, 95);
    }

    const result = {
      topCareer,
      confidence,
      alternatives,
      matchReasons,
      salaryRange,
      growthRate,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in predict API:", error);
    return NextResponse.json(
      { error: "Failed to process prediction" },
      { status: 500 }
    );
  }
}
