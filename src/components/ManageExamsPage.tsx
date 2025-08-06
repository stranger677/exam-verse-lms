
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, Edit, Trash2, Eye, Calendar, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ManageExamsPageProps {
  onBack: () => void;
}

interface Exam {
  id: string;
  title: string;
  course: string;
  type: 'quiz' | 'midterm' | 'final';
  date: string;
  duration: number;
  totalMarks: number;
  status: 'scheduled' | 'ongoing' | 'completed';
  studentsEnrolled: number;
  submitted: number;
}

const ManageExamsPage: React.FC<ManageExamsPageProps> = ({ onBack }) => {
  const { toast } = useToast();
  
  const [exams] = useState<Exam[]>([
    {
      id: '1',
      title: 'Midterm Examination',
      course: 'MATH301',
      type: 'midterm',
      date: '2024-06-25T14:00:00',
      duration: 120,
      totalMarks: 100,
      status: 'scheduled',
      studentsEnrolled: 45,
      submitted: 0
    },
    {
      id: '2',
      title: 'Linear Algebra Quiz',
      course: 'MATH201',
      type: 'quiz',
      date: '2024-06-20T10:00:00',
      duration: 60,
      totalMarks: 50,
      status: 'completed',
      studentsEnrolled: 38,
      submitted: 35
    },
    {
      id: '3',
      title: 'Calculus Final Exam',
      course: 'MATH102',
      type: 'final',
      date: '2024-06-30T09:00:00',
      duration: 180,
      totalMarks: 150,
      status: 'scheduled',
      studentsEnrolled: 52,
      submitted: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'bg-yellow-100 text-yellow-800';
      case 'midterm':
        return 'bg-orange-100 text-orange-800';
      case 'final':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteExam = (id: string) => {
    toast({
      title: "Exam Deleted",
      description: "The exam has been deleted successfully.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-blue-100 hover:text-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Manage Exams</h1>
                  <p className="text-sm text-gray-500">View and manage your scheduled exams</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {exams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{exam.title}</h3>
                      <Badge className={getTypeColor(exam.type)}>
                        {exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>Course: {exam.course}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {new Date(exam.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {exam.duration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{exam.submitted}/{exam.studentsEnrolled} submitted</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Total Marks:</span> {exam.totalMarks}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteExam(exam.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageExamsPage;
