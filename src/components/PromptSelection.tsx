import { useState, useRef, useEffect } from 'react';
import { allPrompts, PromptData } from './prompts';

interface PromptSelectionProps {
  confirmSelectionCallback: (prompt: PromptData) => Promise<void>;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({confirmSelectionCallback}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<number | undefined>(undefined);
  const [beforeImage, setBeforeImage] = useState<string | undefined>(undefined);
  const [afterImage, setAfterImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    selectPrompt(0);
  }, []);


  const selectPrompt = async (index: number) => {
    setSelectedPrompt(index);
    setBeforeImage(allPrompts[index].beforeImage);
    setAfterImage(allPrompts[index].afterImage);
  }

  const confirmSelection = async () => {
    if (selectedPrompt !== undefined) {
      confirmSelectionCallback(allPrompts[selectedPrompt]);
    }
  }

  return (
    <div>
      <h1>Select a Prompt</h1>
      <div>
        {allPrompts.map((prompt, index) => {
          return (
            <div key={index}>
              <button onClick={() => selectPrompt(index)}> {prompt.title} </button>
            </div>
          );
        })}
      </div>
      {beforeImage && afterImage && 
      <>
        <img src={beforeImage} alt="before" />
        <img src={afterImage} alt="after" />
      </>
      }
      <button onClick={confirmSelection}> Confirm </button>
    </div>
  );
}

export default PromptSelection;
