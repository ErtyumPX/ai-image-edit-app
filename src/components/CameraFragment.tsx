'user client';

import { useState, useRef } from 'react';
import { ApiService } from '@/services/ApiService';
import QRCode from 'qrcode.react';

const pageUrl = 'http://localhost:5000/view/';

const CameraFragment: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [imageID, setImageID] = useState<string | undefined>(undefined);
  const [qrUrl, setQrUrl] = useState<string | undefined>(undefined);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        console.log('setting stream');
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not access the camera');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takeSnapshot = () => {
    if (videoRef.current && isWaiting === false) {
      const canvas = document.createElement('canvas');
      const scale_factor = 1;
      canvas.width = videoRef.current.videoWidth * scale_factor;
      canvas.height = videoRef.current.videoHeight * scale_factor;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'snapshot.png', { type: 'image/png' });
            sendImagetoAPI(file);
          }
        });
        const encodedImage = canvas.toDataURL('image/png');
        setImage(encodedImage);
      }
    }
  }

  const sendImagetoAPI = async (imageFile: File) => {
    setIsWaiting(true);
    const response = await ApiService.sendImageRequest(imageFile);
    console.log(response);
    const imageUrl = 'data:image/png;base64,' + response.image;
    setImageID(response.image_id);
    setQrUrl(pageUrl + response.image_id);
    setImage(imageUrl);
    setIsWaiting(false);
  }
    
  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={takeSnapshot}>Take Snapshot</button>
      <video autoPlay ref={videoRef} />
      <img src={image} alt="Snapshot" />
      {imageID && <QRCode value={qrUrl as string} size={256} />}
    </div>
  );
};

export default CameraFragment;
