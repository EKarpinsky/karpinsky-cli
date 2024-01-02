import { themes } from '@/components/CLIComponent/themes';
import { ReactNode, useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import type { CommandKey, ICommand } from '@/types/command';
import useBlogCommand from '@/components/CLIComponent/commands/useBlogCommand';
import useAboutCommand from '@/components/CLIComponent/commands/useAboutCommand';
import usePortfolioCommand from '@/components/CLIComponent/commands/usePortfolioCommand';

export const useCommandProcessor = () => {
  const { setTheme } = useContext(ThemeContext);

  const blog = useBlogCommand();
  const about = useAboutCommand();
  const portfolio = usePortfolioCommand();

  const commands: Record<CommandKey, ICommand> = {
    about,
    portfolio,
    blog,
    help: {
      description: 'Lists all available commands.',
      execute: () =>
        Object.keys(commands)
          .map((cmd) => `${cmd}: ${commands[cmd as CommandKey].description}`)
          .join('\n'),
    },
    humanity: {
      description: 'Displays the current state of humanity.',
      execute: (args) =>
        args.join(' ') === 'is a cancer'
          ? 'And we are the cure.'
          : 'invalid command',
    },
    theme: {
      description: 'Changes the theme of the CLI.',
      execute: ([themeName]) => {
        const theme = themes[themeName as keyof typeof themes];
        if (theme) {
          setTheme(theme);
          return `Theme changed to ${themeName}`;
        }
        return `Invalid theme. Available themes: ${Object.keys(themes).join(
          ', ',
        )}`;
      },
    },
  };

  return (input: string): ReactNode => {
    const [commandKey, ...args] = input.split(' ');
    const command = commands[commandKey as CommandKey];
    return command
      ? command.execute(args)
      : `Command "${commandKey}" not found. Type "help" for a list of valid commands.`;
  };
};
