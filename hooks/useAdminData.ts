import { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, firebaseEnabled } from '../lib/firebase';
import { IAITechCategory, IProject, IService, ITeamMember } from '../types';

const mapDocs = async <T extends { id?: string }>(name: string) => {
  const snapshot = await getDocs(collection(db, name));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }));
};

export const useAdminData = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [team, setTeam] = useState<ITeamMember[]>([]);
  const [techStack, setTechStack] = useState<IAITechCategory[]>([]);
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
      const [servicesData, projectsData, teamData, techStackData] = await Promise.all([
        mapDocs<IService>('services'),
        mapDocs<IProject>('projects'),
        mapDocs<ITeamMember>('team'),
        mapDocs<IAITechCategory>('techStack'),
      ]);
      setServices(servicesData);
      setProjects(projectsData);
      setTeam(teamData);
      setTechStack(techStackData);
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

  return { services, projects, team, techStack, isLoading, error, refresh };
};
