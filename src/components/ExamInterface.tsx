
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Clock, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  type: 'mcq' | 'short' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: number;
  maxPoints: number;
}

interface ExamInterfaceProps {
  exam: {
    id: number;
    title: string;
    course: string;
    duration: number;
    questions: Question[];
  };
  onSubmit: (answers: Record<number, string | number>) => void;
  onExit: () => void;
}

const ExamInterface: React.FC<ExamInterfaceProps> = ({ exam, onSubmit, onExit }) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [timeRemaining, setTimeRemaining] = useState((exam?.duration || 120) * 60); // Convert to seconds with fallback
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);

  // Ensure exam and questions exist with fallbacks
  const safeExam = exam || { title: "Default Exam", course: "Default Course", duration: 120, questions: [] };
  const safeQuestions = safeExam.questions || [];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
    toast({
      title: "Exam Submitted Successfully!",
      description: "Your answers have been recorded and will be reviewed.",
    });
  };

  // Safe access to current question with fallback
  const currentQ = safeQuestions[currentQuestion];
  const progress = safeQuestions.length > 0 ? ((currentQuestion + 1) / safeQuestions.length) * 100 : 0;

  // If no questions exist, show a message
  if (!currentQ) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-lg text-gray-600">No questions available for this exam.</p>
              <Button onClick={onExit} className="mt-4">
                Back to Exams
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{safeExam.title}</h1>
              <p className="text-gray-600">{safeExam.course}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${timeRemaining <= 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                <Clock className="h-5 w-5" />
                <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
              </div>
              <Button variant="outline" onClick={onExit}>
                Exit Exam
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {safeQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Question {currentQuestion + 1}</span>
              <span className="text-sm font-normal text-gray-600">
                {currentQ.maxPoints || 0} points
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-gray-900">{currentQ.question}</p>
            
            {currentQ.type === 'mcq' && currentQ.options && (
              <RadioGroup
                value={answers[currentQ.id]?.toString() || ''}
                onValueChange={(value) => handleAnswerChange(currentQ.id, parseInt(value))}
              >
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`q${currentQ.id}-${index}`} />
                    <Label htmlFor={`q${currentQ.id}-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            
            {(currentQ.type === 'short' || currentQ.type === 'essay') && (
              <Textarea
                placeholder="Enter your answer here..."
                value={answers[currentQ.id]?.toString() || ''}
                onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                rows={currentQ.type === 'essay' ? 8 : 4}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                disabled={currentQuestion === safeQuestions.length - 1}
                onClick={() => setCurrentQuestion(prev => Math.min(safeQuestions.length - 1, prev + 1))}
              >
                Next
              </Button>
            </div>
            
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setShowSubmitConfirmation(true)}
            >
              Submit Exam
            </Button>
          </div>
          
          {/* Question Navigator */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-gray-600 mb-3">Jump to question:</p>
            <div className="grid grid-cols-10 gap-2">
              {safeQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "default" : "outline"}
                  size="sm"
                  className={`w-10 h-10 ${answers[safeQuestions[index]?.id] ? 'bg-green-100 border-green-300' : ''}`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                  {answers[safeQuestions[index]?.id] && (
                    <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-green-600" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  <span>Submit Exam</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Are you sure you want to submit your exam?</p>
                <div className="text-sm text-gray-600">
                  <p>Answered: {Object.keys(answers).length} of {safeQuestions.length} questions</p>
                  <p>Time remaining: {formatTime(timeRemaining)}</p>
                </div>
                <p className="text-sm text-red-600">
                  Once submitted, you cannot make any changes to your answers.
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowSubmitConfirmation(false)}
                    className="flex-1"
                  >
                    Continue Exam
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Submit Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamInterface;
