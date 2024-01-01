import type { NextPage } from 'next';
import CLIComponent from '../components/CLIComponent/CLIComponent';
import { ThemeProvider } from "@/contexts/ThemeContext";

const Page: NextPage = () => {
   return (
       <ThemeProvider>
          <CLIComponent/>
       </ThemeProvider>
   );
};

export default Page;
