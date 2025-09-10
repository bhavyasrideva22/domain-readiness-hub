export interface Question {
  id: string;
  section: 'psychometric' | 'technical' | 'wiscar';
  category?: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  question: string;
  options?: string[];
  correctAnswer?: number;
  dimension?: string;
}

export const assessmentQuestions: Question[] = [
  // Psychometric Section
  {
    id: 'psych_1',
    section: 'psychometric',
    category: 'interest',
    type: 'likert',
    question: 'I am genuinely interested in exploring how technology can solve regulatory and compliance challenges.',
  },
  {
    id: 'psych_2',
    section: 'psychometric',
    category: 'interest',
    type: 'likert',
    question: 'I enjoy analyzing complex regulatory frameworks and finding patterns or inefficiencies.',
  },
  {
    id: 'psych_3',
    section: 'psychometric',
    category: 'personality',
    type: 'likert',
    question: 'I prefer working with structured data and systematic approaches rather than creative, open-ended tasks.',
  },
  {
    id: 'psych_4',
    section: 'psychometric',
    category: 'personality',
    type: 'likert',
    question: 'I am comfortable working with ambiguous information and making decisions with incomplete data.',
  },
  {
    id: 'psych_5',
    section: 'psychometric',
    category: 'motivation',
    type: 'likert',
    question: 'I consistently follow through on learning goals, even when the material becomes challenging.',
  },

  // Technical Section
  {
    id: 'tech_1',
    section: 'technical',
    category: 'logic',
    type: 'multiple-choice',
    question: 'If A > B and B > C, which statement is definitely true?',
    options: ['A = C', 'A < C', 'A > C', 'Cannot determine'],
    correctAnswer: 2,
  },
  {
    id: 'tech_2',
    section: 'technical',
    category: 'domain',
    type: 'multiple-choice',
    question: 'What is the primary purpose of RegTech (Regulatory Technology)?',
    options: [
      'To replace all human compliance officers',
      'To automate and streamline regulatory compliance processes',
      'To create new financial regulations',
      'To eliminate the need for regulatory oversight'
    ],
    correctAnswer: 1,
  },
  {
    id: 'tech_3',
    section: 'technical',
    category: 'domain',
    type: 'multiple-choice',
    question: 'Which of the following is NOT typically a component of RegTech solutions?',
    options: [
      'Automated reporting systems',
      'Risk monitoring platforms',
      'Social media marketing tools',
      'Compliance data analytics'
    ],
    correctAnswer: 2,
  },
  {
    id: 'tech_4',
    section: 'technical',
    category: 'scenario',
    type: 'scenario',
    question: 'A financial institution needs to monitor transactions for suspicious activity in real-time. Which RegTech approach would be most effective?',
    options: [
      'Monthly manual reviews by compliance staff',
      'AI-powered pattern recognition with real-time alerts',
      'Quarterly external audits',
      'Annual regulatory reporting'
    ],
    correctAnswer: 1,
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_will_1',
    section: 'wiscar',
    dimension: 'will',
    type: 'likert',
    question: 'I have strong persistence when learning new technical concepts, even when they are difficult.',
  },
  {
    id: 'wiscar_will_2',
    section: 'wiscar',
    dimension: 'will',
    type: 'likert',
    question: 'I am willing to invest significant time outside work hours to develop regulatory technology skills.',
  },
  {
    id: 'wiscar_interest_1',
    section: 'wiscar',
    dimension: 'interest',
    type: 'likert',
    question: 'I actively seek out news and updates about regulatory changes in financial services.',
  },
  {
    id: 'wiscar_interest_2',
    section: 'wiscar',
    dimension: 'interest',
    type: 'likert',
    question: 'I find the intersection of technology and regulatory compliance fascinating.',
  },
  {
    id: 'wiscar_skill_1',
    section: 'wiscar',
    dimension: 'skill',
    type: 'likert',
    question: 'I have experience with data analysis tools (Excel, SQL, Python, R).',
  },
  {
    id: 'wiscar_skill_2',
    section: 'wiscar',
    dimension: 'skill',
    type: 'likert',
    question: 'I can effectively communicate complex technical concepts to non-technical stakeholders.',
  },
  {
    id: 'wiscar_cognitive_1',
    section: 'wiscar',
    dimension: 'cognitive',
    type: 'likert',
    question: 'I excel at breaking down complex problems into manageable components.',
  },
  {
    id: 'wiscar_cognitive_2',
    section: 'wiscar',
    dimension: 'cognitive',
    type: 'likert',
    question: 'I can quickly identify patterns and anomalies in large datasets.',
  },
  {
    id: 'wiscar_ability_1',
    section: 'wiscar',
    dimension: 'ability',
    type: 'likert',
    question: 'I adapt quickly to new software tools and technologies.',
  },
  {
    id: 'wiscar_ability_2',
    section: 'wiscar',
    dimension: 'ability',
    type: 'likert',
    question: 'I actively seek feedback and use it to improve my performance.',
  },
  {
    id: 'wiscar_realWorld_1',
    section: 'wiscar',
    dimension: 'realWorld',
    type: 'likert',
    question: 'My career interests align well with the day-to-day responsibilities of a Regulatory Tech Analyst.',
  },
  {
    id: 'wiscar_realWorld_2',
    section: 'wiscar',
    dimension: 'realWorld',
    type: 'likert',
    question: 'I understand the business impact and importance of regulatory compliance in financial services.',
  },
];

export const sectionInfo = {
  psychometric: {
    title: 'Psychological Fit Assessment',
    description: 'Evaluate your interest, personality traits, and motivation for regulatory technology work.',
    estimatedTime: '7-10 minutes',
    icon: '🧠',
  },
  technical: {
    title: 'Technical Aptitude & Domain Knowledge',
    description: 'Test your logical reasoning skills and understanding of regulatory technology concepts.',
    estimatedTime: '8-10 minutes', 
    icon: '⚙️',
  },
  wiscar: {
    title: 'WISCAR Framework Analysis',
    description: 'Comprehensive evaluation across six key readiness dimensions.',
    estimatedTime: '5-7 minutes',
    icon: '📊',
  },
};