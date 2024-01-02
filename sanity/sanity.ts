import { createClient } from '@sanity/client';
import { BlogPost } from '@/types/blog';

export const client = createClient({
  projectId: process.env.SANITY_STUDIO_NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// uses GROQ to query content: https://www.sanity.io/docs/groq
export const getPosts = async (): Promise<BlogPost[]> =>
  await client.fetch(
    '*[_type == "post"]',
    {},
    {
      cache: 'force-cache',
      next: { tags: ['pages'] },
    },
  );
