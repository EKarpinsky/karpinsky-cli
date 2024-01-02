'use client';

import { createContext, ReactNode, useContext } from 'react';
import { BlogPost } from '@/types/blog';

type BlogPostsContextType = {
  blogPosts: BlogPost[];
};

export const BlogPostsContext = createContext<BlogPostsContextType>({
  blogPosts: [],
});

type BlogPostsProviderProps = {
  children: ReactNode;
  blogPosts: BlogPost[];
};

export const useBlogPosts = () => {
  const { blogPosts } = useContext(BlogPostsContext);
  if (!blogPosts) {
    throw new Error('useBlogPosts must be used within a BlogPostsProvider');
  }
  return blogPosts;
};

export const BlogPostsProvider = ({
  children,
  blogPosts,
}: BlogPostsProviderProps) => {
  return (
    <BlogPostsContext.Provider value={{ blogPosts }}>
      {children}
    </BlogPostsContext.Provider>
  );
};
