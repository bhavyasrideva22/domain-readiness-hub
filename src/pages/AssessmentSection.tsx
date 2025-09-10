import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAssessment } from "@/contexts/AssessmentContext";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { assessmentQuestions, sectionInfo } from "@/data/assessmentQuestions";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const AssessmentSection = () => {
  const { state, dispatch } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Get current section questions
  const getSectionQuestions = () => {
    switch (state.currentSection) {
      case 1:
        return assessmentQuestions.filter(q => q.section === 'psychometric');
      case 2:
        return assessmentQuestions.filter(q => q.section === 'technical');
      case 3:
        return assessmentQuestions.filter(q => q.section === 'wiscar');
      default:
        return [];
    }
  };

  const getCurrentSectionInfo = () => {
    switch (state.currentSection) {
      case 1:
        return sectionInfo.psychometric;
      case 2:
        return sectionInfo.technical;
      case 3:
        return sectionInfo.wiscar;
      default:
        return { title: '', description: '', estimatedTime: '', icon: '' };
    }
  };

  const sectionQuestions = getSectionQuestions();
  const currentSectionInfo = getCurrentSectionInfo();
  const currentQuestion = sectionQuestions[currentQuestionIndex];
  
  const handleAnswer = (value: number | string) => {
    if (currentQuestion) {
      dispatch({
        type: 'ANSWER_QUESTION',
        payload: {
          questionId: currentQuestion.id,
          value,
          section: currentQuestion.section,
        }
      });
    }
  };

  const getCurrentAnswer = () => {
    return state.answers.find(a => a.questionId === currentQuestion?.id)?.value;
  };

  const canProceed = () => {
    return getCurrentAnswer() !== undefined;
  };

  const handleNext = () => {
    if (currentQuestionIndex < sectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of section
      if (state.currentSection < 3) {
        dispatch({ type: 'NEXT_SECTION' });
        setCurrentQuestionIndex(0);
      } else {
        // Complete assessment
        dispatch({ type: 'CALCULATE_SCORES' });
        dispatch({ type: 'COMPLETE_ASSESSMENT' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (state.currentSection > 1) {
      dispatch({ type: 'PREVIOUS_SECTION' });
      // Set to last question of previous section
      const prevSectionQuestions = assessmentQuestions.filter(q => {
        if (state.currentSection === 2) return q.section === 'psychometric';
        if (state.currentSection === 3) return q.section === 'technical';
        return [];
      });
      setCurrentQuestionIndex(prevSectionQuestions.length - 1);
    }
  };

  // Reset question index when section changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [state.currentSection]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  const sectionProgress = ((currentQuestionIndex + 1) / sectionQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Bar */}
          <ProgressBar currentSection={state.currentSection} totalSections={4} />

          {/* Section Header */}
          <Card className="bg-gradient-card border-0 shadow-soft mb-8 animate-fade-in">
            <CardHeader className="text-center">
              <div className="text-3xl mb-2">{currentSectionInfo.icon}</div>
              <CardTitle className="text-2xl">{currentSectionInfo.title}</CardTitle>
              <p className="text-muted-foreground">{currentSectionInfo.description}</p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-2">
                <span>⏱️ {currentSectionInfo.estimatedTime}</span>
                <span>📋 Question {currentQuestionIndex + 1} of {sectionQuestions.length}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${sectionProgress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Question */}
          <div className="mb-8">
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              currentAnswer={getCurrentAnswer()}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={state.currentSection === 1 && currentQuestionIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              {currentQuestionIndex + 1} / {sectionQuestions.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              variant="gradient"
              className="flex items-center gap-2"
            >
              {currentQuestionIndex === sectionQuestions.length - 1 && state.currentSection === 3 
                ? 'Complete Assessment' 
                : currentQuestionIndex === sectionQuestions.length - 1 
                  ? 'Next Section'
                  : 'Next Question'
              }
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};