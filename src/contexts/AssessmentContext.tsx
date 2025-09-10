import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface AssessmentAnswer {
  questionId: string;
  value: number | string;
  section: string;
}

export interface AssessmentState {
  currentSection: number;
  answers: AssessmentAnswer[];
  startTime: number | null;
  sectionStartTime: number | null;
  isComplete: boolean;
  scores: {
    psychometric: number;
    technical: number;
    wiscar: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability: number;
      realWorld: number;
    };
    overall: number;
  };
}

type AssessmentAction = 
  | { type: 'START_ASSESSMENT' }
  | { type: 'NEXT_SECTION' }
  | { type: 'PREVIOUS_SECTION' }
  | { type: 'ANSWER_QUESTION'; payload: AssessmentAnswer }
  | { type: 'COMPLETE_ASSESSMENT' }
  | { type: 'CALCULATE_SCORES' };

const initialState: AssessmentState = {
  currentSection: 0,
  answers: [],
  startTime: null,
  sectionStartTime: null,
  isComplete: false,
  scores: {
    psychometric: 0,
    technical: 0,
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0,
    },
    overall: 0,
  },
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'START_ASSESSMENT':
      return {
        ...state,
        startTime: Date.now(),
        sectionStartTime: Date.now(),
        currentSection: 1,
      };
    
    case 'NEXT_SECTION':
      return {
        ...state,
        currentSection: state.currentSection + 1,
        sectionStartTime: Date.now(),
      };
    
    case 'PREVIOUS_SECTION':
      return {
        ...state,
        currentSection: Math.max(0, state.currentSection - 1),
        sectionStartTime: Date.now(),
      };
    
    case 'ANSWER_QUESTION':
      const existingIndex = state.answers.findIndex(
        answer => answer.questionId === action.payload.questionId
      );
      
      const updatedAnswers = existingIndex >= 0
        ? state.answers.map((answer, index) =>
            index === existingIndex ? action.payload : answer
          )
        : [...state.answers, action.payload];
      
      return {
        ...state,
        answers: updatedAnswers,
      };
    
    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        isComplete: true,
        currentSection: 4, // Results section
      };
    
    case 'CALCULATE_SCORES':
      // Calculate scores based on answers
      const psychometricAnswers = state.answers.filter(a => a.section === 'psychometric');
      const technicalAnswers = state.answers.filter(a => a.section === 'technical');
      const wiscarAnswers = state.answers.filter(a => a.section === 'wiscar');
      
      const psychometricScore = calculatePsychometricScore(psychometricAnswers);
      const technicalScore = calculateTechnicalScore(technicalAnswers);
      const wiscarScores = calculateWiscarScores(wiscarAnswers);
      const overallScore = (psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3;
      
      return {
        ...state,
        scores: {
          psychometric: psychometricScore,
          technical: technicalScore,
          wiscar: wiscarScores,
          overall: overallScore,
        },
      };
    
    default:
      return state;
  }
}

function calculatePsychometricScore(answers: AssessmentAnswer[]): number {
  if (answers.length === 0) return 0;
  const total = answers.reduce((sum, answer) => sum + Number(answer.value), 0);
  return Math.round((total / (answers.length * 5)) * 100);
}

function calculateTechnicalScore(answers: AssessmentAnswer[]): number {
  if (answers.length === 0) return 0;
  const correctAnswers = answers.filter(answer => {
    // This would normally check against correct answers
    // For demo purposes, we'll use a simple calculation
    return Number(answer.value) >= 3;
  }).length;
  return Math.round((correctAnswers / answers.length) * 100);
}

function calculateWiscarScores(answers: AssessmentAnswer[]): AssessmentState['scores']['wiscar'] {
  const dimensions = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
  const scores: any = {};
  
  dimensions.forEach(dimension => {
    const dimensionAnswers = answers.filter(a => a.questionId.includes(dimension));
    if (dimensionAnswers.length > 0) {
      const total = dimensionAnswers.reduce((sum, answer) => sum + Number(answer.value), 0);
      scores[dimension] = Math.round((total / (dimensionAnswers.length * 5)) * 100);
    } else {
      scores[dimension] = 0;
    }
  });
  
  return scores;
}

const AssessmentContext = createContext<{
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
} | null>(null);

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);
  
  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};