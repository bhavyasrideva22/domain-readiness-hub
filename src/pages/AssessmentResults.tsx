import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAssessment } from "@/contexts/AssessmentContext";
import { ScoreCard } from "@/components/assessment/ScoreCard";
import { WiscarRadar } from "@/components/assessment/WiscarRadar";
import { Download, RefreshCw, Share2, BookOpen } from "lucide-react";

export const AssessmentResults = () => {
  const { state } = useAssessment();
  
  const getRecommendation = (overallScore: number) => {
    if (overallScore >= 75) {
      return {
        decision: "Highly Recommended",
        color: "text-success",
        variant: "default" as const,
        message: "You demonstrate excellent readiness for a Regulatory Tech Analyst role. Your psychological fit, technical aptitude, and WISCAR dimensions all indicate strong potential for success."
      };
    } else if (overallScore >= 60) {
      return {
        decision: "Recommended with Development",
        color: "text-warning",
        variant: "secondary" as const,
        message: "You show good potential for a Regulatory Tech Analyst role. Focus on the identified development areas to strengthen your readiness."
      };
    } else {
      return {
        decision: "Consider Alternative Paths",
        color: "text-destructive", 
        variant: "destructive" as const,
        message: "While RegTech may not be the ideal immediate fit, explore the alternative career paths that align better with your current profile."
      };
    }
  };

  const recommendation = getRecommendation(state.scores.overall);

  const getNextSteps = (overallScore: number) => {
    if (overallScore >= 75) {
      return [
        "Apply for entry-level RegTech analyst positions",
        "Obtain relevant certifications (FRM, CAMS, or similar)",
        "Build a portfolio of regulatory technology projects",
        "Network with professionals in the RegTech space",
        "Consider specialized RegTech bootcamps or courses"
      ];
    } else if (overallScore >= 60) {
      return [
        "Strengthen technical skills through online courses",
        "Gain foundational knowledge in regulatory frameworks",
        "Practice with RegTech simulation tools and platforms",
        "Seek mentorship from current RegTech professionals",
        "Consider internships or junior roles in compliance departments"
      ];
    } else {
      return [
        "Explore Data Analysis or Business Analysis roles",
        "Consider Legal Technology or Compliance Support positions",
        "Develop foundational technical skills in data analysis",
        "Gain experience in financial services or regulated industries",
        "Reassess your interests and career alignment"
      ];
    }
  };

  const alternativeCareers = [
    { role: "Data Analyst", match: "85%", description: "Strong analytical skills translate well" },
    { role: "Compliance Coordinator", match: "78%", description: "Good foundation in regulatory thinking" },
    { role: "Business Analyst", match: "72%", description: "Process improvement and analysis focus" },
    { role: "Risk Analyst", match: "70%", description: "Quantitative analysis and risk assessment" }
  ];

  const learningResources = [
    { category: "Technical Skills", resources: ["Python for Data Analysis", "SQL Fundamentals", "RegTech Platforms Overview"] },
    { category: "Domain Knowledge", resources: ["Regulatory Frameworks", "Financial Compliance", "Risk Management Basics"] },
    { category: "Certifications", resources: ["FRM Certification", "CAMS Certification", "Data Analysis Certificates"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              Your Assessment Results
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive analysis of your readiness for Regulatory Tech Analyst role
            </p>
          </div>

          {/* Overall Recommendation */}
          <Card className="bg-gradient-card border-0 shadow-medium animate-fade-in">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl">🎯</span>
                <CardTitle className="text-2xl">Overall Recommendation</CardTitle>
              </div>
              <Badge variant={recommendation.variant} className="text-lg px-4 py-2">
                {recommendation.decision}
              </Badge>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold mb-4">
                <span className={recommendation.color}>{Math.round(state.scores.overall)}%</span>
                <span className="text-muted-foreground text-lg ml-2">Overall Readiness</span>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {recommendation.message}
              </p>
            </CardContent>
          </Card>

          {/* Score Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <ScoreCard
              title="Psychological Fit"
              score={state.scores.psychometric}
              description="Interest, motivation, and personality alignment"
              icon="🧠"
              interpretation={
                state.scores.psychometric >= 80 
                  ? "Excellent alignment with RegTech analyst personality profile"
                  : state.scores.psychometric >= 60
                    ? "Good psychological fit with some areas for development"
                    : "Consider whether this role aligns with your natural preferences"
              }
            />
            <ScoreCard
              title="Technical Readiness"
              score={state.scores.technical}
              description="Logical reasoning and domain knowledge"
              icon="⚙️"
              interpretation={
                state.scores.technical >= 80
                  ? "Strong technical foundation for RegTech work"
                  : state.scores.technical >= 60
                    ? "Solid base with room for technical skill development"
                    : "Significant technical skill development needed"
              }
            />
            <ScoreCard
              title="WISCAR Average"
              score={Math.round(Object.values(state.scores.wiscar).reduce((a, b) => a + b, 0) / 6)}
              description="Comprehensive readiness across six dimensions"
              icon="📊"
              interpretation={
                Object.values(state.scores.wiscar).reduce((a, b) => a + b, 0) / 6 >= 80
                  ? "Well-rounded readiness across all key dimensions"
                  : Object.values(state.scores.wiscar).reduce((a, b) => a + b, 0) / 6 >= 60
                    ? "Good overall readiness with targeted development opportunities"
                    : "Multiple areas need development before pursuing this path"
              }
            />
          </div>

          {/* WISCAR Radar Chart */}
          <WiscarRadar scores={state.scores.wiscar} />

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {getNextSteps(state.scores.overall).map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-lg">🎯</span>
                  Alternative Career Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alternativeCareers.map((career, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{career.role}</h4>
                        <p className="text-xs text-muted-foreground">{career.description}</p>
                      </div>
                      <Badge variant="secondary">{career.match}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Resources */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle>Personalized Learning Path</CardTitle>
              <p className="text-sm text-muted-foreground">
                Curated resources to strengthen your readiness
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {learningResources.map((category, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-foreground mb-3">{category.category}</h4>
                    <ul className="space-y-2">
                      {category.resources.map((resource, resourceIndex) => (
                        <li key={resourceIndex} className="text-sm text-muted-foreground">
                          • {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Results
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              variant="gradient"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retake Assessment
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};