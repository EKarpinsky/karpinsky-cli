import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { useBlogPosts } from '@/contexts/BlogPostsContext';
import { ReactNode } from 'react';
import { BlogPost } from '@/types/blog';
import { ICommand } from '@/types/command';

const BlogPostOutput = ({ post }: { post: BlogPost }) => {
  // combine sanity post children into a single string
  const body = post.body
    .map(({ children }) => children.map(({ text }) => text).join(''))
    .join('\n');
  const markdownBody = (
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{body}</ReactMarkdown>
  );
  return (
    <>
      {`${post.title}\n\n`}
      {markdownBody}
      {`\n\n`}
      {`Read the full post at: `}
      <Link
        href={`/blog/${post.slug.current}`}
      >{`https://blog.karpinsky.dev/${post.slug.current}`}</Link>
    </>
  );
};

const BlogOverviewOutput = ({ blogPosts }: { blogPosts: BlogPost[] }) => (
  <>
    {'I have written a few blog posts. Here are the most recent ones:\n\n' +
      blogPosts
        .slice(0, 3)
        .map((post) => `- ${post.title}`)
        .join('\n\n') +
      '\n\nYou can read all of my blog posts at https://blog.karpinsky.dev'}
  </>
);

const useBlogCommand = (): ICommand => {
  const blogPosts = useBlogPosts();
  const findBlogPost = (postName: string) =>
    blogPosts.find(
      (post) => post.title.toLowerCase() === postName.toLowerCase(),
    );

  const execute: (args: string[]) => ReactNode = ([postName]) => {
    if (!postName) {
      // No post name provided, displaying a message and list of recent blog posts and link to blog site
      return <BlogOverviewOutput blogPosts={blogPosts} />;
    }
    // Find the blog post with the given name
    const post = findBlogPost(postName);
    return post ? (
      <BlogPostOutput post={post} />
    ) : (
      `Blog post "${postName}" not found.`
    );
  };

  const description =
    'Navigates to the blog section. Can be used like "blog [blog post name]" to navigate to a specific blog post.';

  return {
    description,
    execute,
  };
};

export default useBlogCommand;
