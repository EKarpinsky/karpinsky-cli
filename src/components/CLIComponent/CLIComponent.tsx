'use client';

import { FC, ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import styles from './CLIComponent.module.scss';
import { useCommandProcessor } from "@/hooks/UseCommandProcessor";

const CliInputForm = forwardRef((props: {
                                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
                                    value: string,
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
                                 }, ref: ForwardedRef<HTMLInputElement>
    ) => <form onSubmit={props.onSubmit} className={styles.form}>
       <span aria-hidden='true'>{`> `}</span>
       <div className={styles.inputCaretWrapper}>
          <input
              ref={ref}
              id='input-line'
              type='text'
              value={props.value}
              className={styles.input}
              onChange={props.onChange}
              aria-label='Type your command here and press Enter'
          />
          <span className={styles.inputMirror} aria-hidden='true'>{props.value}</span>
          <div className={styles.fakeCaret}></div>
       </div>
    </form>
);
CliInputForm.displayName = 'CliInputForm';

const CLIComponent: FC = () => {
   const [input, setInput] = useState('');
   const [history, setHistory] = useState<string[]>([]);
   const inputRef = useRef<HTMLInputElement>(null);

   const processCommand = useCommandProcessor();

   const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const output = processCommand(input);
      setHistory(prev => [...prev, `${input}`, output]);
      setInput('');
      inputRef.current?.focus();
   }, [input, processCommand]);

   useEffect(() => {
      if (inputRef.current) {
         inputRef.current.focus();
      }
   }, [inputRef]);

   return (
       <main className={styles.container} onClick={() => inputRef.current?.focus()}
             aria-label='Karpinsky Command Line Interface'>
          <h1>
             {/* Visually hidden text for screen readers */}
             <span className={styles.visuallyHidden}>Karpinsky Command Line Interface</span>
             <pre aria-hidden='true'
                  id='karpinsky-cli-ascii-art-heading'>  _   _   _   _   _   _   _   _   _     _   _   _  <br/> / \ / \ / \ / \ / \ / \ / \ / \ / \   / \ / \ / \ <br/>( K | a | r | p | i | n | s | k | y ) ( C | L | I )<br/> \_/ \_/ \_/ \_/ \_/ \_/ \_/ \_/ \_/   \_/ \_/ \_/ </pre>
          </h1>
          <div className={styles.cli} tabIndex={0} aria-label='Interactive command line'>
             <h2 className={styles.cliHeading}>{`Welcome to Karpinsky CLI. Type "help" and press Enter for a list of available commands.`}</h2>
             <div role='log' aria-atomic={'false'} className={styles.line}>
                {history.map((line, index) => (
                    <p key={index} id={`cmd-${index}`}>
                       {(index % 2 === 0) ? <span aria-hidden={'true'}>{`> `}</span> :
                           <span className={styles.visuallyHidden}>New output received: </span>}
                       {line}</p>

                ))}
             </div>
             <CliInputForm onSubmit={handleSubmit} ref={inputRef} value={input}
                           onChange={(e) => setInput(e.target.value)}/>
          </div>
       </main>
   );
};

export default CLIComponent;
