import type { Project } from "@/interfaces";

export const projects: Project[] = [
  {
    title: "Breezili",
    description:
      "Breezili is a social network designed to publish different tourist places, where people can review and rate them. It has a settings panel, user editing and an administration panel where you can add new posts and manage users.",
    githubUrl: "https://github.com/WilliamsMata/breezili",
    projectUrl: "https://breezili.com/",
    imagePath: "/projects/breezili.jpg",
    projectTech: [
      {
        title: "NextJS",
        color: "#00d9fe",
      },
      {
        title: "Tailwind",
        color: "#00bdf7",
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
        title: "tRPC",
        color: "#f87171",
      },
      {
        title: "PostgreSQL",
        color: "#1486e0",
      },
      {
        title: "Redis",
        color: "#ff4278",
      },
    ],
  },
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
    title: "NestJS Products Microservice",
    description:
      "This project is a microservice that provides a RESTful API for managing products, auth, payments and orders. The microservice is built with NestJS and uses MongoDB, Postgresql and mysql as the database.",
    imagePath: "/projects/microservices.png",
    githubUrl:
      "https://github.com/nest-microservices-williams/products-launcher",
    projectUrl:
      "https://github.com/nest-microservices-williams/products-launcher",
    projectTech: [
      {
        title: "NestJS",
        color: "#00d9fe",
      },
      {
        title: "Prisma",
        color: "#60a5fa",
      },
      {
        title: "Docker",
        color: "#0db7ed",
      },
      {
        title: "PostgreSQL",
        color: "#1486e0",
      },
      {
        title: "SQLite",
        color: "#f9bd29",
      },
      {
        title: "MongoDB",
        color: "#00a142",
      },
      {
        title: "NATS",
        color: "#ff0000",
      },
      {
        title: "Stripe",
        color: "#008cdd",
      },
    ],
  },
  {
    title: "Pokedex",
    description:
      "This react native project is a Pokedex that allows users to search for Pokemon by name. The app displays detailed information about each Pokemon, including its abilities, stats, previos and next pokemon.",
    githubUrl: "https://github.com/WilliamsMata/pokedex-app",
    projectUrl: "https://github.com/WilliamsMata/pokedex-app",
    imagePath: "/projects/pokedex.jpg",
    projectTech: [
      {
        title: "React Native",
        color: "#00d9fe",
      },
      {
        title: "React Navigation",
        color: "#00bdf7",
      },
      {
        title: "TanStack Query",
        color: "#f87171",
      },
      {
        title: "react native paper",
        color: "#00bdf7",
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
  {
    title: "Telegram Karma Bot",
    description:
      "Karma Bot is a simple Telegram bot for tracking karma points in a group chat. Users can give each other karma points by responding to messages with +1 or -1. The bot also provides commands for checking a user's current karma score and for seeing a leaderboard of the top users with the most karma. Built with Node.js and MongoDB.",
    imagePath: "/projects/karma-bot.png",
    githubUrl: "https://github.com/WilliamsMata/karma_bot",
    projectUrl: "https://t.me/karma_tg_bot",
    projectTech: [
      {
        title: "NodeJS",
        color: "#00d9fe",
      },
      {
        title: "Telegraf",
        color: "#00bdf7",
      },
      {
        title: "MongoDB",
        color: "#00a142",
      },
    ],
  },
  {
    title: "Telegram Trading bot",
    description:
      "This project is a trading bot that uses the Binance API to buy and sell cryptocurrencies. The bot uses technical analysis to make decisions and send alert to a telegram bot.",
    imagePath: "/projects/trading-bot.png",
    githubUrl: "https://github.com/WilliamsMata/nestjs-trading-bot.git",
    projectUrl: "https://t.me/trading_test_vzla_bot",
    projectTech: [
      {
        title: "NestJS",
        color: "#00d9fe",
      },
      {
        title: "MongoDB",
        color: "#00a142",
      },
      {
        title: "Binance API",
        color: "#f9bd29",
      },
      {
        title: "Telegram",
        color: "#0088cc",
      },
    ],
  },
];
