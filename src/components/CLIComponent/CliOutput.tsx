import styles from '@/components/CLIComponent/CLIComponent.module.scss';

export const CliOutput = (props: { strings: string[] }) => (
  <div role="log" aria-atomic={'false'} className={styles.line}>
    {props.strings.map((line, index) => (
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
