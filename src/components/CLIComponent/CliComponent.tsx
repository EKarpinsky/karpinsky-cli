'use client';

import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styles from './CLIComponent.module.scss';
import { CliHeader } from '@/components/CLIComponent/CliHeader';
import { CliOutput } from '@/components/CLIComponent/CliOutput';
import { CliInputForm } from '@/components/CLIComponent/CliInputForm';

const CliComponent: FC = () => {
  const [history, setHistory] = useState<ReactNode[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

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
        onClick={() => {
          console.log(isFocused);
          inputRef.current?.focus();
          setIsFocused(true);
        }}
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
          <CliOutput outputLines={history} />
          <CliInputForm
            setHistory={setHistory}
            ref={inputRef}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
          />
        </div>
      </div>
    </main>
  );
};

export default CliComponent;
