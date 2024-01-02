import type { NextPage } from 'next';
import CliComponent from '../components/CLIComponent/CliComponent';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { BlogPostsProvider } from '@/contexts/BlogPostsContext';
import { getPosts } from '../../sanity/sanity';

const Page: NextPage = async () => {
  const blogPosts = await getPosts();
  return (
    <BlogPostsProvider blogPosts={blogPosts}>
      <ThemeProvider>
        <CliComponent />
      </ThemeProvider>
    </BlogPostsProvider>
  );
};

export default Page;
