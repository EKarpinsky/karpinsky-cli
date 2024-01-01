import styles from '@/components/CLIComponent/CLIComponent.module.scss';
import { AsciiArt } from '@/components/CLIComponent/AsciiArt';

export const CliHeader = () => (
  <h1>
    {/* Visually hidden text for screen readers */}
    <span className={styles.visuallyHidden}>
      Karpinsky Command Line Interface
    </span>
    <AsciiArt />
  </h1>
);
