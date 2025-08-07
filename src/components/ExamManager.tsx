
import React, { useState } from 'react';
import ExamsPage from './ExamsPage';
import ExamInstructions from './ExamInstructions';
import ExamInterface from './ExamInterface';
import ExamDetailsPage from './ExamDetailsPage';
import ExamResultsPage from './ExamResultsPage';
import InstructorCreateExam from './InstructorCreateExam';
import InstructorManageExams from './InstructorManageExams';
import GradingInterface from './GradingInterface';

interface ExamManagerProps {
  onBack: () => void;
  userRole: 'student' | 'instructor' | 'admin';
  darkMode?: boolean;
}

const ExamManager: React.FC<ExamManagerProps> = ({ onBack, userRole, darkMode = false }) => {
  const [currentView, setCurrentView] = useState<'list' | 'instructions' | 'exam' | 'details' | 'results' | 'create' | 'manage' | 'grading'>('list');
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  // Sample exam data with comprehensive information
  const sampleExam = {
    id: 1,
    title: "Midterm Examination",
    course: "Advanced Mathematics",
    duration: 120, // minutes
    questions: [
      {
        id: 1,
        type: 'mcq' as const,
        question: "What is the derivative of x²?",
        options: ["2x", "x²", "2", "x"],
        correctAnswer: 0,
        maxPoints: 10
      },
      {
        id: 2,
        type: 'mcq' as const,
        question: "What is the integral of 2x?",
        options: ["x²", "x² + C", "2x²", "2x² + C"],
        correctAnswer: 1,
        maxPoints: 10
      },
      {
        id: 3,
        type: 'short' as const,
        question: "Explain the fundamental theorem of calculus in your own words.",
        maxPoints: 20
      }
    ]
  };

  const handleStartExam = (exam: any) => {
    setSelectedExam(exam || sampleExam);
    if (exam.status === 'scheduled' && !exam.isLive) {
      setShowInstructions(true);
    } else {
      setCurrentView('exam');
    }
  };

  const handleViewExamDetails = (exam: any) => {
    setSelectedExam(exam);
    if (exam.status === 'completed') {
      setCurrentView('results');
    } else {
      setCurrentView('details');
    }
  };

  const handleExamSubmit = (answers: Record<number, string | number>) => {
    console.log('Exam submitted with answers:', answers);
    setCurrentView('list');
    setSelectedExam(null);
    setShowInstructions(false);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedExam(null);
    setShowInstructions(false);
  };

  const handleCreateExam = () => {
    setCurrentView('create');
  };

  const handleManageExams = () => {
    setCurrentView('manage');
  };

  if (showInstructions && selectedExam) {
    return (
      <ExamInstructions
        exam={selectedExam}
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        onStartExam={() => {
          setShowInstructions(false);
          setCurrentView('exam');
        }}
        showStartButton={selectedExam.status !== 'completed'}
        showResultsButton={selectedExam.status === 'completed'}
      />
    );
  }

  if (currentView === 'exam' && selectedExam) {
    return (
      <ExamInterface
        exam={selectedExam}
        onSubmit={handleExamSubmit}
        onExit={handleBackToList}
      />
    );
  }

  if (currentView === 'details' && selectedExam) {
    return (
      <ExamDetailsPage
        exam={selectedExam}
        onBack={handleBackToList}
        onStartExam={() => {
          setShowInstructions(true);
        }}
      />
    );
  }

  if (currentView === 'results' && selectedExam) {
    return (
      <ExamResultsPage
        exam={selectedExam}
        onBack={handleBackToList}
      />
    );
  }

  if (currentView === 'create' && (userRole === 'instructor' || userRole === 'admin')) {
    return (
      <InstructorCreateExam
        onBack={handleBackToList}
        onExamCreated={handleBackToList}
      />
    );
  }

  if (currentView === 'manage' && (userRole === 'instructor' || userRole === 'admin')) {
    return (
      <InstructorManageExams
        onBack={handleBackToList}
        onEditExam={(exam) => {
          setSelectedExam(exam);
          setCurrentView('create');
        }}
      />
    );
  }

  if (currentView === 'grading' && (userRole === 'instructor' || userRole === 'admin')) {
    return (
      <GradingInterface
        onBack={handleBackToList}
        darkMode={darkMode}
      />
    );
  }

  return (
    <ExamsPage
      onBack={onBack}
      onStartExam={handleStartExam}
      onViewExamDetails={handleViewExamDetails}
      onCreateExam={handleCreateExam}
      onManageExams={handleManageExams}
      userRole={userRole}
      darkMode={darkMode}
    />
  );
};

export default ExamManager;
