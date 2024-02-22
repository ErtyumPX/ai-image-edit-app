'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './capture.module.css';


interface CaptureProps {
  confirmCaptureCallback: (image64: string) => Promise<void>;
}

const Capture: React.FC<CaptureProps> = ({ confirmCaptureCallback }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    console.log(typeof confirmCaptureCallback);
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
    setCountdown(count);
    console.log(count);
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
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

  const confirmImage = () => {
    if (image) {
      console.log(confirmCaptureCallback);
      console.log(typeof confirmCaptureCallback);
      confirmCaptureCallback(image);
    }
  }


  return (
    <div className={styles.container}>
      { image
        ? 
        <>
          <img className={styles.cameraContainer} src={image} alt="Snapshot"/>
          <div className={styles.buttonContainer}>
            <button className={styles.generalButton} onClick={retakePhoto}>Retake</button>
            <button className={styles.generalButton} onClick={confirmImage}>Confirm</button>
          </div>
        </>
        : 
        <>
          <video className={styles.cameraContainer} autoPlay ref={videoRef}/>
          {countdown
          ?
            <p className={styles.countdown}>{countdown}</p>
          :
            <div className={styles.buttonContainer}>
              <button className={styles.generalButton} onClick={captureSnapshot}>Capture</button>
            </div>
          }
        </>
      }
  </div>
  );
}

export default Capture;