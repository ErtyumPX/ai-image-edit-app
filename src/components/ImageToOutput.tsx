import { useState, useRef, useEffect } from 'react';
import { Prompt } from './prompts';
import { ApiService } from '@/services/ApiService';
import QRCode from 'qrcode.react';

interface ImageToOutputProps {
    rawImage: string;
    prompt: Prompt;
    restartCallback: () => Promise<void>;
}

const pageUrl = 'http://localhost:5000/view/';

const ImageToOutput: React.FC<ImageToOutputProps> = ({rawImage, prompt, restartCallback}) => {
  const [shownImage, setShownImage] = useState<string>(rawImage);
  const [imageID, setImageID] = useState<string | undefined>(undefined);
  const [qrUrl, setQrUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    sendImagetoAPI(rawImage);
  }, []);

  const sendImagetoAPI = async (image64: string) => {
    const imageFile = new File([image64], 'snapshot.png', { type: 'image/png' });
    const response = await ApiService.sendImageRequest(imageFile);
    console.log(response);
    const imageUrl = 'data:image/png;base64,' + response.image;
    setImageID(response.image_id);
    setQrUrl(pageUrl + response.image_id);
    setShownImage(imageUrl);
  }

  return (
    <div>
      <img src={shownImage} alt="Image" />
      {qrUrl && <QRCode value={qrUrl} />}
      <button onClick={restartCallback}> Restart </button>
    </div>
  );
}

export default ImageToOutput;
