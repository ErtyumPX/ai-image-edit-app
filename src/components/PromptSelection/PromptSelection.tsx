import { useState, useEffect } from 'react';
import { allPrompts, PromptData } from './prompts';
import { ArrowIcon } from './arrow';
import styles from './prompt.module.css';

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

  /*
  Onayladığınız fotoğraflarınız sonradan sosyal medyada kullanılabilir. Uygulamayı kullanarak buna onay verdiğiniz unutmayınız!
  */
  return (
    <div className={styles.mainContainer}>
      <div className={styles.buttonContainer}>
        {allPrompts.map((prompt, index) => {
          return (
            <div key={index}>
              <button className={styles.generalButton} onClick={() => selectPrompt(index)}> {prompt.title} </button>
            </div>
          );
        })}
      </div>
      {beforeImage && afterImage && 
      <div className={styles.exampleContainer}>
        <img className={styles.exampleImage} src={beforeImage} alt="before" />
          <ArrowIcon className={styles.arrowIcon}/> 
        <img className={styles.exampleImage} src={afterImage} alt="after" />
      </div>
      }
      <div className={styles.confirmButtonContainer}>
        <button className={styles.generalButton} onClick={confirmSelection}> Devam :)</button>
      </div>
    </div>
  );
}

export default PromptSelection;
