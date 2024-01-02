import styles from '@/components/CLIComponent/CLIComponent.module.scss';
import { ReactNode } from 'react';

export const CliOutput = (props: { outputLines: ReactNode[] }) => (
  <div role="log" aria-atomic={'false'} className={styles.line}>
    {props.outputLines.map((line, index) => (
      <p key={index} id={`cmd-${index}`}>
        {index % 2 === 0 ? (
          <span aria-hidden={'true'}>{`> `}</span>
        ) : (
          <span className={styles.visuallyHidden}>New output received:</span>
        )}
        {line}
      </p>
    ))}
  </div>
);
