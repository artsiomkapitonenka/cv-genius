import { ResumeData } from "../types/resume";

export const sampleResumeData: ResumeData = {
  "candidate": {
    "name": "Maria P.",
    "grade": "Senior Automation QA Engineer"
  },

  "overview": [
    "Over 9 years of comprehensive experience in manual and automated testing of web, smart-TV, and mobile applications across various platforms and environments",
    "Extensive expertise in designing and maintaining proprietary automation frameworks with detailed HTML reporting, robust logging mechanisms, and comprehensive test coverage analysis",
    "Proficient in planning QA processes, establishing testing methodologies, resource allocation, and providing mentorship to a team of 4 engineers to enhance overall testing efficiency",
    "Strong background in end-to-end testing, including functional, integration, UI/UX, performance, and security testing for enterprise-level applications",
    "Skilled in optimizing testing processes, reducing test execution time, and implementing CI/CD pipelines to streamline delivery workflows"
  ],

  "level_of_experience": [
    { "name": "Selenium WebDriver", "rating": 3 },
    { "name": "Appium", "rating": 5 },
    { "name": "Groovy", "rating": 5 },
    { "name": "API testing", "rating": 4 },
    { "name": "Integration & Functional Testing", "rating": 5 }
  ],

  "skills": [
    {
      "category": "Automation Testing",
      "items": ["Selenium Grid", "WebdriverIO", "Playwright", "Cypress",
                "JMeter", "LoadRunner", "Pytest", "Postman", "SikuliX"]
    },
    {
      "category": "Programming Languages",
      "items": ["Java", "Swift", "Python", "TypeScript", "HTML"]
    },
    {
      "category": "Testing & Debugging",
      "items": ["Firebug", "Chrome DevTools", "IE Developer", "Fiddler",
                "Kali Tools Set", "Charles Proxy", "Swagger UI"]
    },
    {
      "category": "Test Documentation",
      "items": ["Test Cases", "Checklists", "Test Plans", "Test Reports"]
    },
    {
      "category": "Mobile Testing",
      "items": ["Crashlytics", "HockeyApp"]
    },
    {
      "category": "Test Management Tools",
      "items": ["TestRail", "XRay", "Zephyr"]
    },
    {
      "category": "Java Ecosystem",
      "items": ["Java Selenium", "TestNG", "JUnit"]
    }
  ],

  "education": [
    {
      "degree": "Bachelor's Degree in Web Design and Computer Graphics",
      "institution": "Belarusian State University of Informatics and Radioelectronics"
    },
    {
      "degree": "Bachelor's Degree in Radioecology",
      "institution": "International Sakharov Environmental Institute of BSU"
    }
  ],

  "languages": [
    { "language": "English", "level": "Intermediate" }
  ],

  "projects": [
    {
      "title": "Brand Reputation Monitoring and Management Platform",
      "description": "Multi-tenant MarTech solution designed for comprehensive brand reputation management across various digital channels. The platform utilizes advanced analytics algorithms to monitor brand mentions, sentiment analysis, and market trends to provide actionable insights. It includes a customizable dashboard with real-time metrics, automated reporting, and integration capabilities with major social media platforms and third-party analytics services. The system is built on a microservices architecture to ensure scalability and flexibility for enterprise clients with varying needs and usage patterns.",
      "position": "Automation QA Engineer",
      "team_size": 9,
      "responsibilities": [
        "Collaborated with the Lead QA to define and implement an effective automation strategy that aligned with project milestones and quality objectives",
        "Developed and maintained comprehensive test scripts for API, functional, and integration testing using Python and Selenium WebDriver",
        "Supported the continuous improvement of the automation framework, including implementing custom reporting solutions and optimizing test execution pipelines",
        "Executed automated test suites, analyzed results, and prepared detailed reports highlighting critical issues and potential performance bottlenecks",
        "Evaluated and incorporated new testing tools and methodologies to enhance testing coverage and efficiency across the platform",
        "Provided regular QA status updates and metrics to project stakeholders, ensuring transparency throughout the development lifecycle"
      ],
      "technologies": [
        "PHP", "Symfony 2", "PostgreSQL", "MongoDB", "HTML", "Sass", "Bootstrap",
        "JavaScript", "jQuery", "Backbone/Marionette", "CSS", "Grunt", "RabbitMQ",
        "Silex", "React", "Underscore/Lodash", "Kubernetes", "ArgoCD",
        "Terragrunt", "Memcached"
      ]
    }
  ]
}; 