
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award, Clock, Calendar, TrendingUp, CheckCircle, XCircle } from "lucide-react";

interface ExamResultsPageProps {
  exam: any;
  onBack: () => void;
}

const ExamResultsPage: React.FC<ExamResultsPageProps> = ({ exam, onBack }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
    });
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
      case 'A+':
        return 'text-green-600';
      case 'B':
      case 'B+':
        return 'text-blue-600';
      case 'C':
      case 'C+':
        return 'text-yellow-600';
      case 'D':
      case 'F':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const parseScore = (score: string) => {
    const [obtained, total] = score.split('/').map(Number);
    return { obtained, total, percentage: (obtained / total) * 100 };
  };

  const scoreData = parseScore(exam.score);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={onBack} className="mr-4 hover:bg-blue-100 hover:text-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Exams
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Exam Results</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Result Summary Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-900">{exam.title}</CardTitle>
                <p className="text-lg text-gray-600 mt-2">{exam.courseName || exam.course} ({exam.courseCode})</p>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getGradeColor(exam.grade)}`}>
                  {exam.grade}
                </div>
                <p className="text-sm text-gray-600">Final Grade</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Score */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {scoreData.obtained}/{scoreData.total}
                </div>
                <p className="text-sm text-gray-600">Points Earned</p>
                <div className="mt-2">
                  <Progress value={scoreData.percentage} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{scoreData.percentage.toFixed(1)}%</p>
                </div>
              </div>

              {/* Submission Info */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Submitted</p>
                <p className="text-xs text-gray-600">
                  {formatDate(exam.submittedAt)}
                </p>
              </div>

              {/* Performance */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className={`h-6 w-6 ${scoreData.percentage >= 70 ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <p className="text-sm font-medium text-gray-900">Performance</p>
                <Badge className={scoreData.percentage >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {scoreData.percentage >= 90 ? 'Excellent' :
                   scoreData.percentage >= 80 ? 'Very Good' :
                   scoreData.percentage >= 70 ? 'Good' :
                   scoreData.percentage >= 60 ? 'Fair' : 'Needs Improvement'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Exam Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Exam Date</p>
                  <p className="text-sm text-gray-600">{formatDate(exam.date)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Duration</p>
                  <p className="text-sm text-gray-600">{exam.duration}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Award className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Exam Type</p>
                  <p className="text-sm text-gray-600 capitalize">{exam.type}</p>
                </div>
              </div>

              {exam.instructor && (
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-xs text-gray-600">👨‍🏫</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Instructor</p>
                    <p className="text-sm text-gray-600">{exam.instructor}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Overall Score</span>
                <span className="text-sm text-gray-600">{exam.score}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Percentage</span>
                <span className="text-sm text-gray-600">{scoreData.percentage.toFixed(1)}%</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Grade Point</span>
                <span className="text-sm text-gray-600">{exam.grade}</span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-blue-900 mb-2">Feedback</h4>
                <p className="text-sm text-blue-800">
                  {scoreData.percentage >= 90 
                    ? "Outstanding performance! You have demonstrated excellent understanding of the subject matter."
                    : scoreData.percentage >= 80 
                    ? "Very good work! You show strong grasp of the concepts with room for minor improvements."
                    : scoreData.percentage >= 70 
                    ? "Good effort! Consider reviewing the topics where you lost points for better understanding."
                    : scoreData.percentage >= 60 
                    ? "Fair performance. We recommend additional study and practice to strengthen your understanding."
                    : "Additional effort is needed. Please review the course material and consider seeking help from your instructor."
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-center mt-6">
          <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
            Back to Exams
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamResultsPage;
