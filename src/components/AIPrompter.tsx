import { useState, useRef, useEffect } from 'react';
import Capture from './Capture';
import PromptSelection from './PromptSelection';
import ImageToOutput from './ImageToOutput';
import { Prompt } from './prompts';

enum AIPrompterState {
  CAPTURE,
  SELECT_PROMPT,
  OUTPUT
}

const AIPrompter: React.FC = () => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | undefined>(undefined);
  const [state, setState] = useState<AIPrompterState>(AIPrompterState.CAPTURE);

  const confirmImageCallback = async (image64: string) => {
    setImage(image64);
  }

  const confirmPromptCallback = async (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  }

  const restartCallback = async () => {
    setImage(undefined);
    setSelectedPrompt(undefined);
    setState(AIPrompterState.CAPTURE);
  }

  return (
    <>
      {state === AIPrompterState.CAPTURE && <Capture confirmCallback={confirmImageCallback} />}
      {state === AIPrompterState.SELECT_PROMPT && <PromptSelection confirmCallback={confirmPromptCallback} />}
      {state === AIPrompterState.OUTPUT && image && selectedPrompt &&
        <ImageToOutput image={image} prompt={selectedPrompt} restartCallback={restartCallback}/>
      }
    </>
  );
}

export default AIPrompter;
