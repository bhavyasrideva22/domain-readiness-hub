import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question } from "@/data/assessmentQuestions";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: number | string) => void;
  currentAnswer?: number | string;
}

export const QuestionCard = ({ question, onAnswer, currentAnswer }: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    currentAnswer?.toString() || ""
  );

  const handleAnswer = (value: string) => {
    setSelectedValue(value);
    onAnswer(question.type === 'likert' ? parseInt(value) : value);
  };

  const renderLikertScale = () => {
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-foreground mb-6">{question.question}</p>
        <RadioGroup value={selectedValue} onValueChange={handleAnswer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <RadioGroupItem value={value.toString()} id={`q-${question.id}-${value}`} />
              <Label 
                htmlFor={`q-${question.id}-${value}`} 
                className="flex-1 cursor-pointer text-sm"
              >
                <span className="font-medium mr-2">{value}</span>
                {labels[value - 1]}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-foreground mb-6">{question.question}</p>
        <RadioGroup value={selectedValue} onValueChange={handleAnswer}>
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:border-primary/50 hover:bg-accent/30 transition-all">
              <RadioGroupItem value={index.toString()} id={`q-${question.id}-${index}`} />
              <Label 
                htmlFor={`q-${question.id}-${index}`} 
                className="flex-1 cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderScenario = () => {
    return renderMultipleChoice(); // Scenarios use the same UI as multiple choice
  };

  return (
    <Card className="p-8 bg-gradient-card border-0 shadow-soft animate-fade-in">
      {question.type === 'likert' && renderLikertScale()}
      {question.type === 'multiple-choice' && renderMultipleChoice()}
      {question.type === 'scenario' && renderScenario()}
    </Card>
  );
};