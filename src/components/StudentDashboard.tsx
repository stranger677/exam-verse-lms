
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  Users, 
  Clock,
  TrendingUp,
  Award,
  Bell,
  Settings,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  UserPlus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CourseEnrollmentModal from './CourseEnrollmentModal';

interface StudentData {
  id: string;
  name: string;
  studentId: string;
  email: string;
  program: string;
  year: string;
  semester: string;
  gpa: number;
  avatar: string;
}

const StudentDashboard: React.FC = () => {
  const { toast } = useToast();
  
  const [studentData] = useState<StudentData>({
    id: "STU001",
    name: "Alex Johnson",
    studentId: "2021001234",
    email: "alex.johnson@student.diu.bd",
    program: "Computer Science",
    year: "3rd Year",
    semester: "Fall 2024",
    gpa: 3.75,
    avatar: "/api/placeholder/40/40"
  });

  // Available courses for enrollment
  const [availableCourses] = useState([
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
      image: "/lovable-uploads/1444a92e-ef94-4f82-abba-e7016e0dfd5d.png"
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
      image: "/lovable-uploads/1444a92e-ef94-4f82-abba-e7016e0dfd5d.png"
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
      image: "/lovable-uploads/1444a92e-ef94-4f82-abba-e7016e0dfd5d.png"
    }
  ]);

  const [enrolledCourses, setEnrolledCourses] = useState([
    {
      id: 101,
      name: "Data Structures",
      code: "CS201",
      instructor: "Dr. Brown",
      progress: 75,
      grade: "A-",
      nextClass: "Tomorrow 10:00 AM",
      assignments: 3
    },
    {
      id: 102,
      name: "Calculus II",
      code: "MATH202",
      instructor: "Prof. Davis",
      progress: 60,
      grade: "B+",
      nextClass: "Today 2:00 PM",
      assignments: 2
    }
  ]);

  const stats = [
    {
      title: "Enrolled Courses",
      value: enrolledCourses.length.toString(),
      change: "+1 this semester",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Current GPA",
      value: studentData.gpa.toFixed(2),
      change: "+0.15 from last semester",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Pending Assignments",
      value: enrolledCourses.reduce((acc, course) => acc + course.assignments, 0).toString(),
      change: "2 due this week",
      icon: FileText,
      color: "text-orange-600"
    },
    {
      title: "Credits Completed",
      value: "89",
      change: "11 remaining",
      icon: Award,
      color: "text-purple-600"
    }
  ];

  const upcomingClasses = [
    {
      id: 1,
      course: "Data Structures",
      time: "10:00 AM - 11:30 AM",
      room: "Room 305",
      type: "Lecture",
      date: "Today"
    },
    {
      id: 2,
      course: "Calculus II",
      time: "2:00 PM - 3:30 PM", 
      room: "Room 201",
      type: "Tutorial",
      date: "Today"
    },
    {
      id: 3,
      course: "Physics Lab",
      time: "9:00 AM - 12:00 PM",
      room: "Lab 102",
      type: "Laboratory",
      date: "Tomorrow"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "assignment",
      title: "Assignment submitted",
      description: "Data Structures - Assignment 3 submitted successfully",
      time: "2 hours ago",
      status: "completed"
    },
    {
      id: 2,
      type: "grade",
      title: "Grade received", 
      description: "Calculus II - Quiz 2: B+ (87%)",
      time: "1 day ago",
      status: "completed"
    },
    {
      id: 3,
      type: "announcement",
      title: "New announcement",
      description: "Physics Lab - Lab session moved to Room 103",
      time: "2 days ago",
      status: "info"
    }
  ];

  const handleCourseEnrolled = (course: any) => {
    // Check if already enrolled
    const isAlreadyEnrolled = enrolledCourses.some(enrolled => enrolled.code === course.code);
    
    if (isAlreadyEnrolled) {
      toast({
        title: "Already Enrolled",
        description: `You are already enrolled in ${course.name} (${course.code})`,
        variant: "destructive"
      });
      return;
    }

    // Add to enrolled courses
    const newEnrolledCourse = {
      id: Date.now(),
      name: course.name,
      code: course.code,
      instructor: course.instructor,
      progress: 0,
      grade: "Not Graded",
      nextClass: "TBA",
      assignments: 0
    };

    setEnrolledCourses(prev => [...prev, newEnrolledCourse]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Student Portal</h1>
                <p className="text-sm text-gray-500">Welcome back, {studentData.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 text-sm text-gray-600">
                <span>{studentData.program}</span>
                <span>•</span>
                <span>{studentData.year}</span>
                <span>•</span>
                <span>ID: {studentData.studentId}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={studentData.avatar} />
                  <AvatarFallback>{studentData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{studentData.name}</p>
                  <p className="text-xs text-gray-500">GPA: {studentData.gpa}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-4">
          <CourseEnrollmentModal 
            onCourseEnrolled={handleCourseEnrolled}
            availableCourses={availableCourses}
          />
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View Schedule
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Assignments
          </Button>
          <Button variant="outline">
            <Award className="h-4 w-4 mr-2" />
            Grades
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Courses */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Your currently enrolled courses and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.code} • {course.instructor}</p>
                      </div>
                      <Badge variant={course.grade === "Not Graded" ? "outline" : "secondary"}>
                        {course.grade}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                      <span>Next: {course.nextClass}</span>
                      <span>{course.assignments} pending assignments</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Classes */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingClasses.filter(c => c.date === "Today").map((class_item) => (
                    <div key={class_item.id} className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">{class_item.course}</h4>
                      <p className="text-sm text-blue-700">{class_item.time}</p>
                      <p className="text-xs text-blue-600">{class_item.room} • {class_item.type}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {activity.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{activity.title}</h4>
                        <p className="text-xs text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
