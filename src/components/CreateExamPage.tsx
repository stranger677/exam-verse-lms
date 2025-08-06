
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, FileText, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateExamPageProps {
  onBack: () => void;
}

const CreateExamPage: React.FC<CreateExamPageProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [examData, setExamData] = useState({
    title: '',
    course: '',
    type: '',
    date: '',
    duration: '',
    instructions: '',
    totalMarks: ''
  });

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Exam Created",
      description: `Exam "${examData.title}" has been created successfully.`
    });
    setExamData({
      title: '',
      course: '',
      type: '',
      date: '',
      duration: '',
      instructions: '',
      totalMarks: ''
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
                  <h1 className="text-lg font-semibold text-gray-900">Create Exam</h1>
                  <p className="text-sm text-gray-500">Schedule a new exam or quiz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card>
          <CardHeader>
            <CardTitle>New Exam Details</CardTitle>
            <CardDescription>Fill in the exam information below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateExam} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Exam Title</Label>
                  <Input
                    id="title"
                    value={examData.title}
                    onChange={(e) => setExamData({...examData, title: e.target.value})}
                    placeholder="e.g., Midterm Examination"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select value={examData.course} onValueChange={(value) => setExamData({...examData, course: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MATH301">Advanced Mathematics (MATH301)</SelectItem>
                      <SelectItem value="MATH201">Linear Algebra (MATH201)</SelectItem>
                      <SelectItem value="MATH102">Calculus II (MATH102)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="type">Exam Type</Label>
                  <Select value={examData.type} onValueChange={(value) => setExamData({...examData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="midterm">Midterm</SelectItem>
                      <SelectItem value="final">Final Exam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Exam Date & Time</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={examData.date}
                    onChange={(e) => setExamData({...examData, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={examData.duration}
                    onChange={(e) => setExamData({...examData, duration: e.target.value})}
                    placeholder="90"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="totalMarks">Total Marks</Label>
                <Input
                  id="totalMarks"
                  type="number"
                  value={examData.totalMarks}
                  onChange={(e) => setExamData({...examData, totalMarks: e.target.value})}
                  placeholder="100"
                  required
                />
              </div>

              <div>
                <Label htmlFor="instructions">Exam Instructions</Label>
                <Textarea
                  id="instructions"
                  value={examData.instructions}
                  onChange={(e) => setExamData({...examData, instructions: e.target.value})}
                  placeholder="Provide detailed instructions for students..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Exam
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateExamPage;
