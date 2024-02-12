'user client';

import { useState, useRef, useEffect } from 'react';

const Capture: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    handleOnPageLoad();
  }, []);

  const handleOnPageLoad = async () => {
    console.log('page loaded');
    startCamera();
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        console.log('setting stream');
        videoRef.current.srcObject = mediaStream;
      }
    } 
    catch (err) {
      setError(err instanceof Error ? err.message : 'Could not access the camera');
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }

  const captureSnapshot = () => {
    // wait for 3 seconds, log 3 2 1 to console and then take snapshot
    let count = 3;
    console.log(count);
    const interval = setInterval(() => {
      count--;
      console.log(count);
      if (count === 0) {
        clearInterval(interval);
        takeSnapshot();
      }
    }, 1000);
  }

  const takeSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const encodedImage = canvas.toDataURL('image/png');
        setImage(encodedImage);
      }
    }
    stopCamera();
  }

  const retakePhoto = () => {
    setImage(undefined);
    startCamera();
  }


  return (
    <div>
      { image
        ? <img src={image} alt="Snapshot" />
        : <video autoPlay ref={videoRef} />
      }
      { image
        ? <button onClick={retakePhoto}>Retake</button>
        : <button onClick={captureSnapshot}>Capture</button>
      }
  </div>
  );
}

export default Capture;