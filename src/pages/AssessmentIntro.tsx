import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAssessment } from "@/contexts/AssessmentContext";
import { Clock, Target, Award, TrendingUp } from "lucide-react";

export const AssessmentIntro = () => {
  const { dispatch } = useAssessment();

  const handleStartAssessment = () => {
    dispatch({ type: 'START_ASSESSMENT' });
  };

  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Psychological Fit",
      description: "Evaluate your interest, motivation, and personality alignment"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Technical Aptitude",
      description: "Test logical reasoning and domain-specific knowledge"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "WISCAR Analysis",
      description: "Comprehensive readiness across six key dimensions"
    }
  ];

  const careerPaths = [
    "Regulatory Tech Analyst",
    "Compliance Officer", 
    "Risk Manager",
    "RegTech Consultant",
    "Data Privacy Officer"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
              Your Comprehensive Readiness Assessment
            </h1>
            <h2 className="text-2xl md:text-3xl text-foreground mb-4">
              for Regulatory Tech Analyst
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover your potential in the exciting field of Regulatory Technology. 
              This comprehensive assessment evaluates your psychological fit, technical aptitude, 
              and career readiness across multiple dimensions.
            </p>
          </div>

          {/* Assessment Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10 text-primary w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Assessment Details */}
          <Card className="bg-gradient-card border-0 shadow-soft mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                What to Expect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Assessment Structure</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Psychological Fit Assessment (7-10 min)</li>
                    <li>• Technical Aptitude Test (8-10 min)</li>
                    <li>• WISCAR Framework Analysis (5-7 min)</li>
                    <li>• Personalized Results & Recommendations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">What You'll Learn</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Your readiness for RegTech careers</li>
                    <li>• Specific strengths and development areas</li>
                    <li>• Personalized learning recommendations</li>
                    <li>• Alternative career path suggestions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Paths */}
          <Card className="bg-gradient-card border-0 shadow-soft mb-10 animate-fade-in">
            <CardHeader>
              <CardTitle>Career Opportunities in Regulatory Technology</CardTitle>
              <p className="text-sm text-muted-foreground">
                RegTech skills open doors to these high-demand roles
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {careerPaths.map((path, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {path}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center animate-fade-in">
            <Button 
              onClick={handleStartAssessment}
              size="lg"
              variant="hero"
              className="text-lg px-8 py-6 rounded-xl animate-pulse-glow"
            >
              Start Your Assessment
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              ⏱️ Estimated time: 20-30 minutes • 🔒 Your data is private and secure
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};