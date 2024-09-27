export interface Skill {
  title: string;
  skillsData: SkillData[];
}

export interface SkillData {
  title: string;
  iconPath: string;
  url: string;
  description: string;
  needInvertColor?: boolean;
}

export const skills: Skill[] = [
  {
    title: "Languages",
    skillsData: [
      {
        title: "HTML",
        iconPath: "/icons/html5.svg",
        url: "https://developer.mozilla.org/en-US/docs/Glossary/HTML",
        description:
          "HTML (Hypertext Markup Language) is a markup language used to create web pages. It allows you to define the structure and content of a web page using tags and attributes that indicate how elements should be displayed in a web browser. HTML is the foundation of most web pages on the internet and is used in conjunction with other languages like CSS and JavaScript to create dynamic and interactive websites. The latest versions of HTML include new features such as multimedia, graphics, and animations to enhance the user experience on the web.",
      },
      {
        title: "CSS",
        iconPath: "/icons/css.svg",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        description:
          "CSS (Cascading Style Sheets) is a style sheet language used to describe the presentation of a web page. It allows you to control the layout, typography, color, and other visual aspects of a web page independently of the content. CSS is used in conjunction with HTML to create visually appealing and responsive web pages. It enables web developers to create consistent and efficient designs for web pages, and also allows for easy maintenance and updating of web page styles. With CSS, you can create complex layouts and dynamic effects, making it an essential tool for creating modern web design.",
      },
      {
        title: "JavaScript",
        iconPath: "/icons/javascript.svg",
        url: "https://developer.mozilla.org/en-US/docs/Web/javascript",
        description:
          "JavaScript is a high-level, object-oriented programming language used to create interactive and dynamic websites. It is one of the three core technologies used to build the web along with HTML and CSS. JavaScript allows web developers to add interactivity and behavior to web pages, such as responding to user input, updating content dynamically, and creating animations and visual effects. It is also used for building web applications, server-side programming, and game development.",
      },
      {
        title: "TypeScript",
        iconPath: "/icons/typescript.svg",
        url: "https://www.typescriptlang.org/",
        description:
          "TypeScript is a superset of JavaScript that adds optional static typing to the language. It is designed to make large-scale JavaScript applications more manageable and maintainable. TypeScript allows you to catch errors and bugs at compile time rather than at runtime, which can help developers write more reliable code. It also supports features like classes, interfaces, and modules, which make it easier to write object-oriented code and promote code reuse. TypeScript can be compiled into plain JavaScript, so it can run on any browser or device that supports JavaScript. ",
      },
      {
        title: "SQL",
        iconPath: "/icons/sql.svg",
        url: "https://en.wikipedia.org/wiki/SQL",
        description:
          "SQL (Structured Query Language) is a standard language used to manage and manipulate relational databases. It allows you to create, modify, and query databases and their tables, which store data in a structured way. SQL is used to perform various operations on databases, including inserting, updating, and deleting data, as well as retrieving data from one or more tables using complex queries. SQL is essential for managing data in almost all types of web applications and is widely used in industries such as finance, healthcare, and e-commerce. There are various implementations of SQL, including MySQL, PostgreSQL, Oracle, and Microsoft SQL Server.",
      },
    ],
  },

  {
    title: "Frameworks",
    skillsData: [
      {
        title: "React",
        iconPath: "/icons/react.svg",
        url: "https://react.dev/",
        description:
          "ReactJS is a popular JavaScript library used for building user interfaces. It was developed by Facebook and has gained widespread use in the web development community. React allows developers to create reusable UI components and manage the state of these components in a predictable and efficient way. It uses a virtual DOM (Document Object Model) to update and render changes to the UI, which makes it faster and more efficient than traditional methods.",
      },
      {
        title: "Next",
        iconPath: "/icons/next.svg",
        url: "https://nextjs.org/",
        description:
          "Next.js is a popular open-source JavaScript framework used for building server-side rendered (SSR) and statically generated (SSG) React applications. It provides a set of tools and features that simplify the development of complex web applications, including automatic code splitting, server-side rendering, and static site generation.",
        needInvertColor: true,
      },
      {
        title: "Solid",
        iconPath: "/icons/solid.svg",
        url: "https://www.solidjs.com/",
        description:
          "SolidJS is a modern JavaScript library for building reactive user interfaces. It is designed to be simple, fast, and scalable, and provides a small API surface and lightweight rendering engine. SolidJS uses a reactive programming model, which means that the UI automatically updates in response to changes in the application's state. Unlike other popular frontend libraries, SolidJS does not use a virtual DOM, but instead relies on a lightweight, incremental DOM-based approach to rendering, which improves performance and reduces memory usage.",
      },
      {
        title: "Astro",
        iconPath: "/icons/astro.svg",
        url: "https://astro.build/",
        description:
          "Astro is the all-in-one web framework designed for speed. Pull your content from anywhere and deploy everywhere, all powered by your favorite UI components and libraries. Astro optimizes your website like no other framework can. Leverage Astro's unique zero-JS frontend architecture to unlock higher conversion rates with better SEO.",
      },
      {
        title: "Nest",
        iconPath: "/icons/nest.svg",
        url: "https://nestjs.com/",
        description:
          "NestJS is a backend framework for building scalable and efficient server-side applications with Node.js. It is built on top of Express.js and uses TypeScript to provide a robust and modular architecture for developing complex web applications. NestJS provides a set of features and tools, such as dependency injection, middleware, and built-in support for GraphQL, that make it easier to build scalable and maintainable web applications.",
      },
      {
        title: "Express",
        iconPath: "/icons/express.svg",
        url: "https://expressjs.com/",
        description:
          "ExpressJS is a popular backend web application framework for Node.js. It provides a set of features and tools for building web applications and APIs, such as routing, middleware, and HTTP utilities. With ExpressJS, developers can create robust and scalable web applications with minimal code. It also supports various templating engines, including EJS and Pug, for generating dynamic HTML pages. It is known for its simplicity, flexibility, and ease of use.",
        needInvertColor: true,
      },
      {
        title: "Tailwind",
        iconPath: "/icons/tailwind.svg",
        url: "https://tailwindcss.com/",
        description:
          "Tailwind CSS is a popular utility-first CSS framework used to build modern and responsive user interfaces. It provides a set of pre-defined CSS classes that can be used to style HTML elements and create complex layouts without writing custom CSS. With Tailwind CSS, developers can quickly and easily create consistent and visually appealing designs for web applications. It also includes a responsive grid system and support for customizing themes and color palettes. ",
      },
      {
        title: "Material UI",
        iconPath: "/icons/mui.svg",
        url: "https://mui.com/",
        description:
          "Material UI is a popular React-based frontend framework that provides a set of pre-built React components and styles based on Google's Material Design guidelines. It allows developers to quickly and easily create modern and responsive user interfaces with minimal effort. Material UI includes a variety of components such as buttons, forms, menus, and icons, as well as a powerful theming system that allows for easy customization of the look and feel of the application.",
      },
    ],
  },

  {
    title: "Tools",
    skillsData: [
      {
        title: "Docker",
        iconPath: "/icons/docker.svg",
        url: "https://www.docker.com/",
        description:
          "Docker is an open-source platform that allows developers to create, deploy, and run applications in isolated containers. It provides a lightweight and portable environment for running applications, which eliminates many of the compatibility issues that can arise when running applications on different systems. Docker containers can be easily moved between different environments, such as development, testing, and production, without requiring any changes to the application code. Docker also provides a powerful set of tools for managing and scaling containers, including Docker Compose and Kubernetes.",
      },
      {
        title: "Figma",
        iconPath: "/icons/figma.svg",
        url: "https://www.figma.com/",
        description:
          "Figma is a cloud-based design and prototyping tool used for creating user interfaces, web designs, and mobile applications. It provides a collaborative platform that allows multiple designers to work on the same project in real-time, which makes it easier to collaborate and share feedback. Figma includes a variety of features such as vector networks, design libraries, and interactive components, which makes it easier to create and manage complex designs. It also allows developers to inspect designs, generate code snippets, and export assets for development.",
      },
      {
        title: "Firebase",
        iconPath: "/icons/firebase.svg",
        url: "https://firebase.google.com/",
        description:
          "Firebase is a mobile and web application development platform, owned by Google, that provides a set of tools and services for building, managing, and growing web and mobile applications. Firebase includes a variety of features such as real-time database, cloud storage, authentication, hosting, and analytics, which helps developers to quickly create, launch, and scale their applications without having to manage infrastructure. Firebase also provides SDKs and APIs for various platforms, including web, iOS, and Android, allowing developers to easily integrate Firebase services into their applications.",
      },
      {
        title: "Git",
        iconPath: "/icons/git.svg",
        url: "https://git-scm.com/",
        description:
          "Git is a popular version control system that helps developers to manage changes to their codebase over time. It allows developers to track changes to their code, collaborate with other developers, and revert changes when necessary. Git provides a set of commands and tools for creating, branching, merging, and managing code repositories, both locally and remotely. It also provides a powerful set of features for resolving conflicts and managing code reviews. Git is widely used in the software development community and is an essential tool for managing codebases of all sizes.",
      },
      {
        title: "Jest",
        iconPath: "/icons/jest.svg",
        url: "https://jestjs.io/",
        description:
          "Jest is a popular JavaScript testing framework used to test JavaScript code, particularly for React applications. It is developed by Facebook and provides a powerful set of features for testing code, including a test runner, assertion library, and mocking capabilities. Jest allows developers to write tests in a simple and intuitive way, using a combination of test suites, test cases, and assertions. It also provides tools for code coverage analysis, parallel testing, and snapshot testing.",
      },
      {
        title: "MongoDB",
        iconPath: "/icons/mongo.svg",
        url: "https://www.mongodb.com/",
        description:
          "MongoDB is a popular NoSQL database that allows developers to store and manage unstructured data in a flexible and scalable way. It uses a document-based data model, which means that data is stored in JSON-like documents that can have different structures and fields. MongoDB provides a set of features and tools for managing data, including CRUD (Create, Read, Update, Delete) operations, aggregation, indexing, and querying. It also supports various advanced features such as replication, sharding, and scaling.",
      },
      {
        title: "MySQL",
        iconPath: "/icons/mysql.svg",
        url: "https://www.mysql.com/",
        description:
          "MySQL is a popular open-source relational database management system that uses SQL (Structured Query Language) for managing and manipulating data. It provides a reliable and scalable platform for storing and retrieving data in a structured way. MySQL supports various features such as indexing, transactions, and replication, which make it suitable for a wide range of applications. It is widely used in the web development community, particularly for building web applications and data-driven websites.",
        needInvertColor: true,
      },
      {
        title: "NextAuth",
        iconPath: "/icons/next-auth.png",
        url: "https://next-auth.js.org/",
        description:
          "NextAuth.js is an open-source authentication library for Next.js applications. It provides a simple and flexible way to implement various authentication providers, such as Google, Facebook, and GitHub, as well as custom authentication strategies. NextAuth.js allows developers to easily add authentication to their Next.js applications without having to manage the complexities of authentication protocols and security concerns. It also provides a set of features such as session management, CSRF protection, and JWT signing.",
      },
      {
        title: "Playwright",
        iconPath: "/icons/playwright.svg",
        url: "https://playwright.dev/",
        description:
          "Playwright is a Node.js library to automate Chromium, Firefox, and WebKit with a single API. It enables cross-browser web automation that is ever-green, capable, reliable, and fast. Playwright is used for web testing, web scraping, and automating browser tasks. It supports multiple languages, including JavaScript, TypeScript, Python, C#, and Java. Playwright runs headless by default but can be configured to run full (non-headless) browsers. It can generate screenshots and PDFs of pages and has robust support for user interactions, including clicks, types, and scrolls.",
      },
      {
        title: "PostgreSQL",
        iconPath: "/icons/postgresql.svg",
        url: "https://www.postgresql.org/",
        description:
          "PostgreSQL, also known as Postgres, is a powerful, open-source object-relational database system that uses and extends the SQL language. It offers many features that safely store and scale complex data workloads. PostgreSQL is known for its robust architecture, reliability, and data integrity. It's ACID-compliant and has powerful add-ons such as the popular PostGIS geospatial database extender. PostgreSQL is used as a primary database for many web applications as well as mobile and analytics applications. It's highly extensible, allowing users to define their own data types, index types, functional languages, and more.",
      },
      {
        title: "Prisma",
        iconPath: "/icons/prisma.svg",
        url: "https://www.prisma.io/",
        description:
          "Prisma is a modern database toolkit and ORM (Object-Relational Mapping) for building database-driven applications. It provides a type-safe and efficient way to communicate with databases, and supports various databases such as MySQL, PostgreSQL, SQLite and MongoDB. Prisma allows developers to model their database schema using a declarative syntax, and generates type-safe and efficient database queries based on the schema. It also provides a set of tools for database migrations, schema management, and data modeling.",
        needInvertColor: true,
      },
      {
        title: "React Router",
        iconPath: "/icons/react-router.svg",
        url: "https://reactrouter.com/en/main",
        description:
          "React Router is a popular library used for routing in React applications. It provides a set of components and tools for managing the navigation and URL structure of a React application. React Router allows developers to define routes and navigate between them declaratively using JSX syntax. It also provides advanced features such as nested routes, routing with parameters, and programmatic navigation.",
      },
      {
        title: "React Hook Form",
        iconPath: "/icons/react-hook-form.svg",
        url: "https://react-hook-form.com/",
        description:
          "React Hook Form is a lightweight and flexible library used for managing forms in React applications. It provides a simple and intuitive API for building forms using custom React hooks and supports various form inputs, such as text inputs, checkboxes, and radio buttons. React Hook Form is designed to be performant and efficient, with features like conditional validation and asynchronous form submission. It also integrates well with other popular libraries and frameworks, such as Zod for form validation and Material UI for styling. .",
      },
      {
        title: "Redux",
        iconPath: "/icons/redux.svg",
        url: "https://redux.js.org/",
        description:
          "Redux is a popular JavaScript library used for managing the state of an application. It provides a predictable and centralized way of managing application state, which makes it easier to reason about the behavior of an application and debug issues. In Redux, the entire state of an application is stored in a single object called the store, which can only be modified by dispatching actions. These actions are plain JavaScript objects that describe what happened in the application. Reducers are pure functions that take the current state and an action, and return the new state of the application. Redux also provides a set of tools for debugging, time-traveling, and middleware.",
      },
      {
        title: "Socket.io",
        iconPath: "/icons/socketio.svg",
        url: "https://socket.io/",
        description:
          "Socket.IO is a JavaScript library that enables real-time, bidirectional, and event-based communication between a client and a server. It consists of two parts: a client-side library that runs in the browser, and a server-side library for Node.js. Both components have a nearly identical API. Socket.IO primarily uses the WebSocket protocol with HTTP long-polling as a fallback option. It provides features such as broadcasting to multiple sockets, storing data associated with each client, and asynchronous I/O. Socket.IO is used in various applications such as chat and messaging applications, collaboration tools, real-time dashboards, and multiplayer games.",
        needInvertColor: true,
      },
      {
        title: "TanStack Query",
        iconPath: "/icons/tanstack-query.svg",
        url: "https://tanstack.com/query/latest",
        description:
          "TanStack Query is a popular JavaScript library used for managing remote data. It provides a set of hooks and utilities that simplify the process of fetching, caching, and updating data from remote APIs. TanStack Query provides an intuitive and declarative API for making network requests that supports features like pagination, caching, and error handling. It also integrates well with other popular libraries and frameworks, including React, Redux, tRPC and GraphQL.",
      },
      {
        title: "tRPC",
        iconPath: "/icons/trpc.svg",
        url: "https://trpc.io/",
        description:
          "tRPC is a modern TypeScript-based framework for building scalable and efficient backend APIs. It provides a lightweight and flexible approach to API development, with a focus on simplicity, performance, and developer experience. tRPC allows developers to define API endpoints using a simple and intuitive syntax, and provides automatic TypeScript typings and documentation. It also supports various transport protocols, including HTTP, WebSocket, and gRPC. tRPC includes a set of features such as request validation, response compression, and caching, which makes it easier to build robust and scalable APIs.",
      },
      {
        title: "Zod",
        iconPath: "/icons/zod.svg",
        url: "https://zod.dev/",
        description:
          "Zod is a TypeScript-first schema validation library used for validating data objects in JavaScript and TypeScript applications. It provides a simple and intuitive API for defining data schemas and validating data objects against those schemas. Zod supports various data types, such as strings, numbers, arrays, and objects, as well as advanced features like union types, intersection types, and conditional types. It also provides a set of tools for data parsing, serialization, and transformation. Zod is designed to be lightweight and performant, with a focus on type safety and developer experience.",
      },
    ],
  },
  {
    title: "Otro",
    skillsData: [],
  },
];
