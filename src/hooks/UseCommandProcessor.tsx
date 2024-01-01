import { themes } from "@/components/CLIComponent/themes";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

type CommandKey = 'about' | 'portfolio' | 'blog' | 'help' | 'theme' | 'humanity';

interface ICommand {
   description: string;
   execute: (args: string[]) => string;
}

export const useCommandProcessor = () => {
   const { setTheme } = useContext(ThemeContext);

   const commands: Record<CommandKey, ICommand> = {
      about: {
         description: 'Displays information about the developer.',
         execute: () => 'This is the About section...',
      },
      portfolio: {
         description: 'Shows the portfolio items.',
         execute: () => 'Here is my Portfolio...',
      },
      blog: {
         description: 'Navigates to the blog section.',
         execute: () => 'Welcome to my Blog...',
      },
      help: {
         description: 'Lists all available commands.',
         execute: () => Object.keys(commands).map(cmd => `${cmd}: ${commands[cmd as CommandKey].description}`).join('\n'),
      },
      humanity: {
         description: 'Displays the current state of humanity.',
         execute: (args) => args.join(' ') === "is a cancer" ? 'And we are the cure.' : "invalid command",
      },
      theme: {
         description: 'Changes the theme of the CLI.',
         execute: ([themeName]) => {
            const theme = themes[themeName as keyof typeof themes];
            if (theme) {
               setTheme(theme);
               return `Theme changed to ${themeName}`;
            }
            return `Invalid theme. Available themes: ${Object.keys(themes).join(', ')}`;
         },
      },
   };

   return (input: string): string => {
      const [commandKey, ...args] = input.split(' ');
      const command = commands[commandKey as CommandKey];
      return command ? command.execute(args) : `Command "${commandKey}" not found. Type "help" for a list of valid commands.`;
   };
};
