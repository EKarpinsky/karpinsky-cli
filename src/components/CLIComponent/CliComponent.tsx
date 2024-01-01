'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './CLIComponent.module.scss';
import { CliHeader } from '@/components/CLIComponent/CliHeader';
import { CliOutput } from '@/components/CLIComponent/CliOutput';
import { CliInputForm } from '@/components/CLIComponent/CliInputForm';

const CliComponent: FC = () => {
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const onDivKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <main>
      <div
        className={styles.container}
        onClick={() => inputRef.current?.focus()}
        aria-label="Karpinsky Command Line Interface"
        role="button"
        tabIndex={0}
        onKeyDown={onDivKeyDown}
      >
        <CliHeader />
        <div className={styles.cli} aria-label="Interactive command line">
          <h2
            className={styles.cliHeading}
          >{`Welcome to Karpinsky CLI. Type "help" and press Enter for a list of available commands.`}</h2>
          <CliOutput strings={history} />
          <CliInputForm setHistory={setHistory} ref={inputRef} />
        </div>
      </div>
    </main>
  );
};

export default CliComponent;
