import { useState, useRef, useEffect } from 'react';
import { allPrompts, Prompt } from './prompts';

interface PromptSelectionProps {
  confirmCallback: (prompt: Prompt) => Promise<void>;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({confirmCallback}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | undefined>(undefined);
  const [beforeImage, setBeforeImage] = useState<string | undefined>(undefined);
  const [afterImage, setAfterImage] = useState<string | undefined>(undefined);

  const selectPrompt = async (index: number) => {

  }

  return (
    <div>
      <h1>Select a Prompt</h1>
      <div>
        {allPrompts.map((prompt, index) => {
          return (
            <div key={index}>
              <h2>{prompt.title}</h2>
              <button onClick={() => selectPrompt(index)}>{prompt.title}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PromptSelection;
