export const skills = {
  title: "Skills",
  quotes: [
    "The future belongs to those who learn more skills and combine them in creative ways.",
    "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    "Learning and innovation go hand in hand. The arrogance of success is to think that what you did yesterday will be sufficient for tomorrow.",
  ],
  groups: [
    {
      id: "backend",
      label: "Back End",
      items: [
        { id: "programming", label: "Programming" },
        { id: "backend", label: "Back-End Web Development" },
        { id: "api", label: "API Development" },
        { id: "integration", label: "API & Integration Development" },
        { id: "auth", label: "Secure Authentication" },
        { id: "performance", label: "Performance, Security" },
      ],
    },
    {
      id: "architecture",
      label: "Architecture",
      items: [
        { id: "architecture", label: "System Architecture & Design" },
        { id: "microservices", label: "Microservices" },
        { id: "serverless", label: "Serverless Framework" },
        { id: "loadBalance", label: "Load Balancing" },
        { id: "rateLimit", label: "Rate Limiting" },
        { id: "bottlenecks", label: "Scaling Bottlenecks" },
        { id: "queues", label: "Message Queues" },
      ],
    },
    {
      id: "databases",
      label: "Databases",
      items: [
        { id: "databases", label: "Databases" },
        { id: "dbOptimize", label: "Database Management & Optimization" },
        { id: "caching", label: "Data Caching" },
      ],
    },
    {
      id: "devops",
      label: "Testing & DevOps",
      items: [
        { id: "testing", label: "Software Testing" },
        { id: "pipelines", label: "Testing Pipelines" },
        { id: "debugging", label: "Debugging" },
        { id: "errors", label: "Error Handling" },
        { id: "cicd", label: "Continuous Integration and Continuous Delivery (CI/CD)" },
        { id: "docker", label: "Docker" },
        { id: "vcs", label: "Version Control" },
      ],
    },
  ],
};
