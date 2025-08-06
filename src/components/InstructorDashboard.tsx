
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Award, 
  Plus,
  Bell,
  User,
  LogOut,
  GraduationCap,
  FileText,
  BarChart3,
  Settings
} from "lucide-react";

interface InstructorDashboardProps {
  user: { role: string; name: string };
  onLogout: () => void;
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ user, onLogout }) => {
  const [activeExams, setActiveExams] = useState([
    { id: 1, title: "Midterm Exam - Mathematics", course: "MATH301", date: "2024-06-15", students: 45, status: "active" },
    { id: 2, title: "Final Exam - Physics", course: "PHYS201", date: "2024-06-20", students: 38, status: "scheduled" },
    { id: 3, title: "Quiz - Chemistry", course: "CHEM101", date: "2024-06-12", students: 52, status: "completed" }
  ]);

  const [recentSubmissions] = useState([
    { id: 1, student: "John Doe", assignment: "Lab Report 3", course: "PHYS201", submittedAt: "2 hours ago", status: "pending" },
    { id: 2, student: "Sarah Johnson", assignment: "Math Problem Set", course: "MATH301", submittedAt: "4 hours ago", status: "graded" },
    { id: 3, student: "Mike Chen", assignment: "Chemistry Quiz", course: "CHEM101", submittedAt: "1 day ago", status: "pending" }
  ]);

  const [courses] = useState([
    { id: 1, name: "Advanced Mathematics", code: "MATH301", students: 45, assignments: 12 },
    { id: 2, name: "Physics Laboratory", code: "PHYS201", students: 38, assignments: 8 },
    { id: 3, name: "General Chemistry", code: "CHEM101", students: 52, assignments: 10 }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Instructor Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">Active courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.students, 0)}</div>
              <p className="text-xs text-muted-foreground">Enrolled students</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentSubmissions.filter(s => s.status === 'pending').length}</div>
              <p className="text-xs text-muted-foreground">Assignments to review</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeExams.filter(e => e.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col justify-center items-center space-y-2 p-4">
              <Plus className="h-6 w-6" />
              <span>Create Exam</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col justify-center items-center space-y-2 p-4">
              <Award className="h-6 w-6" />
              <span>Manage Exams</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col justify-center items-center space-y-2 p-4">
              <FileText className="h-6 w-6" />
              <span>Create Assignment</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col justify-center items-center space-y-2 p-4">
              <BarChart3 className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </div>

        {/* Recent Activity & Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Submissions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Latest assignment submissions from your students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{submission.assignment}</h4>
                    <p className="text-sm text-gray-600">{submission.student} • {submission.course}</p>
                    <p className="text-xs text-gray-500">{submission.submittedAt}</p>
                  </div>
                  <Badge variant={submission.status === 'graded' ? 'default' : 'secondary'}>
                    {submission.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* My Courses */}
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Courses you're currently teaching</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{course.name}</h4>
                    <p className="text-sm text-gray-600">{course.code}</p>
                    <p className="text-xs text-gray-500">{course.students} students • {course.assignments} assignments</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Active Exams */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Exams</CardTitle>
              <CardDescription>Monitor ongoing and scheduled examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeExams.map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{exam.title}</h4>
                      <p className="text-sm text-gray-600">{exam.course}</p>
                      <p className="text-xs text-gray-500">Date: {exam.date} • {exam.students} students</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={exam.status === 'active' ? 'default' : exam.status === 'completed' ? 'secondary' : 'outline'}
                      >
                        {exam.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
