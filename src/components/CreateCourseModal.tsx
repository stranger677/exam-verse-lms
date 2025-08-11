
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateCourseModalProps {
  onCourseCreated: (course: any) => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ onCourseCreated }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [credits, setCredits] = useState('');
  const [semester, setSemester] = useState('');
  const { toast } = useToast();

  const generateCourseCode = () => {
    const prefix = department.substring(0, 4).toUpperCase();
    const number = Math.floor(Math.random() * 900) + 100;
    setCode(`${prefix}${number}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !code || !description || !department || !credits || !semester) {
      toast({
        title: "Error",
        description: "All fields are required.",
        variant: "destructive"
      });
      return;
    }

    const newCourse = {
      id: Date.now(),
      name: title,
      code: code.toUpperCase(),
      instructor: "Dr. Smith", // In real app, get from auth
      department,
      credits: parseInt(credits),
      semester,
      description,
      studentsEnrolled: 0,
      image: "/lovable-uploads/1444a92e-ef94-4f82-abba-e7016e0dfd5d.png"
    };

    onCourseCreated(newCourse);
    
    toast({
      title: "Course Created",
      description: `Course "${title}" (${code}) has been created successfully!`
    });

    // Reset form
    setTitle('');
    setCode('');
    setDescription('');
    setDepartment('');
    setCredits('');
    setSemester('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Advanced Mathematics"
              required
            />
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Select value={department} onValueChange={setDepartment} required>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g., MATH301"
                required
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={generateCourseCode}
              className="mt-6"
              disabled={!department}
            >
              Generate
            </Button>
          </div>

          <div>
            <Label htmlFor="credits">Credits</Label>
            <Select value={credits} onValueChange={setCredits} required>
              <SelectTrigger>
                <SelectValue placeholder="Select credits" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Credit</SelectItem>
                <SelectItem value="2">2 Credits</SelectItem>
                <SelectItem value="3">3 Credits</SelectItem>
                <SelectItem value="4">4 Credits</SelectItem>
                <SelectItem value="5">5 Credits</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="semester">Semester</Label>
            <Select value={semester} onValueChange={setSemester} required>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                <SelectItem value="Spring 2025">Spring 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Course Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the course..."
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Course</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCourseModal;
