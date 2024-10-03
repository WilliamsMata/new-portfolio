export interface Project {
  title: string;
  description: string;
  imagePath: string;
  githubUrl: string;
  projectUrl: string;
  projectTech: ProjectTech[];
}

interface ProjectTech {
  title: string;
  color: string;
}

export const projects: Project[] = [
  {
    title: "Teslo Shop",
    description:
      "This ecommerce project is a replica of Tesla's online store, but focused on selling clothing for men, women, and children. In addition to apparel, the website could offer accessories such as caps, backpacks, and more. The website would have administrative panels to manage inventory, sales, and shipping of products. Customers could make purchases online and use PayPal for secure and reliable payments.",
    githubUrl: "https://github.com/WilliamsMata/ecommerce",
    imagePath: "/projects/teslo-shop.png",
    projectUrl: "https://ecommerce.williamsmata.com/",
    projectTech: [
      {
        title: "NextJS",
        color: "#00d9fe",
      },
      {
        title: "MUI",
        color: "#007ffd",
      },
      {
        title: "Prisma",
        color: "#60a5fa",
      },
      {
        title: "NextAuth",
        color: "#d03be6",
      },
      {
        title: "PayPal",
        color: "#0096d4",
      },
      {
        title: "MySQL",
        color: "#f9bd29",
      },
    ],
  },
  {
    title: "Weather App",
    description:
      "This weather application provides real-time weather information for a user's current location or any specified location. The app displays current temperature, chance of rain, wind speed, and other relevant weather data. Users can also view hourly and daily forecasts.",
    githubUrl: "https://github.com/WilliamsMata/weather-app",
    imagePath: "/projects/weather-app.png",
    projectUrl: "https://weatherapp.williamsmata.com",
    projectTech: [
      {
        title: "SolidJS",
        color: "#00d9fe",
      },
      {
        title: "Tailwind",
        color: "#00bdf7",
      },
      {
        title: "TanStack Query",
        color: "#f87171",
      },
      {
        title: "Solid Router",
        color: "#d03be6",
      },
    ],
  },
  {
    title: "Calendar.io",
    description:
      "This calendar application allows users to create and manage events easily. Users can sign in to the app and add events to their calendar and set reminders. The app provides a variety of views, including daily, weekly, and monthly, making it easy to view upcoming events at a glance.",
    githubUrl: "https://github.com/WilliamsMata/calendar-app",
    imagePath: "/projects/calendario.png",
    projectUrl: "https://calendario.williamsmata.com/",
    projectTech: [
      {
        title: "ReactJS",
        color: "#00d9fe",
      },
      {
        title: "Tailwind",
        color: "#00bdf7",
      },
      {
        title: "Redux",
        color: "#a855f7",
      },
      {
        title: "ExpressJS",
        color: "#d03be6",
      },
      {
        title: "MongoDB",
        color: "#00a142",
      },
    ],
  },
  {
    title: "Rock, paper & Scissors",
    description:
      "This is my first project, the classic rock paper scissors game. The user plays against the computer which randomly chooses an option. The project is an advanced difficulty FrontEnd Mentor challenge.",
    githubUrl: "https://github.com/WilliamsMata/rockpaperscissors",
    imagePath: "/projects/rock-paper-scissors.png",
    projectUrl: "https://rockpaperscissors.williamsmata.com/",
    projectTech: [
      {
        title: "HTML",
        color: "#f8652c",
      },
      {
        title: "SASS",
        color: "#cf6895",
      },
      {
        title: "JavaScript",
        color: "#f8dd2e",
      },
    ],
  },
];
