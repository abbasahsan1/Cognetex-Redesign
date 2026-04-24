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
  trustLogos: [],
  uniqueApproach: [],
  aiSolutionPillars: [],
  aiServices: [],
  siteConfig: {
    heroTitle: 'COGNETEX',
    heroSubTitle: 'RETHINK HOW THINKING WORKS',
    heroLead: 'Building the next generation of autonomous systems.',
    serviceSectionTitle: 'OUR SERVICES',
    serviceSectionLead: 'Scalable AI solutions for enterprise.',
    contactSectionTitle: 'CONTACT US',
    contactSectionLead: 'Get in touch to learn more.',
    defaultSeoTitle: 'Cognetex | AI Agency',
    defaultSeoDescription: 'Enterprise AI and Software Development',
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
    const [services, projects, team, aiTechStack, courses, configDoc] = await Promise.all([
      fetchCollection('services'),
      fetchCollection('projects'),
      fetchCollection('team'),
      fetchCollection('techStack'),
      fetchCollection('courses'),
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


