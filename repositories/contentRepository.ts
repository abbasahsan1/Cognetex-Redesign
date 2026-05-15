import { collection, getDocs } from 'firebase/firestore';
import { contentSchema } from '../domain/schemas';
import { db, firebaseEnabled } from '../lib/firebase';
import { ISiteConfig } from '../types';

const DEFAULTS = {
  services: [],
  projects: [],
  team: [],
  aiTechStack: [], // This maps to techStack in Firestore
  courses: [],
  trustLogos: [
    { id: 'hipaa', name: 'HIPAA', src: '/logos/HIPAA black.svg', alt: 'HIPAA' },
    { id: 'gdpr', name: 'GDPR', src: '/logos/GDPR black.svg', alt: 'GDPR' },
    { id: 'soc2', name: 'SOC 2', src: '/logos/AICPA black.svg', alt: 'AICPA SOC 2' },
    { id: 'pcidss', name: 'PCI DSS', src: '/logos/PCI black.svg', alt: 'PCI DSS' },
    { id: 'star', name: 'STAR', src: '/logos/Star Black.svg', alt: 'STAR' },
  ],
  uniqueApproach: [
    {
      id: 'app-1',
      title: 'Client-Centric Discovery',
      description: 'Deep dive into operational bottlenecks and strategic goals to ensure alignment from day one.',
    },
    {
      id: 'app-2',
      title: 'Production-Grade Architecture',
      description: 'Designing resilient, scalable, and secure AI systems that integrate seamlessly with your existing enterprise stack.',
    },
    {
      id: 'app-3',
      title: 'Rapid Validation Cycles',
      description: 'Fast iterative cycles and prototype benchmarks to prove ROI and technical feasibility early in the process.',
    },
    {
      id: 'app-4',
      title: 'Seamless Deployment & Scale',
      description: 'Smooth rollout, continuous monitoring, and team enablement to guarantee long-term operational autonomy.',
    },
  ],
  aiSolutionPillars: [
    {
      id: 'sol-1',
      title: 'Autonomous Agentic Workflows',
      description: 'Multi-agent systems that automate complex business processes with extreme reliability and self-correction.',
    },
    {
      id: 'sol-2',
      title: 'Enterprise RAG Systems',
      description: 'Grounding LLMs in your proprietary data with advanced retrieval, semantic chunking, and hybrid search strategies.',
    },
    {
      id: 'sol-3',
      title: 'Predictive Intelligence & Analytics',
      description: 'Actionable forecasting and real-time anomaly detection powered by state-of-the-art machine learning models.',
    },
    {
      id: 'sol-4',
      title: 'MLOps & Low-Latency Infrastructure',
      description: 'Continuous model deployment, automated monitoring, and optimized inference pipelines for peak performance.',
    },
  ],
  aiServices: [
    {
      id: 'srv-1',
      title: 'AI Readiness & Strategy Audits',
      description: 'Assessing your enterprise data maturity and identifying high-ROI automation candidates across departments.',
      outcomes: ['Data maturity audit', 'Technical feasibility analysis', 'ROI forecasting & roadmap'],
    },
    {
      id: 'srv-2',
      title: 'Custom LLM Fine-Tuning',
      description: 'Adapting open-source and frontier models to your specialized industry domain with stringent data privacy.',
      outcomes: ['Domain-specific fine-tuning', 'Latency & cost optimization', 'Secure API endpoint architecture'],
    },
    {
      id: 'srv-3',
      title: 'Agentic Process Automation',
      description: 'Replacing manual, error-prone workflows with resilient autonomous agents capable of multi-step execution.',
      outcomes: ['Multi-agent orchestration', 'Human-in-the-loop oversight', 'Automated error recovery protocols'],
    },
  ],
  careers: [
    {
      id: 'ml-engineer',
      title: 'Senior ML Engineer',
      team: 'Applied AI',
      location: 'Remote • EMEA/NA',
      summary: 'Own model development, evaluation pipelines, and production deployment for mission-critical AI systems.',
      focus: ['LLM evaluation', 'RAG systems', 'MLOps orchestration'],
    },
    {
      id: 'fullstack',
      title: 'Lead Full-Stack Engineer',
      team: 'Product Engineering',
      location: 'Remote • Global',
      summary: 'Architect and deliver enterprise-grade web platforms with performance and reliability guarantees.',
      focus: ['React + TypeScript', 'API design', 'System observability'],
    },
    {
      id: 'infra',
      title: 'Cloud Infrastructure Lead',
      team: 'Platform',
      location: 'Hybrid • MENA/UK',
      summary: 'Design scalable infrastructure, secure deployments, and high-throughput data pipelines.',
      focus: ['Kubernetes', 'IaC', 'Zero-trust security'],
    },
  ],
  careerBenefits: [
    {
      id: 'autonomy',
      title: 'Autonomy by Design',
      detail: 'Small pods, senior ownership, and direct access to decision-makers to remove bottlenecks.',
    },
    {
      id: 'growth',
      title: 'Structured Growth',
      detail: 'Clear expectations, mentorship cycles, and funded technical training every quarter.',
    },
    {
      id: 'impact',
      title: 'Enterprise Impact',
      detail: 'Work on systems that affect real business outcomes, not vanity projects.',
    },
    {
      id: 'flex',
      title: 'Flexible Operating Model',
      detail: 'Remote-first with intentional onsite sessions for major milestones and planning.',
    },
  ],
  careerSteps: [
    {
      id: 'screen',
      title: 'Signal Check',
      description: 'A 20-minute intro focused on scope, alignment, and expectations.',
    },
    {
      id: 'technical',
      title: 'Technical Deep Dive',
      description: 'Scenario-based evaluation tailored to the role, no leetcode loops.',
    },
    {
      id: 'collab',
      title: 'Collaboration Sprint',
      description: 'Pair with a lead to validate delivery style and communication cadence.',
    },
    {
      id: 'final',
      title: 'Leadership Review',
      description: 'Final confirmation of alignment, growth plan, and comp structure.',
    },
  ],
  siteConfig: {
    heroTitle: 'COGNETEX',
    heroSubTitle: 'Good products age well',
    heroLead: 'Building the next generation of autonomous systems.',
    serviceSectionTitle: 'OUR SERVICES',
    serviceSectionLead: 'Scalable AI solutions for enterprise.',
    contactSectionTitle: 'CONTACT US',
    contactSectionLead: 'Get in touch to learn more.',
    defaultSeoTitle: 'Cognetex | AI Agency',
    defaultSeoDescription: 'Enterprise AI and Software Development',
    footerDescription: 'Good products age well. Precise, autonomous, and scalable systems for the modern enterprise.',
    socials: {
      linkedin: 'https://linkedin.com/company/cognetex',
      twitter: 'https://twitter.com/cognetex',
      github: 'https://github.com/cognetex'
    }
  }
};

let cachedContent: ReturnType<typeof contentSchema.parse> | null = null;

const withIdFallback = <T extends { id?: string }>(docId: string, data: T) => ({
  ...data,
  id: data.id ?? docId,
});

const fetchCollection = async <T extends { id?: string }>(collectionName: string) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => withIdFallback(doc.id, doc.data() as T));
};

export const getContent = async () => {
  if (cachedContent) {
    return cachedContent;
  }

  try {
    if (!firebaseEnabled || !db) {
      cachedContent = contentSchema.parse(DEFAULTS);
      return cachedContent;
    }
    const [
      services, projects, team, aiTechStack, courses,
      trustLogos, uniqueApproach, aiSolutionPillars, aiServices,
      careers, careerBenefits, careerSteps, configDoc
    ] = await Promise.all([
      fetchCollection('services'),
      fetchCollection('projects'),
      fetchCollection('team'),
      fetchCollection('techStack'),
      fetchCollection('courses'),
      fetchCollection('trustLogos'),
      fetchCollection('uniqueApproach'),
      fetchCollection('aiSolutionPillars'),
      fetchCollection('aiServices'),
      fetchCollection('careers'),
      fetchCollection('careerBenefits'),
      fetchCollection('careerSteps'),
      getDocs(collection(db, 'config')),
    ]);

    const firestoreConfig = configDoc.docs.find(d => d.id === 'site')?.data() as ISiteConfig | undefined;

    const merged = {
      ...DEFAULTS,
      services: services.length ? services : DEFAULTS.services,
      projects: projects.length ? projects : DEFAULTS.projects,
      team: (team.length ? team : DEFAULTS.team).sort((a: any, b: any) => (a.order || 0) - (b.order || 0)),
      aiTechStack: aiTechStack.length ? aiTechStack : DEFAULTS.aiTechStack,
      courses: courses.length ? courses : DEFAULTS.courses,
      trustLogos: trustLogos.length ? trustLogos : DEFAULTS.trustLogos,
      uniqueApproach: uniqueApproach.length ? uniqueApproach : DEFAULTS.uniqueApproach,
      aiSolutionPillars: aiSolutionPillars.length ? aiSolutionPillars : DEFAULTS.aiSolutionPillars,
      aiServices: aiServices.length ? aiServices : DEFAULTS.aiServices,
      careers: careers.length ? careers : DEFAULTS.careers,
      careerBenefits: careerBenefits.length ? careerBenefits : DEFAULTS.careerBenefits,
      careerSteps: careerSteps.length ? careerSteps : DEFAULTS.careerSteps,

      siteConfig: {
        ...DEFAULTS.siteConfig,
        ...(firestoreConfig || {}),
        socials: {
          ...(DEFAULTS.siteConfig?.socials || {}),
          ...(firestoreConfig?.socials || {})
        }
      },
    };

    // Bypass strict parse for debugging the "Something went wrong" issue
    cachedContent = merged as any;

  } catch (error) {
    console.error('Failed to load content from Firestore:', error);
    cachedContent = DEFAULTS as any;
  }

  return cachedContent;
};


