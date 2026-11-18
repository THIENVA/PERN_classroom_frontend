export interface Subject {
  id: string;
  courseCode: string;
  name: string;
  department: string;
  description: string;
  createdAt: string;
}

export const subjects: Subject[] = [
  {
    id: "1",
    courseCode: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description:
      "An introductory course covering fundamental programming concepts, algorithms, and problem-solving techniques using Python.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    courseCode: "MATH201",
    name: "Calculus II",
    department: "Mathematics",
    description:
      "Continuation of Calculus I, covering integration techniques, sequences and series, and applications of integration.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    courseCode: "PHYS150",
    name: "General Physics I",
    department: "Physics",
    description:
      "An introduction to classical mechanics, including kinematics, dynamics, energy, and momentum, with laboratory experiments.",
    createdAt: new Date().toISOString(),
  },
];
