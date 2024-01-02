import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import styles from '@/components/CLIComponent/CLIComponent.module.scss';
import { useCommandProcessor } from '@/hooks/UseCommandProcessor';

interface CliInputFormProps {
  setHistory: React.Dispatch<React.SetStateAction<ReactNode[]>>;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CliInputForm = forwardRef(
  (
    { setHistory, isFocused, setIsFocused }: CliInputFormProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [input, setInput] = useState('');
    const processCommand = useCommandProcessor();

    const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
        const output = processCommand(trimmedInput);
        setHistory((prev) => [...prev, trimmedInput, output]);
        setInput('');
        if (ref && 'current' in ref && !isFocused) ref.current?.focus();
      },
      [input, processCommand, ref, setHistory],
    );

    return (
      <form
        className={`${styles.form} ${isFocused ? styles.focused : ''}`}
        onSubmit={handleSubmit}
      >
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
