import { BrainCircuit, Code2, Server, ShieldCheck } from 'lucide-react';
import { IService, IProject, ITeamMember, IApproachItem, IAISolutionPillar, IAIService, IAITechCategory, ICourse, ISiteConfig } from '../types';

export const siteConfig: ISiteConfig = {
  heroTitle: 'BUILT FOR LEADERS, OPERATORS, AND BUILDERS',
  heroSubTitle: 'RETHINK HOW THINKING WORKS',
  heroLead: 'Jump directly to the part that matters most to you—business outcomes, technical capabilities, delivery team, or upskilling resources.',
  serviceSectionTitle: 'OUR AI SERVICES',
  serviceSectionLead: 'Modular service lines that help you deploy AI faster, safer, and with long-term scalability in mind.',
  contactSectionTitle: 'INITIATE THE FUTURE',
  contactSectionLead: 'Ready to integrate autonomous intelligence into your operations? Let’s map your AI readiness today.',
  defaultSeoTitle: 'Cognetex | Enterprise AI & Software Development Agency',
  defaultSeoDescription: 'Cognetex is a premier AI & Software Development agency. We specialize in building autonomous agents, custom LLM solutions, and scalable enterprise platforms.',
  socials: {
    linkedin: 'https://linkedin.com/company/cognetex',
    twitter: 'https://twitter.com/cognetex',
    github: 'https://github.com/cognetex'
  }
};


export const services: IService[] = [
  {
    id: 'agentic-ai',
    title: 'Agentic & Custom LLM Development',
    tagline: 'Smarter systems. Faster execution.',
    description: 'Premier AI Agency specializing in custom LLM architectures and autonomous agents. We integrate RAG workflows and proprietary data to build enterprise-grade intelligence that acts on your behalf.',
    capabilities: ['Custom RAG Pipelines', 'Llama 3 & Mistral Fine-Tuning', 'Multi-Agent Orchestration', 'Vector Search Integration'],
    iconName: 'BrainCircuit',
    seoTitle: 'Custom LLM & Agentic AI Development Agency',
    seoDescription: 'Leverage our expertise in building autonomous agents and RAG-based LLM applications for enterprise workflows. Scalable, secure, and data-centric AI solutions.'
  },
  {
    id: 'full-cycle',
    title: 'Enterprise Full-Stack Engineering',
    tagline: 'High-performance digital infrastructure.',
    description: 'Building the backbone of modern business. From blazingly fast React frontends to robust Rust, Node.js, and Python backends designed for millions of concurrent users.',
    capabilities: ['Scalable Microservices', 'Serverless Infrastructure', 'Real-time Vector APIs', 'Edge Computing Solutions'],
    iconName: 'Layers',
    seoTitle: 'Enterprise Software Engineering & Full-Stack Development',
    seoDescription: 'High-performance custom software development using React, Node.js, and Rust. Scalable architectures built for speed and long-term business growth.'
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering & Vector Strategy',
    tagline: 'Foundational data for AI excellence.',
    description: 'Transforming legacy data into AI-ready assets. We architect robust ETL pipelines, data lakes, and vector databases that power next-generation generative AI applications.',
    capabilities: ['BigQuery & Snowflake Architecture', 'Real-time ETL Pipelines', 'Vector Database Strategy', 'Data Governance for AI'],
    iconName: 'Database',
    seoTitle: 'Data Engineering Services for AI & Machine Learning',
    seoDescription: 'Specialized data engineering for AI. Build high-throughput ETL pipelines and vector database architectures to fuel your generative AI models.'
  }
];

export const projects: IProject[] = [
  {
    id: 'project-a',
    title: 'Sentient Fraud Detection Platform',
    clientSector: 'FinTech',
    challenge: 'Real-time processing of 500GB+ daily transaction logs to minimize fraud exposure, previously a manual 48-hour process.',
    solution: 'Engineered a custom anomaly detection engine utilizing TensorFlow and stream processing, integrated with a React-based real-time command center.',
    stats: [
      { label: 'Fraud Detection Accuracy', value: '99.2%' },
      { label: 'Inference Latency', value: '<200ms' },
      { label: 'Annual Savings', value: '$2.4M' }
    ],
    seoTitle: 'CASE STUDY: Real-time AI Fraud Detection for FinTech',
    seoDescription: 'How we used TensorFlow and stream processing to reduce fraud detection time from 48 hours to 200ms for a leading FinTech client.'
  },
  {
    id: 'project-b',
    title: 'Autonomous E-Commerce Support Agent',
    clientSector: 'Retail / E-Commerce',
    challenge: 'Managing 10,000+ simultaneous support requests during high-traffic events without increasing headcount.',
    solution: 'Deployed an Agentic AI solution with persistent Vector memory, capable of resolving complex returns and exchanges autonomously.',
    stats: [
      { label: 'Resolved Autonomously', value: '1.2M+' },
      { label: 'Customer Satisfaction', value: '4.8/5' },
      { label: 'Operational Efficiency', value: '75%' }
    ],
    seoTitle: 'CASE STUDY: Autonomous AI Support Agents for E-Commerce',
    seoDescription: 'Scaling customer support with autonomous agents and vector databases. How we achieved 75% efficiency gains for a retail giant.'
  }
];

export const team: ITeamMember[] = [
  {
    id: 'abbas',
    name: 'Abbas Ahsan',
    role: 'CEO & Chief Architect',
    bio: 'Pioneer in bridging business logic with distributed AI systems. Expert in architecting scalable agentic workflows for enterprise clients.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    imageAlt: 'Abbas Ahsan - CEO and AI Architect',
    expertise: ['AI Architecture', 'Distributed Systems', 'Product Strategy'],
    experience: [
      { company: 'Cognetex', role: 'CEO', period: '2022 - Present' },
      { company: 'Tech Innovators', role: 'Lead Architect', period: '2018 - 2022' }
    ],
    socials: {
      linkedin: 'https://linkedin.com/in/abbasahsan',
      github: 'https://github.com/abbasahsan'
    },
    seoTitle: 'Abbas Ahsan | Enterprise AI Architect & CEO'
  },
  {
    id: 'manahil',
    name: 'Manahil Ahmed',
    role: 'Lead AI Research Engineer',
    bio: 'Specializing in NLP and Transformer architectures. Manahil bridges the gap between frontier research and production-scale AI implementations, with a core focus on LLM reliability and hallucination mitigation in high-stakes enterprise environments.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    imageAlt: 'Manahil Ahmed - Lead AI Research Engineer',
    expertise: ['Natural Language Processing', 'Transformer Architecture', 'PyTorch', 'Model Fine-tuning'],
    experience: [
      { company: 'Cognetex', role: 'Lead AI Research Engineer', period: '2023 - Present' },
      { company: 'Frontier AI Labs', role: 'Senior Research Scientist', period: '2020 - 2023' },
      { company: 'Data Systems Inc.', role: 'Machine Learning Engineer', period: '2018 - 2020' }
    ],
    socials: {
      linkedin: 'https://linkedin.com/in/manahilahmed',
      github: 'https://github.com/manahil-ahmed'
    },
    seoTitle: 'Manahil Ahmed | NLP Research & AI Engineering Lead'
  },

  {
    id: 'jahanzeb',
    name: 'Jahanzeb Khan',
    role: 'Senior Backend Engineer',
    bio: 'Distributed systems expert specializing in high-throughput architectures. Ensuring performance reliability for massive AI workloads.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    imageAlt: 'Jahanzeb Khan - Specialist in Distributed Systems',
    expertise: ['Distributed Systems', 'Rust', 'Cloud Infrastructure'],
    experience: [
      { company: 'Cognetex', role: 'Senior Backend Engineer', period: '2023 - Present' },
      { company: 'Scale Systems', role: 'Backend Dev', period: '2019 - 2023' }
    ],
    socials: {
      github: 'https://github.com/jahanzebk'
    },
    seoTitle: 'Jahanzeb Khan | Senior Backend & Distributed Systems Engineer'
  },
  {
    id: 'abdullah',
    name: 'Abdullah Farooqui',
    role: 'Head of Frontend',
    bio: 'Architecting ultra-low latency interfaces. Expert in React and interactive 3D visualizations for complex data environments.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
    imageAlt: 'Abdullah Farooqui - Frontend Architecture Expert',
    expertise: ['React', 'Three.js', 'UI/UX Design'],
    experience: [
      { company: 'Cognetex', role: 'Head of Frontend', period: '2022 - Present' },
      { company: 'Design Co', role: 'Senior UI/UX', period: '2018 - 2022' }
    ],
    socials: {
      linkedin: 'https://linkedin.com/in/abdullahfarooqui'
    },
    seoTitle: 'Abdullah Farooqui | Head of Frontend & UI/UX Strategy'
  }
];




export const trustLogos = [
  { name: 'AWS Partner', icon: Server },
  { name: 'OpenAI Expert', icon: BrainCircuit },
  { name: 'Vercel Deployment', icon: Code2 },
  { name: 'SOC2 Compliant', icon: ShieldCheck },
];

export const uniqueApproach: IApproachItem[] = [
  {
    id: 'outcomes-first',
    title: 'Outcomes-First Strategy',
    description: 'We don’t just build models; we architect business solutions. Every AI deployment is mapped to specific ROI targets and operational KPIs.'
  },
  {
    id: 'agentic-focus',
    title: 'Agentic Native Design',
    description: 'Moving beyond chat. Our systems are built to take action, interact with your existing APIs, and resolve workflows autonomously.'
  },
  {
    id: 'data-integrity',
    title: 'Data Integrity & Privacy',
    description: 'Enterprise security is baked in. We prioritize PII redaction, secure vector storage, and SOC2-compliant data handling at every layer.'
  },
  {
    id: 'iterative-growth',
    title: 'Iterative Scalability',
    description: 'Stay ahead of the curve. Our modular architectures allow for seamless model upgrades as state-of-the-art AI evolves.'
  }
];

export const aiSolutionPillars: IAISolutionPillar[] = [
  {
    id: 'decision-intelligence',
    title: 'Decision Intelligence Systems',
    description: 'Convert unstructured operational data into real-time decision frameworks that adapt to market volatility.'
  },
  {
    id: 'autonomous-agents',
    title: 'Autonomous Workflows',
    description: 'Bridge the gap between insight and action with agents that navigate complex corporate workflows without manual intervention.'
  },
  {
    id: 'generative-cx',
    title: 'Generative Support (CX)',
    description: 'Transform customer touchpoints with 24/7 multilingual agents that access your entire knowledge base for instant resolution.'
  },
  {
    id: 'ai-roadmap',
    title: 'Product-Led AI Roadmaps',
    description: 'Embed intelligence into your core product offering to unlock personalization at scale and predictive functionality.'
  }
];

export const aiServices: IAIService[] = [
  {
    id: 'readiness',
    title: 'AI Audit & Readiness',
    description: 'Consultative deep-dive into your data infrastructure and organizational readiness for large-scale AI integration.',
    outcomes: ['Infrastructure Gap Analysis', 'Model Selection Strategy', 'Risk & Compliance Roadmap']
  },
  {
    id: 'agent-build',
    title: 'Custom Agent Development',
    description: 'Bespoke development of autonomous agents for specialized workflows including sales, support, and technical operations.',
    outcomes: ['Working Agentic Prototypes', 'Production-Scale Deployment', 'API Integration']
  },
  {
    id: 'rag-architecture',
    title: 'Advanced RAG Systems',
    description: 'Retrieval Augmented Generation systems designed to ground LLMs in your proprietary technical documentation and data.',
    outcomes: ['Vector Database Integration', 'Semantic Search Optimization', 'Improved Answer Accuracy']
  },
  {
    id: 'mlops-lifecycle',
    title: 'MLOps & CI/CD for AI',
    description: 'Establishing the pipelines for continuous evaluation, versioning, and monitoring of production AI models.',
    outcomes: ['Automated Testing for LLMs', 'Drift Detection Systems', 'Performance Dashboards']
  }
];

export const aiTechStack: IAITechCategory[] = [
  {
    id: 'frameworks',
    title: 'Core Frameworks',
    items: ['PyTorch', 'LangChain', 'LlamaIndex', 'AutoGPT', 'CrewAI']
  },
  {
    id: 'vector-data',
    title: 'Vector & Data Lakes',
    items: ['Pinecone', 'Weaviate', 'ChromaDB', 'BigQuery', 'Snowflake']
  },
  {
    id: 'cloud-infra',
    title: 'Next-Gen Infrastructure',
    items: ['AWS Bedrock', 'GCP Vertex AI', 'Azure AI', 'Docker', 'Kubernetes']
  }
];

export const courses: ICourse[] = [
  {
    id: 'agentic-course',
    badge: 'NEW',
    title: 'Agentic AI Mastery',
    subtitle: 'Building Autonomous Agents',
    description:
      'A deep dive into multi-agent systems, tool-use, and complex orchestration for the next generation of AI builders.',
    price: '$499',
    medium: 'Self-paced Video + Live Labs',
    duration: '6 Weeks',
    syllabus: [
      'Foundations of Autonomous Agents',
      'Memory Management & State Recovery',
      'Advanced Tool-Calling & API Interfacing',
      'Multi-Agent Orchestration with CrewAI/AutoGen',
      'Operationalizing Agents in Enterprise'
    ],
    instructorId: 'abbas',
    seoTitle: 'Agentic AI Course: Build Autonomous Systems with LangChain',
    seoDescription: 'Master the art of building autonomous AI agents. Learn orchestration, tool-calling, and RAG implementation in our free course.'
  },
  {
    id: 'rag-fundamentals',
    badge: 'FREE',
    title: 'RAG Fundamentals',
    subtitle: 'Vector-Based Retrieval',
    description:
      'Essential training on vector databases, semantic chunking, and grounding LLMs in proprietary enterprise data.',
    price: 'Free',
    medium: 'On-demand Workshop',
    duration: '4 Hours',
    syllabus: [
      'Introduction to Retrieval Augmented Generation',
      'Chunking Strategies & Context Optimization',
      'Vector Database Selection (Pinecone, Weaviate)',
      'Grounding & Evaluation Metrics'
    ],
    instructorId: 'manahil',
    seoTitle: 'RAG Fundamentals Course: Semantic Search & Vector DBs',
    seoDescription: 'Learn how to build high-accuracy Retrieval Augmented Generation systems. Free course on vector databases and LLM grounding.'
  }
];