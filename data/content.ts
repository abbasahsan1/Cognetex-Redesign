import { BrainCircuit, Code2, Server, ShieldCheck } from 'lucide-react';
import { IService, IProject, ITeamMember, IApproachItem, IAISolutionPillar, IAIService, IAITechCategory, ICourse } from '../types';

export const services: IService[] = [
  {
    id: 'agentic-ai',
    title: 'Agentic & Generative AI',
    tagline: 'Systems that think.',
    description: 'Move beyond static automation. We deploy custom LLM architectures that can ingest your proprietary data, understand context, and take autonomous actions.',
    capabilities: ['RAG Implementation', 'Fine-tuning (Llama/Mistral)', 'LangChain Integration'],
    iconName: 'BrainCircuit'
  },
  {
    id: 'full-cycle',
    title: 'Full-Cycle Engineering',
    tagline: 'Scalability is not an afterthought.',
    description: 'We build the engines that power your business. Using React for blazing-fast frontends and Rust/Node.js for high-throughput backends.',
    capabilities: ['Microservices', 'Serverless Architecture', 'Real-time WebSockets'],
    iconName: 'Layers'
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    tagline: 'Turning noise into signal.',
    description: 'AI is only as good as the data it feeds on. We build robust ETL pipelines, data lakes, and vector databases ensuring real-time access.',
    capabilities: ['Vector Search', 'BigQuery', 'Data Warehousing'],
    iconName: 'Database'
  }
];

export const projects: IProject[] = [
  {
    id: 'project-a',
    title: '"Sentient" Analytics Platform',
    clientSector: 'FinTech',
    challenge: 'Processing 500GB of daily financial logs to detect fraud in real-time, previously taking 48 hours.',
    solution: 'Custom anomaly detection engine using TensorFlow and stream processing. React-based real-time visualization.',
    stats: [
      { label: 'Accuracy', value: '99.2%' },
      { label: 'Latency', value: '<200ms' },
      { label: 'Saved Annually', value: '$2M+' }
    ]
  },
  {
    id: 'project-b',
    title: 'Autonomous Success Agent',
    clientSector: 'E-Commerce',
    challenge: 'Handling 10,000+ support tickets during Black Friday sales spikes.',
    solution: 'Agentic AI solution utilizing LLMs with a Vector Database memory stream to recall past interactions.',
    stats: [
      { label: 'Auto-Handled', value: '1M+' },
      { label: 'Avg Response', value: '<2s' },
      { label: 'Ticket Reduction', value: '70%' }
    ]
  }
];

export const team: ITeamMember[] = [
  {
    id: 'abbas',
    name: 'Abbas Ahsan',
    role: 'CEO & Chief Architect',
    bio: 'Bridging the gap between business logic and distributed system design.',
    image: 'https://picsum.photos/400/400?random=1'
  },
  {
    id: 'manahil',
    name: 'Manahil Ahmed',
    role: 'Lead AI Research Engineer',
    bio: 'Specialist in NLP and Transformers. Focuses on reducing hallucination rates.',
    image: 'https://picsum.photos/400/400?random=2'
  },
  {
    id: 'jahanzeb',
    name: 'Jahanzeb Khan',
    role: 'Senior Backend Engineer',
    bio: 'Ensures that when traffic spikes, our systems don’t just survive—they thrive.',
    image: 'https://picsum.photos/400/400?random=3'
  },
  {
    id: 'abdullah',
    name: 'Abdullah Farooqui',
    role: 'Head of Frontend',
    bio: 'Obsessed with the "100ms rule". Crafts pixel-perfect interfaces that feel instant.',
    image: 'https://picsum.photos/400/400?random=4'
  }
];

export const trustLogos = [
  { name: 'AWS', icon: Server },
  { name: 'OpenAI', icon: BrainCircuit },
  { name: 'Vercel', icon: Code2 },
  { name: 'Security', icon: ShieldCheck },
];

export const uniqueApproach: IApproachItem[] = [
  {
    id: 'client-centric',
    title: 'Client-Centric Design',
    description: 'We treat each client as unique, crafting tailored digital ecosystems that align perfectly with their vision and goals.'
  },
  {
    id: 'strategic-thinking',
    title: 'Strategic Thinking',
    description: 'Our experts guide you through every transformation phase, combining innovation with business strategy for lasting growth.'
  },
  {
    id: 'extra-mile',
    title: 'Extra Mile Support',
    description: 'We go beyond expectations ensuring continuous improvement, scalability, and returns from our technology solutions.'
  },
  {
    id: 'high-impact',
    title: 'High-Impact Delivery',
    description: 'Every client is different so we deliver personalized, high-impact technology strategies designed to drive measurable success and long-term value.'
  }
];

export const aiSolutionPillars: IAISolutionPillar[] = [
  {
    id: 'decision-intelligence',
    title: 'Decision Intelligence',
    description: 'Turn operational data into real-time decision systems that adapt to changing market signals and customer behavior.'
  },
  {
    id: 'autonomous-ops',
    title: 'Autonomous Operations',
    description: 'Automate high-volume workflows with guardrails, approvals, and audit trails to boost efficiency without sacrificing control.'
  },
  {
    id: 'customer-experience',
    title: 'AI-First Customer Experience',
    description: 'Elevate support, onboarding, and retention with multilingual conversational AI that learns from every interaction.'
  },
  {
    id: 'intelligent-products',
    title: 'Intelligent Products',
    description: 'Embed AI into your product roadmap to unlock personalization, forecasting, and proactive insights.'
  }
];

export const aiServices: IAIService[] = [
  {
    id: 'strategy',
    title: 'AI Strategy & Readiness',
    description: 'Audit your data, people, and systems to define a clear AI roadmap with measurable KPIs and governance controls.',
    outcomes: ['AI opportunity mapping', 'ROI modeling', 'Governance frameworks']
  },
  {
    id: 'agentic',
    title: 'Agentic Automation',
    description: 'Deploy autonomous agents that coordinate tasks, query knowledge bases, and act with human-in-the-loop approvals.',
    outcomes: ['RAG orchestration', 'Workflow automation', 'Actionable insights']
  },
  {
    id: 'predictive',
    title: 'Predictive Analytics',
    description: 'Forecast demand, identify risk, and optimize operations using statistical modeling and modern ML pipelines.',
    outcomes: ['Demand forecasting', 'Churn prediction', 'Anomaly detection']
  },
  {
    id: 'conversational',
    title: 'Conversational AI',
    description: 'Design branded assistants that handle support, sales enablement, and internal enablement across channels.',
    outcomes: ['Multichannel bots', 'Knowledge retrieval', 'Sentiment analysis']
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description: 'Turn images and video into structured insights for quality control, safety, and real-time monitoring.',
    outcomes: ['OCR & document AI', 'Defect detection', 'Visual analytics']
  },
  {
    id: 'mlops',
    title: 'MLOps & Monitoring',
    description: 'Keep models reliable with continuous evaluation, drift monitoring, and secure deployment pipelines.',
    outcomes: ['Model observability', 'CI/CD for ML', 'Compliance reporting']
  }
];

export const aiTechStack: IAITechCategory[] = [
  {
    id: 'modeling',
    title: 'Modeling & Frameworks',
    items: ['PyTorch', 'TensorFlow', 'Transformers', 'XGBoost', 'ONNX']
  },
  {
    id: 'data',
    title: 'Data & Vector Stores',
    items: ['Postgres', 'Snowflake', 'BigQuery', 'Pinecone', 'Weaviate']
  },
  {
    id: 'infra',
    title: 'Infrastructure & DevOps',
    items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform']
  },
  {
    id: 'orchestration',
    title: 'Orchestration',
    items: ['LangChain', 'LlamaIndex', 'Airflow', 'Prefect', 'Temporal']
  },
  {
    id: 'observability',
    title: 'Observability',
    items: ['Prometheus', 'Grafana', 'OpenTelemetry', 'Sentry', 'Evidently AI']
  },
  {
    id: 'security',
    title: 'Security & Governance',
    items: ['RBAC', 'PII Redaction', 'SOC2 Controls', 'Audit Logging', 'Policy Engines']
  }
];

export const courses: ICourse[] = [
  {
    id: 'kubernetes',
    badge: 'FREE',
    title: 'Kubernetes',
    subtitle: 'Introduction to Kubernetes',
    description:
      'Learn the basics of Kubernetes, its architecture, and why it’s essential for modern cloud applications and technologies.'
  },
  {
    id: 'docker',
    badge: 'FREE',
    title: 'Docker',
    subtitle: 'Introduction to Docker',
    description:
      'Get started with Docker, containerization, and running applications efficiently in isolated environments.'
  }
];