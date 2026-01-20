import { useEffect, useState } from 'react';
import { getContent } from '../repositories/contentRepository';
import * as fallbackContent from '../data/content';

export const useContent = () => {
  const [content, setContent] = useState(fallbackContent);
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

  return { ...content, isLoading, error };
};
