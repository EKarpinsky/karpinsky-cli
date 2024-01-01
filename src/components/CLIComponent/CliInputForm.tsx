import { ForwardedRef, forwardRef, useCallback, useState } from 'react';
import styles from '@/components/CLIComponent/CLIComponent.module.scss';
import { useCommandProcessor } from '@/hooks/UseCommandProcessor';

export const CliInputForm = forwardRef(
  (
    {
      setHistory,
    }: {
      setHistory: React.Dispatch<React.SetStateAction<string[]>>;
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [input, setInput] = useState('');
    const processCommand = useCommandProcessor();

    const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const submittedInput = (ref as React.RefObject<HTMLInputElement>)
          .current?.value;
        if (!submittedInput) return;
        const trimmedInput = submittedInput.trim();
        if (!trimmedInput) return;
        const output = processCommand(trimmedInput);
        setHistory((prev) => [...prev, trimmedInput, output]);
        setInput('');
        (ref as React.RefObject<HTMLInputElement>).current?.focus();
      },
      [processCommand, ref, setHistory],
    );
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <span aria-hidden="true">{`> `}</span>
        <div className={styles.inputCaretWrapper}>
          <input
            ref={ref}
            id="input-line"
            type="text"
            value={input}
            className={styles.input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Type your command here and press Enter"
          />
          <span className={styles.inputMirror} aria-hidden="true">
            {input}
          </span>
          <div className={styles.fakeCaret}></div>
        </div>
      </form>
    );
  },
);
CliInputForm.displayName = 'CliInputForm';
