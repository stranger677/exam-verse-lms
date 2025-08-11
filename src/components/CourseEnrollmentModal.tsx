
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CourseEnrollmentModalProps {
  onCourseEnrolled: (course: any) => void;
  availableCourses: any[];
}

const CourseEnrollmentModal: React.FC<CourseEnrollmentModalProps> = ({ onCourseEnrolled, availableCourses }) => {
  const [open, setOpen] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!courseCode) {
      toast({
        title: "Error",
        description: "Please enter a course code.",
        variant: "destructive"
      });
      return;
    }

    // Find course by code (case insensitive)
    const course = availableCourses.find(
      c => c.code.toLowerCase() === courseCode.toLowerCase()
    );

    if (!course) {
      toast({
        title: "Course Not Found",
        description: `No course found with code "${courseCode}". Please check the code and try again.`,
        variant: "destructive"
      });
      return;
    }

    onCourseEnrolled(course);
    
    toast({
      title: "Successfully Enrolled",
      description: `You have been enrolled in ${course.name} (${course.code})!`
    });

    setCourseCode('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Enroll in Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enroll in Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="courseCode">Course Code</Label>
            <Input
              id="courseCode"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
              placeholder="e.g., MATH301, CS101"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the unique course code provided by your instructor
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Available Courses:</h4>
            <div className="space-y-1 text-sm text-blue-700">
              {availableCourses.slice(0, 3).map((course) => (
                <div key={course.id}>
                  <strong>{course.code}</strong> - {course.name}
                </div>
              ))}
              {availableCourses.length > 3 && (
                <div className="text-blue-600">+ {availableCourses.length - 3} more courses available</div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Enroll</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEnrollmentModal;
