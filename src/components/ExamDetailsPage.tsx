
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, MapPin, FileText, User, AlertTriangle } from "lucide-react";

interface ExamDetailsPageProps {
  exam: any;
  onBack: () => void;
  onStartExam?: () => void;
}

const ExamDetailsPage: React.FC<ExamDetailsPageProps> = ({ exam, onBack, onStartExam }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'future': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
              <h1 className="text-xl font-semibold text-gray-900">Exam Details</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-900">{exam.title}</CardTitle>
                <p className="text-lg text-gray-600 mt-2">{exam.courseName || exam.course} ({exam.courseCode})</p>
              </div>
              <Badge className={getStatusColor(exam.status)}>
                {exam.status}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Exam Information</h3>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Date</p>
                    <p className="text-sm text-gray-600">{formatDate(exam.date)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Time & Duration</p>
                    <p className="text-sm text-gray-600">{exam.time} • {exam.duration}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">{exam.location}</p>
                  </div>
                </div>

                {exam.instructor && (
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Instructor</p>
                      <p className="text-sm text-gray-600">{exam.instructor}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Exam Structure</h3>
                
                {exam.totalMarks && (
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Total Marks</p>
                      <p className="text-sm text-gray-600">{exam.totalMarks} points</p>
                    </div>
                  </div>
                )}

                {exam.questions && (
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Number of Questions</p>
                      <p className="text-sm text-gray-600">{exam.questions} questions</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Exam Type</p>
                    <p className="text-sm text-gray-600 capitalize">{exam.type}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Access Information */}
            {(exam.sections?.length > 0 || exam.batches?.length > 0) && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Access Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                  {exam.sections?.length > 0 && (
                    <div>
                      <strong>Sections:</strong> {exam.sections.join(', ')}
                    </div>
                  )}
                  {exam.batches?.length > 0 && (
                    <div>
                      <strong>Batches:</strong> {exam.batches.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Important Instructions
              </h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Ensure you have a stable internet connection</li>
                <li>• Make sure your device is fully charged</li>
                <li>• Close all other applications before starting the exam</li>
                <li>• You cannot pause or restart the exam once started</li>
                <li>• Submit your answers before the time runs out</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={onBack}>
                Back to Exams
              </Button>
              {exam.status === 'scheduled' && onStartExam && (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={onStartExam}
                >
                  {exam.isLive ? 'Start Exam' : 'View Instructions'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExamDetailsPage;
