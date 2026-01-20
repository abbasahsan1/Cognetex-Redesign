import { BrainCircuit, Layers, Database, Code2, Server, ShieldCheck } from 'lucide-react';
import { IService, IProject, ITeamMember } from '../types';

export const services: IService[] = [
  {
    id: 'agentic-ai',
    title: 'Agentic & Generative AI',
    tagline: 'Systems that think.',
    description: 'Move beyond static automation. We deploy custom LLM architectures that can ingest your proprietary data, understand context, and take autonomous actions.',
    capabilities: ['RAG Implementation', 'Fine-tuning (Llama/Mistral)', 'LangChain Integration'],
    icon: BrainCircuit
  },
  {
    id: 'full-cycle',
    title: 'Full-Cycle Engineering',
    tagline: 'Scalability is not an afterthought.',
    description: 'We build the engines that power your business. Using React for blazing-fast frontends and Rust/Node.js for high-throughput backends.',
    capabilities: ['Microservices', 'Serverless Architecture', 'Real-time WebSockets'],
    icon: Layers
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    tagline: 'Turning noise into signal.',
    description: 'AI is only as good as the data it feeds on. We build robust ETL pipelines, data lakes, and vector databases ensuring real-time access.',
    capabilities: ['Vector Search', 'BigQuery', 'Data Warehousing'],
    icon: Database
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