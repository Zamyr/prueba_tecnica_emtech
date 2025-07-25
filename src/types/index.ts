// Tipos principales de la aplicación

export interface Student {
  id: string;
  name: string;
  email: string;
  age: number;
  educationLevel: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'html' | 'css' | 'javascript' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AssessmentAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  answers: AssessmentAnswer[];
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: Date;
  recommendations: CourseRecommendation[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops';
  duration: string;
  topics: string[];
  prerequisites: string[];
}

export interface CourseRecommendation {
  course: Course;
  reason: string;
  priority: number;
}

export interface StudentRegistration {
  name: string;
  email: string;
  age: number;
  educationLevel: 'beginner' | 'intermediate' | 'advanced';
}
