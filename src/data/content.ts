export interface Profile {
  name: string
  title: string
  stats: Record<string, number>
  skills: string[]
}

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  highlights: string[]
}

export interface Project {
  name: string
  tagline: string
  description: string
  tags: string[]
  github?: string
  website?: string
}

export const PROFILE: Profile = {
  name: 'Huzayfa Jasat',
  title: 'Software Engineer',
  stats: {
    Frontend: 99,
    Backend: 99,
    Infrastructure: 99,
    'Embedded/IoT': 99,
    'UI/UX Design': 99,
    Overall: 99,
  },
  skills: [
    'React', 'TypeScript', 'Three.js', 'Python',
    'Node.js', 'C++', 'Docker', 'AWS',
  ],
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Software Engineering Intern',
    company: 'Tesla',
    period: 'Jan. 2026 - Apr. 2026',
    description:
      'Built high-performance diagnostic tools for vehicle service systems, working on real-time data visualization and internal tooling.',
    highlights: [
      'Led full-stack migration of the Vehicle Vitals panel from Qt/C++ to React/TypeScript and Rust (D-Bus IPC). Consolidated telemetry across 6 platforms, cutting lookup time by 60% for 30,000+ technicians',
      'Built a real-time Task History system with Rust-based WebSockets and cache-first fetching. Surfaced in-context diagnostic history, eliminating Toolbox app context-switching and reducing lookup time by 80%',
      'Engineered a TypeScript generation pipeline for type-safe CAN bus signal definitions from JCAN artifacts, enforcing compile-time validation and eliminating runtime signal errors in the ServiceUI',
      'Spearheaded platform-wide UX and reliability upgrades for diagnostic tooling, including role-based visibility badges and core TypeScript conversions, reducing internal clarification messages by 40%',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Levanta Labs',
    period: 'May. 2025 - Aug. 2025',
    description:
      'Contributed to backend development for a startup studio, building RESTful APIs, automating data workflows, and implementing authentication and payment systems for multiple high-growth clients.',
    highlights: [
      'Built and maintained RESTful APIs using Node.js, Express.js, and PostgreSQL, powering backend services for 7+ startups, reducing request latency by 25%, and improving endpoint scalability across multiple clients',
      'Automated data workflows using Python and external APIs for web scraping, deployed Bash scripts via AWS, and containerized services with Docker, streamlining workflows and boosting task efficiency by 35%',
      'Developed and merged 75+ backend endpoints across projects, integrating authentication flows such as 2FA, magic link, and email re-verification, and collaborating through frequent PR reviews and feedback cycles',
      'Implemented email and payment flows using Knex.js, Redis, Stripe, and Resend, increasing system reliability, reducing auth and billing issues by 30%, and supporting seamless onboarding for high-growth startup clients',
    ],
  },
  {
    role: 'Firmware Engineer',
    company: 'UW Formula Electric',
    period: 'Sep. 2024 - Present',
    description:
      'Built high-performance diagnostic tools for vehicle service systems, working on real-time data visualization and internal tooling.',
    highlights: [
      'Developed a C++ CLI command to clear motor controller faults via CAN, reducing troubleshooting time by 30%',
      'Designed and deployed fault-clear functionality in EV motor diagnostics to automate fault recovery, achieving a 95% success rate in HIL simulations and slashing manual debugging time by 40%',
      'Refined PID control loops to address motor inefficiencies, boosting motor efficiency by 10%',
      'Debugged STM32 microcontroller firmware during vehicle tests, enhancing motor response accuracy and reliability',
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    name: 'NearU',
    tagline: 'Proximity-based social discovery',
    description:
      'Real-time location-aware application connecting people at events and campuses, growing to 200+ active users.',
    tags: ['React', 'Typescript', 'Firebase'],
    github: 'https://github.com/huzayfa-jasat/nearu-mvp',
    website: 'https://nearu-mvp.vercel.app/',
  },
  {
    name: 'PushBlock',
    tagline: 'Gamified productivity extension',
    description:
      'Browser extension that blocks sites until users complete a set number of push-ups — won 1st place at GenAI Genesis Hackathon 2025.',
    tags: ['OpenCV', 'MediaPipe', 'HTML', 'CSS', 'JavaScript', 'Flask'],
    github: 'https://github.com/foodshop1/PushBlock',
  },
  {
    name: 'AI Code Optimizer',
    tagline: 'Intelligent performance analysis',
    description:
      'AI-powered tool that analyzes and optimizes code performance, reducing execution time by 82% and memory usage by 40%.',
    tags: ['Python', 'Streamlit', 'Google Gemini API', 'Matplotlib'],
  },
  {
    name: 'Auto Pet Feeder',
    tagline: 'Smart robotic pet care',
    description:
      'EV3 robotics system using ultrasonic and sound sensors to identify pets and dispense tailored food portions with 98% accuracy.',
    tags: ['EV3 Robotics', 'RobotC', 'Ultrasonic Sensors'],
  },
  {
    name: 'Smart Walking Stick',
    tagline: 'Assistive mobility device',
    description:
      'Arduino-powered mobility aid with 180° obstacle detection, delivering real-time audio and vibration feedback within 0.5 seconds at 95% accuracy.',
    tags: ['Arduino', 'TinkerCAD', 'Motion Sensors'],
  },
]