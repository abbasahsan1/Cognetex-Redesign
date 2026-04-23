import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, firebaseEnabled } from '../lib/firebase';
import { IAITechCategory, IProject, IService, ITeamMember, ICourse, ISiteConfig } from '../types';

const mapDocs = async <T extends { id?: string }>(name: string) => {
  const snapshot = await getDocs(collection(db, name));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }));
};

export const useAdminData = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [team, setTeam] = useState<ITeamMember[]>([]);
  const [techStack, setTechStack] = useState<IAITechCategory[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [siteConfig, setSiteConfig] = useState<ISiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      if (!firebaseEnabled || !db) {
        setError('Firebase is not configured.');
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const [servicesData, projectsData, teamData, techStackData, coursesData, configSnapshot] = await Promise.all([
        mapDocs<IService>('services'),
        mapDocs<IProject>('projects'),
        mapDocs<ITeamMember>('team'),
        mapDocs<IAITechCategory>('techStack'),
        mapDocs<ICourse>('courses'),
        getDocs(collection(db, 'config')),
      ]);

      const firestoreConfig = configSnapshot.docs.find(d => d.id === 'site')?.data() as ISiteConfig | undefined;

      setServices(servicesData.sort((a, b) => a.title.localeCompare(b.title)));
      setProjects(projectsData.sort((a, b) => a.title.localeCompare(b.title)));
      setTeam(teamData.sort((a, b) => a.name.localeCompare(b.name)));
      setTechStack(techStackData.sort((a, b) => a.title.localeCompare(b.title)));
      setCourses(coursesData.sort((a, b) => a.title.localeCompare(b.title)));
      if (firestoreConfig) setSiteConfig(firestoreConfig);
      setError(null);
    } catch (err) {
      console.error('Admin data load error:', err);
      setError('Unable to load admin data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { services, projects, team, techStack, courses, siteConfig, isLoading, error, refresh };
};

