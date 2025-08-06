
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, ChevronLeft, GraduationCap, Users, Upload, Plus, Trash2, Edit, FileText, Video, Music, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InstructorCourseListPageProps {
  user: { role: string; name: string };
  onBack: () => void;
}

interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  enrollmentDate: string;
}

interface CourseMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'video' | 'audio' | 'image';
  fileName: string;
  uploadDate: string;
  size: string;
}

const InstructorCourseListPage: React.FC<InstructorCourseListPageProps> = ({ user, onBack }) => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showUploadMaterial, setShowUploadMaterial] = useState(false);
  const [newStudentEmail, setNewStudentEmail] = useState('');

  const courses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      code: "MATH301",
      instructor: "Dr. Smith",
      department: "Mathematics",
      credits: 4,
      semester: "Fall 2024",
      description: "A comprehensive study of advanced mathematical concepts including calculus, differential equations, and linear algebra.",
      studentsEnrolled: 42,
      image: "/api/placeholder/400/200?text=Mathematics"
    },
    {
      id: 2,
      name: "Computer Science Fundamentals",
      code: "CS101",
      instructor: "Prof. Johnson",
      department: "Computer Science",
      credits: 3,
      semester: "Fall 2024",
      description: "Introduction to core computer science concepts, data structures, and basic programming paradigms.",
      studentsEnrolled: 68,
      image: "/api/placeholder/400/200?text=CS"
    },
    {
      id: 3,
      name: "Physics Laboratory",
      code: "PHYS201",
      instructor: "Dr. Wilson",
      department: "Physics",
      credits: 2,
      semester: "Fall 2024",
      description: "Practical laboratory course covering fundamental physics experiments and data analysis techniques.",
      studentsEnrolled: 35,
      image: "/api/placeholder/400/200?text=Physics"
    }
  ];

  const [courseStudents, setCourseStudents] = useState<{[key: number]: Student[]}>({
    1: [
      { id: '1', name: 'John Doe', studentId: '2021001234', email: 'john.doe@student.diu.bd', enrollmentDate: '2024-01-15' },
      { id: '2', name: 'Jane Smith', studentId: '2021001235', email: 'jane.smith@student.diu.bd', enrollmentDate: '2024-01-15' },
      { id: '3', name: 'Mike Johnson', studentId: '2021001236', email: 'mike.johnson@student.diu.bd', enrollmentDate: '2024-01-16' }
    ],
    2: [
      { id: '4', name: 'Sarah Wilson', studentId: '2021001237', email: 'sarah.wilson@student.diu.bd', enrollmentDate: '2024-01-15' },
      { id: '5', name: 'Tom Brown', studentId: '2021001238', email: 'tom.brown@student.diu.bd', enrollmentDate: '2024-01-17' }
    ],
    3: [
      { id: '6', name: 'Emily Davis', studentId: '2021001239', email: 'emily.davis@student.diu.bd', enrollmentDate: '2024-01-18' }
    ]
  });

  const [courseMaterials, setCourseMaterials] = useState<{[key: number]: CourseMaterial[]}>({
    1: [
      { id: '1', title: 'Lecture 1: Introduction', type: 'pdf', fileName: 'lecture1.pdf', uploadDate: '2024-01-20', size: '2.3 MB' },
      { id: '2', title: 'Tutorial Video 1', type: 'video', fileName: 'tutorial1.mp4', uploadDate: '2024-01-21', size: '45.2 MB' }
    ],
    2: [
      { id: '3', title: 'Programming Basics', type: 'doc', fileName: 'programming_basics.docx', uploadDate: '2024-01-22', size: '1.8 MB' }
    ],
    3: []
  });

  const handleEnrollStudent = () => {
    if (!newStudentEmail || !selectedCourse) return;
    
    const newStudent: Student = {
      id: Date.now().toString(),
      name: newStudentEmail.split('@')[0].replace('.', ' '),
      studentId: `2024${Math.floor(Math.random() * 1000000)}`,
      email: newStudentEmail,
      enrollmentDate: new Date().toISOString().split('T')[0]
    };

    setCourseStudents(prev => ({
      ...prev,
      [selectedCourse.id]: [...(prev[selectedCourse.id] || []), newStudent]
    }));

    toast({
      title: "Student Enrolled",
      description: `${newStudent.name} has been enrolled in ${selectedCourse.code}`
    });

    setNewStudentEmail('');
    setShowAddStudent(false);
  };

  const handleRemoveStudent = (studentId: string) => {
    if (!selectedCourse) return;

    setCourseStudents(prev => ({
      ...prev,
      [selectedCourse.id]: prev[selectedCourse.id]?.filter(s => s.id !== studentId) || []
    }));

    toast({
      title: "Student Removed",
      description: "Student has been removed from the course"
    });
  };

  const handleUploadMaterial = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedCourse) return;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const file = formData.get('file') as File;

    if (!title || !file) return;

    const getFileType = (fileName: string): CourseMaterial['type'] => {
      const ext = fileName.split('.').pop()?.toLowerCase();
      if (['pdf'].includes(ext || '')) return 'pdf';
      if (['doc', 'docx'].includes(ext || '')) return 'doc';
      if (['mp4', 'avi', 'mov'].includes(ext || '')) return 'video';
      if (['mp3', 'wav'].includes(ext || '')) return 'audio';
      if (['jpg', 'png', 'gif'].includes(ext || '')) return 'image';
      return 'doc';
    };

    const newMaterial: CourseMaterial = {
      id: Date.now().toString(),
      title,
      type: getFileType(file.name),
      fileName: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
    };

    setCourseMaterials(prev => ({
      ...prev,
      [selectedCourse.id]: [...(prev[selectedCourse.id] || []), newMaterial]
    }));

    toast({
      title: "Material Uploaded",
      description: `${title} has been uploaded successfully`
    });

    form.reset();
    setShowUploadMaterial(false);
  };

  const getFileIcon = (type: CourseMaterial['type']) => {
    switch (type) {
      case 'pdf':
      case 'doc':
        return FileText;
      case 'video':
        return Video;
      case 'audio':
        return Music;
      case 'image':
        return Image;
      default:
        return FileText;
    }
  };

  if (selectedCourse) {
    const students = courseStudents[selectedCourse.id] || [];
    const materials = courseMaterials[selectedCourse.id] || [];

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-50 shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedCourse(null)}
                  className="hover:bg-blue-100"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Back to Courses
                </Button>
                <div className="hidden md:flex items-center space-x-3">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">{selectedCourse.name}</h1>
                    <p className="text-sm text-gray-500">{selectedCourse.code} - Course Management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="students" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="students">Students ({students.length})</TabsTrigger>
              <TabsTrigger value="materials">Materials ({materials.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Enrolled Students</CardTitle>
                      <CardDescription>Manage student enrollment for this course</CardDescription>
                    </div>
                    <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Student
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Student to Course</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="email">Student Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="student@diu.bd"
                              value={newStudentEmail}
                              onChange={(e) => setNewStudentEmail(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setShowAddStudent(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEnrollStudent}>
                              Enroll Student
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-gray-500">ID: {student.studentId}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            Enrolled: {student.enrollmentDate}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveStudent(student.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {students.length === 0 && (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No students enrolled</h3>
                        <p className="text-gray-500">Add students to this course to get started</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Course Materials</CardTitle>
                      <CardDescription>Upload and manage course materials for students</CardDescription>
                    </div>
                    <Dialog open={showUploadMaterial} onOpenChange={setShowUploadMaterial}>
                      <DialogTrigger asChild>
                        <Button>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Material
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload Course Material</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleUploadMaterial} className="space-y-4">
                          <div>
                            <Label htmlFor="title">Material Title</Label>
                            <Input
                              id="title"
                              name="title"
                              placeholder="e.g., Lecture 1: Introduction"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="file">File</Label>
                            <Input
                              id="file"
                              name="file"
                              type="file"
                              accept=".pdf,.doc,.docx,.mp4,.avi,.mov,.mp3,.wav,.jpg,.png,.gif"
                              required
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setShowUploadMaterial(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">
                              Upload
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {materials.map((material) => {
                      const FileIcon = getFileIcon(material.type);
                      return (
                        <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{material.title}</h4>
                              <p className="text-sm text-gray-500">{material.fileName}</p>
                              <p className="text-sm text-gray-500">
                                Uploaded: {material.uploadDate} • Size: {material.size}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="capitalize">
                              {material.type}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}

                    {materials.length === 0 && (
                      <div className="text-center py-8">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No materials uploaded</h3>
                        <p className="text-gray-500">Upload course materials for your students</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-50 shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="hover:bg-blue-100"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to Dashboard
              </Button>
              <div className="hidden md:flex items-center space-x-3">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">My Courses</h1>
                  <p className="text-sm text-gray-500">Manage your courses and students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="overflow-hidden transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>{course.code}</CardDescription>
                  </div>
                  <Badge variant="secondary">{course.studentsEnrolled} students</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{course.instructor.split(' ')[0][0]}{course.instructor.split(' ')[1]?.[0] || ''}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{course.instructor}</p>
                    <p className="text-xs text-gray-500">{course.department}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                  <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500">
                    <div>Credits: {course.credits}</div>
                    <div>Semester: {course.semester}</div>
                  </div>
                </div>
                
                <Button className="w-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Manage Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InstructorCourseListPage;
