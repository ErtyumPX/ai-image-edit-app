import { useState, useRef, useEffect } from 'react';
import Capture from '../Capture/Capture';
import PromptSelection from '../PromptSelection/PromptSelection';
import ImageToOutput from '../ImageToOutput/ImageToOutput';
import { PromptData } from '../PromptSelection/prompts';
import styles from './ai.module.css';

enum AIPrompterState {
  CAPTURE,
  SELECT_PROMPT,
  OUTPUT
}

const AIPrompter: React.FC = () => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | undefined>(undefined);
  const [state, setState] = useState<AIPrompterState>(AIPrompterState.CAPTURE);

  const confirmImageCallback = async (image64: string): Promise<void> => {
    setImage(image64);
    setState(AIPrompterState.SELECT_PROMPT);
  }

  const confirmPromptCallback = async (prompt: PromptData): Promise<void> => {
    setSelectedPrompt(prompt);
    setState(AIPrompterState.OUTPUT);
  }

  const restartCallback = async (): Promise<void> => {
    setImage(undefined);
    setSelectedPrompt(undefined);
    setState(AIPrompterState.CAPTURE);
  }

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.logo}>
        <img src="/ai_logo.svg" alt="Logo" />
      </div>
      <h1 className={styles.title}>Yapay Zeka Zirvesi</h1>
      <div className={styles.content}>
        {state === AIPrompterState.CAPTURE && 
          <Capture confirmCaptureCallback={confirmImageCallback} />
        }
        {state === AIPrompterState.SELECT_PROMPT && 
          <PromptSelection confirmSelectionCallback={confirmPromptCallback} />
        }
        {state === AIPrompterState.OUTPUT && image && selectedPrompt &&
          <ImageToOutput rawImage={image} promptData={selectedPrompt} restartCallback={restartCallback}/>
        }
      </div>
    </div>
  );
}

export default AIPrompter;
