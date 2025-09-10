import { Progress } from "@/components/ui/progress";
import { sectionInfo } from "@/data/assessmentQuestions";

interface ProgressBarProps {
  currentSection: number;
  totalSections: number;
}

const sectionNames = ['Introduction', 'Psychometric', 'Technical', 'WISCAR', 'Results'];

export const ProgressBar = ({ currentSection, totalSections }: ProgressBarProps) => {
  const progress = (currentSection / totalSections) * 100;
  
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          Step {currentSection} of {totalSections}
        </div>
        <div className="text-sm font-medium text-primary">
          {Math.round(progress)}% Complete
        </div>
      </div>
      
      <Progress value={progress} className="h-3 mb-4" />
      
      <div className="flex justify-between">
        {sectionNames.map((name, index) => (
          <div 
            key={name} 
            className={`text-xs ${
              index <= currentSection 
                ? 'text-primary font-medium' 
                : 'text-muted-foreground'
            }`}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};