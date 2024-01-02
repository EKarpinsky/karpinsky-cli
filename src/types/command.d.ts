import { ReactNode } from 'react';

export type CommandKey =
  | 'about'
  | 'portfolio'
  | 'blog'
  | 'help'
  | 'theme'
  | 'humanity';

export interface ICommand {
  description: string;
  execute: (args: string[]) => ReactNode;
}
