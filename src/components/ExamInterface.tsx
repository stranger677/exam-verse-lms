
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Clock, Eye, Camera, CheckCircle, FileText, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ExamInterfaceProps {
  exam: {
    id: number;
    title: string;
    duration: number; // in minutes
    course?: string;
    instructor?: string;
    questions: Array<{
      id: number;
      type: 'mcq' | 'short';
      question: string;
      options?: string[];
      correctAnswer?: number;
      maxPoints: number;
    }>;
  };
  onSubmit: (answers: Record<number, string | number>) => void;
  onExit: () => void;
}

const ExamInterface: React.FC<ExamInterfaceProps> = ({ exam, onSubmit, onExit }) => {
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60); // Convert to seconds
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [violations, setViolations] = useState(0);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showViolationWarning, setShowViolationWarning] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !examSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !examSubmitted) {
      handleAutoSubmit();
    }
  }, [timeLeft, examSubmitted]);

  // Anti-cheating measures
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !examSubmitted) {
        setViolations(prev => prev + 1);
        setShowViolationWarning(true);
      }
    };

    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
      alert("Right-click is disabled during the exam.");
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'a')) {
        e.preventDefault();
        alert("Copy/Paste is disabled during the exam.");
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [examSubmitted]);

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
    setShowSubmitModal(true);
  };

  const confirmSubmit = () => {
    setExamSubmitted(true);
    setShowSubmitModal(false);
    onSubmit(answers);
  };

  const handleAutoSubmit = () => {
    setExamSubmitted(true);
    onSubmit(answers);
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const getTotalQuestions = () => {
    return exam.questions.length;
  };

  if (examSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600 mb-2">Exam Submitted Successfully!</CardTitle>
            <p className="text-gray-600">Your responses have been recorded and saved securely.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Exam Details</span>
                </div>
                <div className="text-sm space-y-1">
                  <div>Title: {exam.title}</div>
                  <div>Course: {exam.course}</div>
                  <div>Duration: {exam.duration} minutes</div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Submission Summary</span>
                </div>
                <div className="text-sm space-y-1">
                  <div>Questions Answered: {getAnsweredCount()} / {getTotalQuestions()}</div>
                  <div>Submitted At: {new Date().toLocaleString()}</div>
                  <div>Status: <Badge className="bg-green-100 text-green-800">Submitted</Badge></div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">What happens next?</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Multiple choice questions are automatically graded</li>
                <li>• Short answer questions will be reviewed by your instructor</li>
                <li>• You will receive your results within 3-5 business days</li>
                <li>• Check your grades section for updates</li>
              </ul>
            </div>
            
            <Button onClick={onExit} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}>
      {/* Fixed Header with Timer */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-lg border-b-2 border-blue-200 z-50 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{exam.title}</h1>
                {exam.course && <p className="text-sm text-gray-600">{exam.course}</p>}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Question {currentQuestion + 1} of {exam.questions.length}</span>
                  <span>•</span>
                  <span>Answered: {getAnsweredCount()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Monitoring Indicator */}
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-1 rounded-full">
              <Camera className="h-5 w-5" />
              <span className="text-sm font-medium">Proctored</span>
            </div>
            
            {/* Timer */}
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-lg ${
              timeLeft < 300 ? 'bg-red-100 text-red-800 animate-pulse' : 
              timeLeft < 600 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
            }`}>
              <Clock className="h-5 w-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <Progress 
            value={(getAnsweredCount() / getTotalQuestions()) * 100} 
            className="h-2"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Progress: {getAnsweredCount()}/{getTotalQuestions()} questions</span>
            <span>{Math.round((getAnsweredCount() / getTotalQuestions()) * 100)}% complete</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-xl">
                <div className="flex items-center justify-between">
                  <span>Question {currentQuestion + 1}</span>
                  <Badge variant="outline" className="text-blue-600">
                    {exam.questions[currentQuestion].maxPoints} points
                  </Badge>
                </div>
              </CardTitle>
              <p className="text-lg text-gray-800 mt-4 leading-relaxed">
                {exam.questions[currentQuestion].question}
              </p>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              {exam.questions[currentQuestion].type === 'mcq' ? (
                <div className="space-y-3">
                  <RadioGroup
                    value={answers[exam.questions[currentQuestion].id]?.toString() || ''}
                    onValueChange={(value) => handleAnswerChange(exam.questions[currentQuestion].id, parseInt(value))}
                  >
                    {exam.questions[currentQuestion].options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1 text-base">
                          <span className="font-medium text-gray-700 mr-2">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <div className="space-y-3">
                  <Label className="text-base font-medium">Your Answer:</Label>
                  <Textarea
                    placeholder="Type your detailed answer here. Be specific and provide examples where applicable..."
                    value={answers[exam.questions[currentQuestion].id] as string || ''}
                    onChange={(e) => handleAnswerChange(exam.questions[currentQuestion].id, e.target.value)}
                    className="min-h-40 text-base leading-relaxed"
                  />
                  <div className="text-xs text-gray-500">
                    Character count: {(answers[exam.questions[currentQuestion].id] as string || '').length}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fixed Footer with Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-200 shadow-lg p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Progress: {getAnsweredCount()} / {getTotalQuestions()} questions
            </div>
            <div className="text-xs text-gray-500">
              {answers[exam.questions[currentQuestion].id] ? (
                <Badge className="bg-green-100 text-green-700">Answered</Badge>
              ) : (
                <Badge variant="outline">Not answered</Badge>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              size="lg"
            >
              Previous
            </Button>
            
            {currentQuestion < exam.questions.length - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Submit Exam
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Violation Warning Modal */}
      <Dialog open={showViolationWarning} onOpenChange={setShowViolationWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Exam Violation Warning</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>You have left the exam window. This may be recorded as a violation.</p>
            <p className="text-sm text-gray-600">
              Violations: {violations}/3
            </p>
            {violations >= 3 && (
              <p className="text-red-600 font-semibold">
                Multiple violations detected. Your exam session may be terminated.
              </p>
            )}
            <Button 
              onClick={() => setShowViolationWarning(false)}
              className="w-full"
            >
              Continue Exam
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Submit Confirmation Modal */}
      <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Submit Exam?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-lg font-medium">Are you sure you want to submit your exam?</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Questions Answered:</span>
                <span>{getAnsweredCount()} out of {getTotalQuestions()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time Remaining:</span>
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Completion:</span>
                <span>{Math.round((getAnsweredCount() / getTotalQuestions()) * 100)}%</span>
              </div>
            </div>
            
            <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
              <p className="text-sm text-red-700 font-medium">
                ⚠️ Warning: You cannot change your answers after submission.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowSubmitModal(false)} className="flex-1" size="lg">
                Continue Exam
              </Button>
              <Button onClick={confirmSubmit} className="flex-1 bg-green-600 hover:bg-green-700" size="lg">
                Submit Final Answers
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamInterface;

            </p>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowSubmitModal(false)} className="flex-1">
                Continue Exam
              </Button>
              <Button onClick={confirmSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                Submit Final Answers
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamInterface;
