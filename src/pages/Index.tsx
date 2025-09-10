import { useAssessment } from "@/contexts/AssessmentContext";
import { AssessmentIntro } from "./AssessmentIntro";
import { AssessmentSection } from "./AssessmentSection";
import { AssessmentResults } from "./AssessmentResults";

const Index = () => {
  const { state } = useAssessment();

  // Route to appropriate assessment page based on current section
  switch (state.currentSection) {
    case 0:
      return <AssessmentIntro />;
    case 1:
    case 2: 
    case 3:
      return <AssessmentSection />;
    case 4:
      return <AssessmentResults />;
    default:
      return <AssessmentIntro />;
  }
};

export default Index;
