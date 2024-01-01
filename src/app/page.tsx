import type { NextPage } from 'next';
import CliComponent from '../components/CLIComponent/CliComponent';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Page: NextPage = () => {
  return (
    <ThemeProvider>
      <CliComponent />
    </ThemeProvider>
  );
};

export default Page;
