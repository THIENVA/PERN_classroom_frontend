export interface Subject {
  id: number;
  code: string;
  name: string;
  description: string;
  departmentId: number;
  department: {
    id: number;
    code: string;
    name: string;
    description: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export const subjects: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    description:
      "An introductory course covering fundamental programming concepts, algorithms, and problem-solving techniques using Python.",
    departmentId: 1,
    department: {
      id: 1,
      code: "CS",
      name: "Computer Science",
      description: "Computer Science department",
    },
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus II",
    description:
      "Continuation of Calculus I, covering integration techniques, sequences and series, and applications of integration.",
    departmentId: 2,
    department: {
      id: 2,
      code: "MATH",
      name: "Mathematics",
      description: "Mathematics department",
    },
  },
  {
    id: 3,
    code: "PHYS150",
    name: "General Physics I",
    description:
      "An introduction to classical mechanics, including kinematics, dynamics, energy, and momentum, with laboratory experiments.",
    departmentId: 3,
    department: {
      id: 3,
      code: "PHYS",
      name: "Physics",
      description: "Physics department",
    },
  },
];
