// Pfad: data/about.mock.ts

export const SKILLS = [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "SCSS",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "Node.js",
    "Nest.js",
    "Express.js",
    "Spring Boot",
    "GraphQL",
    "Apollo",
    "Redux",
    "Framer Motion",
    "Three.js",
    "WebGL",
    "Webpack",
    "Vite",
    "Docker",
    "AWS",
    "Firebase",
    "Git",
    "Figma",
  ] as const;

  export interface ExperienceItem {
    title: string;
    description: string;
    period: string;
    company?: string;
  }

  export const EXPERIENCE: ExperienceItem[] = [
    {
      title: "Senior JavaScript Engineer",
      description: "I led web development, offering expertise in JavaScript frameworks.",
      period: "2024 - Present",
      company: "Apple",
    },
    {
      title: "Senior React Developer",
      description: "I spearheaded React-based application development, leveraging advanced skills.",
      period: "2019 - 2024",
      company: "Microsoft",
    },
    {
      title: "Freelancer",
      description:
        "I provided web solutions, applying a range of technologies to address client requirements.",
      period: "2010 - 2019",
    },
  ];
