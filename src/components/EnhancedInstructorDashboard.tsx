
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  FileText, 
  Calendar,
  Clock,
  Plus,
  BarChart3,
  Settings,
  Menu,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  Award,
  BookMarked,
  ClipboardList
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AssignmentManagementPage from './AssignmentManagementPage';
import CourseListPage from './CourseListPage';
import GradeManagementPage from './GradeManagementPage';
import CreateExamPage from './CreateExamPage';
import ManageExamsPage from './ManageExamsPage';

interface InstructorData {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  avatar: string;
  employeeId: string;
}

const EnhancedInstructorDashboard: React.FC = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Mock instructor data - in real app, this would come from authentication
  const [instructorData, setInstructorData] = useState<InstructorData>({
    id: "INS001",
    name: "Dr. Sarah Wilson",
    position: "Associate Professor",
    department: "Mathematics Department",
    email: "sarah.wilson@diu.bd",
    avatar: "/api/placeholder/40/40",
    employeeId: "EMP-2024-001"
  });

  const stats = [
    {
      title: "Active Courses",
      value: "6",
      change: "+2 from last semester",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Total Students",
      value: "245",
      change: "+12 from last month", 
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Pending Assignments",
      value: "18",
      change: "5 due this week",
      icon: FileText,
      color: "text-orange-600"
    },
    {
      title: "Average Grade",
      value: "82.5%",
      change: "+3.2% from last semester",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const quickActions = [
    {
      title: "Create Assignment",
      description: "Add new assignment for your courses",
      icon: ClipboardList,
      action: () => setCurrentPage('assignments'),
      color: "bg-blue-500"
    },
    {
      title: "Create Exam",
      description: "Schedule new exam or quiz",
      icon: FileText,
      action: () => setCurrentPage('create-exam'),
      color: "bg-green-500"
    },
    {
      title: "Manage Exams",
      description: "View and edit existing exams",
      icon: BookMarked,
      action: () => setCurrentPage('manage-exams'),
      color: "bg-purple-500"
    },
    {
      title: "Grade Students",
      description: "Review and update student grades",
      icon: Award,
      action: () => setCurrentPage('grades'),
      color: "bg-orange-500"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "assignment",
      title: "New assignment submitted",
      description: "John Doe submitted Calculus Problem Set 5",
      time: "2 hours ago",
      course: "MATH301"
    },
    {
      id: 2,
      type: "exam",
      title: "Exam scheduled",
      description: "Midterm exam for Linear Algebra scheduled",
      time: "1 day ago",
      course: "MATH201"
    },
    {
      id: 3,
      type: "grade",
      title: "Grades updated",
      description: "Published grades for Quiz 3",
      time: "2 days ago", 
      course: "MATH102"
    }
  ];

  const navigationItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      page: "dashboard"
    },
    {
      title: "My Courses",
      icon: BookOpen,
      page: "courses"
    },
    {
      title: "Assignments",
      icon: ClipboardList,
      page: "assignments"
    },
    {
      title: "Grades",
      icon: Award,
      page: "grades"
    },
    {
      title: "Settings",
      icon: Settings,
      page: "settings"
    }
  ];

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'assignments':
        return <AssignmentManagementPage onBack={() => setCurrentPage('dashboard')} />;
      case 'courses':
        return <CourseListPage user={{ role: 'instructor', name: instructorData.name }} onBack={() => setCurrentPage('dashboard')} />;
      case 'grades':
        return <GradeManagementPage onBack={() => setCurrentPage('dashboard')} />;
      case 'create-exam':
        return <CreateExamPage onBack={() => setCurrentPage('dashboard')} />;
      case 'manage-exams':
        return <ManageExamsPage onBack={() => setCurrentPage('dashboard')} />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Instructor Portal</h1>
                  <p className="text-sm text-gray-500">Welcome back, {instructorData.name}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 text-sm text-gray-600">
                <span>{instructorData.position}</span>
                <span>•</span>
                <span>{instructorData.department}</span>
                <span>•</span>
                <span>ID: {instructorData.employeeId}</span>
              </div>
              <Avatar>
                <AvatarImage src={instructorData.avatar} />
                <AvatarFallback>{instructorData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0 lg:w-16'} transition-all duration-300 bg-white border-r border-gray-200 min-h-screen`}>
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigation(item.page)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    currentPage === item.page 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className={`${!sidebarOpen && 'lg:hidden'}`}>{item.title}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used tools and features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    onClick={action.action}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className={`p-3 rounded-lg ${action.color} mr-4`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-gray-500">{action.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates from your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <Badge variant="secondary">{activity.course}</Badge>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );

  return renderCurrentPage();
};

export default EnhancedInstructorDashboard;
