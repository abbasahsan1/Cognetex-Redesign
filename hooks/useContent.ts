import { useEffect, useState } from 'react';
import { getContent } from '../repositories/contentRepository';

export const useContent = () => {
  const [content, setContent] = useState<any>({
    services: [],
    projects: [],
    team: [],
    aiTechStack: [],
    courses: [],
    trustLogos: [],
    uniqueApproach: [],
    aiSolutionPillars: [],
    aiServices: [],
    siteConfig: {
      heroTitle: '',
      heroSubTitle: '',
      heroLead: '',
      serviceSectionTitle: '',
      serviceSectionLead: '',
      contactSectionTitle: '',
      contactSectionLead: '',
      defaultSeoTitle: '',
      defaultSeoDescription: '',
      socials: {
        linkedin: '',
        twitter: '',
        github: ''
      }
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    getContent()
      .then((data) => {
        if (mounted) {
          setContent(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Content load error:', err);
        if (mounted) {
          setError(err as Error);
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { ...(content || {}), isLoading, error };
};



