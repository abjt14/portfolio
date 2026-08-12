export type WorkExperienceEntry = {
  company: string;
  role: string;
  location: string;
  date: string;
  technologies: string[];
};

export type EducationEntry = {
  school: string;
  degree: string;
  course: string;
  location: string;
  date: string;
};

export type ResumeData = {
  experience: WorkExperienceEntry[];
  education: EducationEntry[];
};

export const data: ResumeData = {
  experience: [
    {
      company: "Aave Labs",
      role: "Senior Design Engineer",
      location: "Remote",
      date: "2024 (current)",
      technologies: ["Next", "Motion", "WebGL", "Web3"],
    },
    {
      company: "AvenueHQ",
      role: "Junior Full Stack Engineer",
      location: "Vancouver, Canada",
      date: "2022",
      technologies: ["React", "Laravel", "MySQL", "Wordpress"],
    },
    {
      company: "Outlined.co",
      role: "Software Engineer",
      location: "Bengaluru, India",
      date: "2019 - 2020",
      technologies: ["Laravel", "MySQL", "FabricJS", "Shell Scripting"],
    },
  ],
  education: [
    {
      school: "Langara College",
      degree: "PG Diploma",
      course: "Web and Mobile App Design and Development",
      location: "Vancouver, Canada",
      date: "2020 - 2022",
    },
    {
      school: "Manipal University Jaipur",
      degree: "Bachelor of Technology",
      course: "Information Technology",
      location: "Jaipur, India",
      date: "2015 - 2019",
    },
  ],
};
