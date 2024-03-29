import { useState, useRef, useEffect } from 'react';
import { PromptData } from '../PromptSelection/prompts';
import { ApiService } from '@/services/ApiService';
import QRCode from 'qrcode.react';
import styles from './output.module.css';
import { PacmanLoader } from 'react-spinners';


interface ImageToOutputProps {
    rawImage: string;
    promptData: PromptData;
    restartCallback: () => Promise<void>;
}

const pageUrl = process.env.NEXT_PUBLIC_VIEW_URL;

const ImageToOutput: React.FC<ImageToOutputProps> = ({rawImage, promptData, restartCallback}) => {
  const [shownImage, setShownImage] = useState<string>(rawImage);
  const [imageID, setImageID] = useState<string | undefined>(undefined);
  const [qrUrl, setQrUrl] = useState<string | undefined>(undefined);
  const [waiting, setWaiting] = useState<boolean>(false);

  useEffect(() => {
    sendImagetoAPI(rawImage);
  }, []);

  const sendImagetoAPI = async (image64: string) => {
    if (waiting) return;
    try {
      setWaiting(true);
      const blob = await fetch(image64).then(r => r.blob());
      const imageFile =new File([blob], 'snapshot.png', { type: 'image/png' });
      const response = await ApiService.sendImageRequest(imageFile, promptData);
      console.log(response);
      const imageUrl = 'data:image/png;base64,' + response.artifacts[0].base64;
      setImageID(response.image_id);
      setQrUrl(pageUrl + response.image_id);
      setShownImage(imageUrl);
      setWaiting(false);
    }
    catch (error) {
      console.error('Error fetching photos:', error);
      setTimeout(() => {
        sendImagetoAPI(image64);
      }, 400);
    }
  }

  return (
    <div className={styles.container}>
      <img className={styles.cameraContainer} src={shownImage} alt="Image" />
      {qrUrl 
      ?
        <>
          <div className={styles.qrCard}>
            <QRCode className={styles.qr} value={qrUrl} />
            <p className={styles.qrText}>Bu QR kodu okutarak görsele erişebilirsiniz.</p>
          </div>
          <div className={styles.qrCard}>
            <QRCode className={styles.qr} value="https://www.instagram.com/ituaiclub/" />
            <p className={styles.qrText}>Bu QR kodu okutarak bizi Instagram&apos;dan takip edebilirsiniz.</p>
          </div>
          <div className={styles.qrCard}>
            <QRCode className={styles.qr} value='https://youtu.be/dQw4w9WgXcQ?si=I-cKfZ1uxOJOkM2D' />
            <p className={styles.qrText}>Bu QR kod hiçbir işe yaramıyor.</p>
          </div>
          <button className={styles.generalButton} onClick={restartCallback}> Restart </button>
        </>
      :
        <div className={styles.loadingContainer}>
          <PacmanLoader color='yellow'/>
        </div>
      }
    </div>
  );
}

export default ImageToOutput;
