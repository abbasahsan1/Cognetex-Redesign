import { contentSchema } from '../domain/schemas';
import * as content from '../data/content';

let cachedContent: ReturnType<typeof contentSchema.parse> | null = null;

export const getContent = () => {
  if (!cachedContent) {
    cachedContent = contentSchema.parse(content);
  }
  return cachedContent;
};
