
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, Edit, Save, Calculator, Download, Upload, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GradeManagementPageProps {
  onBack: () => void;
}

interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  course: string;
  quiz: number;
  midterm: number;
  final: number;
  cgpa: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
}

const GradeManagementPage: React.FC<GradeManagementPageProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [showAddGrade, setShowAddGrade] = useState(false);

  const courses: Course[] = [
    { id: '1', name: 'Advanced Mathematics', code: 'MATH301', credits: 4 },
    { id: '2', name: 'Linear Algebra', code: 'MATH201', credits: 3 },
    { id: '3', name: 'Calculus II', code: 'MATH102', credits: 3 }
  ];

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      studentId: '2021001234',
      email: 'john.doe@student.diu.bd',
      course: 'MATH301',
      quiz: 85,
      midterm: 78,
      final: 82,
      cgpa: 3.42
    },
    {
      id: '2',
      name: 'Jane Smith',
      studentId: '2021001235',
      email: 'jane.smith@student.diu.bd',
      course: 'MATH301',
      quiz: 92,
      midterm: 88,
      final: 90,
      cgpa: 3.78
    },
    {
      id: '3',
      name: 'Mike Johnson',
      studentId: '2021001236',
      email: 'mike.johnson@student.diu.bd',
      course: 'MATH301',
      quiz: 76,
      midterm: 82,
      final: 79,
      cgpa: 3.15
    }
  ]);

  const filteredStudents = selectedCourse === 'all'
    ? students
    : students.filter(student => {
        const course = courses.find(c => c.id === selectedCourse);
        return course && student.course === course.code;
      });

  const calculateCGPA = (quiz: number, midterm: number, final: number): number => {
    // Weighted calculation: Quiz 20%, Midterm 30%, Final 50%
    const weighted = (quiz * 0.2) + (midterm * 0.3) + (final * 0.5);
    if (weighted >= 90) return 4.0;
    if (weighted >= 85) return 3.7;
    if (weighted >= 80) return 3.3;
    if (weighted >= 75) return 3.0;
    if (weighted >= 70) return 2.7;
    if (weighted >= 65) return 2.3;
    if (weighted >= 60) return 2.0;
    return 1.0;
  };

  const handleGradeUpdate = (studentId: string, field: 'quiz' | 'midterm' | 'final', value: number) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const updated = { ...student, [field]: value };
        updated.cgpa = calculateCGPA(updated.quiz, updated.midterm, updated.final);
        return updated;
      }
      return student;
    }));
  };

  const handleSaveGrades = () => {
    toast({
      title: "Grades Updated",
      description: "All grades have been saved successfully."
    });
    setEditingStudent(null);
  };

  const exportGrades = () => {
    toast({
      title: "Export Started",
      description: "Grade report is being generated and will download shortly."
    });
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 bg-green-50';
    if (grade >= 80) return 'text-blue-600 bg-blue-50';
    if (grade >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 3.5) return 'text-green-600 bg-green-50';
    if (cgpa >= 3.0) return 'text-blue-600 bg-blue-50';
    if (cgpa >= 2.5) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-blue-100 hover:text-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-4">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Grade Management</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Review and update student grades</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={exportGrades}>
                <Download className="h-4 w-4 mr-2" />
                Export Grades
              </Button>
              <Button onClick={handleSaveGrades} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save All
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Course Filter */}
        <div className="mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Label htmlFor="course-select" className="text-sm font-medium">Filter by Course:</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name} ({course.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grades Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Grades</CardTitle>
            <CardDescription>
              Click on any grade to edit. CGPA is automatically calculated based on weightings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Quiz (20%)</TableHead>
                    <TableHead>Midterm (30%)</TableHead>
                    <TableHead>Final (50%)</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.studentId}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.course}</Badge>
                      </TableCell>
                      <TableCell>
                        {editingStudent === student.id ? (
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={student.quiz}
                            onChange={(e) => handleGradeUpdate(student.id, 'quiz', parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                        ) : (
                          <Badge className={getGradeColor(student.quiz)}>
                            {student.quiz}%
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingStudent === student.id ? (
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={student.midterm}
                            onChange={(e) => handleGradeUpdate(student.id, 'midterm', parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                        ) : (
                          <Badge className={getGradeColor(student.midterm)}>
                            {student.midterm}%
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingStudent === student.id ? (
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={student.final}
                            onChange={(e) => handleGradeUpdate(student.id, 'final', parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                        ) : (
                          <Badge className={getGradeColor(student.final)}>
                            {student.final}%
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getCGPAColor(student.cgpa)}>
                          {student.cgpa.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (editingStudent === student.id) {
                              setEditingStudent(null);
                            } else {
                              setEditingStudent(student.id);
                            }
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          {editingStudent === student.id ? 'Done' : 'Edit'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No students found</h3>
                <p className="text-gray-500">Select a course to view student grades</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Grade Statistics */}
        {filteredStudents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {(filteredStudents.reduce((sum, s) => sum + s.quiz, 0) / filteredStudents.length).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">Average Quiz Score</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {(filteredStudents.reduce((sum, s) => sum + s.midterm, 0) / filteredStudents.length).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">Average Midterm Score</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {(filteredStudents.reduce((sum, s) => sum + s.final, 0) / filteredStudents.length).toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-500">Average Final Score</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {(filteredStudents.reduce((sum, s) => sum + s.cgpa, 0) / filteredStudents.length).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">Average CGPA</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeManagementPage;
