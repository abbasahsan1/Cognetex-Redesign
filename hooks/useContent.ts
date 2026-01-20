import { useMemo } from 'react';
import { getContent } from '../repositories/contentRepository';

export const useContent = () => {
  return useMemo(() => getContent(), []);
};
