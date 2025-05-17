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
    { "name": "Selenium WebDriver", "rating": 1 },
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
    },
    {
      "title": "Healthcare Patient Management System",
      "description": "Enterprise-level healthcare application designed to streamline patient management workflows for large medical facilities. The system includes modules for appointment scheduling, electronic health records (EHR), billing integration, insurance verification, and patient communication through a secure portal. It was built with strict compliance to HIPAA regulations and features robust data encryption and access control mechanisms.",
      "position": "Senior QA Automation Engineer",
      "team_size": 12,
      "responsibilities": [
        "Led a team of 3 QA engineers, providing mentorship and technical guidance to ensure testing standards and quality objectives were met",
        "Designed and implemented a comprehensive test automation framework using Java, TestNG, and Selenium WebDriver",
        "Developed and maintained automated tests for critical user flows, focusing on appointment scheduling and EHR modules",
        "Collaborated with security specialists to verify encryption mechanisms and access controls for patient data protection",
        "Implemented performance testing protocols using JMeter to validate system behavior under various load conditions"
      ],
      "technologies": [
        "Java", "Spring Boot", "TestNG", "Selenium", "JMeter", "MySQL", 
        "Oracle Database", "REST APIs", "Jenkins", "Docker", "AWS", "Hibernate"
      ]
    },
    {
      "title": "E-commerce Marketplace Platform",
      "description": "Large-scale marketplace connecting buyers and sellers, supporting multi-tenant storefronts with individual branding, inventory management, order processing, and analytics. The platform included integrated payment processing, logistics coordination, customer support ticketing, and a sophisticated recommendation engine.",
      "position": "Lead QA Engineer",
      "team_size": 15,
      "responsibilities": [
        "Implemented an automated testing strategy covering both web and mobile versions of the marketplace",
        "Developed and executed performance tests to verify system stability during high-traffic events and sales periods",
        "Created and maintained comprehensive test suites for payment processing flows, ensuring compliance with PCI DSS standards",
        "Coordinated with cross-functional teams to validate integration points between marketplace and third-party services",
        "Established CI/CD pipelines for continuous testing, reducing regression testing time by 60%"
      ],
      "technologies": [
        "Python", "Django", "PostgreSQL", "Redis", "Elasticsearch", "React", 
        "NextJS", "Redux", "Stripe API", "Docker", "Kubernetes", "Pytest", "Playwright"
      ]
    },
    {
      "title": "Financial Analytics Dashboard",
      "description": "Sophisticated financial analytics platform providing real-time market data, portfolio management tools, and algorithmic trading capabilities for institutional investors. The system processed large volumes of financial data streams and offered customizable visualization tools for trend analysis.",
      "position": "Automation QA Specialist",
      "team_size": 8,
      "responsibilities": [
        "Developed automated test scripts for data visualization components and real-time data accuracy verification",
        "Created performance testing scenarios to ensure system stability during high-volume data processing periods",
        "Implemented automated API testing for integration with various financial data providers and trading platforms",
        "Collaborated with UX designers to validate usability and accessibility compliance of dashboard components",
        "Documented and tracked defects through the full lifecycle, providing detailed reproduction steps and verification criteria"
      ],
      "technologies": [
        "TypeScript", "React", "D3.js", "WebSockets", "Node.js", "MongoDB", 
        "GraphQL", "Cypress", "Jest", "CircleCI", "AWS Lambda", "Terraform"
      ]
    }
  ]
}; 