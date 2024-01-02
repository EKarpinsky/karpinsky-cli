import { ForwardedRef, forwardRef, useCallback, useState } from 'react';
import styles from '@/components/CLIComponent/CLIComponent.module.scss';
import { useCommandProcessor } from '@/hooks/UseCommandProcessor';

interface CliInputFormProps {
  setHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CliInputForm = forwardRef(
  ({ setHistory }: CliInputFormProps, ref: ForwardedRef<HTMLInputElement>) => {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const processCommand = useCommandProcessor();

    const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
        const output = processCommand(trimmedInput);
        setHistory((prev) => [...prev, trimmedInput, output]);
        setInput('');
        if (ref && 'current' in ref) ref.current?.focus();
      },
      [input, processCommand, ref, setHistory],
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label="Type your command here and press Enter"
          />
          <span
            className={`${styles.inputMirror} ${
              isFocused ? styles.focused : ''
            }`}
            aria-hidden="true"
          >
            {input}
          </span>
          <div className={styles.fakeCaret}></div>
        </div>
      </form>
    );
  },
);
CliInputForm.displayName = 'CliInputForm';
