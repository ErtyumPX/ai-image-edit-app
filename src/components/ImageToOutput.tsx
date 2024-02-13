import { useState, useRef, useEffect } from 'react';
import { Prompt } from './prompts';

interface ImageToOutputProps {
    image: string;
    prompt: Prompt;
    restartCallback: () => Promise<void>;
}


const ImageToOutput: React.FC<ImageToOutputProps> = ({image, prompt, restartCallback}) => {
  
  return (
    <div>
      
    </div>
  );
}

export default ImageToOutput;
