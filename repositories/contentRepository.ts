import { collection, getDocs } from 'firebase/firestore';
import { contentSchema } from '../domain/schemas';
import { db, firebaseEnabled } from '../lib/firebase';
import { ISiteConfig } from '../types';
import * as content from '../data/content';

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
      cachedContent = contentSchema.parse(content);
      return cachedContent;
    }
    const [services, projects, team, aiTechStack, configDoc] = await Promise.all([
      fetchCollection('services'),
      fetchCollection('projects'),
      fetchCollection('team'),
      fetchCollection('techStack'),
      getDocs(collection(db, 'config')),
    ]);

    const firestoreConfig = configDoc.docs.find(d => d.id === 'site')?.data() as ISiteConfig | undefined;

    const merged = {
      ...content,
      services: services.length ? services : content.services,
      projects: projects.length ? projects : content.projects,
      team: team.length ? team : content.team,
      aiTechStack: aiTechStack.length ? aiTechStack : content.aiTechStack,
      siteConfig: {
        ...content.siteConfig,
        ...(firestoreConfig || {}),
        socials: {
          ...(content.siteConfig?.socials || {}),
          ...(firestoreConfig?.socials || {})
        }
      },
    };




    cachedContent = contentSchema.parse(merged);

  } catch (error) {
    console.error('Failed to load content from Firestore:', error);
    cachedContent = contentSchema.parse(content);
  }

  return cachedContent;
};
